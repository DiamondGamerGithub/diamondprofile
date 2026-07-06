// Compatibility loader: real mobile jitter helper lives in /javascript/mobile-jitter-fix.js
(() => {
  const script = document.createElement('script');
  script.src = 'javascript/mobile-jitter-fix.js?v=mobile-jitter-2';
  script.defer = true;
  document.head.appendChild(script);
})();
