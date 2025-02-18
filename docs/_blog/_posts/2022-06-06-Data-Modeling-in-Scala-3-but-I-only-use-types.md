---
layout: blog-page
title: "Data Modeling in Scala 3, but I only use types"
author: Kacper Korban
tags: [scala, scala 3]
date: 2022-06-06
---

# Data Modeling in Scala 3, but I only use types

That’s the whole idea.

We want to model data in Scala, but instead of using instances of classes at the term level, we want to use their type-constructors at the type level.

## Recruitment system

Let’s pick an example to help us visualize the whole process better, because just like a wise person once said “A picture is worth a thousand words”.

We will represent candidate profiles in a recruitment process for software engineering companies. Let’s start with the term model code and I’ll walk you through it.

```scala
case class Candidate(
  name: String,
  experience: List[Experience],
  otherQualities: List[String]
)

case class Experience(
  duration: Int,
  expLevel: ExpLevel,
  company: String,
  technologies: List[String]
)

enum ExpLevel:
  case Junior
  case Regular
  case Senior
  case CEO
export ExpLevel.*
```

We can represent candidates by providing their:
- name – just a String
- experience history – list of Experience entries
- other qualities – list of string

And experience entry is represented by:
- duration – number of months at the job
- experience level – enum value representing experience levels in IT
- company name – a String
- technologies – list of technologies used

So if we were to create a very simplified profile using our model, it will look like this.

```scala
val candidate = Candidate(
  "John Paul",
  Experience(
    29,
    Junior,
    "VirtusLab",
   "Scala" :: Nil
  ) :: Nil,
  "Motivated" :: Nil
)
```

Cool, nothing new so far.

## Making it spicier

That was some basic Scala. Now what we want to do: is to be able to have all this information on the type level.

You might be asking: We already declared a model in the previous section. Can’t we just use that one?
As expected, the answer is: No. That’s because Scala distinguishes terms from types. The previous model worked on the term level, and we want to do it on the type level. So, we will have to tweak it a bit.

To make our intentions 100% clear, we want to be able to declare a type like the following (or at least similar).

```scala
type candidate = Candidate[
  "John Paul",
  Experience[
    29,
    Junior,
    "VirtusLab",
    "Scala" :: Nil
  ] :: Nil,
  "Motivated" :: Nil
]
```

Let’s start our work with the most basic class and work our way up the dependency graph.

### Experience level

First, let’s look at **ExpLevel**. We declared it before as

```scala
enum ExpLevel:
  case Junior
  case Regular
  case Senior
  case CEO
export ExpLevel.*
```

When we think about it, its type constructors carry the same amount of information as its data constructors, so we could leave it as it is.
There is a small problem with the current declaration though. When we want to access the type of `Junior` and use it as e.g. a type parameter for `List`, we cannot just say `List[Junior]`. That’s because there is no such type constructor as `Junior`. Instead, we will have to type `List[Junior.type]`. This can be quite annoying, specifically when it’s a part of the interface exposed to the user.
Is there a way to fix it then? Yes, and it’s actually quite simple. Just like by writing in Python I can force myself into a crippling depression, you can force Scala to generate classes for all our cases by just adding parentheses after the constructors. Then, those won’t just be values, but classes with empty constructors.

```scala
enum ExpLevel:
  case Junior()
  case Regular()
  case Senior()
  case CEO()
export ExpLevel.*
```

Nice, on to the next one.

### Experience

Now that we fixed the `ExpLevel` data type, let’s move on to Experience. In the term model, it looked like this

```scala
case class Experience(
  duration: Int,
  expLevel: ExpLevel,
  company: String,
  technologies: List[String]
)
```

We want all of those term parameters to become type parameters, so let’s try just adding them.
The strategy will be, for every term parameter we will:
1. create a type parameter with the same name
2. add a type constraint for it using <: operator

It is important that we use <: here and not :. That is because, when used on types, the first one is semantically equivalent to “is subtype of” and the latter means “has implicit instance of”.
Let’s take a look at the result of our transformation then.

