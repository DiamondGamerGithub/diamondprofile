import {escapeHTML as h, calculate, money, field, reduced} from './shared.js?v=20261122-refresh';
export function freshReceipt(){return {merchant:'Pixel Workshop',customer:'SamplePlayer',items:[{name:'Custom bot setup',qty:1,price:20}]};}
const presets=[['Custom bot setup',1,20],['Server configuration',1,35],['Thumbnail pack',3,8],['Video edit',1,45]];

// A small slice of the original generator: edit an item or pick a preset and watch the slip print.
export function createReceipt(root) {
  let state=freshReceipt(),shownTotal=calculate(state.items).total;
  const motion=()=>window.gsap&&!reduced();
  function preview(){const item=state.items[0],total=calculate(state.items).total;return `<div class="receipt-paper"><h2>${h(state.merchant)}</h2><p class="receipt-subtitle">COMMISSION SLIP · SAMPLE</p><dl><div><dt>Customer</dt><dd>${h(state.customer)}</dd></div><div><dt>Order</dt><dd>DEMO-1042</dd></div></dl><table><caption>Commission items</caption><thead><tr><th>Item</th><th>Qty</th><th>Total</th></tr></thead><tbody><tr><td>${h(item.name)}</td><td>${item.qty}</td><td>${money(total)}</td></tr></tbody></table><dl class="receipt-totals"><div class="receipt-grand"><dt>Total</dt><dd data-total>${money(shownTotal)}</dd></div></dl><p class="receipt-thanks">Thank you for your patronage.</p><small>Sample receipt · no transaction</small></div>`;}
  // The paper feeds down out of the printer slot.
  function print(){if(!motion())return;gsap.fromTo(root.querySelector('.receipt-paper'),{yPercent:-104},{yPercent:0,duration:.85,ease:'power2.out',clearProps:'transform'});}
  // Count the grand total toward its new value instead of snapping.
  function tweenTotal(){const target=calculate(state.items).total,el=root.querySelector('[data-total]');if(!motion()){shownTotal=target;el.textContent=money(target);return;}const counter={value:shownTotal};gsap.to(counter,{value:target,duration:.45,ease:'power2.out',overwrite:true,onUpdate:()=>{shownTotal=counter.value;el.textContent=money(counter.value);},onComplete:()=>{shownTotal=target;el.textContent=money(target);}});}
  function render(){shownTotal=calculate(state.items).total;root.innerHTML=`<div class="gr-app gr-simple"><header><div><h2>GuildReceipt</h2><p>A receipt, made simple.</p></div><button data-reset>Reset</button></header><div class="gr-layout"><section class="gr-wizard" aria-label="Receipt details"><h3>Make it yours</h3><p>Pick a preset or edit the details. Your receipt updates as you type.</p><div class="gr-presets" role="group" aria-label="Item presets">${presets.map(([name],i)=>`<button type="button" data-preset="${i}" aria-pressed="${state.items[0].name===name}">${h(name)}</button>`).join('')}</div><div class="gr-fields">${field('Studio name','merchant',state.merchant)}${field('Customer','customer',state.customer)}${field('Item name','item',state.items[0].name)}${field('Quantity','qty',state.items[0].qty,'number','min="1" max="99" step="1"')}${field('Price (USD)','price',state.items[0].price,'number','min="0" max="10000" step="0.01"')}</div></section><section class="gr-right-content" aria-label="Live receipt"><div class="gr-printer" aria-hidden="true"></div><div class="gr-slot">${preview()}</div></section></div></div>`;print();}
  root.addEventListener('input',event=>{
    const {name,value}=event.target;
    if (name==='merchant'||name==='customer') state[name]=value.slice(0,80);
    if (name==='item') state.items[0].name=value.slice(0,100);
    if (name==='qty') state.items[0].qty=Math.max(1,Math.min(99,Math.floor(Number(value)||1)));
    if (name==='price') state.items[0].price=Math.max(0,Math.min(10000,Number(value)||0));
    root.querySelector('.gr-slot').innerHTML=preview();
    for(const b of root.querySelectorAll('[data-preset]'))b.setAttribute('aria-pressed',String(presets[b.dataset.preset][0]===state.items[0].name));
    tweenTotal();
  });
  root.addEventListener('change',event=>{if(event.target.name==='qty')event.target.value=state.items[0].qty;if(event.target.name==='price')event.target.value=state.items[0].price;});
  root.addEventListener('click',event=>{
    const preset=event.target.closest('[data-preset]');
    if(preset){const [name,qty,price]=presets[preset.dataset.preset];state.items[0]={name,qty,price};render();root.querySelector(`[data-preset="${preset.dataset.preset}"]`).focus();}
    if(event.target.closest('[data-reset]')){state=freshReceipt();render();}
  });
  render();return {};
}
