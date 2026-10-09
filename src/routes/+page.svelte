<svelte:head>
  <title>Kacper F. Korban — Programming languages and formal methods</title>
  <meta name="description" content="Kacper F. Korban" />
</svelte:head>

<main id="main-content" class="home-page">
  <section class="introduction" aria-labelledby="page-title">
    <div class="introduction-copy">
      <h1 id="page-title">Kacper F. Korban</h1>
      <p class="affiliation">PhD student, <a href="https://systemf.epfl.ch/">SYSTEMF</a>, EPFL</p>
      <p>I am a PhD student at <a href="https://systemf.epfl.ch/">SYSTEMF</a>@EPFL, supervised by <a href="https://pit-claudel.fr/clement/">Clément Pit-Claudel</a>. My research is focused on compilers (especially verified ones), programming languages and formal verification. I am also interested in developer tooling, types, and software engineering in general.</p>
      <p class="contact-links"><a href="mailto:kacper.korban@epfl.ch">E-mail</a> · <a href="https://github.com/KacperFKorban">GitHub</a> · <a href="https://scholar.google.com/citations?user=eTmlLwEAAAAJ">Google Scholar</a> · <a href="https://orcid.org/0009-0000-3878-2552">ORCID</a> · <a href="/cv.pdf">CV</a></p>
      <aside class="student-project-disclaimer" aria-label="Student projects">
        <strong>Student projects.</strong> If you are interested in verified compilation, interactive theorem proving, compilers, software verification, proof engineering, or developer tooling, <a href="mailto:kacper.korban@epfl.ch">get in touch</a>.
      </aside>
    </div>
    <figure class="portrait">
      <img src="/images/portrait.jpg" alt="Portrait of Kacper F. Korban" width="3072" height="3072" />
    </figure>
  </section>

  <section class="page-section structured-section" id="work" aria-labelledby="research-title">
    <h2 id="research-title">Selected work</h2>
    <div class="section-body">
      <ul class="selected-work">
        <li>
          <span class="work-label">ESOP 2024</span>
          <div>
            <h3><a href="https://scholar.google.com/citations?view_op=view_citation&amp;hl=pl&amp;user=eTmlLwEAAAAJ&amp;citation_for_view=eTmlLwEAAAAJ:d1gkVwhDpl0C">Verified Inlining and Specialisation for PureCake</a></h3>
            <p class="entry-meta">Hrutvik Kanabar, <strong>Kacper F. Korban</strong>, Magnus O. Myreen</p>
            <details>
              <summary>Abstract</summary>
              <p>Inlining is a crucial optimisation for functional languages. We implemented and verified function inlining and loop specialisation for PureCake, a verified compiler for a Haskell-like, purely functional, lazy language. A novel part of our formalisation justifies inlining by pushing and pulling let bindings. The work was mechanised in HOL4.</p>
            </details>
          </div>
        </li>
        <li>
          <span class="work-label">POPL SRC 2026</span>
          <div>
            <h3><a href="https://systemf.epfl.ch/posters/2025-bootstrapping/">Bootstrapping a verified compiler for an imperative language in Rocq</a></h3>
            <p class="entry-meta"><strong>Kacper F. Korban</strong>, Magnus O. Myreen, Clément Pit-Claudel · Silver medal</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</main>

<!--  To make it easier: <a href="TEMPLATE_LINK">here is a template for the e-mail.</a> -->

<!-- TEMPLATE CONTENT:
Subject: Semester Project

Hi Kacper,

My name is [YOUR_NAME]. I am a student in [YOUR_MAJOR_AND_YEAR].
I am interested in doing a semester project in:
[REMOVE UNNECESSARY OR ADD YOUR OWN]
- verified compilation
- interactive theorem proving
- compilers in general
- verification of software
- proof engineering
- developer tooling

[If you have a specific idea, write it here. Otherwise, leave blank. You can check out the list on the lab website for inspiration: https://systemf.epfl.ch/research.html#open-projects]

Best regards,
[YOUR_NAME]
-->
