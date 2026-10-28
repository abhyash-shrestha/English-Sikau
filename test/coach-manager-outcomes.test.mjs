import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const root=new URL('../',import.meta.url);
const source=name=>fs.readFileSync(new URL(name,root),'utf8');
const load=(file,win={})=>{vm.runInNewContext(source(file),{window:win});return win;};
const src=(scene)=>({source:'gift',item:'jacket',intent:'refund',
  receipt:'missing',evidence:'none',giftProof:'none',condition:'no-tags',
  timing:'unknown',...scene});
const testDecision=(api,state,needle)=>{
 const step=api.step('decision',state);
 assert.match(step.npc,needle);
 assert.ok(step.npcNe);
 assert.ok(step.storeOptions.length>=3);
 assert.ok(step.storeOptions.every(option=>option.ne&&option.value&&option.next));
 return step;
};
test('manager does not promise any refund or credit for a gift without verification',()=>{
 const api=load('coach-store-story.js').sikauStoreStory;
 const unverified=src({verification:'no-proof'});
 const row=testDecision(api,unverified,/can't approve a refund, exchange, or store credit/);
 assert.doesNotMatch(row.npc,/one-time courtesy/i);
 assert.match(api.step('close',{...unverified,outcome:'options'}).npc,/couldn't verify/);
 assert.match(api.step('decision',src({verification:'no-match'})).npc,/couldn't verify/);
});
test('store-label check may lead to an explicitly discretionary courtesy credit',()=>{
 const api=load('coach-store-story.js').sikauStoreStory;
 const state=src({verification:'label-match'});
 const offer=testDecision(api,state,/one-time courtesy exception/);
 assert.match(offer.npc,/still cannot verify the original transaction/);
 assert.ok(offer.storeOptions.some(o=>o.next==='creditExplain'));
 assert.match(api.step('creditExplain',state).npc,/store card/);
 assert.match(api.step('close',{...state,outcome:'credit-accepted'}).npc,/store card/);
 assert.doesNotMatch(api.step('close',{...state,outcome:'credit-declined'}).npc,/issued a credit/);
});
test('verified gift receipts, verified sales, wear and age produce distinct outcomes',()=>{
 const api=load('coach-store-story.js').sikauStoreStory;
 testDecision(api,src({receipt:'gift',giftProof:'receipt',verification:'receipt-check',
  condition:'tried'}),/gift receipt/);
 testDecision(api,src({receipt:'gift',giftProof:'receipt',verification:'receipt-check'}),/verified the receipt/);
 testDecision(api,{item:'shirt',source:'store',receipt:'paper',verification:'receipt-check',
  intent:'refund',condition:'tried',timing:'yesterday'},/original payment method/);
 testDecision(api,{item:'pants',source:'online',receipt:'digital',verification:'receipt-check',
  intent:'exchange',condition:'tried',timing:'two-weeks'},/meets our exchange rules/);
 testDecision(api,src({verification:'label-match',condition:'worn',reason:'size'}),/can't accept this worn/);
 testDecision(api,src({verification:'label-match',condition:'worn',reason:'defect'}),/quality or warranty review/);
 testDecision(api,{item:'shoes',source:'store',receipt:'paper',verification:'receipt-check',
  intent:'refund',condition:'tried',timing:'older'},/outside our practice-store return window/);
});
test('realistic branch order and manager verification lead to case-specific farewell',()=>{
 const api=load('coach-store-story.js').sikauStoreStory;
 const choose=(s,predicate)=>{
  const option=s.steps.at(-1).storeOptions.find(predicate);
  assert.ok(option,'Expected option at '+s.steps.at(-1).nodeId);
  api.choose(s,option,s.steps.length-1);
 };
 const story=api.start({id:'return-shirt'});
 choose(story,o=>o.next==='item');
 choose(story,o=>o.patch.item==='jacket');
 choose(story,o=>o.patch.intent==='refund');
 choose(story,o=>o.patch.source==='gift');
 choose(story,o=>o.patch.reason==='size');
 choose(story,o=>o.patch.condition==='no-tags');
 choose(story,o=>o.patch.giftProof==='none');
 choose(story,o=>o.patch.timing==='unknown');
 choose(story,o=>o.next==='manager');
 choose(story,o=>o.next==='managerReview');
 choose(story,o=>o.patch.verification==='no-proof');
 assert.equal(story.steps.at(-1).nodeId,'decision');
 assert.match(story.steps.at(-1).npc,/can't approve a refund/);
 choose(story,o=>o.next==='close'&&o.patch.outcome==='declined');
 assert.equal(story.steps.at(-1).nodeId,'close');
 assert.match(story.steps.at(-1).npc,/couldn't verify/);
 choose(story,o=>o.next==='end');
 assert.equal(story.storeCompleted,true);
});
test('saved conversations keep verification and selected older replies intact',()=>{
 const win={localStorage:{
  store:new Map(),getItem(k){return this.store.get(k)||null},
  setItem(k,v){this.store.set(k,v)},removeItem(k){this.store.delete(k)}
 }};
 const api=load('coach-store-story.js',win).sikauStoreStory;
 const storage=load('coach-drafts.js',win).sikauCoachDrafts.make('testUser123',[{id:'return-shirt'}]);
 const active=api.start({id:'return-shirt'});
 active.storeState=src({verification:'label-match'});
 active.steps=[api.step('decision',active.storeState)];
 assert.equal(storage.save({active,index:0,history:[],attempts:0,successful:0,pendingChoice:null}),true);
 assert.equal(storage.read().storeState.verification,'label-match');
 const saved=api.start({id:'return-shirt'});
 saved.storeState=src({verification:'no-proof'});
 const old=api.step('close',{source:'store',receipt:'paper',verification:'receipt-check',condition:'tried'});
 saved.steps=[old];
 const selection={value:old.storeOptions[0].value,ne:old.storeOptions[0].ne};
 assert.equal(api.reconcile(saved,0,selection),true);
 assert.equal(saved.steps[0].storeOptions[0].value,selection.value);
 assert.match(saved.steps[0].npc,/couldn't verify/);
});
