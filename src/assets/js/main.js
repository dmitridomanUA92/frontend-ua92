console.log("HTMLemon JS loaded");
// grab the root once so future theme updates stay cheap
const root = document.documentElement;
(function () {
  var stored = localStorage.getItem("theme");
  var mq = window.matchMedia("(prefers-color-scheme: dark)");
  var initial = (stored === "dark" || stored === "light") ? stored : (mq.matches ? "dark" : "light");
  root.setAttribute("data-theme", initial);
})();
(function () {
  const toggle = document.getElementById('theme-toggle');
  const logo = document.querySelector('.site-logo');

  const systemPrefersDark = () =>
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  function currentTheme() {
    return localStorage.getItem('theme') || (systemPrefersDark() ? 'dark' : 'light');
  }

  // swap the logo source according to current theme
  function swapLogo(theme) {
    if (!logo) return;
    const light = logo.getAttribute('data-light-src');
    const dark = logo.getAttribute('data-dark-src');
    logo.src = theme === 'dark' && dark ? dark : light;
  }

  function applyTheme(theme) {
    const t = theme || currentTheme();
    root.dataset.theme = t;
    swapLogo(t);
    if (toggle) toggle.setAttribute('aria-pressed', String(t === 'dark'));
  }

  // init on load
  applyTheme();

  // Manual toggle
  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      applyTheme(next);
    });
  }

  // follow OS changes if the visitor hasn't explicitly chosen
  if (window.matchMedia) {
    mq.addEventListener?.('change', () => {
      if (!localStorage.getItem('theme')) applyTheme();
    });
  }
})();
