(function () {
    const currentVersion = document.querySelector('meta[name="site-version"]').content;
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
const requestForm = document.getElementById('requestForm');
const requestStatus = document.getElementById('requestStatus');
const targetUsername = 'therealdiamondgamer';
const discordMention = '<@789933912171479120>';
const requestEndpoint = 'https://discord.com/api/webhooks/1521681066694414463/WI_MCzIHa8M32WokTS-qRgcDtwJauaAmpJs4pWpgGcEf_TXCQsGl_67QZ3esd7vXTtvA';

window.addEventListener('scroll', () => {
    topNav.classList.toggle('is-scrolled', window.scrollY > 24);
});

contactBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(targetUsername).then(() => {
        toast.classList.add('show-toast');
        setTimeout(() => toast.classList.remove('show-toast'), 3000);
    }).catch((err) => {
        console.error('Clipboard write rejected:', err);
    });
});

requestForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(requestForm);
    const payload = {
        name: formData.get('name').trim(),
        contact: formData.get('contact').trim(),
        requestType: formData.get('requestType'),
        details: formData.get('details').trim(),
        mention: discordMention,
        sentAt: new Date().toISOString()
    };

    try {
        requestStatus.textContent = 'Sending request...';
        requestStatus.className = 'form-status';

        const response = await fetch(requestEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: `${discordMention} New DiamondGamer request received.`,
                allowed_mentions: {
                    users: ['789933912171479120']
                },
                embeds: [
                    {
                        title: 'New Portfolio Request',
                        color: 4437377,
                        fields: [
                            { name: 'Name', value: payload.name || 'Not provided', inline: true },
                            { name: 'Contact', value: payload.contact || 'Not provided', inline: true },
                            { name: 'Request Type', value: payload.requestType || 'Not provided', inline: false },
                            { name: 'Details', value: payload.details.slice(0, 1000) || 'Not provided', inline: false }
                        ],
                        timestamp: payload.sentAt
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        requestForm.reset();
        requestStatus.textContent = 'Request sent. I will review it as soon as I can.';
        requestStatus.className = 'form-status success';
    } catch (error) {
        console.error('Request submission failed:', error);
        requestStatus.textContent = 'Request could not be sent. Please copy my Discord username and message me directly.';
        requestStatus.className = 'form-status error';
    }
});

document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', () => {
        const copyValue = button.dataset.copy;
        navigator.clipboard.writeText(copyValue).then(() => {
            const originalText = button.textContent;
            button.textContent = 'IP Copied';
            toast.textContent = `Copied ${copyValue}`;
            toast.classList.add('show-toast');

            setTimeout(() => {
                button.textContent = originalText;
                toast.classList.remove('show-toast');
                toast.textContent = "Copied Diamond's Discord username";
            }, 2200);
        }).catch((err) => {
            console.error('Copy failed:', err);
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

function createCardElement(video) {
    const card = document.createElement('a');
    card.href = video.url;
    card.target = '_blank';
    card.rel = 'noopener';
    card.className = 'video-card';
    card.innerHTML = `<div class="img-container"><img src="assets/${video.id}.jpg" alt="Showcase video"></div>`;
    return card;
}

function buildTrackItems() {
    videoData.forEach((video) => track.appendChild(createCardElement(video)));
    videoData.forEach((video) => track.appendChild(createCardElement(video)));
}

buildTrackItems();

let currentScrollX = 0;
let isHovered = false;
const scrollVelocity = 1.2;

function processLoopScroll() {
    if (!isHovered) {
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

const container = document.getElementById('carouselContainer');
container.addEventListener('mouseenter', () => { isHovered = true; });
container.addEventListener('mouseleave', () => { isHovered = false; });

document.getElementById('prevBtn').addEventListener('click', () => {
    track.scrollBy({ left: -400, behavior: 'smooth' });
});

document.getElementById('nextBtn').addEventListener('click', () => {
    track.scrollBy({ left: 400, behavior: 'smooth' });
});

const lightbox = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const clickImages = document.querySelectorAll('.clickable-img');
const closeBtn = document.getElementById('lightboxClose');

clickImages.forEach((img) => {
    img.addEventListener('click', () => {
        lightbox.classList.add('visible');
        lightboxImg.src = img.src;
    });
});

function closeLightbox() {
    lightbox.classList.remove('visible');
    lightboxImg.removeAttribute('src');
}

closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('visible')) {
        closeLightbox();
    }
});

const revealElements = document.querySelectorAll('.js-reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.01, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach((el) => {
    el.classList.add('pre-reveal');
    observer.observe(el);
});

window.addEventListener('load', () => {
    setTimeout(() => {
        revealElements.forEach((el) => el.classList.add('active'));
    }, 2500);
});

document.querySelectorAll('.tilt-card, .split-img img, .img-grid-dual img, .img-block-single img').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = ((x / rect.width) - 0.5) * 6;
        const rotateX = ((y / rect.height) - 0.5) * -6;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

const sparkField = document.getElementById('sparkField');
for (let i = 0; i < 22; i += 1) {
    const spark = document.createElement('span');
    spark.className = 'spark';
    spark.style.left = `${Math.random() * 100}%`;
    spark.style.top = `${Math.random() * 100}%`;
    spark.style.animationDelay = `${Math.random() * 8}s`;
    spark.style.animationDuration = `${6 + Math.random() * 8}s`;
    sparkField.appendChild(spark);
}
