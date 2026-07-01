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

document.addEventListener('keydown', (e) => {
    const key = e.key.toUpperCase();
    const blockCombo =
        key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (key === 'I' || key === 'J' || key === 'C')) ||
        (e.ctrlKey && key === 'U');

    if (blockCombo) {
        e.preventDefault();
    }
});

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
    { id: 12, url: 'https://www.youtube.com/watch?v=eVD_6Ba-6H0&t=19s' },
    { id: 13, url: 'https://www.youtube.com/watch?v=9TbpAUYDlF0' },
    { id: 14, url: 'https://www.youtube.com/watch?v=ilI5kEstT0U&t=74s' },
    { id: 15, url: 'https://www.youtube.com/watch?v=annIbh_LzV8&t=79s' },
    { id: 16, url: 'https://www.youtube.com/watch?v=fYvbSPDSkzU&t=1s' },
    { id: 17, url: 'https://www.youtube.com/watch?v=Ifi3jRmmoBU&t=7s' },
    { id: 18, url: 'https://www.youtube.com/watch?v=VYxT66QTyLs&t=16s' },
    { id: 19, url: 'https://www.youtube.com/watch?v=Jecjk4XiRaM&t=65s' },
    { id: 20, url: 'https://www.youtube.com/watch?v=pbGes3V8-Eo' }
];

const track = document.getElementById('carouselTrack');
const carouselContainer = document.getElementById('carouselContainer');

function createCardElement(video) {
    const card = document.createElement('a');
    card.href = video.url;
    card.target = '_blank';
    card.rel = 'noopener';
    card.className = 'video-card';
    card.innerHTML = `<div class="img-container"><img src="assets/${video.id}.jpg" alt="Showcase video" loading="lazy" decoding="async"></div>`;
    return card;
}

if (track && carouselContainer) {
    videoData.forEach((video) => track.appendChild(createCardElement(video)));
    videoData.forEach((video) => track.appendChild(createCardElement(video)));

    let currentScrollX = 0;
    let isHovered = false;
    const scrollVelocity = 1.2;

    function processLoopScroll() {
        if (!isHovered && track.scrollWidth > 0) {
            currentScrollX += scrollVelocity;
            const maxHalfwayPoint = track.scrollWidth / 2;
            if (currentScrollX >= maxHalfwayPoint) {
                currentScrollX = 0;
            }
            track.scrollLeft = currentScrollX;
        } else {
            currentScrollX = track.scrollLeft;
        }

        requestAnimationFrame(processLoopScroll);
    }

    requestAnimationFrame(processLoopScroll);
    carouselContainer.addEventListener('mouseenter', () => { isHovered = true; });
    carouselContainer.addEventListener('mouseleave', () => { isHovered = false; });
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

const revealElements = document.querySelectorAll('.js-reveal');

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
    }, { threshold: 0.01, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach((el) => {
        el.classList.add('pre-reveal');
        observer.observe(el);
    });
} else {
    activateReveals();
}

window.setTimeout(activateReveals, 1800);

document.querySelectorAll('.tilt-card').forEach((card) => {
    let ticking = false;

    card.addEventListener('mousemove', (e) => {
        if (ticking) return;
        ticking = true;

        window.requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateY = ((x / rect.width) - 0.5) * 3;
            const rotateX = ((y / rect.height) - 0.5) * -3;

            card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
            ticking = false;
        });
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

const sparkField = document.getElementById('sparkField');
if (sparkField && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    for (let i = 0; i < 16; i += 1) {
        const spark = document.createElement('span');
        spark.className = 'spark';
        spark.style.left = `${Math.random() * 100}%`;
        spark.style.top = `${Math.random() * 100}%`;
        spark.style.animationDelay = `${Math.random() * 8}s`;
        spark.style.animationDuration = `${7 + Math.random() * 9}s`;
        sparkField.appendChild(spark);
    }
}
