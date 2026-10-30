import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const path=new URL('../learner-daily-mission.js',import.meta.url);
const code=fs.readFileSync(path,'utf8');
const css=fs.readFileSync(new URL('../learner-daily-mission.css',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

class Element{
 constructor(tag='div'){
  this.tagName=tag.toUpperCase();this.children=[];this.parentElement=null;this.className='';
  this.id='';this.textContent='';this.dataset={};this.attributes={};this.listeners={};
  this.style={};this.lang='';this.type='';
 }
 appendChild(x){x.parentElement=this;this.children.push(x);return x;}
 insertBefore(x,before){x.parentElement=this;const i=this.children.indexOf(before);
  if(i<0)this.children.push(x);else this.children.splice(i,0,x);return x;}
 remove(){if(this.parentElement){const i=this.parentElement.children.indexOf(this);
  if(i>=0)this.parentElement.children.splice(i,1);}this.parentElement=null;}
 setAttribute(k,v){this.attributes[k]=String(v);}
 getAttribute(k){return this.attributes[k]||null;}
 addEventListener(t,fn){this.listeners[t]=fn;}
 click(){this.listeners.click?.();}
 querySelector(sel){
  const match= n=> sel[0]==='#'?n.id===sel.slice(1):
   sel[0]==='.'?n.className.split(/\s+/).includes(sel.slice(1)):false;
  const walk=n=>{for(const c of n.children){
   if(match(c))return c;const nested=walk(c);if(nested)return nested;
  }return null;};
  return walk(this);
 }
 querySelectorAll(sel){
  if(sel==='button[data-t]')return this.children.filter(n=>n.tagName==='BUTTON'&&n.dataset.t);
  throw Error('Unexpected selector '+sel);
 }
 get firstChild(){return this.children[0]||null;}
}
function setup(){
 const view={localStorage:(()=>{const entries=new Map();return{
  getItem:key=>entries.get(key)||null,setItem:(key,value)=>entries.set(key,value),entries};})()};
 const home=new Element('section');home.id='sikauHomeScreen';
 const festival=new Element('div');festival.className='sfd';home.appendChild(festival);
 const head=new Element('head');
 const nav=new Element('nav');nav.className='nav';
 const opens={words:0,rd:0,coach:0};
 for(const key of Object.keys(opens)){
  const button=new Element('button');button.dataset.t=key;
  button.addEventListener('click',()=>{opens[key]++;});nav.appendChild(button);
 }
 const doc={head,defaultView:view,baseURI:'https://example.pages.dev/',
  getElementById:id=>id===home.id?home:head.querySelector('#'+id),
  querySelector:selector=>selector==='#mobileModes.nav'?nav:selector==='.nav'?nav:null,
  createElement:tag=>new Element(tag)};
 const w={};
 vm.runInNewContext(code,{window:w,document:doc,Intl,URL,Date,console}, {timeout:1000});
 return{w,doc,home,head,opens,view};
}
test('Installs a compact three-step mission only inside authorized learner home',()=>{
 const v=setup();
 assert.equal(v.w.enhanceDailyEnglishMission(v.doc,'student-one'),true);
 const card=v.home.querySelector('#sikauDailyMission');
 assert.ok(card);assert.ok(card.dataset.date);assert.equal(card.attributes['aria-label'],"Today's English mission");
 assert.equal(v.home.children.indexOf(card),0,'Mission precedes the festival, never replaces it');
 assert.ok(v.home.querySelector('.sfd'),'Existing festival stays visible');
 assert.equal(card.querySelectorAll?.length||0,0);
 assert.match(index,/learner-daily-mission\.js\?v=20261030-r1/);
 assert.match(index,/enhanceDailyEnglishMission\?\.\(doc,user\.\$id\)/);
 assert.ok(!/createExecution|createRecovery|payment|trialPass/.test(code),'No authorization or payment operations');
});
test('No duplicates from frame personalization, and follows the existing lesson buttons',()=>{
 const v=setup();
 v.w.enhanceDailyEnglishMission(v.doc,'user-1');
 v.w.enhanceDailyEnglishMission(v.doc,'user-1');
 assert.equal(v.home.children.filter(n=>n.id==='sikauDailyMission').length,1);
 const mission=v.home.querySelector('#sikauDailyMission');
 const links=[];
 const walk=n=>{for(const x of n.children){if(x.className==='mission-open')links.push(x);walk(x);}};
 walk(mission);
 assert.equal(links.length,3);
 links.forEach(b=>b.click());
 assert.deepEqual(v.opens,{words:1,rd:1,coach:1});
});
test('Check-off status remains self-reported and account-scoped',()=>{
 const v=setup();v.w.enhanceDailyEnglishMission(v.doc,'member-A');
 let done=v.home.querySelector('.mission-done');
 assert.ok(done);done.click();
 assert.equal(done.getAttribute('aria-pressed'),'true');
 const oldKey=Array.from(v.view.localStorage.entries.keys())[0];
 assert.ok(oldKey.includes('member-A'));
 v.w.enhanceDailyEnglishMission(v.doc,'member-B');
 done=v.home.querySelector('.mission-done');
 assert.equal(done.getAttribute('aria-pressed'),'false');
 assert.equal(v.view.localStorage.entries.size,1,'No data writes for other accounts');
});
test('Respect English-only, English-Nepali, Roman and all-mode CSS on mobile and dark mode',()=>{
 for(const mode of ['en','en-roman','all'])assert.ok(css.includes('data-sikau-display-language="'+mode+'"'));
 assert.match(css,/@media\(max-width:570px\)/);
 assert.match(css,/data-sikau-theme="dark"/);
 assert.match(css,/min-height:42px/);
 assert.ok(!/position:fixed|z-index:\s*999/.test(css),'Never overlays core controls');
});
