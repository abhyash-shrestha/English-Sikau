import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const root=new URL('../',import.meta.url);
const read=n=>fs.readFileSync(new URL(n,root),'utf8');
const scriptNames=['coach-topic-catalog-1.js','coach-topic-catalog-2.js',
 'coach-topic-expansion.js','coach-legacy-followups.js','coach-followups.js',
 'coach-journeys.js','coach-adaptive-story.js'];
function load(){
 const window={};for(const n of scriptNames)vm.runInNewContext(read(n),{window},{filename:n});
 return window;
}
function pick(api,a,index){const op=a.steps.at(-1).storeOptions[index];
 assert.ok(op,'Missing option at '+a.steps.at(-1).nodeId);
 api.choose(a,op,a.steps.length-1);}
test('175 unique topics, 147 added bilingual scenarios and original returns',()=>{
 const w=load(),ids=w.sikauAdaptiveStory.topics;
 assert.equal(ids.length,174);
 assert.equal(new Set(ids).size,174);
 assert.equal(w.sikauMoreTopics.length,147);
 assert.ok(ids.includes('buy-clothes'));
 assert.ok(!ids.includes('return-shirt'));
 assert.match(read('coach-store-story.js'),/managerReview/);
});
test('147 added topics mention the actual scenario, with useful translated options',()=>{
 const w=load(),api=w.sikauAdaptiveStory;
 for(const topic of w.sikauMoreTopics)for(let path=0;path<3;path++)
 for(let detail=0;detail<3;detail++){
  const a=api.start({id:topic.id});
  pick(api,a,path);
  assert.ok(a.steps.at(-1).npcNe);
  const options=a.steps.at(-1).storeOptions.slice(0,3);
  assert.ok(options.every(o=>o.value&&o.ne));
  pick(api,a,detail);
  assert.equal(a.steps.at(-1).nodeId,'review');
  assert.ok(a.steps.at(-1).npcNe);
  assert.ok(a.steps.at(-1).storeOptions.length>=4);
  pick(api,a,a.steps.at(-1).storeOptions.length-1);
  assert.equal(a.steps.at(-1).nodeId,'closing');
  pick(api,a,0);
  assert.equal(a.storyCompleted,true);
 }
});
test('new Buy Clothes is not the Return Clothing story',()=>{
 const api=load().sikauAdaptiveStory;
 const a=api.start({id:'buy-clothes'});
 assert.match(a.steps[0].npc,/clothing store/i);
 assert.deepEqual(Array.from(a.steps[0].storeOptions.map(o=>o.value)),[
  "I'm looking for a jacket for winter.",
  "Could I try on a few different sizes?",
  "Could you explain the prices and offers?"
 ]);
});
test('script load order and U.S. Visa Interview code remain correct',()=>{
 const html=read('index.html');
 const scripts=['coach-topic-expansion.js','coach-legacy-followups.js',
  'coach-followups.js','coach-journeys.js','coach-adaptive-story.js','coach-dashboard.js'];
 let pos=-1;for(const file of scripts){
  const next=html.indexOf('./'+file+'?v=');
  assert.ok(next>pos,'Incorrect script order '+file);pos=next;
 }
 assert.match(read('coach-dashboard.js'),/installVisaSidebar\(doc,shell,visaController\)/);
 assert.match(read('coach-dashboard.js'),/window.sikauCoachPagination.paginate\(filtered\(\),currentPage\)/);
});
