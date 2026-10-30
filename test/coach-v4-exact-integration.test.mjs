import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';

const root=new URL('../',import.meta.url);
const read=name=>fs.readFileSync(new URL(name,root),'utf8');
const html=read('coach-v4-live.html');
const originalConversationDataHash='ff89a5a06d89a055b5498a6c57628988c7bee4af8aa796f77bc3b57fd4fbee3c';
const originalStore="const storeKey='english-sikau-175-preview-context-v4';";
const newStore="const learnerToken=(new URLSearchParams(location.hash.slice(1))).get('uid')||''; const storeKey='english-sikau-175-preview-context-v4:'+(/^[A-Za-z0-9_-]{6,128}$/.test(learnerToken)?learnerToken:'standalone');";
const closingBridgePattern=/<script src="\.\/coach-v4-bridge\.js\?v=20261030-[^"]+"><\/script>/;
const guardRegex=/<script>\/\* The paid lesson loads only inside its authenticated parent frame\. \*\/[\s\S]*?<\/script>/;

test('Removing the review panel does not modify the approved 175-topic dialogue data',()=>{
 assert.ok(html.includes(newStore),'Per-user draft storage is missing');
 assert.ok(guardRegex.test(html),'Protected parent-frame guard is missing');
 assert.match(html,closingBridgePattern,'V4 bridge is not loaded');
 const start=html.indexOf('const B='),end=html.indexOf('const learnerToken=',start);
 assert.ok(start>0&&end>start,'V4 conversation definitions must be intact');
 const hash=createHash('sha256').update(html.slice(start,end)).digest('hex');
 assert.equal(hash,originalConversationDataHash,'Original V4 questions, choices, and branching rules must be identical');
});

