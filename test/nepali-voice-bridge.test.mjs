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

function build(available,{withNative=true,toolbarControls=[]}={}){
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
  remove(){this.removed=true;this.hidden=true;},
  querySelector(){return null},
  querySelectorAll(){return[]},
  closest(){return null}
 });
 const root=()=>({
  ...make('section'),children:[],hidden:false,
  querySelector(selector){return selector==='.sikau-simple-voice-status'?
   this.children.find(n=>n.className==='sikau-simple-voice-status')||null:null;},
  querySelectorAll(selector){return selector.startsWith('.voice-')||selector.startsWith('.sikau-voice')?[]:(this.controls||[])},
  appendChild(element){this.children.push(element)}
 });
 const roots={tr:root(),rd:root(),words:root(),sp:root()};
 const listener={};
 const toolbar={querySelectorAll(){return toolbarControls;}};
 const header={querySelector(selector){return selector==='.header-btns'?toolbar:null;}};
 const voiceGroups=[];
 const doc={body:make('body'),defaultView:null,
  createElement(tag){const node=make(tag);nodes.push(node);return node;},
  getElementById(key){return roots[key]||null;},
  querySelector(selector){return selector==='.app-header'?header:null;},
  querySelectorAll(){return voiceGroups;},
  addEventListener(name,fn){listener[name]=fn;}
 };
 const originalNative=[],observers=[];
 const win={
  speechSynthesis:synth,
  SpeechSynthesisUtterance:class{
   constructor(text){this.text=text;this.lang='';this.voice=null;this.pitch=1;this.rate=1;}
  },
  MutationObserver:class{
   constructor(callback){this.callback=callback;observers.push(this);}
   observe(){this.attached=true;}
  },
  requestAnimationFrame(fn){fn();},
  setTimeout(fn){fn();},
  ...(withNative?{speak(text,rate,lang){originalNative.push([text,rate,lang]);}}:{})
 };
 doc.defaultView=win;
 vm.runInNewContext(bridge,vm.createContext({window:win,console}),{timeout:1500});
 assert.equal(win.enhanceUnifiedSpeech(doc),true);
 return {win,doc,synth,roots,spoken,cancelled,originalNative,nodes,
   toolbarControls,voiceGroups,observers};
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

function fakeButton(text,{aria='',title='',klass='',id=''}={}){
 return {
  tagName:'BUTTON',textContent:text,className:klass,id,hidden:false,removed:false,
  attrs:{'aria-label':aria,title},
  setAttribute(k,v){this.attrs[k]=v;},
  getAttribute(k){return this.attrs[k]||null;},
  remove(){this.removed=true;this.hidden=true;},
  closest(){return null;}
 };
}
test('the exact 👨 and 👩 screenshot toolbar buttons are deleted, not merely hidden',()=>{
 const man=fakeButton('👨',{title:'Male voice'}),woman=fakeButton('👩',{title:'Female voice'});
 const classroom=fakeButton('🔒 Abhyash · मेरो कक्षा');
 const globe=fakeButton('🌐'),moon=fakeButton('🌙');
 const {toolbarControls}=build([voices.us,voices.nepali],
  {toolbarControls:[classroom,globe,man,woman,moon]});
 assert.equal(man.removed,true);
 assert.equal(woman.removed,true);
 for(const other of [classroom,globe,moon])assert.equal(other.removed,false);
});

test('legacy gender options in a genuine voice selector retire, not quiz answers',()=>{
 const male=fakeButton('Male',{aria:'Male voice'}),female=fakeButton('Female',{aria:'Female voice'});
 const quizMale=fakeButton('Male'),topic=fakeButton('Male doctors');
 const listen=fakeButton('🔊 Listen');
 const {win,voiceGroups}=build([voices.us,voices.nepali]);
 voiceGroups.push({
  querySelectorAll(){return [male,female,listen];}
 });
 win.__sikauNepaliVoice.removeGenderControls();
 assert.equal(male.removed,true);
 assert.equal(female.removed,true);
 assert.equal(listen.removed,false);
 assert.equal(quizMale.removed,false);
 assert.equal(topic.removed,false);
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
 assert.match(app,/nepali-voice-bridge\.js\?v=20261030-single-voice-r3/);
 assert.match(app,/uiStep\('one bilingual speech player',\(\)=>window\.enhanceUnifiedSpeech\?\.\(doc\)\)/);
 assert.match(translate,/__sikauNepaliVoice\.speakText\(txt,outputLanguage,'tr'\)/);
 assert.match(words,/__sikauNepaliVoice\.speakText\(text,locale,'words'\)/);
 assert.match(reading,/window\.enhanceUnifiedSpeech\?\.\(d\)/);
 assert.doesNotMatch(reading,/voiceScriptLoading|createElement\('script'\)/);
 assert.doesNotMatch(bridge,/chooseGender|sagarMale|speakWithGender|Play available Nepali voice \(gender not verified\)/);
});


test('a recreated toolbar gender button is removed on header mutation',()=>{
 const buttons=[fakeButton('🌐'),fakeButton('🌙')];
 const {observers}=build([voices.us,voices.nepali],{toolbarControls:buttons});
 const observer=observers.find(o=>o.attached);
 assert.ok(observer);
 const injected=fakeButton('👩',{aria:'Female voice'});
 buttons.splice(1,0,injected);
 observer.callback([{type:'childList',addedNodes:[injected]}]);
 assert.equal(injected.removed,true);
 assert.equal(buttons[0].removed,false);
 assert.equal(buttons[2].removed,false);
});
test('unrelated Male/Female answer options and floating messages are not deleted',()=>{
 const quizAnswer=fakeButton('Male');
 const notice=fakeButton('👩',{title:'A character from the story'});
 const label=fakeButton('View Nepali');
 const {toolbarControls,win}=build([voices.us,voices.nepali],{toolbarControls:[label]});
 // Only the native header toolbar has emoji-only voice buttons. Do not
 // perform a blanket text scan through quizzes or story content.
 toolbarControls.push(label);
 win.__sikauNepaliVoice.removeGenderControls();
 for(const x of [quizAnswer,notice,label])assert.equal(x.removed,false);
});
test('the retired full-page scan and duplicate Reading bridge loader are gone',()=>{
 assert.doesNotMatch(bridge,/doc\.body\.querySelectorAll\('div,span,p,small'\)/);
 assert.doesNotMatch(bridge,/data-sikau-voice-gender-hidden/);
 assert.doesNotMatch(reading,/voiceScriptLoading|document\.createElement\('script'\)/);
});
