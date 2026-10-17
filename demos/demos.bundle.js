(() => {
  // ../../../../../Downloads/DiamondGamer-Interactive-Website/demos/landmarks.js?v=20261016-final5
  var landmarks = [
    { id: "liberty", name: "Statue of Liberty", city: "New York City", short: "Liberty Island", year: "1886", shape: "liberty", summary: "A copper figure holding a torch above New York Harbor, the Statue of Liberty was dedicated on October 28, 1886. A gift from the people of France, it became a powerful symbol of liberty and welcome. Its metal surface and internal framework made a monumental sculpture possible without making it a solid block of metal.", facts: ["Dedicated on October 28, 1886.", "The outer skin is copper; the torch flame is covered in gold leaf.", "It stands on Liberty Island in New York Harbor."], source: "https://www.nps.gov/stli/learn/statue-of-liberty-facts.htm", sourceName: "National Park Service" },
    { id: "empire", name: "Empire State Building", city: "New York City", short: "Midtown Manhattan", year: "1931", shape: "empire", summary: "The Empire State Building opened on May 1, 1931, bringing a striking Art Deco silhouette to Midtown Manhattan. Its stepped form and soaring mast made it a defining part of New York’s skyline. Built during an ambitious construction campaign, its history connects engineering, architecture and the changing city below.", facts: ["Opened on May 1, 1931.", "Construction took one year and 45 days.", "The design includes a restored Art Deco lobby."], source: "https://www.esbnyc.com/about/history", sourceName: "Empire State Building" },
    { id: "cn", name: "CN Tower", city: "Toronto", short: "Downtown Toronto", year: "1976", shape: "cn", summary: "Toronto’s CN Tower began as a solution to a growing city’s communications needs and became its most recognizable skyline landmark. Construction finished in 1975, and the tower welcomed the public on June 26, 1976. At roughly 553 metres, it combines a slender concrete shaft, observation levels and a broadcast antenna.", facts: ["Opened to the public on June 26, 1976.", "Construction was completed on April 2, 1975.", "It rises approximately 553 metres above Toronto."], source: "https://www.cntower.ca/history", sourceName: "CN Tower" }
  ];
  function scene(id) {
    const shape = id === "liberty" ? '<path d="M179 250l8-88 13-28 13 28 8 88zM190 160l-20-50 9-8 23 40M171 106l-5-29 14-4 4 29M212 169l26 17-6 21-19-10" fill="#6eaaa1" stroke="#427f7b" stroke-width="3"/><circle cx="200" cy="119" r="14" fill="#73b0a7"/><path d="M184 108l-7-13 15 8 7-19 6 19 16-8-7 14" fill="#5b9d95"/><path d="M166 76l-5-12 12-17 10 17-5 12z" fill="#ffb330"/><path d="M165 250h70v22h-70zM156 272h88v22h-88z" fill="#bb956b"/>' : id === "empire" ? '<path d="M150 294V155h25V110h15V78h20v32h15v45h25v139z" fill="#cdb392" stroke="#8e775d" stroke-width="3"/><path d="M200 78V31" stroke="#8e775d" stroke-width="5"/><path d="M173 168v111m18-160v160m18-160v160m18-111v111" stroke="#687f83" stroke-width="6" stroke-dasharray="6 7"/>' : '<path d="M187 292l9-159h8l9 159z" fill="#c7b9a2"/><path d="M198 143V36h4v107" fill="#9d9282"/><ellipse cx="200" cy="138" rx="42" ry="12" fill="#b5a689"/><path d="M160 137l9-24h62l9 24z" fill="#cbbda2"/><path d="M172 115h56v12h-56z" fill="#6d9eac"/><path d="M200 36V17" stroke="#bf5546" stroke-width="4"/>';
    return `<svg viewBox="0 0 400 300" role="img" aria-label="Illustration of ${id === "liberty" ? "the Statue of Liberty" : id === "empire" ? "the Empire State Building" : "the CN Tower"}"><defs><linearGradient id="sky-${id}" x2="0" y2="1"><stop stop-color="#a8d9ef"/><stop offset="1" stop-color="#fff1ce"/></linearGradient></defs><path fill="url(#sky-${id})" d="M0 0h400v300H0z"/><circle cx="310" cy="67" r="32" fill="#fff2c1"/><path d="M0 260h55v-35h23v22h40v-45h30v50h120v-30h33v22h40v-38h30v42h29v52H0z" fill="#b8c9b6" opacity=".6"/>${shape}<path d="M0 294h400v6H0z" fill="#7caa91"/></svg>`;
  }

  // ../../../../../Downloads/DiamondGamer-Interactive-Website/demos/shared.js?v=20261016-final5
  var escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  function money(value, currency = "USD") {
    if (currency === "Robux") return "R$ " + Number(value).toFixed(2);
    if (currency === "Nitro") return Number(value).toFixed(0) + " Nitro Gift(s)";
    return new Intl.NumberFormat("en", { style: "currency", currency }).format(value);
  }
  function calculate(items, discount = 0, fee = 0) {
    const subtotal = items.reduce((sum, item) => sum + Math.max(0, Number(item.qty) || 0) * Math.max(0, Number(item.price) || 0), 0);
    const deduction = Math.max(0, Number(discount) || 0), base = Math.max(0, subtotal - deduction), feeTotal = base * Math.max(0, Number(fee) || 0) / 100;
    return { subtotal, discount: deduction, fee: feeTotal, total: base + feeTotal };
  }
  var reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  function animateIn(element) {
    const content = element.querySelector(".demo-body") || element;
    for (const property of ["transform", "opacity", "visibility"]) element.style.removeProperty(property);
    if (window.gsap && !reduced()) gsap.fromTo(content, { autoAlpha: 0.7, y: 6, scale: 0.995 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.24, ease: "power2.out", overwrite: true, clearProps: "transform,opacity,visibility" });
    else for (const property of ["transform", "opacity", "visibility"]) content.style.removeProperty(property);
  }
  var field = (label, name, value, type = "text", extra = "") => `<label>${label}<input name="${name}" type="${type}" value="${escapeHTML(value)}" ${extra}></label>`;

  // ../../../../../Downloads/DiamondGamer-Interactive-Website/demos/icons.js?v=20261016-final5
  var paths = { "camera": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/></g>', "scan-line": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7V5a2 2 0 0 1 2-2h2m10 0h2a2 2 0 0 1 2 2v2m0 10v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2m4-5h10"/>', "map": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0zm.894.211v15M9 3.236v15"/>', "bookmark": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"/>', "house": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></g>', "user-round": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></g>', "sparkles": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594zM20 2v4m2-2h-4"/><circle cx="4" cy="20" r="2"/></g>', "chevron-right": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 18l6-6l-6-6"/>', "arrow-up-right": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10v10M7 17L17 7"/>', "send": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11zm7.318-19.539l-10.94 10.939"/>', "hash": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 9h16M4 15h16M10 3L8 21m8-18l-2 18"/>', "plus": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7v14"/>', "x": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12"/>', "minus": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/>', "maximize-2": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6"/>', "message-circle": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092a10 10 0 1 0-4.777-4.719"/>', "shield": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>', "flag": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"/>', "backpack": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm4 0h8m-8 8h8"/><path d="M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></g>', "wrench": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"/>', "credit-card": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20M6 14h2"/></g>', "receipt-text": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16H8m6-8H8m8 4H8M4 3a1 1 0 0 1 1-1a1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1a1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2a1 1 0 0 1-1-1z"/>', "check": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 6L9 17l-5-5"/>', "arrow-left": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 19l-7-7l7-7m7 7H5"/>', "lock-keyhole": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="16" r="1"/><rect width="18" height="12" x="3" y="10" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></g>', "mic": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 19v3m7-12v2a7 7 0 0 1-14 0v-2"/><rect width="6" height="13" x="9" y="2" rx="3"/></g>', "headphones": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>', "settings": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0a2.34 2.34 0 0 0 3.319 1.915a2.34 2.34 0 0 1 2.33 4.033a2.34 2.34 0 0 0 0 3.831a2.34 2.34 0 0 1-2.33 4.033a2.34 2.34 0 0 0-3.319 1.915a2.34 2.34 0 0 1-4.659 0a2.34 2.34 0 0 0-3.32-1.915a2.34 2.34 0 0 1-2.33-4.033a2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></g>', "chevron-down": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9l6 6l6-6"/>', "search": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m21 21l-4.34-4.34"/><circle cx="11" cy="11" r="8"/></g>', "ellipsis": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></g>', "clock": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></g>', "image": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></g>', "signal": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 20h.01M7 20v-4m5 4v-8m5 8V8m5-4v16"/>', "wifi": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20h.01M2 8.82a15 15 0 0 1 20 0M5 12.859a10 10 0 0 1 14 0m-10.5 3.57a5 5 0 0 1 7 0"/>', "battery-full": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10 10v4m4-4v4m8 0v-4M6 10v4"/><rect width="16" height="12" x="2" y="6" rx="2"/></g>', "map-pin": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></g>' };
  function icon(name, cls = "") {
    return `<svg class="ui-icon ${cls}" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">${paths[name] || paths["sparkles"]}</svg>`;
  }

  // ../../../../../Downloads/DiamondGamer-Interactive-Website/demos/souffle.js?v=20261016-final5
  function createSouffle(root) {
    let selected = null;
    let loading = false;
    let timer;
    function render() {
      const place = landmarks.find((item) => item.id === selected);
      root.innerHTML = `<div class="sf-app sf-home-only">
      <div class="sf-statusbar"><strong>9:41</strong><span class="sf-island"></span><span class="sf-status-icons">${icon("signal")}${icon("wifi")}${icon("battery-full")}</span></div><header class="sf-header"><div class="sf-logo"><img src="assets/souffle/logo.webp" width="38" height="38" alt=""><strong>soufflé</strong></div><span class="sf-sample-pill">${icon("map-pin")} New York, America ${icon("chevron-down")}</span></header>
      <div class="sf-content">
        <div class="sf-hero"><div><h2>Discover what’s<br>around you</h2><p>Landmarks, buildings, art, monuments, and more.</p></div><span class="sf-landmark-art" aria-hidden="true"><img src="assets/souffle/mockup-1.webp" width="941" height="1672" alt=""></span><img src="assets/souffle/celebrate.webp" width="180" height="180" alt="Soufflé’s smiling mascot"><button class="scan-circle" data-scan aria-label="Try a sample landmark scan">${icon("scan-line")}</button><small>SCAN SOMETHING</small></div>
        <div class="sf-shortcuts" aria-label="Original app shortcuts, shown for reference"><div>${icon("scan-line")}<strong>Scan</strong><small>Use camera</small></div><div>${icon("map")}<strong>Nearby</strong><small>Explore places</small></div><div>${icon("bookmark")}<strong>Saved</strong><small>Your finds</small></div></div>
        <div class="sf-section-title"><h3>Recent discoveries</h3><span>3 samples</span></div>
        ${landmarks.map((item) => `<button class="place-row" data-place="${item.id}" aria-expanded="${selected === item.id}"><span class="place-thumb ${item.id !== "cn" ? "photo-thumb " + item.id : ""}">${item.id === "cn" ? scene(item.shape) : `<img src="assets/souffle/${item.id === "liberty" ? "mockup-1.webp" : "app-detail.jpg"}" alt="${item.name} from the original Soufflé mockup" width="720" height="1280">`}</span><span><strong>${item.name}</strong><small>${item.city}</small></span><span aria-hidden="true">${icon(selected === item.id ? "minus" : "chevron-right")}</span></button>${selected === item.id ? `<div class="sf-inline-story" role="status">${loading ? '<span class="scan-loader" aria-hidden="true"></span><p>Loading sample discovery…</p>' : `<p>${escapeHTML(place.summary)}</p><small>${escapeHTML(place.facts[0])}</small>`}</div>` : ""}`).join("")}
        <p class="sf-preview-note">This isn’t the actual app — it’s a small web demo adapted from Soufflé. Premade discoveries, no live AI.</p>
      </div><div class="sf-nav sf-reference-nav" aria-label="Original app navigation, homepage preview only"><span class="active">${icon("house")}<small>Home</small></span><span>${icon("map")}<small>Nearby</small></span><span>${icon("scan-line")}<small>Scan</small></span><span>${icon("bookmark")}<small>Saved</small></span><span>${icon("user-round")}<small>You</small></span></div>
    </div>`;
    }
    function select(id) {
      clearTimeout(timer);
      selected = id;
      loading = true;
      render();
      timer = setTimeout(() => {
        loading = false;
        render();
      }, 650);
    }
    root.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      if (button.dataset.place) {
        if (selected === button.dataset.place) {
          clearTimeout(timer);
          selected = null;
          loading = false;
          render();
        } else select(button.dataset.place);
      }
      if (button.hasAttribute("data-scan")) select(landmarks[(landmarks.findIndex((item) => item.id === selected) + 1) % landmarks.length].id);
    });
    render();
    return { destroy() {
      clearTimeout(timer);
    } };
  }

  // ../../../../../Downloads/DiamondGamer-Interactive-Website/demos/fern-knowledge.js?v=20261016-final5
  var examples = [
    {
      "id": 1,
      "question": "How do I choose my bloodline",
      "answer": "You can choose your bloodline by doing the command /bloodline"
    },
    {
      "id": 3,
      "question": "How do I use my bloodline ability?",
      "answer": "You can use your ability by **Shift + Offhand (F)** or **/ability**"
    },
    {
      "id": 4,
      "question": "Are there vaults on FernSMP for extra item storage, or is it only ender chest?",
      "answer": "Yes, FernSMP has vaults that give you extra space to store your items! You can access them using `/pv`."
    },
    {
      "id": 5,
      "question": "How do I complete jobs on the server?",
      "answer": "You can complete jobs by using `/jobs` and selecting a job, such as `Miner`. Once you’ve finished mining, open `/jobs` again, select `Miner`, and click the green candles to claim your reward!"
    },
    {
      "id": 6,
      "question": "How do you get in-game money in FernSMP?",
      "answer": "You can earn in-game money by using the `/jobs` command, receiving `/gifts` for consistent play, or selling items via the Auction House with `/ah sell <price>` while holding the item(s)."
    },
    {
      "id": 19,
      "question": "How do I equip a title in-game?",
      "answer": "You can equip a title in-game by using the `/title` command."
    },
    {
      "id": 39,
      "question": "What is the server ip?",
      "answer": "You can join using the ip `play.fernsmp.net` and if you're on Bedrock use the port `19132` or add `FernSMP` as a friend in the social tab."
    },
    {
      "id": 43,
      "question": "What's the fastest way to get claim blocks",
      "answer": "You can earn claim blocks by killing mobs for souls, which can be spent in /souls."
    },
    {
      "id": 44,
      "question": "Can I find my old claim blocks if I don’t have the cords and didn’t set it as my home?",
      "answer": "Yes! If you made a claim and forgot where it was, you can use `/claimslist` to view your claims. If you still can't find it, you can open a ticket and we can provide the coordinates or possibly teleport you there."
    },
    {
      "id": 56,
      "question": "How do I sell items using a chest shop?",
      "answer": "Hold the item you want to sell, look at your chest, and run `/qs create <price>`. For example, hold iron and use `/qs create 9`."
    },
    {
      "id": 57,
      "question": "Where can I find the chest-shop setup guide?",
      "answer": "Run `/howtoshop` in-game for the breakdown of how to make a chest shop."
    },
    {
      "id": 58,
      "question": "How do I collect items I bought from the auction house?",
      "answer": "Open `/ah`, select the Bought Items section, and collect your purchased items there. They may be waiting in that menu rather than appearing immediately in your inventory."
    },
    {
      "id": 59,
      "question": "What is the correct command to list an item on the auction house?",
      "answer": "Use `/ah sell <price>`. For example, `/ah sell 60000`."
    },
    {
      "id": 60,
      "question": "How do I trade directly with another player?",
      "answer": "Use `/trade <player>` to trade with another player."
    },
    {
      "id": 65,
      "question": "How do I set my guild home?",
      "answer": "Use `/guild sethome` to set your guild home."
    },
    {
      "id": 66,
      "question": "How do I replace my lost claiming shovel?",
      "answer": "Run `/kit claim` to receive a claiming shovel. You can also craft a golden shovel: two sticks and one gold ingot. Golden shovels act as claiming tools."
    },
    {
      "id": 67,
      "question": "How do I claim land?",
      "answer": "Get a golden shovel using `/kit claim`, then use it to select opposite corners of the area you want to claim."
    },
    {
      "id": 74,
      "question": "How do I reload the server resource pack on Java?",
      "answer": "In your multiplayer server list, select FernSMP, choose Edit, and set Server Resource Packs to Enabled. Reconnect so the pack can load."
    },
    {
      "id": 79,
      "question": "How do I gain levels and check my progress?",
      "answer": "FernSMP recommends killing mobs, collecting ores such as diamond, lapis and gold, completing tasks, and doing jobs to gain levels. Use `/levels` to check your progress."
    },
    {
      "id": 80,
      "question": "What are relics used for?",
      "answer": "Relics are mostly cosmetic or fun blocks. Some produce particles for decorating your base, while others, such as the Rock Paper Scissors table, let you play a minigame with friends."
    }
  ];
  var normalize = (text) => text.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
  function matchSampleAnswer(text) {
    const value = normalize(text);
    const exact = examples.find((item) => normalize(item.question) === value);
    if (exact) return exact;
    const rules = [
      [5, /how.*(jobs|complete.*job)/],
      [1, /how.*(choose|pick|select).*bloodline/],
      [3, /how.*(use|activate).*ability/],
      [4, /(how|where).*vault|extra.*storage/],
      [6, /how.*(earn|make|get).*money/],
      [19, /how.*equip.*title/],
      [39, /(server.*ip|join.*server|what.*ip)/],
      [58, /(collect|where).*bought.*items|items.*bought.*auction/],
      [57, /(guide|help).*chest.*shop|chest.*shop.*guide/],
      [60, /how.*trade/],
      [65, /how.*guild.*home/],
      [66, /(lost|replace|new).*claim.*shovel/],
      [67, /how.*claim.*land/],
      [74, /(reload|enable).*resource.*pack/],
      [79, /how.*(gain|level up|level.*progress)/],
      [80, /(what|how).*relic/]
    ];
    const id = rules.find(([, rule]) => rule.test(value))?.[0];
    return examples.find((item) => item.id === id) || null;
  }

  // ../../../../../Downloads/DiamondGamer-Interactive-Website/demos/fern.js?v=20261016-final5
  var ticketCategories = ["General", "Reports", "Admin", "Items & Inventory", "Technical", "Billing"];
  function normalizeUsername(username, platform) {
    const clean = username.trim();
    return platform !== "Minecraft Java" && !clean.startsWith(".") ? "." + clean : clean;
  }
  function createFern(root) {
    let channel = "questions", category = "", ticket = null, form = false, messages = [];
    const first = examples.find((item) => item.id === 5);
    let questionMessages = [{ text: first.question }, { answer: first }], selectedExample = 5, pending = null, unmatched = false;
    const timers = /* @__PURE__ */ new Set();
    const markdown = (text) => escapeHTML(text).replace(/`([^`]+)`/g, "<code>$1</code>");
    function conversation(list) {
      return list.map((message) => message.answer ? botMessage(`<p><span class="dc-mention">@SamplePlayer</span></p><div class="dc-ai-answer"><p>${markdown(message.answer.answer)}</p><p class="dc-ai-disclaimer">This answer is from our knowledge base and may be wrong, if it is, open a ticket!</p><small>${icon("sparkles")} Approved knowledge · #${message.answer.id}</small></div>`) : `<article class="dc-message"><span class="dc-avatar dc-player-avatar">S</span><div class="dc-message-body"><div class="dc-author">SamplePlayer <time>Just now</time></div><p>${escapeHTML(message.text)}</p></div></article>`).join("");
    }
    function questions() {
      return `<div class="dc-question-intro"><div>${icon("message-circle")}<strong>Ask FernSMP</strong></div><p>Try one of 20 questions from the bot’s approved knowledge. Responses are simulated locally.</p><label for="sample-question">Explore a sample question</label><select id="sample-question" name="example"><option value="" ${selectedExample === null ? "selected" : ""}>Choose a sample question</option>${examples.map((item) => `<option value="${item.id}" ${selectedExample === item.id ? "selected" : ""}>${escapeHTML(item.question)}</option>`).join("")}</select></div><div class="dc-thread-label">${icon("message-circle")} Question thread · ${escapeHTML(questionMessages[0]?.text || "Your question")}</div>${conversation(questionMessages)}`;
    }
    function post(text, reset = false) {
      for (const timer2 of timers) clearTimeout(timer2);
      timers.clear();
      pending = null;
      const destination = channel;
      if (reset) questionMessages = [];
      const list = destination === "questions" ? questionMessages : messages;
      list.push({ text });
      unmatched = false;
      const answer = matchSampleAnswer(text);
      if (destination === "questions") selectedExample = answer?.id ?? null;
      if (!answer) {
        unmatched = true;
        render();
        return;
      }
      pending = destination;
      render();
      const timer = setTimeout(() => {
        timers.delete(timer);
        list.push({ answer });
        if (pending === destination) pending = null;
        render();
      }, 850);
      timers.add(timer);
    }
    function botMessage(content) {
      return `<article class="dc-message"><img class="dc-avatar" src="assets/experience/fernsmp-logo.webp" width="40" height="40" alt=""><div class="dc-message-body"><div class="dc-author">FernSMP Services <span class="dc-app">APP ✓</span><time>Today at 12:00 PM</time></div>${content}</div></article>`;
    }
    function panel() {
      return botMessage(`<div class="dc-embed"><h3>FernSMP Support</h3><p>Make sure to read our support options <strong>BEFORE</strong> opening a ticket.</p><div class="dc-inline-fields">${[["💬 General", "Questions<br>Concerns<br>General help"], ["🚨 Reports", "Player reports<br>Cheating<br>Griefing"], ["🛡️ Admin", "Ban appeals<br>Staff concerns<br>Escalations"], ["🎒 Items & Inventory", "Missing items<br>Lost inventory<br>Admin+ support"], ["🛠️ Technical", "Connections<br>Bugs & exploits<br>Performance"], ["💳 Billing", "Payment issue<br>Missing purchases<br>Refund requests"]].map(([name, body]) => `<div><strong>${name}</strong><p>${body.split("<br>").map((line) => "› " + line).join("<br>")}</p></div>`).join("")}</div><img class="dc-banner" src="assets/projects/fernsmp-banner-optimized.webp" width="1672" height="941" alt="FernSMP Minecraft banner"></div><label class="sr-only" for="demo-ticket-category">Ticket category</label><select id="demo-ticket-category" class="dc-category" name="category"><option value="">Select a Ticket Category</option>${ticketCategories.map((name) => `<option>${name}</option>`).join("")}</select>`);
    }
    function opened() {
      return `<div class="dc-ticket-start"><span>#</span><h2>Welcome to #${ticket.channel}!</h2><p>This is the beginning of your private support ticket.</p></div>${botMessage(`<p><span class="dc-mention">@Support Agent</span></p><div class="dc-embed"><p>Hello <span class="dc-mention">@SamplePlayer</span>! Please explain what happened below.</p><p>• Account created: 2 years ago<br>• Ticket ID: #77<br>• Status: Waiting for staff</p><div class="dc-rule"></div><strong>📋 SUPPORT GUIDELINES</strong><p>• Explain the issue clearly.<br>• Add screenshots or video if useful.<br>• Do not ping or spam staff.</p></div><div class="dc-embed dc-form-answer"><strong>Username</strong><p>${escapeHTML(ticket.username)}</p><strong>Platform</strong><p>${escapeHTML(ticket.platform)}</p><strong>Information</strong><p>${escapeHTML(ticket.reason)}</p></div><div class="dc-buttons"><button data-close-ticket class="dc-red">🔒 Close</button></div>`)}${conversation(messages)}`;
    }
    function render() {
      const oldInput = root.querySelector('[name="message"]'), draft = oldInput?.value || "", hadFocus = document.activeElement === oldInput, caret = oldInput?.selectionStart;
      root.innerHTML = `<div class="dc-app-shell"><aside class="dc-server-rail" ${form ? "inert" : ""}><div class="dc-server-icon"><img src="assets/experience/fernsmp-logo.webp" width="44" height="44" alt="FernSMP"></div></aside><aside class="dc-channels" ${form ? "inert" : ""}><div class="dc-server-name">FernSMP <span>⌄</span></div><div class="dc-channel-group">⌄ SUPPORT</div><button data-channel="questions" class="${channel === "questions" ? "selected" : ""}"><span>${icon("hash")}</span> questions</button><button data-channel="support" class="${channel === "support" ? "selected" : ""}"><span>#</span> support</button>${ticket ? `<button data-channel="ticket" class="${channel === "ticket" ? "selected" : ""}"><span>#</span> ${ticket.channel}</button>` : ""}<div class="dc-profile"><span class="dc-player-avatar">S</span><div><strong>SamplePlayer</strong><small>Portfolio demo</small></div></div></aside><section class="dc-chat" ${form ? "inert" : ""}><header><span>#</span><strong>${channel === "support" ? "support" : channel === "questions" ? "questions" : ticket.channel}</strong><small>FernSMP · sample experience</small></header><div class="dc-chat-scroll" role="log" aria-label="Support messages">${channel === "support" ? panel() : channel === "questions" ? questions() : opened()}${pending === channel ? '<div class="dc-typing" role="status"><i></i><i></i><i></i> FernSMP Services is typing…</div>' : ""}${unmatched && channel !== "support" ? '<p class="dc-no-match" role="status">No matching answer in this sample set. The bot leaves this for staff rather than guessing.</p>' : ""}</div>${channel !== "support" ? `<div class="dc-quick-asks" aria-label="Try a question">${[1, 4, 58].map((id) => {
        const item = examples.find((entry) => entry.id === id);
        return `<button data-ask="${id}">${escapeHTML(item.question)}</button>`;
      }).join("")}</div><form class="dc-compose"><span aria-hidden="true">${icon("plus")}</span><label class="sr-only" for="dc-message">Message</label><input id="dc-message" name="message" maxlength="1000" placeholder="${channel === "questions" ? "Ask a sample question…" : "Message #" + ticket.channel}" required autocomplete="off"><button aria-label="Send message" title="Send message">${icon("send")}</button></form>` : '<p class="dc-readonly">Choose a category above to open a sample ticket.</p>'}</section>${form ? `<div class="dc-modal-shade"><form class="dc-ticket-modal" role="dialog" aria-modal="true" aria-label="Open a support ticket"><h2>${escapeHTML(category)} Support</h2><p>Tell us a little about your issue.</p><label>Minecraft username<input name="username" value="SamplePlayer" maxlength="32" required></label><label>Platform<select name="platform">${["Minecraft Java", "Minecraft Bedrock (Mobile)", "Minecraft Bedrock (Computer)", "Minecraft Console (PS5/XBOX)", "Minecraft Nintendo"].map((name) => `<option>${name}</option>`).join("")}</select></label><label>What can we help with?<textarea name="reason" rows="3" maxlength="1000" required placeholder="Explain what happened…"></textarea></label><small>Demo only. Please use fictional details.</small><footer><button type="button" data-cancel>Cancel</button><button type="submit" class="dc-blue">Submit</button></footer></form></div>` : ""}</div>`;
      const log = root.querySelector(".dc-chat-scroll");
      if (channel === "ticket" || channel === "questions") log.scrollTop = log.scrollHeight;
      if (form) root.querySelector('[name="username"]').focus();
      else {
        const input = root.querySelector('[name="message"]');
        if (input) {
          input.value = draft;
          if (hadFocus) {
            input.focus();
            if (caret !== null) input.setSelectionRange(caret, caret);
          }
        }
      }
    }
    root.addEventListener("change", (event) => {
      if (event.target.name === "example") {
        if (!event.target.value) return;
        selectedExample = Number(event.target.value);
        post(examples.find((item) => item.id === selectedExample).question, true);
        return;
      }
      if (event.target.name === "category" && event.target.value) {
        category = event.target.value;
        form = true;
        render();
      }
    });
    root.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      if (button.dataset.ask) {
        post(examples.find((item) => item.id === Number(button.dataset.ask)).question, channel === "questions");
        return;
      }
      if (button.dataset.channel) {
        channel = button.dataset.channel;
        unmatched = false;
        render();
      }
      if (button.hasAttribute("data-cancel")) {
        form = false;
        render();
        root.querySelector('[name="category"]').focus();
      }
      if (button.hasAttribute("data-close-ticket")) {
        ticket = null;
        messages = [];
        channel = "support";
        render();
      }
    });
    root.addEventListener("keydown", (event) => {
      if (event.key === "Tab" && form) {
        const controls = [...root.querySelectorAll(".dc-ticket-modal input,.dc-ticket-modal select,.dc-ticket-modal textarea,.dc-ticket-modal button")];
        if (event.shiftKey && document.activeElement === controls[0]) {
          event.preventDefault();
          controls.at(-1).focus();
        } else if (!event.shiftKey && document.activeElement === controls.at(-1)) {
          event.preventDefault();
          controls[0].focus();
        }
      }
      if (event.key === "Escape" && form) {
        event.preventDefault();
        event.stopPropagation();
        form = false;
        render();
        root.querySelector('[name="category"]').focus();
      }
    });
    root.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(event.target);
      if (event.target.matches(".dc-ticket-modal")) {
        const platform = data.get("platform");
        ticket = { username: normalizeUsername(data.get("username"), platform), platform, reason: data.get("reason").trim(), channel: category.toLowerCase().replaceAll(" & ", "-").replaceAll(" ", "-") + "-sampleplayer-77" };
        form = false;
        channel = "ticket";
        messages = [];
        render();
        if (matchSampleAnswer(ticket.reason)) post(ticket.reason);
      }
      if (event.target.matches(".dc-compose")) {
        const text = data.get("message").trim();
        if (text) {
          event.target.reset();
          post(text, channel === "questions");
          root.querySelector('[name="message"]').focus();
        }
      }
    });
    render();
    return { destroy() {
      for (const timer of timers) clearTimeout(timer);
      timers.clear();
    } };
  }

  // ../../../../../Downloads/DiamondGamer-Interactive-Website/demos/receipt.js?v=20261016-final5
  function freshReceipt() {
    return { merchant: "Pixel Workshop", customer: "SamplePlayer", items: [{ name: "Custom bot setup", qty: 1, price: 20 }] };
  }
  function createReceipt(root) {
    let state = freshReceipt();
    function preview() {
      const item = state.items[0], total = calculate(state.items).total;
      return `<div class="receipt-paper"><h2>${escapeHTML(state.merchant)}</h2><p class="receipt-subtitle">COMMISSION SLIP · SAMPLE</p><dl><div><dt>Customer</dt><dd>${escapeHTML(state.customer)}</dd></div><div><dt>Order</dt><dd>DEMO-1042</dd></div></dl><table><caption>Commission items</caption><thead><tr><th>Item</th><th>Qty</th><th>Total</th></tr></thead><tbody><tr><td>${escapeHTML(item.name)}</td><td>${item.qty}</td><td>${money(total)}</td></tr></tbody></table><dl class="receipt-totals"><div class="receipt-grand"><dt>Total</dt><dd>${money(total)}</dd></div></dl><p class="receipt-thanks">Thank you for your patronage.</p><small>Sample receipt · no transaction</small></div>`;
    }
    function render() {
      root.innerHTML = `<div class="gr-app gr-simple"><header><div><h2>GuildReceipt</h2><p>A receipt, made simple.</p></div><button data-reset>Reset</button></header><div class="gr-layout"><section class="gr-wizard" aria-label="Receipt details"><h3>Make it yours</h3><p>Edit the details. Your receipt updates as you type.</p><div class="gr-fields">${field("Studio name", "merchant", state.merchant)}${field("Customer", "customer", state.customer)}${field("Item name", "item", state.items[0].name)}${field("Quantity", "qty", state.items[0].qty, "number", 'min="1" max="99" step="1"')}${field("Price (USD)", "price", state.items[0].price, "number", 'min="0" max="10000" step="0.01"')}</div></section><section class="gr-right-content" aria-label="Live receipt">${preview()}</section></div></div>`;
    }
    root.addEventListener("input", (event) => {
      const { name, value } = event.target;
      if (name === "merchant" || name === "customer") state[name] = value.slice(0, 80);
      if (name === "item") state.items[0].name = value.slice(0, 100);
      if (name === "qty") state.items[0].qty = Math.max(1, Math.min(99, Math.floor(Number(value) || 1)));
      if (name === "price") state.items[0].price = Math.max(0, Math.min(1e4, Number(value) || 0));
      root.querySelector(".gr-right-content").innerHTML = preview();
    });
    root.addEventListener("change", (event) => {
      if (event.target.name === "qty") event.target.value = state.items[0].qty;
      if (event.target.name === "price") event.target.value = state.items[0].price;
    });
    root.addEventListener("click", (event) => {
      if (event.target.closest("[data-reset]")) {
        state = freshReceipt();
        render();
      }
    });
    render();
    return {};
  }

  // ../../../../../Downloads/DiamondGamer-Interactive-Website/demos/main.js
  var apps = { souffle: { title: "Soufflé — homepage", create: createSouffle }, fern: { title: "FernSMP Services — support", create: createFern, url: "https://fernsmp.net/", link: "Visit FernSMP" }, receipt: { title: "GuildReceipt — live receipt", create: createReceipt, url: "https://receipt-generator.diamondgamer.xyz/", link: "Open GuildReceipt" } };
  var desktop = document.querySelector("#demo-desktop");
  var dock = document.querySelector("#demo-dock");
  var windows = /* @__PURE__ */ new Map();
  function updateScroll() {
    document.body.classList.toggle("demo-modal-open", [...windows.values()].some((w) => w.dialog.open));
  }
  function updateDock() {
    dock.replaceChildren();
    for (const [id, w] of windows) if (w.minimized) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = "Restore " + apps[id].title.split(" — ")[0];
      button.addEventListener("click", () => restore(id));
      dock.append(button);
    }
    dock.hidden = !dock.children.length;
  }
  function close(id) {
    const w = windows.get(id);
    if (!w || w.closing) return;
    w.closing = true;
    const finish = () => {
      w.api?.destroy?.();
      w.dialog.close();
      w.dialog.remove();
      windows.delete(id);
      updateDock();
      updateScroll();
      if (w.launcher?.isConnected) w.launcher.focus();
    };
    if (window.gsap && !reduced()) gsap.to(w.dialog, { autoAlpha: 0, y: 8, scale: 0.985, duration: 0.16, onComplete: finish, overwrite: true });
    else finish();
  }
  function minimize(id) {
    const w = windows.get(id);
    if (!w || w.closing || w.minimizing) return;
    w.minimizing = true;
    const finish = () => {
      w.dialog.close();
      w.minimized = true;
      w.minimizing = false;
      updateDock();
      updateScroll();
      dock.querySelector("button")?.focus();
    };
    if (window.gsap && !reduced()) gsap.to(w.dialog, { autoAlpha: 0, y: 14, scale: 0.97, duration: 0.17, ease: "power2.in", overwrite: true, onComplete: finish });
    else finish();
  }
  function restore(id) {
    const w = windows.get(id);
    if (!w) return;
    w.minimized = false;
    w.dialog.showModal();
    updateDock();
    updateScroll();
    w.api?.onRestore?.();
    animateIn(w.dialog);
  }
  function toggleMax(id) {
    const w = windows.get(id);
    w.maximized = !w.maximized;
    w.dialog.classList.toggle("maximized", w.maximized);
    w.x = 0;
    w.y = 0;
    w.dialog.style.translate = "0px 0px";
    const button = w.dialog.querySelector('[data-window="maximize"]');
    button.setAttribute("aria-label", w.maximized ? "Restore window size" : "Maximize window");
    button.setAttribute("aria-pressed", String(w.maximized));
    animateIn(w.dialog);
  }
  function open(id, launcher) {
    if (!apps[id]) return;
    if (windows.has(id)) {
      restore(id);
      return;
    }
    const dialog = document.createElement("dialog");
    dialog.className = "demo-window " + id + "-window";
    dialog.setAttribute("aria-labelledby", "window-title-" + id);
    dialog.innerHTML = `<header class="demo-titlebar" tabindex="0" aria-label="Application window. Arrow keys move the window."><div class="window-controls"><button data-window="close" aria-label="Close demo" title="Close demo"><span aria-hidden="true">×</span></button><button data-window="minimize" aria-label="Minimize demo" title="Minimize demo"><span aria-hidden="true">−</span></button><button data-window="maximize" aria-label="Maximize window" aria-pressed="false" title="Maximize or restore"><span aria-hidden="true">↗</span></button></div><h2 id="window-title-${id}">${apps[id].title}</h2>${apps[id].url ? `<a class="window-project-link" href="${apps[id].url}" target="_blank" rel="noopener noreferrer">${apps[id].link} ${icon("arrow-up-right")}</a>` : '<span class="window-local">Development paused</span>'}</header><div class="demo-body"></div><div class="demo-toast" role="status" aria-live="polite" aria-atomic="true" hidden></div>`;
    desktop.append(dialog);
    const w = { dialog, launcher, minimized: false, maximized: false, x: 0, y: 0 };
    windows.set(id, w);
    let toastTimer;
    function notify(text) {
      const toast = dialog.querySelector(".demo-toast");
      toast.textContent = text;
      toast.hidden = false;
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.hidden = true, 3500);
    }
    w.api = apps[id].create(dialog.querySelector(".demo-body"), notify);
    dialog.addEventListener("cancel", (e) => {
      e.preventDefault();
      close(id);
    });
    dialog.querySelectorAll("[data-window]").forEach((b) => b.addEventListener("click", () => {
      const action = b.dataset.window;
      if (action === "close") close(id);
      if (action === "minimize") minimize(id);
      if (action === "maximize") toggleMax(id);
    }));
    const bar = dialog.querySelector(".demo-titlebar");
    let drag;
    bar.addEventListener("pointerdown", (e) => {
      if (e.target.closest("button,a") || w.maximized || e.pointerType === "touch") return;
      const rect = dialog.getBoundingClientRect();
      drag = { x: e.clientX, y: e.clientY, baseX: w.x, baseY: w.y, rect };
      bar.setPointerCapture(e.pointerId);
    });
    bar.addEventListener("pointermove", (e) => {
      if (!drag) return;
      const dx = Math.max(-drag.rect.left, Math.min(innerWidth - drag.rect.right, e.clientX - drag.x));
      const dy = Math.max(-drag.rect.top, Math.min(innerHeight - 56 - drag.rect.top, e.clientY - drag.y));
      w.x = drag.baseX + dx;
      w.y = drag.baseY + dy;
      dialog.style.translate = w.x + "px " + w.y + "px";
    });
    bar.addEventListener("pointerup", () => drag = null);
    bar.addEventListener("pointercancel", () => drag = null);
    bar.addEventListener("keydown", (e) => {
      if (e.target !== bar || w.maximized) return;
      const d = { ArrowLeft: [-12, 0], ArrowRight: [12, 0], ArrowUp: [0, -12], ArrowDown: [0, 12] }[e.key];
      if (d) {
        e.preventDefault();
        const rect = dialog.getBoundingClientRect();
        w.x += Math.max(-rect.left, Math.min(innerWidth - rect.right, d[0]));
        w.y += Math.max(-rect.top, Math.min(innerHeight - 56 - rect.top, d[1]));
        dialog.style.translate = w.x + "px " + w.y + "px";
      }
    });
    const destroy = w.api?.destroy;
    w.api.destroy = () => {
      clearTimeout(toastTimer);
      destroy?.();
    };
    dialog.showModal();
    updateScroll();
    animateIn(dialog);
  }
  document.addEventListener("click", (e) => {
    const launcher = e.target.closest("[data-demo]");
    if (launcher) open(launcher.dataset.demo, launcher);
  });
  addEventListener("resize", () => {
    for (const w of windows.values()) {
      w.x = 0;
      w.y = 0;
      w.dialog.style.translate = "0px 0px";
    }
  });
})();
