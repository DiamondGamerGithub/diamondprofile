(() => {
  const versionMeta = document.querySelector('meta[name="site-version"]');
  if (versionMeta) {
    const currentVersion = versionMeta.content;
    const storedVersion = localStorage.getItem('dg_site_version');
    if (storedVersion !== currentVersion) {
      localStorage.setItem('dg_site_version', currentVersion);
      if (storedVersion !== null) location.reload();
    }
  }
})();

(() => {
  const style = document.createElement('style');
  style.textContent = `
    @media (min-width: 761px) {
      body::before { opacity: 0.55 !important; }
      .glow-orb { filter: blur(54px) !important; opacity: 0.1 !important; }
      .top-nav-bar,
      .main-identity-card.unified-card,
      .media-shell,
      .highlight-card,
      .contact-card,
      .full-container,
      .split-container,
      .video-card {
        backface-visibility: hidden;
      }
      .main-identity-card.unified-card,
      .media-shell,
      .highlight-card,
      .contact-card,
      .full-container,
      .split-container,
      .video-card {
        transform: translateZ(0);
      }
      .main-identity-card.unified-card,
      .full-container,
      .split-container,
      .highlight-card,
      .contact-card {
        backdrop-filter: blur(6px) !important;
        -webkit-backdrop-filter: blur(6px) !important;
        box-shadow: 0 22px 58px rgba(0,0,0,.28), 0 0 34px rgba(37,99,235,.12) !important;
      }
      .top-nav-bar {
        transform: translateX(-50%) translateZ(0) !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
        transition: background .18s ease, box-shadow .18s ease, border-color .18s ease !important;
      }
      .carousel-track {
        will-change: transform;
        transform: translateZ(0);
        animation-duration: 52s !important;
      }
      .scroll-pop, .js-reveal { transition-duration: .42s !important; }
      .img-container { position: relative; }
    }

    .dg-scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000000;
      width: 100%;
      height: 3px;
      pointer-events: none;
      transform-origin: left center;
      transform: scaleX(0);
      background: linear-gradient(90deg, #38bdf8, #2563eb, #22d3ee);
      box-shadow: 0 0 18px rgba(56,189,248,.58);
    }

    .dg-scroll-ready .js-reveal.pre-reveal,
    .dg-scroll-ready .scroll-pop.pre-reveal {
      opacity: 0 !important;
      filter: blur(9px);
      transform: translate3d(var(--dg-reveal-x, 0), 44px, 0) scale(.965) !important;
      transition:
        opacity .72s cubic-bezier(.16, 1, .3, 1),
        filter .72s cubic-bezier(.16, 1, .3, 1),
        transform .82s cubic-bezier(.16, 1, .3, 1) !important;
      transition-delay: var(--pop-delay, 0ms) !important;
      will-change: opacity, filter, transform;
    }
    .dg-scroll-ready .scroll-pop.pop-left.pre-reveal { --dg-reveal-x: -42px; }
    .dg-scroll-ready .scroll-pop.pop-right.pre-reveal { --dg-reveal-x: 42px; }
    .dg-scroll-ready .scroll-pop.pop-zoom.pre-reveal {
      transform: translate3d(0, 34px, 0) scale(.9) !important;
    }
    .dg-scroll-ready .js-reveal.active,
    .dg-scroll-ready .scroll-pop.active {
      opacity: 1 !important;
      filter: blur(0);
      transform: translate3d(0, 0, 0) scale(1) !important;
      will-change: auto;
    }
    .dg-scroll-ready .media-shell.scroll-pop.pre-reveal::before,
    .dg-scroll-ready .highlight-card.scroll-pop.pre-reveal::before,
    .dg-scroll-ready .contact-card.pre-reveal::before {
      opacity: 0;
      transform: scale(.86) rotate(-6deg);
      transition: opacity .78s cubic-bezier(.16, 1, .3, 1), transform .84s cubic-bezier(.16, 1, .3, 1);
    }
    .dg-scroll-ready .media-shell.scroll-pop.active::before,
    .dg-scroll-ready .highlight-card.scroll-pop.active::before,
    .dg-scroll-ready .contact-card.active::before {
      opacity: .72;
      transform: scale(1) rotate(0deg);
    }
    .dg-scroll-ready .section::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 20px;
      width: min(680px, 72vw);
      height: 1px;
      pointer-events: none;
      transform: translateX(-50%) scaleX(var(--dg-line, 0));
      transform-origin: center;
      background: linear-gradient(90deg, transparent, rgba(56,189,248,.38), transparent);
      opacity: .75;
    }

    .video-embed-modal {
      position: fixed;
      inset: 0;
      z-index: 999999;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 28px;
      background: rgba(4, 2, 10, 0.82);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
    }
    .video-embed-modal.visible { display: flex; }
    .video-embed-card {
      width: min(1040px, 94vw);
      overflow: hidden;
      border: 1px solid rgba(147, 197, 253, 0.28);
      border-radius: 28px;
      background: #080512;
      box-shadow: 0 28px 90px rgba(0,0,0,0.58), 0 0 42px rgba(56,189,248,0.14);
    }
    .video-embed-frame-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #02040a;
    }
    .video-embed-frame-wrap iframe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
    .video-embed-close {
      position: absolute;
      top: 16px;
      right: 16px;
      z-index: 2;
      width: 46px;
      height: 46px;
      border: 1px solid rgba(147,197,253,.28);
      border-radius: 999px;
      background: rgba(0,0,0,.58);
      color: #fff;
      font-size: 1.35rem;
      font-weight: 900;
      cursor: pointer;
    }
    .video-embed-info {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: 18px;
      padding: 20px 24px 24px;
      background: linear-gradient(180deg, rgba(20,8,34,.96), rgba(8,3,15,.98));
    }
    .video-embed-info h3 {
      margin: 0 0 6px;
      color: #faf7ff;
      font-family: "Sora", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: clamp(1.1rem, 2vw, 1.55rem);
    }
    .video-embed-info p {
      margin: 0;
      color: #c8b9dd;
      font-weight: 750;
    }
    .video-embed-actions {
      display: flex !important;
      flex-wrap: wrap !important;
      justify-content: flex-end !important;
      align-items: center !important;
      gap: 10px !important;
      min-width: 0 !important;
      max-width: 100% !important;
    }
    .video-embed-actions a,
    .video-embed-actions button {
      width: auto !important;
      min-width: 132px !important;
      max-width: 180px !important;
      min-height: 44px !important;
      padding: 0 18px !important;
      border: 1px solid rgba(147,197,253,.26) !important;
      border-radius: 999px !important;
      background: rgba(255,255,255,.08) !important;
      color: #faf7ff !important;
      text-decoration: none !important;
      font-weight: 900 !important;
      cursor: pointer !important;
      display: inline-grid !important;
      place-items: center !important;
      text-align: center !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      font: inherit;
    }
    body.video-modal-open { overflow: hidden; }
    @media (max-width: 720px) {
      .video-embed-modal { padding: 12px; }
      .video-embed-card { width: 100%; border-radius: 22px; }
      .video-embed-info { grid-template-columns: 1fr; align-items: stretch; padding: 18px; }
      .video-embed-actions { justify-content: stretch !important; display: grid !important; grid-template-columns: 1fr 1fr; }
      .video-embed-actions a, .video-embed-actions button { min-width: 0 !important; max-width: none !important; width: 100% !important; }
    }
    @media (prefers-reduced-motion: reduce) {
      .dg-scroll-progress { display: none; }
      .dg-scroll-ready .js-reveal.pre-reveal,
      .dg-scroll-ready .scroll-pop.pre-reveal,
      .dg-scroll-ready .js-reveal.active,
      .dg-scroll-ready .scroll-pop.active {
        opacity: 1 !important;
        filter: none !important;
        transform: none !important;
        transition: none !important;
      }
    }
  `;
  document.head.appendChild(style);
  document.documentElement.classList.add('dg-scroll-ready');
})();

