import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';

const root=new URL('../',import.meta.url);
const read=name=>fs.readFileSync(new URL(name,root),'utf8');
const html=read('coach-v4-live.html');
const sourceHash='dd1cc34b4eec163b978806d6b63cbb1f6a230283a17b978b8e56043470f510b0';
const originalStore="const storeKey='english-sikau-175-preview-context-v4';";
const newStore="const learnerToken=(new URLSearchParams(location.hash.slice(1))).get('uid')||''; const storeKey='english-sikau-175-preview-context-v4:'+(/^[A-Za-z0-9_-]{6,128}$/.test(learnerToken)?learnerToken:'standalone');";
const closingBridge='<script src="./coach-v4-bridge.js?v=20261029-exact-v4-r1"></script>';
const guardRegex=/<script>\/\* The paid lesson loads only inside its authenticated parent frame\. \*\/[\s\S]*?<\/script>/;

test('Embedded V4 keeps the exact approved dialogue source, except security and frame adapters',()=>{
 assert.ok(html.includes(newStore),'Per-user draft storage is missing');
 assert.ok(guardRegex.test(html),'Protected parent-frame guard is missing');
 assert.ok(html.includes(closingBridge),'V4 bridge is not loaded');
 const restored=html.replace(guardRegex,'').replace(newStore,originalStore).replace(closingBridge,'');
 const hash=createHash('sha256').update(restored+'\n').digest('hex');
 assert.equal(hash,sourceHash,'Approved user-supplied V4 script must not be rewritten');
});

test('Embedded V4 blocks direct unauthenticated access and isolates saved sessions',()=>{
 assert.match(html,/window\.frameElement/);
 assert.match(html,/sikauCoachV4Frame/);
 assert.match(html,/sikauCoachEveryday/);
 assert.match(html,/frame.*dataset.*sikauStudent|host\.dataset\.sikauStudent/);
 assert.match(html,/location\.replace\(/);
 assert.match(html,/storeKey='english-sikau-175-preview-context-v4:'\+/);
});

function runPreview(){
 const elements=new Map();
 class E{
  constructor(id){this.id=id;this.textContent='';this.innerHTML='';this.value='';
   this.hidden=false;this.disabled=false;this.dataset={};this.scrollHeight=0;
   this.classList={toggle(){},add(){},remove(){}};
   this.style={setProperty(){}};
  }
  addEventListener(){}
  scrollIntoView(){}
  appendChild(){}
 }
 const document={
  getElementById:id=>{
   if(!elements.has(id))elements.set(id,new E(id));
   return elements.get(id);
  },
  addEventListener(){},
  createElement:()=>new E('generated'),
  body:new E('body'),
  documentElement:new E('root')
 };
 const store=new Map();
 const localStorage={
  getItem:key=>store.get(key)||null,
  setItem:(key,value)=>store.set(key,value)
 };
 const context={document,localStorage,navigator:{},URL,URLSearchParams,
  setTimeout,clearTimeout,scrollTo(){},console};
 context.window=context;
 const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(x=>x.trim());
 assert.equal(inline.length,4,'Expected security guard and three V4 scripts');
 for(const script of inline)assert.doesNotThrow(()=>new Function(script),'JavaScript syntax invalid');
 const sandbox=vm.createContext(context);
 for(const script of inline.slice(1))vm.runInContext(script,sandbox,{timeout:25000});
 return context.window.SikauPreview;
}

test('Original V4 UI engine includes all 175 unique, playable conversation topics',()=>{
 const api=runPreview();
 assert.equal(api.topics.length,175);
 assert.equal(new Set(api.topics.map(t=>t.title)).size,175);
 assert.equal(api.topics[0].title,'Return clothing');
 assert.equal(api.topics[9].title,'Order at a café');
 assert.equal(api.topics[174].title,'Shop for family necessities');
 for(const scene of api.topics)assert.equal(scene.routes.length,3,scene.title);
});

test('All 525 distinct starting routes can reach a clean ending in the exact V4 source',()=>{
 const api=runPreview();
 let completed=0;
 for(let i=0;i<175;i++)for(let path=0;path<3;path++){
  api.selectTopic(i);
  api.choose(path);
  let n=0;
  while(!api.view().state.ended&&n++<30){
   const choices=api.getChoices();
   assert.ok(choices.length>0,'Stuck: '+api.topics[i].title+' route '+path);
   api.choose(0);
  }
  assert.equal(api.view().state.ended,true,'Unfinished: '+api.topics[i].title+' route '+path);
  completed++;
 }
 assert.equal(completed,525);
});

test('Native Coach shell mounts the V4 lab after building the separate visa interview tab',()=>{
 const mount=read('coach-v4-mount.js'),index=read('index.html');
 assert.match(mount,/previous\(doc,firstName,verifiedStudentId\)/);
 assert.match(mount,/getElementById\('sikauCoachEveryday'\)/);
 assert.match(mount,/everyday\.replaceChildren\(\)/);
 assert.match(mount,/frame\.dataset\.sikauStudent=verifiedStudentId/);
 assert.match(mount,/getElementById\('langPref'\)/);
 assert.match(mount,/sendConfiguration/);
 assert.match(mount,/sikau-v4-height/);
 assert.ok(index.indexOf('coach-dashboard.js?v=')<index.indexOf('coach-v4-mount.js?v='));
 assert.match(mount,/safeId\(verifiedStudentId\)/);
});

test('All four selected language modes remain recognized without changing V4 answers',()=>{
 const mount=read('coach-v4-mount.js'),bridge=read('coach-v4-bridge.js');
 for(const name of ["en","en-ne","en-roman","all"]){
  assert.ok(mount.includes("'"+name+"'"),'Missing mode '+name+' in mount');
  assert.ok(bridge.includes("'"+name+"'"),'Missing mode '+name+' in bridge');
 }
 assert.match(bridge,/Roman Nepali topic names/);
 assert.match(bridge,/V4 conversation lines are currently in English/);
 assert.doesNotMatch(mount,/\.sikau-visa-hub.*replaceChildren\(/);
});
