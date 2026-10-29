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
