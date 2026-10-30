import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const coach=fs.readFileSync(new URL('../coach-dashboard.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const start=coach.indexOf('// Visa navigation is part of the core classroom');
const finish=coach.indexOf('function installVisaSidebar(',start);
assert.ok(start>0&&finish>start,'Visa bootstrap source exists');
const helper=coach.slice(start,finish);
function node(tag){
 const listeners={};
 const element={
  tagName:tag.toUpperCase(),className:'',textContent:'',id:'',dataset:{},hidden:false,
  isConnected:true,style:{display:'',removeProperty(k){if(k==='display')this.display=''}},
  attributes:{},children:[],parentElement:null,
  setAttribute(k,v){this.attributes[k]=String(v)},
  getAttribute(k){return this.attributes[k]||null},
  removeAttribute(k){delete this.attributes[k]},
  append(...children){for(const c of children){this.children.push(c);c.parentElement=this}},
  appendChild(c){this.append(c)},
  addEventListener(name,fn){(listeners[name]??=[]).push(fn)},
  remove(){
   if(!this.parentElement)return;
   const siblings=this.parentElement.children;
   const index=siblings.indexOf(this);if(index>=0)siblings.splice(index,1);
   this.isConnected=false;this.parentElement=null;
  },
  click(){
   const event={preventDefault(){},stopPropagation(){},stopImmediatePropagation(){}};
   // DOM dispatch snapshots listeners: handlers added during this click run next time.
   for(const fn of [...(listeners.click||[])])fn(event);
  }
 };
 element.classList={
  add(...cls){const names=new Set(element.className.split(/\s+/).filter(Boolean));for(const x of cls)names.add(x);element.className=[...names].join(' ')},
  remove(...cls){const del=new Set(cls);element.className=element.className.split(/\s+/).filter(x=>x&&!del.has(x)).join(' ')},
  contains(cls){return element.className.split(/\s+/).includes(cls)}
 };
 element.querySelector=selector=>{
  if(selector==='.sikau-visa-nav-icon')return element.children.find(c=>c.className==='sikau-visa-nav-icon')||null;
  return null;
 };
 return element;
}
function fixture({coachPresent=true}={}){
 const nav=node('nav');nav.className='nav';
 nav.insertBefore=(child,ref)=>{
  const at=nav.children.indexOf(ref);
  if(at<0)nav.append(child);
  else{nav.children.splice(at,0,child);child.parentElement=nav}
 };
 const coachTab=node('button');coachTab.dataset.t='coach';
 let nativeClicks=0;
 coachTab.addEventListener('click',()=>nativeClicks++);
 if(coachPresent)nav.append(coachTab);
 nav.querySelector=selector=>{
  if(selector==='button[data-t="coach"]')return nav.children.find(c=>c.dataset.t==='coach')||null;
  if(selector.includes('sikau-visa-nav'))return nav.children.find(c=>c.classList.contains('sikau-visa-nav'))||null;
  return null;
 };
 nav.querySelectorAll=selector=>{
  if(selector.includes('sikau-visa-nav'))return nav.children.filter(c=>c.classList.contains('sikau-visa-nav'));
  return [];
 };
 const root=node('html');
 const observers=[];
 class MutationObserver{
  constructor(fn){this.fn=fn;observers.push(this)}
  observe(target){this.target=target}
 }
 const view={MutationObserver,setTimeout(fn){fn()}};
 const doc={
  documentElement:root,defaultView:view,createElement:node,
  querySelector(selector){return selector==='#mobileModes.nav'?null:selector==='.nav'?nav:null},
  getElementById(){return null}
 };
 const win={};
 vm.runInNewContext(helper,vm.createContext({window:win,console}),{timeout:2000});
 return {doc,nav,coachTab,win,root,observers,clicks:()=>nativeClicks};
}
test('Visa tab exists immediately before entering Coach, once, on desktop and mobile',()=>{
 const {doc,nav,win,coachTab}=fixture();
 assert.equal(win.sikauEnsureVisaNav(doc),true);
 const visa=nav.querySelector(':scope > button.sikau-visa-nav');
 assert.ok(visa);
 assert.equal(visa.hidden,false);
 assert.equal(visa.getAttribute('aria-label'),'U.S. Visa Interview · अमेरिकी भिसा अन्तर्वार्ता');
 assert.equal(visa.children[1].children[0].textContent,'U.S. Visa Interview');
 assert.equal(visa.parentElement,nav);
 assert.equal(coachTab.parentElement,nav);
 assert.equal(win.sikauEnsureVisaNav(doc),true);
 assert.equal(nav.querySelectorAll(':scope > button.sikau-visa-nav').length,1);
});
test('Visa navigation remains visible when Coach is not yet in private sidebar',()=>{
 const {doc,win,nav}=fixture({coachPresent:false});
 assert.equal(win.sikauEnsureVisaNav(doc),true);
 assert.ok(nav.querySelector('.sikau-visa-nav'));
});
test('Before Coach is ready, tapping Visa opens Coach internally and selects Visa',()=>{
 const {doc,nav,win,clicks,root}=fixture();
 let selected=0;
 win.sikauEnsureVisaNav(doc,()=>{
  const visa=nav.querySelector('.sikau-visa-nav');
  if(!visa.__sikauVisaBound){
   visa.__sikauVisaBound=true;
   visa.addEventListener('click',()=>selected++);
  }
 });
 const visa=nav.querySelector('.sikau-visa-nav');
 visa.click();
 assert.equal(clicks(),1,'Native Coach route can initialize its content');
 assert.equal(selected,1,'Visa becomes selected without another user click');
 assert.equal(root.dataset.sikauVisaMode,'visa');
 assert.equal(nav.__sikauVisaEarlyLoading,false);
 assert.equal(nav.querySelector('.sikau-visa-nav'),visa);
});
test('Visa tab recreates itself after private lesson removes custom sidebar item',()=>{
 const {doc,nav,win,observers}=fixture();
 win.sikauEnsureVisaNav(doc);
 const first=nav.querySelector('.sikau-visa-nav');
 first.remove();
 const observer=observers.find(o=>o.target===nav);
 assert.ok(observer,'The active navigation is observed');
 observer.fn([{type:'childList',addedNodes:[]}]);
 const second=nav.querySelector('.sikau-visa-nav');
 assert.ok(second);
 assert.notEqual(second,first);
 assert.equal(nav.querySelectorAll(':scope > button.sikau-visa-nav').length,1);
});
test('Existing Visa tab and on-page controller are preserved rather than cloned',()=>{
 const {doc,nav,win}=fixture();
 win.sikauEnsureVisaNav(doc);
 const first=nav.querySelector('.sikau-visa-nav');
 first.__sikauVisaBound=true;
 first.classList.add('on');
 win.sikauEnsureVisaNav(doc);
 assert.equal(nav.querySelector('.sikau-visa-nav'),first);
 assert.equal(first.classList.contains('on'),true);
});
test('Authenticated wrapper creates Visa before Coach and loads updated JS',()=>{
 const early=index.indexOf("uiStep('always-visible Visa tab'");
 const coachStep=index.indexOf("uiStep('coach',");
 assert.ok(early>0&&coachStep>early,'Independent Visa bootstrap must run first');
 assert.match(index,/coach-dashboard\.js\?v=20261030-always-visible-visa-r1/);
 assert.match(coach,/shell\.__sikauVisaController=visaController/);
 assert.match(coach,/installVisaSidebar\(doc,previous,previous\.__sikauVisaController\)/);
});
