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

    body.is-page-scrolling .carousel-track {
      animation-play-state: paused !important;
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
  { thumbnail: 'assets/thumbnails/showcase-01.jpg', url: 'https://www.youtube.com/watch?v=eVD_6Ba-6H0&t=19s' },
  { thumbnail: 'assets/thumbnails/showcase-02.jpg', url: 'https://www.youtube.com/watch?v=9TbpAUYDlF0' },
  { thumbnail: 'assets/thumbnails/showcase-03.jpg', url: 'https://www.youtube.com/watch?v=ilI5kEstT0U&t=74s' },
  { thumbnail: 'assets/thumbnails/showcase-04.jpg', url: 'https://www.youtube.com/watch?v=annIbh_LzV8&t=79s' },
  { thumbnail: 'assets/thumbnails/showcase-05.jpg', url: 'https://www.youtube.com/watch?v=fYvbSPDSkzU&t=1s' },
  { thumbnail: 'assets/thumbnails/showcase-06.jpg', url: 'https://www.youtube.com/watch?v=Ifi3jRmmoBU&t=7s' },
  { thumbnail: 'assets/thumbnails/showcase-07.jpg', url: 'https://www.youtube.com/watch?v=VYxT66QTyLs&t=16s' },
  { thumbnail: 'assets/thumbnails/showcase-08.jpg', url: 'https://www.youtube.com/watch?v=Jecjk4XiRaM&t=65s' },
  { thumbnail: 'assets/thumbnails/showcase-09.jpg', url: 'https://www.youtube.com/watch?v=pbGes3V8-Eo' }
];

const track = document.getElementById('carouselTrack');
const carouselContainer = document.getElementById('carouselContainer');

function createCardElement(video) {
  const card = document.createElement('a');
  card.href = video.url;
  card.target = '_blank';
  card.rel = 'noopener';
  card.className = 'video-card';
  card.innerHTML = `<div class="img-container"><img src="${video.thumbnail}" alt="Showcase video" loading="lazy" decoding="async"></div>`;
  return card;
}

if (track && carouselContainer) {
  const fragment = document.createDocumentFragment();
  [...videoData, ...videoData, ...videoData].forEach((video) => fragment.appendChild(createCardElement(video)));
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
      track.style.animationPlayState = entry.isIntersecting ? '' : 'paused';
    });
  }, { threshold: 0.05 });
  carouselObserver.observe(track);
}

(() => {
  let scrollPauseTimer;
  const markScrolling = () => {
    document.body.classList.add('is-page-scrolling');
    window.clearTimeout(scrollPauseTimer);
    scrollPauseTimer = window.setTimeout(() => {
      document.body.classList.remove('is-page-scrolling');
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
