import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const read=name=>fs.readFileSync(new URL('../'+name,import.meta.url),'utf8');
const bridge=read('nepali-voice-bridge.js');
const app=read('index.html');
const translate=read('translate-studio-v4.js');
const words=read('words-studio.js');
const reading=read('reading-dashboard.js');
const voices={
 us:{name:'Microsoft Ava Online (Natural)',lang:'en-US'},
 usLow:{name:'Google US English',lang:'en-US'},
 uk:{name:'Daniel',lang:'en-GB'},
 india:{name:'Google English India',lang:'en-IN'},
 nepali:{name:'Microsoft Hemkala Online (Natural)',lang:'ne-NP'},
 nepaliAndroid:{name:'Google नेपाली',lang:'ne-NP'},
 hindi:{name:'Google हिन्दी Hindi India',lang:'hi-IN'}
};

function build(available,{withNative=true}={}){
 const spoken=[],cancelled=[],nodes=[];
 const synth={
  getVoices:()=>available,
  speak(utterance){spoken.push(utterance);return undefined;},
  cancel(){cancelled.push(true)},
  addEventListener(){}
 };
 const make=tag=>({
  tagName:tag.toUpperCase(),className:'',style:{display:'',cssText:''},
  attrs:{},hidden:false,
  setAttribute(key,value){this.attrs[key]=value;},
  getAttribute(key){return this.attrs[key]??null;},
  matches(){return false},
  appendChild(child){this.child=child;},
  querySelector(){return null},
  querySelectorAll(){return[]},
  closest(){return null}
 });
 const root=()=>({
  ...make('section'),children:[],hidden:false,
  querySelector(selector){return selector==='.sikau-simple-voice-status'?
   this.children.find(n=>n.className==='sikau-simple-voice-status')||null:null;},
  querySelectorAll(selector){return this.controls||[]},
  appendChild(element){this.children.push(element)}
 });
 const roots={tr:root(),rd:root(),words:root(),sp:root()};
 const listener={};
 const doc={body:make('body'),defaultView:null,
  createElement(tag){const node=make(tag);nodes.push(node);return node;},
  getElementById(key){return roots[key]||null;},
  addEventListener(name,fn){listener[name]=fn;}
 };
 const originalNative=[];
 const win={
  speechSynthesis:synth,
  SpeechSynthesisUtterance:class{
   constructor(text){this.text=text;this.lang='';this.voice=null;this.pitch=1;this.rate=1;}
  },
  MutationObserver:class{observe(){}},
  requestAnimationFrame(fn){fn();},
  setTimeout(fn){fn();},
  ...(withNative?{speak(text,rate,lang){originalNative.push([text,rate,lang]);}}:{})
 };
 doc.defaultView=win;
 vm.runInNewContext(bridge,vm.createContext({window:win,console}),{timeout:1500});
 assert.equal(win.enhanceUnifiedSpeech(doc),true);
 return {win,doc,synth,roots,spoken,cancelled,originalNative,nodes};
}

test('one voice per language, prioritizes natural US English and authentic Nepal Nepali',()=>{
 const {win,spoken}=build([voices.uk,voices.india,voices.hindi,voices.usLow,voices.us,voices.nepali]);
 assert.equal(win.__sikauNepaliVoice.speakText('Hello learner!','en-US','tr'),true);
 assert.equal(win.__sikauNepaliVoice.speakText('नमस्कार, तपाईंलाई कस्तो छ?','ne-NP','rd'),true);
 assert.deepEqual(spoken.map(v=>v.voice?.name),[voices.us.name,voices.nepali.name]);
 assert.deepEqual(spoken.map(v=>v.lang),['en-US','ne-NP']);
 assert.deepEqual(spoken.map(v=>v.pitch),[1,1]);
});

test('English requested as en, en-GB or en-IN is ALWAYS spoken in American voice',()=>{
 const {win,spoken}=build([voices.uk,voices.india,voices.usLow]);
 win.__sikauNepaliVoice.speakText('Nice to meet you!','en','words');
 win.__sikauNepaliVoice.speakText('Please take a seat','en-GB','rd');
 win.__sikauNepaliVoice.speakText('Have a nice day','en-IN','tr');
 assert.deepEqual(spoken.map(v=>v.voice?.name),[voices.usLow.name,voices.usLow.name,voices.usLow.name]);
 assert.deepEqual(spoken.map(v=>v.lang),['en-US','en-US','en-US']);
});

test('no US-English installed: never silently use British/Indian English',()=>{
 const {win,roots,spoken}=build([voices.uk,voices.india,voices.nepali]);
 assert.equal(win.__sikauNepaliVoice.speakText('Welcome','en-US','tr'),false);
 assert.equal(spoken.length,0);
 assert.match(roots.tr.children[0].textContent,/US-English voice is unavailable/);
});

