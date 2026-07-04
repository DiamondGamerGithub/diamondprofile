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
const targetUsername = 'therealdiamondgamer';

function showToast(message, duration = 2200) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show-toast');
  window.setTimeout(() => toast.classList.remove('show-toast'), duration);
}

if (topNav) {
  window.addEventListener('scroll', () => {
    topNav.classList.toggle('is-scrolled', window.scrollY > 18);
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
        button.textContent = 'Copied';
        showToast(`Copied ${copyValue}`);
        window.setTimeout(() => { button.textContent = originalText; }, 1800);
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
  const loading = index < videoData.length ? 'eager' : 'lazy';
  const priority = index < 3 ? 'high' : 'auto';
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
  carouselContainer.addEventListener('touchend', () => setTimeout(resume, 450), { passive: true });
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

const revealElements = Array.from(document.querySelectorAll('.js-reveal, .center-header, .split-container, .full-container, .highlight-card, .contact-container'));

function activateReveals() {
  revealElements.forEach((el) => el.classList.add('active'));
}

revealElements.forEach((el) => el.classList.add('pre-reveal'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -42px 0px' });
  revealElements.forEach((el) => observer.observe(el));
} else {
  activateReveals();
}

window.setTimeout(activateReveals, 1200);

function lockHorizontalScroll() {
  if (window.scrollX !== 0) window.scrollTo(0, window.scrollY);
  document.documentElement.scrollLeft = 0;
  document.body.scrollLeft = 0;
}
window.addEventListener('scroll', lockHorizontalScroll, { passive: true });
window.addEventListener('load', lockHorizontalScroll, { passive: true });
