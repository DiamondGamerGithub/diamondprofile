import {escapeHTML as h, calculate, money, field} from './shared.js?v=20261016-final5';
export function freshReceipt(){return {merchant:'Pixel Workshop',customer:'SamplePlayer',items:[{name:'Custom bot setup',qty:1,price:20}]};}

// A small slice of the original generator: edit an item and watch the slip update.
export function createReceipt(root) {
  let state=freshReceipt();
  function preview(){const item=state.items[0],total=calculate(state.items).total;return `<div class="receipt-paper"><h2>${h(state.merchant)}</h2><p class="receipt-subtitle">COMMISSION SLIP · SAMPLE</p><dl><div><dt>Customer</dt><dd>${h(state.customer)}</dd></div><div><dt>Order</dt><dd>DEMO-1042</dd></div></dl><table><caption>Commission items</caption><thead><tr><th>Item</th><th>Qty</th><th>Total</th></tr></thead><tbody><tr><td>${h(item.name)}</td><td>${item.qty}</td><td>${money(total)}</td></tr></tbody></table><dl class="receipt-totals"><div class="receipt-grand"><dt>Total</dt><dd>${money(total)}</dd></div></dl><p class="receipt-thanks">Thank you for your patronage.</p><small>Sample receipt · no transaction</small></div>`;}
  function render(){root.innerHTML=`<div class="gr-app gr-simple"><header><div><h2>GuildReceipt</h2><p>A receipt, made simple.</p></div><button data-reset>Reset</button></header><div class="gr-layout"><section class="gr-wizard" aria-label="Receipt details"><h3>Make it yours</h3><p>Edit the details. Your receipt updates as you type.</p><div class="gr-fields">${field('Studio name','merchant',state.merchant)}${field('Customer','customer',state.customer)}${field('Item name','item',state.items[0].name)}${field('Quantity','qty',state.items[0].qty,'number','min="1" max="99" step="1"')}${field('Price (USD)','price',state.items[0].price,'number','min="0" max="10000" step="0.01"')}</div></section><section class="gr-right-content" aria-label="Live receipt">${preview()}</section></div></div>`;}
  root.addEventListener('input',event=>{
    const {name,value}=event.target;
    if (name==='merchant'||name==='customer') state[name]=value.slice(0,80);
    if (name==='item') state.items[0].name=value.slice(0,100);
    if (name==='qty') state.items[0].qty=Math.max(1,Math.min(99,Math.floor(Number(value)||1)));
    if (name==='price') state.items[0].price=Math.max(0,Math.min(10000,Number(value)||0));
    root.querySelector('.gr-right-content').innerHTML=preview();
  });
  root.addEventListener('change',event=>{if(event.target.name==='qty')event.target.value=state.items[0].qty;if(event.target.name==='price')event.target.value=state.items[0].price;});
  root.addEventListener('click',event=>{if(event.target.closest('[data-reset]')){state=freshReceipt();render();}});
  render();return {};
}
