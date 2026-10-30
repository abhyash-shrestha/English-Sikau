import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

// Minimal native-lesson DOM fixture. In particular, the source lesson DOES
// NOT have an #rtext element, which made the previous bilingual patch inert.
class Node {
 constructor(tag='div',cls='',value=''){
  this.tagName=tag.toUpperCase();this.className=cls;this._text=value;
  this.children=[];this.parentElement=null;this.dataset={};this.attrs={};
  this.listeners={};this.hidden=false;this.id='';
  this.classList={
   add:(...xs)=>{this.className=[...new Set([...this.className.split(/\s+/),...xs].filter(Boolean))].join(' ');},
   remove:(...xs)=>{this.className=this.className.split(/\s+/).filter(x=>x&&!xs.includes(x)).join(' ');},
   contains:x=>this.className.split(/\s+/).includes(x)
  };
 }
 get textContent(){return this._text+this.children.map(c=>c.textContent).join('');}
 set textContent(s){this._text=String(s);this.children=[];}
 append(...nodes){for(const node of nodes){node.remove();node.parentElement=this;this.children.push(node);}}
 remove(){if(this.parentElement){const a=this.parentElement.children,i=a.indexOf(this);if(i>=0)a.splice(i,1);}this.parentElement=null;}
 insertBefore(node,before){
  node.remove();let i=this.children.indexOf(before);if(i<0)i=this.children.length;
  this.children.splice(i,0,node);node.parentElement=this;
 }
 replaceChildren(...nodes){this.children.forEach(x=>x.parentElement=null);this.children=[];this._text='';this.append(...nodes);}
 get nextElementSibling(){if(!this.parentElement)return null;return this.parentElement.children[this.parentElement.children.indexOf(this)+1]||null;}
 get previousElementSibling(){if(!this.parentElement)return null;return this.parentElement.children[this.parentElement.children.indexOf(this)-1]||null;}
 matches(q){
  if(q.includes(','))return q.split(',').some(x=>this.matches(x.trim()));
  if(q==='button[data-rm="practice"].on')return this.tagName==='BUTTON'&&this.dataset.rm==='practice'&&this.classList.contains('on');
  if(q.startsWith('#'))return this.id===q.slice(1);
  if(q.startsWith('.'))return q.split('.').slice(1).every(x=>this.classList.contains(x));
  if(q.startsWith('['))return false;
  if(q.includes('['))return this.tagName===q.split('[')[0].toUpperCase();
  return this.tagName===q.toUpperCase();
 }
 querySelectorAll(q){
  const a=[];const walk=n=>{for(const c of n.children){if(c.matches(q))a.push(c);walk(c);}};
  walk(this);return a;
 }
 querySelector(q){return this.querySelectorAll(q)[0]||null;}
 closest(q){let n=this;while(n){if(n.matches(q))return n;n=n.parentElement;}return null;}
 contains(x){let n=x;while(n){if(n===this)return true;n=n.parentElement;}return false;}
 getAttribute(k){return this.attrs[k]||null;}
 setAttribute(k,v){this.attrs[k]=v;}
 addEventListener(k,f){this.listeners[k]=f;}
 click(){this.listeners.click?.();}
 cloneNode(deep){
  const c=new Node(this.tagName,this.className,this._text);c.attrs={...this.attrs};
  c.id=this.id;if(deep)this.children.forEach(x=>c.append(x.cloneNode(true)));return c;
 }
}
function fixture(){
 const head=new Node('head'),rd=new Node('section'),mode=new Node('div');
 const card=new Node('section','card');rd.id='rd';mode.id='readModeSeg';
 const active=new Node('button','on');active.dataset.rm='practice';
 mode.append(active);rd.append(mode,card);
 const taps={topic:0,down:0,up:0,english:0},speech=[];
 for(const [key,label] of [['topic','Change topic'],['down','Level down'],['up','Level up']]){
  const b=new Node('button','',label);b.addEventListener('click',()=>taps[key]++);card.append(b);
 }
 const english=['Anita lives in Ilam.','She is a driver.','She likes tea.','Today she wants to finish an important project.'];
 const nepali=['अनिता इलाममा बस्छिन्।','उनी चालक हुन्।','उनी चिया मन पराउँछिन्।','आज उनी एउटा महत्त्वपूर्ण परियोजना पूरा गर्न चाहन्छिन्।'];
 for(let i=0;i<english.length;i++){
  const row=new Node('div','practice-line'),sentence=new Node('span','rs',english[i]);
  const sound=new Node('button','speaker','🔊'),show=new Node('button','','See Nepali');
  sound.addEventListener('click',()=>taps.english++);
  show.addEventListener('click',()=>{
   if(!row.querySelector('.nd'))row.append(new Node('span','nd',nepali[i]));
  });
  row.append(sentence,sound,show);card.append(row);
 }
 // The protected lesson also includes quiz actions which must be untouched.
 const quiz=new Node('button','','Take quiz');quiz.id='takeQuiz';card.append(quiz);
 const win={__sikauSpeech:(...args)=>speech.push(args)};
 const doc={baseURI:'https://example.org/',defaultView:win,head,
  getElementById:id=>id==='rd'?rd:id==='readModeSeg'?mode:id==='sikauPracticeBilingualCSS'?head.querySelector('#'+id):null,
  createElement:tag=>new Node(tag)};
 const js=fs.readFileSync(new URL('../practice-bilingual-reading.js',import.meta.url),'utf8');
 const context={window:{},document:doc,URL};
 vm.runInNewContext(js,context,{timeout:2500});
 return {rd,active,mode,context,doc,card,taps,speech};
}
test('Practice sentences with no rtext become real side-by-side bilingual rows',()=>{
 const f=fixture();
 assert.equal(f.doc.getElementById('rtext'),null);
 assert.equal(f.context.window.enhancePracticeBilingualReading(f.doc),true);
 assert.equal(f.rd.querySelectorAll('.sikau-practice-pair').length,4);
 assert.equal(f.rd.querySelectorAll('.sikau-practice-translation').length,4);
 assert.equal(f.rd.querySelectorAll('.sikau-practice-source-hidden').length,4);
 assert.equal(f.rd.querySelectorAll('.sikau-practice-listen').length,8);
 assert.equal(f.card.querySelector('#takeQuiz')?.textContent,'Take quiz');
 const text=f.rd.querySelector('.sikau-practice-pair').textContent;
 assert.match(text,/Anita lives in Ilam/);
 assert.match(text,/अनिता इलाममा बस्छिन्/);
 const speakers=f.rd.querySelectorAll('.sikau-practice-listen');
 speakers[0].click();speakers[1].click();
 assert.equal(f.taps.english,1);
 assert.equal(f.speech[0][1],'ne-NP');
});
test('Practice keeps one set of native topic and level buttons, without an extra toolbar',()=>{
 const f=fixture();
 f.context.window.enhancePracticeBilingualReading(f.doc);
 assert.equal(f.rd.querySelectorAll('.sikau-practice-navigation').length,0);
 assert.equal(f.rd.querySelectorAll('.sikau-practice-nav-action').length,0);
 const native=['Change topic','Level down','Level up']
  .map(label=>f.card.children.find(c=>c.textContent===label));
 assert.ok(native.every(Boolean));
 native.forEach(b=>b.click());
 assert.equal(f.taps.topic,1);
 assert.equal(f.taps.down,1);
 assert.equal(f.taps.up,1);
 f.active.classList.remove('on');
 f.mode.listeners.click?.();
 assert.equal(f.rd.querySelector('.sikau-practice-bilingual')?.hidden,true);
 assert.equal(f.rd.querySelectorAll('.sikau-practice-source-hidden').length,0);
});