document.addEventListener('contextmenu', (event) => event.preventDefault());
document.addEventListener('dragstart', (event) => event.preventDefault());
document.addEventListener('selectstart', (event) => {
  if (!event.target.closest('input, textarea')) event.preventDefault();
});

document.addEventListener('keydown', (event) => {
  const key = event.key.toUpperCase();
  const code = event.code ? event.code.toUpperCase() : '';
  const blockCombo = key === 'F12' || code === 'F12' ||
    (event.ctrlKey && event.shiftKey && ['I', 'J', 'C', 'K', 'E'].includes(key)) ||
    (event.metaKey && event.altKey && ['I', 'J', 'C', 'K'].includes(key)) ||
    ((event.ctrlKey || event.metaKey) && ['U', 'S', 'P'].includes(key));
  if (blockCombo) {
    event.preventDefault();
    event.stopPropagation();
  }
}, true);

const topNav = document.getElementById('topNav');
const contactBtn = document.getElementById('contactBtn');
const toast = document.getElementById('notificationToast');
const targetUsername = 'therealdiamondgamer';

function showToast(message, duration = 2400) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show-toast');
  window.setTimeout(() => toast.classList.remove('show-toast'), duration);
}

if (topNav) {
  let navTicking = false;
  const updateNav = () => {
    topNav.classList.toggle('is-scrolled', window.scrollY > 24);
    navTicking = false;
  };
  window.addEventListener('scroll', () => {
    if (navTicking) return;
    navTicking = true;
    window.requestAnimationFrame(updateNav);
  }, { passive: true });
}

