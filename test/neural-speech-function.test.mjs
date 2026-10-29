import test from 'node:test';
import assert from 'node:assert/strict';
import speak from '../functions/neural-speech/src/main.js';

function response(){
 const result={status:0,data:null};
 return {result,res:{json(body,status){result.status=status;result.data=body;return body;}}};
}
function request(text='नमस्कार',lang='ne-NP',gender='male'){
 return {method:'POST',headers:{'x-appwrite-user-jwt':'test-only-jwt'},
  bodyJson:{text,lang,gender}};
}
const originalFetch=globalThis.fetch;
const oldKey=process.env.AZURE_SPEECH_KEY,oldRegion=process.env.AZURE_SPEECH_REGION;
function restore(){
 globalThis.fetch=originalFetch;
 if(oldKey===undefined)delete process.env.AZURE_SPEECH_KEY;
 else process.env.AZURE_SPEECH_KEY=oldKey;
 if(oldRegion===undefined)delete process.env.AZURE_SPEECH_REGION;
 else process.env.AZURE_SPEECH_REGION=oldRegion;
}
test.after(restore);
const userResponse={ok:true,async json(){return{$id:'verifiedtestuser',emailVerification:true,
 labels:['sikautestpaid']}}};
function mockFetch(calls){
 globalThis.fetch=async(url,options)=>{
  calls.push({url:String(url),options});
  if(String(url).endsWith('/account'))return userResponse;
  return {ok:true,arrayBuffer:async()=>new Uint8Array([0x49,0x44,0x33,0x04,0x00]).buffer};
 };
}
test('Rejects anonymous or unverified speech requests',async()=>{
 const {res,result}=response();
 await speak({req:{method:'POST',headers:{},bodyJson:{text:'Hello',lang:'en-US',gender:'female'}},res});
 assert.equal(result.status,401);
});
test('Correctly selects neural female/male for Nepali and English',async()=>{
 process.env.AZURE_SPEECH_KEY='test-key-not-real';
 process.env.AZURE_SPEECH_REGION='eastus';
 const cases=[
  ['ne-NP','female','ne-NP-HemkalaNeural'],
  ['ne-NP','male','ne-NP-SagarNeural'],
  ['en-US','female','en-US-AvaNeural'],
  ['en-US','male','en-US-AndrewNeural']
 ];
 for(const [lang,gender,expected] of cases){
  const calls=[];mockFetch(calls);
  const {res,result}=response();
  await speak({req:request('A & B <C>',lang,gender),res});
  assert.equal(result.status,200);
  assert.equal(result.data.status,'ok');
  assert.equal(result.data.voice,expected);
  assert.equal(result.data.mime,'audio/mpeg');
  assert.equal(result.data.audioBase64,Buffer.from([0x49,0x44,0x33,0x04,0x00]).toString('base64'));
  assert.equal(calls.length,2);
  assert.match(calls[1].options.body,/<voice name="[^"]+">A &amp; B &lt;C&gt;<\/voice>/);
  assert.equal(calls[1].options.headers['Ocp-Apim-Subscription-Key'],'test-key-not-real');
  assert.ok(!JSON.stringify(result.data).includes('test-key-not-real'));
 }
});
test('Missing Azure key cannot synthesize or disclose credentials',async()=>{
 delete process.env.AZURE_SPEECH_KEY;
 const calls=[];mockFetch(calls);
 const {res,result}=response();
 await speak({req:request(),res});
 assert.equal(result.status,503);
 assert.equal(result.data.status,'unavailable');
 assert.equal(calls.length,1);
});
test('Rejects oversized requests without calling Azure',async()=>{
 process.env.AZURE_SPEECH_KEY='test-key-not-real';
 process.env.AZURE_SPEECH_REGION='eastus';
 const calls=[];mockFetch(calls);
 const {res,result}=response();
 await speak({req:request('अ'.repeat(551)),res});
 assert.equal(result.status,400);
 assert.equal(calls.length,1);
});


test('Free-tier Gemini neural TTS path returns valid WAV, with no API key leakage',async()=>{
 const oldGemini=process.env.GEMINI_API_KEY,oldProvider=process.env.SPEECH_PROVIDER,oldModel=process.env.GEMINI_TTS_MODEL;
 process.env.GEMINI_API_KEY='gemini-test-secret';
 process.env.SPEECH_PROVIDER='gemini';
 process.env.GEMINI_TTS_MODEL='gemini-2.5-flash-preview-tts';
 try{
  const calls=[];
  globalThis.fetch=async(url,options)=>{
   calls.push({url:String(url),options});
   if(String(url).endsWith('/account'))return userResponse;
   return {ok:true,json:async()=>({candidates:[{content:{parts:[{
    inlineData:{mimeType:'audio/L16;rate=24000',data:Buffer.from([1,0,2,0,3,0,4,0]).toString('base64')}
   }]}}]})};
  };
  const {res,result}=response();
  await speak({req:request('नमस्कार','ne-NP','male'),res});
  assert.equal(result.status,200);
  assert.equal(result.data.mime,'audio/wav');
  assert.equal(result.data.voice,'Charon');
  assert.equal(result.data.engine,'gemini-neural');
  const file=Buffer.from(result.data.audioBase64,'base64');
  assert.equal(file.toString('ascii',0,4),'RIFF');
  assert.equal(file.toString('ascii',8,12),'WAVE');
  assert.equal(file.readUInt32LE(24),24000);
  assert.equal(file.length,52);
  assert.equal(calls.length,2);
  assert.equal(calls[1].options.headers['x-goog-api-key'],'gemini-test-secret');
  assert.ok(!JSON.stringify(result.data).includes('gemini-test-secret'));
 }finally{
  if(oldGemini===undefined)delete process.env.GEMINI_API_KEY;
  else process.env.GEMINI_API_KEY=oldGemini;
  if(oldProvider===undefined)delete process.env.SPEECH_PROVIDER;
  else process.env.SPEECH_PROVIDER=oldProvider;
  if(oldModel===undefined)delete process.env.GEMINI_TTS_MODEL;
  else process.env.GEMINI_TTS_MODEL=oldModel;
 }
});


