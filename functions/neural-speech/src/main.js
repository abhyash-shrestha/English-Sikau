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
// Google AI Studio provides a key-based Gemini TTS API, with a limited
// free tier for eligible models/accounts. Keys remain server-side.
// Gemini 2.5 TTS returns headerless 16-bit PCM (24kHz mono).
function wavFromPcm(pcm){
 if(!pcm.length||pcm.length%2||pcm.length>1300000)throw Error('Invalid PCM');
 const wav=Buffer.allocUnsafe(44+pcm.length);
 wav.write('RIFF',0);wav.writeUInt32LE(36+pcm.length,4);
 wav.write('WAVEfmt ',8);wav.writeUInt32LE(16,16);
 wav.writeUInt16LE(1,20);wav.writeUInt16LE(1,22);
 wav.writeUInt32LE(24000,24);wav.writeUInt32LE(48000,28);
 wav.writeUInt16LE(2,32);wav.writeUInt16LE(16,34);
 wav.write('data',36);wav.writeUInt32LE(pcm.length,40);
 pcm.copy(wav,44);
 return wav;
}
const GEMINI_TTS_MODELS=Object.freeze(new Set([
 'gemini-3.8-flash-tts',
 'gemini-3.8-flash-lite-tts',
 'gemini-2.5-flash-preview-tts'
]));
async function geminiAudio(text,lang,gender,key){
 // Verified Google Gemini TTS doc: Gemini 3.8 returns a complete RIFF WAV
 // for a unary generateContent request. The older 2.5 model instead
 // returns headerless 24kHz/16-bit PCM in some responses.
 const name=gender==='male'?'Charon':'Kore';
 const requested=String(process.env.GEMINI_TTS_MODEL||'gemini-3.8-flash-tts');
 const model=GEMINI_TTS_MODELS.has(requested)?requested:'gemini-3.8-flash-tts';
 const modern=model.startsWith('gemini-3.8-');
 const style=lang==='ne-NP'
  ?'Speak naturally in Nepali as a person from Nepal would. Conversational, friendly, warm, with smooth sentence rhythm and gentle pauses. Enunciate clearly, without a Hindi accent.'
  :'Warm, natural conversational American English for an English learner. Expressive but not exaggerated. Clear consonants, relaxed pacing and appropriate emphasis.';
 const part=modern?{text,speech_metadata:{style}}:{
  text:(lang==='ne-NP'?'Speak natural Nepali from Nepal. ':'Speak natural English. ')+
   'Read exactly this sentence without adding words: '+text
 };
 const voiceConfig=modern?{voice:name}:{prebuiltVoiceConfig:{voiceName:name}};
 const response=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent',{
  method:'POST',
  headers:{'x-goog-api-key':key,'Content-Type':'application/json'},
  body:JSON.stringify({
   contents:[{role:'user',parts:[part]}],
   generationConfig:{
    responseModalities:['AUDIO'],
    speechConfig:{voiceConfig}
   }
  }),
  signal:AbortSignal.timeout(20000)
 });
 if(!response.ok)throw Error(response.status===429?'rate-limit':'provider-unavailable');
 const json=await response.json();
 const block=json?.candidates?.[0]?.content?.parts?.find(part=>
  typeof part?.inlineData?.data==='string')?.inlineData;
 if(typeof block?.data!=='string')throw Error('No audio data');
 const bytes=Buffer.from(block.data,'base64');
 const hasWavHeader=bytes.length>=44&&
  bytes.toString('ascii',0,4)==='RIFF'&&bytes.toString('ascii',8,12)==='WAVE';
 const format=String(block.mimeType||'').toLowerCase();
 if(format.includes('wav')&&!hasWavHeader)throw Error('Malformed WAV');
 if(modern&&!hasWavHeader&&format&&!format.includes('pcm')&&!format.includes('l16'))
  throw Error('Unrecognized audio format');
 // Accept actual RIFF WAV unmodified to avoid double-header corruption,
 // a common reason AI-generated audio is distorted or cannot play.
 const wav=hasWavHeader?bytes:wavFromPcm(bytes);
 if(wav.length<48||wav.length>1400000)throw Error('Audio too large');
 return {mime:'audio/wav',voice:name,model,engine:'gemini-neural',
  audioBase64:wav.toString('base64')};
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
 const geminiKey=process.env.GEMINI_API_KEY;
 const key=process.env.AZURE_SPEECH_KEY;
 const region=String(process.env.AZURE_SPEECH_REGION||'').trim().toLowerCase();
 const provider=String(process.env.SPEECH_PROVIDER||'').trim().toLowerCase();
 // Prefer owner-selected provider, then an existing Azure Speech resource,
 // then Gemini AI Studio's free-tier-capable TTS endpoint.
 const useGemini=provider==='gemini'||(!key&&!!geminiKey);
 if(useGemini&&geminiKey){
  try{return reply({status:'ok',...(await geminiAudio(text,lang,gender,geminiKey))})}
  catch(_){return reply({status:'unavailable',message:
   'Natural speech provider unavailable or free request allowance reached'},503)}
 }
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
