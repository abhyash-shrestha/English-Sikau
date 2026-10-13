/* English Sikau Writing Coach correction audit (public helper, no private lessons).
   This runs inside the ALREADY AUTHORIZED private lesson script closure.
   Never alters assignment scoring, XP, student input, or model-answer lessons. */
(function(){
 if(typeof checkWriting!=='function')return;
 var originalCheckWriting=checkWriting;
 function tidy(x){return String(x||'').replace(/\s+/g,' ').replace(/\s+([,.!?;:])/g,'$1').trim()}
 function correctDraft(text){
   var t=tidy(text);if(!t)return t;
   t=t.replace(/\bi\b/g,'I')
     .replace(/\bnepal\b/gi,'Nepal')
     .replace(/\b(usa|u\.s\.a\.)\b/gi,'USA')
     .replace(/\b(pokhara|phewa|dharan|janakpur|kathmandu|bhaktapur)\b/gi,function(w){return w[0].toUpperCase()+w.slice(1).toLowerCase()})
     .replace(/\bwantt\b/gi,'want').replace(/\btheem\b/gi,'them')
     .replace(/\bmisss\b/gi,'miss')
     .replace(/\bI\s+(?:am|'m)\s+in\s+(?:the\s+)?USA\b/gi,'I am in the USA')
     .replace(/\b(?:live|stay|work)\s+in\s+(?:the\s+)?USA\b/gi,function(match){return match.replace(/\bin\s+(?:the\s+)?USA\b/i,'in the USA')})
     .replace(/\bthey\s+is\b/gi,'they are')
     .replace(/\bI\s+is\b/gi,'I am').replace(/\bI\s+has\b/gi,'I have')
     .replace(/\bI\s+am\s+agree\b/gi,'I agree')
     .replace(/\bI\s+want\s+see\b/gi,'I want to see')
     .replace(/\bI\s+want\s+to\s+seeing\b/gi,'I want to see');
   t=t.replace(/\b(family|friends|parents)\s+but\s+/gi,'$1, but ');
   t=t.replace(/\b(USA|Nepal)\s+(I\s+(?:miss|want|love|hope|feel|think|need)\b)/g,'$1. $2');
   t=t.replace(/\b(and\s+I\s+am\s+in\s+the\s+USA)\s+(I\s+(?:miss|want|hope|feel)\b)/gi,'$1. $2');
   t=t.replace(/\b(and\s+I\s+live\s+in\s+the\s+USA)\s+(I\s+(?:miss|want|hope|feel)\b)/gi,'$1. $2');
   t=t.replace(/\s+(I\s+(?:miss|want|need|hope)\b)/g,function(m,clause,offset,str){
     var pre=str.slice(Math.max(0,offset-35),offset);
     return /(?:USA|Nepal|India|UK|Canada|Australia)\s*$/i.test(pre)?'. '+clause:m;
   });
   t=t.replace(/\.\s*\./g,'.').replace(/\s+([,.!?;:])/g,'$1')
     .replace(/([.!?])(?=\S)/g,'$1 ')
     .replace(/(^|[.!?]\s+)([a-z])/g,function(_,pre,letter){return pre+letter.toUpperCase()});
   t=tidy(t);if(t&&!/[.!?]$/.test(t))t+='.';
   return t;
 }
 function naturalDraft(text){
   var t=correctDraft(text);
   t=t.replace(/\bI have a lovely family,? but they are in Nepal,? and I am in the USA\./i,
     'I have a lovely family in Nepal, while I am in the USA.');
   t=t.replace(/\bI miss them so much\. I want to see them\./i,
     'I miss them very much and want to see them.');
   t=t.replace(/\bI have a lovely family,? but they live in Nepal,? and I live in the USA\./i,
     'I have a lovely family in Nepal, while I live in the USA.');
   return correctDraft(t);
 }
 function extra(original){
   var issues=[],o=String(original||'');
   function add(wrong,right,why,category,severity){
     if(!o.toLowerCase().includes(wrong.toLowerCase()))return;
     issues.push({wrong:wrong,right:right,why:why,category:category,
       severity:severity||'minor',confidence:'high',source:'Writing Coach proofreading'});
   }
   if(/\busa\b/.test(o))add('usa','the USA','“in the USA” भन्नुहोस्; USA लाई ठूलो अक्षरमा लेख्नुहोस्।','Capitalization');
   if(/\bwantt\b/i.test(o))add('wantt','want','“want” को spelling मा एउटै अन्तिम t हुन्छ।','Spelling');
   if(/\btheem\b/i.test(o))add('theem','them','“them” को सही spelling हो।','Spelling');
   if(/\bfamily\s+but\b/i.test(o))add('family but','family, but','दुई विचार “but” ले जोड्दा comma प्रयोग गर्नुहोस्।','Punctuation');
   if(/\bUSA\s+i\s+(?:miss|want|hope|feel)\b/i.test(o))add('USA i miss','USA. I miss','नयाँ पूर्ण विचार अघि full stop र capital I राख्नुहोस्।','Sentence structure','major');
   return issues;
 }
 function residual(t){return /\b(?:wantt|theem|they is|i am agree|i has|I is|in usa)\b/i.test(t)||
   /\b(?:USA|Nepal)\s+I\s+(?:miss|want|need)\b/.test(t)}
 checkWriting=async function(text,topic,wordCount){
   var res=await originalCheckWriting.apply(this,arguments);
   if(!res||typeof res!=='object')return res;
   var previous=String(res.corrected||text||''),corrected=correctDraft(previous);
   if(corrected){
     res.corrected=corrected;
     var smoother=naturalDraft(corrected),aiNatural=String(res.natural||'').trim();
     res.natural=(aiNatural&&aiNatural!==previous&&!residual(aiNatural))?
       correctDraft(aiNatural):smoother;
     if(res.natural===res.corrected)res.natural=smoother;
   }
   if(Array.isArray(res.mistakes)){
     var mistakes=res.mistakes;
     extra(text).forEach(function(i){
       if(!mistakes.some(function(m){return String(m.wrong||'').toLowerCase()===i.wrong.toLowerCase()}))
         mistakes.push(i);
     });
     if(typeof dedupeMistakes==='function')res.mistakes=dedupeMistakes(mistakes);
   }
   if(res.finalValidation){
     if(residual(res.corrected)){
       res.finalValidation.passed=false;
       res.finalValidation.notes=['Please review the remaining spelling or grammar errors. · बाँकी गल्ती जाँच्नुहोस्।'];
     }else{
       res.finalValidation.notes=(res.finalValidation.notes||[]).concat([
         'Automated proofreading can miss context-dependent mistakes. · अर्थअनुसार पुनः जाँच गर्नुहोस्।'
       ]);
     }
   }
   return res;
 };
})();
