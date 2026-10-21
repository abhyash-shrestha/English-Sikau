import {createHash} from 'node:crypto';
export class QuotaError extends Error{
 constructor(code,message,message_ne,retryAfter){super(message);Object.assign(this,{code,message_ne,retryAfter});}
}
const hash=id=>createHash('sha256').update(id).digest('hex').slice(0,20);
const safeId=id=>typeof id==='string'&&/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,35}$/.test(id);

// Atomic reservations survive cold starts and concurrent Function instances.
// This dedicated table contains counters ONLY, never writing or identities.
export async function reserveQuota({fetchImpl,env,req,userId,now}){
 const database=env.WRITING_AI_DATABASE_ID,table=env.WRITING_AI_QUOTA_TABLE_ID;
 const key=req.headers?.['x-appwrite-key'];
 if(!safeId(database)||!safeId(table)||!key||table===env.TRIAL_TABLE_ID||table===env.PROGRESS_TABLE_ID)throw Error('quota configuration');
 const base='https://fra.cloud.appwrite.io/v1/tablesdb/'+database+'/tables/'+table+'/rows';
 const headers={'X-Appwrite-Project':'6ac9b80d0009575e5d4d','X-Appwrite-Key':key,'Content-Type':'application/json'};
 const request=(url,method,body)=>fetchImpl(url,{method,headers,body:body===undefined?undefined:JSON.stringify(body),signal:AbortSignal.timeout(4000)});
 const day=Math.floor(now/86400000),wait=Math.ceil(((day+1)*86400000-now)/1000);
 const personal='u-'+hash(userId)+'-'+day,global='g-'+day;
 const dayError=()=>new QuotaError('daily_limit','Today’s free AI checks are used. Try again tomorrow.','आजको निःशुल्क एआई जाँचको सीमा पुग्यो। भोलि प्रयास गर्नुहोस्।',wait);
 const busy=()=>new QuotaError('busy','AI is busy. Please wait a minute, then try again.','एआई व्यस्त छ। एक मिनेटपछि फेरि प्रयास गर्नुहोस्।',120);
 for(const [id,limit] of [[personal,5],[global,16]]){
  const result=await request(base+'/'+id,'GET');
  if(result.ok){const row=await result.json();if(!Number.isInteger(row.count)||row.count<0)throw Error('invalid counter');if(row.count>=limit)throw dayError();}
  else if(result.status!==404)throw Error('quota read');
 }
 // Two overlapping 120s windows prevent a burst at the minute boundary. Two
 // requests less than 60s apart always conflict on at least one unique row ID.
 for(const id of ['a-'+Math.floor(now/120000),'b-'+Math.floor((now+60000)/120000)]){
  const result=await request(base,'POST',{rowId:id,data:{count:1},permissions:[]});
  if(result.status===409)throw busy();
  if(result.status!==201)throw Error('quota window');
 }
 for(const [id,limit] of [[personal,5],[global,16]]){
  const result=await request(base,'POST',{rowId:id,data:{count:1},permissions:[]});
  if(result.status===409){
   const increment=await request(base+'/'+id+'/count/increment','PATCH',{value:1,max:limit});
   if(increment.status===400||increment.status===409)throw dayError();
   if(!increment.ok)throw Error('quota increment');
  }else if(result.status!==201)throw Error('quota create');
 }
 // Never refund failed provider attempts: that would permit retry storms.
 // Nothing here reads or modifies trials, memberships or progress.
}
