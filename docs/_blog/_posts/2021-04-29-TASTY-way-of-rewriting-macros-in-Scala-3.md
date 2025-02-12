---
layout: blog-page
title: "TASTY way of (re)writing macros in Scala 3"
author: Kacper Korban
tags: [scala, scala 3]
---

# TASTY way of (re)writing macros in Scala 3

## Intro

If you have decided to read this blog post, you probably used or at least heard of macros. But just to make sure that we are on the same page: Macros / metaprogramming in Scala provide a way to either generate scala code at compile-time or analyze existing code to gather syntactic data.

Since the interface for writing macros in Scala 3 is completely different from that of Scala 2, macro libraries should become easier to develop and maintain. It also means that macro libraries from Scala 2 can’t be easily migrated or ported and instead have to be rewritten using the new TASTY API.

The aim of this blog post is to serve as a manual on efficiently using and navigating through Quotes API (which is the core of metaprogramming), rather than being a migration guide for macros or Scala projects in general. So for some preface/further reading macros documentation can be found [here](https://docs.scala-lang.org/scala3/guides/macros/macros.html) and the migration guide is [here](https://scalacenter.github.io/scala-3-migration-guide/). There is also quite a powerful tool [scala3-migrate](https://github.com/scalacenter/scala3-migrate), which automated most of the migration work.

All code snippets as well as the example mini-project were tested on Scala versions 3.0.0-RC1 and 3.0.0-RC2.

## Problem

I strongly believe that the best way to learn is by example. So let’s formulate a problem so that we have something to solve (because that’s how real life works). Let’s create a program that for a class (of kind * -> *), generates a neat type description for it, so for a case class like this:

```scala
case class NonEmpty[T](e: T, tail: Option[NonEmpty[T]])
```

we want to generate a string like this:

```scala
"NonEmpty(e: T, tail: Option[NonEmpty[T]])"
```

## Base

Like the title of the article suggests, we are going to be using TASTY reflect. So let’s start by creating an empty object for our code.

```scala
import scala.quoted.*

object TypeInfo {
 inline def apply[T[_]]: String = ${ typeInfoImpl[T] }

 def typeInfoImpl[T[_]: Type](using Quotes): Expr[String] = {
   import quotes.reflect.*

   ???
 }
}
```

Let’s take a look at what is going on here. First, we import scala.quoted.* to have access to Type and Quotes. Then we have the apply method. It only takes a single type parameter because our code isn’t supposed to depend on the value, but rather on the given type. The body of apply is just [spliced](https://dotty.epfl.ch/docs/reference/metaprogramming/macros.html) value of typeInfoImpl. When it comes to typeInfoImpl declaration, it takes the same type parameter and two implicit arguments:
- qctx (short for Quotes Context) - gives us access to reflect API
- tpe - type information of the type parameter
while returning a value of type Expr[String], which after splicing yields a String.

## Code <3

Cool, so now that we have a base, we can start writing actual code. Let’s start with something simple, like just getting the class’s name.

Our starting point is the tpe value, but in order to get the data we need, we have to transform this Type[T] into something from TASTY reflect. Let’s take a look at the hierarchy in [dotty/Quotes.scala](https://dotty.epfl.ch/api/scala/quoted/Quotes$reflectModule.html) then. The important part is this:

```scala
+- TypeRepr -+- NamedType -+- TermRef
             |             +- TypeRef
             +- ConstantType
```

So we know that we need a TypeRepr, but in the [Quotes](https://github.com/lampepfl/dotty/blob/main/library/src/scala/quoted/Quotes.scala) file there are no functions that may allow us to do it. That’s because all methods and functions for operating on TASTY types are in [QuotesImpl.scala](https://github.com/lampepfl/dotty/blob/main/compiler/src/scala/quoted/runtime/impl/QuotesImpl.scala). The basic structure in this file is that for every AST node there are three main entries:
- type alias for the internal node type
- companion object, which implements constructor functions like apply, but also methods like unapply and copy
- given with extension methods for our type. The name of this given is always type_name + “Methods”
So the relevant entries for TyprRepr are:

```scala
type TypeRepr = dotc.core.Types.Type

object TypeRepr extends TypeReprModule:
 ...
 def of[T <: AnyKind](using tp: scala.quoted.Type[T]): TypeRepr =
   tp.asInstanceOf[TypeImpl].typeTree.$tpe
 ...
end TypeRepr

given TypeReprMethods: TypeReprMethods with
 extension (self: TypeRepr)
   ...
   def typeSymbol: Symbol = self.typeSymbol
   ...
 end extension
end TypeReprMethods
```

Great, now we have a TypeRepr. Unfortunately, it doesn’t have any methods that can give us access to the type’s name, to get that information we have to access typeSymbol. After looking through the extension methods in SymbolMethods we can find the method name, which is exactly what we are looking for. Our very much WIP code looks like this:

```scala
val tpe = TypeRepr.of[T]
val name = tpe.typeSymbol.name
Expr(name)
```

Now that we have the basics covered, it’s time to handle value parameters. Once again, we start with tpe of type TypeRepr. We want to access the type declaration, so we have to get typeSymbol. After looking in SymbolMethods for something that can get us case declarations of the class, we can find:

```scala
def caseFields: List[Symbol] = ...
```

Which does exactly what we want.
Our description displays the label and type for every parameter. Getting the label is simple because, just like T’s name, we have a Symbol with the name method. Unfortunately, there is no method that can give us the type of a declaration straight from Symbol. That means we have to look into the AST tree, which can be accessed from Symbol with the method tree (who would have thought :D). Ok, so can we deduce what types of AST nodes are our Symbols? Let’s try, by looking at the hierarchy in [Quotes](https://dotty.epfl.ch/api/scala/quoted/Quotes.html). We can intuitively guess that our case declarations are some kinds of declarations :o. Here is the relevant piece then:

```scala
+- Definition --+- ClassDef
|               +- TypeDef
|               +- DefDef
|               +- ValDef
```

Let’s go through all the options one by one:
- ClassDef is a definition of a class, so it obviously cannot be a case declaration
- TypeDef is a declaration of a type. Type parameters are of type TypeDef, but they aren’t considered case fields
- DefDef is a definition of a method, which can’t be a case field either
- ValDef is a value definition (or variable)- all case fields are of this type
Based on that, we should match on ValDefs. Let’s take a look at the code we have described so far.

```scala
val caseFields = tpe.typeSymbol.caseFields.map { s =>
  val name = s.name
  val tpe = s.tree match {
    case v: ValDef =>
      ???
  }
  s"$name: $tpe"
}
```

Cool, what can we get from our ValDef then? We don’t have much choice here:

```scala
given ValDefMethods: ValDefMethods with
  extension (self: ValDef)
    def tpt: TypeTree = self.tpt
    def rhs: Option[Term] = optional(self.rhs)
  end extension
end ValDefMethods
```

Obviously, we want the TypeTree here and after looking at the TypeTreeMethods, there is only one method- tpe: TypeRepr. TypeRepr has a bunch of possible specific types we will have to look into in a second. But for now, let’s do the same trick as we did in the very beginning to get the class name (.typeSymbol.name). Now our code looks like this:

```scala
val tpe = TypeRepr.of[T]  
val name = tpe.typeSymbol.name

val caseFields = tpe.typeSymbol.caseFields.map { s =>
  val name = s.name
  val tpe = s.tree match {
    case v: ValDef =>
      v.tpt.tpe.typeSymbol.name
  }
  s"$name: $tpe"
}

Expr(
  s"$name(${caseFields.mkString(",")})"
)
```

And it gives this output:

```scala
"NonEmpty(e: T,tail: Option)"
```

Looks almost done. The only thing missing are the type parameters of Option. As I mentioned before, TypeRepr has many specific node types. So let’s take a look at some of them:

```scala
+- TypeRepr -+- NamedType -+- TermRef
            |              +- TypeRef
            +- AppliedType
            +- AndOrType -+- AndType
            |             +- OrType
            ...
```

There are more of them, so in a real-life scenario, we would have to handle all of them. But my example, my rules. Most of those types are structurally recursive, so will delegate our type extraction logic to a function. For every AST node type we can look for desired methods just like before. For NamedType there is a method name, for AppliedType we can just use unapply to get the tycon (Type Constructor) and args and so on. The result looks like this:

```scala
def fullTypeName(tpe: TypeRepr): String = tpe match
     case t: NamedType =>
       t.name
     case o: OrType =>
       fullTypeName(o.left) + " | " + fullTypeName(o.right)
     case o: AndType =>
       fullTypeName(o.left) + " & " + fullTypeName(o.right)
     case AppliedType(base, args) =>
       fullTypeName(base) + args.map(fullTypeName).mkString("[", ",", "]")
```

After using the function call in our main code. The result presents like this:

```scala
"NonEmpty(e: T,tail: Option[NonEmpty[T]])"
```

Which is exactly what we wanted :D

## Takeaways

The examples shown in this article are intentionally straightforward, just to show the basic process of working with TASTY reflect API. But the main ideas I wanted to show are:
- Look for node types in [Quotes](https://dotty.epfl.ch/api/scala/quoted/Quotes.html)
- Look for implementation and methods in [QuotesImpl](https://github.com/lampepfl/dotty/blob/main/compiler/src/scala/quoted/runtime/impl/QuotesImpl.scala)
- Macros in dotty are way easier to write than in Scala 2

Code for this example is available [here](https://github.com/KacperFKorban/tasty-macro-migration).

Medium link: https://medium.com/virtuslab/tasty-way-of-re-writing-macros-in-scala-3-3ce704a2c37c
