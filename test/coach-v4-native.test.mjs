import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const root=new URL('../',import.meta.url);
const read=file=>fs.readFileSync(new URL(file,root),'utf8');
const scripts=['coach-v4-authored.js','coach-v4-expanded.js',
 'coach-v4-decisions.js','coach-v4-runtime.js'];
function load(){
 const window={};
 for(const name of scripts)vm.runInNewContext(read(name),{window},{filename:name});
 return window;
}
test('All 175 approved V4 topics load into the original Coach engine adapter',()=>{
 const w=load();
 assert.equal(w.sikauV4Data.topics.length,175);
 assert.equal(w.sikauV4Story.topics.length,175);
 assert.equal(new Set(w.sikauV4Story.topics).size,175);
 assert.ok(w.sikauV4Data.topics.every(t=>t.routes.length===3));
});
test('Each V4 topic supports three distinct starting situations',()=>{
 const w=load(),api=w.sikauV4Story;
 for(const title of api.topics){
  const active=api.start({id:title,title});
  assert.equal(active.isBranchingV4,true);
  assert.equal(active.steps[0].storeOptions.length,3);
  const values=active.steps[0].storeOptions.map(x=>x.value);
  assert.equal(new Set(values).size,3,title);
 }
});
test('Each of 175 topics and three routes can follow a complete interaction',()=>{
 const api=load().sikauV4Story;
 let finished=0;
 for(const title of api.topics)for(let route=0;route<3;route++){
  const a=api.start({id:title,title});
  let first=true,steps=0;
  while(!a.v4Completed&&steps<46){
   const last=a.steps.at(-1),options=api.options(last).options;
   assert.ok(options.length>0,title+' missing choices at '+last.nodeId);
   const item=first?options[route]:options[0];
   first=false;
   assert.ok(item?.value,title+' missing route '+route);
   api.choose(a,item,a.steps.length-1);
   steps++;
  }
  assert.equal(a.v4Completed,true,title+' route '+route+' did not finish');
  assert.ok(a.steps.length>=3,title+' conversation too short');
  finished++;
 }
 assert.equal(finished,525);
});
test('V4 state is not mixed across students or scenarios',()=>{
 const api=load().sikauV4Story;
 const a=api.start({id:'a',title:'Buy a phone'});
 api.choose(a,a.steps[0].storeOptions[0],0);
 const snapshot=JSON.stringify(a.v4State);
 const b=api.start({id:'b',title:'At a bank'});
 api.choose(b,b.steps[0].storeOptions[2],0);
 assert.equal(JSON.stringify(a.v4State),snapshot);
 const next=a.steps.at(-1).storeOptions[0];
 api.choose(a,next,a.steps.length-1);
 assert.equal(a.v4State.route,0);
 assert.equal(b.v4State.route,2);
});
test('Native app retains layout and keeps V4 off in untranslated language modes',()=>{
 const html=read('index.html'),dash=read('coach-dashboard.js');
 for(const src of scripts)assert.ok(html.includes('./'+src+'?v='),src);
 assert.ok(html.indexOf('coach-v4-runtime.js?v=')<html.indexOf('coach-dashboard.js?v='));
 assert.match(dash,/languageMode==='en'&&window.sikauV4Story/);
 assert.match(dash,/window\.sikauV4Story\.choose\(active,item,index\)/);
 assert.doesNotMatch(dash,/iframe.*sikauV4|replaceChildren\(.*sikauV4/);
});
