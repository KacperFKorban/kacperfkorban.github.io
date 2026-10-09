<script lang="ts">
  import { posts } from '$lib/content';
</script>

<svelte:head>
  <title>Blog — Kacper F. Korban</title>
</svelte:head>

<main id="main-content" class="listing-page">
  <h1>Blog</h1>
  <ul class="post-list">
    {#each posts as post}
      <li>
        <a href={post.href}>{post.title}</a>
        <time datetime={post.date}>{post.date}</time>
      </li>
    {/each}
  </ul>
</main>
