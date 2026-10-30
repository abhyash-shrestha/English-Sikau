import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const app=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const helpers=app.slice(app.indexOf('/* Smooth account creation.'),app.indexOf('/* End smooth account helpers. */'));
const save=app.slice(app.indexOf('function savePending(next)'),app.indexOf('async function submit(e)'));
const submit=app.slice(app.indexOf('async function submit(e)'),app.indexOf('async function sendClaim(e)'));
const sessionCode=app.slice(app.indexOf('async function session({silentGuest=false}={})'),app.indexOf('const getFileUrl='));
const flush=async()=>{for(let i=0;i<10;i++)await Promise.resolve();};
function element(value='',{type='',text=''}={}){
 return {value,type,textContent:text,hidden:false,disabled:false,dataset:{},attrs:{},listeners:{},
  setAttribute(k,v){this.attrs[k]=String(v);},removeAttribute(k){delete this.attrs[k];},
  hasAttribute(k){return Object.hasOwn(this.attrs,k);},
  addEventListener(type,fn){this.listeners[type]=fn;},
  setCustomValidity(value){this.validation=value;},focus(){this.focused=true;},
  querySelectorAll(){return[];}};
}
function fixture({password='abcdefgh',mode='signup',storageFails=false,account={}}={}){
 const calls=[],stored=[],renders=[],intervals=new Map();let serial=0;
 const button=element('',{type:'submit',text:'Create account'});
 const fields={
  first:element('Test'),last:element('Learner'),email:element(' Test.Learner@example.invalid '),
  password:element(password),confirm:element(password),otp:element('012345'),
  passwordLength:element(),passwordMatch:element(),authFeedback:element(),message:element(),screen:element()
 };
 fields.authFeedback.hidden=true;
 fields.screen.querySelectorAll=selector=>selector.includes('button[type=')?[button]:[];
 const api={
  async create(...args){calls.push({create:args});return {$id:'new-test-user'};},
  async createEmailToken(...args){calls.push({code:args});return {userId:'new-test-user',expire:new Date(Date.now()+900000).toISOString()};},
  async createEmailPasswordSession(...args){calls.push({login:args});},
  async createSession(...args){calls.push({verify:args});},
  async get(){calls.push({get:true});return {$id:'new-test-user',email:'test.learner@example.invalid',name:'Existing Name',emailVerification:true};},
  async updateName(name){calls.push({updateName:name});},
  async deleteSession(id){calls.push({deleteSession:id});},
  ...account
 };
 const context={mode,busy:false,pending:null,user:null,trial:null,lastTrialCheckError:'',
  navigator:{onLine:true},console,account:api,ID:{unique:()=> 'unique-test-id'},
  $:id=>fields[id]||null,
  show(){renders.push(context.mode);context.bindAuthExperience();},
  showMsg(text,type){fields.message.textContent=text;fields.message.hidden=!text;fields.message.type=type;},
  shortError:e=>e.message||'Unknown issue',
  async session(){calls.push({session:true});},
  killLessons(){calls.push({closedLessons:true});},
  sessionStorage:{setItem(k,v){if(storageFails)throw Error('Storage blocked');stored.push({key:k,value:v});},removeItem(k){stored.push({removed:k});}},
  clearInterval(id){intervals.delete(id);},setInterval(fn){const id=++serial;intervals.set(id,fn);return id;},
  location:{origin:'https://example.invalid',pathname:'/'},history:{replaceState(){}},recoveryLink:null,
  go(next){context.rememberAuthFields();context.mode=next;},
  URL,URLSearchParams
 };
 vm.createContext(context);
 vm.runInContext(helpers+'\n'+save+'\n'+submit+'\n'+
  'globalThis.authState=()=>({draft:authDraft,purpose:authCodePurpose,pending,busy,mode});'+
  'globalThis.setCodePurpose=value=>authCodePurpose=value;',context);
 return {context,fields,button,calls,stored,renders,intervals,
  run:()=>context.submit({preventDefault(){}}),
  useActualSession(){vm.runInContext(sessionCode,context);}};
}

