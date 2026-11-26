/* =============================================================
   main.js  —  tab router

   The site shows one section at a time. Clicking a tab shows that
   section with a short directional slide, based on which way you moved
   along the tab bar (About → Research → Projects, left to right):
     - moving to a tab further right -> new content enters from the right
     - moving to a tab further left  -> enters from the left
   The current tab lives in the URL hash (#research), so it's
   deep-linkable and the back/forward buttons work.
   ============================================================= */

(function () {
  "use strict";

  // Build the sections from content/*.js before anything else.
  if (typeof window.renderSite === "function") window.renderSite();

  var nav = document.querySelector(".nav");
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  var order = links.map(function (a) { return a.dataset.route; });     // ["about","research","projects"]
  var panels = {};
  order.forEach(function (id) { panels[id] = document.getElementById(id); });

  var current = null;

  function syncStuckNav() {
    if (!nav) return;
    document.documentElement.style.setProperty("--nav-h", nav.offsetHeight + "px");
    var stuck = window.scrollY > 0 && nav.getBoundingClientRect().top <= 1;
    nav.classList.toggle("is-stuck", stuck);
  }

  function show(id, animate) {
    if (order.indexOf(id) === -1) id = order[0];

    var dir = null;
    if (animate && current !== null) {
      dir = order.indexOf(id) > order.indexOf(current) ? "from-right" : "from-left";
    }

    links.forEach(function (a) {
      if (a.dataset.route === id) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });

    var prevY = window.scrollY || window.pageYOffset || 0;

    order.forEach(function (pid) {
      panels[pid].classList.remove("is-active", "from-right", "from-left");
    });

    var active = panels[id];
    active.classList.add("is-active");
    if (dir) {
      void active.offsetWidth;        // restart the animation if repeating a direction
      active.classList.add(dir);
    }

    current = id;
    if (animate) window.scrollTo(0, prevY);
    syncStuckNav();
  }

  function routeFromHash() {
    var id = window.location.hash.replace(/^#/, "");
    return order.indexOf(id) === -1 ? order[0] : id;
  }

  // Click a tab: update the hash ourselves (preventing the native jump) and show it.
  links.forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var id = a.dataset.route;
      if (id === current) return;
      if (window.history.pushState) window.history.pushState(null, "", "#" + id);
      else window.location.hash = id;
      show(id, true);
    });
  });

  // Back / forward buttons + sticky nav state on scroll.
  window.addEventListener("popstate", function () { show(routeFromHash(), true); });
  window.addEventListener("scroll", syncStuckNav, { passive: true });
  window.addEventListener("resize", syncStuckNav, { passive: true });

  // Initial state (no animation on first paint).
  var start = routeFromHash();
  if (!window.location.hash) {
    var base = window.location.pathname + window.location.search;
    if (window.history.replaceState) window.history.replaceState(null, "", base + "#" + start);
  }
  show(start, false);

  // Enable transitions after the first paint.
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      document.body.classList.remove("preload");
    });
  });
})();
