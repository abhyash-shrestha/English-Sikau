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
 assert.match(index,/bilingual-story-library\.js\?v=20261030-fifteen-books-r5/);
 assert.match(index,/featured-bilingual-story\.js\?v=20261030-fifteen-books-r5/);
 assert.match(dashboard,/enhanceFeaturedBilingualStory\?\.\(d,reader,accountId\)/);
 assert.match(styles,/@media\(max-width:700px\)/);
 assert.match(styles,/data-sikau-theme="dark"/);
 assert.match(styles,/sikau-featured-reading\[hidden\]/);
});
// Guard against blank Reading: the native layout is intentionally hidden
// while the featured book displays, so CSS may never hide both siblings.
test('Featured story remains visible when native story layout is hidden',()=>{
 const css=read('reading-dashboard.css');
 assert.doesNotMatch(css,/#storyReader\[data-read-v2=yes\]>:not\(\.read-v2-layout\)\{display:none!important\}/);
 assert.match(css,/#storyReader\[data-read-v2=yes\]>:not\(\.read-v2-layout\):not\(\.sikau-featured-book\)/);
 assert.match(css,/#storyReader\[data-read-v2=yes\]>\.sikau-featured-book\{display:block!important\}/);
 assert.match(css,/\.card\.tight:has\(#rbox\)\{display:block!important\}/);
 assert.match(read('reading-dashboard.js'),/reading-dashboard\.css\?v=20261030-clean-toolbar-r8/);
 assert.match(read('index.html'),/reading-dashboard\.js\?v=20261030-clean-toolbar-r8/);
});

test('Story Mode uses curated bookshelf, not the native generated story cards',()=>{
 const data=read('bilingual-story-library.js');
 assert.match(source,/__sikauExtraStoryBooks/);
 assert.match(source,/sikau-library-grid/);
 assert.match(source,/layout\.style\.setProperty\('display','none','important'\)/);
 assert.doesNotMatch(source,/other\.textContent=.*Other stories/);
 assert.match(source,/shelf\.hidden=true;reading\.hidden=false/);
 assert.match(styles,/sikau-library-grid/);
 assert.match(styles,/sikau-story-shelf,.sikau-featured-reading/);
 const w={};
 vm.runInNewContext(data,{window:w,console},{timeout:2000});
 assert.equal(w.__sikauExtraStoryBooks.length,14);
 const catalog=[book,...w.__sikauExtraStoryBooks];
 assert.equal(catalog.length,15);
 assert.equal(catalog.reduce((sum,item)=>sum+item.chapters.length,0),55);
 for(const item of catalog){
  assert.ok(item.chapters.length>=3);
  for(const c of item.chapters){
   assert.ok(c.paragraphs.length>=2);
   assert.equal(c.questions.length,2);
   for(const [english,nepali] of c.paragraphs){
    assert.ok(english.length>=50);
    assert.match(nepali,/[\u0900-\u097F]/u);
   }
   for(const q of c.questions){
    assert.equal(q.choices.length,3);
    assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<=2);
    assert.match(q.ne,/[\u0900-\u097F]/u);
   }
  }
 }
});


test('Four new short connected books are three chapters with usable bilingual quizzes',()=>{
 const ctx={window:{}};
 vm.runInNewContext(read('bilingual-story-library.js'),ctx,{timeout:2000});
 const quick=ctx.window.__sikauExtraStoryBooks.filter(b=>b.chapters.length===3);
 assert.equal(quick.length,6);
 assert.deepEqual(Array.from(quick,b=>b.title),[
  'The Last Bus Home','The Red Umbrella','The Midnight Bakery','The Secret Seed',
  'The Mysterious House','A Visit to Bhaktapur'
 ]);
 for(const story of quick){
  assert.match(story.neTitle,/[\u0900-\u097F]/u);
  for(const chapter of story.chapters){
   assert.equal(chapter.paragraphs.length,2);
   assert.equal(chapter.questions.length,2);
   for(const [english,nepali] of chapter.paragraphs){
    assert.ok(english.length>=60);
    assert.match(nepali,/[\u0900-\u097F]/u);
   }
  }
 }
 assert.match(source,/categories=\['All','Quick Reads'/);
 assert.match(source,/category==='Quick Reads'\?book\.chapters\.length>3/);
 assert.match(source,/⚡ Quick read/);
});

test('Every quiz choice has an unmistakable custom selection indicator',()=>{
 assert.match(source,/sikau-featured-radio/);
 assert.match(source,/sikau-featured-choice-marker/);
 assert.match(source,/sikau-featured-choice-state/);
 assert.match(source,/✓ Selected · छानियो/);
 assert.match(source,/updateAnswerCount\(\)/);
 assert.match(source,/Tap ONE answer for each question/);
 assert.match(source,/c\.questions\.some\(\(_q,i\)=>!Number\.isInteger\(answers\[i\]\)\)/);
 assert.match(styles,/sikau-featured-option:has\(input:checked\)/);
 assert.match(styles,/sikau-featured-option:focus-within/);
 assert.match(styles,/sikau-featured-choice-marker/);
 assert.match(styles,/data-sikau-theme="dark"/);
 assert.match(source,/featured-bilingual-story\.css\?v=20261030-quiz-cards-r4/);
});


test('Two new culturally grounded short books have complete chapters and answer keys',()=>{
 const context={window:{}};
 vm.runInNewContext(read('bilingual-story-library.js'),context,{timeout:2000});
 const extra=context.window.__sikauExtraStoryBooks;
 const newBooks=extra.slice(-2);
 assert.deepEqual(Array.from(newBooks,b=>b.id),['mysterious-house','visit-to-bhaktapur']);
 for(const book of newBooks){
  assert.equal(book.chapters.length,3);
  assert.match(book.neTitle,/[\u0900-\u097f]/);
  for(const chapter of book.chapters){
   assert.equal(chapter.paragraphs.length,2);
   assert.equal(chapter.questions.length,2);
   for(const pair of chapter.paragraphs){
    assert.ok(pair[0].length>65);
    assert.match(pair[1],/[\u0900-\u097f]/);
   }
   for(const question of chapter.questions){
    assert.equal(question.choices.length,3);
    assert.ok(question.answer>=0&&question.answer<=2);
   }
  }
 }
 assert.match(source,/LIBRARY\.length\+' books · '\+String\(LIBRARY\.length\)\.replace/);
});

test('Reading mode choice cards explain their purpose and keep native buttons intact',()=>{
 const css=read('reading-dashboard.css');
 assert.match(dashboard,/b\.replaceChildren\(icon,copy,arrow\)/);
 assert.match(dashboard,/b\.dataset\.rm==='story'/);
 assert.match(dashboard,/Story mode · कथा पढौं/);
 assert.match(dashboard,/Practice mode · अभ्यास/);
 assert.match(dashboard,/Chapter books & quizzes/);
 assert.match(dashboard,/Short passages & quick questions/);
 assert.match(dashboard,/syncModeState\(\)/);
 assert.match(css,/#readModeSeg \.read-mode-card/);
 assert.match(css,/#readModeSeg \.read-mode-card \*\{pointer-events:none!important\}/);
 assert.match(css,/\.read-mode-card\.on/);
 assert.match(css,/@media\(max-width:740px\)/);
 assert.match(css,/data-sikau-theme="dark"/);
 assert.match(index,/reading-dashboard\.js\?v=20261030-clean-toolbar-r8/);
});


test('Reading uses one compact native topic/level toolbar and bilingual sentence audio',()=>{
 const practice=read('practice-bilingual-reading.js');
 const practiceCss=read('practice-bilingual-reading.css');
 const readingCss=read('reading-dashboard.css');
 assert.match(index,/practice-bilingual-reading\.js\?v=20261030-minimal-navigation-r3/);
 assert.match(index,/reading-dashboard\.js\?v=20261030-clean-toolbar-r8/);
 assert.match(dashboard,/enhancePracticeBilingualReading\?\.\(d\)/);
 assert.match(practice,/rd\.querySelectorAll\('\.rs'\)/);
 assert.match(practice,/button\[data-rm="practice"\]\.on/);
 assert.match(practice,/revealed\.add\(e\.nativeNe\)/);
 assert.match(practice,/e\.nativeNe\.click\(\)/);
 assert.match(practice,/sikau-practice-source-hidden/);
 assert.match(practice,/translationFrom\(e\)/);
 assert.match(practice,/sikau-practice-english/);
 assert.match(practice,/sikau-practice-nepali/);
 assert.match(practice,/speakerButton\('🔊 Listen','en-US',e\)/);
 assert.match(practice,/speakerButton\('🔊 सुन्नुहोस्','ne-NP',e\)/);
 assert.doesNotMatch(practice,/const nativeNav=|const renderNav=|nav=mk\(doc/);
 assert.doesNotMatch(practiceCss,/sikau-practice-nav-action/);
 assert.match(readingCss,/button\.sikau-topic-action::after/);
 assert.match(readingCss,/content:"New topic"!important/);
 assert.match(readingCss,/content:"Easier"!important/);
 assert.match(readingCss,/content:"Harder"!important/);
 assert.match(readingCss,/@media\(max-width:700px\)/);
 assert.match(readingCss,/data-sikau-theme="dark"/);
 assert.match(practiceCss,/grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
 assert.match(dashboard,/installReadCornerCleanup\(d\)/);
 assert.match(dashboard,/Nepal\\s\*English\\s\*Corner/);
 assert.doesNotMatch(practice,/innerHTML|updatePrefs|createExecution|updateDocument/);
});
