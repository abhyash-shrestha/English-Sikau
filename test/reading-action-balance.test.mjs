import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source=fs.readFileSync(new URL('../reading-action-balance.js',import.meta.url),'utf8');
const styles=fs.readFileSync(new URL('../reading-dashboard.css',import.meta.url),'utf8');
class Element {
 constructor(tag='div',text='',classes=''){
  this.tagName=tag.toUpperCase();this.textContent=text;this.className=classes;
  this.children=[];this.parentElement=null;this.dataset={};this.attrs={};this.listeners={};
  this.classList={
   contains:x=>this.className.split(' ').includes(x),
   add:x=>{if(!this.classList.contains(x))this.className+=' '+x;}
  };
 }
 append(...items){for(const item of items){item.parentElement=this;this.children.push(item);}}
 contains(other){for(let n=other;n;n=n.parentElement)if(n===this)return true;return false;}
 getAttribute(k){return this.attrs[k]??null;}
 setAttribute(k,v){this.attrs[k]=v;}
 closest(q){for(let n=this;n;n=n.parentElement)if(n.matches(q))return n;return null;}
 matches(q){
  if(q.startsWith('#'))return this.attrs.id===q.slice(1);
  if(q==='button[data-rm="practice"].on')return this.tagName==='BUTTON'&&
   this.dataset.rm==='practice'&&this.classList.contains('on');
  if(q.includes(','))return q.split(',').some(x=>this.matches(x.trim()));
  return q.toUpperCase()===this.tagName;
 }
 querySelectorAll(q){
  const found=[];const walk=node=>{for(const c of node.children){if(c.matches(q))found.push(c);walk(c);}};
  walk(this);return found;
 }
 querySelector(q){return this.querySelectorAll(q)[0]||null;}
 addEventListener(k,f){this.listeners[k]=f;}
 click(){this.listeners.click?.();}
}
function fixture(grouped){
 const rd=new Element('section'),mode=new Element('div'),card=new Element('section');
 const categories=new Element('div');
 for(let i=0;i<5;i++)categories.append(new Element('button','Topic '+i));
 const heading=new Element('h3','Reading Level 1');
 const row=new Element('div');
 const main=new Element('button','📖 नयाँ reading');
 const topic=new Element('button','🎲 Change topic','sikau-topic-action');
 const easier=new Element('button','⬇ Level down','sikau-level-action');
 const harder=new Element('button','⬆ Level up','sikau-level-action');
 easier.setAttribute('data-sikau-short','Level down');
 harder.setAttribute('data-sikau-short','Level up');
 let clicked=0;for(const b of [main,topic,easier,harder])b.addEventListener('click',()=>clicked++);
 const selected=new Element('button','Practice','on');selected.dataset.rm='practice';
 mode.append(selected);
 if(grouped){const actions=new Element('div');actions.append(topic,easier,harder);row.append(main,actions);}
 else row.append(main,topic,easier,harder);
 card.append(heading,categories,row);rd.append(mode,card);
 const doc={defaultView:{},getElementById:id=>id==='rd'?rd:id==='readModeSeg'?mode:null};
 const context={window:{}};vm.runInNewContext(source,context,{timeout:2000});
 assert.equal(context.window.enhanceReadActionRow(doc),true);
 return {rd,row,main,topic,easier,harder,card,categories,clicked};
}
test('Native Reading action row becomes a 33/67 grid when actions share a wrapper',()=>{
 const f=fixture(true);
 assert.equal(f.row.dataset.sikauBalance,'grouped');
 assert.equal(f.row.children.length,2);
 assert.ok(f.row.classList.contains('sikau-practice-balanced-row'));
 assert.ok(f.row.children[1].classList.contains('sikau-practice-actions-slot'));
 assert.ok(f.main.classList.contains('sikau-practice-newreading-slot'));
 assert.ok([f.topic,f.easier,f.harder].every(b=>b.classList.contains('sikau-practice-large-action')));
 assert.ok(!f.categories.classList.contains('sikau-practice-balanced-row'));
 assert.equal(f.clicked,0);
});
test('Four native sibling buttons use the wider action grid without being replaced',()=>{
 const f=fixture(false);
 assert.equal(f.row.dataset.sikauBalance,'individual');
 assert.equal(f.row.children.length,4);
 const callbacks=[f.main,f.topic,f.easier,f.harder];
 callbacks.forEach(b=>b.click());
 assert.ok(callbacks.every(b=>b.listeners.click));
});
test('Responsive CSS gives new Reading less width and action buttons more',()=>{
 assert.match(styles,/grid-template-columns:minmax\(155px,33%\) repeat\(3,minmax\(0,1fr\)\)/);
 assert.match(styles,/grid-template-columns:minmax\(155px,33%\) minmax\(0,1fr\)/);
 assert.match(styles,/sikau-practice-large-action/);
 assert.match(styles,/@media\(max-width:720px\)/);
 assert.match(styles,/min-height:54px/);
});
