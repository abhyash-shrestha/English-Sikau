import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const root=new URL('../',import.meta.url);
const read=n=>fs.readFileSync(new URL(n,root),'utf8');
function load(w={}){
 for(const name of ['coach-topic-catalog-1.js','coach-topic-catalog-2.js',
  'coach-topic-expansion.js','coach-legacy-followups.js','coach-followups.js',
  'coach-journeys.js','coach-adaptive-story.js'])
  vm.runInNewContext(read(name),{window:w},{filename:name});
 return w;
}
function choose(api,a,predicate){
 const op=a.steps.at(-1).storeOptions.find(predicate);
 assert.ok(op,a.id+' missing choice at '+a.steps.at(-1).nodeId);
 api.choose(a,op,a.steps.length-1);
}
test('phone camera to battery to too-expensive to Samsung to card checkout and receipt',()=>{
 const api=load().sikauAdaptiveStory,a=api.start({id:'buy-phone'});
 choose(api,a,o=>/looking for a phone/.test(o.value));
 choose(api,a,o=>/good camera/i.test(o.value));
 assert.match(a.steps.at(-1).npc,/battery life and your budget/i);
 choose(api,a,o=>/strong camera and long battery/i.test(o.value));
 assert.match(a.steps.at(-1).npc,/iPhone 17 Pro Max/);
 assert.match(a.steps.at(-1).npc,/NPR 100,000/);
 choose(api,a,o=>/too expensive/i.test(o.value));
 assert.match(a.steps.at(-1).npc,/Samsung Galaxy S24/);
 assert.match(a.steps.at(-1).npc,/NPR 50,000/);
 choose(api,a,o=>/price works for me/i.test(o.value));
 choose(api,a,o=>/standard storage/i.test(o.value));
 choose(api,a,o=>/credit or debit card/i.test(o.value));
 assert.match(a.steps.at(-1).npc,/bank card/);
 assert.match(a.steps.at(-1).npc,/Here's your receipt/);
 assert.equal(a.storyState.offer,'budget');
 assert.equal(a.storyState.payment,'card');
 choose(api,a,o=>/have the receipt/i.test(o.value));
 assert.match(a.steps.at(-1).npc,/Here's your receipt/);
 choose(api,a,o=>o.next==='end');
 assert.equal(a.storyCompleted,true);
});
test('phone can decline or request another cheaper tier without buying',()=>{
 const api=load().sikauAdaptiveStory,a=api.start({id:'buy-phone'});
 choose(api,a,o=>/looking for a phone/.test(o.value));
 choose(api,a,o=>/affordable price/i.test(o.value));
 choose(api,a,o=>/50,000/.test(o.value));
 assert.match(a.steps.at(-1).npc,/Samsung Galaxy S24/);
 choose(api,a,o=>/too expensive/i.test(o.value));
 assert.match(a.steps.at(-1).npc,/35,000/);
 choose(api,a,o=>/above my budget/i.test(o.value));
 assert.equal(a.steps.at(-1).nodeId,'closing');
 choose(api,a,o=>o.next==='end');
 assert.equal(a.storyCompleted,true);
});
test('restaurant seating, lost luggage, food-allergy and bank questions do not lead to checkout',()=>{
 const api=load().sikauAdaptiveStory;
 for(const [id,p,d] of [['restaurant',0,2],['reserve-restaurant',0,0],
  ['airport-baggage',0,0],['ask-menu-allergy',0,0],['bank',0,0],
  ['interview',0,0],['buy-phone',2,0]]){
  const a=api.start({id});
  choose(api,a,o=>o.patch.path===p);
  choose(api,a,o=>o.patch.detail===d);
  choose(api,a,o=>o.next==='proposal');
  choose(api,a,o=>o.next==='verify');
  assert.equal(a.steps.at(-1).nodeId,'verify',id);
  assert.ok(!a.steps.at(-1).storeOptions.some(o=>o.next==='checkout'),id);
 }
});
test('all topics have translated offers, meaningful alternatives and natural exit',()=>{
 const api=load().sikauAdaptiveStory;
 for(const id of api.topics)for(let p=0;p<3;p++)for(let d=0;d<3;d++){
  const a=api.start({id});
  choose(api,a,o=>o.patch.path===p);
  choose(api,a,o=>o.patch.detail===d);
  assert.equal(a.steps.at(-1).nodeId,'review');
  assert.ok(a.steps.at(-1).npcNe);
  const choice=a.steps.at(-1).storeOptions.find(o=>o.next==='closing');
  assert.ok(choice,id);
  choose(api,a,o=>o===choice);
  assert.equal(a.steps.at(-1).nodeId,'closing');
  choose(api,a,o=>o.next==='end');
  assert.equal(a.storyCompleted,true);
 }
});
test('saved journey state persists budget and payment without altering previous messages',()=>{
 const data=new Map(),window={localStorage:{
  getItem(k){return data.get(k)||null},
  setItem(k,v){data.set(k,v)},removeItem(k){data.delete(k)}
 }};
 const api=load(window).sikauAdaptiveStory;
 vm.runInNewContext(read('coach-drafts.js'),{window});
 const a=api.start({id:'buy-phone'});
 choose(api,a,o=>o.patch.path===0);choose(api,a,o=>o.patch.detail===0);
 choose(api,a,o=>o.patch.offer==='budget');
 choose(api,a,o=>o.next==='phone-options');
 choose(api,a,o=>o.next==='phone-checkout');
 choose(api,a,o=>o.patch.payment==='card');
 const saved=window.sikauCoachDrafts.make('testAccount123456',[{id:'buy-phone'}]);
 assert.ok(saved.save({active:a,index:a.steps.length-1,history:[],attempts:1,successful:1,pendingChoice:null}));
 const restored=saved.read();assert.equal(restored.storyState.offer,'budget');
 assert.equal(restored.storyState.payment,'card');
 const before=a.steps.at(-1).npc;
 a.steps.at(-1).npc='OLD INCORRECT MESSAGE';
 assert.ok(api.reconcile(a,a.steps.length-1,null));
 assert.equal(a.steps.at(-1).npc,before);
});

test('no role-play or invented-price disclaimers interrupt the 175 learner conversations',()=>{
 const w=load(),api=w.sikauAdaptiveStory;
 const forbidden=/fictional|role-play|roleplay|practice (?:store|shop|price|scenario|conversation|checkout|order)|sample (?:price|checkout|quote)|invented practice prices|not current Nepal retail|made-up lesson price|no real purchase|no actual receipt|NO purchase or charge|यो अभ्यास|काल्पनिक|अभ्यास पसल|नमुना मूल्य|वास्तविक बजार मूल्य होइन/i;
 for(const id of api.topics)for(let path=0;path<3;path++)for(let detail=0;detail<3;detail++){
  const a=api.start({id});
  choose(api,a,o=>o.patch.path===path);
  choose(api,a,o=>o.patch.detail===detail);
  assert.doesNotMatch(a.steps.at(-1).npc,forbidden,id+':review');
  assert.doesNotMatch(a.steps.at(-1).npcNe,forbidden,id+':review Nepali');
  for(const option of a.steps.at(-1).storeOptions){
   const b=api.start({id});
   choose(api,b,o=>o.patch.path===path);
   choose(api,b,o=>o.patch.detail===detail);
   choose(api,b,o=>o.value===option.value);
   assert.doesNotMatch(b.steps.at(-1).npc,forbidden,id+':'+b.steps.at(-1).nodeId);
   assert.doesNotMatch(b.steps.at(-1).npcNe,forbidden,id+':'+b.steps.at(-1).nodeId+' Nepali');
  }
 }
});
