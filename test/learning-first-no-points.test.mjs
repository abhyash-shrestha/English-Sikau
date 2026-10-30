import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source=path=>fs.readFileSync(new URL('../'+path,import.meta.url),'utf8');
const progress=source('progress-dashboard.js');
const progressStyle=source('progress-dashboard.css');
const nepal=source('nepal-explorer.js');
const nepalStyle=source('nepal-explorer.css');
const game=source('game-adventure.js');
const gameStyle=source('game-adventure.css');
const index=source('index.html');
const coach=source('coach-dashboard.js');

test('All edited JavaScript files remain syntactically valid',()=>{
 for(const [name,code] of Object.entries({progress,nepal,game,coach})){
  assert.doesNotThrow(()=>new Function(code),'Syntax error in '+name);
 }
});

test('Progress uses authentic learning activity, not XP, streak, or badge cards',()=>{
 for(const phrase of ['Chapters Completed','Words Saved','Reading Practice','Writing Practice',
  'Practice This Week','Your Learning Activity'])
  assert.ok(progress.includes(phrase),phrase);
 for(const phrase of ['Total XP','Day Streak','Mastery points','Achievements','First XP','xp.toLocaleString'])
  assert.ok(!progress.includes(phrase),'Retired UI still present: '+phrase);
 assert.match(progressStyle,/#pg\.sikau-learning-first #pgo\{display:none!important\}/);
 assert.match(progress,/native\.hidden=true/);
 assert.match(index,/'sikauProgressCSS','nepalExplorerStyle','sikauGameStyle'/);
 assert.match(progress,/\bconst passed=Object\.values\(scores\)\.filter/);
 assert.match(progress,/\bconst words=state\.words/);
 assert.match(progress,/\bconst reading=safeCount\(state\.rd\)/);
});

test('No redundant Learning activity control or expandable panel in top bar',()=>{
 assert.doesNotMatch(index,/id="cloudStoryToggle"/);
 assert.doesNotMatch(index,/id="cloudStoryProgress"/);
 assert.doesNotMatch(index,/id="cloudStoryRefresh"/);
 assert.doesNotMatch(index,/Learning activity · मेरो सिकाइ/);
 assert.doesNotMatch(index,/\$\('cloudStoryToggle'\)\.addEventListener/);
 assert.doesNotMatch(index,/refreshCloudStoryProgress\(\)/);
 assert.match(index,/id="lessonFrame"/);
 assert.match(index,/id="sikauThemeProtected"/);
 assert.match(index,/id="exit"/);
 assert.match(index,/window\.__englishSikauReadVerifiedProgress = async function/);
});

test('Game removes point HUD but keeps gameplay and district scoring',()=>{
 assert.match(gameStyle,/#game\.sikau-game-adventure \.game-banner \.game-hud\{display:none!important\}/);
 assert.match(game,/installLightningTiming\(d\)/);
 assert.match(game,/installAnswerVerdicts\(d,host\)/);
 assert.match(nepal,/function missionScore\(gameRoot\)/);
 assert.match(nepal,/Mission accomplished\|Mission complete\|Mission cleared\|Quest complete/);
 assert.doesNotMatch(game,/collect stars and reach Everest/i);
});

test('Nepal Explorer keeps all 77 districts and map unlocks',()=>{
 assert.match(nepal,/j\.districts\.length!==77/);
 assert.match(nepal,/counter\.textContent=complete\+" \/ 77 districts"/);
 assert.match(nepal,/const CLAIM_STAMPS=3/);
 assert.match(nepal,/const STORE="english-sikau-nepal-explorer-v1:"/);
 assert.match(nepal,/Finish an English mission with at least 80% correct to add a map piece/);
 assert.match(nepal,/Add today's Nepal map piece/);
 assert.doesNotMatch(nepal,/Explorer points & stamp|\+" Explorer points!|state\.points/);
 assert.match(nepalStyle,/#game \.ne-stats\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)!important\}/);
});

function mapFunctions(){
 const start=nepal.indexOf('const CLAIM_STAMPS=3;');
 const end=nepal.indexOf('function drawMap(',start);
 assert.ok(start>0&&end>start);
 const code=nepal.slice(start,end);
 const scope=vm.createContext({Intl,Date,Number,Math,Object,Array,Set,Error});
 return vm.runInContext(code+'\n({normalize,completed,currentDistrict,earnedTotal,award})',scope);
}
test('Legacy save migration removes points but retains finished districts',()=>{
 const {normalize,earnedTotal}=mapFunctions();
 const old={days:{KATHMANDU:['2026-10-01','2026-10-02','2026-10-03'],
  BHAKTAPUR:['2026-10-04','2026-10-05']},points:275,lastDay:'2026-10-05'};
 const current=normalize(old);
 assert.equal(Object.hasOwn(current,'points'),false);
 assert.equal(current.days.KATHMANDU.length,3);
 assert.equal(current.days.BHAKTAPUR.length,2);
 assert.equal(current.lastDay,'2026-10-05');
 assert.equal(earnedTotal([{id:'KATHMANDU'},{id:'BHAKTAPUR'}],current),1);
});

test('Three successful missions on distinct dates unlock the next district without points',()=>{
 const {award,normalize,earnedTotal,currentDistrict}=mapFunctions();
 const route=[{id:'KATHMANDU'},{id:'BHAKTAPUR'}];
 let state=normalize(null);
 const low=award(route,state,'2026-10-01',79);
 assert.equal(low.ok,false);
 assert.equal(low.reason,'score');
 const first=award(route,state,'2026-10-01',80);
 assert.equal(first.ok,true);
 assert.equal(first.unlocked,false);
 assert.equal(Object.hasOwn(first,'points'),false);
 assert.equal(Object.hasOwn(first.state,'points'),false);
 state=first.state;
 const twice=award(route,state,'2026-10-01',100);
 assert.equal(twice.ok,false);
 assert.equal(twice.reason,'daily');
 state=award(route,state,'2026-10-02',100).state;
 const third=award(route,state,'2026-10-03',80);
 assert.equal(third.ok,true);
 assert.equal(third.unlocked,true);
 assert.equal(earnedTotal(route,third.state),1);
 assert.equal(currentDistrict(route,third.state).id,'BHAKTAPUR');
});

test('Latest learning-focused script and stylesheet versions are used',()=>{
 for(const path of [
  './progress-dashboard.js?v=20261030-learner-audit-r2',
  './game-adventure.js?v=20261030-no-rewards-r1',
  './nepal-explorer.js?v=20261030-districts-no-points-r1'])
  assert.ok(index.includes(path),path);
 assert.match(progress,/progress-dashboard\.css\?v=20261030-learner-audit-r2/);
 assert.match(game,/game-adventure\.css\?v=20261030-no-rewards-r1/);
 assert.match(nepal,/nepal-explorer\.css\?v=20261030-districts-no-points-r1/);
});

