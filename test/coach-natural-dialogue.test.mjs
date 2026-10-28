import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const root=new URL('../',import.meta.url);
const read=name=>fs.readFileSync(new URL(name,root),'utf8');
const scripts=[
 'coach-topic-catalog-1.js','coach-topic-catalog-2.js',
 'coach-topic-expansion.js','coach-legacy-followups.js',
 'coach-followups.js','coach-adaptive-story.js'
];
function load(window={}){
 for(const name of scripts)vm.runInNewContext(read(name),{window},{filename:name});
 return window;
}
function choose(api,story,idx){
 const now=story.steps.at(-1),option=now.storeOptions[idx];
 assert.ok(option,story.id+' missing option '+now.nodeId+' '+idx);
 assert.ok(option.value&&option.ne);
 api.choose(story,option,story.steps.length-1);
}
test('175-topic registry has 174 adaptive stories plus the independent clothing return',()=>{
 const w=load();
 assert.equal(w.sikauAdaptiveStory.topics.length,174);
 assert.equal(new Set(w.sikauAdaptiveStory.topics).size,174);
 assert.equal(w.sikauMoreTopics.length,147);
 assert.ok(!w.sikauAdaptiveStory.topics.includes('return-shirt'));
 assert.match(read('coach-store-story.js'),/case "managerReview"/);
});
test('6,264 full choice paths never return to generic review replies',()=>{
 const w=load(),api=w.sikauAdaptiveStory;
 let count=0;
 for(const id of api.topics)for(let path=0;path<3;path++)for(let detail=0;detail<3;detail++){
  const start=()=>api.start({id,title:id});
  const a=start();choose(api,a,path);choose(api,a,detail);
  assert.equal(a.steps.at(-1).nodeId,'review');
  assert.ok(a.steps.at(-1).storeOptions[0].value.length>=15);
  assert.doesNotMatch(a.steps.at(-1).storeOptions[0].value,/^What should I do next\?$/i);
  choose(api,a,3);choose(api,a,0);
  assert.equal(a.storyCompleted,true);count++;
  const b=start();choose(api,b,path);choose(api,b,detail);
  for(const i of [0,1,0,1,0,0])choose(api,b,i);
  assert.equal(b.storyCompleted,true);
  assert.ok(b.steps.some(s=>s.nodeId==='answer'));
  assert.ok(b.steps.some(s=>s.nodeId==='closing'));
  assert.ok(b.steps.length>a.steps.length);count++;
  const c=start();choose(api,c,path);choose(api,c,detail);choose(api,c,1);choose(api,c,0);
  assert.equal(c.steps.at(-1).nodeId,'review');
  assert.notEqual(c.storyState.detail,detail);count++;
  const d=start();choose(api,d,path);choose(api,d,detail);
  for(const i of [2,0,1,0,0])choose(api,d,i);
  assert.equal(d.storyCompleted,true);count++;
  for(const story of [a,b,c,d])for(const step of story.steps){
   assert.ok(step.npc&&step.npcNe);
   assert.ok(step.storeOptions.length>=2);
   assert.ok(step.storeOptions.every(o=>o.value&&o.ne&&o.next));
  }
 }
 assert.equal(count,6264);
});
test('phone, restaurant, clothing shopping and social conversation use relevant replies',()=>{
 const w=load(),api=w.sikauAdaptiveStory;
 const preview=(id,p,d)=>{
  const a=api.start({id});choose(api,a,p);choose(api,a,d);return a.steps.at(-1);
 };
 const camera=preview('buy-phone',0,0);
 assert.match(camera.npc,/camera samples/i);
 assert.match(camera.storeOptions[0].value,/portrait photos/i);
 const battery=preview('buy-phone',0,1);
 assert.match(battery.npc,/battery life/i);
 assert.notEqual(battery.storeOptions[0].value,camera.storeOptions[0].value);
 const table=preview('restaurant',0,2);
 assert.match(table.storeOptions[0].value,/table is available/i);
 assert.doesNotMatch(table.npc,/menu|ingredient/i);
 const fitting=preview('buy-clothes',1,2);
 assert.match(fitting.storeOptions[0].value,/sizes/i);
 const friend=preview('new-friend',0,0);
 assert.doesNotMatch(friend.storeOptions[1].value,/compare that with another option/);
});
test('new script load order precedes dashboard; VISA code stays present',()=>{
 const html=read('index.html'),list=[
  'coach-topic-expansion.js','coach-legacy-followups.js',
  'coach-followups.js','coach-adaptive-story.js','coach-dashboard.js'
 ];
 let last=-1;
 for(const name of list){
  const pos=html.indexOf('./'+name+'?v=');
  assert.ok(pos>last,'Wrong script order '+name);
  last=pos;
 }
 const dashboard=read('coach-dashboard.js');
 assert.match(dashboard,/installVisaSidebar\(doc,shell,visaController\)/);
 assert.match(dashboard,/sikauAdaptiveStory\?\.reconcile/);
});
test('saved chat can refresh active turn while preserving a selected answer',()=>{
 const w=load(),api=w.sikauAdaptiveStory;
 const a=api.start({id:'buy-phone'});choose(api,a,0);choose(api,a,0);
 const old=a.steps.at(-1),oldAnswer=old.storeOptions[0].value;
 a.steps[a.steps.length-1]={...old,npc:'Generic old seller response'};
 assert.equal(api.reconcile(a,a.steps.length-1,{value:oldAnswer,ne:old.storeOptions[0].ne}),true);
 assert.match(a.steps.at(-1).npc,/camera samples/);
 assert.equal(a.steps.at(-1).storeOptions[0].value,oldAnswer);
 const b=api.start({id:'restaurant'});choose(api,b,0);choose(api,b,2);
 b.steps.at(-1).storeOptions[0].value='What should I do next?';
 assert.equal(api.reconcile(b,b.steps.length-1,null),true);
 assert.match(b.steps.at(-1).storeOptions[0].value,/table is available/i);
});
