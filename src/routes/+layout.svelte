<script lang="ts">
  import '../app.css';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<div class="site-shell">
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header class="site-header">
    <a class="brand" href="/">Kacper F. Korban</a>
    <nav aria-label="Main navigation">
      <a href="/">Home</a>
      <a href="/writing/">Blog</a>
      <a href="/about/">About</a>
    </nav>
  </header>

  {@render children()}

  <footer class="site-footer">
    <span>© {new Date().getFullYear()} Kacper F. Korban</span>
    <div>
      <a href="mailto:kacper.korban@epfl.ch">Email</a>
      <a href="https://github.com/KacperFKorban">GitHub</a>
      <a href="https://scholar.google.com/citations?user=eTmlLwEAAAAJ">Google Scholar</a>
      <a href="https://orcid.org/0009-0000-3878-2552">ORCID</a>
      <a href="/cv.pdf">CV</a>
    </div>
  </footer>
</div>
