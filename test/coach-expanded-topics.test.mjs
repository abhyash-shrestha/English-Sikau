import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const root=new URL('../',import.meta.url);
const file=name=>fs.readFileSync(new URL(name,root),'utf8');
function load(){
 const window={};
 for(const name of [
  'coach-topic-catalog-1.js','coach-topic-catalog-2.js',
  'coach-topic-expansion.js','coach-legacy-followups.js',
  'coach-followups.js','coach-adaptive-story.js']){
  vm.runInNewContext(file(name),{window},{filename:name});
 }
 return window;
}
test('175 unique bilingual Coach scenarios including existing 28',()=>{
 const w=load();
 assert.equal(w.sikauMoreTopics.length,147);
 assert.equal(w.sikauAdaptiveStory.topics.length,174);
 const ids=w.sikauMoreTopics.map(s=>s.id);
 assert.equal(new Set(ids).size,147);
 for(const topic of w.sikauMoreTopics)
  assert.ok(topic.id&&topic.ne&&topic.title&&topic.place&&topic.partner&&topic.emoji);
 assert.ok(ids.includes('buy-clothes'));
 assert.ok(!ids.includes('return-shirt'));
 assert.match(file('coach-dashboard.js'),/installVisaSidebar\(doc,shell,visaController\)/);
});
test('each new topic offers bilingual branching, early ending and longer followup',()=>{
 const w=load(),api=w.sikauAdaptiveStory;
 for(const topic of w.sikauMoreTopics)
  for(let p=0;p<3;p++)for(let detail=0;detail<3;detail++){
   const a=api.start({id:topic.id,title:topic.title});
   assert.equal(a.steps[0].storeOptions.length,3);
   api.choose(a,a.steps[0].storeOptions[p],0);
   assert.equal(a.steps[1].storeOptions.length,5);
   api.choose(a,a.steps[1].storeOptions[detail],1);
   assert.ok(a.steps[2].npcNe&&a.steps[2].npc);
   assert.ok(a.steps[2].storeOptions.every(o=>o.ne&&o.value));
   api.choose(a,a.steps[2].storeOptions[3],2);
   assert.equal(a.steps.at(-1).nodeId,'closing');
   api.choose(a,a.steps.at(-1).storeOptions[0],3);
   assert.equal(a.storyCompleted,true);
   const longer=api.start({id:topic.id,title:topic.title});
   api.choose(longer,longer.steps[0].storeOptions[p],0);
   api.choose(longer,longer.steps[1].storeOptions[detail],1);
   api.choose(longer,longer.steps[2].storeOptions[0],2);
   api.choose(longer,longer.steps[3].storeOptions[1],3);
   api.choose(longer,longer.steps[4].storeOptions[0],4);
   api.choose(longer,longer.steps[5].storeOptions[1],5);
   api.choose(longer,longer.steps[6].storeOptions[0],6);
   api.choose(longer,longer.steps[7].storeOptions[0],7);
   assert.equal(longer.storyCompleted,true);
  }
});
test('different detail choices produce different relevant Coach followups',()=>{
 const w=load(),api=w.sikauAdaptiveStory;
 for(const topic of w.sikauMoreTopics)for(let p=0;p<3;p++){
  const responses=[];
  for(let detail=0;detail<3;detail++){
   const a=api.start({id:topic.id});
   api.choose(a,a.steps[0].storeOptions[p],0);
   api.choose(a,a.steps[1].storeOptions[detail],1);
   responses.push(a.steps[2].npc);
  }
  assert.equal(new Set(responses).size,3,'Repeated reply in '+topic.id+' path '+p);
 }
});
test('new Buy Clothes lesson is not Return Clothing',()=>{
 const w=load(),api=w.sikauAdaptiveStory;
 const a=api.start({id:'buy-clothes'});
 assert.match(a.steps[0].npc,/clothing store/i);
 assert.deepEqual(Array.from(a.steps[0].storeOptions.map(o=>o.value)),[
  "I'm looking for a jacket for winter.",
  "Could I try on a few different sizes?",
  "Could you explain the prices and offers?"
 ]);
 for(let p=0;p<3;p++){
  const scene=api.start({id:'buy-clothes'});
  api.choose(scene,scene.steps[0].storeOptions[p],0);
  assert.ok(scene.steps[1].npcNe);
 }
});
test('safe load order and category layout for the larger browser',()=>{
 const html=file('index.html'),code=file('coach-dashboard.js');
 const order=['coach-topic-catalog-1.js','coach-topic-catalog-2.js',
  'coach-topic-expansion.js','coach-legacy-followups.js','coach-followups.js',
  'coach-adaptive-story.js','coach-dashboard.js'];
 let prev=-1;
 for(const name of order){
  const i=html.indexOf('./'+name+'?v=');
  assert.ok(i>prev,'script order '+name);prev=i;
 }
 assert.match(code,/scenarios\.length\+' real-life topics/);
 assert.match(code,/visibleLimit=24/);
 assert.match(file('coach-dashboard.css'),/sikau-convo-topics\{[\s\S]*?flex-wrap:nowrap/);
});
