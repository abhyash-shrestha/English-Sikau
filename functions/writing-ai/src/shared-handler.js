import {createWritingAI} from './main.js';

// Optional Free-plan adapter: leave legacy source and behavior untouched.
// Activate only after a backup, regression tests and production approval.
export function createSharedHandler(legacyHandler,options={}){
 const writing=createWritingAI({...options,trialStatusFor:async({req})=>{
  let timer;
  const result=await Promise.race([legacyHandler({req:{...req,bodyJson:{action:'status'},bodyText:'{"action":"status"}',body:'{"action":"status"}'},
   res:{json:(body,status=200)=>({body,status})},error:()=>{}}),
   new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('Trial verification timeout')),8000);})]).finally(()=>clearTimeout(timer));
  return result?.status===200?result.body:null;
 }});
 return context=>{
  let action;
  try{
   if(typeof context.req.bodyText==='string'&&Buffer.byteLength(context.req.bodyText)>16000)return legacyHandler(context);
   const body=context.req.bodyJson??JSON.parse(context.req.bodyText||context.req.body||'{}');
   action=body?.action;
  }catch(_){return legacyHandler(context);}
  return action==='writing-review'?writing(context):legacyHandler(context);
 };
}
