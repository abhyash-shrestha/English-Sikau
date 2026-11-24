import {Account,Client,Functions} from 'appwrite';
const config={endpoint:'https://fra.cloud.appwrite.io/v1',project:'6ac9b80d0009575e5d4d',progress:'6acc34ea0003a1c0c25a'};
const client=new Client().setEndpoint(config.endpoint).setProject(config.project);
const account=new Account(client);
const functions=new Functions(client);
export type Profile=Readonly<{id:string;name:string;email:string;verified:boolean;paid:boolean}>;
function profile(u:Awaited<ReturnType<Account['get']>>):Profile {
 return {id:u.$id,name:u.name,email:u.email,verified:u.emailVerification,paid:u.emailVerification&&u.labels.some(x=>x==='sikaupaid'||x==='sikautestpaid')};
}
export async function currentProfile():Promise<Profile|null>{
 try{return profile(await account.get())}catch(e){if((e as {code?:number}).code===401)return null;throw e}
}
export async function signIn(email:string,password:string){await account.createEmailPasswordSession(email.trim().toLowerCase(),password);return profile(await account.get())}
export async function signOut(){await account.deleteSession('current')}
export type VerifiedProgress={xp:number;streak:number;mastery:number;chapters:number};
export async function readProgress(expected:Profile):Promise<VerifiedProgress>{
 const current=await currentProfile();
 if(!current?.verified||!current.paid||current.id!==expected.id)throw Error('Verified lifetime membership is required.');
 const execution=await functions.createExecution(config.progress,JSON.stringify({action:'progressGet'}),false);
 const result=JSON.parse(execution.responseBody||'null');
 if(execution.status!=='completed'||execution.responseStatusCode!==200||result?.ok!==true)throw Error('Server progress unavailable.');
 const p=result.progress;
 if(!p||![p.xp,p.streak,p.mastery].every(n=>Number.isSafeInteger(n)&&n>=0)||!Array.isArray(p.completedChapters))throw Error('Invalid progress response.');
 if((await currentProfile())?.id!==expected.id)throw Error('Account changed.');
 return {xp:p.xp,streak:p.streak,mastery:p.mastery,chapters:p.completedChapters.filter((x:unknown)=>typeof x==='string').length};
}
