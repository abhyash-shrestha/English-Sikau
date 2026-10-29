import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const base=new URL('../',import.meta.url);
const read=path=>fs.readFileSync(new URL(path,base),'utf8');
const source=read('coach-v4-approved-lab.html');
const scripts=[...source.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const nativeSource=read('coach-dashboard.js');
const normalize=x=>String(x).toLocaleLowerCase('en-US').replace(/[’']/g,"'").trim();
function makeTopics(){
 assert.equal(scripts.length,3,'V4 source must have three complete scripts');
 const context=vm.createContext({window:{}});
 vm.runInContext(scripts[0],context,{filename:'v4-original-topics.js'});
 vm.runInContext(scripts[1],context,{filename:'v4-expanded-topics.js'});
 const intro=scripts[2].split('const state=')[0];
 assert.ok(intro.includes('const topicsAll='),'Unable to locate V4 topic definitions');
 vm.runInContext(intro+'window.__v4Topics=topicsAll;})();',context,{filename:'v4-validated-catalog.js'});
 return Array.from(context.window.__v4Topics,t=>t.title);
}
function nativeTopics(){
 const initial=nativeSource.match(/^const scenarios=(\[.*\]);$/m);
 const extra=nativeSource.match(/^const coachAdditionalSpecs=(\[.*\]);$/m);
 assert.ok(initial&&extra,'Original Coach catalogs must be present');
 const base=JSON.parse(initial[1]),extras=JSON.parse(extra[1]);
 const context=vm.createContext({window:{}});
 for(const file of ['coach-topic-catalog-1.js','coach-topic-catalog-2.js','coach-topic-expansion.js'])
  vm.runInContext(read(file),context,{filename:file});
 const rows=context.window.sikauMoreTopics;
 assert.ok(Array.isArray(rows));
 return [...base,...extras,...rows].map(t=>t.title);
}
test('all 175 approved V4 scenes map to the existing 175 Coach cards',()=>{
 const desired=makeTopics().map(normalize),existing=nativeTopics().map(normalize);
 assert.equal(desired.length,175);
 assert.equal(existing.length,175);
 assert.equal(new Set(desired).size,175);
 assert.equal(new Set(existing).size,175);
 const missing=existing.filter(t=>!desired.includes(t));
 const unused=desired.filter(t=>!existing.includes(t));
 assert.deepEqual(missing,[],'Coach card lacks approved V4 scene');
 assert.deepEqual(unused,[],'Approved V4 scene not reachable');
});
test('approved V4 engine retains topic-specific reaction branches',()=>{
 const topics=makeTopics();
 for(const name of ['Return clothing','Buy a phone','Order at a café','At a bank',
  'Missing online delivery','Talk in a long-distance relationship','Report a suspicious message']){
  assert.ok(topics.includes(name),name);
 }
 for(const key of ['function cafeOptions()','function stageOptions()',
  'function chooseRoute(','function chooseCheckpoint(','function scenarioKind()']){
  assert.ok(scripts[2].includes(key),'Missing V4 branching rule: '+key);
 }
 assert.match(source,/window\.SikauPreview=.*?undo,changeGoal/);
 assert.match(source,/function save\(\)\{\/\* Embedded engine does not write unscoped student data/);
});
test('V4 adapter retains native design, privacy, and all language modes',()=>{
 const adapter=read('coach-v4-adapter.js'),css=read('coach-dashboard.css');
 const index=read('index.html');
 assert.match(adapter,/sikau-convo-stage-head/);
 assert.match(adapter,/sikau-chat-message-body/);
 assert.match(adapter,/sikau-convo-reply/);
 assert.match(adapter,/sikau_lang_pref/);
 for(const mode of ['en','en-ne','en-roman','all'])assert.ok(adapter.includes("'"+mode+"'"));
 assert.match(adapter,/PREFIX\+userId/);
 assert.match(adapter,/validUser\(userId\)/);
 assert.match(adapter,/readSaved\(doc,userId\)/);
 assert.match(adapter,/forget\(doc,userId\)/);
 assert.match(adapter,/saveMoves\(doc,userId,scene,moves\)/);
 assert.match(adapter,/const pairs=window\.sikauCoachV4Translations/);
 assert.match(css,/sikau-v4-roman/);
 assert.match(css,/@media\(max-width:767px\)/);
 const idx=index.indexOf('coach-v4-translations.js'),adapterIdx=index.indexOf('coach-v4-adapter.js'),
  dashboardIdx=index.indexOf('coach-dashboard.js');
 assert.ok(idx>=0&&adapterIdx>idx&&dashboardIdx>adapterIdx);
});
test('untranslated V4 script is not mislabeled as matching Nepali',()=>{
 const adapter=read('coach-v4-adapter.js'),translations=read('coach-v4-translations.js');
 assert.match(adapter,/unrelated translations are never applied to later V4 responses/);
 assert.match(translations,/translations\[en\.trim\(\)\]=ne\.trim\(\)/);
 assert.match(translations,/sikauMoreTopics/);
 assert.match(translations,/English-to-Nepali display pairs/);
});
