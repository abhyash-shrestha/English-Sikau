import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import vm from 'node:vm';

const root=new URL('../',import.meta.url);
const pages=readdirSync(root).filter(p=>p.endsWith('.html'));
const integrity='sha384-phNZum4lHcy1EBX3U1LcBErZWMZklS/yJ2NzJIk5VOJWDDYwavQurpyRdrH2uHZj';
const urls=['https://cdn.jsdelivr.net/npm/appwrite@17.0.0/dist/iife/sdk.js',
 'https://unpkg.com/appwrite@17.0.0/dist/iife/sdk.js'];
const read=p=>readFileSync(new URL(p,root),'utf8');

function sdkLoader(source) {
 const found=/async function (loadSDK|loadSdk|initSdk)\(\)/.exec(source);
 assert.ok(found,'SDK loader exists');
 const start=found.index,open=source.indexOf('{',start);
 let depth=1,end=open+1;
 // These small loader functions contain no braces inside their string literals.
 while(depth&&end<source.length){if(source[end]==='{')depth++;if(source[end]==='}')depth--;end++;}
 assert.equal(depth,0);
 return {name:found[1],code:source.slice(start,end)};
}
async function runLoader(source,failCount=0) {
 const inserted=[];
 const sdk={Client:class{setEndpoint(x){this.endpoint=x;return this}setProject(x){this.project=x;return this}},
  Account:class{constructor(c){this.client=c}},Functions:class{constructor(c){this.client=c}},ID:{unique:()=> 'test'}};
 const context={window:{},CFG:{endpoint:'https://test.invalid/v1',project:'test-project'},
  ENDPOINT:'https://test.invalid/v1',PROJECT:'test-project',
  document:{createElement:()=>({}),head:{appendChild:add,append:add}}};
 function add(script){inserted.push(script);queueMicrotask(()=>{
  if(inserted.length<=failCount)script.onerror(Error('Simulated browser integrity/network failure'));
  else{context.window.Appwrite=sdk;script.onload();}
 });}
 vm.createContext(context);
 const loader=sdkLoader(source);
 vm.runInContext(`let account,functions,ID; ${loader.code}; globalThis.run=${loader.name};
 globalThis.clients=()=>({account,functions});`,context);
 return {context,inserted,promise:context.run()};
}

test('every runnable page parses and uses the same pinned SDK integrity check',()=>{
 for(const page of pages){
  const source=read(page);
  const scripts=[...source.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
  for(const [,code] of scripts)new vm.Script(code,{filename:page});
  const loader=sdkLoader(source).code;
  assert.ok(loader.includes(integrity),page);
  for(const url of urls)assert.ok(loader.includes(url),page);
  assert.ok(loader.includes(".crossOrigin='anonymous'"),page);
  assert.ok(loader.includes(".referrerPolicy='no-referrer'"),page);
 }
});

test('all page loaders retain account and Function initialization when the first CDN fails',async()=>{
 for(const page of pages){
  const {context,inserted,promise}=await runLoader(read(page),1);
  await promise;
  assert.equal(inserted.length,2,page);
  inserted.forEach((s,i)=>{assert.equal(s.src,urls[i]);assert.equal(s.integrity,integrity);assert.equal(s.crossOrigin,'anonymous');});
  assert.equal(context.clients().account.client.project,'test-project');
  assert.equal(context.clients().functions.client.endpoint,'https://test.invalid/v1');
 }
});

test('SDK errors fail closed instead of initializing an unauthenticated client',async()=>{
 const {context,inserted,promise}=await runLoader(read('index.html'),2);
 await assert.rejects(promise,/SDK/);
 assert.equal(inserted.length,2);
 assert.equal(context.clients().account,undefined);
});

function recoveryContext(search,fail=false) {
 const source=read('index.html');
 const start=source.indexOf('// Keep recovery credentials');
 const end=source.indexOf('/* One accessible',start);
 const reset=source.split('\n').find(l=>l.startsWith("else if(mode==='reset')"));
 const calls=[];
 const location={href:'https://example.invalid/course/'+search,pathname:'/course/'};
 const history={state:{test:true},replaceState(state,title,path){calls.push({path,state});location.href='https://example.invalid'+path;}};
 const context={URL,location,history,mode:'reset',
  account:{async updateRecovery(...args){calls.push({recovery:args});if(fail)throw Error('Simulated temporary service failure');}},
  $:()=>({value:'test-only-password-value'}),show(){},showMsg(){}};
 vm.createContext(context);
 vm.runInContext(source.slice(start,end)+
  `globalThis.credential=()=>recoveryLink;globalThis.submit=async()=>{${reset.slice(5)}};`,context);
 return {context,calls,source};
}

test('recovery URLs are cleaned before SDK load and the original token still completes reset',async()=>{
 const {context,calls,source}=recoveryContext('?reset=1&userId=test-user&secret=test-token&keep=ok#section');
 assert.equal(calls[0].path,'/course/?reset=1&keep=ok#section');
 assert.ok(source.indexOf('// Keep recovery credentials')<source.indexOf('async function loadSDK'));
 await context.submit();
 assert.deepEqual(calls[1].recovery,['test-user','test-token','test-only-password-value']);
 assert.equal(context.credential(),null);
});

test('temporary reset failure preserves the in-memory token for retry; refresh asks for the email link',async()=>{
 const failed=recoveryContext('?reset=1&userId=test-user&secret=test-token',true);
 await assert.rejects(failed.context.submit(),/temporary/);
 assert.equal(failed.context.credential().secret,'test-token');
 const refreshed=recoveryContext('?reset=1');
 await assert.rejects(refreshed.context.submit(),/email again/);
 assert.equal(refreshed.calls.filter(c=>c.recovery).length,0);
});

test('both live pinned CDN files match the expected SHA-384 digest',
 {skip:process.env.CHECK_SDK_NETWORK!=='1'},async()=>{
  for(const url of urls){
   const response=await fetch(url,{signal:AbortSignal.timeout(20000)});
   assert.equal(response.status,200);
   assert.equal(response.headers.get('access-control-allow-origin'),'*');
   const bytes=Buffer.from(await response.arrayBuffer());
   assert.equal('sha384-'+createHash('sha384').update(bytes).digest('base64'),integrity);
  }
 });
