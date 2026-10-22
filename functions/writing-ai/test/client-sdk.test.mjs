import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import vm from 'node:vm';
const require=createRequire(import.meta.url);
const sdk=require(process.env.SIKAU_APPWRITE17_MODULE||'appwrite');
const html=readFileSync(new URL('../../../index.html',import.meta.url),'utf8');
const start=html.indexOf('function sikauCanUseWritingAI()');
const end=html.indexOf('\n};',html.indexOf('window.sikauWritingAI=async function',start))+3;
const code=html.slice(start,end);
function run({openedAccess=true,body,status=200,executionStatus='completed',capture,
 person={$id:'test-user',status:true,emailVerification:true,labels:['sikautestpaid','sikauaiapproved']}}={}){
 const calls=[],client=new sdk.Client().setEndpoint('https://example.invalid/v1').setProject('test-project');
 client.call=async(method,url,headers,payload)=>{
  calls.push({method,url:String(url),headers,payload});
  if(capture)return capture({method,url,headers,payload});
  return {status:executionStatus,responseStatusCode:status,responseBody:JSON.stringify(body??{status:'ok',review:{score:88,corrected:'I wake up early every day.',relevance:'on_topic',feedback:[]}})};
 };
 const context={window:{},CFG:{writingAI:'writing-test'},functions:new sdk.Functions(client),user:person,openedAccess,setTimeout,clearTimeout};
 vm.createContext(context);vm.runInContext(code,context);
 return {calls,configured:()=>context.window.sikauWritingAIConfigured,call:()=>context.window.sikauWritingAI({answer:'I wakes up early every day.',topicEn:'Describe your daily routine.',topicNe:'दिनचर्याबारे लेख्नुहोस्।'})};
}
test('the actual pinned Appwrite 17 SDK receives the correct Function path and body',async()=>{
 const x=run(),result=await x.call();assert.equal(result.status,'ok');
 assert.equal(x.calls[0].url,'https://example.invalid/v1/functions/writing-test/executions');
 assert.equal(x.calls[0].method,'post');assert.equal(x.calls[0].payload.async,false);assert.equal(x.calls[0].payload.path,'/');assert.equal(x.calls[0].payload.method,'POST');
 const data=JSON.parse(x.calls[0].payload.body);assert.equal(data.action,'writing-review');assert.equal(data.answer,'I wakes up early every day.');
});
test('client guard blocks a locked account before calling the actual SDK',async()=>{
 const x=run({openedAccess:false});await assert.rejects(x.call(),/not available/);assert.equal(x.calls.length,0);
});
test('pilot controls stay hidden for ordinary students and unverified accounts',async()=>{
 for(const labels of [[],['sikaupaid'],['sikautestpaid'],['sikauaiapproved'],['sikaupaid','sikauaiapproved']]){
  const x=run({person:{$id:'student',status:true,emailVerification:true,labels}});
  assert.equal(x.configured(),false);await assert.rejects(x.call(),/not available/);assert.equal(x.calls.length,0);
 }
 for(const person of [null,{status:false,emailVerification:true,labels:['sikautestpaid','sikauaiapproved']},{status:true,emailVerification:false,labels:['sikautestpaid','sikauaiapproved']}]){
  const x=run({person});assert.equal(x.configured(),false);await assert.rejects(x.call(),/not available/);assert.equal(x.calls.length,0);
 }
 assert.equal(run().configured(),true);
});
test('a completed 429 preserves safe bilingual fallback text through the real SDK',async()=>{
 const x=run({status:429,body:{status:'unavailable',code:'busy',message:'Wait a minute.',message_ne:'एक मिनेट पर्खनुहोस्।'}});
 const result=await x.call();assert.equal(result.status,'unavailable');assert.equal(result.code,'busy');assert.equal(result.message_ne,'एक मिनेट पर्खनुहोस्।');
});
test('failed execution or invalid result is never accepted as an AI success',async()=>{
 await assert.rejects(run({executionStatus:'failed'}).call(),/did not complete/);
 await assert.rejects(run({body:{status:'ok',review:{score:'fake',corrected:'something'}}}).call(),/invalid/);
});
