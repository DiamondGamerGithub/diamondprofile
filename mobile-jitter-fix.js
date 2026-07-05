(() => {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 760px) {
      html, body {
        overflow-x: hidden !important;
        overscroll-behavior-x: none !important;
        scroll-behavior: smooth;
      }

      .main-identity-card,
      .split-container,
      .full-container,
      .contact-container,
      .highlight-card,
      .contact-card,
      .media-shell,
      .mobile-dock-inner {
        transform: none !important;
        will-change: auto !important;
        backface-visibility: visible !important;
      }

      .pre-reveal {
        transform: translateY(14px) !important;
        filter: none !important;
        will-change: opacity, transform;
      }

      .pre-reveal.active {
        transform: none !important;
        will-change: auto !important;
      }

      .mobile-dock,
      .mobile-dock-inner {
        transform: none !important;
        contain: paint !important;
      }

      .carousel-track,
      .video-card {
        transform: none !important;
        will-change: auto !important;
      }
    }
  `;
  document.head.appendChild(style);

  const links = Array.from(document.querySelectorAll('.mobile-dock a, .bottom-nav a'));
  const sections = ['about', 'showcase', 'networks', 'software', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function markActive(id) {
    links.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      let best = null;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
      }
      if (best && best.target.id) markActive(best.target.id);
    }, { threshold: [0.2, 0.35, 0.5], rootMargin: '-22% 0px -54% 0px' });

    sections.forEach((section) => observer.observe(section));
  }
})();