test('Gemini 3.8 sends exact transcript with separate natural delivery metadata and no spoken instructions',async()=>{
 const beforeKey=process.env.GEMINI_API_KEY,beforeProvider=process.env.SPEECH_PROVIDER,beforeModel=process.env.GEMINI_TTS_MODEL;
 process.env.GEMINI_API_KEY='non-production-test-key';
 process.env.SPEECH_PROVIDER='gemini';
 delete process.env.GEMINI_TTS_MODEL;
 const pcm=Buffer.from([1,0,2,0]);
 const wav=Buffer.alloc(44+pcm.length);
 wav.write('RIFF',0);wav.writeUInt32LE(36+pcm.length,4);
 wav.write('WAVEfmt ',8);wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);
 wav.writeUInt16LE(1,22);wav.writeUInt32LE(24000,24);wav.writeUInt32LE(48000,28);
 wav.writeUInt16LE(2,32);wav.writeUInt16LE(16,34);
 wav.write('data',36);wav.writeUInt32LE(pcm.length,40);pcm.copy(wav,44);
 try{
  const requests=[];
  globalThis.fetch=async(url,options)=>{
   requests.push({url:String(url),options});
   if(String(url).endsWith('/account'))return userResponse;
   return {ok:true,json:async()=>({steps:[{type:'model_output',content:[{
    type:'audio',mime_type:'audio/wav',data:wav.toString('base64')
   }]}]})};
  };
  const {res,result}=response();
  await speak({req:request('म आज काठमाडौँ जाँदैछु।','ne-NP','female'),res});
  assert.equal(result.status,200);
  assert.equal(result.data.voice,'Kore');
  assert.equal(result.data.model,'gemini-3.8-flash-tts');
  const output=Buffer.from(result.data.audioBase64,'base64');
  assert.deepEqual(output,wav,'Do not wrap Gemini WAV data in another WAV header');
  assert.match(requests[1].url,/\/v1beta\/interactions$/);
  const input=JSON.parse(requests[1].options.body);
  assert.equal(input.model,'gemini-3.8-flash-tts');
  assert.equal(input.input[0].content[0].text,'म आज काठमाडौँ जाँदैछु।');
  assert.match(input.input[0].content[0].annotations[0].style,/Nepal/);
  assert.equal(input.generation_config.speech_config[0].voice,'Kore');
 }finally{
  if(beforeKey===undefined)delete process.env.GEMINI_API_KEY;else process.env.GEMINI_API_KEY=beforeKey;
  if(beforeProvider===undefined)delete process.env.SPEECH_PROVIDER;else process.env.SPEECH_PROVIDER=beforeProvider;
  if(beforeModel===undefined)delete process.env.GEMINI_TTS_MODEL;else process.env.GEMINI_TTS_MODEL=beforeModel;
 }
});

test('Gemini unsupported model environment setting cannot select an arbitrary URL or model',async()=>{
 const beforeModel=process.env.GEMINI_TTS_MODEL,beforeProvider=process.env.SPEECH_PROVIDER,beforeKey=process.env.GEMINI_API_KEY;
 process.env.GEMINI_TTS_MODEL='../../unsafe';
 process.env.SPEECH_PROVIDER='gemini';
 process.env.GEMINI_API_KEY='non-production-test-key';
 try{
  const calls=[];
  globalThis.fetch=async(url,options)=>{
   calls.push(String(url));
   if(String(url).endsWith('/account'))return userResponse;
   return {ok:true,json:async()=>({steps:[{type:'model_output',content:[{
    type:'audio',mime_type:'audio/wav',data:(()=>{
      const data=Buffer.alloc(48);data.write('RIFF',0);data.writeUInt32LE(40,4);
      data.write('WAVEfmt ',8);data.writeUInt32LE(16,16);
      data.writeUInt16LE(1,20);data.writeUInt16LE(1,22);
      data.writeUInt32LE(24000,24);data.writeUInt32LE(48000,28);
      data.writeUInt16LE(2,32);data.writeUInt16LE(16,34);
      data.write('data',36);data.writeUInt32LE(4,40);
      return data.toString('base64');
     })()
   }]}]})};
  };
  const {res,result}=response();
  await speak({req:request('Hello.','en-US','male'),res});
  assert.equal(result.status,200);
  assert.match(calls[1],/\/v1beta\/interactions$/);
 }finally{
  if(beforeModel===undefined)delete process.env.GEMINI_TTS_MODEL;else process.env.GEMINI_TTS_MODEL=beforeModel;
  if(beforeProvider===undefined)delete process.env.SPEECH_PROVIDER;else process.env.SPEECH_PROVIDER=beforeProvider;
  if(beforeKey===undefined)delete process.env.GEMINI_API_KEY;else process.env.GEMINI_API_KEY=beforeKey;
 }
});
