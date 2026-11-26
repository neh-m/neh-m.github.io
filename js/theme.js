/* =============================================================
   theme.js  —  light / dark theme toggle (bottom-left button)

   Default: follows the OS (prefers-color-scheme) when the viewer
   hasn't chosen. Clicking the toggle sets an explicit theme on
   <html data-theme> and remembers it in localStorage. A tiny inline
   script in <head> applies the saved choice before first paint to
   avoid a flash — this file only wires up the button and the icon.
   ============================================================= */

(function () {
  "use strict";

  var root = document.documentElement;
  var btn = document.querySelector(".theme-toggle");
  if (!btn) return;

  var mq = window.matchMedia("(prefers-color-scheme: dark)");

  function effective() {
    var t = root.getAttribute("data-theme");
    if (t === "dark" || t === "light") return t;
    return mq.matches ? "dark" : "light";
  }

  // Reflect the current theme on the icon and the button label.
  function sync() {
    var isDark = effective() === "dark";
    root.classList.toggle("theme-is-dark", isDark);
    btn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    btn.setAttribute("title", isDark ? "Switch to light theme" : "Switch to dark theme");
  }

  btn.addEventListener("click", function () {
    var next = effective() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    sync();
  });

  // Follow the OS if the viewer hasn't made an explicit choice.
  if (mq.addEventListener) mq.addEventListener("change", sync);

  sync();
})();
