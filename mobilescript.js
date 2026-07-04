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

const topNav = document.getElementById('topNav');
const contactBtn = document.getElementById('contactBtn');
const toast = document.getElementById('notificationToast');
const backTop = document.getElementById('backTop');
const targetUsername = 'therealdiamondgamer';

function showToast(message, duration = 2100) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show-toast');
  window.setTimeout(() => toast.classList.remove('show-toast'), duration);
}

let lastKnownY = 0;
let ticking = false;
function updateScrollUI() {
  if (topNav) topNav.classList.toggle('is-scrolled', lastKnownY > 16);
  if (backTop) backTop.classList.toggle('show', lastKnownY > 520);
  ticking = false;
}
window.addEventListener('scroll', () => {
  lastKnownY = window.scrollY || 0;
  if (!ticking) {
    window.requestAnimationFrame(updateScrollUI);
    ticking = true;
  }
}, { passive: true });

if (backTop) backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

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

function createCardElement(video, index) {
  const card = document.createElement('a');
  card.href = video.url;
  card.target = '_blank';
  card.rel = 'noopener';
  card.className = 'video-card';
  const loading = index < 6 ? 'eager' : 'lazy';
  const priority = index < 2 ? 'high' : 'auto';
  card.innerHTML = `<div class="img-container"><img src="${video.thumbnail}" alt="Showcase video" loading="${loading}" fetchpriority="${priority}" decoding="async"></div>`;
  return card;
}

if (track && carouselContainer) {
  const repeatedVideos = [...videoData, ...videoData];
  const fragment = document.createDocumentFragment();
  repeatedVideos.forEach((video, index) => fragment.appendChild(createCardElement(video, index)));
  track.appendChild(fragment);

  const pause = () => carouselContainer.classList.add('is-paused');
  const resume = () => carouselContainer.classList.remove('is-paused');
  carouselContainer.addEventListener('touchstart', pause, { passive: true });
  carouselContainer.addEventListener('touchend', () => setTimeout(resume, 550), { passive: true });
  carouselContainer.addEventListener('touchcancel', resume, { passive: true });
  carouselContainer.addEventListener('pointerenter', pause);
  carouselContainer.addEventListener('pointerleave', resume);
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

function makeCollapsible(card) {
  if (!card || card.querySelector('.mobile-card-toggle')) return;
  card.classList.add('collapsible-card', 'is-collapsed');
  const title = card.querySelector('h2');
  const area = card.querySelector('.split-text, .full-container') || card;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'mobile-card-toggle';
  button.textContent = 'Tap to view details';
  button.setAttribute('aria-expanded', 'false');
  if (title) button.setAttribute('aria-label', `Toggle details for ${title.textContent.trim()}`);
  area.appendChild(button);
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    const expanded = !card.classList.toggle('is-collapsed');
    button.textContent = expanded ? 'Hide details' : 'Tap to view details';
    button.setAttribute('aria-expanded', String(expanded));
  });
}

document.querySelectorAll('#networks .split-container, #software .full-container').forEach(makeCollapsible);

const revealElements = Array.from(document.querySelectorAll('.js-reveal, .center-header, .quick-panel, .split-container, .full-container, .highlight-card, .contact-container'));
revealElements.forEach((el) => el.classList.add('pre-reveal'));
function activateReveals() { revealElements.forEach((el) => el.classList.add('active')); }
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -38px 0px' });
  revealElements.forEach((el) => observer.observe(el));
} else {
  activateReveals();
}
window.setTimeout(activateReveals, 1000);

const sections = Array.from(document.querySelectorAll('section[id], div[id]')).filter((el) => ['about','showcase','networks','software','contact'].includes(el.id));
const bottomLinks = Array.from(document.querySelectorAll('.bottom-nav a'));
const topLinks = Array.from(document.querySelectorAll('.nav-links a'));
function setActiveNav() {
  let current = 'about';
  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top < 190) current = section.id;
  }
  [...bottomLinks, ...topLinks].forEach((link) => {
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
