import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const root=new URL('../',import.meta.url);
const source=name=>fs.readFileSync(new URL(name,root),'utf8');
const scripts=[
  'coach-topic-catalog-1.js','coach-topic-catalog-2.js',
  'coach-topic-expansion.js','coach-legacy-followups.js',
  'coach-followups.js','coach-journeys.js',
  'coach-context-paths.js','coach-adaptive-story.js'
];
function load(extra={}){
  const window={...extra};
  for(const file of scripts)vm.runInNewContext(source(file),{window},{filename:file});
  return window;
}
function choose(api,active,index){
  const last=active.steps.at(-1),item=last.storeOptions[index];
  assert.ok(item,'Missing choice in '+active.id+'/'+last.nodeId);
  assert.ok(item.value&&item.ne&&item.next,'Incomplete bilingual choice '+active.id);
  api.choose(active,item,active.steps.length-1);
  return active.steps.at(-1);
}

test('all 147 expanded topics use category-appropriate second-turn choices',()=>{
  const w=load(),api=w.sikauAdaptiveStory;
  assert.equal(w.sikauMoreTopics.length,147);
  assert.equal(api.topics.length,174);
  for(const topic of w.sikauMoreTopics){
    for(let path=0;path<3;path++){
      const a=api.start(topic);
      const question=choose(api,a,path);
      assert.equal(question.nodeId,'detail');
      assert.equal(question.storeOptions.length,5);
      for(const item of question.storeOptions.slice(0,3)){
        assert.ok(item.value.length>12);
        assert.doesNotMatch(item.value,/^Could you help me with |^Is there another option for /);
      }
    }
  }
});

test('all 1323 selected details preserve their scenario and allow distinct branches',()=>{
  const w=load(),api=w.sikauAdaptiveStory;
  for(const topic of w.sikauMoreTopics)
    for(let path=0;path<3;path++)
      for(let detail=0;detail<3;detail++){
        const make=()=>{
          const a=api.start(topic);choose(api,a,path);choose(api,a,detail);return a;
        };
        const a=make(),review=a.steps.at(-1);
        assert.equal(review.nodeId,'review');
        assert.ok(review.npc.includes(topic.config[1][path][5].slice(0,12))||
          review.npc.includes(topic.config[1][path][7][detail][0].slice(0,12)));
        const destinations=review.storeOptions.map(x=>x.next);
        assert.equal(new Set(destinations).size,destinations.length);
        assert.deepEqual(Array.from(destinations),['proposal','alternative','verify','closing']);
        assert.equal(choose(api,a,0).nodeId,'proposal');
        const b=make();
        assert.equal(choose(api,b,1).nodeId,'alternative');
        const nextDetail=(detail+1)%3;
        assert.equal(choose(api,b,0).nodeId,'review');
        assert.equal(b.storyState.detail,nextDetail);
        const c=make();
        assert.equal(choose(api,c,2).nodeId,'verify');
        assert.match(c.steps.at(-1).npc,/request about/i);
        const d=make();
        assert.equal(choose(api,d,3).nodeId,'closing');
        choose(api,d,0);
        assert.equal(d.storyCompleted,true);
      }
});

test('category-specific verification decisions persist and produce distinct outcomes',()=>{
  const w=load(),api=w.sikauAdaptiveStory;
  for(const topic of w.sikauMoreTopics){
    const prompts=[],outcomes=[];
    for(let check=0;check<3;check++){
      const a=api.start(topic);
      choose(api,a,0);choose(api,a,0);choose(api,a,2);
      const verify=a.steps.at(-1);
      assert.equal(verify.nodeId,'verify');
      prompts.push(verify.npc);
      const action=choose(api,a,check);
      assert.equal(action.nodeId,'action');
      assert.ok(typeof a.storyState.need==='string');
      outcomes.push(action.npc);
      assert.equal(choose(api,a,0).nodeId,'confirmation');
      assert.equal(choose(api,a,0).nodeId,'closing');
      choose(api,a,0);
      assert.equal(a.storyCompleted,true);
    }
    assert.equal(new Set(outcomes).size,3,'Identical consequences for '+topic.id);
    assert.equal(new Set(prompts).size,1,'Unexpected change of scenario '+topic.id);
  }
});

test('Coach draft stores the selected follow-up mode without storing account rights',()=>{
  const data=new Map();
  const localStorage={
    getItem:key=>data.get(key)||null,
    setItem:(key,val)=>data.set(key,val),
    removeItem:key=>data.delete(key)
  };
  const w=load({localStorage});
  vm.runInNewContext(source('coach-drafts.js'),{window:w},{filename:'coach-drafts.js'});
  const api=w.sikauAdaptiveStory,a=api.start({id:'buy-shoes'});
  choose(api,a,0);choose(api,a,1);choose(api,a,2);choose(api,a,1);
  assert.equal(a.steps.at(-1).nodeId,'action');
  const d=w.sikauCoachDrafts.make('testUser456',[{id:'buy-shoes'}]);
  assert.equal(d.save({active:a,index:a.steps.length-1,history:[],attempts:4,successful:4,pendingChoice:null}),true);
  const restored=d.read();
  assert.equal(restored.storyState.need,a.storyState.need);
  assert.equal(restored.storyState.detail,1);
  assert.ok(!('paid' in restored));
  assert.ok(!('membership' in restored));
});
