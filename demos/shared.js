export const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function money(value,currency='USD'){if(currency==='Robux')return 'R$ '+Number(value).toFixed(2);if(currency==='Nitro')return Number(value).toFixed(0)+' Nitro Gift(s)';return new Intl.NumberFormat('en',{style:'currency',currency}).format(value);}
export function calculate(items,discount=0,fee=0){const subtotal=items.reduce((sum,item)=>sum+Math.max(0,Number(item.qty)||0)*Math.max(0,Number(item.price)||0),0);const deduction=Math.max(0,Number(discount)||0),base=Math.max(0,subtotal-deduction),feeTotal=base*Math.max(0,Number(fee)||0)/100;return {subtotal,discount:deduction,fee:feeTotal,total:base+feeTotal};}
export function download(name,type,contents){const url=URL.createObjectURL(new Blob([contents],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);}
export const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
export function animateIn(element){
 const content=element.querySelector('.demo-body')||element;
 for(const property of ['transform','opacity','visibility'])element.style.removeProperty(property);
 if(window.gsap&&!reduced())gsap.fromTo(content,{autoAlpha:.7,y:6,scale:.995},{autoAlpha:1,y:0,scale:1,duration:.24,ease:'power2.out',overwrite:true,clearProps:'transform,opacity,visibility'});
 else for(const property of ['transform','opacity','visibility'])content.style.removeProperty(property);
}

export const field=(label,name,value,type='text',extra='')=>`<label>${label}<input name="${name}" type="${type}" value="${escapeHTML(value)}" ${extra}></label>`;
export const options=(values,value)=>values.map(v=>`<option value="${escapeHTML(v)}" ${v===value?'selected':''}>${escapeHTML(v)}</option>`).join('');
