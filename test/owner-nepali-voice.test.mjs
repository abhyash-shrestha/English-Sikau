import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import speak from '../functions/neural-speech/src/main.js';

const originalFetch=globalThis.fetch;
const environment={};
for(const name of ['SPEECH_PROVIDER','SWAR_TTS_URL','SWAR_TTS_TOKEN','AZURE_SPEECH_KEY','GEMINI_API_KEY']){
 environment[name]=process.env[name];
}
test.after(()=>{
 globalThis.fetch=originalFetch;
 for(const [name,value] of Object.entries(environment)){
  if(value===undefined)delete process.env[name];else process.env[name]=value;
 }
});

function wav(){
 const b=Buffer.alloc(48);
 b.write('RIFF',0);b.writeUInt32LE(40,4);b.write('WAVEfmt ',8);
 b.writeUInt32LE(16,16);b.writeUInt16LE(1,20);b.writeUInt16LE(1,22);
 b.writeUInt32LE(24000,24);b.writeUInt32LE(48000,28);
 b.writeUInt16LE(2,32);b.writeUInt16LE(16,34);
 b.write('data',36);b.writeUInt32LE(4,40);
 return b;
}
function configure(){
 process.env.SPEECH_PROVIDER='swar';
 process.env.SWAR_TTS_URL='https://private-voice.example/synthesize';
 process.env.SWAR_TTS_TOKEN='test-secret-please-never-use';
 delete process.env.AZURE_SPEECH_KEY;
 delete process.env.GEMINI_API_KEY;
}
function req(lang='ne-NP',gender='female'){
 return {method:'POST',headers:{'x-appwrite-user-jwt':'test-jwt'},bodyJson:{text:'नमस्ते! म नेपाली बोल्छु।',lang,gender}};
}
async function execute(request){
 let value,status;
 await speak({req:request,res:{json(payload,code){value=payload;status=code;return payload;}}});
 return {value,status};
}

test('All Nepali selections use the SAME private owner voice; English is rejected by cloned backend',async()=>{
 configure();
 const calls=[];
 globalThis.fetch=async(url,opts)=>{
  calls.push({url:String(url),opts});
  if(String(url).endsWith('/account'))
   return {ok:true,json:async()=>({$id:'swar-owner-test',emailVerification:true,labels:['sikautestpaid']})};
  return {ok:true,headers:{get:()=> 'audio/wav'},arrayBuffer:async()=>wav()};
 };
 for(const gender of ['female','male']){
  const {value,status}=await execute(req('ne-NP',gender));
  assert.equal(status,200);
  assert.equal(value.status,'ok');
  assert.equal(value.engine,'swar-nepali');
  assert.equal(value.voice,'Owner Nepali Voice');
  assert.equal(value.mime,'audio/wav');
  assert.equal(Buffer.from(value.audioBase64,'base64').toString('ascii',0,4),'RIFF');
 }
 assert.equal(calls.filter(c=>c.url.includes('private-voice.example')).length,2);
 assert.ok(calls.every(c=>!c.url.includes('test-jwt')));
 assert.ok(calls.filter(c=>c.url.includes('private-voice.example')).every(c=>c.opts.headers.authorization==='Bearer test-secret-please-never-use'));
 const noEnglish=await execute(req('en-US','male'));
 assert.equal(noEnglish.status,422);
 assert.equal(calls.filter(c=>c.url.includes('private-voice.example')).length,2);
 assert.equal(JSON.stringify(noEnglish).includes('test-secret-please-never-use'),false);
});

test('Private voice rejects unsafe non-HTTPS hosting addresses',async()=>{
 configure();
 process.env.SWAR_TTS_URL='http://localhost:8080/tts';
 globalThis.fetch=async(url)=>{
  if(String(url).endsWith('/account'))
   return {ok:true,json:async()=>({$id:'swar-owner-test',emailVerification:true,labels:['sikautestpaid']})};
  throw Error('Unapproved host must never be called');
 };
 const {status,value}=await execute(req());
 assert.equal(status,503);
 assert.equal(value.status,'unavailable');
});

test('App voice bridge routes ALL Nepali to owner clone but English to existing speech engine',async()=>{
 const code=fs.readFileSync(new URL('../nepali-voice-bridge.js',import.meta.url),'utf8');
 const native=[],calls=[];
 const synth={
  getVoices(){return[];},cancel(){},addEventListener(){},
  speak(u){native.push({lang:u.lang,text:u.text});}
 };
 class Context{
  state='running';
  async resume(){}
  async decodeAudioData(){return {};}
  createBufferSource(){
   return {buffer:null,connect(){},start(){queueMicrotask(()=>this.onended?.());},stop(){}};
  }
  get destination(){return {};}
 }
 const parent={
  sikauNeuralSpeechConfigured:true,
  sikauOwnerNepaliVoiceConfigured:true,
  async sikauNeuralSpeech(data){
   calls.push(data);
   return {audioBase64:wav().toString('base64'),mime:'audio/wav',voice:'Owner Nepali Voice'};
  }
 };
 const win={
  parent,
  speechSynthesis:synth,AudioContext:Context,
  SpeechSynthesisUtterance:class{constructor(text){this.text=text;this.lang='';}},
  atob:s=>Buffer.from(s,'base64').toString('binary')
 };
 const roots={tr:{appendChild(){},querySelector(){return null},querySelectorAll(){return[]}},
  rd:{appendChild(){},querySelector(){return null},querySelectorAll(){return[]}}};
 const doc={body:{},defaultView:win,getElementById:k=>roots[k],
  createElement:()=>({style:{},setAttribute(){},textContent:''}),
  addEventListener(){}};
 vm.runInNewContext(code,vm.createContext({window:win,console,Uint8Array,Promise}),{timeout:2000});
 assert.equal(win.enhanceNepaliSpeechVoices(doc),true);
 assert.equal(win.__sikauNepaliVoice.ownerNepaliVoiceActive(),true);
 win.__sikauNepaliVoice.select('tr','female');
 synth.speak({lang:'ne-NP',text:'नमस्ते'});
 win.__sikauNepaliVoice.select('rd','male');
 synth.speak({lang:'ne-NP',text:'आज मौसम राम्रो छ।'});
 synth.speak({lang:'en-US',text:'Hello from the original English engine'});
 await new Promise(resolve=>setTimeout(resolve,15));
 assert.deepEqual(calls.map(x=>x.text),['नमस्ते','आज मौसम राम्रो छ।']);
 assert.deepEqual(native.map(x=>x.text),['Hello from the original English engine']);
});
