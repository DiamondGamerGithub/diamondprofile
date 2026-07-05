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
  if (!document.querySelector('link[href^="performance-fix.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'performance-fix.css?v=clean-1';
    document.head.appendChild(link);
  }
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
