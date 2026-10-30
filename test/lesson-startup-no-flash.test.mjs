import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const page=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const helperStart=page.indexOf('let sikauInitialSessionPending=true,sikauBootGeneration=0;');
const helperEnd=page.indexOf('// Appwrite account IDs and labels',helperStart);
assert.ok(helperStart>0&&helperEnd>helperStart,'Boot helper must be present in the real page');
const helper=page.slice(helperStart,helperEnd);

test('loading cover exists before account shell and is theme-aware on every screen',()=>{
 assert.ok(page.indexOf('id="sikauBootCover"')<page.indexOf('id="shell"'));
 assert.match(page,/#sikauBootCover\{position:fixed;inset:0;z-index:9999/);
 assert.match(page,/html\[data-sikau-theme="dark"\] #sikauBootCover/);
 assert.match(page,/#protected\[data-sikau-booting="1"\] #lessonFrame\{visibility:hidden!important/);
 assert.match(page,/id="sikauBootRetry" hidden onclick="location.reload\(\)"/);
 assert.match(page,/sikauInitialSessionPending=false;if\(!openedAccess\)sikauHideBoot\(\)/);
});

test('private srcdoc hides its original layout before responsive enhancement runs',()=>{
 assert.match(page,/const noOldLessonFlash='<style id="sikauNoOldLessonFlash">html:not\(\.sikau-refresh\) body\{visibility:hidden!important\}<\/style>'/);
 assert.match(page,/enhancedHtml\.replace\(\/<head\\b\[\^>\]\*>\//);
 assert.match(page,/frame\.srcdoc=stagedHtml/);
 assert.match(page,/personalizeStudentLesson\(\);[\s\S]{0,100}void sikauRevealPreparedLesson\(doc\)/);
 assert.match(page,/sikauShowBoot\('Opening your updated classroom/);
 assert.match(page,/if\(!sikauInitialSessionPending\)sikauHideBoot\(\)/);
});

function harness({ready=true,loaded=true}={}){
 const cover={hidden:false};
 const status={textContent:''};
 const retry={hidden:true};
 const spinner={hidden:false};
 const protectedPage={dataset:{sikauBooting:'1'}};
 const link={
  tagName:'LINK',sheet:loaded?{}:null,listeners:{},
  addEventListener(name,fn){this.listeners[name]=fn},
  removeEventListener(name,fn){if(this.listeners[name]===fn)delete this.listeners[name]}
 };
 const doc={
  body:{},
  documentElement:{classList:{contains:cls=>ready&&cls==='sikau-refresh',add(name){this.lastAdded=name}}},
  getElementById:id=>id==='sikauUnifiedAllTabsStyle'?link:null
 };
 const frame={contentDocument:doc};
 const elements={sikauBootCover:cover,sikauBootMessage:status,sikauBootRetry:retry,
  sikauBootSpinner:spinner,protected:protectedPage,lessonFrame:frame};
 const ctx={
  $:id=>elements[id]||null,openedAccess:'lifetime',readNumber:5,
  clearTimeout,setTimeout,requestAnimationFrame:fn=>setImmediate(fn),
  console,Promise,
 };
 vm.runInNewContext(helper,vm.createContext(ctx),{timeout:2000});
 return {ctx,cover,status,retry,spinner,protectedPage,link,doc,frame};
}
test('ready layouts reveal only after stylesheet is available',async()=>{
 const {ctx,cover,protectedPage,doc}=harness();
 assert.equal(cover.hidden,false);
 await ctx.sikauRevealPreparedLesson(doc);
 assert.equal(cover.hidden,true);
 assert.equal(protectedPage.dataset.sikauBooting,undefined);
 assert.equal(doc.documentElement.classList.lastAdded,'sikau-parent-ready');
});
test('slow Android-style CSS never exposes old layout before load event',async()=>{
 const {ctx,cover,protectedPage,doc,link}=harness({loaded:false});
 const task=ctx.sikauRevealPreparedLesson(doc);
 assert.equal(cover.hidden,false);
 assert.equal(protectedPage.dataset.sikauBooting,'1');
 assert.equal(typeof link.listeners.load,'function');
 link.sheet={};
 link.listeners.load();
 await task;
 assert.equal(cover.hidden,true);
});
test('failed stylesheet keeps old layout masked and offers retry',async()=>{
 const {ctx,cover,protectedPage,doc,link,retry,status}=harness({loaded:false});
 const task=ctx.sikauRevealPreparedLesson(doc);
 link.listeners.error();
 await task;
 assert.equal(cover.hidden,false);
 assert.equal(protectedPage.dataset.sikauBooting,'1');
 assert.equal(retry.hidden,false);
 assert.match(status.textContent,/style did not load/i);
});
test('missing responsive initializer never falls back to original UI',async()=>{
 const {ctx,cover,protectedPage,doc,retry}=harness({ready:false});
 await ctx.sikauRevealPreparedLesson(doc);
 assert.equal(cover.hidden,false);
 assert.equal(protectedPage.dataset.sikauBooting,'1');
 assert.equal(retry.hidden,false);
});
test('stale in-flight stylesheet cannot reveal after lesson access is revoked',async()=>{
 const {ctx,cover,protectedPage,doc,link}=harness({loaded:false});
 const task=ctx.sikauRevealPreparedLesson(doc);
 ctx.openedAccess=null;
 link.sheet={};link.listeners.load();
 await task;
 assert.equal(cover.hidden,false);
 assert.equal(protectedPage.dataset.sikauBooting,'1');
});
