import {reserveQuota, QuotaError} from './quota.js';
import {buildCompletion, normalizeReview} from './review.js';

const ENDPOINT='https://fra.cloud.appwrite.io/v1';
const PROJECT='6ac9b80d0009575e5d4d';
const TRIAL='6acaf5fe00349b7b8d3d';
const headers={'Cache-Control':'private, no-store, max-age=0','Pragma':'no-cache',
 'X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'};

export function parseInput(req){
 const raw=req.bodyText??req.body??'';
 if(typeof raw==='string'&&Buffer.byteLength(raw)>16000)throw Error('size');
 const value=req.bodyJson??(typeof raw==='string'?JSON.parse(raw):raw);
 if(!value||typeof value!=='object'||Array.isArray(value))throw Error('json');
 if(Buffer.byteLength(JSON.stringify(value))>16000)throw Error('size');
 const {answer,topicEn,topicNe=''}=value;
 if(typeof answer!=='string'||typeof topicEn!=='string'||typeof topicNe!=='string')throw Error('input');
 if(answer.trim().length<15||answer.length>2800||!topicEn.trim()||topicEn.length>850||topicNe.length>850)throw Error('input');
 return {answer:answer.trim(),topicEn:topicEn.trim(),topicNe:topicNe.trim()};
}

export function validTrial(state,now){
 const start=Date.parse(state?.startedAt),end=Date.parse(state?.expiresAt),checked=Date.parse(state?.serverNow);
 return state?.ok===true&&state.used===true&&state.active===true&&
  Number.isFinite(start)&&Number.isFinite(end)&&Number.isFinite(checked)&&
  end-start===3600000&&Math.abs(now-checked)<30000&&now>=start&&now<end;
}

