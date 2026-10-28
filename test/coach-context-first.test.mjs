import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const root=new URL('../',import.meta.url);
const source=name=>fs.readFileSync(new URL(name,root),'utf8');
function load(name,context){
 const window=context||{};
 const sources=name==='coach-adaptive-story.js'?
  ['coach-topic-catalog-1.js','coach-topic-catalog-2.js',
   'coach-topic-expansion.js','coach-legacy-followups.js',
   'coach-followups.js','coach-journeys.js','coach-adaptive-story.js']:[name];
 for(const src of sources)vm.runInNewContext(source(src),{window},{filename:src});
 return window;
}
test('all 174 adaptive topics have a neutral opening',()=>{
  const w=load('coach-adaptive-story.js');
  assert.equal(w.sikauAdaptiveStory.topics.length,174);
  for(const id of w.sikauAdaptiveStory.topics){
    const scene=w.sikauAdaptiveStory.start({id,title:id});
    assert.match(scene.steps[0].npc,/^(hello|hi|welcome|good)/i);
    assert.equal(scene.steps[0].storeOptions.length,3);
  }
});
test('guided responses branch and allow short or longer conversations',()=>{
  const w=load('coach-adaptive-story.js'),api=w.sikauAdaptiveStory;
  for(const id of api.topics){
    for(let p=0;p<3;p++)for(let detail=0;detail<3;detail++){
      const make=()=>api.start({id,title:id});
      const short=make();
      api.choose(short,short.steps[0].storeOptions[p],0);
      api.choose(short,short.steps[1].storeOptions[detail],1);
      const lastChoice=short.steps[2].storeOptions.length-1;
      api.choose(short,short.steps[2].storeOptions[lastChoice],2);
      assert.equal(short.steps.at(-1).nodeId,'closing');
      api.choose(short,short.steps[3].storeOptions[0],3);
      assert.equal(short.storyCompleted,true);
      const longer=make();
      api.choose(longer,longer.steps[0].storeOptions[p],0);
      api.choose(longer,longer.steps[1].storeOptions[detail],1);
      api.choose(longer,longer.steps[2].storeOptions[0],2);
      assert.ok(['proposal','phone-pitch'].includes(longer.steps.at(-1).nodeId));
      assert.ok(longer.steps.at(-1).npcNe);
      assert.ok(longer.steps.at(-1).storeOptions.length>=3);
    }
  }
});
test('clothing is never assumed; all six garment types persist into dialogue',()=>{
  const w=load('coach-store-story.js'),api=w.sikauStoreStory;
  for(const item of ['shirt','pants','shoes','jacket','dress','multiple']){
    const story=api.start({id:'return-shirt'});
    assert.doesNotMatch(story.steps[0].npc,/shirt/i);
    api.choose(story,story.steps[0].storeOptions[0],0);
    api.choose(story,story.steps[1].storeOptions.find(x=>x.patch.item===item),1);
    assert.equal(story.storeState.item,item);
    api.choose(story,story.steps[2].storeOptions[0],2);
    if(item!=='shirt')assert.doesNotMatch(story.steps.at(-1).npc,/shirt/i);
  }
});
test('adaptive drafts keep the chosen path, and Visa integration remains present',()=>{
  const data=new Map();
  const localStorage={getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};
  const w={localStorage};load('coach-drafts.js',w);load('coach-adaptive-story.js',w);
  const active=w.sikauAdaptiveStory.start({id:'restaurant'});
  w.sikauAdaptiveStory.choose(active,active.steps[0].storeOptions[1],0);
  w.sikauAdaptiveStory.choose(active,active.steps[1].storeOptions[2],1);
  const d=w.sikauCoachDrafts.make('testUser123',[{id:'restaurant'}]);
  assert.equal(d.save({active,index:2,history:[],attempts:0,successful:0,pendingChoice:null}),true);
  assert.equal(d.read().storyState.path,1);
  assert.equal(d.read().storyState.detail,2);
  assert.match(source('coach-dashboard.js'),/installVisaSidebar\(doc,shell,visaController\)/);
  assert.match(source('index.html'),/coach-adaptive-story\.js\?v=20261028-realistic-flow-r8/);
});


test('gift flows never require recipient purchase dates or receipts',()=>{
 const w=load('coach-store-story.js'),api=w.sikauStoreStory;
 const pick=(story,i)=>api.choose(story,story.steps.at(-1).storeOptions[i],story.steps.length-1);
 for(let item=0;item<6;item++)for(let reason=0;reason<3;reason++)
 for(let condition=0;condition<3;condition++)for(let proof=0;proof<3;proof++){
  const story=api.start({id:'return-shirt'});
  pick(story,0);pick(story,item);pick(story,0);pick(story,2);
  pick(story,reason);pick(story,condition);
  assert.ok(story.steps.at(-1).storeOptions.every(o=>!/paper receipt|digital receipt/i.test(o.value)));
  pick(story,proof);
  assert.equal(story.steps.at(-1).nodeId,'timing');
  assert.match(story.steps.at(-1).npc,/gift/i);
  assert.ok(story.steps.at(-1).storeOptions.every(o=>!/^(I bought|I ordered|I purchased)/i.test(o.value)));
  assert.ok(story.steps.at(-1).storeOptions.every(o=>o.ne));
 }
});
test('all purchase origins and old saved gifts keep consistent followups',()=>{
 const w=load('coach-store-story.js'),api=w.sikauStoreStory;
 const pick=(story,i)=>api.choose(story,story.steps.at(-1).storeOptions[i],story.steps.length-1);
 for(let source=0;source<4;source++){
  const story=api.start({id:'return-shirt'});
  pick(story,0);pick(story,0);pick(story,0);pick(story,source);pick(story,0);pick(story,0);pick(story,2);
  if(story.steps.at(-1).nodeId==='evidence')pick(story,2);
  assert.equal(story.steps.at(-1).nodeId,'timing');
  if(source>=2)assert.ok(story.steps.at(-1).storeOptions.every(o=>!/^I bought/i.test(o.value)));
 }
 const saved=api.start({id:'return-shirt'});
 saved.storeState={item:'multiple',source:'gift',receipt:'missing',evidence:'none',giftProof:'none'};
 saved.steps=[api.step('timing',{item:'shirt',source:'store'})];
 assert.equal(api.reconcile(saved,0,null),true);
 assert.ok(saved.steps[0].storeOptions.every(o=>!/^I bought/i.test(o.value)));
});
