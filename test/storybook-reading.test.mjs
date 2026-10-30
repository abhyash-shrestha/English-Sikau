import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const read=file=>fs.readFileSync(new URL('../'+file,import.meta.url),'utf8');
const source=read('storybook-reading.js'),css=read('storybook-reading.css'),
 app=read('index.html'),reading=read('reading-dashboard.js');
const env={window:{},document:{baseURI:'https://englishsikau.example/'},URL,console};
vm.runInNewContext(source,env,{timeout:1000});
const {sentenceTexts,makeParagraphs,chapterIdentity}=env.window.__sikauStorybookText;

class Element{
 constructor(tag='div',cls='',text=''){
  this.tagName=tag.toUpperCase();this.className=cls;this.textContent=text;this.id='';
  this.parentElement=null;this.children=[];this.dataset={};this.attrs={};this.listeners={};
  this.style={};this.type='';this.lang='';
 }
 setAttribute(k,v){this.attrs[k]=String(v)}
 getAttribute(k){return this.attrs[k]??null}
 addEventListener(type,fn){this.listeners[type]=fn}
 click(){this.listeners.click?.()}
 append(...children){for(const child of children){child.remove();child.parentElement=this;this.children.push(child)}}
 appendChild(child){this.append(child)}
 insertBefore(child,other){
  child.remove();const i=this.children.indexOf(other);
  child.parentElement=this;this.children.splice(i<0?this.children.length:i,0,child);
 }
 remove(){
  if(this.parentElement){const i=this.parentElement.children.indexOf(this);
   if(i>=0)this.parentElement.children.splice(i,1)}
  this.parentElement=null;
 }
 querySelectorAll(selector){
  const results=[];
  const match=node=>{
   if(selector==='.story-line')return node.className.split(/\s+/).includes('story-line');
   if(selector==='.rs,.story-line-english,.story-line-text')
    return ['rs','story-line-english','story-line-text'].some(c=>node.className.split(/\s+/).includes(c));
   if(selector==='[data-storybook].on')return !!node.attrs['data-storybook']&&node.className.split(/\s+/).includes('on');
   if(selector==='[data-storylevel].on')return !!node.attrs['data-storylevel']&&node.className.split(/\s+/).includes('on');
   if(selector[0]==='#')return node.id===selector.slice(1);
   if(selector[0]==='.')return node.className.split(/\s+/).includes(selector.slice(1));
   return false;
  };
  const walk=node=>{for(const child of node.children){
   if(match(child))results.push(child);
   walk(child);
  }};
  walk(this);return results;
 }
 querySelector(sel){return this.querySelectorAll(sel)[0]||null}
 closest(selector){
  for(let n=this;n;n=n.parentElement)if(n.className.split(/\s+/).includes(selector.slice(1)))return n;
  return null;
 }
}
function fixture(){
 const callbacks=[],head=new Element('head'),reader=new Element('main'),host=new Element('section','read-v2-sentences');
 const title=new Element('h3','','Chapter 1: The Beginning');title.id='storyCurrentChapterTitle';
 const book=new Element('button','on');book.setAttribute('data-storybook','adventure-0');
 const level=new Element('button','on');level.setAttribute('data-storylevel','1');
 const lines=new Element('div','story-lines');
 function addLines(sentences){
  lines.children=[];
  for(const sentence of sentences){
   const row=new Element('div','story-line');
   const english=new Element('span','rs',sentence);
   const speaker=new Element('button','speaker');speaker.addEventListener('click',()=>{});
   row.append(english,speaker);lines.append(row);
  }
 }
 addLines(['Nima arrived at the mountain footpath.','She needed to reach the next village.',
  'The sky was beginning to turn grey.','She chose to look for a safer trail.']);
 host.append(lines);reader.append(book,level,title,host);
 const doc={head,defaultView:{
   requestAnimationFrame:fn=>fn(),setTimeout:fn=>fn(),
   MutationObserver:class{constructor(fn){callbacks.push(fn)}observe(){}}
 },createElement:tag=>new Element(tag),
 getElementById:id=>head.querySelector('#'+id)};
 const appEnv={window:{},document:{baseURI:'https://englishsikau.example/'},URL,console};
 vm.runInNewContext(source,appEnv,{timeout:1000});
 return {doc,reader,host,title,book,level,lines,callbacks,addLines,install:()=>appEnv.window.enhanceStorybookReading(doc,reader)};
}
test('Original native sentences become continuous book prose without altering the source',()=>{
 const f=fixture(),before=sentenceTexts(f.lines);
 assert.equal(f.install(),true);
 const page=f.host.querySelector('.storybook-page');
 assert.ok(page,'A book page is created');
 assert.equal(page.querySelector('.storybook-prose').querySelector('p')?.textContent,before.join(' '));
 assert.deepEqual(Array.from(sentenceTexts(f.lines)),Array.from(before));
 assert.equal(f.lines.querySelectorAll('.story-line').length,4,'Native sentence lines and their audio controls are kept');
 assert.equal(f.host.dataset.storyToolsOpen,'false');
 assert.equal(f.host.querySelector('.storybook-tools-toggle').getAttribute('aria-expanded'),'false');
});
test('Sentence tools remain available and the book page is idempotent',()=>{
 const f=fixture();f.install();f.install();
 assert.equal(f.host.querySelectorAll('.storybook-page').length,1);
 const toggle=f.host.querySelector('.storybook-tools-toggle');
 toggle.click();assert.equal(f.host.dataset.storyToolsOpen,'true');
 assert.equal(toggle.getAttribute('aria-expanded'),'true');
 toggle.click();assert.equal(f.host.dataset.storyToolsOpen,'false');
 assert.equal(f.lines.querySelector('.speaker').listeners.click instanceof Function,true);
});
test('Chapter 2 shows a factual recap from the previous displayed chapter, not invented text',()=>{
 const f=fixture();f.install();
 f.title.textContent='Chapter 2: The Path';
 f.addLines(['Nima reached a bridge.','The crossing was slippery.','She waited for help.']);
 f.callbacks[0]([{target:f.lines}]);
 const page=f.host.querySelector('.storybook-page');
 assert.equal(page.querySelector('.storybook-prose').querySelector('p').textContent,
  'Nima reached a bridge. The crossing was slippery. She waited for help.');
 const recap=page.querySelector('.storybook-recap');
 assert.ok(recap);
 assert.equal(recap.querySelector('p').textContent,
  'The sky was beginning to turn grey. She chose to look for a safer trail.');
 assert.equal(f.lines.querySelectorAll('.story-line').length,3);
});
test('Separate books never inherit a different story recap',()=>{
 const f=fixture();f.install();
 f.book.setAttribute('data-storybook','adventure-1');
 f.title.textContent='Chapter 2: New Story';
 f.addLines(['A different person arrived at the market.']);
 f.callbacks[0]([{target:f.lines}]);
 assert.equal(f.host.querySelector('.storybook-page').querySelector('.storybook-recap'),null);
});
test('Only the authorized Reading story view receives book styling and scripts',()=>{
 assert.match(reading,/window\.enhanceStorybookReading\?\.\(d,reader\)/);
 assert.match(app,/storybook-reading\.js\?v=20261030-book-r1/);
 assert.match(app,/reading-dashboard\.js\?v=20261030-book-r1/);
 assert.match(css,/#rd\.sikau-read-exact #storyReader\[data-sikau-book-ready="1"\]/);
 assert.match(css,/data-story-tools-open="false"/);
 assert.match(css,/data-sikau-theme="dark"/);
 assert.match(css,/@media\(max-width:650px\)/);
 assert.doesNotMatch(source,/fetch\(|localStorage|createExecution|updateDocument|innerHTML\s*=/);
 assert.doesNotMatch(source,/storyQuizResult|storyNext|storyCheckQuiz/);
});
test('Paragraph grouping is ordered and does not create narrative facts',()=>{
 const examples=['A.','B.','C.','D.','E.','F.','G.'];
 assert.deepEqual(Array.from(makeParagraphs(examples)),['A. B. C. D.','E. F. G.']);
 const reader=fixture().reader;
 assert.deepEqual(JSON.parse(JSON.stringify(chapterIdentity(reader))),
  {book:'adventure-0',level:'1',number:1,title:'Chapter 1: The Beginning',key:'adventure-0|1'});
});
