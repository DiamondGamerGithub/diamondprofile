(() => {
  const versionMeta = document.querySelector('meta[name="site-version"]');
  if (!versionMeta) return;
  const currentVersion = versionMeta.content;
  const storedVersion = localStorage.getItem('dg_site_version');
  if (storedVersion !== currentVersion) {
    localStorage.setItem('dg_site_version', currentVersion);
    if (storedVersion !== null) location.reload();
  }
})();

(() => {
  const style = document.createElement('style');
  style.textContent = `
    .js-reveal,
    .scroll-pop {
      backface-visibility: hidden;
      transform-style: preserve-3d;
    }

    .js-reveal.pre-reveal,
    .scroll-pop.pre-reveal,
    .js-reveal.active,
    .scroll-pop.active {
      will-change: transform, opacity;
    }

    .scroll-pop.pre-reveal {
      transform: translate3d(0, 22px, 0) scale(.985);
    }

    .scroll-pop.pop-left.pre-reveal,
    .scroll-pop.pop-right.pre-reveal,
    .scroll-pop.pop-zoom.pre-reveal {
      transform: translate3d(0, 22px, 0) scale(.985);
    }

    .js-reveal.active,
    .scroll-pop.active {
      transform: translate3d(0, 0, 0) scale(1);
    }

    .carousel-track {
      animation-play-state: running;
    }

    .carousel-outer:hover .carousel-track {
      animation-play-state: paused;
    }

    .video-embed-modal {
      position: fixed;
      inset: 0;
      z-index: 999999;
      display: none;
      align-items: center;
      justify-content: center;
      padding: clamp(14px, 3vw, 38px);
      background: rgba(6, 2, 14, 0.78);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
    }

    .video-embed-modal.visible {
      display: flex;
    }

    .video-embed-card {
      position: relative;
      width: min(1040px, 92vw);
      border: 1px solid rgba(147, 197, 253, 0.28);
      border-radius: 28px;
      overflow: hidden;
      background: #07040d;
      box-shadow: 0 38px 130px rgba(0, 0, 0, 0.72), 0 0 90px rgba(56, 189, 248, 0.2);
    }

    .video-embed-frame-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #000;
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
      top: 14px;
      right: 14px;
      z-index: 3;
      width: 46px;
      height: 46px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 999px;
      background: rgba(0, 0, 0, 0.62);
      color: #fff;
      cursor: pointer;
      font-size: 1.5rem;
      font-weight: 900;
      line-height: 1;
    }

    .video-embed-open {
      position: absolute;
      right: 18px;
      bottom: 16px;
      z-index: 3;
      min-height: 38px;
      padding: 0 14px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(255,255,255,.2);
      border-radius: 999px;
      background: rgba(0,0,0,.58);
      color: #fff;
      text-decoration: none;
      font-weight: 900;
      font-size: .88rem;
      backdrop-filter: blur(12px);
    }

    body.video-modal-open {
      overflow: hidden;
    }

    @media (max-width: 760px) {
      .video-embed-card { width: 96vw; border-radius: 22px; }
      .video-embed-close { width: 42px; height: 42px; top: 10px; right: 10px; }
      .video-embed-open { right: 12px; bottom: 12px; font-size: .78rem; min-height: 34px; }
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
  { thumbnail: 'assets/thumbnails/showcase-01.jpg', url: 'https://www.youtube.com/watch?v=eVD_6Ba-6H0&t=19s', title: 'DiamondGamer Video' },
  { thumbnail: 'assets/thumbnails/showcase-02.jpg', url: 'https://www.youtube.com/watch?v=9TbpAUYDlF0', title: 'DiamondGamer Video' },
  { thumbnail: 'assets/thumbnails/showcase-03.jpg', url: 'https://www.youtube.com/watch?v=ilI5kEstT0U&t=74s', title: 'DiamondGamer Video' },
  { thumbnail: 'assets/thumbnails/showcase-04.jpg', url: 'https://www.youtube.com/watch?v=annIbh_LzV8&t=79s', title: 'DiamondGamer Video' },
  { thumbnail: 'assets/thumbnails/showcase-05.jpg', url: 'https://www.youtube.com/watch?v=fYvbSPDSkzU&t=1s', title: 'DiamondGamer Video' },
  { thumbnail: 'assets/thumbnails/showcase-06.jpg', url: 'https://www.youtube.com/watch?v=Ifi3jRmmoBU&t=7s', title: 'DiamondGamer Video' },
  { thumbnail: 'assets/thumbnails/showcase-07.jpg', url: 'https://www.youtube.com/watch?v=VYxT66QTyLs&t=16s', title: 'DiamondGamer Video' },
  { thumbnail: 'assets/thumbnails/showcase-08.jpg', url: 'https://www.youtube.com/watch?v=Jecjk4XiRaM&t=65s', title: 'DiamondGamer Video' },
  { thumbnail: 'assets/thumbnails/showcase-09.jpg', url: 'https://www.youtube.com/watch?v=pbGes3V8-Eo', title: 'DiamondGamer Video' }
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
  } catch (error) {
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
        <a id="videoEmbedOpen" class="video-embed-open" href="#" target="_blank" rel="noopener">Open YouTube</a>
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

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeVideo();
  });
  modal.querySelector('.video-embed-close').addEventListener('click', closeVideo);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('visible')) closeVideo();
  });

  return modal;
}

function openVideoEmbed(video) {
  const videoId = getYoutubeId(video.url);
  if (!videoId) {
    window.open(video.url, '_blank', 'noopener');
    return;
  }

  const modal = ensureVideoModal();
  const frame = modal.querySelector('#videoEmbedFrame');
  const openLink = modal.querySelector('#videoEmbedOpen');
  openLink.href = video.url;
  frame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
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
  const fragment = document.createDocumentFragment();
  [...videoData, ...videoData, ...videoData].forEach((video) => fragment.appendChild(createCardElement(video)));
  track.appendChild(fragment);

  const runCarousel = () => {
    track.style.animationPlayState = 'running';
  };

  const pauseCarousel = () => {
    track.style.animationPlayState = 'paused';
  };

  runCarousel();
  carouselContainer.addEventListener('mouseenter', pauseCarousel);
  carouselContainer.addEventListener('mouseleave', runCarousel);
  carouselContainer.addEventListener('focusin', pauseCarousel);
  carouselContainer.addEventListener('focusout', runCarousel);
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
        window.setTimeout(() => {
          entry.target.style.willChange = 'auto';
        }, 760);
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

if (track && 'IntersectionObserver' in window) {
  const carouselObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !carouselContainer.matches(':hover')) {
        track.style.animationPlayState = 'running';
      }
    });
  }, { threshold: 0.05 });
  carouselObserver.observe(track);
}

(() => {
  const markScrolling = () => {
    document.body.classList.add('is-page-scrolling');
    window.clearTimeout(markScrolling.timer);
    markScrolling.timer = window.setTimeout(() => {
      document.body.classList.remove('is-page-scrolling');
      if (track && !carouselContainer.matches(':hover')) {
        track.style.animationPlayState = 'running';
      }
    }, 120);
  };
  window.addEventListener('scroll', markScrolling, { passive: true });
})();

(() => {
  const progress = document.querySelector('.dg-scroll-progress') || document.createElement('div');
  progress.className = 'dg-scroll-progress';
  progress.style.position = 'fixed';
  progress.style.top = '0';
  progress.style.left = '0';
  progress.style.zIndex = '1000000';
  progress.style.width = '100vw';
  progress.style.height = '6px';
  progress.style.pointerEvents = 'none';
  progress.style.transformOrigin = 'left center';
  progress.style.background = 'linear-gradient(90deg, #67e8f9, #38bdf8, #2563eb, #22d3ee)';
  progress.style.boxShadow = '0 0 18px rgba(56, 189, 248, .85), 0 0 30px rgba(37, 99, 235, .45)';
  progress.style.willChange = 'transform';
  if (!progress.parentElement) document.body.appendChild(progress);

  let ticking = false;
  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progress.style.transform = `scale3d(${Math.min(1, scrollTop / maxScroll)}, 1, 1)`;
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
