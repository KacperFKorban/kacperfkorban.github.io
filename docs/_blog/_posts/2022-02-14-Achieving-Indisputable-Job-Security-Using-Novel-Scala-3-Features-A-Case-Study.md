---
layout: blog-page
title: "Achieving Indisputable Job Security Using Novel Scala 3 Features: A Case Study"
author: Kacper Korban
tags: [scala, scala 3]
date: 2022-02-14
---

# Achieving Indisputable Job Security Using Novel Scala 3 Features: A Case Study

## Disclaimer

Most of the article is to be perceived as a joke or satire.
The post is intended as a light read. If you manage to get any educational value from it, you will most likely also enjoy reading the ingredients list of 2% milk.
Enjoy!

# Intro

We computer programmers frequently state that we code because it is our passion, or because we enjoy building things, or for some other fanciful reason. At the end of the day, though, all Software Engineers write code to make money. This has been on my mind quite a bit lately. So I did some market research and analysis, and after crunching all the figures, I put my findings into this graphic.

![](images/job_security_scala/image2.png)

There it is plain and simple. You can clearly see that having a job has a huge impact on the amount of money you make. This is where Scala 3 comes in. We will employ Scala 3 to ensure complete job security. How are we going to do that? It’s easy! By making the code impossible to read. If no one else can maintain, let alone read, our code, we will never get fired!
In this article, I will use the most straightforward programming problems like “Hello World” or “isPrime” to demonstrate how you can master this essential skill.

### Running the examples

