/* English Sikau Writing Coach visual dashboard.
 * The existing, protected Writing Coach remains the only source of grades,
 * corrections, model answers, topics, camera OCR and stored learning progress.
 * We move its native controls, then summarize REAL returned feedback only.
 */
(function(){
'use strict';
const stylesheet=new URL('./writing-coach-dashboard.css?v=20261015-b',document.baseURI).href;
const create=(d,t,c,s)=>{const n=d.createElement(t);if(c)n.className=c;if(s!==undefined)n.textContent=String(s);return n};
const add=(d,p,t,c,s)=>{const n=create(d,t,c,s);p.appendChild(n);return n};
function nativeSection(result,re){
 return Array.from(result.querySelectorAll('.detail-sec')).find(n=>re.test(n.querySelector('.ds-title')?.textContent||''));
}
function previewFrom(section,limit){
 const body=section?.querySelector('.ds-body');
 const text=(body?.innerText||body?.textContent||'').trim();
 return limit&&text.length>limit?text.slice(0,limit).trimEnd()+'…':text;
}
function renderRealFeedback(doc,result,summary,original){
 // Don't claim results until the private checker has actually returned.
 const score=result.querySelector('.wc-score .num');
 const error=result.querySelector('.card.bad');
 if(!score){
   summary.hidden=true;
   if(error){original.open=true;original.querySelector('summary').textContent='Writing checker message · लेखन जाँचको सन्देश';}
   return;
 }
 summary.hidden=false;
 original.querySelector('summary').textContent='See complete writing feedback · सबै प्रतिक्रिया हेर्नुहोस्';
 summary.replaceChildren();
 const header=add(doc,summary,'div','wc-feedback-heading');
 add(doc,header,'h2','','Your Writing Feedback · तपाईंको लेखाइको प्रतिक्रिया');
 add(doc,header,'p','','These results come from your actual Writing Coach check. · तपाईंको वास्तविक जाँचको नतिजा।');
 const row=add(doc,summary,'div','wc-feedback-grid');
 function card(color,icon,title,ne){
   const element=add(doc,row,'section','wc-feedback-card wc-feedback-'+color);
   const cap=add(doc,element,'div','wc-feedback-title');
   add(doc,cap,'span','wc-feedback-icon',icon);
   const label=add(doc,cap,'div');
   add(doc,label,'strong','',title);add(doc,label,'small','',ne);
   return element;
 }
 const corrected=card('blue','✅','Corrected Version','सुधारिएको उत्तर');
 const correctedSection=nativeSection(result,/Corrected version|Grammar-only correction/i);
 const correctedText=previewFrom(correctedSection,460);
 add(doc,corrected,'p','wc-feedback-text',correctedText||'Open the complete feedback for corrections. · विस्तृत प्रतिक्रिया हेर्नुहोस्।');
 if(correctedText){
   const b=add(doc,corrected,'button','wc-feedback-button','Copy corrected version · कपी गर्नुहोस्');
   b.type='button';
   b.addEventListener('click',async()=>{
     try{await doc.defaultView.navigator.clipboard.writeText(previewFrom(correctedSection));b.textContent='Copied · कपी भयो';}
     catch(_){b.textContent='Please select and copy the text · पाठ छानेर कपी गर्नुहोस्';}
   });
 }
 const model=card('amber','👑','Model Answer','नमुना उत्तर');
 const teaching=nativeSection(result,/कसरी राम्रो उत्तर लेख्ने|Learn to write/i);
 const modelSection=nativeSection(result,/Model answer|नमुना उत्तर/i);
 // The native teaching lesson includes a dedicated illustrative model; its
 // rich paragraph is in a .ds-body inside its own detail section.
 let modelText=previewFrom(modelSection,410);
 if(!modelText&&teaching){
   const bodies=[...teaching.querySelectorAll('.ds-body')];
   modelText=(bodies.find(n=>n.textContent.trim().length>90)?.textContent||'').trim().slice(0,410);
 }
 add(doc,model,'p','wc-feedback-text',modelText||'A model answer may appear in the complete feedback below.');
 const details=add(doc,model,'button','wc-feedback-button','Read full model answer · नमुना पढ्नुहोस्');
 details.type='button';details.addEventListener('click',()=>{original.open=true;teaching?.scrollIntoView({block:'nearest',behavior:'smooth'});});
 const mistakes=card('rose','⚠️','Mistakes to Fix','सुधार गर्नुपर्ने गल्ती');
 const mistakesFound=[...result.querySelectorAll('.mistake')];
 const label=add(doc,mistakes,'p','wc-feedback-count',mistakesFound.length?mistakesFound.length+' feedback item(s)':'See the detailed error analysis');
 for(const n of mistakesFound.slice(0,3)){
   const w=(n.querySelector('.wrong')?.textContent||'').trim();
   const r=(n.querySelector('.right')?.textContent||'').trim();
   const t=add(doc,mistakes,'div','wc-feedback-error');
   add(doc,t,'span','',w||n.textContent.trim().slice(0,70));
   if(r)add(doc,t,'strong','',' → '+r);
 }
 const mistakeButton=add(doc,mistakes,'button','wc-feedback-button','View all feedback · विस्तृत गल्ती');
 mistakeButton.type='button';mistakeButton.addEventListener('click',()=>{original.open=true;const section=nativeSection(result,/Errors found/i);(section||result).scrollIntoView({behavior:'smooth',block:'nearest'});});
 const scores=card('purple','📊','Writing Score','लेखाइको नतिजा');
 const scoreVal=(score.textContent||'').trim();
 add(doc,scores,'p','wc-feedback-score',scoreVal+' / 100');
 add(doc,scores,'p','wc-feedback-text',result.querySelector('.wc-score .label')?.textContent?.trim()||'Your score from the writing check');
 const relevance=result.querySelector('b');
 const allText=result.innerText||result.textContent||'';
 if(/Off-topic answer/i.test(allText))add(doc,scores,'p','wc-feedback-alert','⚠️ Off-topic: answer the assigned question first.');
 if(/Partly on-topic/i.test(allText))add(doc,scores,'p','wc-feedback-alert','⚠️ Answer all parts of the assigned topic.');
 const explanation=card('green','📖','Nepali Explanation','नेपालीमा व्याख्या');
 const gap=teaching?.querySelector('.detail-sec')||teaching;
 const tips=nativeSection(result,/Study tips|Next steps/i);
 const explanationText=(gap?.querySelector('.ds-body')?.textContent||tips?.textContent||'').trim();
 add(doc,explanation,'p','wc-feedback-text',explanationText?explanationText.slice(0,410):'नेपाली व्याख्या हेर्न तलको पूरा प्रतिक्रिया खोल्नुहोस्।');
 const explainButton=add(doc,explanation,'button','wc-feedback-button','Read full explanation · सबै पढ्नुहोस्');
 explainButton.type='button';explainButton.addEventListener('click',()=>{original.open=true;(teaching||result).scrollIntoView({behavior:'smooth',block:'nearest'});});
}
window.enhanceWritingCoachDashboard=function(doc){
 if(!doc?.body||!doc.head)return;
 const section=doc.getElementById('hw');
 const content=section?.querySelector(':scope > .content');
 const topic=section?.querySelector('#topicCard');
 const dice=section?.querySelector('#topicDice');
 const mode=section?.querySelector('#writeModeSw');
 const textarea=section?.querySelector('#writeText');
 const nativeCard=mode?.closest('.card');
 const feedback=section?.querySelector('#writeResult');
 const check=section?.querySelector('#writeCheck');
 if(!content||!topic||!dice||!mode||!textarea||!nativeCard||!feedback||!check)return;
 if(section.dataset.sikauWritingCoach==='1')return;
 section.dataset.sikauWritingCoach='1';
 if(!doc.getElementById('sikauWritingDashboardStyles')){
  const link=create(doc,'link');
  link.id='sikauWritingDashboardStyles';link.rel='stylesheet';link.href=stylesheet;doc.head.appendChild(link);
 }
 const root=create(doc,'div','wc-dashboard');
 const hero=add(doc,root,'section','wc-banner');
 hero.setAttribute('aria-label','Writing Coach · लेखन कोच');
 add(doc,hero,'div','wc-mountains').setAttribute('aria-hidden','true');
 const intro=add(doc,hero,'div','wc-banner-intro');
 add(doc,intro,'span','wc-banner-badge','✍️ Write · लेखन अभ्यास');
 add(doc,intro,'h1','','Writing Coach');
 add(doc,intro,'h2','','लेखन कोच');
 add(doc,intro,'p','','Improve your English writing with feedback, model answers and simple explanations.');
 add(doc,intro,'p','','एआई फिडब्याक, नमुना उत्तर र सरल व्याख्याको साथ आफ्नो अंग्रेजी लेखन सुधार गर्नुहोस्।');
 const slogan=add(doc,hero,'div','wc-banner-slogan');
 add(doc,slogan,'strong','','Better Writing');
 add(doc,slogan,'strong','','Brighter Opportunities');
 add(doc,slogan,'small','','राम्रो लेखन, उज्ज्वल सम्भावना');

 const layout=add(doc,root,'div','wc-primary-grid');
 const topicPanel=add(doc,layout,'section','wc-topic-panel');
 const top=add(doc,topicPanel,'div','wc-topic-heading');
 add(doc,top,'span','wc-topic-heading-ico','💡');
 const label=add(doc,top,'div');
 add(doc,label,'strong','','Today’s Writing Topic');
 add(doc,label,'small','','आजको लेखन विषय');
 const change=add(doc,top,'button','wc-change','⟳ Change topic · विषय फेर्नुहोस्');
 change.type='button';
 change.addEventListener('click',()=>dice.click()); // same native topic generator
 topicPanel.appendChild(topic); // do not clone/reset existing topic
 const prompts=add(doc,topicPanel,'div','wc-topic-prompts');
 for(const [emoji,text] of [['📌','Answer the topic'],['💡','Give an example'],['✅','Stay relevant']]){
   const chip=add(doc,prompts,'span','',emoji+' '+text);
 }
 const editorPanel=add(doc,layout,'section','wc-editor-panel');
 const editorHead=add(doc,editorPanel,'div','wc-editor-heading');
 add(doc,editorHead,'strong','','✏️ Write your answer · उत्तर लेख्नुहोस्');
 editorPanel.appendChild(nativeCard); // preserve original check and photo handlers
 const checklist=add(doc,layout,'aside','wc-checklist');
 add(doc,checklist,'h3','','✅ Writing Checklist');
 add(doc,checklist,'p','wc-checklist-ne','लेखन जाँचसूची');
 for(const [icon,en,ne] of [
  ['✔','Use correct grammar','सही व्याकरण प्रयोग गर्नुहोस्'],
  ['abc','Check spelling','हिज्जे जाँच गर्नुहोस्'],
  ['❞','Use good punctuation','उचित विरामचिह्न प्रयोग गर्नुहोस्'],
  ['🎯','Stay on topic','विषयमै केन्द्रित रहनुहोस्'],
  ['✏️','Write complete sentences','पूरा वाक्यहरू लेख्नुहोस्'],
  ['💡','Use your own ideas','आफ्नै विचारहरू प्रयोग गर्नुहोस्']
 ]){
  const item=add(doc,checklist,'div','wc-check-item');
  add(doc,item,'span','wc-check-icon',icon);
  const words=add(doc,item,'div','');
  add(doc,words,'strong','',en);add(doc,words,'small','',ne);
 }
 const summaries=add(doc,root,'section','wc-real-feedback');
 summaries.hidden=true;
 summaries.setAttribute('aria-label','Results from real writing check');
 const full=add(doc,root,'details','wc-native-feedback');
 const summary=add(doc,full,'summary','','See complete writing feedback · सबै प्रतिक्रिया हेर्नुहोस्');
 full.appendChild(feedback);
 root.appendChild(full);
 content.insertBefore(root,content.firstChild);
 section.classList.add('sikau-writing-v1');
 let scheduled=false;
 const update=()=>{
  if(scheduled)return;scheduled=true;
  const view=doc.defaultView;
  (view.requestAnimationFrame||((f)=>view.setTimeout(f,0)))(()=>{
   scheduled=false;
   renderRealFeedback(doc,feedback,summaries,full);
  });
 };
 const observer=new doc.defaultView.MutationObserver(update);
 observer.observe(feedback,{childList:true,subtree:true,characterData:true});
 update();
};
})();