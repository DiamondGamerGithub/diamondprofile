import {landmarks,scene} from './landmarks.js?v=20261122-refresh';
import {escapeHTML as h,reduced} from './shared.js?v=20261122-refresh';
import {icon} from './icons.js?v=20261122-refresh';

// Photo crops come from the original Soufflé mockups; the CN Tower uses the illustrated scene.
const photo = item => item.id === 'cn'
  ? `<span class="sf-photo cn">${scene(item.shape).replace('<svg ', '<svg preserveAspectRatio="xMidYMid slice" ')}</span>`
  : `<span class="sf-photo ${item.id}"><img src="assets/souffle/${item.id === 'liberty' ? 'mockup-1.webp' : 'app-detail.jpg'}" alt="${h(item.name)}" width="720" height="1280"></span>`;

// Homepage, camera scan and landmark detail, following the flow of the real app.
export function createSouffle(root, notify) {
  const saved = new Set();
  const timers = new Set();
  let current = -1;
  const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); };
  const clearTimers = () => { for (const t of timers) clearTimeout(t); timers.clear(); };
  // A close fade still running must not hide the layer we are about to show.
  const claimLayer = () => { clearTimers(); if (window.gsap) { gsap.killTweensOf(layer); gsap.set(layer, {clearProps: 'opacity,visibility'}); } };
  const motion = () => window.gsap && !reduced();

  root.innerHTML = `<div class="sf-app sf-home-only">
    <div class="sf-statusbar"><strong>9:41</strong><span class="sf-island"></span><span class="sf-status-icons">${icon('signal')}${icon('wifi')}${icon('battery-full')}</span></div><header class="sf-header"><div class="sf-logo"><img src="assets/souffle/logo.webp" width="38" height="38" alt=""><strong>soufflé</strong></div><span class="sf-sample-pill">${icon('map-pin')} New York, America ${icon('chevron-down')}</span></header>
    <div class="sf-content">
      <div class="sf-hero"><div><h2>Discover what’s<br>around you</h2><p>Landmarks, buildings, art, monuments and more.</p></div><span class="sf-landmark-art" aria-hidden="true"><img src="assets/souffle/mockup-1.webp" width="941" height="1672" alt=""></span><img src="assets/souffle/celebrate.webp" width="180" height="180" alt="Soufflé’s smiling mascot"><button class="scan-circle" data-scan aria-label="Scan a sample landmark">${icon('scan-line')}</button><small>TAP TO SCAN</small></div>
      <div class="sf-shortcuts" aria-label="App shortcuts, shown for reference"><div>${icon('scan-line')}<strong>Scan</strong><small>Use camera</small></div><div>${icon('map')}<strong>Nearby</strong><small>Explore places</small></div><div>${icon('bookmark')}<strong>Saved</strong><small data-saved-count>0 places</small></div></div>
      <div class="sf-section-title"><h3>Recent discoveries</h3><span>Tap to open</span></div>
      ${landmarks.map((item, i) => `<button class="place-row" data-place="${i}"><span class="place-thumb">${photo(item)}</span><span><strong>${h(item.name)}</strong><small>${h(item.city)} · ${item.year}</small></span><span aria-hidden="true">${icon('chevron-right')}</span></button>`).join('')}
      <p class="sf-preview-note">A small web demo based on Soufflé, with sample discoveries and no live AI. The real app is coming soon to iPhone at <a href="https://souffle.ink/en/ca/" target="_blank" rel="noopener noreferrer">souffle.ink</a>.</p>
    </div><div class="sf-nav sf-reference-nav" aria-label="App navigation, shown for reference"><span class="active">${icon('house')}<small>Home</small></span><span>${icon('map')}<small>Nearby</small></span><span>${icon('scan-line')}<small>Scan</small></span><span>${icon('bookmark')}<small>Saved</small></span><span>${icon('user-round')}<small>You</small></span></div>
    <div class="sf-layer" hidden></div>
  </div>`;
  const layer = root.querySelector('.sf-layer');

  function closeLayer() {
    clearTimers();
    if (layer.hidden) return;
    const done = () => { layer.hidden = true; layer.replaceChildren(); root.querySelector(`[data-place="${current}"]`)?.focus(); };
    if (!motion()) return done();
    gsap.to(layer.querySelector('.sf-sheet,.sf-camera'), {yPercent: 100, duration: .28, ease: 'power2.in', overwrite: true});
    gsap.to(layer, {autoAlpha: 0, duration: .28, overwrite: true, onComplete: () => { gsap.set(layer, {clearProps: 'opacity,visibility'}); done(); }});
  }

  function scan(index) {
    claimLayer();
    current = index;
    const item = landmarks[index];
    layer.innerHTML = `<div class="sf-camera" role="status" aria-live="polite">${photo(item)}<span class="sf-viewfinder" aria-hidden="true"><i></i><i></i><i></i><i></i><span class="sf-sweep"></span></span><p class="sf-camera-label"><span class="scan-loader" aria-hidden="true"></span><span data-label>Hold steady…</span></p><button class="sf-camera-close" data-close aria-label="Cancel scan">${icon('x')}</button></div>`;
    layer.hidden = false;
    if (motion()) gsap.fromTo(layer.firstElementChild, {autoAlpha: 0, scale: 1.04}, {autoAlpha: 1, scale: 1, duration: .35, ease: 'power2.out', clearProps: 'transform,opacity,visibility'});
    layer.querySelector('[data-close]').focus();
    later(() => { layer.querySelector('[data-label]').textContent = 'Identifying landmark…'; }, 700);
    later(() => {
      layer.querySelector('.sf-camera').classList.add('found');
      layer.querySelector('.sf-camera-label').innerHTML = `${icon('check')}<span>Found it: <strong>${h(item.name)}</strong></span>`;
    }, 1600);
    later(() => detail(index), 2300);
  }

  function detail(index) {
    claimLayer();
    current = index;
    const item = landmarks[index], isSaved = saved.has(item.id);
    const maps = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(item.name + ' ' + item.city);
    layer.innerHTML = `<div class="sf-shade" data-close></div><section class="sf-sheet" role="dialog" aria-modal="true" aria-label="${h(item.name)} details">
      <span class="sf-grabber" aria-hidden="true"></span>
      <div class="sf-sheet-photo">${photo(item)}<button class="sf-sheet-close" data-close aria-label="Close details">${icon('x')}</button></div>
      <div class="sf-sheet-body">
        <h2>${h(item.name)}</h2>
        <p class="sf-meta">${icon('map-pin')} ${h(item.short)}, ${h(item.city)} · ${item.year}</p>
        <p class="sf-summary">${h(item.summary)}</p>
        <h3>Worth knowing</h3>
        <ul>${item.facts.map(fact => `<li>${h(fact)}</li>`).join('')}</ul>
        <div class="sf-actions"><button data-save aria-pressed="${isSaved}">${icon('bookmark')}<span>${isSaved ? 'Saved' : 'Save'}</span></button><a href="${maps}" target="_blank" rel="noopener noreferrer">${icon('map')}<span>Directions</span></a><button data-next class="sf-primary">${icon('scan-line')}<span>Scan another</span></button></div>
        <a class="sf-source" href="${item.source}" target="_blank" rel="noopener noreferrer">Source: ${h(item.sourceName)} ${icon('arrow-up-right')}</a>
      </div></section>`;
    layer.hidden = false;
    const sheet = layer.querySelector('.sf-sheet');
    if (motion()) {
      gsap.fromTo(layer.querySelector('.sf-shade'), {autoAlpha: 0}, {autoAlpha: 1, duration: .3, clearProps: 'opacity,visibility'});
      gsap.fromTo(sheet, {yPercent: 100}, {yPercent: 0, duration: .5, ease: 'power3.out', clearProps: 'transform'});
      gsap.fromTo(sheet.querySelectorAll('.sf-sheet-body > *'), {y: 14, autoAlpha: 0}, {y: 0, autoAlpha: 1, duration: .4, stagger: .04, delay: .18, ease: 'power2.out', clearProps: 'transform,opacity,visibility'});
    }
    sheet.querySelector('[data-close]').focus({preventScroll: true});
  }

  root.addEventListener('click', event => {
    const target = event.target.closest('button,[data-close]');
    if (!target) return;
    if (target.hasAttribute('data-scan')) scan((current + 1) % landmarks.length);
    else if (target.dataset.place) detail(Number(target.dataset.place));
    else if (target.hasAttribute('data-close')) closeLayer();
    else if (target.hasAttribute('data-next')) scan((current + 1) % landmarks.length);
    else if (target.hasAttribute('data-save')) {
      const item = landmarks[current], on = !saved.has(item.id);
      on ? saved.add(item.id) : saved.delete(item.id);
      target.setAttribute('aria-pressed', String(on));
      target.querySelector('span').textContent = on ? 'Saved' : 'Save';
      root.querySelector('[data-saved-count]').textContent = saved.size + (saved.size === 1 ? ' place' : ' places');
      if (on && motion()) gsap.fromTo(target.querySelector('svg'), {scale: .6}, {scale: 1, duration: .45, ease: 'back.out(3)', clearProps: 'transform'});
      notify?.(on ? `${item.name} saved` : `${item.name} removed from saved`);
    }
  });
  // Escape closes the sheet first, then the window on the next press.
  root.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !layer.hidden) { event.preventDefault(); event.stopPropagation(); closeLayer(); }
  });
  return {destroy: clearTimers};
}
