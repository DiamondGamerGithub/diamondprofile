(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const isDesktop = window.matchMedia('(min-width: 761px)').matches;

  const style = document.createElement('style');
  style.textContent = `
    html { scroll-behavior: auto !important; }
    .smooth-reveal {
      opacity: 0;
      transform: translate3d(0, 34px, 0) scale(.985);
      filter: blur(6px);
      transition: opacity .72s cubic-bezier(.16, 1, .3, 1), transform .72s cubic-bezier(.16, 1, .3, 1), filter .72s cubic-bezier(.16, 1, .3, 1);
      transition-delay: var(--smooth-delay, 0ms);
      will-change: opacity, transform, filter;
    }
    .smooth-reveal.revealed {
      opacity: 1;
      transform: translate3d(0, 0, 0) scale(1);
      filter: blur(0);
    }
    .smooth-reveal.pop-left { transform: translate3d(-28px, 26px, 0) scale(.985); }
    .smooth-reveal.pop-right { transform: translate3d(28px, 26px, 0) scale(.985); }
    .smooth-reveal.pop-zoom { transform: translate3d(0, 28px, 0) scale(.955); }
    .smooth-reveal.pop-left.revealed,
    .smooth-reveal.pop-right.revealed,
    .smooth-reveal.pop-zoom.revealed { transform: translate3d(0, 0, 0) scale(1); }
    @media (max-width: 760px) {
      .smooth-reveal { transform: translate3d(0, 22px, 0) scale(.99); filter: blur(3px); transition-duration: .52s; }
    }
  `;
  document.head.appendChild(style);

  const revealTargets = Array.from(document.querySelectorAll([
    '.hero-split-container',
    '.main-identity-card',
    '.center-header',
    '.carousel-outer',
    '.split-container',
    '.full-container',
    '.highlight-card',
    '.contact-container',
    '.contact-method',
    '.media-shell',
    '.hero-stats .stat-pill',
    '.project-cta-wrap'
  ].join(',')));

  revealTargets.forEach((el, index) => {
    if (el.classList.contains('smooth-reveal')) return;
    el.classList.add('smooth-reveal');
    if (index % 3 === 0) el.classList.add('pop-left');
    if (index % 3 === 1) el.classList.add('pop-right');
    if (index % 3 === 2) el.classList.add('pop-zoom');
    el.style.setProperty('--smooth-delay', `${Math.min((index % 4) * 55, 165)}ms`);
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      } else if (entry.boundingClientRect.top > window.innerHeight * 1.15) {
        entry.target.classList.remove('revealed');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  revealTargets.forEach((el) => revealObserver.observe(el));
  window.setTimeout(() => revealTargets.forEach((el) => el.classList.add('revealed')), 1800);

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function smoothScrollTo(targetY, duration = 850) {
    const startY = window.scrollY || window.pageYOffset;
    const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const endY = Math.max(0, Math.min(targetY, maxY));
    const distance = endY - startY;
    if (Math.abs(distance) < 2) return;

    const startTime = performance.now();
    let cancelled = false;

    const cancel = () => { cancelled = true; };
    window.addEventListener('wheel', cancel, { passive: true, once: true });
    window.addEventListener('touchstart', cancel, { passive: true, once: true });

    function step(now) {
      if (cancelled) return;
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = easeOutCubic(progress);
      window.scrollTo(0, startY + distance * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href');
    if (!hash || hash === '#') return;
    const target = document.querySelector(hash);
    if (!target) return;

    event.preventDefault();
    const headerOffset = isDesktop ? 106 : 88;
    const targetY = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    smoothScrollTo(targetY, isDesktop ? 820 : 620);
    history.pushState(null, '', hash);
  });

  if (!isDesktop) return;

  let targetScroll = window.scrollY;
  let currentScroll = window.scrollY;
  let isRunning = false;
  let lastWheelTime = 0;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function smoothWheelLoop() {
    currentScroll += (targetScroll - currentScroll) * 0.15;
    if (Math.abs(targetScroll - currentScroll) < 0.5) {
      currentScroll = targetScroll;
      isRunning = false;
      window.scrollTo(0, currentScroll);
      return;
    }
    window.scrollTo(0, currentScroll);
    requestAnimationFrame(smoothWheelLoop);
  }

  window.addEventListener('wheel', (event) => {
    if (event.ctrlKey) return;
    const now = performance.now();
    if (now - lastWheelTime > 450) {
      targetScroll = window.scrollY;
      currentScroll = window.scrollY;
    }
    lastWheelTime = now;

    event.preventDefault();
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    targetScroll = clamp(targetScroll + event.deltaY * 0.82, 0, maxScroll);
    if (!isRunning) {
      isRunning = true;
      requestAnimationFrame(smoothWheelLoop);
    }
  }, { passive: false });
})();
