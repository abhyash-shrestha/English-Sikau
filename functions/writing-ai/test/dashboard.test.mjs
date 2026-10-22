import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {JSDOM}=require(process.env.SIKAU_JSDOM_MODULE||'jsdom');
const source=readFileSync(new URL('../../../writing-coach-dashboard.js',import.meta.url),'utf8');
const pokhara=JSON.parse(readFileSync(new URL('./grammar-cases.json',import.meta.url),'utf8')).find(x=>x.id==='pokhara-advantages-user-20261022');
const answer='I wakes up early every day.';
const review={relevance:'on_topic',score:81,corrected:'I wake up early every day.',feedback:[{before:'I wakes up',after:'I wake up',why_en:'Use the base verb with I.',why_ne:'“I” सँग “wake” लेख्नुहोस्।'}],model_answer:'This is a fictional model answer for practice.',tip_en:'Add one example.',tip_ne:'एउटा उदाहरण थप्नुहोस्।'};
function setup({enabled=true,respond=async()=>({status:'ok',review})}={}){
 const dom=new JSDOM('<!doctype html><html><head></head><body><section id="hw"><div class="content"><div id="topicCard"><div id="topicEn">Describe your daily routine.</div><div id="topicNe">आफ्नो दिनचर्याबारे लेख्नुहोस्।</div><button id="topicDice">Change topic</button></div><div class="card"><div id="writeModeSw"></div><textarea id="writeText"></textarea><button id="writeCheck">Check my writing</button></div><div id="writeResult"></div></div></section></body></html>',{url:'https://test.invalid/',runScripts:'outside-only'});
 const {window:w}=dom,d=w.document,calls=[];let native=0;
 w.sikauWritingAIConfigured=enabled;w.sikauWritingAI=async data=>{calls.push(data);return respond(data);};
 d.getElementById('writeText').value=answer;
 d.getElementById('writeCheck').addEventListener('click',()=>{native++;d.getElementById('writeResult').innerHTML='<div class="wc-score"><span class="num">60</span></div>';});
 w.eval(source);w.enhanceWritingCoachDashboard(d);
 const consent=d.querySelector('.wc-ai-privacy input');
 const click=()=>d.getElementById('writeCheck').click();
 const edit=text=>{const el=d.getElementById('writeText');el.value=text;el.dispatchEvent(new w.Event('input',{bubbles:true}));};
 return {dom,w,d,calls,consent,click,edit,native:()=>native,summary:()=>d.querySelector('.wc-real-feedback'),close:()=>dom.window.close()};
}
const tick=()=>new Promise(resolve=>setTimeout(resolve,0));

test('AI runs directly even when the old checker produces no score',async()=>{
 const x=setup();x.consent.checked=true;x.click();await tick();
 assert.equal(x.calls.length,1);assert.equal(x.native(),0);assert.match(x.summary().textContent,/81\/100/);
 assert.match(x.summary().textContent,/I wake up early every day/);assert.match(x.summary().textContent,/Use the base verb/);assert.match(x.summary().textContent,/wake.*लेख्नुहोस्/);
 assert.equal(x.summary().querySelectorAll('.wc-simple-fixes li').length,1);assert.equal(x.summary().querySelector('details').open,false);
 assert.match(x.summary().textContent,/Fictional example/);x.close();
});
test('no student text is sent before explicit AI choice',async()=>{
 const x=setup();x.click();await tick();assert.equal(x.calls.length,0);assert.equal(x.native(),0);assert.match(x.summary().textContent,/Choose AI/);x.close();
});
test('basic checker remains available without sending writing to Groq',async()=>{
 const x=setup();x.d.querySelector('.wc-basic-check').click();await tick();assert.equal(x.native(),1);assert.equal(x.calls.length,0);assert.match(x.summary().textContent,/Basic estimate/);x.close();
});
test('disabled configuration preserves native behavior and does not show AI controls',async()=>{
 const x=setup({enabled:false});x.click();await tick();assert.equal(x.native(),1);assert.equal(x.calls.length,0);assert.equal(x.consent,null);x.close();
});
test('PR45 basic fallback retains Pokhara corrections, eight Nepali fixes and native score',async()=>{
 const x=setup({enabled:false});x.edit(pokhara.answer);x.click();await tick();
 const corrected=x.summary().querySelector('.wc-simple-corrected .wc-simple-text').textContent;
 for(const phrase of ['Have you ever visited','mountains touch','Pokhara is','beautiful cities','many tourists come','biggest advantages','make people feel','Tourism also gives','local people','Pokhara has','roads become','hotels are','tourists throw','which makes','In the rainy season','traveling becomes','mountains are','places do not','a wonderful place','it needs','everyone works','can become'])assert.ok(corrected.includes(phrase),phrase);
 assert.match(x.summary().textContent,/60\/100/);assert.equal(x.summary().querySelectorAll('.wc-simple-fixes li').length,8);
 for(const item of x.summary().querySelectorAll('.wc-simple-fixes li small'))assert.match(item.textContent,/[\u0900-\u097f]/u);
 assert.equal(x.calls.length,0);assert.equal(x.native(),1);x.close();
});
test('provider limit message is visible with no fake score or correction',async()=>{
 const x=setup({respond:async()=>({status:'unavailable',code:'busy',message:'Wait a minute.',message_ne:'एक मिनेट पर्खनुहोस्।'})});
 x.consent.checked=true;x.click();await tick();assert.match(x.summary().textContent,/Wait a minute/);assert.match(x.summary().textContent,/एक मिनेट/);
 assert.equal(x.summary().querySelector('.wc-simple-score'),null);assert.equal(x.native(),0);assert.equal(x.d.getElementById('writeCheck').disabled,false);x.close();
});
test('edited text never receives an old AI response',async()=>{
 let resolve;const pending=new Promise(r=>{resolve=r;});const x=setup({respond:()=>pending});x.consent.checked=true;x.click();x.edit('I am writing a different answer.');resolve({status:'ok',review});await tick();
 assert.equal(x.summary().hidden,true);assert.equal(x.d.getElementById('writeCheck').disabled,false);x.close();
});
test('topic changes discard an outstanding response and do not automatically send writing',async()=>{
 let resolve;const pending=new Promise(r=>{resolve=r;});const x=setup({respond:()=>pending});x.consent.checked=true;x.click();
 x.d.getElementById('topicEn').textContent='Describe your school.';await tick();resolve({status:'ok',review});await tick();
 assert.equal(x.summary().hidden,true);assert.equal(x.calls.length,1);x.close();
});
test('repeated checks reuse only the current page memory result',async()=>{
 const x=setup();x.consent.checked=true;x.click();await tick();x.click();await tick();assert.equal(x.calls.length,1);assert.match(x.summary().textContent,/81\/100/);assert.equal(x.w.localStorage.length,0);x.close();
});
test('model HTML and scripts render as literal text with a working Copy button',async()=>{
 const malicious={...review,corrected:'<img src=x onerror="alert(1)"> I wake up early.',feedback:[]};
 const x=setup({respond:async()=>({status:'ok',review:malicious})});let copied;
 Object.defineProperty(x.w.navigator,'clipboard',{value:{writeText:async value=>{copied=value;}}});
 x.consent.checked=true;x.click();await tick();assert.equal(x.summary().querySelector('img'),null);assert.match(x.summary().textContent,/<img/);
 x.d.querySelector('.wc-simple-copy').click();await tick();assert.equal(copied,malicious.corrected);x.close();
});
