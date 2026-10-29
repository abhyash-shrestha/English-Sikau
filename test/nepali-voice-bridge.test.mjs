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
 assert.equal(speaks[0].voice,hemkala.name);
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
 assert.match(sections.rd.last.textContent,/No male Nepali voice is available/);
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
 assert.match(app,/reading-dashboard\.js\?v=20261029-expressive-neural-r4/);
 assert.match(app,/nepali-voice-bridge\.js\?v=20261029-expressive-neural-r7/);
 assert.match(app,/translate-studio-v4\.js\?v=20261029-ne-voice-r1/);
 assert.match(reading,/enhanceNepaliSpeechVoices\?\.\(d\)/);
 assert.match(reading,/nepali-voice-bridge\.js\?v=20261029-expressive-neural-r7/);
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
 assert.equal(speaks[0].voice,hemkala.name);
 assert.equal(speaks[1].voice,sagar.name);
 assert.equal(speaks[2].voice,hemkala.name);
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


test('Choose native male voice from same provider as Hemkala when it exists',()=>{
 const googleMale={lang:'ne-NP',name:'Google Nepali Male'};
 const {win}=mock([googleMale,hemkala,sagar]);
 const report=win.__sikauNepaliVoice.voiceReport();
 assert.equal(report.identifiedFemale,hemkala.name);
 assert.equal(report.male,sagar.name);
 assert.equal(report.available.length,3);
});

test('Do not classify a female Nepali voice as male',()=>{
 const {win}=mock([hemkala,{lang:'ne-NP',name:'Nepali Female'}]);
 assert.equal(win.__sikauNepaliVoice.available(),false);
 assert.equal(win.__sikauNepaliVoice.voiceReport().male,null);
});

test('Recognize clearly labeled Nepali male voices from other browser providers',()=>{
 const {win}=mock([{lang:'ne-NP',name:'Google Nepali Male'}]);
 assert.equal(win.__sikauNepaliVoice.available(),true);
 assert.equal(win.__sikauNepaliVoice.voiceReport().male,'Google Nepali Male');
});


test('Windows chooses a natural English voice over its robotic fallback',()=>{
 const natural={name:'Microsoft Ava Online (Natural)',lang:'en-US'};
 const fred={name:'Fred',lang:'en-US'};
 const {win,synth,speaks}=mock([fred,natural]);
 synth.speak({lang:'en-US',text:'Hello, how are you?',voice:null});
 assert.equal(speaks.length,1);
 assert.equal(speaks[0].voice,natural.name);
 assert.equal(win.__sikauNepaliVoice.voiceChoiceReport().english,natural.name);
});

test('Apple prefers human-like English voice instead of Fred',()=>{
 const fred={name:'Fred',lang:'en-US'};
 const samantha={name:'Samantha',lang:'en-US'};
 const {synth,speaks}=mock([fred,samantha]);
 synth.speak({lang:'en-US',text:'Read the next sentence',voice:null});
 assert.equal(speaks[0].voice,'Samantha');
});

test('When Apple exposes only a novelty voice, preserve browser default',()=>{
 const fred={name:'Fred',lang:'en-US'};
 const {synth,speaks}=mock([fred]);
 synth.speak({lang:'en-US',text:'Reading practice',voice:null});
 assert.equal(speaks[0].voice,'');
});

test('Use Hemkala natural Nepali female if browser exposes her explicitly',()=>{
 const nepaliGeneric={name:'Nepali Standard',lang:'ne-NP'};
 const {win,synth,speaks}=mock([nepaliGeneric,hemkala]);
 win.__sikauNepaliVoice.select('tr','female');
 synth.speak({lang:'ne-NP',text:'नमस्कार',voice:null});
 assert.equal(speaks[0].voice,hemkala.name);
});

test('Keep original Nepali female output if no positively identified better voice exists',()=>{
 const generic={name:'Nepali Standard',lang:'ne-NP'};
 const {win,synth,speaks}=mock([generic]);
 win.__sikauNepaliVoice.select('rd','female');
 synth.speak({lang:'ne-NP',text:'नमस्कार',voice:null});
 assert.equal(speaks.length,1);
 assert.equal(speaks[0].voice,'');
});


test('iPhone direct speech API works without replacing native synthesis.speak',()=>{
 const voice={name:'Samantha',lang:'en-US'};
 const {win,speaks}=mock([voice]);
 const player=win.__sikauNepaliVoice;
 assert.equal(typeof player.speakText,'function');
 assert.equal(player.speakText('Hello from iPhone','en-US','tr'),true);
 assert.equal(speaks.length,1);
 assert.equal(speaks[0].text,'Hello from iPhone');
 assert.equal(speaks[0].voice,'Samantha');
});

test('iPhone direct route preserves the existing Nepali female voice',()=>{
 const {win,speaks}=mock([hemkala]);
 const player=win.__sikauNepaliVoice;
 player.select('tr','female');
 assert.equal(player.speakText('नमस्कार','ne-NP','tr'),true);
 assert.equal(speaks.length,1);
 assert.equal(speaks[0].voice,hemkala.name);
});

test('iPhone direct route never substitutes female voice for unavailable male Nepali',()=>{
 const {win,speaks,sections}=mock([hemkala]);
 const player=win.__sikauNepaliVoice;
 player.select('tr','male');
 assert.equal(player.speakText('नमस्कार','ne-NP','tr'),false);
 assert.equal(speaks.length,0);
 assert.match(sections.tr.last.textContent,/No male Nepali voice is available/);
});
