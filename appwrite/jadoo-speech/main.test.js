import test from 'node:test';
import assert from 'node:assert/strict';
import handler,{prepareText,validWav,activeTrial} from './main.js';
test('Nepali text is bounded and normalized',()=>{
 assert.equal(prepareText('  नमस्ते  नेपाल।  '),'नमस्ते नेपाल।');
 assert.equal(prepareText('hello'),null);
 assert.equal(prepareText('Hello, how are you?','en-US'),'Hello, how are you?');
 assert.equal(prepareText('नमस्ते','en-US'),null);
 assert.equal(prepareText('Hello','fr-FR'),null);
 assert.equal(prepareText('क'.repeat(221)),null);
 assert.equal(prepareText('नमस्ते\x00'),null);
});
test('trial must be active according to server clock',()=>{
 assert.equal(activeTrial({ok:true,used:true,active:true,serverNow:'2026-11-24T12:00:00Z',expiresAt:'2026-11-24T13:00:00Z'}),true);
 assert.equal(activeTrial({ok:true,used:true,active:true,serverNow:'2026-11-24T13:00:00Z',expiresAt:'2026-11-24T13:00:00Z'}),false);
 assert.equal(activeTrial({active:true}),false);
});
test('WAV content is validated rather than trusting MIME',()=>{
 const b=Buffer.alloc(48);b.write('RIFF',0);b.writeUInt32LE(40,4);b.write('WAVEfmt ',8);b.writeUInt32LE(16,16);b.writeUInt16LE(1,20);b.writeUInt16LE(1,22);b.writeUInt32LE(16000,24);b.writeUInt32LE(32000,28);b.writeUInt16LE(2,32);b.writeUInt16LE(16,34);b.write('data',36);b.writeUInt32LE(4,40);
 assert.equal(validWav(b),true);b.writeUInt16LE(3,20);assert.equal(validWav(b),false);assert.equal(validWav(Buffer.from('fake audio')),false);
});
test('guest requests never reach provider',async()=>{
 const result=await handler({req:{method:'POST',headers:{},bodyText:JSON.stringify({action:'capabilities'})},res:{json:(body,status)=>({body,status})}});
 assert.equal(result.status,403);
});
