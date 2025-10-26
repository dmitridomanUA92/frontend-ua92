console.log("HTMLemon JS loaded");
const root = document.documentElement;
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

function setAriaPressed() {
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.setAttribute("aria-pressed", String((root.getAttribute("data-theme") || "light") === "dark"));
}

function applyTheme(theme, persist) {
  root.setAttribute("data-theme", theme);
  console.log("Theme switched to:", theme);
  if (persist) localStorage.setItem("theme", theme);
  setAriaPressed();
}

(function init() {
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

  setAriaPressed();
})();