This might be a good time to say that since all the snippets in this blog post are GitHub Gists, you can run them using [scala-cli](https://scala-cli.virtuslab.org/) easily, using the command below.

```scala
> scala-cli run gist-url
```

## Hello World

Ok, let’s start with the best-known coding “problem” i.e. “Hello World”. In Scala 3, the solution to this problem usually looks like this:

```scala
@main
def main =
  println("Hello World")
```

### The good stuff

How do we make this simple code unreadable? Well, instead of writing the code explicitly, we can generate the code that prints the output? Sounds promising! After all, generating code isn't easy, right?

```scala
import scala.quoted.*

inline def helloWorld =
  ${ helloWorldImpl }

def helloWorldImpl(using Quotes): Expr[Unit] =
  '{ println("Hello World") }
```

Well, it turns out that it’s really straightforward. We just add an inline method that calls an actual implementation. And the actual implementation is the quoted code from our previous solution.

### Abstract tree

We've hit a minor obstacle. How can we get around it?
The biggest problem with our implementation is that what was generated is very obvious as we just quoted our code and spliced it.
How about we disallow quoted blocks then? That way, the generated code will be way more obscure.
Exactly what do we need to do here? First, we need to return something that is of type `Expr[Unit]` and is semantically equivalent to `{ println("Hello World") }`.
The main ways to construct `Expr` are using helper functions in its companion object or creating an (Abstract syntax) `Tree` and converting it to an `Expr`.

Yeah, right, `Expr's and `Tree's, we don't really care about the semantics. We know that our expression should be the same as quoted `println("Hello World")`. So, let's do what software developers usually do: put a bunch of `println's in random places and hope for the best.

```scala
def helloWorldImpl(using Quotes): Expr[Unit] =
  println('{ println("Hello World") }.asTerm)
  '{ () }
```

After running it, at compile time we get:

```scala
Inlined(Ident(helloworldMacro$package$),List(),Apply(Ident(println),List(Literal(Constant(Hello World)))))
```

We can ignore the `Inlined` because it means that the term we got was an inlined expression. The exciting part is:

```scala
Apply(Ident(println),List(Literal(Constant(Hello World))))
```

So it’s an `Apply` which is a function application of `Ident(println)` to `List(Literal(Constant(Hello World)))`. Great, let’s try recreating it using Quotes API. So, let’s construct an `Apply`, along with ‘Something’ as the first argument and a list containing a string literal as the second:

```scala
private def helloWorldImpl(using Quotes): Expr[Unit] =
  import quotes.reflect.*

  val tree = Apply(???, List(Literal(StringConstant("Hello World"))))

  tree.asExprOf[Unit]
```

It's a good start, but what about the `???`? Well… it has to be the reference of `println` and from the definition of `ApplyModule.apply`, it has to be a `Term`. From this, we can imply that what we are looking for is most likely `Ref`, which requires a Symbol.


The Symbol object has methods with a naming pattern beginning with `required`, for example: `requiredClass`, `requiredMethod`, `requiredModule`, `requiredPackage` and so on. Those methods let us 'summon' symbols of a specific type defined in the compilation unit or on the classpath. Seems great since we want a static method, right? Let's try.

```scala
private def helloWorldImpl(using Quotes): Expr[Unit] =
  import quotes.reflect.*

  val prntln: Ref =
    Symbol.requiredMethod("scala.Predef.println").pipe(Ref(_))

  val tree = Apply(prntln, List(Literal(StringConstant("Hello world"))))

  tree.asExprOf[Unit]
```

Note: We use `pipe` here, a function from `scala.util.chaining`. Although the actual implementation is slightly different, it can be thought of like so:

```scala
extension [A](a: A)
  def pipe[B](f: A => B): B = f(a)
```

If you see a similarity with `|` bash, then you’re absolutely right. That’s one of the inspirations for it. And If you see a resemblance with `$` or `&` from Haskell, then you should go out more often.

Right, we can now run it.

```scala
[error] ./main.scala:31:3: Exception occurred while executing macro expansion.
[error] dotty.tools.dotc.core.TypeError: Failure to disambiguate overloaded reference with
[error]   method println in object Predef: (x: Any): Unit  and
[error]   method println in object Predef: (): Unit
[error] 	at dotty.tools.dotc.core.Denotations$MultiDenotation.suchThat(Denotations.scala:1244)
[error] 	at dotty.tools.dotc.core.Denotations$Denotation.requiredSymbol(Denotations.scala:297)
[error] 	at dotty.tools.dotc.core.Symbols$.requiredMethod(Symbols.scala:908)
[error] 	at scala.quoted.runtime.impl.QuotesImpl$reflect$Symbol$.requiredMethod(QuotesImpl.scala:2450)
[error] 	at scala.quoted.runtime.impl.QuotesImpl$reflect$Symbol$.requiredMethod(QuotesImpl.scala:2450)
[error] 	at tmp.tmp$package$.helloWorldImpl(tmp.scala:12)
[error] 	at tmp.tmp$package$.inline$helloWorldImpl(tmp.scala:9)
```

Cool, we got some good old-fashioned compiler error, with many references to compiler internals in the stack trace. That’s what we wanted to see.
Well, except that after skipping the first line, the message is actually pretty reasonable. There simply are two functions named `println` at this path. And the scaladoc confirms it:

![](images/job_security_scala/image1.png)

That means that we cannot solve the problem that easily. But that’s good. The more code, the less readable it becomes. If we cannot access the method itself, let’s access the owner first and get the method from the list of its members. The way we do that is:

```scala
Symbol.required("scala.Predef")
```

Get its member methods named ‘println’...

```scala
  .memberMethod("println")
```

Then filter out the methods with no arguments…

```scala
  .flatMap { m =>
    m.tree match
      case defdef: DefDef
        if !defdef.paramss.flatMap(_.params).isEmpty => Some(m)
      case _ => None
  }
```

And finally, just take the `head` of the list and wrap it in `Ref`...

```scala
  .head.pipe(Ref(_))
```

Cool. So, after composing it into our previous template, we get:

```scala
private def helloWorldImpl(using Quotes): Expr[Unit] =
  import quotes.reflect.*

  val prntln = Symbol.requiredPackage("scala.Predef")
    .memberMethod("println")
    .flatMap { m =>
      m.tree match
        case defdef: DefDef
          if !defdef.paramss.flatMap(_.params).isEmpty => Some(m)
        case _ => None
    }.head.pipe(Ref(_))

  val tree = Apply(prntln, List(Literal(StringConstant("Hello world"))))

  tree.asExprOf[Unit]
```

And testing it gives us…

```
> scala-cli run ...
Hello World
```

Great! And just like that, we were able to utilize metaprogramming to write confusing and unmaintainable code.

## Not so simple algebra

Since we've already done quite a few Hello-Worlds. Let's change things up a bit now. Several well-known problems are usually used to learn recursion, e.g. the Fibonacci sequence, factorial, greatest common divisor, is prime, etc. Let's pick one at random; let's choose is prime.

Now you may start asking yourself: "How can I really be sure that it's actually at random?".
And my answer to you would be: "My blog post, my rules. So if I say that it's random, then it's random, ok?"

### Vanilla

Let’s implement the standard version as a warm-up.

```scala
def isPrimeCheat(a: Int): Boolean =
  2.until(a).forall(a % _ != 0)
```

Looks okay, right? RIGHT?! Of course not. I mean… it correctly checks if a number is prime, I’ll give you that. But we said that it’s an exercise for recursion. And do you see any recursion here? Let’s fix it then.

```scala
def isPrime(a: Int, acc: Int = 2): Boolean =
  if a <= acc then a == acc
  else a % acc != 0 && isPrime(a, acc+1)
```

See? It looks better now.

### No value calculations

Now that the warm-up is over, how do we make this unreadable? How about disallowing the use of values? Sounds great, but can we make it work?
The answer is obviously yes; we can use types.
Scala 3 has a pretty impressive type system that can operate on singleton types. We can say that the type of `1` is `1` and `1` is a subtype of `Int`. Cool right?
We also know that there is a pretty comprehensive set of type families (functions on type-level) that let us operate on singleton types. This means that we can almost rewrite our standard implementation 1:1. A reasonable attempt will look like this:

```scala
import scala.compiletime.ops.int.*

type IsPrime[A <: Int] = IsPrimeRec[A, 2]

type IsPrimeRec[A <: Int, B <: Int] <: Boolean = A <= B match
  case true => A == B
  case false => A % B != 0 && IsPrimeRec[A, S[B]]
```

First of all, we cannot have default parameters, so we will have to create a proxy function that calls our actual implementation. Then when we look at the actual definition, it is really similar to what we wrote on the value level. The only difference is that we used a match instead of an if statement. And that’s because Scala has match types, but there is no such thing as if-else types.

You might be thinking now: “Hold on a sec. How are we going to print the result if it’s a type?”.
First of all: Ok, smarty-pants. And secondly, we can use the function `constValue` from `scala.compiletime`, which lets us summon values of a given type if the type has a single decidable inhabitant. Like so:

```scala
import scala.compiletime.*

@main
def main =
  println(constValue[IsPrime[13]])
  println(constValue[IsPrime[12]])
```

So when we run it, we get:

```scala
> scala-cli run ...
true
false
```

Success!

### Manual labor

What did we learn from our exercise just now? Scala 3 makes type-level programming (at least for chosen types) way too easy. Mainly, that's because there are so many util functions. That's right, you know what's coming. Let’s limit our usage of functions from `scala.compiletime.ops.int` to just `S`.
If you don't know what `S` does, let me explain. It's a type-level successor function for integers. So e.g. S[0] = 1, S[1] = 2 and so on.
And why did we choose `S` in the first place? That's because, together with the literal `0`, it works just like the definition of an inductive set for natural numbers. And since all of our operations are only required to work on natural numbers, we're going to implement them that way, so it's undefined behaviour for negative numbers.

Since the only thing that has to change is the declarations of the helper function, the actual implementation can stay as it was.

```scala
type IsPrimeRec[A <: Int, B <: Int] <: Boolean = A <= B match
  case true => A == B
  case false => A % B != 0 && IsPrimeRec[A, S[B]]
```

What function do we need to implement first? Looks like it’s going to be `<=`. Since we are implementing it for natural numbers, it seems obvious that the implementation has to follow their inductive definition.

```scala
type <=[A <: Int, B <: Int] <: Boolean = A match
  case 0 => true
  case S[a] =>
    B match
      case 0 => false
      case S[b] => a <= b
```

It's pretty simple:
- if `A` is zero then it is smaller or equal to any natural number
- otherwise `A` is a successor of any `a`, so:
  - if `B` is zero then it cannot be larger or equal than `S[a]`
  - otherwise `B` is a successor of any `b` and we check if their predecessors satisfy the predicate.

Let's do the % next. This one is also pretty simple and looks like this:

```scala
type %[A <: Int, B <: Int] <: Int = A < B match
  case true => A
  case _ => (A - B) % B
```

Nothing exciting going on here. If A is smaller than B, just return B; otherwise, return (A-B) % B.

The rest of the functions are left as an exercise for the reader, but let’s check if it works?

```
> scala-cli run ...
true
false
```

## Conclusions

So, what did we learn from this article? Mainly that, in Scala 3, even code that's meant to be complicated isn't actually that bad. And writing unreadable code requires some skill.

So, why not use some of the languages that are unmaintainable by definition, like Rust or Python?
In the case of Rust, it is pretty easy: nobody actually uses Rust; people just like talking about using Rust.
And when it comes to Python, the problem is that every program in Python is unmaintainable, and we wanted to write code that is readable only to us.

Medium link: https://medium.com/virtuslab/achieving-indisputable-job-security-using-novel-scala-3-features-a-case-study-65180eab810a
