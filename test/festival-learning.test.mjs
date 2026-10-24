import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const storyJs=fs.readFileSync(new URL('../festival-stories.js',import.meta.url),'utf8');
const festivalJs=fs.readFileSync(new URL('../festival-dashboard-preview.js',import.meta.url),'utf8');
const festivalCss=fs.readFileSync(new URL('../festival-dashboard-preview.css',import.meta.url),'utf8');

const window={};
vm.runInNewContext(storyJs,{window});
const stories=window.EnglishSikauFestivalStories;

function extract(name,after){
 const regex=new RegExp('const '+name+'=(\\[[\\s\\S]*?\\]);\\s*'+after);
 const match=html.match(regex);
 assert.ok(match,'Missing calendar array '+name);
 return vm.runInNewContext(match[1]);
}
const events=[...extract('SIKAU_FESTIVAL_PREVIEW','function sikauFestivalPreview'),
 ...extract('SIKAU_NEXT_FESTIVALS','const SIKAU_FESTIVAL_MONTHS')];
function kind(name){
 const s=name.toLowerCase();
 if(s.includes('dashain'))return 'dashain';
 if(s.includes('tihar'))return 'tihar';
 if(s.includes('chhath'))return 'chhath';
 if(s.includes('tamu lhosar'))return 'tamu';
 if(s.includes('sonam lhosar'))return 'sonam';
 if(s.includes('gyalpo lhosar'))return 'gyalpo';
 if(s.includes('prithvi'))return 'prithvi';
 if(s.includes('maghe')||s.includes('maghi'))return 'maghe';
 if(s.includes('shivaratri'))return 'shivaratri';
 if(s.includes('fagu')||s.includes('holi'))return 'holi';
 if(s.includes('yomari')||s.includes('udhauli')||s.includes('dhanya'))return 'yomari';
 if(s.includes('basanta')||s.includes('saraswati'))return 'basanta';
 if(s.includes('democracy'))return 'democracy';
 if(s.includes('ghode'))return 'ghode';
 if(s.includes('new year'))return 'newyear';
 return 'other';
}
function upcoming(day){
 return events.filter(f=>(f.end||f.date)>=day).sort((a,b)=>a.date.localeCompare(b.date));
}

test('each published celebration has a unique date and its own bilingual lesson',()=>{
 assert.equal(events.length,15);
 assert.equal(new Set(events.map(e=>e.name+'|'+e.date)).size,events.length);
 for(const event of events){
  const story=stories[kind(event.name)];
  assert.ok(story,'Missing lesson: '+event.name);
  assert.ok(story.story.length>100,event.name);
  assert.ok(story.ne.length>40,event.name);
  assert.equal(story.moments.length,3,event.name);
  assert.ok(story.words.length>=5,event.name);
  assert.ok(story.quiz.length>=2,event.name);
  assert.ok(story.quiz.every(q=>q[1].length===3&&q[2]>=0&&q[2]<3),event.name);
 }
});
test('expired events disappear and next published events fill upcoming slots',()=>{
 assert.equal(upcoming('2026-10-24')[0].name,'Tihar');
 assert.equal(upcoming('2026-11-12')[0].name,'Tihar','Tihar remains through its last day');
 assert.equal(upcoming('2026-11-13')[0].name,'Chhath');
 assert.equal(upcoming('2026-12-25')[0].name,'Tamu Lhosar');
 assert.equal(upcoming('2027-03-21')[0].name,'Fagu Purnima / Holi');
 assert.equal(upcoming('2027-03-22')[0].name,'Fagu Purnima / Holi');
 assert.equal(upcoming('2027-03-23')[0].name,'Ghode Jatra');
 assert.equal(upcoming('2027-04-07')[0].name,'Nepali New Year 2084');
 assert.equal(upcoming('2027-04-15').length,0,'never invent dates after current published horizon');
});
test('festival page loads its content before dashboard and refreshes in Nepal time',()=>{
 assert.ok(html.indexOf('festival-stories.js?v=20261024-r1')<html.indexOf('festival-dashboard-preview.js?v=20261024-stories-r1'));
 assert.match(festivalJs,/timeZone:'Asia\/Kathmandu'/);
 assert.match(festivalJs,/lastRenderedDay!==todayInNepal\(\)/);
 assert.match(festivalJs,/\.slice\(0,limit\)/);
 assert.match(festivalJs,/if\(!activeFestival\)render\(\)/);
});
test('quiz stays in the UI only and does not award or modify student points',()=>{
 assert.doesNotMatch(festivalJs,/\b(createExecution|updateDocument|GROQ_API_KEY|sikaupaid|XP\s*[+=])\b/);
 assert.match(festivalJs,/Just for practice — no XP or account changes/);
 assert.match(festivalCss,/\.sfd-quiz-choice/);
 assert.match(festivalCss,/data-sikau-theme="dark"/);
});
