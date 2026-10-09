<script lang="ts">
  import { page } from '$app/state';
  import { posts } from '$lib/content';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
  const post = $derived(posts.find((entry) => entry.href === page.url.pathname));
</script>

<svelte:head>
  {#if post}
    <title>{post.title} — Kacper F. Korban</title>
    <meta name="description" content={post.summary} />
  {/if}
</svelte:head>

{#if post}
  <main id="main-content" class="article-page">
    <p><a href="/writing/">← Blog</a></p>
    <article>
      <header class="article-header">
        <h1>{post.title}</h1>
        <p><time datetime={post.date}>{post.date}</time> · {#each post.author.split('Kacper F. Korban') as part, index}{part}{#if index < post.author.split('Kacper F. Korban').length - 1}<strong>Kacper F. Korban</strong>{/if}{/each}</p>
        <p class="article-tags">{post.tags.join(', ')}</p>
      </header>
      <div class="prose">{@render children()}</div>
    </article>
    <p class="article-end"><a href="/writing/">← Blog</a></p>
  </main>
{:else}
  {@render children()}
{/if}
