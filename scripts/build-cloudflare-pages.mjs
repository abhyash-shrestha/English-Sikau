/**
 * Build only English Sikau's public classroom UI for Cloudflare Pages.
 *
 * Important: The repository also contains Appwrite server functions and tests.
 * Those must NOT become Pages Functions or be copied into the public site.
 *
 * Cloudflare Pages configuration:
 *   Root directory: cloudflare-site
 *   Build command: node ../scripts/build-cloudflare-pages.mjs
 *   Build output directory: dist
 */
import { cpSync, copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(repoRoot, 'cloudflare-site', 'dist');
const publicExtensions = new Set(['.html', '.js', '.css']);

if (!existsSync(join(repoRoot, 'index.html'))) {
  throw new Error('English Sikau index.html is missing; refusing to create an incomplete site.');
}

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

let count = 0;
for (const item of readdirSync(repoRoot, { withFileTypes: true })) {
  if (!item.isFile() || !publicExtensions.has(extname(item.name).toLowerCase())) continue;
  copyFileSync(join(repoRoot, item.name), join(output, item.name));
  count += 1;
}

if (existsSync(join(repoRoot, 'assets'))) {
  cpSync(join(repoRoot, 'assets'), join(output, 'assets'), { recursive: true });
}

if (!existsSync(join(output, 'index.html'))) {
  throw new Error('Cloudflare Pages site must contain index.html at its root.');
}

console.log('English Sikau Pages build ready: ' + count + ' HTML/CSS/JS files and public assets.');
console.log('Private Appwrite functions, tests, and repository metadata are excluded.');
