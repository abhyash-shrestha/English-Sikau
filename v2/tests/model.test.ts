import {test} from 'node:test';
import assert from 'node:assert/strict';
import {tabs,primary,normalize,isCorrect,line,findPhrase,progressCount} from '../src/model.ts';
test('unique navigation destinations and valid dock',()=>{assert.equal(new Set(tabs.map(t=>t[0])).size,tabs.length);for(const p of primary)assert.ok(tabs.some(t=>t[0]===p))});
test('festival destination is independent of home',()=>{assert.ok(tabs.some(t=>t[0]==='festivals'));assert.notEqual(tabs.find(t=>t[0]==='home')?.[2],tabs.find(t=>t[0]==='festivals')?.[2])});
test('phrasebook matches both directions',()=>{const p=line('Hello.','नमस्ते।','Namaste.');assert.equal(findPhrase(' HELLO! ','en-ne',[p]),p);assert.equal(findPhrase('नमस्ते','ne-en',[p]),p);assert.equal(findPhrase('missing','en-ne',[p]),undefined)});
test('vocabulary normalization',()=>{assert.equal(normalize(' Water! '),'water');assert.ok(isCorrect('Book','book.'));assert.ok(!isCorrect('book','water'))});
test('preview progress excludes navigation and deduplicates',()=>assert.equal(progressCount(['home','coach','coach','progress','read']),2));
