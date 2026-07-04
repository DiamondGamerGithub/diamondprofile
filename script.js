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
    let navTicking = false;
    window.addEventListener('scroll', () => {
        if (navTicking) return;
        navTicking = true;
        window.requestAnimationFrame(() => {
            topNav.classList.toggle('is-scrolled', window.scrollY > 24);
            navTicking = false;
        });
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
            padding: 28px;
            background: rgba(4, 2, 10, 0.82);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
        }
        .video-embed-modal.visible { display: flex; }
        .video-embed-card {
            width: min(1040px, 94vw);
            overflow: hidden;
            border: 1px solid rgba(147, 197, 253, 0.28);
            border-radius: 28px;
            background: #080512;
            box-shadow: 0 34px 120px rgba(0, 0, 0, 0.62), 0 0 60px rgba(56, 189, 248, 0.16);
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
        .video-embed-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
            padding: 20px 24px 24px;
            background: linear-gradient(180deg, rgba(20, 8, 34, 0.96), rgba(8, 3, 15, 0.98));
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
            display: flex;
            gap: 10px;
            flex: 0 0 auto;
        }
        .video-embed-actions a,
        .video-embed-actions button,
        .video-embed-close {
            border: 1px solid rgba(147, 197, 253, 0.26);
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.08);
            color: #faf7ff;
            text-decoration: none;
            font-weight: 900;
            cursor: pointer;
        }
        .video-embed-actions a,
        .video-embed-actions button {
            min-height: 44px;
            padding: 0 18px;
        }
        .video-embed-close {
            position: absolute;
            top: 18px;
            right: 18px;
            z-index: 2;
            width: 46px;
            height: 46px;
            font-size: 1.35rem;
            background: rgba(0, 0, 0, 0.56);
        }
        body.video-modal-open { overflow: hidden; }
        @media (max-width: 720px) {
            .video-embed-modal { padding: 12px; }
            .video-embed-card { width: 100%; border-radius: 22px; }
            .video-embed-info { align-items: flex-start; flex-direction: column; padding: 18px; }
            .video-embed-actions { width: 100%; }
            .video-embed-actions a,
            .video-embed-actions button { flex: 1; }
        }
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

    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeVideo();
    });
    modal.querySelector('.video-embed-close').addEventListener('click', closeVideo);
    modal.querySelector('#videoEmbedDone').addEventListener('click', closeVideo);
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
    const title = modal.querySelector('#videoEmbedTitle');
    const openLink = modal.querySelector('#videoEmbedOpen');

    title.textContent = video.title || 'DiamondGamer Video';
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
    card.innerHTML = `<div class="img-container"><img src="${video.thumbnail}" alt="Showcase video" loading="lazy" decoding="async"><span class="video-play-badge">▶</span></div>`;
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
