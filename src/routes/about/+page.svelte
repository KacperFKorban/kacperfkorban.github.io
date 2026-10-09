<svelte:head>
  <title>About — Kacper F. Korban</title>
</svelte:head>

<main id="main-content" class="listing-page about-page">
  <h1>About</h1>
  <nav class="about-index" aria-label="About sections">
    <a href="#open-source">Open source</a>
    <a href="#education">Education</a>
    <a href="#experience">Work experience</a>
    <a href="#presentations">Public presentations</a>
    <a href="#student-projects">Student projects</a>
  </nav>

  <section class="page-section structured-section" id="open-source" aria-labelledby="open-source-title">
    <h2 id="open-source-title">Selected open source work</h2>
    <div class="section-body">
      <div class="entry">
        <h3><a href="https://github.com/scala/scala3">Dotty / Scala 3 compiler</a></h3>
        <p>I worked on the Scala 3 compiler with both the VirtusLab team and the LAMP team at EPFL.</p>
      </div>

      <div class="entry" id="inkuire">
        <h3><a href="https://github.com/VirtusLab/Inkuire">Inkuire</a></h3>
        <p>A tool for searching Scala 3 documentation using types as search keys.</p>
      </div>
      <div class="entry">
        <h3><a href="https://github.com/VirtusLab/AvocADO">AvocADO</a></h3>
        <p>A Scala 3 library that safely rewrites for-comprehensions into applicative or parallel counterparts at compile time.</p>
      </div>
      <div class="entry">
        <h3><a href="https://github.com/rocq-prover/vsrocq">VsRocq</a></h3>
        <p>I am a maintainer of the LSP implementation for Rocq &mdash; VsRocq </p>
      </div>
      <div class="entry">
        <h3><a href="https://github.com/softwaremill/quicklens">QuickLens</a></h3>
        <p>I developed its Scala 3 implementation using the Quotes metaprogramming API.</p>
      </div>
      <div class="entry">
        <h3><a href="https://github.com/scalameta/metals">Metals</a></h3>
        <p>I contributed end-marker inlay hints and code actions to the Scala language server and client.</p>
      </div>
    </div>
  </section>

  <section class="page-section structured-section" id="education" aria-labelledby="education-title">
    <h2 id="education-title">Education</h2>
    <div class="section-body">
      <p>I studied computer science at AGH University of Science and Technology in Kraków. My Bachelor's project used types as search keys for Kotlin documentation. The project later moved to Scala and evolved into <a href="#inkuire">Inkuire</a>. I worked on it with Andrzej Ratajczak and Filip Zybała, supervised by Bartosz Baliś.</p>
      <p>I completed a master's degree in computer science at Chalmers University of Technology in Gothenburg. My project, advised by Magnus O. Myreen, was on <a href="https://scholar.google.com/citations?view_op=view_citation&amp;hl=pl&amp;user=eTmlLwEAAAAJ&amp;citation_for_view=eTmlLwEAAAAJ:d1gkVwhDpl0C">verified inlining and specialisation for PureCake</a>.</p>
      <p>I am doing my PhD at EPFL in SYSTEMF. My first semester project was focused on modularity improvements to the Scala 3 compiler.</p>
      <p>I was a teaching assistant for CS-214 at EPFL in 2024 and 2025, coordinating its final web-application project and deployment.</p>
      <p>I received AGH Scholarships in 2018, 2020, and 2021, awarded to the top 10% of students at AGH UST.</p>
    </div>
  </section>

  <section class="page-section structured-section" id="experience" aria-labelledby="experience-title">
    <h2 id="experience-title">Work experience</h2>
    <div class="section-body">
      <p>I worked at VirtusLab as a Scala developer for slightly over five years. My projects included:</p>
      <ul>
        <li>A production management system for medium-sized companies.</li>
        <li>Scala open source work on Scaladoc, Inkuire, magnolia, Dotty / Scala 3 compiler, and others</li>
        <li>A Scala 2 to Scala 3 codebase migration for a large car manufacturer.</li>
        <li>Work on Besom, a Scala 3 SDK for Pulumi and infrastructure as code.</li>
        <li>A SQL transpiler that federated Big Data queries across warehouses for an AdTech / Big Data company.</li>
      </ul>
      <p>Technologies I used, in order of proficiency: Scala (ZIO, Cats, Spark Catalyst, Akka, Play!, Slick); Java; SQL (PostgreSQL, Snowflake, BigQuery, DuckDB, SparkSQL); TypeScript and JavaScript (Angular, AngularJS); HTML and CSS.</p>
    </div>
  </section>

  <section class="page-section structured-section" id="presentations" aria-labelledby="presentations-title">
    <h2 id="presentations-title">Public presentations</h2>
    <div class="section-body">
      <div class="entry">
        <h3><a href="https://systemf.epfl.ch/posters/2025-bootstrapping/">Bootstrapping a verified compiler for an imperative language in Rocq</a></h3>
        <p class="entry-meta">POPL ’26 Student Research Competition · 2026</p>
      </div>
      <div class="entry">
        <h3><a href="https://www.youtube.com/watch?v=5WXiA8Ah5Es">On track with tracked</a></h3>
        <p class="entry-meta">Scala Days · 2025</p>
      </div>
      <div class="entry">
        <h3><a href="https://www.meetup.com/pl-PL/wroclaw-scala-user-group/events/301754493/">Scala 3 features you probably haven’t used (yet)</a></h3>
        <p class="entry-meta">Wrocław Scala User Group · 2024</p>
      </div>
      <div class="entry">
        <h3><a href="https://www.youtube.com/watch?v=DiL4MMc60LU">Scala 3, but I have trust issues</a></h3>
        <p class="entry-meta">Scala Love · 2022</p>
      </div>
      <div class="entry">
        <h3><a href="https://www.youtube.com/watch?v=hPsowDgJDFo">Inkuire — Using types as search keys in Kotlin libraries</a></h3>
        <p class="entry-meta">Kotlin micro.sphere.it · 2021</p>
      </div>
    </div>
  </section>

  <section class="page-section structured-section" id="student-projects" aria-labelledby="student-projects-title">
    <h2 id="student-projects-title">Student projects</h2>
    <div class="section-body">
      <p>If you are interested in working on: verified compilation, interactive theorem proving, compilers in general, verification of software, proof engineering, developer tooling, <a href="mailto:kacper.korban@epfl.ch">get in touch</a>.</p>
      <div class="entry">
        <h3><a href="https://systemf.epfl.ch/blog/scala-explicit-reclamation/">Early Reclamation of Lazy Values in Scala</a></h3>
        <p class="entry-meta">Guillaume Carraux</p>
        <p>This project aimed to make the Scala 3 compiler clear local variables after their last use, so the garbage collector can reclaim their values. In the example below, the reference to <code>ints</code> remains on the stack while <code>foreach</code> runs, causing an out-of-memory error:</p>
        <pre><code>def print_forever() =
  val ints = LazyList.from(0)
  ints.foreach(println)</code></pre>
      </div>
      <div class="entry">
        <h3><a href="https://2026.workshop.scala-lang.org/details/scala-2026/3/Lorikeet-Flexible-code-rewriting-for-Scala-3">Flexible code rewriting for Scala 3</a></h3>
        <p class="entry-meta">Sidonie Bouthors</p>
        <p>This project develops a readable and expressive DSL (that is valid Scala 3 syntax) for writing code rewrite patterns and a rewriting engine that applies these rewrites (using scalafix). The aim of this project is to: (1) provide a tool for library maintainers to write migration rewrites (2) a tool for teachers to provide personalized code-quality feedback at scale.</p>
      </div>
      <!-- TODO: Velentin?, Tristan and Roman, Charlie -->
    </div>
  </section>
</main>
