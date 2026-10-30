import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const read=name=>fs.readFileSync(new URL('../'+name,import.meta.url),'utf8');
const source=read('featured-bilingual-story.js');
const styles=read('featured-bilingual-story.css');
const dashboard=read('reading-dashboard.js');
const index=read('index.html');
const context={window:{},console,document:{baseURI:'https://example.org/'},URL};
vm.runInNewContext(source,context,{timeout:2000});
const book=context.window.__sikauFeaturedStoryData;

test('The featured story is one connected, bilingual, five-chapter book',()=>{
 assert.equal(book.chapters.length,5);
 assert.deepEqual(Array.from(book.chapters,c=>c.title),[
  'A Rainy Afternoon','The House on the Hill','A Forgotten Promise','The Hidden Room','A New Beginning'
 ]);
 const allEnglish=book.chapters.flatMap(c=>c.paragraphs.map(p=>p[0])).join(' ');
 assert.match(allEnglish,/blue notebook/);
 assert.match(allEnglish,/Kamala/);
 assert.match(allEnglish,/library finally opened/);
 for(const chapter of book.chapters){
  assert.ok(chapter.neTitle);
  assert.ok(chapter.paragraphs.length>=3);
  for(const pair of chapter.paragraphs){
   assert.equal(pair.length,2);
   assert.ok(pair[0].length>60);
   assert.match(pair[1],/[\u0900-\u097f]/u);
  }
 }
});
test('Every chapter has two answerable bilingual questions with valid answers',()=>{
 for(const chapter of book.chapters){
  assert.equal(chapter.questions.length,2);
  for(const q of chapter.questions){
   assert.ok(q.en);
   assert.match(q.ne,/[\u0900-\u097f]/u);
   assert.equal(q.choices.length,3);
   assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<3);
   for(const pair of q.choices){
    assert.ok(pair[0]);
    assert.match(pair[1],/[\u0900-\u097f]/u);
   }
  }
 }
});
test('Audio is language-specific and chapter unlocking requires 100%',()=>{
 assert.match(source,/view\.__sikauSpeech\(text,locale,'rd'/);
 assert.match(source,/playButton\('🔊 Listen in English',allEn,'en-US'\)/);
 assert.match(source,/playButton\('🔊 नेपालीमा सुन्नुहोस्',allNe,'ne-NP'\)/);
 assert.match(source,/score!==c\.questions\.length/);
 assert.match(source,/next\.disabled=!completed\.has\(active\)/);
 assert.match(source,/accountId\|\|'session'/);
 assert.doesNotMatch(source,/createExecution|createDocument|updateDocument|innerHTML/);
});
test('Reading loads featured book only inside the authenticated classroom',()=>{
 assert.match(index,/protected.*lessonFrame/s);
 assert.match(index,/featured-bilingual-story\.js\?v=20261030-chapters-r1/);
 assert.match(dashboard,/enhanceFeaturedBilingualStory\?\.\(d,reader,accountId\)/);
 assert.match(styles,/@media\(max-width:700px\)/);
 assert.match(styles,/data-sikau-theme="dark"/);
 assert.match(styles,/sikau-featured-reading\[hidden\]/);
});