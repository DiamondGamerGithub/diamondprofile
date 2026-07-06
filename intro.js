// Compatibility loader: real intro JavaScript lives in /javascript/intro.js
(() => {
  const script = document.createElement('script');
  script.src = 'javascript/intro.js?v=intro-2';
  document.head.appendChild(script);
})();