if (contactBtn) {
  contactBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(targetUsername)
      .then(() => showToast("Copied Diamond's Discord username"))
      .catch(() => showToast('Could not copy username'));
  });
}

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', () => {
    const copyValue = button.dataset.copy;
    const originalText = button.textContent;
    navigator.clipboard.writeText(copyValue)
      .then(() => {
        button.textContent = 'IP Copied';
        showToast(`Copied ${copyValue}`, 2200);
        window.setTimeout(() => { button.textContent = originalText; }, 2200);
      })
      .catch(() => showToast('Could not copy IP'));
  });
});

const videoData = [
  { thumbnail: 'assets/thumbnails/showcase-01.jpg', url: 'https://www.youtube.com/watch?v=eVD_6Ba-6H0&t=19s', title: 'Featured DiamondGamer Video' },
  { thumbnail: 'assets/thumbnails/showcase-02.jpg', url: 'https://www.youtube.com/watch?v=9TbpAUYDlF0', title: 'Featured DiamondGamer Video' },
  { thumbnail: 'assets/thumbnails/showcase-03.jpg', url: 'https://www.youtube.com/watch?v=ilI5kEstT0U&t=74s', title: 'Featured DiamondGamer Video' },
  { thumbnail: 'assets/thumbnails/showcase-04.jpg', url: 'https://www.youtube.com/watch?v=annIbh_LzV8&t=79s', title: 'Featured DiamondGamer Video' },
  { thumbnail: 'assets/thumbnails/showcase-05.jpg', url: 'https://www.youtube.com/watch?v=fYvbSPDSkzU&t=1s', title: 'Featured DiamondGamer Video' },
  { thumbnail: 'assets/thumbnails/showcase-06.jpg', url: 'https://www.youtube.com/watch?v=Ifi3jRmmoBU&t=7s', title: 'Featured DiamondGamer Video' },
  { thumbnail: 'assets/thumbnails/showcase-07.jpg', url: 'https://www.youtube.com/watch?v=VYxT66QTyLs&t=16s', title: 'Featured DiamondGamer Video' },
  { thumbnail: 'assets/thumbnails/showcase-08.jpg', url: 'https://www.youtube.com/watch?v=Jecjk4XiRaM&t=65s', title: 'Featured DiamondGamer Video' },
  { thumbnail: 'assets/thumbnails/showcase-09.jpg', url: 'https://www.youtube.com/watch?v=pbGes3V8-Eo', title: 'Featured DiamondGamer Video' }
];

const track = document.getElementById('carouselTrack');
const carouselContainer = document.getElementById('carouselContainer');

function getYoutubeId(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) return parsed.pathname.replace('/', '');
    if (parsed.searchParams.get('v')) return parsed.searchParams.get('v');
    const embedMatch = parsed.pathname.match(/\/embed\/([^/?]+)/);
    if (embedMatch) return embedMatch[1];
  } catch (err) {
    const fallback = String(url).match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{6,})/);
    return fallback ? fallback[1] : '';
  }
  return '';
}

