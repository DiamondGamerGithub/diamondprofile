(() => {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 760px) {
      html,
      body {
        overflow-x: hidden !important;
        overscroll-behavior-x: none !important;
      }

      .pre-reveal,
      .pre-reveal.active,
      .js-reveal,
      .js-reveal.active,
      .scroll-pop,
      .scroll-pop.active,
      .smooth-reveal,
      .smooth-reveal.revealed,
      .main-identity-card,
      .split-container,
      .full-container,
      .contact-container,
      .highlight-card,
      .contact-card,
      .media-shell,
      .mobile-dock,
      .mobile-dock-inner,
      .carousel-track,
      .video-card {
        opacity: 1 !important;
        transform: none !important;
        filter: none !important;
        animation: none !important;
        transition-property: background-color, border-color, color, box-shadow !important;
        transition-duration: .18s !important;
        will-change: auto !important;
        backface-visibility: visible !important;
      }

      .mobile-dock,
      .mobile-dock-inner {
        contain: paint !important;
      }
    }
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.pre-reveal, .js-reveal, .scroll-pop, .smooth-reveal').forEach((el) => {
    el.classList.add('active', 'revealed');
    el.style.removeProperty('transform');
    el.style.removeProperty('filter');
    el.style.removeProperty('opacity');
    el.style.removeProperty('will-change');
  });

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
