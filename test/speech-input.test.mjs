import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source=fs.readFileSync(new URL('../speech-input.js',import.meta.url),'utf8');
const app=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const flush=async()=>{for(let i=0;i<12;i++)await Promise.resolve();};
const row=(text,final=true)=>Object.assign([{transcript:text}],{isFinal:final});
function fixture({agent='Android Chrome',native=true,service=null,media=null}={}){
 const instances=[],timers=new Map(),tracks=[],nodes=[],listeners={};
 let time=0,serial=0;
 class Native{
  constructor(){instances.push(this);}
  start(){this.onstart?.();}
  stop(){this.stopped=true;}
  abort(){this.aborted=true;this.onend?.();}
 }
 const root={hidden:false,style:{},querySelector(selector){
  return selector==='.sikau-microphone-status'?nodes[0]||null:null;
 },appendChild(node){nodes.push(node);}};
 const doc={body:{},defaultView:null,hidden:false,
  getElementById(id){return id==='sp'?root:null;},
  createElement(){return {style:{},setAttribute(){}};},
  addEventListener(type,fn){listeners[type]=fn;}
 };
 const win={EventTarget,Event,DOMException,Blob,Uint8Array,btoa,
  navigator:{userAgent:agent,...(media?{mediaDevices:{getUserMedia:media.getUserMedia}}:{})},
  document:doc,addEventListener(type,fn){listeners['window:'+type]=fn;},
  setTimeout(fn,delay){const id=++serial;timers.set(id,{fn,at:time+delay});return id;},
  clearTimeout(id){timers.delete(id);},
  ...(native?{SpeechRecognition:Native,webkitSpeechRecognition:Native}:{}),
  ...(media?{MediaRecorder:media.Recorder}:{})
 };
 win.parent=service||win;doc.defaultView=win;
 const context={window:win,console,Uint8Array};
 // An outer-page load exposes the installer; the inner HEAD auto-installs.
 if(service)win.parent=win;
 vm.runInNewContext(source,vm.createContext(context));
 win.parent=service||win;
 assert.equal(win.enhanceSpeechInput(doc),true);
 return {win,doc,instances,nodes,tracks,listeners,timers,
  advance(ms){time+=ms;for(const [id,timer] of [...timers])if(timer.at<=time){timers.delete(id);timer.fn();}},
  recognition(){return new win.SpeechRecognition();}
 };
}

test('Android evolving, replayed and cumulative final events commit one transcript',()=>{
 const b=fixture(),r=b.recognition(),captured=[],events=[];
 r.onresult=e=>captured.push(e.results[0][0].transcript);
 r.addEventListener('result',e=>events.push(e.results.item(0).item(0).transcript));
 r.interimResults=true;r.continuous=true;r.start();
 const native=b.instances[0];
 assert.equal(native.interimResults,false);assert.equal(native.continuous,false);
 native.onresult({resultIndex:0,results:[row('I would')]});
 native.onresult({resultIndex:0,results:[row('I would like tea')]});
 native.onresult({resultIndex:1,results:[row('I would'),row('I would like tea'),row('I would like tea')]});
 assert.equal(captured.length,0);
 native.onend();native.onend();
 assert.deepEqual(captured,['I would like tea']);assert.deepEqual(events,captured);
});

test('legitimate repeated words inside a sentence remain unchanged in either language',()=>{
 for(const text of ['It is very very good.','I knew that that happened.','यो धेरै धेरै राम्रो छ।']){
  const b=fixture(),r=b.recognition();let captured;
  r.onresult=e=>captured=e.results[0][0].transcript;r.start();
  b.instances[0].onresult({results:[row(text)]});b.instances[0].onend();
  assert.equal(captured,text);
 }
});

test('Stop accepts the final response once and never automatically restarts',()=>{
 const b=fixture(),r=b.recognition(),captured=[];let ends=0;
 r.onresult=e=>captured.push(e.results[0][0].transcript);r.onend=()=>ends++;
 r.start();r.stop();assert.equal(b.instances[0].stopped,true);
 b.instances[0].onresult({results:[row('म अंग्रेजी सिक्दै छु।')]});b.instances[0].onend();b.advance(35000);
 assert.deepEqual(captured,['म अंग्रेजी सिक्दै छु।']);assert.equal(ends,1);assert.equal(b.instances.length,1);
});

test('aborted sessions and late callbacks cannot append or replace text',()=>{
 const b=fixture(),r=b.recognition(),captured=[];
 r.onresult=e=>captured.push(e.results[0][0].transcript);r.start();const old=b.instances[0];
 old.onresult({results:[row('Do not keep this')]});r.abort();r.start();
 old.onresult({results:[row('Late old response')]});old.onend();
 b.instances[1].onresult({results:[row('Keep this')]});b.instances[1].onend();
 assert.deepEqual(captured,['Keep this']);
});