test('Galaxy A03s with Hindi but no Nepali voice stays silent with installation advice',()=>{
 const {win,roots,spoken}=build([voices.hindi,voices.usLow]);
 assert.equal(win.__sikauNepaliVoice.speakText('नेपाल सुन्दर छ।','ne-NP','tr'),false);
 assert.equal(spoken.length,0);
 assert.match(roots.tr.children[0].textContent,/Nepali \(Nepal\) voice is unavailable/);
 assert.match(roots.tr.children[0].textContent,/Hindi is not substituted/);
});

test('Android ne-NP voice works even when it has no gender tag',()=>{
 const {win,spoken}=build([voices.nepaliAndroid,voices.hindi]);
 assert.equal(win.__sikauNepaliVoice.speakNepali('नमस्ते','rd'),true);
 assert.equal(spoken[0].voice.name,voices.nepaliAndroid.name);
});

test('native Reading speechSynthesis requests use same voices through unified bridge',()=>{
 const {win,synth,spoken}=build([voices.us,voices.nepali]);
 const u=new win.SpeechSynthesisUtterance('Please read the sentence');
 u.lang='en-GB';
 synth.speak(u);
 const ne=new win.SpeechSynthesisUtterance('यो एउटा कथा हो।');
 ne.lang='ne-NP';
 synth.speak(ne);
 assert.deepEqual(spoken.map(v=>v.voice.name),[voices.us.name,voices.nepali.name]);
 assert.equal(spoken[0].lang,'en-US');
});

test('native global speak(text,rate,lang) uses same audio instead of double playing',()=>{
 const {win,originalNative,spoken}=build([voices.us,voices.nepali]);
 win.speak('Practice these words',0.88,'en');
 win.speak('नयाँ किताब',0.88,'ne');
 assert.equal(originalNative.length,0);
 assert.deepEqual(spoken.map(v=>v.voice.name),[voices.us.name,voices.nepali.name]);
});

test('Hindi explicitly marked hi-IN remains untouched; not relabeled Nepali',()=>{
 const {win,synth,spoken}=build([voices.us,voices.nepali]);
 const u=new win.SpeechSynthesisUtterance('नमस्ते');
 u.lang='hi-IN';
 synth.speak(u);
 assert.equal(spoken[0].lang,'hi-IN');
 assert.equal(spoken[0].voice,null);
});

test('gender choice buttons disappear without hiding lesson buttons',()=>{
 const {win,roots}=build([voices.us,voices.nepali]);
 function control(text){
  return {textContent:text,style:{display:''},attrs:{},
   setAttribute(k,v){this.attrs[k]=v;},getAttribute(){return null;},
   matches(){return false},closest(){return null;},hidden:false};
 }
 const male=control('Male'),female=control('Female'),listen=control('🔊 Listen'),topic=control('Male doctors');
 roots.tr.controls=[male,female,listen,topic];
 win.__sikauNepaliVoice.removeGenderControls();
 assert.equal(male.hidden,true);
 assert.equal(female.hidden,true);
 assert.equal(listen.hidden,false);
 assert.equal(topic.hidden,false);
});

test('voice failure is reported without using Hindi or other voices',()=>{
 const {win,roots,spoken}=build([voices.us,voices.nepali]);
 win.__sikauNepaliVoice.speakText('बोल्नुहोस्','ne-NP','rd');
 spoken[0].onerror({error:'language-unavailable'});
 assert.match(roots.rd.children[0].textContent,/Audio could not play/);
 assert.equal(spoken.length,1);
});

test('Translate, Words and Reading load identical shared engine across devices',()=>{
 assert.match(app,/translate-studio-v4\.js\?v=20261030-single-voice-r1/);
 assert.match(app,/reading-dashboard\.js\?v=20261030-single-voice-r1/);
 assert.match(app,/words-studio\.js\?v=20261030-single-voice-r1/);
 assert.match(app,/nepali-voice-bridge\.js\?v=20261030-single-voice-r1/);
 assert.match(app,/uiStep\('one bilingual speech player',\(\)=>window\.enhanceUnifiedSpeech\?\.\(doc\)\)/);
 assert.match(translate,/__sikauNepaliVoice\.speakText\(txt,outputLanguage,'tr'\)/);
 assert.match(words,/__sikauNepaliVoice\.speakText\(text,locale,'words'\)/);
 assert.match(reading,/enhanceNepaliSpeechVoices\?\.\(d\)/);
 assert.doesNotMatch(bridge,/chooseGender|sagarMale|speakWithGender|Play available Nepali voice \(gender not verified\)/);
});