test('any 8–256 character format reaches Appwrite unchanged; no composition rule is added',async()=>{
 for(const password of ['12345678','abcdefgh','!!!!!!!!','        ','अभ्यास१२३','x'.repeat(256)]){
  const b=fixture({password});await b.run();
  assert.equal(b.calls.find(c=>c.create).create[2],password);
  assert.equal(b.calls.find(c=>c.create).create[1],'test.learner@example.invalid');
  assert.equal(b.context.mode,'verify');
  assert.ok(b.stored.every(s=>!s.value||!s.value.includes('"password"')));
  assert.ok(b.stored.every(s=>!s.value||!s.value.includes('"otp"')));
 }
});

test('short and mismatched passwords focus the right field without sending signup',async()=>{
 for(const [password,confirm,field] of [['seven77','seven77','password'],['abcdefgh','different','confirm']]){
  const b=fixture({password});b.fields.confirm.value=confirm;await b.run();
  assert.equal(b.calls.length,0);assert.equal(b.fields[field].focused,true);
  assert.equal(b.fields[field].attrs['aria-invalid'],'true');
  assert.equal(b.button.disabled,false);
 }
});

test('breached-password feedback stays beside the form and preserves all input',async()=>{
 const b=fixture({account:{async create(){throw Object.assign(Error('exposed in a known data breach'),{type:'password_pwned',code:400});}}});
 await b.run();
 assert.match(b.fields.authFeedback.textContent,/exposed online/);
 assert.match(b.fields.authFeedback.textContent,/email code/);
 assert.equal(b.fields.password.value,'abcdefgh');assert.equal(b.fields.first.value,'Test');
 assert.equal(b.fields.password.focused,true);assert.equal(b.fields.authFeedback.hidden,false);
 assert.equal(b.fields.message.hidden,true);assert.equal(b.context.mode,'signup');
 assert.equal(b.calls.length,0);
});

test('duplicate email offers login/code without trying to recreate or silently log in',async()=>{
 const b=fixture({account:{async create(){throw Object.assign(Error('Already exists'),{code:409});}}});
 await b.run();assert.match(b.fields.authFeedback.textContent,/already uses this email/);
 assert.equal(b.fields.email.focused,true);assert.equal(b.calls.length,0);
});

test('partial signup retries only the email code, never account creation',async()=>{
 let attempts=0;
 const b=fixture({account:{async createEmailToken(){attempts++;if(attempts===1)throw Error('Mail unavailable');return {userId:'new-test-user'};}}});
 await b.run();
 assert.equal(b.context.mode,'verify');assert.equal(b.context.pending.codeSent,false);
 assert.match(b.fields.authFeedback.textContent,/account was created/);
 await b.context.resendAuthCode();
 assert.equal(b.context.pending.codeSent,true);assert.equal(attempts,2);
 assert.equal(b.calls.filter(c=>c.create).length,1);
 await b.context.resendAuthCode();assert.equal(attempts,2,'resend cooldown prevents rapid duplicate email');
});

test('blocked browser storage does not turn successful signup into an error',async()=>{
 const b=fixture({storageFails:true});await b.run();
 assert.equal(b.context.mode,'verify');assert.equal(b.context.pending.codeSent,true);
 await b.context.verifyAuthCode();assert.equal(b.context.pending,null);
 assert.equal(b.calls.filter(c=>c.session).length,1);
});

test('loading state prevents duplicate submission and restores the button',async()=>{
 let resolve,creates=0;
 const b=fixture({account:{create(){creates++;return new Promise(r=>resolve=r);}}});
 const active=b.run();await flush();
 assert.equal(b.button.disabled,true);assert.match(b.button.textContent,/Creating account/);
 await b.run();assert.equal(creates,1);
 resolve({$id:'new-test-user'});await active;
 assert.equal(b.button.disabled,false);assert.equal(b.button.textContent,'Create account');
});

test('email-code signup creates no password and never overwrites an existing profile name',async()=>{
 const b=fixture({mode:'emailcode'});b.context.setCodePurpose('signup');
 await b.run();assert.equal(b.calls.filter(c=>c.create).length,0);
 assert.equal(b.context.pending.name,'Test Learner');
 await b.context.verifyAuthCode();
 assert.equal(b.calls.filter(c=>c.updateName).length,0);
 assert.equal(b.calls.filter(c=>c.verify).length,1);
});

test('new email-code users receive the name entered at signup',async()=>{
 const b=fixture({mode:'emailcode',account:{async get(){return {name:'',emailVerification:true};}}});
 b.context.setCodePurpose('signup');await b.run();await b.context.verifyAuthCode();
 assert.equal(b.calls.find(c=>c.updateName).updateName,'Test Learner');
});

