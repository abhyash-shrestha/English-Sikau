/**
 * English Sikau authenticated neural TTS (Appwrite Node.js 20+).
 * The Azure key is NEVER sent to GitHub Pages or a learner's device.
 * Function execution: authenticated Users only, no public domains/logs.
 */
const ENDPOINT='https://fra.cloud.appwrite.io/v1';
const PROJECT='6ac9b80d0009575e5d4d';
const TRIAL_FUNCTION='6acaf5fe00349b7b8d3d';
const VOICES=Object.freeze({
 'ne-NP':Object.freeze({female:'ne-NP-HemkalaNeural',male:'ne-NP-SagarNeural'}),
 'en-US':Object.freeze({female:'en-US-AvaNeural',male:'en-US-AndrewNeural'})
});
// An instance-local guard is useful but is NOT a durable per-account quota.
// Before public scale, add atomic per-account limits with Appwrite TablesDB.
const bursts=new Map();
const take=(value,limit)=>typeof value==='string'?value.trim().slice(0,limit):'';
const escapeXml=s=>s.replace(/[&<>"']/g,c=>({
 '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'
})[c]).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g,'');
function bodyOf(req){
 if(req.bodyJson&&typeof req.bodyJson==='object')return req.bodyJson;
 const raw=req.bodyText||req.body||'{}';
 return typeof raw==='string'?JSON.parse(raw):raw;
}
async function verify(jwt){
 const account=await fetch(ENDPOINT+'/account',{
  headers:{'x-appwrite-project':PROJECT,'x-appwrite-jwt':jwt},
  signal:AbortSignal.timeout(6500)
 });
 if(!account.ok)return null;
 const person=await account.json();
 if(!person?.$id||person.emailVerification!==true)return null;
 if(Array.isArray(person.labels)&&
    person.labels.some(label=>label==='sikaupaid'||label==='sikautestpaid'))
   return person.$id;
 const trial=await fetch(ENDPOINT+'/functions/'+TRIAL_FUNCTION+'/executions',{
  method:'POST',
  headers:{'x-appwrite-project':PROJECT,'x-appwrite-jwt':jwt,'content-type':'application/json'},
  body:JSON.stringify({body:JSON.stringify({action:'status'}),async:false}),
  signal:AbortSignal.timeout(8000)
 });
 if(!trial.ok)return null;
 const result=await trial.json();
 let info;
 try{info=JSON.parse(result.responseBody||'{}')}catch(_){return null}
 const expiry=Date.parse(info?.expiresAt||''),now=Date.parse(info?.serverNow||'');
 return result.status==='completed'&&result.responseStatusCode===200&&
  info.used===true&&info.active===true&&Number.isFinite(expiry)&&
  Number.isFinite(now)&&now<expiry?person.$id:null;
}
function allowed(user){
 const now=Date.now();
 for(const [key,hits] of bursts)if(hits.until<=now)bursts.delete(key);
 let bucket=bursts.get(user);
 if(!bucket){bucket={count:0,until:now+60000};bursts.set(user,bucket)}
 if(bucket.count>=12)return false;
 bucket.count++;
 return true;
}
export default async function({req,res}){
 const reply=(payload,code=200)=>res.json(payload,code,{
  'Cache-Control':'no-store','Pragma':'no-cache'
 });
 if(String(req?.method||'POST').toUpperCase()!=='POST')
  return reply({status:'error',message:'Method not allowed'},405);
 const jwt=req?.headers?.['x-appwrite-user-jwt'];
 if(!jwt)return reply({status:'error',message:'Sign-in required'},401);
 let user;
 try{user=await verify(jwt)}
 catch(_){return reply({status:'unavailable',message:'Account verification unavailable'},503)}
 if(!user)return reply({status:'error',message:'Verified active membership or trial required'},403);
 let input;
 try{input=bodyOf(req)}catch(_){return reply({status:'error',message:'Invalid JSON'},400)}
 const text=take(input?.text,1200);
 const lang=input?.lang,gender=input?.gender;
 if(!VOICES[lang]||!['female','male'].includes(gender)||
   !text||text.length>550||Buffer.byteLength(text,'utf8')>2200)
  return reply({status:'error',message:'Invalid speech input'},400);
 if(!allowed(user))return reply({status:'unavailable',message:'Too many speech requests; try again shortly'},429);
 const key=process.env.AZURE_SPEECH_KEY;
 const region=String(process.env.AZURE_SPEECH_REGION||'').trim().toLowerCase();
 if(!key||!/^[a-z0-9]{2,20}$/.test(region))
  return reply({status:'unavailable',message:'Natural speech is not configured'},503);
 const name=VOICES[lang][gender];
 const ssml='<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis"'+
  ' xml:lang="'+lang+'"><voice name="'+name+'">'+escapeXml(text)+'</voice></speak>';
 try{
  const response=await fetch('https://'+region+'.tts.speech.microsoft.com/cognitiveservices/v1',{
   method:'POST',
   headers:{
    'Ocp-Apim-Subscription-Key':key,
    'Content-Type':'application/ssml+xml',
    'X-Microsoft-OutputFormat':'audio-24khz-48kbitrate-mono-mp3',
    'User-Agent':'English-Sikau-Neural-TTS'
   },
   body:ssml,
   signal:AbortSignal.timeout(13000)
  });
  if(!response.ok)return reply({status:'unavailable',message:
   response.status===429?'Speech allowance reached':'Natural speech provider unavailable'},503);
  const bytes=Buffer.from(await response.arrayBuffer());
  if(!bytes.length||bytes.length>1400000)
   return reply({status:'unavailable',message:'Speech response invalid'},503);
  return reply({status:'ok',engine:'azure-neural',mime:'audio/mpeg',
   voice:name,audioBase64:bytes.toString('base64')});
 }catch(_){
  return reply({status:'unavailable',message:'Natural speech timed out'},503);
 }
}
