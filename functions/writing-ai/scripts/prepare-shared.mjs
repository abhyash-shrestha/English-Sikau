// Prepare, but never upload or activate, a Free-plan shared Function package.
// Usage: node scripts/prepare-shared.mjs <downloaded-source-dir> <new-output-dir>
import {readFile,mkdir,copyFile,cp,writeFile,access} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {createHash} from 'node:crypto';
const [sourceArg,destArg]=process.argv.slice(2);
if(!sourceArg||!destArg)throw Error('Provide a downloaded legacy source directory and a new output directory.');
const source=resolve(sourceArg),dest=resolve(destArg);
try{await access(dest);throw Error('Output must not already exist.');}catch(e){if(e.code!=='ENOENT')throw e;}
const original=await readFile(join(source,'src/main.js'));
const pkg=JSON.parse(await readFile(join(source,'package.json'),'utf8'));
if(pkg.dependencies?.['node-appwrite']!=='29.2.0'||!original.toString().includes('export default createTrialManager();'))
 throw Error('Unexpected legacy source. Review this deployment before packaging.');
await mkdir(dest,{recursive:true});
await cp(join(source,'src'),join(dest,'src'),{recursive:true});
await copyFile(join(source,'package.json'),join(dest,'package.json'));
await copyFile(join(source,'package-lock.json'),join(dest,'package-lock.json'));
await cp(new URL('../src/',import.meta.url),join(dest,'src/writing-ai'),{recursive:true});
await writeFile(join(dest,'src/with-writing-ai.js'),"import legacy from './main.js';\nimport {createSharedHandler} from './writing-ai/shared-handler.js';\nexport default createSharedHandler(legacy);\n",{mode:0o600});
const hash=data=>createHash('sha256').update(data).digest('hex');
const copied=await readFile(join(dest,'src/main.js'));
if(hash(original)!==hash(copied))throw Error('Legacy source changed during packaging.');
await writeFile(join(dest,'package-manifest.json'),JSON.stringify({
 legacyMainSha256:hash(original),legacyPackageSha256:hash(await readFile(join(source,'package.json'))),
 entrypoint:'src/with-writing-ai.js',legacyEntrypoint:'src/main.js',
 trialSourceChanged:false,activation:'Requires separate production approval; feature remains disabled.'
},null,2)+'\n',{mode:0o600});
console.log('Prepared shared package; legacy source is byte-for-byte unchanged. Nothing uploaded or activated.');
