import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const bridge=fs.readFileSync(new URL('../nepali-voice-bridge.js',import.meta.url),'utf8');
const reading=fs.readFileSync(new URL('../reading-dashboard.js',import.meta.url),'utf8');
const translate=fs.readFileSync(new URL('../translate-studio-v4.js',import.meta.url),'utf8');
const app=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
function mock(voices){
 const speaks=[],events={};
 const synth={
  getVoices(){return voices;},
  speak(utterance){speaks.push({text:utterance.text,voice:utterance.voice?.name||'',lang:utterance.lang});},
  cancel(){},addEventListener(){}
 };
 const sections=Object.fromEntries(['tr','rd'].map(key=>[key,{
  last:null,appendChild(node){this.last=node;},
  querySelector(){return null;},querySelectorAll(){return[]}
 }]));
 const win={speechSynthesis:synth,SpeechSynthesisUtterance:class {constructor(text){this.text=text;this.lang='';this.voice=null;}}};
 const doc={body:{},defaultView:win,
  getElementById:key=>sections[key],
  createElement:()=>({className:'',style:{},setAttribute(){},textContent:''}),
  addEventListener:(key,callback)=>{events[key]=callback}
 };
 const sandbox={window:win,console};
 vm.runInNewContext(bridge,vm.createContext(sandbox),{timeout:2000});
 assert.equal(win.enhanceNepaliSpeechVoices(doc),true);
 return {win,synth,speaks,sections,events};
}
const hemkala={lang:'ne-NP',name:'Microsoft Hemkala Online (Natural)'};
const sagar={lang:'ne-NP',name:'Microsoft Sagar Online (Natural)'};

test('Female Nepali voice remains on the original browser path',()=>{
 const {win,speaks,synth}=mock([hemkala,sagar]);
 win.__sikauNepaliVoice.select('rd','female');
 synth.speak({lang:'ne-NP',text:'नमस्कार'});
 assert.equal(speaks.length,1);
 assert.equal(speaks[0].voice,'');
});

test('Reading native male route selects Sagar instead of Hemkala',()=>{
 const {win,speaks,synth}=mock([hemkala,sagar]);
 win.__sikauNepaliVoice.select('rd','male');
 synth.speak({lang:'ne-NP',text:'नमस्कार'});
 assert.equal(speaks.length,1);
 assert.equal(speaks[0].voice,sagar.name);
 assert.equal(speaks[0].lang,'ne-NP');
});

test('When no genuine male voice exists, do not secretly play female',()=>{
 const {win,speaks,synth,sections}=mock([hemkala]);
 win.__sikauNepaliVoice.select('rd','male');
 synth.speak({lang:'ne-NP',text:'नमस्कार'});
 assert.equal(speaks.length,0);
 assert.match(sections.rd.last.textContent,/Male Nepali voice unavailable/);
});

test('English playback stays unchanged even with male Nepali selected',()=>{
 const {win,speaks,synth}=mock([sagar]);
 win.__sikauNepaliVoice.select('tr','male');
 synth.speak({lang:'en-US',text:'Hello!'});
 assert.deepEqual(speaks.map(x=>x.text),['Hello!']);
});

test('Female and male UI labels are recognized separately',()=>{
 const {win}=mock([hemkala,sagar]);
 const {genderOf}=win.__sikauNepaliVoice;
 assert.equal(genderOf('Female · महिला'),'female');
 assert.equal(genderOf('Male · पुरुष'),'male');
 assert.equal(genderOf('महिला आवाज'),'female');
 assert.equal(genderOf('पुरुष आवाज'),'male');
 assert.equal(genderOf('I prefer shopping at a mall'),null);
});

test('Both protected tabs actually install and use the voice guard',()=>{
 assert.match(app,/reading-dashboard\.js\?v=20261029-ne-voice-r1/);
 assert.match(app,/nepali-voice-bridge\.js\?v=20261029-ne-male-r3/);
 assert.match(app,/translate-studio-v4\.js\?v=20261029-ne-voice-r1/);
 assert.match(reading,/enhanceNepaliSpeechVoices\?\.\(d\)/);
 assert.match(reading,/nepali-voice-bridge\.js\?v=20261029-ne-male-r3/);
 assert.match(translate,/__sikauNepaliVoice\?\.speakNepali/);
 assert.match(translate,/if\(outputLanguage==='ne-NP'/);
});


test('Clicking Male after Female switches to a true Nepali male voice, then back',()=>{
 const {win,synth,speaks,events}=mock([hemkala,sagar]);
 const root={closest:()=>root};
 function button(label,gender){
  return {
   tagName:'BUTTON',value:gender,id:'gender-'+gender,textContent:label,
   getAttribute(key){return key==='data-gender'?gender:null},
   closest(selector){
    if(selector==='#tr,#rd,#learn')return root;
    if(selector==='button,label,input,select,[role="radio"],[role="button"]')return this;
    return null;
   }
  };
 }
 // The synthetic root resolves to Translate for both clicks.
 root.closest=(selector)=>selector==='#tr'?root:null;
 const female=button('Female · महिला','female'),male=button('Male · पुरुष','male');
 events.click({target:female});
 synth.speak({lang:'ne-NP',text:'नमस्ते'});
 events.click({target:male});
 synth.speak({lang:'ne-NP',text:'नमस्ते'});
 events.click({target:female});
 synth.speak({lang:'ne-NP',text:'नमस्ते'});
 assert.equal(speaks.length,3);
 assert.equal(speaks[0].voice,'');
 assert.equal(speaks[1].voice,sagar.name);
 assert.equal(speaks[2].voice,'');
 assert.equal(win.__sikauNepaliVoice.maleSelected('tr'),false);
});

test('Native control attributes are checked before misleading parent labels',()=>{
 const {win}=mock([hemkala,sagar]);
 const control={
  tagName:'BUTTON',value:'male',
  textContent:'Female · महिला / Male · पुरुष',
  getAttribute:key=>key==='data-gender'?'male':null,
  matches:()=>false
 };
 assert.equal(win.__sikauNepaliVoice.controlGender(control),'male');
});
