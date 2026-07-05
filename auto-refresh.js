(() => {
  const VERSION_URL = 'site-version.txt';
  const STORAGE_KEY = 'dg_deployed_site_version';
  const CHECK_DELAY = 2500;
  const CHECK_INTERVAL = 60000;

  function cleanVersion(text) {
    return String(text || '').trim();
  }

  function reloadWithCacheBust(version) {
    const url = new URL(window.location.href);
    url.searchParams.set('v', version.slice(0, 12) || String(Date.now()));
    window.location.replace(url.toString());
  }

  async function checkVersion() {
    try {
      const res = await fetch(`${VERSION_URL}?t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (!res.ok) return;

      const latestVersion = cleanVersion(await res.text());
      if (!latestVersion) return;

      const savedVersion = localStorage.getItem(STORAGE_KEY);
      if (!savedVersion) {
        localStorage.setItem(STORAGE_KEY, latestVersion);
        return;
      }

      if (savedVersion !== latestVersion) {
        localStorage.setItem(STORAGE_KEY, latestVersion);
        reloadWithCacheBust(latestVersion);
      }
    } catch (error) {
      // Ignore network/cache check errors. The site should still work normally.
    }
  }

  window.addEventListener('pageshow', () => {
    window.setTimeout(checkVersion, CHECK_DELAY);
    window.setInterval(checkVersion, CHECK_INTERVAL);
  }, { once: true });
})();