function ensureVideoModal() {
  let modal = document.getElementById('videoEmbedModal');
  if (modal) return modal;

  modal = document.createElement('div');
  modal.id = 'videoEmbedModal';
  modal.className = 'video-embed-modal';
  modal.innerHTML = `
    <div class="video-embed-card" role="dialog" aria-modal="true" aria-label="Video player">
      <div class="video-embed-frame-wrap">
        <button type="button" class="video-embed-close" aria-label="Close video">×</button>
        <iframe id="videoEmbedFrame" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
      <div class="video-embed-info">
        <div>
          <h3 id="videoEmbedTitle">DiamondGamer Video</h3>
          <p>Watch without leaving the portfolio.</p>
        </div>
        <div class="video-embed-actions">
          <a id="videoEmbedOpen" href="#" target="_blank" rel="noopener">Open YouTube</a>
          <button type="button" id="videoEmbedDone">Close</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const closeVideo = () => {
    modal.classList.remove('visible');
    document.body.classList.remove('video-modal-open');
    const frame = document.getElementById('videoEmbedFrame');
    if (frame) frame.removeAttribute('src');
  };

  modal.addEventListener('click', (event) => { if (event.target === modal) closeVideo(); });
  modal.querySelector('.video-embed-close').addEventListener('click', closeVideo);
  modal.querySelector('#videoEmbedDone').addEventListener('click', closeVideo);
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal.classList.contains('visible')) closeVideo(); });
  return modal;
}

function openVideoEmbed(video) {
  const videoId = getYoutubeId(video.url);
  if (!videoId) {
    window.open(video.url, '_blank', 'noopener');
    return;
  }
  const modal = ensureVideoModal();
  modal.querySelector('#videoEmbedTitle').textContent = video.title || 'DiamondGamer Video';
  modal.querySelector('#videoEmbedOpen').href = video.url;
  modal.querySelector('#videoEmbedFrame').src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  document.body.classList.add('video-modal-open');
  modal.classList.add('visible');
}

function createCardElement(video) {
  const card = document.createElement('a');
  card.href = video.url;
  card.target = '_blank';
  card.rel = 'noopener';
  card.className = 'video-card';
  card.innerHTML = `<div class="img-container"><img src="${video.thumbnail}" alt="Showcase video" loading="lazy" decoding="async"></div>`;
  card.addEventListener('click', (event) => {
    event.preventDefault();
    openVideoEmbed(video);
  });
  return card;
}

if (track && carouselContainer) {
  const repeatedVideos = [...videoData, ...videoData, ...videoData];
  const fragment = document.createDocumentFragment();
  repeatedVideos.forEach((video) => fragment.appendChild(createCardElement(video)));
  track.appendChild(fragment);
}

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
if (prevBtn && track) prevBtn.addEventListener('click', () => track.scrollBy({ left: -400, behavior: 'smooth' }));
if (nextBtn && track) nextBtn.addEventListener('click', () => track.scrollBy({ left: 400, behavior: 'smooth' }));

const lightbox = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('lightboxClose');
if (lightbox && lightboxImg) {
  document.querySelectorAll('.clickable-img').forEach((img) => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.currentSrc || img.src;
      lightbox.classList.add('visible');
    });
  });
}
function closeLightbox() {
  if (!lightbox || !lightboxImg) return;
  lightbox.classList.remove('visible');
  window.setTimeout(() => lightboxImg.removeAttribute('src'), 180);
}
if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && lightbox && lightbox.classList.contains('visible')) closeLightbox(); });

const popSelectors = ['.center-header', '.hero-eyebrow', '.main-avatar', '.hero-stats .stat-pill', '.carousel-outer', '.split-img .media-shell', '.split-text', '.project-cta-wrap', '.img-grid-dual .media-shell', '.img-block-single .media-shell', '.highlight-card', '.contact-copy', '.contact-method'];
const popTargets = Array.from(document.querySelectorAll(popSelectors.join(',')));
popTargets.forEach((el, index) => {
  el.classList.add('scroll-pop');
  if (index % 3 === 0) el.classList.add('pop-left');
  if (index % 3 === 1) el.classList.add('pop-right');
  if (index % 3 === 2) el.classList.add('pop-zoom');
  el.style.setProperty('--pop-delay', `${Math.min((index % 4) * 55, 165)}ms`);
});

const revealElements = Array.from(document.querySelectorAll('.js-reveal, .scroll-pop'));
function activateReveals() { revealElements.forEach((el) => el.classList.add('active')); }
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.11, rootMargin: '0px 0px -70px 0px' });
  revealElements.forEach((el) => {
    el.classList.add('pre-reveal');
    observer.observe(el);
  });
} else {
  activateReveals();
}
window.setTimeout(activateReveals, 1400);

const sparkField = document.getElementById('sparkField');
if (sparkField) sparkField.textContent = '';

(() => {
  if (track && 'IntersectionObserver' in window) {
    const carouselObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        track.style.animationPlayState = entry.isIntersecting ? '' : 'paused';
      });
    }, { threshold: 0.05 });
    carouselObserver.observe(track);
  }
})();

(() => {
  const progress = document.createElement('div');
  progress.className = 'dg-scroll-progress';
  document.body.appendChild(progress);

  const sections = Array.from(document.querySelectorAll('.section, .hero-section'));
  let ticking = false;
  const updateScrollEffects = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progress.style.transform = `scaleX(${Math.min(1, scrollTop / maxScroll)})`;

    const viewportMid = window.innerHeight * 0.62;
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const distance = Math.abs(rect.top - viewportMid);
      const amount = Math.max(0, 1 - distance / window.innerHeight);
      section.style.setProperty('--dg-line', amount.toFixed(3));
    });
    ticking = false;
  };

  const requestScrollUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateScrollEffects);
  };

  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('resize', requestScrollUpdate, { passive: true });
  updateScrollEffects();

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  function smoothScrollTo(targetY, duration = 760) {
    const startY = window.scrollY || document.documentElement.scrollTop;
    const distance = targetY - startY;
    const start = performance.now();
    const step = (now) => {
      const elapsed = now - start;
      const progressAmount = Math.min(1, elapsed / duration);
      window.scrollTo(0, startY + distance * easeOutCubic(progressAmount));
      if (progressAmount < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      const navOffset = 96;
      const targetY = target.getBoundingClientRect().top + window.scrollY - navOffset;
      smoothScrollTo(Math.max(0, targetY));
      history.pushState(null, '', id);
    });
  });
})();
