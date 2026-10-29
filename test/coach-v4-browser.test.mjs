import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const executable=['/usr/bin/google-chrome','/usr/bin/chromium','/usr/bin/chromium-browser'].find(p=>fs.existsSync(p));
const harness="<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><style>.sikau-convo-stage{padding:10px}.sikau-chat-message{padding:5px}</style></head><body><section id=\"stage\" class=\"sikau-convo-stage\"></section><div id=\"smoke-status\">running</div>\n<script>document.documentElement.dataset.sikauDisplayLanguage='en';window.__sikauLanguageDisplay={getMode:()=>document.documentElement.dataset.sikauDisplayLanguage,romanize:()=> 'NepaliRoman'};</script>\n<script src=\"/coach-v4-translations.js\"></script><script src=\"/coach-v4-adapter.js\"></script>\n<script>\nconst stage=document.getElementById('stage'),scene={id:'coffee',title:'Order at a café',emoji:'☕',partner:'Barista',ne:'क्याफेमा अर्डर',place:'Café · क्याफे'};\nwindow.sikauCoachV4.mount({doc:document,stage,scene,userId:'testUserV4Smoke123',firstName:'Tester',onBack:()=>{}});\nfunction fail(e){document.getElementById('smoke-status').textContent='FAIL: '+e.message}\nsetTimeout(()=>{\n try{\n  const options=()=>Array.from(stage.querySelectorAll('.sikau-chat-option'));\n  const messages=()=>stage.querySelectorAll('.sikau-chat-message');\n  if(options().length!==3)throw Error('Expected 3 starting options, got '+options().length);\n  if(messages().length!==1)throw Error('Expected one opening message');\n  if(stage.querySelector('.sikau-v4-ne'))throw Error('English-only mode showed Nepali');\n  options()[0].click();\n  if(messages().length<3)throw Error('Selecting a choice did not advance conversation');\n  if(!stage.textContent.includes('coffee'))throw Error('Missing selected coffee topic');\n  if(!localStorage.getItem('english-sikau-coach-v4-draft:testUserV4Smoke123'))throw Error('Missing per-account conversation draft');\n  stage.querySelector('.sikau-v4-actions button').click();\n  if(messages().length!==1)throw Error('Undo did not restore opening turn');\n  document.documentElement.dataset.sikauDisplayLanguage='en-ne';\n  setTimeout(()=>{\n   try{\n    if(!stage.querySelector('.sikau-v4-ne'))throw Error('Nepali display missing translated opening');\n    document.documentElement.dataset.sikauDisplayLanguage='en-roman';\n    setTimeout(()=>{\n     try{\n      if(!stage.querySelector('.sikau-v4-roman'))throw Error('Roman mode missing roman line');\n      if(stage.querySelector('.sikau-v4-ne'))throw Error('Roman mode exposed Devanagari');\n      document.documentElement.dataset.sikauDisplayLanguage='all';\n      setTimeout(()=>{\n       try{\n        if(!stage.querySelector('.sikau-v4-ne')||!stage.querySelector('.sikau-v4-roman'))throw Error('Combined mode missing translation');\n        document.getElementById('smoke-status').textContent='PASS';\n       }catch(e){fail(e)}\n      },150);\n     }catch(e){fail(e)}\n    },150);\n   }catch(e){fail(e)}\n  },150);\n }catch(e){fail(e)}\n},1200);\n</script></body></html>";
test('Browser smoke: V4 cafe choice, undo, account draft and four language modes',async t=>{
 if(!executable){t.skip('Chromium not installed on runner');return}
 const server=http.createServer((req,res)=>{
  if(req.url==='/harness'){res.setHeader('Content-Type','text/html;charset=utf-8');res.end(harness);return}
  const files=new Set(['/coach-v4-approved-lab.html','/coach-v4-adapter.js','/coach-v4-translations.js']);
  const name=String(req.url||'').split('?')[0];
  if(!files.has(name)){res.writeHead(404);res.end('Not found');return}
  const filename=path.join(root,name.slice(1));
  res.setHeader('Content-Type',name.endsWith('.html')?'text/html; charset=utf-8':'text/javascript; charset=utf-8');
  res.end(fs.readFileSync(filename));
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 try{
  const port=server.address().port;
  const result=await new Promise((resolve,reject)=>{
   const proc=spawn(executable,['--headless','--no-sandbox','--disable-gpu',
     '--disable-dev-shm-usage','--disable-background-networking','--no-zygote','--disable-features=MediaRouter','--virtual-time-budget=6000',
     '--dump-dom','http://127.0.0.1:'+port+'/harness'],{stdio:['ignore','pipe','pipe']});
   let out='',err='';
   proc.stdout.on('data',d=>{out+=d.toString()});
   proc.stderr.on('data',d=>{err+=d.toString()});
   const timer=setTimeout(()=>{proc.kill('SIGKILL')},35000);
   proc.on('error',reject);
   proc.on('close',(code)=>{clearTimeout(timer);resolve({code,out,err})});
  });
  assert.equal(result.code,0,result.err.slice(-1500));
  const match=result.out.match(/<div id="smoke-status">([^<]*)<\/div>/);
  assert.ok(match,'Browser smoke status missing');
  assert.equal(match[1],'PASS','Browser failed: '+(match?.[1]||'unknown')+' '+result.err.slice(-600));
 }finally{server.close()}
});