export function createWritingAI({fetchImpl=fetch,clock=()=>Date.now(),env=process.env,
 reserve=reserveQuota,trialStatusFor}={}){
 return async ({req,res})=>{
  const reply=(code,message,message_ne,status=503,extra={})=>res.json({status:'unavailable',code,message,message_ne,...extra},status,headers);
  if(req.headers?.['x-appwrite-trigger']!=='http')return reply('http_required','Sign in to check writing.','लेखन जाँच गर्न साइन इन गर्नुहोस्।',403);
  if(req.method!=='POST')return reply('method','Use a writing check request.','लेखन जाँच अनुरोध प्रयोग गर्नुहोस्।',405);
  const jwt=req.headers?.['x-appwrite-user-jwt'];
  if(!jwt)return reply('signin','Sign in to check writing.','लेखन जाँच गर्न साइन इन गर्नुहोस्।',401);
  let input;
  try{input=parseInput(req);}catch(e){return reply('input','Write 15–2,800 characters and select a topic.','विषय छानेर १५–२,८०० अक्षर लेख्नुहोस्।',e.message==='size'?413:400);}
  const userHeaders={'X-Appwrite-Project':PROJECT,'X-Appwrite-JWT':jwt,'Content-Type':'application/json'};
  const deadline=AbortSignal.timeout(26000);
  const boundedFetch=(url,options={})=>fetchImpl(url,{...options,signal:AbortSignal.any([deadline,options.signal].filter(Boolean))});
  let person,trialExpiry=null;
  try{
   const account=await boundedFetch(ENDPOINT+'/account',{headers:userHeaders,signal:AbortSignal.timeout(5000)});
   if(!account.ok)return reply('signin','Please sign in again.','फेरि साइन इन गर्नुहोस्।',401);
   person=await account.json();
   if(!person?.$id||person.emailVerification!==true||person.status!==true)
    return reply('verified','An active, verified account is required.','सक्रिय र इमेल पुष्टि भएको खाता चाहिन्छ।',403);
   if(req.headers['x-appwrite-user-id']&&req.headers['x-appwrite-user-id']!==person.$id)
    return reply('signin','Please sign in again.','फेरि साइन इन गर्नुहोस्।',401);
   const roles=Array.isArray(person.labels)?person.labels:[];
   // Preserve the owner's existing internal test membership without changing
   // paid labels or trial dates. This exception is bound to one server-set ID
   // and still requires reviewed pilot enrollment and every normal quota.
   const approvedQA=env.WRITING_AI_QA_USER_ID===person.$id&&roles.includes('sikautestpaid');
   if(!roles.includes('sikaupaid')&&!approvedQA){
    let state;
    if(trialStatusFor)state=await trialStatusFor({req,person});
    else{
     const response=await boundedFetch(ENDPOINT+'/functions/'+TRIAL+'/executions',{
      method:'POST',headers:userHeaders,body:JSON.stringify({body:JSON.stringify({action:'status'}),async:false,method:'POST'}),signal:AbortSignal.timeout(8000)});
     if(response.ok){
      const execution=await response.json();
      if(execution.status==='completed'&&execution.responseStatusCode===200)state=JSON.parse(execution.responseBody);
     }
    }
    if(!validTrial(state,clock()))return reply('membership','An active trial or paid membership is required.','सक्रिय परीक्षण अवधि वा सशुल्क सदस्यता चाहिन्छ।',403);
    trialExpiry=Date.parse(state.expiresAt);
   }
  }catch(_){return reply('verification','We could not verify access. Please try again.','पहुँच पुष्टि भएन। फेरि प्रयास गर्नुहोस्।');}

  // Server-controlled pilot enrollment; never trust browser age/preferences.
  if(!Array.isArray(person.labels)||!person.labels.includes('sikauaiapproved'))
   return reply('eligibility','AI review is not enabled for this account yet. You can use the basic checker.','यो खातामा एआई जाँच खुलाइएको छैन। सामान्य जाँच प्रयोग गर्न सक्नुहुन्छ।',403);
  // A narrow contact-data guard, not a claim of complete anonymization.
  const submitted=[input.answer,input.topicEn,input.topicNe].join('\n');
  if(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(submitted)||/(?:\+?\d[\s().-]*){9,15}/.test(submitted))
   return reply('privacy','Remove email addresses, phone numbers or account numbers before using AI.','एआई प्रयोग गर्नुअघि इमेल, फोन वा खाता नम्बर हटाउनुहोस्।',400);
  if(env.WRITING_AI_ENABLED!=='true'||env.GROQ_FREE_TIER_CONFIRMED!=='true'||!env.GROQ_API_KEY)
   return reply('configuration','AI review is not available yet. You can use the basic checker.','एआई जाँच अहिले उपलब्ध छैन। सामान्य जाँच प्रयोग गर्न सक्नुहुन्छ।');
  let completion;
  try{completion=buildCompletion(input);}catch(_){return reply('length','Please shorten this paragraph or topic for the free AI check.','निःशुल्क एआई जाँचका लागि लेख वा प्रश्न अलि छोटो बनाउनुहोस्।',400);}
  try{
   await reserve({fetchImpl:boundedFetch,env,req,userId:person.$id,now:clock()});
  }catch(e){
   if(e instanceof QuotaError)return reply(e.code,e.message,e.message_ne,429,{retryAfter:e.retryAfter});
   return reply('quota_unavailable','AI review is temporarily unavailable. Try again later.','एआई जाँच अहिले उपलब्ध छैन। केहीबेरपछि प्रयास गर्नुहोस्।');
  }
  if(trialExpiry!==null&&clock()>=trialExpiry)return reply('membership','Your trial has ended.','तपाईंको परीक्षण अवधि सकियो।',403);
  try{
   const response=await boundedFetch('https://api.groq.com/openai/v1/chat/completions',{
    method:'POST',headers:{Authorization:'Bearer '+env.GROQ_API_KEY,'Content-Type':'application/json'},
    body:JSON.stringify(completion),signal:AbortSignal.timeout(18000)});
   if(!response.ok){
    if(response.status===429)return reply('provider_limit','The free AI allowance is busy. Please try later.','निःशुल्क एआईको सीमा पुगेको छ। केहीबेरपछि प्रयास गर्नुहोस्।',429,{retryAfter:Math.max(60,Math.min(86400,Number(response.headers.get('retry-after'))||60))});
    return reply('provider','AI review is temporarily unavailable. You can use the basic checker.','एआई जाँच अहिले उपलब्ध छैन। सामान्य जाँच प्रयोग गर्न सक्नुहुन्छ।');
   }
   const data=await response.json(),choice=data?.choices?.[0];
   if(choice?.finish_reason!=='stop'||choice.message?.refusal)throw Error('incomplete');
   const review=normalizeReview(JSON.parse(choice.message.content),input.answer);
   return res.json({status:'ok',engine:'groq-free',model:'openai/gpt-oss-20b',review},200,headers);
  }catch(_){return reply('provider_result','AI did not finish a reliable review. Please retry later or use the basic checker.','एआई जाँच पूरा भएन। पछि प्रयास गर्नुहोस् वा सामान्य जाँच प्रयोग गर्नुहोस्।');}
 };
}
export default createWritingAI();
