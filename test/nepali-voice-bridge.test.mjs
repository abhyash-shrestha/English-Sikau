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
  querySelector(selector){
   return selector==='.sikau-nepali-voice-status'&&
     this.last?.className==='sikau-nepali-voice-status'?this.last:null;
  },querySelectorAll(){return[]}
 }]));
 const win={speechSynthesis:synth,SpeechSynthesisUtterance:class {constructor(text){this.text=text;this.lang='';this.voice=null;}}};
 const doc={body:{},defaultView:win,
  getElementById:key=>sections[key],
  createElement:()=>({className:'',style:{},children:[],appendChild(node){this.children.push(node);},setAttribute(){},textContent:''}),
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

test('English must not silently switch to another gender when Male is selected',()=>{
 const {win,speaks,synth,sections}=mock([sagar]);
 win.__sikauNepaliVoice.select('tr','male');
 synth.speak({lang:'en-US',text:'Hello!'});
 assert.deepEqual(speaks.map(x=>x.text),[]);
 assert.match(sections.tr.last.textContent,/No male English voice is available/);
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
 assert.match(app,/reading-dashboard\.js\?v=20261030-voice-gender-r1/);
 assert.match(app,/nepali-voice-bridge\.js\?v=20261030-voice-gender-r1/);
 assert.match(app,/translate-studio-v4\.js\?v=20261030-voice-gender-r1/);
 assert.match(reading,/enhanceNepaliSpeechVoices\?\.\(d\)/);
 assert.match(reading,/nepali-voice-bridge\.js\?v=20261030-voice-gender-r1/);
 assert.match(translate,/__sikauNepaliVoice\.speakText/);
 assert.match(translate,/const outputLanguage=nativeDirection\(sec\)==='ne'\?'en-US':'ne-NP'/);
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

test('Do not pretend a gender-unknown Nepali voice is female',()=>{
 const generic={name:'Nepali Standard',lang:'ne-NP'};
 const {win,synth,speaks,sections}=mock([generic]);
 win.__sikauNepaliVoice.select('rd','female');
 synth.speak({lang:'ne-NP',text:'नमस्कार',voice:null});
 assert.equal(speaks.length,0);
 assert.match(sections.rd.last.textContent,/No female Nepali voice is available/);
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

test('English Male/Female actually changes voice on Windows and Apple with named voices',()=>{
 const ava={lang:'en-US',name:'Microsoft Ava Online (Natural)'};
 const andrew={lang:'en-US',name:'Microsoft Andrew Online (Natural)'};
 const samantha={lang:'en-US',name:'Samantha'};
 const daniel={lang:'en-GB',name:'Daniel'};
 for(const voices of [[ava,andrew],[samantha,daniel]]){
  const {win,synth,speaks}=mock(voices);
  win.__sikauNepaliVoice.select('tr','female');
  synth.speak({lang:'en-US',text:'Hello, I am a woman'});
  win.__sikauNepaliVoice.select('tr','male');
  synth.speak({lang:'en-US',text:'Hello, I am a man'});
  assert.equal(speaks.length,2);
  assert.equal(win.__sikauNepaliVoice.englishGender(voices.find(v=>v.name===speaks[0].voice)),'female');
  assert.equal(win.__sikauNepaliVoice.englishGender(voices.find(v=>v.name===speaks[1].voice)),'male');
 }
});

test('English Male must never silently use a female voice if male is not installed',()=>{
 const {win,synth,speaks,sections}=mock([{name:'Samantha',lang:'en-US'}]);
 win.__sikauNepaliVoice.select('tr','male');
 synth.speak({lang:'en-US',text:'A new sentence'});
 assert.equal(speaks.length,0);
 assert.match(sections.tr.last.textContent,/No male English voice is available/);
});

test('No Nepali language voice means no Hindi or English fallback on Android',()=>{
 const {win,synth,speaks,sections}=mock([
  {name:'Google Hindi India',lang:'hi-IN'},
  {name:'Google US English',lang:'en-US'}
 ]);
 win.__sikauNepaliVoice.select('tr','female');
 assert.equal(win.__sikauNepaliVoice.speakText('नमस्ते, नेपाल!','ne-NP','tr'),false);
 synth.speak({lang:'ne-NP',text:'नेपाल सुन्दर छ।'});
 assert.equal(speaks.length,0);
 assert.match(sections.tr.last.textContent,/No female Nepali voice is available/);
});

test('Translate explicitly calls verified voice routing on every device, not only iPhone',()=>{
 assert.match(translate,/v\.__sikauNepaliVoice\.speakText\(txt,outputLanguage,'tr'\)/);
 assert.doesNotMatch(translate,/const isIphone=/);
 assert.match(translate,/Selected voice unavailable on this device/);
});

test('Android gender-unknown Nepali voice can be explicitly played without using Hindi',()=>{
 const androidNepali={name:'Google नेपाली',lang:'ne-NP'};
 const {win,synth,speaks,sections}=mock([
  {name:'Google हिन्दी',lang:'hi-IN'},androidNepali
 ]);
 const player=win.__sikauNepaliVoice;
 player.select('tr','female');
 assert.equal(player.speakText('नेपालमा स्वागत छ','ne-NP','tr'),false);
 assert.equal(speaks.length,0);
 const button=sections.tr.last.children.find(x=>x.className==='sikau-nepali-voice-use-device');
 assert.ok(button,'Offers optional device Nepali voice when gender is unknown');
 assert.match(button.textContent,/gender not verified/i);
 button.onclick();
 assert.equal(speaks.length,1);
 assert.equal(speaks[0].text,'नेपालमा स्वागत छ');
 assert.equal(speaks[0].voice,'Google नेपाली');
 assert.equal(player.useUnspecifiedNepali('tr'),true);
 assert.equal(player.speakText('आज राम्रो दिन हो।','ne-NP','tr'),true);
 assert.equal(speaks.length,2);
 assert.equal(speaks[1].voice,'Google नेपाली');
 // Changing Male/Female invalidates the one-time unknown-gender preference.
 player.select('tr','male');
 assert.equal(player.useUnspecifiedNepali('tr'),false);
 assert.equal(player.speakText('भोलि भेटौँला','ne-NP','tr'),false);
});

test('No Nepali voice never offers a Hindi-labeled fallback button',()=>{
 const {win,sections}=mock([{name:'Google Hindi',lang:'hi-IN'}]);
 win.__sikauNepaliVoice.select('tr','female');
 assert.equal(win.__sikauNepaliVoice.speakText('नमस्कार','ne-NP','tr'),false);
 assert.equal(sections.tr.last.children.length,0);
 assert.match(sections.tr.last.textContent,/Install voice data/);
});
