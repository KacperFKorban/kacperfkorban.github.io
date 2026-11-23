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
      <p>Before coming to EPFL I did my Master's degree at Chalmers University of Technology. My Master's project was about Verified Inlining in PureCake, supervised by <a href="https://www.cse.chalmers.se/~myreen/">Magnus O. Myreen</a>. I also worked at <a href="https://virtuslab.com/">VirtusLab</a>, where among others I was involved in developing Scala (and related tools).</p>
      <p class="contact-links"><a href="mailto:kacper.korban@epfl.ch">E-mail</a> · <a href="https://github.com/KacperFKorban">GitHub</a> · <a href="https://scholar.google.com/citations?user=eTmlLwEAAAAJ">Google Scholar</a> · <a href="https://orcid.org/0009-0000-3878-2552">ORCID</a> · <a href="/cv.pdf">CV</a></p>
      <aside class="collaboration-disclaimer" aria-label="Collaborations">
        <strong>Collaborations.</strong> I am always open to collaboration opportinuties, so if anything I do seems interesting: <a href="mailto:kacper.korban@epfl.ch">get in touch</a>.
      </aside>
    </div>
    <aside class="introduction-sidebar" aria-label="Portrait and recent activity">
      <figure class="portrait">
        <img src="/images/portrait.jpg" alt="Portrait of Kacper F. Korban" width="3072" height="3072" />
      </figure>
      <section class="recent-activity" aria-labelledby="activity-title">
        <h2 id="activity-title">Recent activity</h2>
        <ul>
          <li><time datetime="11.2026">Nov '26</time> Paper on bootstrapping a verified imperative compiler accepted to CPP'27!</li>
          <li><time datetime="05.2026">May '26</time> Visited ENS Lyon and gave an (informal) talk about verified bootstrapping.</li>
          <li><time datetime="04.2026">Apr '26</time> Paper on Flexible code rewriting for Scala 3 accepted to Scala Workshop 2026!</li>
          <li><time datetime="01.2026">Jan '26</time> <a href="https://systemf.epfl.ch/posters/2025-bootstrapping/">Silver medal</a> at the POPL Student Research Competition.</li>
        </ul>
      </section>
    </aside>
  </section>

  <section class="page-section structured-section" id="work" aria-labelledby="research-title">
    <h2 id="research-title">Selected work</h2>
    <div class="section-body">
      <ul class="selected-work">
        <li>
          <span class="work-label">(to apprear in) CPP 2027</span>
          <div>
            <h3>Bootstrapping a Verified Compiler for an Imperative Language in Rocq and HOL4</h3>
            <p class="entry-meta"><strong>Kacper F. Korban</strong>, Magnus O. Myreen, Clément Pit-Claudel</p>
            <details>
              <summary>Abstract</summary>
              <p>Verified compilers are typically not verified end-to-end: theorems are proved about in-logic definitions, but the actual compiler binary is obtained using a combination of unverified extraction and unverified compilation. There is an alternative approach---bootstrapping: compiling the compiler with itself. This technique has been demonstrated for functional languages in HOL4 but neither for imperative languages nor in constructive proof assistants. We present a generic technique for bootstrapping verified compilers for imperative languages and demonstrate it with implementations in both Rocq and HOL4. In Rocq, our approach relies on a new variant of relational compilation that supports proof-producing reification of pattern matching and recursion, including nonstructural recursion.</p>
            </details>
          </div>
        </li>
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
