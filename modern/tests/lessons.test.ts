import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lessons, visibleLessons, selectorFor, normalizeLanguage } from '../src/lessons.ts';

test('lesson IDs and native selectors are unique', () => {
  assert.equal(new Set(lessons.map(item => item.id)).size, lessons.length);
  assert.equal(new Set(lessons.map(item => item.selector)).size, lessons.length);
});
test('only existing eligible native routes are shown', () => {
  const items = visibleLessons(selector => selector === '[data-t="coach"]' || selector === '.sikau-visa-nav');
  assert.deepEqual(items.map(item => item.id), ['coach', 'visa']);
  assert.deepEqual(visibleLessons(() => false), []);
});
test('all registered tabs have nonempty bilingual labels and exact selectors', () => {
  for (const item of lessons) {
    assert.equal(selectorFor(item.id), item.selector);
    assert.ok(item.en.trim());
    assert.ok(item.ne.trim());
  }
});
test('language preference defaults to bilingual and preserves valid choices', () => {
  for (const mode of ['en', 'en-ne', 'en-roman', 'all']) assert.equal(normalizeLanguage(mode), mode);
  assert.equal(normalizeLanguage(undefined), 'en-ne');
  assert.equal(normalizeLanguage('invalid'), 'en-ne');
});
