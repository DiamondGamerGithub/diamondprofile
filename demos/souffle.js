import {landmarks,scene} from './landmarks.js?v=20261016-final5';
import {escapeHTML as h} from './shared.js?v=20261016-final5';
import {icon} from './icons.js?v=20261016-final5';

// A single homepage preview, using the original SwiftUI assets and glass palette.
export function createSouffle(root) {
  let selected = null;
  let loading = false;
  let timer;
  function render() {
    const place = landmarks.find(item => item.id === selected);
    root.innerHTML = `<div class="sf-app sf-home-only">
      <div class="sf-statusbar"><strong>9:41</strong><span class="sf-island"></span><span class="sf-status-icons">${icon('signal')}${icon('wifi')}${icon('battery-full')}</span></div><header class="sf-header"><div class="sf-logo"><img src="assets/souffle/logo.webp" width="38" height="38" alt=""><strong>soufflé</strong></div><span class="sf-sample-pill">${icon('map-pin')} New York, America ${icon('chevron-down')}</span></header>
      <div class="sf-content">
        <div class="sf-hero"><div><h2>Discover what’s<br>around you</h2><p>Landmarks, buildings, art, monuments, and more.</p></div><span class="sf-landmark-art" aria-hidden="true"><img src="assets/souffle/mockup-1.webp" width="941" height="1672" alt=""></span><img src="assets/souffle/celebrate.webp" width="180" height="180" alt="Soufflé’s smiling mascot"><button class="scan-circle" data-scan aria-label="Try a sample landmark scan">${icon('scan-line')}</button><small>SCAN SOMETHING</small></div>
        <div class="sf-shortcuts" aria-label="Original app shortcuts, shown for reference"><div>${icon('scan-line')}<strong>Scan</strong><small>Use camera</small></div><div>${icon('map')}<strong>Nearby</strong><small>Explore places</small></div><div>${icon('bookmark')}<strong>Saved</strong><small>Your finds</small></div></div>
        <div class="sf-section-title"><h3>Recent discoveries</h3><span>3 samples</span></div>
        ${landmarks.map(item => `<button class="place-row" data-place="${item.id}" aria-expanded="${selected===item.id}"><span class="place-thumb ${item.id!=='cn'?'photo-thumb '+item.id:''}">${item.id==='cn'?scene(item.shape):`<img src="assets/souffle/${item.id==='liberty'?'mockup-1.webp':'app-detail.jpg'}" alt="${item.name} from the original Soufflé mockup" width="720" height="1280">`}</span><span><strong>${item.name}</strong><small>${item.city}</small></span><span aria-hidden="true">${icon(selected===item.id?'minus':'chevron-right')}</span></button>${selected===item.id?`<div class="sf-inline-story" role="status">${loading?'<span class="scan-loader" aria-hidden="true"></span><p>Loading sample discovery…</p>':`<p>${h(place.summary)}</p><small>${h(place.facts[0])}</small>`}</div>`:''}`).join('')}
        <p class="sf-preview-note">This isn’t the actual app — it’s a small web demo adapted from Soufflé. Premade discoveries, no live AI.</p>
      </div><div class="sf-nav sf-reference-nav" aria-label="Original app navigation, homepage preview only"><span class="active">${icon('house')}<small>Home</small></span><span>${icon('map')}<small>Nearby</small></span><span>${icon('scan-line')}<small>Scan</small></span><span>${icon('bookmark')}<small>Saved</small></span><span>${icon('user-round')}<small>You</small></span></div>
    </div>`;
  }
  function select(id) {
    clearTimeout(timer);
    selected = id;
    loading = true;
    render();
    timer = setTimeout(() => { loading=false; render(); },650);
  }
  root.addEventListener('click',event => {
    const button=event.target.closest('button');
    if (!button) return;
    if (button.dataset.place) {
      if (selected===button.dataset.place) {clearTimeout(timer);selected=null;loading=false;render();}
      else select(button.dataset.place);
    }
    if (button.hasAttribute('data-scan')) select(landmarks[(landmarks.findIndex(item=>item.id===selected)+1)%landmarks.length].id);
  });
  render();
  return {destroy(){clearTimeout(timer);}};
}
