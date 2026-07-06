// Compatibility loader: real mobile JavaScript lives in /javascript/mobile.js
(() => {
  const script = document.createElement('script');
  script.src = 'javascript/mobile.js?v=app-mobile-9';
  script.defer = true;
  document.head.appendChild(script);
})();
