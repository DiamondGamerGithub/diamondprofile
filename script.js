(function () {
    const versionMeta = document.querySelector('meta[name="site-version"]');
    if (!versionMeta) return;

    const currentVersion = versionMeta.content;
    const storedVersion = localStorage.getItem('dg_site_version');
    if (storedVersion !== currentVersion) {
        localStorage.setItem('dg_site_version', currentVersion);
        if (storedVersion !== null) {
            location.reload();
        }
    }
})();

document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('dragstart', (e) => e.preventDefault());
document.addEventListener('selectstart', (e) => {
    if (!e.target.closest('input, textarea')) {
        e.preventDefault();
    }
});

document.addEventListener('keydown', (e) => {
    const key = e.key.toUpperCase();
    const code = e.code ? e.code.toUpperCase() : '';
    const blockCombo =
        key === 'F12' ||
        code === 'F12' ||
        (e.ctrlKey && e.shiftKey && (key === 'I' || key === 'J' || key === 'C' || key === 'K' || key === 'E')) ||
        (e.metaKey && e.altKey && (key === 'I' || key === 'J' || key === 'C' || key === 'K')) ||
        ((e.ctrlKey || e.metaKey) && (key === 'U' || key === 'S' || key === 'P'));

    if (blockCombo) {
        e.preventDefault();
        e.stopPropagation();
    }
}, true);

const topNav = document.getElementById('topNav');
const contactBtn = document.getElementById('contactBtn');
const toast = document.getElementById('notificationToast');
const targetUsername = 'therealdiamondgamer';

function showToast(message, duration = 2600) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show-toast');
    window.setTimeout(() => {
        toast.classList.remove('show-toast');
    }, duration);
}

if (topNav) {
    window.addEventListener('scroll', () => {
        topNav.classList.toggle('is-scrolled', window.scrollY > 24);
    }, { passive: true });
}

if (contactBtn) {
    contactBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(targetUsername).then(() => {
            showToast("Copied Diamond's Discord username");
        }).catch((err) => {
            console.error('Clipboard write rejected:', err);
            showToast('Could not copy username');
        });
    });
}

document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', () => {
        const copyValue = button.dataset.copy;
        const originalText = button.textContent;

        navigator.clipboard.writeText(copyValue).then(() => {
            button.textContent = 'IP Copied';
            showToast(`Copied ${copyValue}`, 2200);
            window.setTimeout(() => {
                button.textContent = originalText;
            }, 2200);
        }).catch((err) => {
            console.error('Copy failed:', err);
            showToast('Could not copy IP');
        });
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
    const loadingMode = window.matchMedia('(max-width: 900px)').matches ? 'eager' : 'lazy';
    const fetchMode = window.matchMedia('(max-width: 900px)').matches ? 'high' : 'auto';
    card.innerHTML = `<div class="img-container"><img src="${video.thumbnail}" alt="Showcase video" loading="${loadingMode}" fetchpriority="${fetchMode}" decoding="async"></div>`;
    return card;
}

if (track && carouselContainer) {
    const repeatedVideos = [...videoData, ...videoData, ...videoData, ...videoData];
    const fragment = document.createDocumentFragment();
    repeatedVideos.forEach((video) => fragment.appendChild(createCardElement(video)));
    track.appendChild(fragment);
}

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (prevBtn && track) {
    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -400, behavior: 'smooth' });
    });
}

if (nextBtn && track) {
    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: 400, behavior: 'smooth' });
    });
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

if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('visible')) {
        closeLightbox();
    }
});

const popSelectors = [
    '.center-header',
    '.hero-eyebrow',
    '.main-avatar',
    '.hero-stats .stat-pill',
    '.carousel-outer',
    '.split-img .media-shell',
    '.split-text',
    '.project-cta-wrap',
    '.img-grid-dual .media-shell',
    '.img-block-single .media-shell',
    '.highlight-card',
    '.contact-copy',
    '.contact-method'
];

const popTargets = Array.from(document.querySelectorAll(popSelectors.join(',')));
popTargets.forEach((el, index) => {
    if (!el.classList.contains('scroll-pop')) {
        el.classList.add('scroll-pop');
    }

    if (index % 3 === 0) el.classList.add('pop-left');
    if (index % 3 === 1) el.classList.add('pop-right');
    if (index % 3 === 2) el.classList.add('pop-zoom');

    const delay = Math.min((index % 3) * 35, 70);
    el.style.setProperty('--pop-delay', `${delay}ms`);
});

const revealElements = Array.from(document.querySelectorAll('.js-reveal, .scroll-pop'));

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
    }, { threshold: 0.08, rootMargin: '0px 0px -54px 0px' });

    revealElements.forEach((el) => {
        el.classList.add('pre-reveal');
        observer.observe(el);
    });
} else {
    activateReveals();
}

window.setTimeout(activateReveals, 2200);

const sparkField = document.getElementById('sparkField');
if (sparkField) {
    sparkField.textContent = '';
}
