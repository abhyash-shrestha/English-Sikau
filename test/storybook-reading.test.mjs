import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const read=file=>fs.readFileSync(new URL('../'+file,import.meta.url),'utf8');
const source=read('storybook-reading.js'),css=read('storybook-reading.css'),
 app=read('index.html'),reading=read('reading-dashboard.js');

class Element{
 constructor(tag='div',cls='',text=''){
  this.tagName=tag.toUpperCase();this.className=cls;this._text=text;this.id='';
  this.parentElement=null;this.children=[];this.dataset={};this.attrs={};this.listeners={};
  this.style={};this.type='';this.lang='';this.disabled=false;
 }
 set textContent(v){this._text=String(v);this.children=[];}
 get textContent(){return this._text+this.children.map(n=>n.textContent).join('');}
 cloneNode(deep=false){
  const n=new Element(this.tagName,this.className,this._text);
  n.id=this.id;n.attrs={...this.attrs};n.lang=this.lang;
  if(deep)for(const c of this.children)n.append(c.cloneNode(true));
  return n;
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
  const selectors=selector.split(',').map(x=>x.trim()).filter(Boolean);
  const match=(n,sel)=>{
   if(sel==='[data-storybook].on')return n.attrs['data-storybook']&&n.className.split(/\s+/).includes('on');
   if(sel==='[data-storylevel].on')return n.attrs['data-storylevel']&&n.className.split(/\s+/).includes('on');
   if(sel[0]==='#')return n.id===sel.slice(1);
   if(sel.startsWith('[lang^="ne"]'))return n.lang.startsWith('ne');
   if(sel.startsWith('[lang="ne"]'))return n.lang==='ne';
   if(sel.startsWith('[lang="ne-NP"]'))return n.lang==='ne-NP';
   if(sel.startsWith('[data-story-nepali]'))return n.attrs['data-story-nepali'];
   if(sel.startsWith('button')&&sel.includes('role'))return n.tagName==='BUTTON';
   if(sel.startsWith('input[type='))return n.tagName==='INPUT'&&n.type==='button';
   if(sel[0]==='.')return n.className.split(/\s+/).includes(sel.slice(1));
   return n.tagName===sel.toUpperCase();
  };
  const found=[];
  const walk=n=>{for(const c of n.children){
   if(selectors.some(sel=>match(c,sel)))found.push(c);
   walk(c);
  }};
  walk(this);return found;
 }
 querySelector(sel){return this.querySelectorAll(sel)[0]||null}
 closest(sel){for(let n=this;n;n=n.parentElement)if(sel[0]==='.'&&n.className.split(/\s+/).includes(sel.slice(1)))return n;return null}
}
function fixture(sentences=[
 ['Nima arrived at a mountain footpath.','निमा पहाडको गोरेटो बाटोमा आइपुगिन्।'],
 ['Nima wanted to find a safe route to the next village.','निमा अर्को गाउँ पुग्ने सुरक्षित बाटो खोज्दै थिइन्।']
 ]){
 const callbacks=[],head=new Element('head'),reader=new Element('main'),host=new Element('section','read-v2-sentences');
 const title=new Element('h3','','Chapter 1: The Beginning');title.id='storyCurrentChapterTitle';
 const book=new Element('button','on');book.setAttribute('data-storybook','adventure-0');
 const level=new Element('button','on');level.setAttribute('data-storylevel','1');
 const lines=new Element('div','story-lines'),stats={audio:0,nepali:0};
 function addLines(list){
  lines.children=[];
  for(const [english,nepali,auto=false] of list){
   const row=new Element('div','story-line');
   const en=new Element('span','rs',english+' ');
   const speaker=new Element('button','speaker','🔊');
   speaker.addEventListener('click',()=>stats.audio++);
   en.append(speaker);
   row.append(en);
   if(!auto){
    row.append(new Element('p','story-nepali',nepali));
   }else{
    const np=new Element('button','sikau-see-nepali','NP');
    np.addEventListener('click',()=>{
     stats.nepali++;if(!row.querySelector('.story-nepali'))row.append(new Element('p','story-nepali',nepali));
    });
    row.append(np);
   }
   lines.append(row);
  }
 }
 addLines(sentences);
 host.append(lines);reader.append(book,level,title,host);
 const doc={head,defaultView:{
   requestAnimationFrame:fn=>fn(),setTimeout:fn=>fn(),
   MutationObserver:class{constructor(fn){callbacks.push(fn)}observe(){}}
 },createElement:tag=>new Element(tag),
 getElementById:id=>head.querySelector('#'+id)};
 const w={};vm.runInNewContext(source,{window:w,document:{baseURI:'https://example.org/'},URL,console},{timeout:1000});
 return {doc,reader,host,title,book,level,lines,callbacks,stats,addLines,
  api:w.__sikauStorybookText,install:()=>w.enhanceStorybookReading(doc,reader)};
}
test('Clean sentence extractor never includes speaker or NP button labels',()=>{
 const f=fixture();
 assert.equal(f.api.englishText(f.lines.querySelector('.story-line')),'Nima arrived at a mountain footpath.');
 assert.deepEqual(Array.from(f.api.sentenceTexts(f.lines)),[
  'Nima arrived at a mountain footpath.','Nima wanted to find a safe route to the next village.'
 ]);
});
test('English and existing Nepali appear together without a separate reveal-all control',()=>{
 const f=fixture();assert.equal(f.install(),true);
 const page=f.host.querySelector('.storybook-page');
 assert.ok(page);assert.equal(page.querySelectorAll('.storybook-pair').length,2);
 assert.equal(page.querySelectorAll('.storybook-nepali-text').length,2);
 assert.equal(page.querySelector('.storybook-sentence').textContent,'Nima arrived at a mountain footpath.');
 assert.equal(page.querySelector('.storybook-nepali-text').textContent,'निमा पहाडको गोरेटो बाटोमा आइपुगिन्।');
 assert.equal(page.querySelector('.storybook-tools-toggle'),null);
 assert.equal(f.lines.querySelectorAll('.story-line').length,2);
});
test('Native NP action may populate Nepali once without disrupting quiz state',()=>{
 const f=fixture([['Nima crossed the bridge.','निमाले पुल पार गरिन्।',true]]);
 assert.equal(f.install(),true);
 assert.equal(f.stats.nepali,1);
 f.callbacks[0]([{target:f.lines}]);
 assert.equal(f.host.querySelector('.storybook-nepali-text').textContent,'निमाले पुल पार गरिन्।');
 assert.equal(f.stats.nepali,1,'Never toggles native control a second time');
});
test('Audio buttons retain original voice event handler',()=>{
 const f=fixture();f.install();
 const play=f.host.querySelector('.storybook-play');assert.ok(play);
 play.click();assert.equal(f.stats.audio,1);
});
test('Changing levels keeps each reading page at three or fewer sentences',()=>{
 const f=fixture();f.install();
 f.level.setAttribute('data-storylevel','4');
 f.addLines([
 ['Nima arrived at the foothills.','निमा पहाडको फेदमा आइपुगिन्।'],
 ['She noticed the path was overgrown.','बाटो झारपातले ढाकिएको थियो।'],
 ['The valley was quiet.','उपत्यका शान्त थियो।'],
 ['Despite her uncertainty, Nima continued cautiously.','अनिश्चित भए पनि निमा होसियारीपूर्वक अघि बढिन्।'],
 ['She assessed the risks before crossing.','पार गर्नुअघि उनले जोखिम मूल्याङ्कन गरिन्।']
 ]);
 f.callbacks[0]([{target:f.lines}]);
 const page=f.host.querySelector('.storybook-page');
 assert.equal(page.querySelectorAll('.storybook-pair').length,3);
 assert.equal(page.querySelector('.storybook-pagination').querySelector('span').textContent,'Page 1 of 2');
 const controls=page.querySelector('.storybook-pagination').querySelectorAll('button');
 controls[1].click();
 assert.equal(f.host.querySelector('.storybook-page').querySelectorAll('.storybook-pair').length,2);
 assert.equal(f.lines.querySelectorAll('.story-line').length,5,'Original full passage and quiz source remain intact');
});
test('Changing chapters uses only genuine previous text for recap, not invented details',()=>{
 const f=fixture();f.install();
 f.title.textContent='Chapter 2: The River';
 f.addLines([['Nima reached the riverbank.','निमा नदी किनारमा पुगिन्।']]);
 f.callbacks[0]([{target:f.lines}]);
 const recap=f.host.querySelector('.storybook-recap');
 assert.ok(recap);assert.match(recap.querySelector('p').textContent,/safe route/);
});
test('Different books do not inherit recaps',()=>{
 const f=fixture();f.install();
 f.book.setAttribute('data-storybook','adventure-1');
 f.title.textContent='Chapter 2: Other book';
 f.addLines([['A second learner went to the market.','अर्को विद्यार्थी बजार गयो।']]);
 f.callbacks[0]([{target:f.lines}]);
 assert.equal(f.host.querySelector('.storybook-recap'),null);
});
test('All storybook changes remain presentation-only and preserve native gates',()=>{
 assert.match(app,/storybook-reading\.js\?v=20261030-bilingual-r2/);
 assert.match(reading,/enhanceStorybookReading/);
 assert.match(css,/data-sikau-book-ready="2"/);
 assert.match(css,/storybook-nepali-text/);
 assert.match(css,/storybook-pagination/);
 assert.match(css,/@media\(max-width:710px\)/);
 assert.match(css,/data-sikau-theme="dark"/);
 assert.doesNotMatch(source,/fetch\(|localStorage|createExecution|updateDocument|innerHTML\s*=/);
 assert.doesNotMatch(source,/storyQuizResult|storyNext|storyCheckQuiz/);
 assert.deepEqual(Array.from(fixture().api.makeParagraphs(['A.','B.','C.','D.'])),['A. B. C.','D.']);
});