test('permission denial is reported correctly, then the microphone can be retried',()=>{
 const b=fixture(),r=b.recognition(),errors=[];r.onerror=e=>errors.push(e.error);r.start();
 b.instances[0].onerror({error:'not-allowed'});b.instances[0].onend();
 assert.deepEqual(errors,['not-allowed']);assert.match(b.nodes[0].textContent,/permission/);
 r.start();assert.equal(b.instances.length,2);
});

test('iPhone requests ne-NP and rejects an English guess as Nepali recognition',()=>{
 const b=fixture({agent:'iPhone Safari'}),r=b.recognition();let captured=false;
 r.lang='ne-NP';r.onresult=()=>captured=true;r.start();
 assert.equal(b.instances[0].lang,'ne-NP');
 b.instances[0].onresult({results:[row('My English guess')]});b.instances[0].onend();
 assert.equal(captured,false);assert.match(b.nodes[0].textContent,/does not support Nepali/);
});

test('starting a second microphone or leaving the tab aborts the old session',()=>{
 const b=fixture(),one=b.recognition(),two=b.recognition();one.start();two.start();
 assert.equal(b.instances[0].aborted,true);
 b.listeners.click({target:{closest:()=>({})}});
 assert.equal(b.instances[1].aborted,true);assert.equal(b.timers.size,0);
});

test('unavailable native speech never leaves the caller stuck in listening state',()=>{
 const b=fixture({native:false}),r=b.recognition();let ends=0;
 r.onend=()=>ends++;r.start();r.start();assert.equal(ends,2);
 assert.match(b.nodes[0].textContent,/unavailable/);
});

test('iPhone cloud fallback records MP4, keeps Nepali, and releases the microphone',async()=>{
 const stops=[],recorders=[],requests=[];
 const stream={getTracks:()=>[{stop(){stops.push(true);}}]};
 class Recorder{
  static isTypeSupported(type){return type==='audio/mp4';}
  constructor(stream,options){this.mimeType=options.mimeType;this.state='inactive';recorders.push(this);}
  start(){this.state='recording';}
  stop(){this.state='inactive';this.ondataavailable({data:new Blob([new Uint8Array(48)],{type:this.mimeType})});void this.onstop();}
 }
 const service={sikauTranscriptionAvailable:()=>true,async sikauTranscribeSpeech(input){requests.push(input);return {text:'मलाई अंग्रेजी सिक्न मन छ।'};}};
 const b=fixture({agent:'iPhone Safari',service,media:{Recorder,getUserMedia:async()=>stream}});
 const r=b.recognition();let text;r.lang='ne-NP';r.onresult=e=>text=e.results[0][0].transcript;
 r.start();await flush();r.stop();await flush();
 assert.equal(b.instances.length,0);assert.equal(recorders[0].mimeType,'audio/mp4');
 assert.equal(requests[0].lang,'ne-NP');assert.equal(requests[0].mime,'audio/mp4');
 assert.equal(text,'मलाई अंग्रेजी सिक्न मन छ।');assert.equal(stops.length,1);
});

test('cancellation while microphone permission is pending releases the late stream',async()=>{
 let grant;const stops=[];
 const service={sikauTranscriptionAvailable:()=>true,sikauTranscribeSpeech(){throw Error('must not upload');}};
 const b=fixture({agent:'iPhone Safari',service,media:{Recorder:class{},getUserMedia:()=>new Promise(r=>grant=r)}});
 const r=b.recognition();r.lang='ne-NP';r.start();r.abort();
 grant({getTracks:()=>[{stop(){stops.push(true);}}]});await flush();
 assert.equal(stops.length,1);assert.equal(b.timers.size,0);
});

test('a recorder error releases audio tracks and cannot upload a delayed recording',async()=>{
 let recorder;const stops=[],uploads=[];
 class Recorder{
  static isTypeSupported(){return true;}
  constructor(){recorder=this;this.mimeType='audio/mp4';}
  start(){this.state='recording';}
 }
 const service={sikauTranscriptionAvailable:()=>true,sikauTranscribeSpeech(data){uploads.push(data);return Promise.resolve({text:'must not appear'});}};
 const b=fixture({agent:'iPhone Safari',service,media:{Recorder,getUserMedia:async()=>({getTracks:()=>[{stop(){stops.push(true);}}]})}});
 const r=b.recognition();r.lang='ne-NP';let ends=0;r.onend=()=>ends++;
 r.start();await flush();
 recorder.ondataavailable({data:new Blob([new Uint8Array(48)],{type:'audio/mp4'})});
 recorder.onerror();await recorder.onstop();await flush();
 assert.equal(ends,1);assert.equal(stops.length,1);assert.equal(uploads.length,0);
 assert.equal(b.timers.size,0);
});

test('the adapter is installed in srcdoc HEAD before native constructors are captured',()=>{
 assert.match(app,/head\+noOldLessonFlash\+earlyMicrophone/);
 assert.match(app,/speech-input\.js\?v=20261030-platform-audio-r1/);
 assert.match(app,/enhanceSpeechInput\?\.\(doc\)/);
 assert.ok(app.includes('speechAI:null'),'unconfigured providers stay disabled');
});
