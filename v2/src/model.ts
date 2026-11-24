export type Tab = 'home'|'coach'|'translate'|'read'|'words'|'write'|'speak'|'game'|'visa'|'festivals'|'progress';
export type Language = 'en'|'bilingual'|'roman'|'all';
export type Line = Readonly<{en:string; ne:string; roman:string}>;
export const tabs = [
  ['home','⌂','Home','गृहपृष्ठ'],['coach','💬','Coach','कुराकानी'],
  ['translate','⇄','Translate','अनुवाद'],['read','📖','Read','पठन'],
  ['words','🔤','Words','शब्दहरू'],['write','✍','Write','लेखन'],
  ['speak','🎙','Speak','बोल्ने'],['game','🎮','Game','खेल'],
  ['visa','🛂','US Visa','भिसा'],['festivals','🎉','Nepali Festivals','चाडपर्व'],
  ['progress','📈','Progress','प्रगति']
] as const satisfies readonly (readonly [Tab,string,string,string])[];
export const primary:readonly Tab[]=['home','coach','read','festivals'];
export const line = (en:string,ne:string,roman:string):Line=>({en,ne,roman});
export function normalize(s:string){return s.normalize('NFC').trim().toLowerCase().replace(/[.!?।]+$/u,'').trim().replace(/\s+/gu,' ')}
export function isCorrect(input:string,expected:string){return normalize(input)===normalize(expected)}
export function findPhrase(input:string,dir:'en-ne'|'ne-en',phrases:readonly Line[]):Line|undefined {
 return phrases.find(p=>isCorrect(input,dir==='en-ne'?p.en:p.ne));
}
export function progressCount(ids:readonly Tab[]):number{return new Set(ids.filter(id=>id!=='home'&&id!=='progress')).size}
