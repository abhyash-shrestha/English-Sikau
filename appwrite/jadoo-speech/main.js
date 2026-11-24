// English Sikau authenticated adapter for the existing JADOO private beta.
// Node 22 Appwrite Function. No credentials in source; do not grant guest execution.
const API='https://fra.cloud.appwrite.io/v1';
const PROJECT='6ac9b80d0009575e5d4d';
const TRIAL='6acaf5fe00349b7b8d3d';
const GATEWAY='https://jadoo-voice-studio.pages.dev/api/speak';
const STATUS='https://jadoo-voice-studio.pages.dev/api/status';
const MAX_AUDIO=1400000;
const fail=(res,status,message)=>res.json({status:'error',error:message},status);
export function prepareText(value,lang='ne-NP'){
 if(typeof value!=='string')return null;
 const text=value.normalize('NFC').replace(/[\r\n\t ]+/g,' ').trim();
 if(!text||[...text].length>220||!(['ne-NP','en-US'].includes(lang))||(lang==='ne-NP'?!/[\u0900-\u097f]/u.test(text):(!/[a-z]/i.test(text)||/[\u0900-\u097f]/u.test(text)))||/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/u.test(text))return null;
 return text;
}
export function validWav(bytes){
 if(bytes.length<46||bytes.length>MAX_AUDIO||bytes.toString('ascii',0,4)!=='RIFF'||bytes.toString('ascii',8,12)!=='WAVE'||bytes.readUInt32LE(4)+8!==bytes.length)return false;
 let offset=12,align=0,data=0;
 while(offset+8<=bytes.length){
  const tag=bytes.toString('ascii',offset,offset+4),size=bytes.readUInt32LE(offset+4),start=offset+8;
  if(start+size>bytes.length)return false;
  if(tag==='fmt '){
   if(size<16||bytes.readUInt16LE(start)!==1)return false;
   const channels=bytes.readUInt16LE(start+2),rate=bytes.readUInt32LE(start+4);
   align=bytes.readUInt16LE(start+12);
   if(![1,2].includes(channels)||rate<8000||rate>192000||bytes.readUInt16LE(start+14)!==16||align!==channels*2||bytes.readUInt32LE(start+8)!==rate*align)return false;
  }else if(tag==='data'){data+=size}
  offset=start+size+(size%2);
 }
 return offset===bytes.length&&align>0&&data>0&&data%align===0;
}
async function limitedAudio(response){
 if(!response.ok||!response.headers.get('content-type')?.toLowerCase().startsWith('audio/wav'))throw Error('audio unavailable');
 const declared=Number(response.headers.get('content-length')||0);
 if(declared>MAX_AUDIO||!response.body)throw Error('audio too large');
 const reader=response.body.getReader(),chunks=[];let total=0;
 try{for(;;){const {done,value}=await reader.read();if(done)break;total+=value.byteLength;if(total>MAX_AUDIO)throw Error('audio too large');chunks.push(Buffer.from(value));}}
 catch(e){await reader.cancel().catch(()=>{});throw e}finally{reader.releaseLock()}
 const bytes=Buffer.concat(chunks,total);
 if(!validWav(bytes))throw Error('invalid wave');
 return bytes.toString('base64');
}
export function activeTrial(body){
 const now=Date.parse(body?.serverNow||''),expiry=Date.parse(body?.expiresAt||'');
 return body?.ok===true&&body.used===true&&body.active===true&&Number.isFinite(now)&&Number.isFinite(expiry)&&now<expiry;
}
async function authorized(req){
 const jwt=req.headers['x-appwrite-user-jwt'],uid=req.headers['x-appwrite-user-id'];
 if(typeof jwt!=='string'||!jwt||typeof uid!=='string'||!uid)return false;
 const headers={'X-Appwrite-Project':PROJECT,'X-Appwrite-JWT':jwt,'Content-Type':'application/json'};
 const account=await fetch(API+'/account',{headers,redirect:'error',signal:AbortSignal.timeout(3500)});
 if(!account.ok)return false;
 const user=await account.json();
 if(user.$id!==uid||user.emailVerification!==true)return false;
 if(Array.isArray(user.labels)&&user.labels.some(label=>label==='sikaupaid'||label==='sikautestpaid'))return true;
 const response=await fetch(API+'/functions/'+TRIAL+'/executions',{method:'POST',headers,body:JSON.stringify({body:JSON.stringify({action:'status'}),async:false}),redirect:'error',signal:AbortSignal.timeout(3500)});
 if(!response.ok)return false;
 const execution=await response.json();
 return execution.status==='completed'&&execution.responseStatusCode===200&&activeTrial(JSON.parse(execution.responseBody||'null'));
}
export default async ({req,res})=>{
 try{
  if(req.method!=='POST')return fail(res,405,'POST required');
  const raw=req.bodyText||'';
  if(raw.length>4096)return fail(res,413,'Request too large');
  let body;try{body=JSON.parse(raw)}catch{return fail(res,400,'Invalid JSON')}
  if(!body||typeof body!=='object'||Array.isArray(body))return fail(res,400,'Invalid request');
  if(!await authorized(req))return fail(res,403,'Active verified student access required');
  const code=process.env.JADOO_BETA_CODE?.trim();
  if(process.env.JADOO_SIKAU_ENABLED!=='true'||!code||code.length<12)return fail(res,503,'Voice service is not configured');
  if(body.action==='capabilities'){
   const response=await fetch(STATUS,{redirect:'error',signal:AbortSignal.timeout(3500)});
   const status=response.ok?await response.json():null;
   return res.json({status:'ok',tts:status?.ready===true,transcription:false,languages:process.env.JADOO_ENGLISH_VERIFIED==='true'?['ne-NP','en-US']:['ne-NP'],voice:'SAHARA'});
  }
  if(body.action&&body.action!=='tts')return fail(res,400,'Unsupported speech action');
  if(body.lang!=='ne-NP'&&!(body.lang==='en-US'&&process.env.JADOO_ENGLISH_VERIFIED==='true'))return fail(res,400,'Requested speech language is not enabled');
  const text=prepareText(body.text,body.lang);
  if(!text)return fail(res,400,'Enter 1–220 characters in the requested language');
  // Keep existing JADOO quota enforcement and provider secrets server-side.
  // Appwrite synchronous execution is limited to 30 seconds; do not resubmit
  // on timeout. The native locale fallback handles slow GPU cold starts.
  const response=await fetch(GATEWAY,{method:'POST',redirect:'error',headers:{'Content-Type':'application/json','Accept':'audio/wav'},body:JSON.stringify({text,voice:'maya',accessCode:code}),signal:AbortSignal.timeout(18000)});
  if(response.status===429)return fail(res,429,'Voice generation quota reached');
  const audioBase64=await limitedAudio(response);
  return res.json({status:'ok',mime:'audio/wav',audioBase64,voice:'SAHARA'});
 }catch{return fail(res,503,'Natural Nepali voice temporarily unavailable')}
};
