import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=name=>fs.readFileSync(new URL('../'+name,import.meta.url),'utf8');
const progress=read('progress-dashboard.js'),reading=read('reading-dashboard.js'),writing=read('writing-coach-dashboard.js');
const p=vm.runInNewContext(progress.slice(progress.indexOf('const safeCount='),progress.indexOf('window.enhanceProgressDashboard='))+';({readProgress})');
test('Progress reads actual rendered counters when the lesson state is closure scoped',()=>{
 const data=p.readProgress({textContent:'📅 १ दिन🔤 १२ अनुवाद🎤 3✍️ 4📝 100%📖 5📗 6/80 chapters📚 7 शब्द'});
 assert.deepEqual(JSON.parse(JSON.stringify(data)),{words:7,passed:6,reading:5,writing:4,speaking:3,translated:12,days:null,dayCount:1});
 assert.equal(p.readProgress({textContent:'Loading…'}),null);
 const partial=p.readProgress({textContent:'📖 2'});
 assert.equal(partial.reading,2);assert.equal(partial.writing,null);assert.equal(partial.days,null);
});
test('Progress keeps recorded state and chapter pass threshold when it is available',()=>{
 const data=p.readProgress({textContent:''},{words:{hello:{}},course:{best:{a:70,b:69,c:100}},rd:4,hwT:3,sp:2,tr:1,days:{'2026-10-30':true}});
 assert.equal(data.passed,2);assert.equal(data.words,1);assert.equal(data.reading,4);assert.equal(data.days[0],'2026-10-30');
});
const proof=vm.runInNewContext(writing.slice(writing.indexOf('const BASIC_RULES='),writing.indexOf('function getModelAnswer'))+';({polishWriting,basicTips})');
test('Writing applies the corrections it teaches, retaining the learner’s meaning',()=>{
 const draft='My dream job is be a teacher. I enjoys helping children learn new things. I need patience.';
 assert.equal(proof.polishWriting(draft),'My dream job is to be a teacher. I enjoy helping children learn new things. I need patience.');
 const tips=proof.basicTips(draft);
 assert.ok(tips.some(t=>t.after==='My dream job is to be'));
 assert.ok(tips.some(t=>t.after==='I enjoy'));
 assert.equal(proof.polishWriting('He enjoys teaching. My dream job is to be a teacher.'),'He enjoys teaching. My dream job is to be a teacher.');
 assert.equal(proof.polishWriting('They are being kind.'),'They are being kind.');
});
function storyFixture(store=new Map(),account='studentA'){
 let listener,observer;const queue=[];let chapter=1,score='',quizClicks=0,note=null;
 const node=(id='')=>({id,textContent:'',children:[],dataset:{},setAttribute(){},append(n){note=n},scrollIntoView(){},getAttribute(){return null}});
 const next=node('storyNext');next.parentElement=node();
 const quiz=node('storyQuiz');quiz.click=()=>{quizClicks++;score=''};
 const selectors={
  '[data-storybook].on':{getAttribute:()=> 'adventure-0'},
  '[data-storylevel].on':{getAttribute:()=> '1'},
  '#storyCurrentChapterTitle':{get textContent(){return 'Chapter '+chapter+': A test story'}},
  '#storyNext':next,'#storyQuiz':quiz,'#storyQuizResult':{get textContent(){return score}}
 };
 const box={dataset:{},textContent:'',querySelector:s=>s==='#sikauStoryGate'?note:(selectors[s]||null),querySelectorAll:()=>[],addEventListener:(name,fn)=>listener=fn};
 const doc={createElement:()=>node(),defaultView:{localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},requestAnimationFrame:fn=>queue.push(fn),MutationObserver:class{constructor(fn){observer=fn}observe(){}}}};
 const code=reading.slice(reading.indexOf('function storyIdentity'),reading.indexOf('window.enhanceReadingDashboard='));
 const api=vm.runInNewContext(code+';({installReadingRepairs,passedStoryResult})',{mk:()=>node()});
 api.installReadingRepairs(doc,box,account);
 const click=id=>{let blocked=false;listener({target:{closest:()=>({id})},preventDefault(){blocked=true},stopImmediatePropagation(){}});return blocked};
 const flush=()=>{while(queue.length)queue.shift()()};
 return {click,flush,api,get quizClicks(){return quizClicks},score:n=>{score=n},chapter:n=>{chapter=n},notify:()=>{observer();flush()}};
}
test('A story cannot advance before its own 100% quiz result',()=>{
 const f=storyFixture();
 assert.equal(f.click('storyNext'),true);assert.equal(f.quizClicks,1);
 f.click('storyCheckQuiz');f.score('50% — review your answers');f.flush();
 assert.equal(f.click('storyNext'),true);
 f.click('storyCheckQuiz');f.score('100% 🎉 Perfect!');f.flush();
 assert.equal(f.click('storyNext'),false);
 f.chapter(2);f.notify();assert.equal(f.click('storyNext'),true);
 assert.equal(f.api.passedStoryResult('Get 100% to continue'),false);
});
test('Story quiz passes survive reload and remain isolated between accounts',()=>{
 const store=new Map(),first=storyFixture(store);
 first.click('storyQuiz');first.click('storyCheckQuiz');first.score('100%');first.flush();
 assert.equal(storyFixture(store).click('storyNext'),false);
 assert.equal(storyFixture(store,'studentB').click('storyNext'),true);
});
test('Every public festival has reviewed Nepali help without changing quiz scoring',()=>{
 const window={};vm.runInNewContext(read('festival-stories.js'),{window});
 const stories=Object.values(window.EnglishSikauFestivalStories);assert.equal(stories.length,15);
 for(const story of stories){
  for(const field of ['summaryNe','factNe','exampleNe'])assert.match(story[field],/[\u0900-\u097f]/);
  assert.equal(story.quizNe.length,story.quiz.length);
  for(const [q,why] of story.quizNe){assert.match(q,/[\u0900-\u097f]/);assert.match(why,/[\u0900-\u097f]/);}
 }
});
test('Nepali UI help leaves English exercise answers and learner data untouched',()=>{
 const source=read('learner-nepali-support.js');
 const code=source.slice(source.indexOf('const copy='),source.indexOf('window.enhanceNepaliLearnerSupport='));
 const {helpFor}=vm.runInNewContext(code+';({helpFor})');
 assert.match(helpFor('Next exercise'),/अभ्यास/);
 assert.equal(helpFor('I did not go there.'),'');
 assert.equal(helpFor('are'),'');
 assert.equal(helpFor('They ___ happy.'),'');
 assert.doesNotMatch(source,/\bfetch\(|localStorage|createExecution|updateDocument/);
});
