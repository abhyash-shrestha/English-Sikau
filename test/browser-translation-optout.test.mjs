import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const coach=fs.readFileSync(new URL('../coach-v4-live.html',import.meta.url),'utf8');
const begin=index.indexOf("const browserTranslationMeta='<meta name=\"google\" content=\"notranslate\">';");
const finish=index.indexOf('frame.srcdoc=stagedHtml;',begin);
assert.ok(begin>0&&finish>begin,'Protected iframe language metadata injection exists');
const block=index.slice(begin,finish);
const makePrivate=new Function('enhancedHtml','noOldLessonFlash','earlyMicrophone',block+'return stagedHtml;');

test('The public English Sikau page tells Chrome not to offer whole-page translation',()=>{
 assert.match(index.slice(0,500),/<html lang="en" translate="no" class="notranslate">/);
 assert.match(index.slice(0,700),/<meta name="google" content="notranslate">/);
 assert.doesNotMatch(index.slice(0,300),/<html lang="ne">/);
});
test('Authenticated bilingual lessons have the same opt-out before the first paint',()=>{
 const original='<!doctype html><html lang="ne" class="course"><head><title>Lessons</title></head>'+
  '<body><div lang="ne">नमस्ते नेपाल</div><p>Learn English</p></body></html>';
 const result=makePrivate(original,'<style id="sikauNoOldLessonFlash"></style>','<script>void 0</script>');
 assert.match(result,/<html[^>]*lang="en"/);
 assert.match(result,/<html[^>]*translate="no"/);
 assert.match(result,/<html[^>]*class="course notranslate"/);
 assert.match(result,/<head><meta name="google" content="notranslate">/);
 assert.match(result,/<style id="sikauNoOldLessonFlash"><\/style>/);
 assert.match(result,/<div lang="ne">नमस्ते नेपाल<\/div>/);
 assert.match(result,/<p>Learn English<\/p>/);
});
test('Existing single-quoted or unquoted language attributes retain working HTML',()=>{
 const sample='<html lang=\'ne\' class=\'lesson dark\' translate=\'yes\'><head></head><body>कक्षा</body></html>';
 const out=makePrivate(sample,'','');
 assert.match(out,/<html[^>]*lang="en"/);
 assert.match(out,/<html[^>]*translate="no"/);
 assert.match(out,/<html[^>]*class="lesson dark notranslate"/);
 assert.match(out,/<body>कक्षा<\/body>/);
 assert.equal((out.match(/notranslate/g)||[]).length,2,'One class plus one meta');
 const unquoted=makePrivate('<html lang=ne class=course><head></head><body>study</body></html>','','');
 assert.match(unquoted,/<html[^>]*lang="en"/);
 assert.match(unquoted,/<html[^>]*class="course notranslate"/);
});
test('The independent Coach conversation frame is protected as well',()=>{
 assert.match(coach.slice(0,170),/<html lang="en" translate="no" class="notranslate">/);
 assert.match(coach.slice(0,210),/<meta name="google" content="notranslate">/);
});
test('Internal language picker, bilingual content, and protected lesson access remain',()=>{
 assert.match(index,/id="lessonFrame"/);
 assert.match(index,/sikauEnsureVisaNav/);
 assert.match(index,/enhanceTranslationDashboard/);
 assert.match(index,/langPref/);
 assert.match(index,/openedAccess=kind/);
 assert.match(index,/frame.srcdoc=stagedHtml/);
});
