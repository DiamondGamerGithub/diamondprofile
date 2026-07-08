(() => {
  const href = 'design-refresh.css?v=20260706-ui-1';
  if (!document.querySelector(`link[href="${href}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
})();

(() => {
  const style = document.createElement('style');
  style.textContent = `
    .contact-section {
      overflow-x: hidden !important;
      padding-top: clamp(54px, 7vw, 88px) !important;
      padding-bottom: clamp(54px, 7vw, 88px) !important;
    }

    .contact-container.contact-embed-container {
      width: min(1180px, calc(100vw - 36px)) !important;
      max-width: 1180px !important;
      display: grid !important;
      grid-template-columns: 1fr !important;
      gap: 18px !important;
      align-items: stretch !important;
      justify-items: stretch !important;
      overflow: visible !important;
    }

    .contact-embed-container .contact-copy {
      min-height: 0 !important;
      padding: clamp(24px, 4vw, 38px) !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      text-align: center !important;
      border-radius: 34px 22px 34px 22px !important;
    }

    .contact-embed-container .contact-copy h2,
    .contact-embed-container .contact-copy p {
      text-align: center !important;
      margin-left: auto !important;
      margin-right: auto !important;
    }

    .contact-embed-container .contact-copy p {
      max-width: 760px !important;
    }

    .contact-frame-card {
      position: relative !important;
      width: 100% !important;
      max-width: 100% !important;
      min-width: 0 !important;
      min-height: 880px !important;
      padding: 10px !important;
      overflow: hidden !important;
      border-radius: 40px 24px 40px 24px !important;
      background:
        radial-gradient(circle at 12% 0%, rgba(56, 189, 248, 0.18), transparent 42%),
        linear-gradient(135deg, rgba(255,255,255,.12), rgba(255,255,255,.04)) !important;
      box-shadow: 0 28px 90px rgba(0,0,0,.32), 0 0 50px rgba(56,189,248,.10) !important;
    }

    .contact-frame-card::before {
      content: "Secure Contact Portal";
      position: absolute;
      top: 18px;
      left: 22px;
      z-index: 2;
      padding: 8px 12px;
      border: 1px solid rgba(147, 197, 253, .22);
      border-radius: 999px;
      background: rgba(3, 8, 20, .72);
      color: #dbeafe;
      font-family: "Sora", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: .72rem;
      font-weight: 900;
      letter-spacing: .08em;
      text-transform: uppercase;
      backdrop-filter: blur(12px);
      pointer-events: none;
    }

    .contact-embed-frame {
      width: 100% !important;
      max-width: 100% !important;
      min-width: 0 !important;
      height: 860px !important;
      min-height: 860px !important;
      display: block !important;
      border: 0 !important;
      border-radius: 30px 18px 30px 18px !important;
      overflow: hidden !important;
      background: #050b18 !important;
    }

    @media (max-width: 760px) {
      .contact-section {
        padding-left: 12px !important;
        padding-right: 12px !important;
        padding-bottom: calc(36px + env(safe-area-inset-bottom)) !important;
      }

      .contact-container.contact-embed-container {
        width: min(100%, 540px) !important;
        gap: 14px !important;
        padding: 0 !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      .contact-embed-container .contact-copy {
        padding: 22px 18px !important;
        border-radius: 28px !important;
      }

      .contact-frame-card {
        min-height: 850px !important;
        padding: 7px !important;
        border-radius: 28px !important;
      }

      .contact-frame-card::before {
        top: 13px;
        left: 14px;
        font-size: .62rem;
        padding: 7px 10px;
      }

      .contact-embed-frame {
        height: 835px !important;
        min-height: 835px !important;
        border-radius: 22px !important;
      }
    }
  `;
  document.head.appendChild(style);

  const applyContactFrameFixes = () => {
    document.querySelectorAll('.contact-embed-frame').forEach((frame) => {
      frame.setAttribute('scrolling', 'no');
      frame.setAttribute('allowtransparency', 'true');
      frame.style.overflow = 'hidden';
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyContactFrameFixes, { once: true });
  } else {
    applyContactFrameFixes();
  }
})();

(() => {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const style = document.createElement('style');
  style.textContent = `
    .dg-intro-lock {
      overflow: hidden !important;
    }

    .dg-intro-screen {
      position: fixed;
      inset: 0;
      z-index: 2147483646;
      display: grid;
      place-items: center;
      overflow: hidden;
      background:
        radial-gradient(circle at 50% 42%, rgba(56, 189, 248, 0.18), transparent 30%),
        radial-gradient(circle at 20% 20%, rgba(37, 99, 235, 0.22), transparent 32%),
        linear-gradient(135deg, #030711, #07040d 52%, #02040a);
      color: #f8fbff;
      font-family: "Sora", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    .dg-intro-screen::before {
      content: "";
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);
      background-size: 74px 74px;
      opacity: .22;
      transform: perspective(700px) rotateX(58deg) translateY(10%);
      transform-origin: center bottom;
      animation: dgGridIn 1.35s cubic-bezier(.16, 1, .3, 1) both;
    }

    .dg-intro-screen::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(56,189,248,.18), transparent);
      transform: translateX(-120%);
      animation: dgSweep 1.15s cubic-bezier(.16, 1, .3, 1) .25s both;
    }

    .dg-intro-card {
      position: relative;
      z-index: 2;
      width: min(620px, calc(100vw - 40px));
      display: grid;
      justify-items: center;
      gap: 18px;
      text-align: center;
      transform: translateY(18px) scale(.96);
      opacity: 0;
      animation: dgIntroCard 1.05s cubic-bezier(.16, 1, .3, 1) .12s both;
    }

    .dg-intro-mark {
      width: 98px;
      height: 98px;
      display: grid;
      place-items: center;
      border: 1px solid rgba(147, 197, 253, .45);
      border-radius: 30px;
      background: rgba(255,255,255,.075);
      box-shadow: 0 0 48px rgba(56,189,248,.38), inset 0 0 28px rgba(255,255,255,.08);
      backdrop-filter: blur(14px);
      overflow: hidden;
      animation: dgMarkPulse 1.65s ease-in-out infinite;
    }

    .dg-intro-mark img {
      width: 72px;
      height: 72px;
      object-fit: contain;
      border-radius: 20px;
      filter: drop-shadow(0 0 18px rgba(56,189,248,.65));
    }

    .dg-intro-title {
      position: relative;
      font-size: clamp(2.4rem, 8vw, 5.2rem);
      line-height: .9;
      font-weight: 950;
      letter-spacing: -.05em;
      color: transparent;
      background: linear-gradient(90deg, #fff, #bfdbfe 45%, #38bdf8);
      -webkit-background-clip: text;
      background-clip: text;
      text-shadow: 0 0 40px rgba(56,189,248,.18);
    }

    .dg-intro-title span {
      display: inline-block;
      opacity: 0;
      transform: translateY(28px) scale(.92);
      animation: dgLetterIn .72s cubic-bezier(.16, 1, .3, 1) forwards;
    }

    .dg-intro-subtitle {
      color: rgba(200, 219, 255, .76);
      font-size: .86rem;
      font-weight: 900;
      letter-spacing: .24em;
      text-transform: uppercase;
      opacity: 0;
      animation: dgFadeUp .72s cubic-bezier(.16, 1, .3, 1) .66s forwards;
    }

    .dg-intro-loader {
      width: min(360px, 74vw);
      height: 4px;
      border-radius: 999px;
      overflow: hidden;
      background: rgba(255,255,255,.12);
      box-shadow: inset 0 0 18px rgba(0,0,0,.35);
      opacity: 0;
      animation: dgFadeUp .72s cubic-bezier(.16, 1, .3, 1) .78s forwards;
    }

    .dg-intro-loader div {
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, #22d3ee, #38bdf8, #2563eb);
      transform-origin: left center;
      transform: scaleX(0);
      box-shadow: 0 0 24px rgba(56,189,248,.72);
      animation: dgLoad 1.25s cubic-bezier(.16, 1, .3, 1) .62s forwards;
    }

    .dg-intro-screen.dg-intro-out {
      animation: dgIntroOut .62s cubic-bezier(.7, 0, .84, 0) forwards;
    }

    @keyframes dgIntroCard {
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    @keyframes dgLetterIn {
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    @keyframes dgFadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes dgLoad {
      to { transform: scaleX(1); }
    }

    @keyframes dgGridIn {
      from { opacity: 0; transform: perspective(700px) rotateX(64deg) translateY(22%); }
      to { opacity: .22; transform: perspective(700px) rotateX(58deg) translateY(10%); }
    }

    @keyframes dgSweep {
      to { transform: translateX(120%); }
    }

    @keyframes dgMarkPulse {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-4px) scale(1.035); }
    }

    @keyframes dgIntroOut {
      to { opacity: 0; filter: blur(10px); transform: scale(1.04); visibility: hidden; }
    }
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

  if (document.body) {
    showIntro();
  } else {
    document.addEventListener('DOMContentLoaded', showIntro, { once: true });
  }
})();