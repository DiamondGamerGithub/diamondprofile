(() => {
    const mobileQuery = window.matchMedia('(max-width: 900px)');

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
    window.addEventListener('resize', lockHorizontalScroll, { passive: true });
    window.addEventListener('orientationchange', () => setTimeout(lockHorizontalScroll, 250), { passive: true });

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

    document.addEventListener('DOMContentLoaded', lockHorizontalScroll);
    window.addEventListener('load', () => setTimeout(lockHorizontalScroll, 200), { passive: true });
})();
