/* English Sikau Coach — deterministic 25-topic pagination.
 * Pure data helper so search/category changes always clamp to a valid page.
 */
(function(){
 'use strict';
 const PAGE_SIZE=25;
 function paginate(items,requestedPage){
  const source=Array.isArray(items)?items:[];
  const total=source.length;
  const pages=Math.max(1,Math.ceil(total/PAGE_SIZE));
  const desired=Number.isSafeInteger(requestedPage)?requestedPage:1;
  const page=Math.min(pages,Math.max(1,desired));
  const start=(page-1)*PAGE_SIZE;
  const end=Math.min(total,start+PAGE_SIZE);
  return {page,pages,total,start,end,items:source.slice(start,end)};
 }
 window.sikauCoachPagination=Object.freeze({pageSize:PAGE_SIZE,paginate});
})();
