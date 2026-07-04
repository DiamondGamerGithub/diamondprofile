(() => {
    const mobileQuery = window.matchMedia('(max-width: 900px)');

    const ensureMobileCss = () => {
        if (!mobileQuery.matches) return;

        const files = [
            'mobile-clean.css?v=2',
            'mobile-final.css?v=1'
        ];

        files.forEach((href) => {
            const fileName = href.split('?')[0];
            if (document.querySelector(`link[href*="${fileName}"]`)) return;
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
        });
    };

    ensureMobileCss();

    const lockHorizontalScroll = () => {
        if (!mobileQuery.matches) return;

        const doc = document.documentElement;
        const body = document.body;

        if (window.scrollX !== 0) {
            window.scrollTo(0, window.scrollY);
        }

        if (doc.scrollLeft !== 0) doc.scrollLeft = 0;
        if (body && body.scrollLeft !== 0) body.scrollLeft = 0;
    };

    let startX = 0;
    let startY = 0;

    window.addEventListener('scroll', lockHorizontalScroll, { passive: true });
    window.addEventListener('resize', () => {
        ensureMobileCss();
        lockHorizontalScroll();
    }, { passive: true });
    window.addEventListener('orientationchange', () => setTimeout(() => {
        ensureMobileCss();
        lockHorizontalScroll();
    }, 250), { passive: true });

    document.addEventListener('touchstart', (event) => {
        if (!mobileQuery.matches || !event.touches.length) return;
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchmove', (event) => {
        if (!mobileQuery.matches || !event.touches.length) return;

        const target = event.target;
        const insideScrollableNav = target && target.closest && target.closest('.nav-links');
        if (insideScrollableNav) return;

        const diffX = event.touches[0].clientX - startX;
        const diffY = event.touches[0].clientY - startY;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 8) {
            event.preventDefault();
            lockHorizontalScroll();
        }
    }, { passive: false });

    document.addEventListener('DOMContentLoaded', () => {
        ensureMobileCss();
        lockHorizontalScroll();
    });
    window.addEventListener('load', () => setTimeout(() => {
        ensureMobileCss();
        lockHorizontalScroll();
    }, 200), { passive: true });
})();
