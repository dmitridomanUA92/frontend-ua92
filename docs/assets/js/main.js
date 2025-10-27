console.log("HTMLemon JS loaded");
// parking a reference so I don't keep querying the root element
const root = document.documentElement;

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

function swapLogo(theme) {
  var logo = document.getElementById('site-logo');
  if (!logo) return;
  var lightSrc = logo.getAttribute('data-light');
  var darkSrc = logo.getAttribute('data-dark');
  if (lightSrc && darkSrc) {
    logo.src = theme === 'dark' ? darkSrc : lightSrc;
  }
}

function setAriaPressed() {
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.setAttribute("aria-pressed", String((root.getAttribute("data-theme") || "light") === "dark"));
}

function setToggleLabel() {
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;
  var theme = (root.getAttribute("data-theme") || "light");
  var next = theme === "dark" ? "light" : "dark";
  // Visible text label updates for sighted users
  btn.textContent = next === "dark" ? "Dark Mode" : "Light Mode";
  // Accessible label announces the action it will perform
  btn.setAttribute("aria-label", next === "dark" ? "Enable dark mode" : "Enable light mode");
}

function applyTheme(theme, persist) {
  // swapping theme tokens first so everything else can react
  root.setAttribute("data-theme", theme);
  swapLogo(theme);
  console.log("Theme switched to:", theme);
  if (persist) localStorage.setItem("theme", theme);
  setAriaPressed();
  setToggleLabel();
}

(function init() {
  // initialise once, then every listener reefs back into applyTheme
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    root.classList.add("reduced-motion");
  }
  var stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") {
    applyTheme(stored, false);
  } else {
    applyTheme(prefersDark.matches ? "dark" : "light", false);
  }

  var btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") || "light";
      var next = current === "dark" ? "light" : "dark";
      applyTheme(next, true);
    });
  }

  if (typeof prefersDark.addEventListener === "function") {
    prefersDark.addEventListener("change", function (e) {
      if (!localStorage.getItem("theme")) {
        applyTheme(e.matches ? "dark" : "light", false);
      }
    });
  } else if (typeof prefersDark.addListener === "function") {
    prefersDark.addListener(function (e) {
      if (!localStorage.getItem("theme")) {
        applyTheme(e.matches ? "dark" : "light", false);
      }
    });
  }

  swapLogo(root.getAttribute('data-theme') || 'light');
  setAriaPressed();
  setToggleLabel();
})();