```scala
case class Experience[
  duration <: Int,
  expLevel <: ExpLevel,
  company <: String,
  technologies <: List[String]
]()
```

At first glance, it looks ok and it looks very similar to the term model. We have an entry for every parameter and the constraints are the same as before. But does it work? Well, no. If I were to play the role of a build tool, I would say that we have one warning and one error.

Let’s start with the warning. Take a look at this class and think, what does the `case` keyword give us here. Well, it gives us the `apply` function to our empty constructor, `getters` to our non-existent fields, the `unapply` function for a class we will never construct, and some other extremely useful methods.
Do you get the point? The `case` keyword here is just as useful as a cats-effect expert at Ziverge.

Cool. On to the error now. This one might not be as easy to spot. To make it easier, let’s look at how List is implemented. Skipping a lot of details, we have:

```scala
sealed abstract class List[+A]
final case class :: [+A](head: A, next: List[A]) extends List[A]
case object Nil extends List[Nothing]
```

We have a supertype `List` and two type constructors `::` (cons) and `Nil`.
`Nil`, carries no information since it just symbolizes an empty list. No problem here.
But, when we take a look at `::`, it only has one type parameter. This would mean that it will only be able to carry the definition of one `String`.

Let’s create our own data structure then. To make it easier, it should only contain `String`s.

```scala
sealed trait StrList
class Nl extends StrList
class :|:[head <: String, tail <: StrList] extends StrList
```

Voila. We just take a look at the definition of List and move every term parameter to type-level, like before.

If we put all the parts together, we get.

```scala
class Experience[
  duration <: Int,
  expLevel <: ExpLevel,
  company <: String,
  technologies <: StrList
]
```

### Candidate

Let’s take a look at our last class – `Candidate`.

```scala
case class Candidate(
  name: String,
  experience: List[Experience],
  otherQualities: List[String]
)
```

Right off the bat, we can spot similar problems as with `Experience` – Lists. Fortunately, we already have a structure for type-level lists of Strings from before. This means that we just need lists of `Experience`s. We can declare it in a similar way as with lists of strings, right? Let’s try.

```scala
sealed trait Experiences
class Empty extends Experiences
class :+:[head <: ???, tail <: Experiences] extends Experiences
```

Ok. This looks exactly like the `StrList` with some minor name changes. Why is there a question mark instead of the constraint of head? That’s because we cannot use `Experience` there. `Experience` is a type constructor that takes a non-empty parameter list. We would have to specify it on the spot.

Is there some trick we can use here? Or is Scala’s type system not expressive enough?
Of course, there is a workaround. It is also quite a common pattern. It’s every functional programmer’s biggest nightmare and every object-oriented programmer’s wet dream: `Inheritance`.

If we add a supertype to our `Experience` class, we can use it in every place where we would usually use a type and treat `Experience` as the implementation.

```scala
sealed trait Exp
class Experience[
  ...
] extends Exp
```

Is this solution pretty? No.
But as the tapeworm said: There was no other way.

Now that we have fixed this issue, there is nothing interesting anymore with transforming the `Candidate` class.

```scala
class Candidate[
  name <: String,
  experience <: Experiences,
  otherQualities <: StrList
]
```

## Final form

After all that work we can finally write our correct example instance.

```scala
type mystery = Candidate[
  "John Paul",
  Experience[
    29,
    Junior,
    "VirtusLab",
    "Scala" :|: Nl
  ] :+: Empty,
  "Motivated" :|: Nl
]
```

And it compiles, which means that it works!

## C'mon, Do Something

Now, you’re probably thinking: “Cool, we can model data now but there is more to computer systems than just data.” There is always some domain logic that needs to be implemented. In our case, we should definitely add some sanity checks. Like removing any experience in Rust and adding a “Good sense of humor” quality instead.

Can we do that? Yes, but since this blog post is already longer than the documentation for `http4s` I will have to end it here and if this blog post gets enough views, I will write a part II.

I hope the content was at least mildly interesting and that you didn’t take anything I wrote seriously. Especially type-level programming.

Medium link: https://medium.com/virtuslab/data-modeling-in-scala-3-but-i-only-use-types-b6f11ead4c28
