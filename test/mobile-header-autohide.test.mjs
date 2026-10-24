import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const code=fs.readFileSync(new URL('../mobile-header-autohide.js',import.meta.url),'utf8');
const website=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

function makeBrowser(){
 const rootClasses=new Set();
 const styles=[],windowListeners={},iframeListeners={},parentChildren={};
 let clock=10000;
 const root={
  style:{properties:{},setProperty(k,v){this.properties[k]=v;}},
  classList:{add:k=>rootClasses.add(k),remove:k=>rootClasses.delete(k),contains:k=>rootClasses.has(k)}
 };
 const header={
  height:228,listeners:{},contains(){return false},
  getBoundingClientRect(){return {height:this.height};},
  addEventListener(type,fn){this.listeners[type]=fn;}
 };
 const toggle={open:false,getAttribute(){return this.open?'true':'false'}};
 const map={protected:root,bar:header,cloudStoryToggle:toggle};
 const document={
  activeElement:null,head:{appendChild(x){styles.push(x);}},
  createElement:()=>({}),
  getElementById(id){return id==='sikau-mobile-header-autohide-style'?
   styles.find(s=>s.id===id):map[id];}
 };
 const window={
  innerWidth:393,
  matchMedia(){return {matches:this.innerWidth<=650};},
  addEventListener(n,fn){windowListeners[n]=fn;}
 };
 const clockRef={now:()=>clock};
 vm.runInNewContext(code,{document,window,Date:clockRef,WeakSet});
 const scrollEl={nodeType:1,scrollTop:0,scrollHeight:1800,clientHeight:480,closest(){return null;}};
 const frame={
  documentElement:scrollEl,body:scrollEl,scrollingElement:scrollEl,
  defaultView:{addEventListener(){}},
  addEventListener(n,fn){iframeListeners[n]=fn;}
 };
 window.sikauInstallMobileHeader(frame);
 function scroll(y,delay=440){
  clock+=delay;scrollEl.scrollTop=y;
  iframeListeners.scroll({target:frame});
  return rootClasses.has('sikau-mobile-header-hidden');
 }
 return {
  window,root,header,toggle,styles,scroll,
  reset:()=>window.sikauResetMobileHeader(),
  resize:()=>windowListeners.resize(),
  hidden:()=>rootClasses.has('sikau-mobile-header-hidden')
 };
}

test('smooth header retains layout and transitions instead of abrupt display none',()=>{
 const {styles,root}=makeBrowser();
 const css=styles[0].textContent;
 assert.match(css,/translate3d\(0,-105%,0\)/);
 assert.match(css,/margin-bottom 300ms/);
 assert.match(css,/opacity 230ms/);
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.doesNotMatch(css,/display:none/);
 assert.equal(root.style.properties['--sikau-mobile-header-height'],'228px');
 assert.match(website,/mobile-header-autohide\.js\?v=20261024-smooth-r2/);
});

test('scroll down slides away, up restores, and rapid layout adjustments do not flicker',()=>{
 const b=makeBrowser();
 assert.equal(b.hidden(),false);
 assert.equal(b.scroll(56),false);
 assert.equal(b.scroll(180),true);
 assert.equal(b.scroll(94,10),true,'ignore synthetic iframe resize');
 assert.equal(b.scroll(66),false);
 assert.equal(b.scroll(192),true);
 b.reset();
 assert.equal(b.hidden(),false);
});

test('tall greetings, expanded progress, focus and tablets remain accessible',()=>{
 const b=makeBrowser();
 b.header.height=264;b.resize();
 assert.equal(b.root.style.properties['--sikau-mobile-header-height'],'264px');
 b.scroll(75);assert.equal(b.scroll(194),true);
 b.toggle.open=true;assert.equal(b.scroll(245),false);
 b.toggle.open=false;assert.equal(b.scroll(310),true);
 b.header.listeners.focusin();assert.equal(b.hidden(),false);
 b.window.innerWidth=900;assert.equal(b.scroll(430),false);
});
