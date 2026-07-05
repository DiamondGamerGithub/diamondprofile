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
    html { scroll-behavior: smooth; }
    body { overflow-x: hidden; }

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
      box-shadow: 0 0 18px rgba(56, 189, 248, .58);
    }

    @media (min-width: 901px) {
      .section,
      #networks,
      #software,
      .highlights-section,
      .contact-section,
      .footer {
        content-visibility: visible !important;
        contain-intrinsic-size: auto !important;
        contain: none !important;
      }
    }

    .top-nav-bar,
    .top-nav-bar.is-scrolled {
      transform: translateX(-50%) !important;
    }

    .highlights-grid {
      display: grid !important;
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      align-items: stretch !important;
      justify-items: stretch !important;
      gap: 24px !important;
      width: min(1140px, 100%) !important;
      margin-inline: auto !important;
    }

    .highlight-card {
      height: auto !important;
      min-height: 256px !important;
    }

    .contact-container {
      display: grid !important;
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      align-items: stretch !important;
      justify-items: stretch !important;
      gap: 24px !important;
      width: min(1160px, calc(100% - 36px)) !important;
      margin-inline: auto !important;
    }

    .contact-copy,
    .contact-card {
      width: 100% !important;
      max-width: none !important;
      min-height: 288px !important;
    }

    .scroll-pop.pre-reveal,
    .js-reveal.pre-reveal {
      opacity: 0;
      transform: translate3d(0, 26px, 0) scale(.985);
      filter: blur(3px);
      transition:
        opacity .58s cubic-bezier(.16, 1, .3, 1),
        transform .62s cubic-bezier(.16, 1, .3, 1),
        filter .58s cubic-bezier(.16, 1, .3, 1);
      transition-delay: var(--pop-delay, 0ms);
    }

    .scroll-pop.pop-left.pre-reveal {
      transform: translate3d(-26px, 26px, 0) scale(.985);
    }

    .scroll-pop.pop-right.pre-reveal {
      transform: translate3d(26px, 26px, 0) scale(.985);
    }

    .scroll-pop.pop-zoom.pre-reveal {
      transform: translate3d(0, 22px, 0) scale(.955);
    }

    .scroll-pop.active,
    .js-reveal.active {
      opacity: 1;
      transform: translate3d(0, 0, 0) scale(1);
      filter: blur(0);
    }

    .video-card .video-play-badge { display: none !important; }

    .video-embed-modal {
      position: fixed;
      inset: 0;
      z-index: 999999;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 28px;
      background: rgba(4, 2, 10, 0.82);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
    .video-embed-modal.visible { display: flex; }
    .video-embed-card {
      width: min(1040px, 94vw);
      overflow: hidden;
      border: 1px solid rgba(147, 197, 253, 0.28);
      border-radius: 28px;
      background: #080512;
      box-shadow: 0 24px 72px rgba(0,0,0,.52), 0 0 34px rgba(56,189,248,.12);
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
    }
    .video-embed-actions a,
    .video-embed-actions button {
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
      font: inherit;
    }
    body.video-modal-open { overflow: hidden; }

    @media (max-width: 1000px) {
      .contact-container { grid-template-columns: 1fr !important; justify-items: center !important; }
      .contact-copy, .contact-card { max-width: 720px !important; min-height: auto !important; }
    }

    @media (max-width: 900px) {
      .highlights-grid { grid-template-columns: 1fr !important; }
    }

    @media (max-width: 720px) {
      .video-embed-modal { padding: 12px; }
      .video-embed-card { width: 100%; border-radius: 22px; }
      .video-embed-info { grid-template-columns: 1fr; align-items: stretch; padding: 18px; }
      .video-embed-actions { justify-content: stretch !important; display: grid !important; grid-template-columns: 1fr 1fr; }
      .video-embed-actions a, .video-embed-actions button { min-width: 0 !important; max-width: none !important; width: 100% !important; }
    }
  `;
  document.head.appendChild(style);
})();

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
  el.style.setProperty('--pop-delay', `${Math.min((index % 3) * 35, 70)}ms`);
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
  }, { threshold: 0.08, rootMargin: '0px 0px -54px 0px' });
  revealElements.forEach((el) => {
    el.classList.add('pre-reveal');
    observer.observe(el);
  });
} else {
  activateReveals();
}
window.setTimeout(activateReveals, 1300);

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

  let ticking = false;
  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progress.style.transform = `scaleX(${Math.min(1, scrollTop / maxScroll)})`;
    ticking = false;
  };

  const requestProgressUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateProgress);
  };

  window.addEventListener('scroll', requestProgressUpdate, { passive: true });
  window.addEventListener('resize', requestProgressUpdate, { passive: true });
  updateProgress();
})();

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    const navOffset = 96;
    const targetY = target.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
    history.pushState(null, '', id);
  });
});
