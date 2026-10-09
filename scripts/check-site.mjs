import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const site = 'build';
const htmlFiles = readdirSync(site, { recursive: true }).filter((file) => file.endsWith('.html'));
const articles = htmlFiles.filter((file) => /^writing\/[^/]+\/index\.html$/.test(file));
const legacy = htmlFiles.filter((file) => file.startsWith('docs/blog/'));
assert.equal(articles.length, 4, 'all four articles must be published');
assert.equal(legacy.length, 5, 'old blog URLs must remain reachable');
assert.equal(readFileSync(join(site, 'CNAME'), 'utf8').trim(), 'korban.dev');
for (const font of ['Libertine-Regular', 'Libertine-Bold', 'Libertine-Italic', 'Biolinum-Regular', 'Biolinum-Bold', 'Inconsolata-Regular']) {
  assert(existsSync(join(site, 'fonts', `${font}.woff`)), `missing font: ${font}`);
}

for (const file of htmlFiles) {
  const html = readFileSync(join(site, file), 'utf8');
  assert.doesNotMatch(html, /<script\b/i, `${file} must work without JavaScript`);
  for (const [, path] of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const target = join(site, path.endsWith('/') ? `${path}index.html` : path);
    assert(existsSync(target), `${file} links to missing ${path}`);
  }
}

for (const file of articles) {
  assert.match(readFileSync(join(site, file), 'utf8'), /<article>/);
}
for (const file of legacy) {
  assert.match(readFileSync(join(site, file), 'utf8'), /http-equiv="refresh"/);
}

console.log(`Checked ${htmlFiles.length} HTML pages, including ${articles.length} articles, without browser JavaScript.`);