test('wrong verification codes retain the pending step for a retry',async()=>{
 const b=fixture({account:{async createSession(){throw Object.assign(Error('Bad code'),{code:401,type:'user_invalid_token'});}}});
 await b.run();await b.run();
 assert.ok(b.context.pending);assert.match(b.fields.authFeedback.textContent,/incorrect or expired/);
 assert.equal(b.fields.otp.focused,true);assert.equal(b.calls.filter(c=>c.session).length,0);
});

test('refresh resumes pending verification without sending another email',async()=>{
 const b=fixture({account:{async get(){throw Object.assign(Error('No session'),{code:401});}}});
 b.context.savePending({email:'test.learner@example.invalid',userId:'pending-user',codeSent:true});
 b.useActualSession();await b.context.session({silentGuest:true});
 assert.equal(b.context.mode,'verify');assert.equal(b.calls.filter(c=>c.code).length,0);
});

test('unverified password sessions are guided to verification, then signed out once for code exchange',async()=>{
 let signedIn=true,send=0;
 const b=fixture({account:{
  async get(){if(!signedIn)throw Object.assign(Error('No session'),{code:401});return {$id:'new-test-user',email:'test.learner@example.invalid',name:'Test',emailVerification:false};},
  async deleteSession(){signedIn=false;},
  async createEmailToken(){send++;if(send===1)throw Error('Mail failed');return {userId:'new-test-user'};}
 }});
 b.useActualSession();await b.context.session();
 assert.equal(b.context.mode,'verify');assert.equal(b.context.pending.requiresSignout,true);
 await b.context.resendAuthCode();assert.equal(signedIn,false);assert.equal(b.context.pending.requiresSignout,false);
 await b.context.resendAuthCode();assert.equal(send,2);assert.equal(b.context.pending.codeSent,true);
});

test('password matching and Nepali/spaced code paste work without layout-changing rerenders',()=>{
 const b=fixture();b.context.bindAuthExperience();
 b.fields.password.value='short';b.fields.password.listeners.input();
 assert.match(b.fields.passwordLength.textContent,/5 \/ 8/);
 b.fields.password.value='abcdefgh';b.fields.confirm.value='abc';b.fields.confirm.listeners.input();
 assert.match(b.fields.confirm.validation,/do not match/);
 b.fields.confirm.value='abcdefgh';b.fields.confirm.listeners.input();assert.equal(b.fields.confirm.validation,'');
 let prevented=false;
 b.fields.otp.listeners.paste({clipboardData:{getData:()=> '०१ २३ ४५'},preventDefault(){prevented=true;}});
 assert.equal(b.fields.otp.value,'012345');assert.equal(prevented,true);
 assert.equal(b.renders.length,0);
});

test('pending storage only keeps whitelisted metadata, never passwords or codes',()=>{
 const b=fixture();b.context.savePending({email:' Test@example.invalid ',userId:'test-user',password:'private-test-value',otp:'987654'});
 const saved=JSON.parse(b.stored[0].value);
 assert.equal(saved.email,'test@example.invalid');assert.equal(saved.password,undefined);assert.equal(saved.otp,undefined);
 assert.ok(app.includes('if(p?.until>Date.now())savePending(p)'));
});

test('changing verification email keeps signup names and clears the old code step',()=>{
 const b=fixture({mode:'verify'});
 b.context.savePending({email:'old@example.invalid',userId:'old-test-user',purpose:'signup',name:'Test Learner'});
 vm.runInContext(app.slice(app.indexOf('function go(next,'),app.indexOf('async function loadSDK()')),b.context);
 b.context.go('emailcode');
 const state=b.context.authState();assert.equal(state.purpose,'signup');
 assert.equal(state.pending,null);assert.equal(state.draft.first,'Test');assert.equal(b.context.mode,'emailcode');
});

test('all inline scripts parse and signup keeps server verification/access checks',()=>{
 for(const match of app.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi))new vm.Script(match[1]);
 assert.ok(app.includes('data-auth-code="signup"'));
 assert.ok(app.includes("if(a.emailVerification!==true)"));
 assert.ok(app.includes("await fnCall(CFG.trialPass,'progressGet')"));
 assert.ok(app.includes('account.createSession(pending.userId,otp)'));
});
