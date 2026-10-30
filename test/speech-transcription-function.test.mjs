import test from 'node:test';
import assert from 'node:assert/strict';
import speech from '../functions/neural-speech/src/main.js';

const fetchBefore=globalThis.fetch;
const envKeys=['GROQ_API_KEY','SPEECH_TRANSCRIPTION_ENABLED','AZURE_SPEECH_KEY','AZURE_SPEECH_REGION','GEMINI_API_KEY'];
const envBefore=Object.fromEntries(envKeys.map(key=>[key,process.env[key]]));
test.after(()=>{
 globalThis.fetch=fetchBefore;
 for(const key of envKeys){if(envBefore[key]===undefined)delete process.env[key];else process.env[key]=envBefore[key];}
});
let serial=0;
function fixture({verified=true,labels=['sikautestpaid'],status=200,duration=5,text='म अंग्रेजी सिक्दै छु।'}={}){
 const calls=[],account='speech-test-'+(++serial);
 globalThis.fetch=async(url,options)=>{
  calls.push({url:String(url),options});
  if(String(url).endsWith('/account'))return {ok:true,json:async()=>({$id:account,emailVerification:verified,labels})};
  if(String(url).includes('/functions/'))return {ok:true,json:async()=>({status:'completed',responseStatusCode:200,responseBody:'{}'})};
  return {ok:status===200,status,json:async()=>({text,duration})};
 };
 const result={};
 const res={json(data,status){result.data=data;result.status=status;return data;}};
 const req={method:'POST',headers:{'x-appwrite-user-jwt':'test-only'},bodyJson:{}};
 return {calls,result,async run(input){req.bodyJson=input;await speech({req,res});return result;}};
}
function recording(mime='audio/mp4'){
 const bytes=Buffer.alloc(64);
 if(mime==='audio/mp4')bytes.write('ftyp',4);
 else if(mime.startsWith('audio/webm'))Buffer.from([0x1a,0x45,0xdf,0xa3]).copy(bytes);
 else if(mime==='audio/ogg')bytes.write('OggS');
 return {action:'transcribe',lang:'ne-NP',mime,audioBase64:bytes.toString('base64')};
}
test('capabilities reveal readiness, never keys, and still require verified membership',async()=>{
 process.env.GROQ_API_KEY='private-groq-test-key';process.env.SPEECH_TRANSCRIPTION_ENABLED='1';
 process.env.AZURE_SPEECH_KEY='private-azure-test-key';process.env.AZURE_SPEECH_REGION='eastus';
 const b=fixture();await b.run({action:'capabilities'});
 assert.equal(b.result.status,200);assert.equal(b.result.data.transcription,true);assert.equal(b.result.data.tts,true);
 assert.ok(!JSON.stringify(b.result).includes('private-'));
 const unverified=fixture({verified:false});await unverified.run({action:'capabilities'});
 assert.equal(unverified.result.status,403);
 const inactive=fixture({labels:[]});await inactive.run({action:'capabilities'});
 assert.equal(inactive.result.status,403);
});
test('MP4 from iPhone and WebM from Android keep Nepali in transcription requests',async()=>{
 process.env.GROQ_API_KEY='private-groq-test-key';process.env.SPEECH_TRANSCRIPTION_ENABLED='1';
 for(const mime of ['audio/mp4','audio/webm;codecs=opus','audio/ogg']){
  const b=fixture();await b.run(recording(mime));
  assert.equal(b.result.status,200);assert.equal(b.result.data.text,'म अंग्रेजी सिक्दै छु।');
  const request=b.calls.at(-1);
  assert.equal(request.url,'https://api.groq.com/openai/v1/audio/transcriptions');
  assert.equal(request.options.body.get('language'),'ne');
  assert.equal(request.options.body.get('model'),'whisper-large-v3-turbo');
  assert.equal(request.options.body.get('response_format'),'verbose_json');
  assert.equal(request.options.body.get('file').type,mime.split(';')[0]);
  assert.ok(!JSON.stringify(b.result).includes('private-groq'));
 }
});
test('transcription needs explicit activation even if an existing Groq key is present',async()=>{
 delete process.env.SPEECH_TRANSCRIPTION_ENABLED;
 const b=fixture();await b.run(recording());
 assert.equal(b.result.status,503);assert.equal(b.calls.length,1);
});
test('invalid language, MIME, malformed audio and oversized recordings never reach provider',async()=>{
 process.env.SPEECH_TRANSCRIPTION_ENABLED='1';
 const invalid=[
  {...recording(),lang:'hi-IN'},
  {...recording(),mime:'text/html'},
  {...recording(),audioBase64:'not base64!'},
  {...recording(),audioBase64:Buffer.from('not a real audio container'.repeat(4)).toString('base64')},
  {...recording(),audioBase64:'A'.repeat(1600004)}
 ];
 for(const input of invalid){const b=fixture();await b.run(input);assert.equal(b.result.status,400);assert.equal(b.calls.length,1);}
});
test('provider errors or an overlong recording return a safe failure without transcript',async()=>{
 for(const options of [{status:429},{duration:45},{duration:null}]){
  const b=fixture(options);await b.run(recording());
  assert.ok(b.result.status>=400);assert.equal(b.result.data.text,undefined);
 }
});
test('the app can use one configured TTS voice without a retired gender parameter',async()=>{
 const b=fixture();
 globalThis.fetch=async(url,options)=>{
  if(String(url).endsWith('/account'))return {ok:true,json:async()=>({$id:'single-voice-test',emailVerification:true,labels:['sikautestpaid']})};
  assert.match(options.body,/voice name="ne-NP-HemkalaNeural"/);
  return {ok:true,arrayBuffer:async()=>Buffer.from('ID3-test-audio')};
 };
 await b.run({text:'नमस्ते',lang:'ne-NP'});
 assert.equal(b.result.status,200);assert.equal(b.result.data.voice,'ne-NP-HemkalaNeural');
});
