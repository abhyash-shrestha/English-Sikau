import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const scope={window:{}};
vm.runInNewContext(readFileSync('build-typescript/header-language.js','utf8'),scope);
const model=scope.window.sikauHeaderLanguage;
const modes=['en-ne','en-roman','all','en'];
for (const dark of [false,true]) for (const mode of modes){
 assert.equal(model.normalize(mode),mode);
 const copy=model.copy(mode,'Learner',dark);
 assert.ok(copy.greeting.includes('Learner'));
 assert.ok(copy.signout.startsWith('Sign out'));
 assert.ok(copy.themeAria.startsWith(dark?'Switch to light mode':'Switch to dark mode'));
}
assert.equal(model.normalize('invalid'),'en-ne');
assert.equal(model.copy('all','Learner',false).greeting,'Welcome back 👋 नमस्ते (Namaste), Learner 🙏');
assert.equal(model.copy('en','Learner',true).themeLabel,'Light');
const published={window:{}};
vm.runInNewContext(readFileSync('header-language.js','utf8'),published);
for(const dark of [false,true])for(const mode of modes){
 assert.equal(JSON.stringify(model.copy(mode,'Learner',dark)),JSON.stringify(published.window.sikauHeaderLanguage.copy(mode,'Learner',dark)));
}
console.log('All header language and compiled-runtime parity checks passed.');
