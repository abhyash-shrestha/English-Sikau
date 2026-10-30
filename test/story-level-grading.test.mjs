import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const app=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const tick=String.fromCharCode(96);
const start=app.indexOf('const gradedStoryPatch=String.raw'+tick);
const end=app.indexOf(tick+';',start);
assert.ok(start>0&&end>start,'Private lesson grader patch must be defined');
const patch=app.slice(start+'const gradedStoryPatch=String.raw'.length+1,end);
const book={
 id:'adventure-0',hero:'Nima',place:'a mountain footpath',
 goal:'find the safest route to the next village',
 obstacle:'the bridge was blocked',clue:'a local guide offered a useful map',
 action:'followed the marked trail',outcome:'the village was reached safely',
 lesson:'patience and careful thought make a difference'
};
function build(level){
 const ctx={console,book,level};
 vm.runInNewContext(
  'function storyBuildChapters(){return []}\n'+
  'function storyQuestions(b,i){return [{prompt:"Question",correct:b.goal}]}\n'+patch+
  '\nthis.output=storyBuildChapters(this.book,this.level);',ctx,{timeout:1500});
 return ctx.output;
}
test('Ten levels each generate four connected chapters of exactly three sentences',()=>{
 const results=[];
 for(let level=1;level<=10;level++){
  const chapters=build(level);
  assert.equal(chapters.length,4,'Four chapters for level '+level);
  for(const [chapterIndex,chapter] of Array.from(chapters).entries()){
   assert.equal(chapter.text.length,3,'Level '+level+', chapter '+chapterIndex);
   assert.equal(chapter.qa.length,1,'Existing quiz generator returns questions');
   for(const sentence of chapter.text){
    assert.ok(sentence.length>18,'No tiny fragments');
    assert.ok(sentence.endsWith('.'),'Each sentence ends with a period');
   }
  }
  results.push(chapters);
 }
 const first=results[0].flatMap(c=>c.text).join(' ');
 const advanced=results[9].flatMap(c=>c.text).join(' ');
 assert.notEqual(first,advanced,'Higher levels must change language instead of appending filler');
 const simpleAverage=first.split(/\s+/).reduce((sum,w)=>sum+w.length,0)/first.split(/\s+/).length;
 const advancedAverage=advanced.split(/\s+/).reduce((sum,w)=>sum+w.length,0)/advanced.split(/\s+/).length;
 assert.ok(advancedAverage>simpleAverage+0.4,'Higher levels introduce more advanced vocabulary');
 const unique=new Set(results.map(chapters=>chapters.map(ch=>ch.text.join(' ')).join('|')));
 assert.equal(unique.size,10,'Each level should have a distinct narrative register');
});
test('Every chapter preserves quiz-answer facts at all levels',()=>{
 for(let lvl=1;lvl<=10;lvl++){
  const c=build(lvl);
  assert.match(c[0].text.join(' '),/mountain footpath/);
  assert.match(c[0].text.join(' '),/safest route/);
  assert.match(c[1].text.join(' '),/bridge was blocked/);
  assert.match(c[1].text.join(' '),/calm|compos|react|anxiety/);
  assert.match(c[2].text.join(' '),/guide offered a useful map/);
  assert.match(c[2].text.join(' '),/followed the marked trail/);
  assert.match(c[3].text.join(' '),/village was reached safely/);
  assert.match(c[3].text.join(' '),/patience and careful thought/);
 }
});
test('Source transformation is protected, signature-guarded and does not alter access rules',()=>{
 assert.match(app,/const storyGeneratorBoundary=/);
 assert.match(app,/storyWithGrade===lessonsWithQuality/);
 assert.match(app,/const enhancedHtml=\/<\\\/body\\s\*>\/i\.test\(storyWithGrade\)/);
 assert.doesNotMatch(patch,/localStorage|createExecution|createDocument|updateDocument|addXp|trialPass/);
});