test('Embedded V4 blocks direct unauthenticated access and isolates saved sessions',()=>{
 assert.match(html,/window\.frameElement/);
 assert.match(html,/sikauCoachV4Frame/);
 assert.match(html,/sikauCoachEveryday/);
 assert.match(html,/frame.*dataset.*sikauStudent|host\.dataset\.sikauStudent/);
 assert.match(html,/location\.replace\(/);
 assert.match(html,/storeKey='english-sikau-175-preview-context-v4:'\+/);
});

function runPreview(firstName='',withElements=false){
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
 const context={document,localStorage,navigator:{},location:{hash:'#uid=teststudent123'},URL,URLSearchParams,
  frameElement:{dataset:{sikauStudentFirstName:firstName}},
  setTimeout,clearTimeout,scrollTo(){},console};
 context.window=context;
 const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(x=>x.trim());
 assert.equal(inline.length,4,'Expected security guard and three V4 scripts');
 for(const script of inline)assert.doesNotThrow(()=>new Function(script),'JavaScript syntax invalid');
 const sandbox=vm.createContext(context);
 for(const script of inline.slice(1))vm.runInContext(script,sandbox,{timeout:25000});
 return withElements?{api:context.window.SikauPreview,elements}:context.window.SikauPreview;
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

test('Café totals include selected drink, oat milk and food and clear changed orders',()=>{
 const api=runPreview();api.selectTopic(9);
 const pick=pattern=>{const i=api.getChoices().findIndex(x=>pattern.test(typeof x==='string'?x:x.label));assert.ok(i>=0,'Missing café choice '+pattern);api.choose(i);};
 pick(/would like a coffee/i);pick(/medium iced/i);pick(/Oat milk/);pick(/To go/);
 pick(/add a croissant/);
 assert.match(api.view().state.messages.at(-1).text,/Rs 580/);
 pick(/change my drink/);pick(/small hot latte/);pick(/Regular milk/);pick(/here, please/);pick(/What is my total/);
 assert.match(api.view().state.messages.at(-1).text,/Rs 300/);
 pick(/pay cash/);pick(/Goodbye/);assert.equal(api.view().state.ended,true);
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
 assert.match(bridge,/const topicTitleNe=/);
 assert.match(bridge,/getElementById\('langPref'\)/);
 assert.match(bridge,/sikau-v4-ne-dialogue-cache-v2/);
 assert.match(bridge,/#chat-transcript \.bubble/);
 assert.match(bridge,/#chat-choices \.answer-button/);
 assert.doesNotMatch(mount,/\.sikau-visa-hub.*replaceChildren\(/);
});

test('Visa Interview can still open its native Ask AI Coach form',()=>{
 const mount=read('coach-v4-mount.js');
 assert.doesNotMatch(mount,/\.coach-ask\{display:none!important\}/);
 assert.doesNotMatch(mount,/\.coach-plan\{display:none!important\}/);
 const original=read('coach-dashboard.js');
 assert.match(original,/enhanceVisaInterviewCoach\(doc,shell,ask\)/);
 assert.match(original,/installVisaSidebar\(doc,shell,visaController\)/);
});
test('Coach dark mode follows the authenticated app and preserves the V4 render state',()=>{
 const bridge=read('coach-v4-bridge.js');
 assert.match(bridge,/function readCoachTheme\(/);
 assert.match(bridge,/window\.top\.document\.documentElement/);
 assert.match(bridge,/function applyCoachTheme\(/);
 assert.match(bridge,/SikauPreview\?\.setTheme/);
 const mount=read('coach-v4-mount.js');
 assert.match(mount,/const parentMode=document\.documentElement\.dataset\.sikauTheme/);
 assert.match(mount,/MutationObserver\(sendConfiguration\)\.observe\(document\.documentElement/);
 assert.match(bridge,/applyCoachTheme\(\)/);
 assert.match(bridge,/attributeFilter:\['data-sikau-theme','data-theme'\]/);
 assert.doesNotMatch(bridge,/getElementById\('theme-toggle'\)\?\.click\(\)/);
 assert.match(html,/setTheme:\(theme\)=>\{/);
 assert.match(html,/document\.documentElement\.dataset\.theme=wanted\?'dark':'light'/);
});

test('The review feedback section is absent from all 175 conversations',()=>{
 for(const text of ['Something feels unnatural?', 'Copy conversation + suggestion',
  'Save transcript as text','Write what should happen instead', 'id="copy-chat"',
  'id="copy-notes"','id="export-chat"','id="feedback"','id="copystatus"',
  'function copyFeedback()', 'function downloadTranscript()',
  "$('feedback')", "$('copystatus')"]){
  assert.equal(html.includes(text),false,'Removed review interface remains: '+text);
 }
 assert.equal(html.includes('id="complete-actions"'),true,'Conversation endings must remain');
 assert.equal(html.includes('id="chat-transcript"'),true,'Conversation history must remain');
 assert.equal(html.includes('id="switch-goal"'),true,'Change request must remain');
 assert.equal(html.includes('id="undo"'),true,'Undo must remain');
 const choices=runPreview();
 assert.equal(choices.topics.length,175);
});


test('Conversation history stays in a bounded touch-scroll area on iPhone',()=>{
 const mobile=html.match(/@media\(max-width:620px\)\{[^\n]*\.transcript\{([^}]+)\}/);
 assert.ok(mobile,'Mobile chat-history CSS is missing');
 const rules=mobile[1];
 assert.match(rules,/max-height:min\(42vh,350px\)/);
 assert.match(rules,/overflow-y:auto/);
 assert.match(rules,/overscroll-behavior-y:contain/);
 assert.match(rules,/-webkit-overflow-scrolling:touch/);
 assert.doesNotMatch(rules,/max-height:none|overflow:visible/);
 assert.match(html,/id="chat-transcript" class="transcript" role="log" tabindex="0"/);
 assert.match(html,/id="choices-wrap" class="choice-area"/);
 assert.ok(html.indexOf('id="chat-transcript"')<html.indexOf('id="choices-wrap"'));
 assert.match(html,/scrollTop=\$\('chat-transcript'\)\.scrollHeight/);
});

test('Coach reloads updated iframe content without affecting other language and Visa tabs',()=>{
 const mount=read('coach-v4-mount.js');
 const app=read('index.html');
 assert.match(mount,/source\.searchParams\.set\('v','20261030-learner-audit-r1'\)/);
 assert.match(app,/coach-v4-mount\.js\?v=20261030-learner-audit-r1/);
 assert.match(mount,/getElementById\('sikauCoachEveryday'\)/);
 assert.match(mount,/getElementById\('langPref'\)/);
 assert.doesNotMatch(mount,/\.sikau-visa-hub.*replaceChildren/);
});


test('Offline glossary has a stable Nepali title for every one of the 175 V4 topics',()=>{
 const bridge=read('coach-v4-bridge.js');
 const match=bridge.match(/const topicTitleNe=(\{[\s\S]*?\});/);
 assert.ok(match,'Full offline topic-title map is missing');
 const map=JSON.parse(match[1]);
 const preview=runPreview();
 assert.equal(Object.keys(map).length,175);
 for(const topic of preview.topics){
  assert.ok(typeof map[topic.title]==='string',topic.title+' is missing');
  assert.match(map[topic.title],/[\u0900-\u097f]/,topic.title+' is not translated');
 }
 assert.equal(preview.topics.length,175);
});

test('Shared language bridge covers all V4 message types and retries temporarily failed translations',()=>{
 const bridge=read('coach-v4-bridge.js');
 for(const path of [
  '#topic-grid .topic-card','#chat-transcript .bubble',
  '#chat-choices .answer-button','#chat-role',
  '#category-filters .category-chip','#complete-actions p'
 ]){
  assert.ok(bridge.includes(path),'Coach multilingual coverage missing: '+path);
 }
 // The live Coach title uses getElementById, not a CSS selector string.
 // Assert its real localization operation instead of a stale literal.
 assert.match(bridge,/const header=document\.getElementById\('chat-title'\)/);
 assert.match(bridge,/display\(header,text,entry\)/);
 assert.match(bridge,/function readLessonMode\(/);
 assert.match(bridge,/function syncLessonMode\(/);
 assert.match(bridge,/translateWithMyMemory/);
 assert.match(bridge,/translateWithGoogle/);
 assert.match(bridge,/retryAfter/);
 assert.doesNotMatch(bridge,/failures>=4/,'Translation must not permanently disable itself');
 const mount=read('coach-v4-mount.js');
 assert.match(mount,/sikauCoachV4Translations/);
});


test('Coach pagination stays flexible in English, Nepali, and Roman Nepali',()=>{
 const bridge=read('coach-v4-bridge.js');
 assert.match(bridge,/\.pager-controls\{display:grid!important;grid-template-columns:/,
  'Pager must allocate independent Previous, number strip, and Next columns');
 assert.match(bridge,/\.pager-controls \.page-nav\{display:flex;flex-direction:column;/,
  'Previous and Next labels need separate rows');
 assert.match(bridge,/\.pager-controls \.page-nav\{[^\n]*height:auto!important;/,
  'Translated labels must be allowed to increase button height');
 assert.match(bridge,/\.pager-controls \.page-numbers\{[^\n]*overflow-x:auto;/,
  'Page numbers must scroll instead of colliding with navigation');
 assert.match(bridge,/\.pager-controls \.page-nav \.sikau-v4-local\{font-size:10px!important;/);
});

test('Translated Coach answers use normal text styling, not the pink arrow styling',()=>{
 const bridge=read('coach-v4-bridge.js');
 assert.match(html,/\.answer-button > span:last-child\{font-size:23px;color:var\(--pink\)\}/,
  'The original CSS selector must target the direct arrow child only');
 assert.doesNotMatch(html,/\.answer-button span:last-child\{font-size:23px/,
  'The old descendant selector made every translated answer 23px');
 assert.match(bridge,/\.answer-button \.sikau-v4-local>span\{display:block;font-size:inherit!important;/);
 assert.match(bridge,/\.answer-button \.sikau-v4-local\{display:block;font-size:12px!important;/);
});

test('Roman Nepali starts with a capital and capitalizes the next sentence',()=>{
 const bridge=read('coach-v4-bridge.js');
 const match=bridge.match(/function capitalizeRomanSentences\(value\)\{[\s\S]*?\n \}/);
 assert.ok(match,'Capitalization helper missing');
 const cap=vm.runInNewContext('('+match[0]+')');
 assert.equal(cap('bankma kurakani. tapaiko uttarle kurakani badalchha.'),
  'Bankma kurakani. Tapaiko uttarle kurakani badalchha.');
 assert.equal(cap('mero namaste! tapaiko kura? thik chha.'),
  'Mero namaste! Tapaiko kura? Thik chha.');
 assert.equal(cap('1 dekhi 25 samma. prishtha 1/7'),
  '1 Dekhi 25 samma. Prishtha 1/7');
 assert.match(bridge,/capitalizeRomanSentences\(override\?\.roman\|\|romanize\(ne\)\)/,
  'Roman translation supplied by the original lesson must also be capitalized');
});

test('Hide unnecessary practice disclaimer in all 175 topic pages',()=>{
 assert.doesNotMatch(html,/Practice preview only · No purchases, medical appointments/,
  'Unnecessary preview disclaimer still appears at the bottom');
 assert.doesNotMatch(html,/<p class="footnote">/);
});

test('All sidebar tabs including Coach can be dragged on desktop and reordered on touch/keyboard',()=>{
 const src=read('sidebar-unified.js'),css=read('sidebar-unified.css');
 assert.match(src,/const SELECTOR='button\[data-t\],button\.sikau-home-nav,button\.sikau-visa-nav'/);
 assert.match(src,/const nativeDrag=!!win\.matchMedia\?\./);
 assert.match(src,/b\.draggable=nativeDrag/);
 assert.match(src,/doc\.addEventListener\('dragstart'/);
 assert.match(src,/doc\.addEventListener\('dragover'/);
 assert.match(src,/doc\.addEventListener\('drop'/);
 assert.match(src,/doc\.addEventListener\('dragend'/);
 assert.match(src,/applyDrop\(htmlDrag,e\.clientX,e\.clientY\)/);
 assert.match(src,/if\(move\(nav,moving,target,before\)\)persist\(\)/);
 assert.match(src,/saveWrite|safeWrite\(win,STORAGE,saved\)/);
 assert.match(src,/const touchStart=e=>/);
 assert.match(src,/Alt\+ArrowUp Alt\+ArrowDown/);
 assert.match(css,/sikau-nav-dragging/);
 assert.match(css,/sikau-nav-drop-target/);
});

test('Desktop Coach drag uses native HTML5 drop and keeps touch reordering',()=>{
 const src=read('sidebar-unified.js'),index=read('index.html');
 assert.match(index,/sidebar-unified\.js\?v=20261029-desktop-tab-drag-r2/);
 assert.match(src,/doc\.addEventListener\('dragstart'/);
 assert.match(src,/e\.dataTransfer\.setData\('text\/plain','sikau-tab:'\+id\(b\)\)/);
 assert.match(src,/applyDrop\(htmlDrag,e\.clientX,e\.clientY\)/);
 assert.doesNotMatch(src,/b\.draggable=false;b\.removeAttribute\('draggable'\)/);
 assert.match(src,/const touchStart=e=>/);
});


test('Coach chat displays each verified learner first name, not generic You, in all 175 topics',()=>{
 const mount=read('coach-v4-mount.js');
 const bridge=read('coach-v4-bridge.js');
 assert.match(mount,/frame\.dataset\.sikauStudentFirstName=learnerFirstName/);
 assert.match(html,/window\.frameElement\?\.dataset\?\.sikauStudentFirstName/);
 assert.match(bridge,/window\.frameElement\?\.dataset\?\.sikauStudentFirstName/);
 assert.match(bridge,/ne:firstName\+' · विद्यार्थी'/);
 assert.match(bridge,/roman:firstName\+' · Bidhyarthi'/);
 for(const firstName of ['Maya','Abhyash','Sita']){
  const {api,elements}=runPreview(firstName,true);
  for(let i=0;i<175;i++){
   api.selectTopic(i);
   api.choose(0);
   const transcript=elements.get('chat-transcript').innerHTML;
   assert.ok(transcript.includes('class="speaker">'+firstName+' · Learner</div>'),
    'Missing logged-in first name '+firstName+' at topic '+(i+1));
   assert.ok(!transcript.includes('class="speaker">You · Learner</div>'),
    'Generic You label still shown at topic '+(i+1));
  }
 }
});

test('Coach learner name uses a neutral fallback when verified first name is absent',()=>{
 const {api,elements}=runPreview('',true);
 api.selectTopic(0);
 api.choose(0);
 assert.match(elements.get('chat-transcript').innerHTML,/class="speaker">Learner · Learner<\/div>/);
});

