/* =============================================================
   render.js  —  builds the sections from the data in content/*.js

   The sections in index.html are empty shells (#about, #research,
   #projects, #blog). This fills them, so content lives in the
   content/ files, never in the markup. Runs synchronously (the data
   files are plain scripts), so the page is complete before first paint.

   An item is rendered by the fields it has:
     - figure: ...   -> figure on the LEFT, details on the RIGHT   (publications)
     - aside:  ...   -> label on the LEFT,  details on the RIGHT   (projects)
     - otherwise     -> a simple stacked card                     (blog)
   ============================================================= */

(function () {
  "use strict";

  var C = window.CONTENT || {};

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function titleNode(it, cls) {
    var h = el("h3", cls);
    if (it.url) {
      var a = el("a", null, it.title);
      a.href = it.url;
      if (/^https?:/.test(it.url)) { a.target = "_blank"; a.rel = "noopener"; }
      h.appendChild(a);
    } else {
      h.innerHTML = it.title;
    }
    return h;
  }

  // About: a list of paragraphs (string, or { text, muted }).
  function renderAbout(data, root) {
    if (!root || !data) return;
    (data.paragraphs || []).forEach(function (p) {
      var isObj = p && typeof p === "object";
      root.appendChild(el("p", isObj && p.muted ? "muted" : null, isObj ? p.text : p));
    });
  }

  // figure-left publication row.
  function pubEntry(it) {
    var art = el("article", "entry entry--media");

    var media = el("div", "entry__media");
    var img = document.createElement("img");
    img.src = it.figure;
    img.alt = "";
    img.loading = "lazy";
    media.appendChild(img);
    art.appendChild(media);

    var body = el("div", "entry__body");
    body.appendChild(titleNode(it, "entry__title"));
    if (it.meta) body.appendChild(el("p", "entry__meta", it.meta));
    if (it.desc) body.appendChild(el("p", "entry__desc", it.desc));
    art.appendChild(body);

    return art;
  }

  // label-left project row.
  function projectEntry(it) {
    var art = el("article", "entry entry--aside");

    var aside = el("div", "entry__aside");
    aside.appendChild(el("p", "entry__aside-name", it.aside));

    // note line, with the award highlighted if present
    var noteLine = it.note || "";
    if (it.award) {
      noteLine += (noteLine ? " · " : "") + '<span class="win">' + it.award + "</span>";
    }
    if (noteLine) aside.appendChild(el("p", "entry__aside-note", noteLine));

    if (it.location) aside.appendChild(el("p", "entry__aside-loc", it.location));
    art.appendChild(aside);

    var body = el("div", "entry__body");
    body.appendChild(titleNode(it, "entry__title"));
    if (it.desc) body.appendChild(el("p", "entry__desc", it.desc));
    art.appendChild(body);

    return art;
  }

  // simple stacked card (blog).
  function simpleItem(it) {
    var art = el("article", "item");
    art.appendChild(titleNode(it, "item__title"));
    var meta = it.meta || it.date;
    if (meta) art.appendChild(el("p", "item__meta", meta));
    var body = it.desc || it.excerpt || it.body;
    if (body) art.appendChild(el("p", "item__desc", body));
    return art;
  }

  // A section: optional heading, a list of items, an optional trailing link.
  // `data` may be an array (no heading) or { heading, subtitle, items, link }.
  function renderSection(data, root) {
    if (!root || !data) return;

    var items = Array.isArray(data) ? data : (data.items || []);

    if (!Array.isArray(data) && data.heading) {
      var head = el("header", "section__head");
      head.appendChild(el("h2", "section__title", data.heading));
      if (data.subtitle) head.appendChild(el("p", "section__subtitle", data.subtitle));
      root.appendChild(head);
    }

    items.forEach(function (it) {
      if (it.figure)     root.appendChild(pubEntry(it));
      else if (it.aside) root.appendChild(projectEntry(it));
      else               root.appendChild(simpleItem(it));
    });

    if (!Array.isArray(data) && data.link && data.link.url) {
      var p = el("p", "section__link");
      var a = el("a", null, data.link.text + " →");
      a.href = data.link.url;
      if (/^https?:/.test(data.link.url)) { a.target = "_blank"; a.rel = "noopener"; }
      p.appendChild(a);
      root.appendChild(p);
    }
  }

  // Called by main.js before it measures the layout.
  window.renderSite = function () {
    renderAbout(C.about, document.getElementById("about"));
    renderSection(C.research, document.getElementById("research"));
    renderSection(C.projects, document.getElementById("projects"));
    // Blog is parked until there are articles to show.
    // renderSection(C.blog, document.getElementById("blog"));
  };
})();
