// Compatibility loader: real desktop JavaScript lives in /javascript/script.js
(() => {
  const script = document.createElement('script');
  script.src = 'javascript/script.js?v=clean-layout-4';
  script.defer = true;
  document.head.appendChild(script);
})();
