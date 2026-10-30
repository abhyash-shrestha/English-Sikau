import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const site = join(repo, 'cloudflare-site', 'dist');

test('Pages build copies the public site but never deploys Appwrite server functions', () => {
  execFileSync(process.execPath, [join(repo, 'scripts', 'build-cloudflare-pages.mjs')], {
    cwd: repo,
    encoding: 'utf8',
  });

  for (const file of ['index.html', 'coach-v4-live.html', 'coach-dashboard.js',
    'speech-input.js', 'all-tabs-responsive.css', 'assets/nepal-districts-lite.json']) {
    assert.ok(existsSync(join(site, file)), 'Missing public file: ' + file);
  }

  assert.equal(
    readFileSync(join(site, 'index.html'), 'utf8'),
    readFileSync(join(repo, 'index.html'), 'utf8'),
    'Must preserve exact login and authenticated classroom content'
  );

  for (const directory of ['functions', 'test', '.github', 'scripts']) {
    assert.ok(!existsSync(join(site, directory)), 'Sensitive source published: ' + directory);
  }
  for (const item of readdirSync(site)) {
    assert.ok(
      item === 'assets' || /\.(html|js|css)$/i.test(item),
      'Unexpected public root file: ' + item
    );
  }
});
