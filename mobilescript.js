(function () {
  const versionMeta = document.querySelector('meta[name="site-version"]');
  if (!versionMeta) return;
  const currentVersion = versionMeta.content;
  const storedVersion = localStorage.getItem('dg_mobile_site_version');
  if (storedVersion !== currentVersion) {
    localStorage.setItem('dg_mobile_site_version', currentVersion);
    if (storedVersion !== null) location.reload();
  }
})();

const contactBtn = document.getElementById('contactBtn');
const toast = document.getElementById('notificationToast');
const targetUsername = 'therealdiamondgamer';

function showToast(message, duration = 2100) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show-toast');
  window.setTimeout(() => toast.classList.remove('show-toast'), duration);
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
        button.textContent = 'Copied';
        showToast(`Copied ${copyValue}`);
        window.setTimeout(() => { button.textContent = originalText; }, 1600);
      })
      .catch(() => showToast('Could not copy'));
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

  const style = document.createElement('style');
  style.textContent = `
    .video-embed-modal {
      position: fixed;
      inset: 0;
      z-index: 999999;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 12px;
      background: rgba(4, 2, 10, 0.84);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }
    .video-embed-modal.visible { display: flex; }
    .video-embed-card {
      width: min(100%, 680px);
      overflow: hidden;
      border: 1px solid rgba(147, 197, 253, 0.28);
      border-radius: 24px;
      background: #080512;
      box-shadow: 0 28px 90px rgba(0,0,0,0.62), 0 0 42px rgba(56,189,248,0.16);
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
      top: 10px;
      right: 10px;
      z-index: 2;
      width: 42px;
      height: 42px;
      border: 1px solid rgba(147,197,253,0.28);
      border-radius: 999px;
      background: rgba(0,0,0,0.62);
      color: #fff;
      font-size: 1.3rem;
      font-weight: 900;
    }
    .video-embed-info {
      display: grid;
      gap: 14px;
      padding: 16px;
      background: linear-gradient(180deg, rgba(20,8,34,.98), rgba(8,3,15,.98));
    }
    .video-embed-info h3 {
      margin: 0 0 5px;
      color: #faf7ff;
      font-family: "Sora", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 1.12rem;
    }
    .video-embed-info p {
      margin: 0;
      color: #c8b9dd;
      font-weight: 750;
      font-size: .9rem;
    }
    .video-embed-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .video-embed-actions a,
    .video-embed-actions button {
      min-height: 44px;
      border: 1px solid rgba(147,197,253,0.26);
      border-radius: 999px;
      background: rgba(255,255,255,0.08);
      color: #faf7ff;
      text-decoration: none;
      font-weight: 900;
      display: grid;
      place-items: center;
      font: inherit;
    }
    body.video-modal-open { overflow: hidden; }
  `;
  document.head.appendChild(style);

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
  const frame = modal.querySelector('#videoEmbedFrame');
  const title = modal.querySelector('#videoEmbedTitle');
  const openLink = modal.querySelector('#videoEmbedOpen');

  title.textContent = video.title || 'DiamondGamer Video';
  openLink.href = video.url;
  frame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  document.body.classList.add('video-modal-open');
  modal.classList.add('visible');
}

function createCardElement(video, index) {
  const card = document.createElement('a');
  card.href = video.url;
  card.target = '_blank';
  card.rel = 'noopener';
  card.className = 'video-card';
  const loading = index < 5 ? 'eager' : 'lazy';
  const priority = index < 2 ? 'high' : 'auto';
  card.innerHTML = `<div class="img-container"><img src="${video.thumbnail}" alt="Showcase video" loading="${loading}" fetchpriority="${priority}" decoding="async"><span class="video-play-badge">▶</span></div>`;
  card.addEventListener('click', (event) => {
    event.preventDefault();
    openVideoEmbed(video);
  });
  return card;
}

if (track && carouselContainer) {
  const fragment = document.createDocumentFragment();
  videoData.forEach((video, index) => fragment.appendChild(createCardElement(video, index)));
  track.appendChild(fragment);

  const centerFirstCard = () => {
    const firstCard = track.querySelector('.video-card');
    if (!firstCard) return;
    carouselContainer.scrollLeft = Math.max(0, firstCard.offsetLeft - 12);
  };
  window.addEventListener('load', centerFirstCard, { passive: true });
}

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
if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

const revealElements = Array.from(document.querySelectorAll('.js-reveal, .center-header, .split-container, .full-container, .highlight-card, .contact-container, .media-shell'));
revealElements.forEach((el, index) => {
  el.classList.add('pre-reveal');
  el.style.setProperty('--reveal-delay', `${Math.min((index % 3) * 55, 110)}ms`);
});

function activateReveals() {
  revealElements.forEach((el) => el.classList.add('active'));
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.09, rootMargin: '0px 0px -42px 0px' });
  revealElements.forEach((el) => observer.observe(el));
} else {
  activateReveals();
}
window.setTimeout(activateReveals, 1300);

const sections = Array.from(document.querySelectorAll('section[id], div[id]')).filter((el) => ['about','showcase','networks','software','contact'].includes(el.id));
const navLinks = Array.from(document.querySelectorAll('.mobile-dock a, .bottom-nav a'));
function setActiveNav() {
  let current = 'about';
  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.45) current = section.id;
  }
  navLinks.forEach((link) => {
    const href = link.getAttribute('href') || '';
    link.classList.toggle('active', href === `#${current}`);
  });
}
window.addEventListener('scroll', () => window.requestAnimationFrame(setActiveNav), { passive: true });
window.addEventListener('load', setActiveNav, { passive: true });

function lockHorizontalScroll() {
  if (window.scrollX !== 0) window.scrollTo(0, window.scrollY);
  document.documentElement.scrollLeft = 0;
  document.body.scrollLeft = 0;
}
window.addEventListener('scroll', lockHorizontalScroll, { passive: true });
window.addEventListener('load', lockHorizontalScroll, { passive: true });

// v7 fallback: if the dock HTML is missing for any reason, create it.
(function () {
  if (document.querySelector('.mobile-dock')) return;
  const nav = document.createElement('nav');
  nav.className = 'mobile-dock';
  nav.setAttribute('aria-label', 'Mobile navigation');
  nav.innerHTML = '<div class="mobile-dock-inner"><a href="#about"><span>⌂</span><em>Home</em></a><a href="#showcase"><span>▶</span><em>Videos</em></a><a href="#networks"><span>◆</span><em>Servers</em></a><a href="#software"><span>▣</span><em>Projects</em></a><a href="#contact"><span>✉</span><em>Contact</em></a></div>';
  document.body.appendChild(nav);
})();
