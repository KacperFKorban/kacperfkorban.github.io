/**
  * Some interesting projects, I have worked on.
  */
object Projects:
  /**
    * Dotty is the Scala 3 compiler. I worked on it both as part of the
    * VirtusLab team and as part of the LAMP/EPFL team.
    * 
    * @see [[https://github.com/scala/scala3]]
    */
  class Dotty
  /**
    * Inkuire is a Scala 3 tool for searching the Scala 3 documentation by using
    * types as search keys.
    * 
    * @see [[https://github.com/VirtusLab/Inkuire]]
    */
  class Inkuire
  /**
    * AvocADO is a Scala 3 library for safely rewriting for-comprehensions into
    * their applicative/parallel conterparts during compile time.
    *
    * @see [[https://github.com/VirtusLab/AvocADO]]
    */
  class AvocADO

/**
  * A list of my publications.
  */
object Publications:
  /**
    * **Verified Inlining and Specialisation for PureCake**
    *
    * Inlining is a crucial optimisation when compiling functional programming
    * languages. This paper describes how we have implemented and verified
    * function inlining and loop specialisation for PureCake, a verified
    * compiler for a Haskell-like (purely functional, lazy) programming
    * language. A novel aspect of our formalisation is that we justify inlining
    * by pushing and pulling -bindings. All of our work has been mechanised in
    * the HOL4 interactive theorem prover.
    * 
    * @see [[https://scholar.google.com/citations?view_op=view_citation&hl=pl&user=eTmlLwEAAAAJ&citation_for_view=eTmlLwEAAAAJ:d1gkVwhDpl0C]]
    * @note Authors: Hrutvik Kanabar, Kacper Korban, Magnus O Myreen
    * @since ESOP 2024
    */
  class VerifiedInliningandSpecialisationforPureCake

/**
  * Some basic info about me.
  */
object AboutMe:
  /**
    * Work e-mail kacper.korban@epfl.ch
    * 
    * Private e-mail: kacper.f.korban@gmail.com
    */
  class Contact

/**
  * My education history.
  */
object Education:
  /**
    * I did my Bachelors in Computer Science at AGH University of Science
    * and Technology in Cracow.
    *
    * My Bachelor's project was about using types as search keys for Kotlin
    * documentation. Kotlin later changed to Scala and the project evolved into
    * Inkuire. The project was done togather with Andrzej Ratajczak and Filip
    * Zybała. It was supervised by Bartosz Baliś.
    *
    * @see [[Projects.Inkuire]]
    */
  class Bachelors
  /**
    * I did my Masters in Computer Science at Chalmers University of Technology
    * in Gothenburg.
    *
    * My Master's project was about verified inlining and specialisation for
    * PureCake. My advisor was Magnus O. Myreen.
    *
    * @see [[Publications.VerifiedInliningandSpecialisationforPureCake]]
    */
  class Masters
  /**
    * I am currently doing my PhD at EPFL. (SystemF/LAMP)
    * 
    * I am currently doing my semester project in the SystemF lab.
    * 
    * I did my first semester project working on the Scala 3 Compiler, mainly the modularity improvements.
    */
  class PhD

/**
  * My work experience.
  */
object WorkExperience:
  /**
    * I worked at VirtusLab as a Scala developer for slightly over 5 years.
    *
    * The projects I worked on were:
    * - A production management system for medium sized companies.
    * - Scala open-source projects e.g. Scaladoc, Inkuire, magnolia
    * - Dotty - Scala 3 compiler
    * - Scala 2 to Scala 3 migration for a large car manufacturer
    * - Scala 3 SDK for pulumi called Besom (infrastucture as code)
    * - SQL transpiler for federating BigData query execution between different
    *   data warehouses for an AdTech/BigData company
    *
    * Technologies I used (in order of proficiency):
    * - Scala (ZIO, Cats, Spark [Catalyst], Akka, Play!, Slick)
    * - Java
    * - SQL (PostgreSQL, SnowFlake, BigQuery, DuckDB, SparkSQL)
    * - TypeScript, JavaScript (Angular, AngularJS)
    * - HTML/CSS
    */
  class VirtusLab
