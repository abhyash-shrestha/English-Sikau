/* English Sikau Writing Coach visual dashboard.
 * The existing, protected Writing Coach remains the only source of grades,
 * corrections, model answers, topics, camera OCR and stored learning progress.
 * We move its native controls, then summarize REAL returned feedback only.
 */
(function(){
'use strict';
const stylesheet=new URL('./writing-coach-dashboard.css?v=20261021-ai-ready-r1',document.baseURI).href;
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

/* Conservative client-side polish for recurring ESL mistakes missed by the
 * protected grammar service. Keep the student's original ideas, not the
 * unrelated model answer. This is a supplement, not an AI or final validator. */
function polishWriting(source){
 let s=String(source||'').trim().replace(/\s+/g,' ');
 if(!s)return '';
 const base={wakes:'wake',goes:'go',wants:'want',knows:'know',likes:'like',eats:'eat',drinks:'drink',says:'say',makes:'make',works:'work',does:'do',has:'have'};
 const plural={say:'says',make:'makes',want:'wants',work:'works',go:'goes',need:'needs',like:'likes',have:'has',eat:'eats',know:'knows',do:'does'};
 s=s.replace(/\bi\b/g,'I');
 const contractions={dont:"don't",doesnt:"doesn't",didnt:"didn't",cant:"can't",wont:"won't",isnt:"isn't",arent:"aren't",wasnt:"wasn't",werent:"weren't"};
 s=s.replace(/\b(dont|doesnt|didnt|cant|wont|isnt|arent|wasnt|werent)\b/gi,x=>contractions[x.toLowerCase()]||x);
 s=s.replace(/\bI was sleep\b/gi,'I was asleep');
 s=s.replace(/\bI eating\b/gi,/\bevery day\b|\bdaily routine\b/i.test(s)?'I eat':'I am eating');
 s=s.replace(/\bI going to\b/gi,'I am going to');
 s=s.replace(/\b(I\s+(?:eat|wake|work|brush|go|drink|cook|read)[^.!?]{0,80}?)\s+and\s+goes\b/gi,(_,before)=>before+' and go');
 s=s.replace(/\bI\s+(wakes|goes|wants|knows|likes|eats|drinks|says|makes|works|does|has)\b/gi,(_,verb)=>'I '+base[verb.toLowerCase()]);
 s=s.replace(/\b(will|can|could|should|would|must|may|might|don't|doesn't|didn't)\s+(wakes|goes|wants|knows|likes|eats|drinks|says|makes|works|does|has)\b/gi,(_,aux,verb)=>aux+' '+base[verb.toLowerCase()]);
 s=s.replace(/\b(he|she|it|my friend|my mother|my father|my wife|my husband)\s+(say|make|want|work|go|need|like|have|eat|know|do)\b/gi,(_,subject,verb)=>subject+' '+plural[verb.toLowerCase()]);
 s=s.replace(/\bI\s+is\b/gi,'I am').replace(/\b(you|we|they)\s+is\b/gi,(_,p)=>p+' are');
 s=s.replace(/\b(he|she|it)\s+are\b/gi,(_,p)=>p+' is');
 s=s.replace(/\b(?:in future)\b/gi,'in the future');
 s=s.replace(/\bgoing to do exercise\b/gi,'going to exercise');
 s=s.replace(/\bto gym\b/gi,'to the gym');
 s=s.replace(/\bmore healthy\b/gi,'healthier');
 s=s.replace(/\bits (a|an|good|not|better|really)\b/gi,(_,next)=>"it's "+next);
 // Time expression limits past-tense changes to sentences mentioning yesterday.
 s=s.replace(/(^|[.!?]\s*)(yesterday\b[^.!?]*)/gi,(_,prefix,clause)=>{
   let t=clause.replace(/\bI go\b/gi,'I went').replace(/\bI eat\b/gi,'I ate')
     .replace(/\bI wake up\b/gi,'I woke up').replace(/\bI see\b/gi,'I saw')
     .replace(/\bI buy\b/gi,'I bought');
   return prefix+t;
 });
 s=s.replace(/\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/gi,x=>x[0].toUpperCase()+x.slice(1).toLowerCase());
 s=s.replace(/\b(\d{1,2})\s*(am|pm)\b/gi,(_,time,period)=>time+' '+period.toLowerCase().split('').join('.')+'.');
 s=s.replace(/([a-z])\s+but\s+/gi,'$1, but ');
 s=s.replace(/(^|[!?]\s+|(?<!\ba\.m|\bp\.m)\.\s+)([a-z])/g,(_,prefix,x)=>prefix+x.toUpperCase());
 s=s.replace(/\s+([,.;!?])/g,'$1').trim();
 if(s&&!/[.!?]$/.test(s))s+='.';
 return polishNarrative(s);
}
function polishNarrative(text){
 let pastStory=false;
 const past={go:'went',goes:'went',eat:'ate',eats:'ate',cook:'cooked',cooks:'cooked',tell:'told',tells:'told',take:'took',takes:'took',taked:'took',make:'made',makes:'made',visit:'visited',visits:'visited',play:'played',plays:'played',say:'said',says:'said',see:'saw',saw:'saw',have:'had',has:'had',spend:'spent',spends:'spent',meet:'met',meets:'met',dance:'danced',dances:'danced'};
 return String(text||'').split(/(?<=[.!?])\s+(?=[A-Z])/).map(part=>{
  let s=part;
  if(/^\s*(?:this memory|these memories|today|nowadays|now\b|in the future|next (?:week|month|year|monday)|every day|my daily routine|I never)\b/i.test(s))pastStory=false;
  if(/^\s*(?:yesterday|last (?:Dashain|Tihar|week|month|year|night|summer|winter|weekend|monday|tuesday|wednesday|thursday|friday|saturday|sunday))\b/i.test(s))pastStory=true;
  s=s.replace(/\bmy family are\b/gi,'my family is')
   .replace(/\bthis memory are\b/gi,'this memory is')
   .replace(/\bwe has\b/gi,'we have')
   .replace(/\b(everyone|everybody) help each others?\b/gi,'$1 helps one another')
   .replace(/\b(everyone|everybody) help\b/gi,'$1 helps')
   .replace(/\b(\d+|two|three|four|five|six|seven|eight|nine|ten) (member|person|brother|sister|cousin|day|friend)\b/gi,(_,n,noun)=>n+' '+noun.toLowerCase()+'s')
   .replace(/\bthat days\b/gi,'those days')
   .replace(/\bgrandparents house\b/gi,"grandparents' house")
   .replace(/\bI didn't (?:saw|see|seen) my grandparents for (?:a )?long time\b/gi,"I hadn't seen my grandparents for a long time")
   .replace(/\b(I|we|they) (didn't|did not) (saw|went|ate|took|seen)\b/gi,(_,sub,aux,verb)=>sub+' '+aux+' '+({saw:'see',went:'go',ate:'eat',took:'take',seen:'see'}[verb.toLowerCase()]))
   .replace(/\bI (never|always|often|sometimes|really|usually) (wants|goes|knows|likes|eats|has)\b/gi,(_,adverb,verb)=>'I '+adverb+' '+({wants:'want',goes:'go',knows:'know',likes:'like',eats:'eat',has:'have'}[verb.toLowerCase()]))
   .replace(/\bit (remind|make|help)\b/gi,(_,verb)=>'it '+({remind:'reminds',make:'makes',help:'helps'}[verb.toLowerCase()]));
  if(pastStory){
   const who='(?:I|we|they|he|she|my (?:mom|mother|dad|father|grandmother|grandfather|friend|family)|everyone|everybody)';
   const matcher=new RegExp('\\b('+who+')\\s+('+Object.keys(past).join('|')+')\\b','gi');
   s=s.replace(matcher,(_,subject,verb)=>subject+' '+past[verb.toLowerCase()]);
  }
  s=s.replace(/\bdashain\b/gi,'Dashain').replace(/\btihar\b/gi,'Tihar')
     .replace(/^(Last (?:Dashain|Tihar|week|month|year|night|summer|winter|weekend)|Yesterday)\s+(?!,)/i,'$1, ')
     .replace(/^([a-z])/,x=>x.toUpperCase());
  return s;
 }).join(' ');
}

function getModelAnswer(result){
 const teaching=nativeSection(result,/कसरी राम्रो उत्तर लेख्ने|Learn to write/i);
 const modelSection=nativeSection(result,/Model answer|नमुना उत्तर/i);
 let model=previewFrom(modelSection);
 if(!model&&teaching){
   const marker=[...teaching.querySelectorAll('div')].find(n=>n.children.length===0&&/राम्रो नमुना उत्तर|^Model answer/i.test(n.textContent.trim()));
   let cursor=marker?.nextElementSibling;
   while(cursor&&!cursor.classList.contains('ds-body'))cursor=cursor.nextElementSibling;
   model=(cursor?.textContent||'').trim();
 }
 return model;
}
function renderRealFeedback(doc,result,summary,original,textarea,aiReview=null,aiPending=false,aiUnavailable=false){
 const score=result.querySelector('.wc-score .num');
 const error=result.querySelector('.card.bad');
 if(!score){
   summary.hidden=true;
   original.hidden=!error;
   original.open=!!error;
   original.querySelector('summary').textContent='Writing checker message · लेखन जाँचको सन्देश';
   return;
 }
 // The private result is kept in the DOM for the native checker, but its very
 // long duplicated lesson is not displayed. A compact view is rendered instead.
 original.hidden=true;original.open=false;
 summary.hidden=false;summary.replaceChildren();
 const allText=result.innerText||result.textContent||'';
 const offTopic=aiReview?aiReview.relevance==='off_topic':/Off-topic answer/i.test(allText);
 const partly=aiReview?aiReview.relevance==='partial':/Partly on-topic/i.test(allText);
 const nativeCorrected=nativeSection(result,/Corrected version|Grammar-only correction/i);
 const originalAnswer=textarea?.value?.trim()||'';
 const existing=previewFrom(nativeCorrected);
 const improved=(aiReview?.corrected && typeof aiReview.corrected==='string')
   ?aiReview.corrected:polishWriting(existing||originalAnswer);
 const scoreLabel=aiReview?String(Math.max(0,Math.min(100,Number(aiReview.score)||0))):(score.textContent||'').trim();
 const mistakes=[...result.querySelectorAll('.mistake')].filter(n=>n.querySelector('.wrong,.right')).map(n=>({
    wrong:(n.querySelector('.wrong')?.textContent||'').trim(),
    right:(n.querySelector('.right')?.textContent||'').trim(),
    category:(n.textContent||'').trim()
 }));
 const unique=[],seen=new Set();
 for(const m of mistakes){
    const key=(m.wrong+'→'+m.right).toLowerCase();
    if(!m.wrong||seen.has(key))continue;seen.add(key);unique.push(m);
 }
 unique.sort((a,b)=>{
   const weight=x=>/Grammar|Verb tense/i.test(x.category)?0:/Spelling/i.test(x.category)?1:2;
   return weight(a)-weight(b);
 });
 const heading=add(doc,summary,'div','wc-simple-head');
 const main=add(doc,heading,'div');
 add(doc,main,'h2','','Your writing results · लेखाइको नतिजा');
 add(doc,main,'p','','Short, clear feedback to help you improve.');
 const stats=add(doc,summary,'div','wc-simple-stats');
 const scoreBox=add(doc,stats,'div','wc-simple-score');
 add(doc,scoreBox,'strong','',scoreLabel+'/100');
 add(doc,scoreBox,'span','',aiReview?'AI estimated score · एआई अनुमानित अंक':'Writing score · लेखाइको अंक');
 const info=add(doc,stats,'div','wc-simple-status');
 const topicStatus=offTopic?'⚠️ Off-topic · विषय मिलेन':partly?'⚠️ Partly on topic · आंशिक मिल्यो':'✓ Topic checked · विषय जाँचियो';
 add(doc,info,'strong','',topicStatus);
 add(doc,info,'small','',aiReview?'AI-powered review · एआई लेखन जाँच':aiPending?'AI reviewing… · एआई जाँच हुँदैछ':aiUnavailable?'Basic checker used · सामान्य जाँच':'Basic grammar review · सामान्य जाँच');
 if(offTopic)add(doc,info,'p','','Answer the assigned question before fixing grammar. · पहिले सोधिएको विषयमा लेख्नुहोस्।');
 const corrected=add(doc,summary,'section','wc-simple-card wc-simple-corrected');
 add(doc,corrected,'h3','',aiReview?'✓ AI corrected version · एआईले सुधारेको उत्तर':'✓ Improved version · सुधारिएको उत्तर');
 add(doc,corrected,'p','wc-simple-text',improved||'Your corrected paragraph was not available.');
 add(doc,corrected,'p','wc-simple-note',aiReview?'AI suggestions can still be inaccurate; compare with your own meaning. · एआईको सुझाव पनि जाँच्नुहोस्।':aiPending?'AI is checking the full paragraph. This is the basic result. · एआई जाँच हुँदैछ।':'Rule-based corrections can miss context-dependent errors. · स्वचालित सुधारमा गल्ती छुट्न सक्छ।');
 if(improved){
   const copy=add(doc,corrected,'button','wc-simple-copy','Copy corrected answer · उत्तर कपी गर्नुहोस्');
   copy.type='button';
   copy.addEventListener('click',async()=>{
     try{
       await doc.defaultView.navigator.clipboard.writeText(improved);
       copy.textContent='Copied · कपी भयो';
     }catch(_){
       const field=add(doc,corrected,'textarea','wc-copy-fallback',improved);
       field.value=improved;field.select();
       try{doc.execCommand('copy');copy.textContent='Copied · कपी भयो';}
       catch(__){copy.textContent='Select the paragraph to copy · पाठ छानेर कपी गर्नुहोस्';}
       field.remove();
     }
   });
 }
 const key=add(doc,summary,'section','wc-simple-card');
 add(doc,key,'h3','','Important fixes · मुख्य सुधारहरू');
 const tips=[];
 if(aiReview && Array.isArray(aiReview.feedback)){
  for(const item of aiReview.feedback.slice(0,3)){
   if(item?.before&&item?.after)tips.push({before:String(item.before).slice(0,180),after:String(item.after).slice(0,180),ne:String(item.why_ne||'').slice(0,300)});
  }
 }
 const example=(re,before,after,ne)=>{if(!aiReview&&re.test(originalAnswer))tips.push({before,after,ne});};
 example(/\bwe has\b/i,'we has','we have','“We” पछि “have” प्रयोग हुन्छ।');
 example(/\blast dashain[^.!?]*we goes\b/i,'we goes','we went','बितेको Dashain बारे past tense मा “went” लेख्नुहोस्।');
 example(/\bI (?:didnt|didn't) saw my grandparents\b/i,"didn't saw","hadn't seen",'नभेटेको अवधि बताउँदा “hadn’t seen” प्रयोग गर्नुहोस्।');
 example(/\btaked\b/i,'taked','took','“Take” को past tense “took” हो।');
 example(/\bI wakes\b/i,'I wakes','I wake','“I” पछि “wake” लेख्नुहोस्।');
 example(/\bI eating\b/i,'I eating','I eat','दिनचर्यामा “I eat” प्रयोग हुन्छ।');
 example(/\byesterday I go\b/i,'yesterday I go','yesterday I went','हिजोको कुरा गर्दा “went” प्रयोग हुन्छ।');
 example(/\bI will goes?\b/i,'I will goes','I will go','“Will” पछि क्रियाको मूल रूप आउँछ।');
 example(/\bthis memory are\b/i,'this memory are','this memory is','एउटा सम्झनासँग “is” प्रयोग हुन्छ।');
 example(/\bI never wants\b/i,'I never wants','I never want','“I” पछि “want” हुन्छ।');
 if(!tips.length&&!aiReview){
  for(const m of unique.filter(x=>!/(?:capitalization|\bminor\b)/i.test(x.category)&&!/^[a-z]$/i.test(x.wrong)).slice(0,3)){
   tips.push({before:m.wrong,after:m.right||'Review',ne:'सुधार गरेर वाक्य फेरि पढ्नुहोस्।'});
  }
 }
 if(tips.length){
  const ul=add(doc,key,'ul','wc-simple-fixes');
  for(const t of tips.slice(0,3)){
   const li=add(doc,ul,'li');
   add(doc,li,'span','',t.before);
   add(doc,li,'span','wc-simple-arrow','→');
   add(doc,li,'strong','',t.after);
   add(doc,li,'small','',t.ne);
  }
 }else add(doc,key,'p','wc-simple-text','No specific grammar suggestions were returned.');
 add(doc,key,'p','wc-simple-tip',aiReview?.tip_ne?'💡 '+String(aiReview.tip_ne).slice(0,450):'💡 Read the improved paragraph and try again in your own words. · सुधारिएको उत्तर पढेर आफ्नै शब्दमा फेरि लेख्नुहोस्।');
 const model=aiReview?.model_answer||getModelAnswer(result);
 if(model){
   const examples=add(doc,summary,'details','wc-simple-model');
   add(doc,examples,'summary','','See model answer · नमुना उत्तर हेर्नुहोस्');
   add(doc,examples,'p','wc-simple-text',model);
 }
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
 change.setAttribute('aria-controls','topicCard');
 // Use the native topic generator without displaying its duplicate overlay button.
 // The original listener remains attached to #topicDice.
 dice.setAttribute('aria-hidden','true');
 dice.tabIndex=-1;
 change.addEventListener('click',()=>dice.click());
 topicPanel.appendChild(topic); // do not clone/reset existing topic
 // The old decorative "Answer the topic / Give an example / Stay relevant"
 // chips slipped beneath the bottom edge of the native prompt card on
 // narrower columns. The clear bilingual prompt already gives this guidance.
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
 full.hidden=true; // Reveal only after actual native feedback or an error.
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
   const grade=feedback.querySelector('.wc-score .num');
   const answer=textarea.value.trim();
   const topicEn=(doc.getElementById('topicEn')?.textContent||'').trim();
   const topicNe=(doc.getElementById('topicNe')?.textContent||'').trim();
   const key=JSON.stringify([answer,topicEn,topicNe]);
   if(onlineAI&&grade&&answer.length>=15&&topicEn&&key!==lastAIKey){
      lastAIKey=key;aiPending=true;aiReview=null;aiUnavailable=false;
      window.sikauWritingAI({answer,topicEn,topicNe})
        .then(data=>{
          if(lastAIKey!==key)return;
          aiReview=data?.status==='ok'&&data?.review?data.review:null;
          aiUnavailable=!aiReview;
          aiPending=false;
          renderRealFeedback(doc,feedback,summaries,full,textarea,aiReview,aiPending,aiUnavailable);
        }).catch(()=>{
          if(lastAIKey!==key)return;
          aiPending=false;aiUnavailable=true;
          renderRealFeedback(doc,feedback,summaries,full,textarea,null,false,true);
        });
   }
   renderRealFeedback(doc,feedback,summaries,full,textarea,aiReview,aiPending,aiUnavailable);
  });
 };
 // AI is optional and disabled until the separate authenticated Appwrite
 // Function has been deployed with a private provider key.
 let lastAIKey='',aiReview=null,aiPending=false,aiUnavailable=false;
 const onlineAI=typeof window.sikauWritingAI==='function' && window.sikauWritingAIConfigured===true;
 if(onlineAI){
  add(doc,editorPanel,'p','wc-ai-privacy','🤖 AI review sends your assignment and writing to Groq when you press Check my writing. Do not include private personal information. · एआई जाँचमा आफ्नो लेख र प्रश्न पठाइन्छ। व्यक्तिगत गोप्य जानकारी नलेख्नुहोस्।');
 }
 check.addEventListener('click',()=>{
   // A new user-initiated check invalidates previous AI results, even for the same text.
   lastAIKey='';aiReview=null;aiPending=false;aiUnavailable=false;
 },{capture:true});
 const observer=new doc.defaultView.MutationObserver(update);
 observer.observe(feedback,{childList:true,subtree:true,characterData:true});
 update();
};
})();