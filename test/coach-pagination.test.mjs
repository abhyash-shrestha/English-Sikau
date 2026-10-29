import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const root=new URL('../',import.meta.url);
const read=path=>fs.readFileSync(new URL(path,root),'utf8');
const window={};
vm.runInNewContext(read('coach-pagination.js'),{window},{filename:'coach-pagination.js'});
const {paginate,pageSize}=window.sikauCoachPagination;
const topics=Array.from({length:175},(_,i)=>({id:'topic-'+(i+1),title:'Topic '+(i+1)}));

test('175 topics produce seven numbered pages of exactly 25 each',()=>{
 assert.equal(pageSize,25);
 const visited=[];
 for(let page=1;page<=7;page++){
  const result=paginate(topics,page);
  assert.equal(result.pages,7);
  assert.equal(result.page,page);
  assert.equal(result.total,175);
  assert.equal(result.items.length,25);
  assert.equal(result.start,(page-1)*25);
  assert.equal(result.end,page*25);
  visited.push(...Array.from(result.items,x=>x.id));
 }
 assert.deepEqual(visited,topics.map(x=>x.id),'No topic missing or repeated');
});
test('partial final page and nonexistent pages are handled safely',()=>{
 const subset=topics.slice(0,151);
 const last=paginate(subset,7);
 assert.equal(last.pages,7);
 assert.equal(last.items.length,1);
 assert.equal(last.items[0].id,'topic-151');
 assert.equal(paginate(subset,99).page,7);
 assert.equal(paginate(subset,-3).page,1);
 assert.equal(paginate(subset,NaN).page,1);
 const empty=paginate([],7);
 assert.equal(empty.page,1);
 assert.equal(empty.pages,1);
 assert.equal(empty.total,0);
 assert.equal(empty.items.length,0);
});
test('category or search filtered data are paginated from the filtered result',()=>{
 const filtered=topics.filter((_,i)=>i%4===0);
 assert.equal(filtered.length,44);
 const first=paginate(filtered,1),second=paginate(filtered,2);
 assert.equal(first.pages,2);
 assert.equal(first.items.length,25);
 assert.equal(second.items.length,19);
 assert.deepEqual(Array.from(first.items.concat(second.items),x=>x.id),filtered.map(x=>x.id));
 const narrowed=filtered.slice(0,2);
 assert.equal(paginate(narrowed,2).page,1);
});
test('Coach UI replaces load-more with navigable pages and resets on filter/search',()=>{
 const js=read('coach-dashboard.js');
 const css=read('coach-dashboard.css');
 const html=read('index.html');
 assert.match(js,/let currentPage=1;/);
 assert.match(js,/changePage\(currentPage-1\)/);
 assert.match(js,/changePage\(currentPage\+1\)/);
 assert.match(js,/for\(let number=1;number<=view.pages;number\+\+\)/);
 assert.match(js,/aria-current','page'/);
 assert.match(js,/category=item;currentPage=1;drawTopics\(\);drawCards\(\)/);
 assert.match(js,/search=searchInput.value;currentPage=1;drawCards\(\)/);
 assert.match(js,/for\(const s of view.items\)/);
 assert.doesNotMatch(js,/visibleLimit=24|Show more situations/);
 assert.match(css,/sikau-convo-page-numbers/);
 assert.match(css,/data-sikau-theme="dark"/);
 assert.match(css,/@media\(max-width:600px\)/);
 assert.ok(html.indexOf('coach-pagination.js?v=')<html.indexOf('coach-dashboard.js?v='));
});
