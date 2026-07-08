(() => {
  const stylesheets = [
    'design-refresh.css?v=20260706-ui-1',
    'contact-layout-fix.css?v=contact-methods-1'
  ];

  stylesheets.forEach((href) => {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  });
})();

(() => {
  const showToast = (message) => {
    const toast = document.getElementById('notificationToast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show-toast');
    window.clearTimeout(showToast._timer);
    showToast._timer = window.setTimeout(() => toast.classList.remove('show-toast'), 2200);
  };

  const applyContactFrameFixes = () => {
    document.querySelectorAll('.contact-embed-frame').forEach((frame) => {
      frame.setAttribute('scrolling', 'no');
      frame.setAttribute('allowtransparency', 'true');
      frame.style.overflow = 'hidden';
    });
  };

  const addContactMethods = () => {
    const copy = document.querySelector('.contact-embed-container .contact-copy');
    if (!copy || copy.querySelector('.contact-methods-panel')) return;

    const panel = document.createElement('div');
    panel.className = 'contact-methods-panel';
    panel.innerHTML = `
      <a class="contact-method-row" href="mailto:diamond@diamondgamer.xyz">
        <span>
          <span class="contact-method-label">Email</span>
          <span class="contact-method-value">diamond@diamondgamer.xyz</span>
        </span>
        <span class="contact-method-action">Email</span>
      </a>
      <button class="contact-method-row" type="button" data-copy-contact="diamondgamer">
        <span>
          <span class="contact-method-label">Discord</span>
          <span class="contact-method-value">diamondgamer</span>
        </span>
        <span class="contact-method-action">Copy</span>
      </button>
    `;

    copy.appendChild(panel);
  };

  const enableContactCopy = () => {
    document.addEventListener('click', async (event) => {
      const button = event.target.closest('[data-copy-contact]');
      if (!button) return;
      const value = button.getAttribute('data-copy-contact');
      try {
        await navigator.clipboard.writeText(value);
        showToast('Copied Discord username');
      } catch {
        const area = document.createElement('textarea');
        area.value = value;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        area.remove();
        showToast('Copied Discord username');
      }
    });
  };

  const init = () => {
    applyContactFrameFixes();
    addContactMethods();
    enableContactCopy();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

(() => {
  const blockedKeys = new Set(['F12']);

  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });

  document.addEventListener('keydown', (event) => {
    const key = String(event.key || '').toLowerCase();
    const blocksDevTools =
      blockedKeys.has(event.key) ||
      (event.ctrlKey && event.shiftKey && ['i', 'j', 'c'].includes(key)) ||
      (event.ctrlKey && ['u', 's'].includes(key)) ||
      (event.metaKey && event.altKey && ['i', 'j', 'c'].includes(key)) ||
      (event.metaKey && ['u', 's'].includes(key));

    if (blocksDevTools) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, true);
})();

(() => {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const style = document.createElement('style');
  style.textContent = `
    .dg-intro-lock { overflow: hidden !important; }
    .dg-intro-screen {
      position: fixed; inset: 0; z-index: 2147483646; display: grid; place-items: center; overflow: hidden;
      background: radial-gradient(circle at 50% 42%, rgba(56, 189, 248, 0.18), transparent 30%), radial-gradient(circle at 20% 20%, rgba(37, 99, 235, 0.22), transparent 32%), linear-gradient(135deg, #030711, #07040d 52%, #02040a);
      color: #f8fbff; font-family: "Sora", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .dg-intro-screen::before { content: ""; position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px); background-size: 74px 74px; opacity: .22; transform: perspective(700px) rotateX(58deg) translateY(10%); transform-origin: center bottom; animation: dgGridIn 1.35s cubic-bezier(.16, 1, .3, 1) both; }
    .dg-intro-screen::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(56,189,248,.18), transparent); transform: translateX(-120%); animation: dgSweep 1.15s cubic-bezier(.16, 1, .3, 1) .25s both; }
    .dg-intro-card { position: relative; z-index: 2; width: min(620px, calc(100vw - 40px)); display: grid; justify-items: center; gap: 18px; text-align: center; transform: translateY(18px) scale(.96); opacity: 0; animation: dgIntroCard 1.05s cubic-bezier(.16, 1, .3, 1) .12s both; }
    .dg-intro-mark { width: 98px; height: 98px; display: grid; place-items: center; border: 1px solid rgba(147, 197, 253, .45); border-radius: 30px; background: rgba(255,255,255,.075); box-shadow: 0 0 48px rgba(56,189,248,.38), inset 0 0 28px rgba(255,255,255,.08); backdrop-filter: blur(14px); overflow: hidden; animation: dgMarkPulse 1.65s ease-in-out infinite; }
    .dg-intro-mark img { width: 72px; height: 72px; object-fit: contain; border-radius: 20px; filter: drop-shadow(0 0 18px rgba(56,189,248,.65)); }
    .dg-intro-title { position: relative; font-size: clamp(2.4rem, 8vw, 5.2rem); line-height: .9; font-weight: 950; letter-spacing: -.05em; color: transparent; background: linear-gradient(90deg, #fff, #bfdbfe 45%, #38bdf8); -webkit-background-clip: text; background-clip: text; text-shadow: 0 0 40px rgba(56,189,248,.18); }
    .dg-intro-title span { display: inline-block; opacity: 0; transform: translateY(28px) scale(.92); animation: dgLetterIn .72s cubic-bezier(.16, 1, .3, 1) forwards; }
    .dg-intro-subtitle { color: rgba(200, 219, 255, .76); font-size: .86rem; font-weight: 900; letter-spacing: .24em; text-transform: uppercase; opacity: 0; animation: dgFadeUp .72s cubic-bezier(.16, 1, .3, 1) .66s forwards; }
    .dg-intro-loader { width: min(360px, 74vw); height: 4px; border-radius: 999px; overflow: hidden; background: rgba(255,255,255,.12); box-shadow: inset 0 0 18px rgba(0,0,0,.35); opacity: 0; animation: dgFadeUp .72s cubic-bezier(.16, 1, .3, 1) .78s forwards; }
    .dg-intro-loader div { width: 100%; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #22d3ee, #38bdf8, #2563eb); transform-origin: left center; transform: scaleX(0); box-shadow: 0 0 24px rgba(56,189,248,.72); animation: dgLoad 1.25s cubic-bezier(.16, 1, .3, 1) .62s forwards; }
    .dg-intro-screen.dg-intro-out { animation: dgIntroOut .62s cubic-bezier(.7, 0, .84, 0) forwards; }
    @keyframes dgIntroCard { to { opacity: 1; transform: translateY(0) scale(1); } }
    @keyframes dgLetterIn { to { opacity: 1; transform: translateY(0) scale(1); } }
    @keyframes dgFadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes dgLoad { to { transform: scaleX(1); } }
    @keyframes dgGridIn { from { opacity: 0; transform: perspective(700px) rotateX(64deg) translateY(22%); } to { opacity: .22; transform: perspective(700px) rotateX(58deg) translateY(10%); } }
    @keyframes dgSweep { to { transform: translateX(120%); } }
    @keyframes dgMarkPulse { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-4px) scale(1.035); } }
    @keyframes dgIntroOut { to { opacity: 0; filter: blur(10px); transform: scale(1.04); visibility: hidden; } }
  `;
  document.head.appendChild(style);

  const showIntro = () => {
    if (document.querySelector('.dg-intro-screen')) return;
    document.documentElement.classList.add('dg-intro-lock');
    document.body.classList.add('dg-intro-lock');

    const overlay = document.createElement('div');
    overlay.className = 'dg-intro-screen';
    overlay.setAttribute('aria-hidden', 'true');

    const title = 'DiamondGamer'.split('').map((letter, index) => {
      const safeLetter = letter === ' ' ? '&nbsp;' : letter;
      return `<span style="animation-delay:${0.18 + index * 0.045}s">${safeLetter}</span>`;
    }).join('');

    overlay.innerHTML = `
      <div class="dg-intro-card">
        <div class="dg-intro-mark"><img src="assets/branding/diamondgamer-logo.png" alt=""></div>
        <div class="dg-intro-title">${title}</div>
        <div class="dg-intro-subtitle">Portfolio Loading</div>
        <div class="dg-intro-loader"><div></div></div>
      </div>
    `;

    document.body.prepend(overlay);

    window.setTimeout(() => overlay.classList.add('dg-intro-out'), 2050);
    window.setTimeout(() => {
      overlay.remove();
      document.documentElement.classList.remove('dg-intro-lock');
      document.body.classList.remove('dg-intro-lock');
    }, 2750);
  };

  if (document.body) showIntro();
  else document.addEventListener('DOMContentLoaded', showIntro, { once: true });
})();