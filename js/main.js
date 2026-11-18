/* ==========================================================
   SAI TEJA — PORTFOLIO · main.js
   Shared on every page. Vanilla JavaScript, no frameworks.
   1. Splash screen      5. Scroll reveal (IntersectionObserver)
   2. Page transitions   6. Counter animation
   3. Full-screen menu   7. Custom cursor + magnetic buttons
   4. Active nav link    8. Skill tiles / timeline / copy buttons
   ========================================================== */
(function () {
  "use strict";

  var progress = document.createElement("div");
  progress.className = "scroll-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.appendChild(progress);

  function updateScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var amount = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.setProperty("--scroll-progress", amount + "%");
    progress.style.width = amount + "%";
    document.querySelector(".site-header").classList.toggle("scrolled", window.scrollY > 24);
  }
  updateScroll();
  window.addEventListener("scroll", updateScroll, { passive: true });

  /* ---------- Premium micro-interactions ---------- */
  if (!isTouch && !reduceMotion) {
    document.querySelectorAll(".proj-card").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - .5;
        var y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = "perspective(900px) rotateY(" + (x * 3) + "deg) rotateX(" + (y * -3) + "deg)";
      });
      card.addEventListener("mouseleave", function () { card.style.transform = ""; });
    });

    var photo = document.querySelector(".photo-frame");
    if (photo) {
      document.querySelector(".hero__photo").addEventListener("mousemove", function (e) {
        var r = e.currentTarget.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - .5;
        var y = (e.clientY - r.top) / r.height - .5;
        photo.style.transform = "translate(" + (x * 8) + "px," + (y * 8) + "px)";
      });
      document.querySelector(".hero__photo").addEventListener("mouseleave", function () { photo.style.transform = ""; });
    }

    document.querySelectorAll(".skill-tile").forEach(function (tile, i) {
      tile.setAttribute("data-index", String(i + 1).padStart(2, "0"));
    });
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  var body = document.body;

  /* ---------- 1. SPLASH / INTRO ANIMATION ---------- */
  var splash = document.getElementById("splash");

  function endSplash() {
    if (!splash || splash.classList.contains("gone")) return;
    splash.classList.add("leaving");          // black panels rise (grid reveal)
    setTimeout(function () {
      splash.classList.add("gone");           // whole splash slides up
      body.classList.remove("splash-active");
      try { sessionStorage.setItem("splashSeen", "1"); } catch (e) { /* storage blocked: ignore */ }
      setTimeout(function () { splash.classList.add("removed"); }, 650);
    }, 520);
  }

  function runSplash() {
    var hi = document.getElementById("splashHi");
    var fill = document.getElementById("splashFill");
    var pct = document.getElementById("splashPct");
    var welcome = document.getElementById("splashWelcome");
    var status = document.getElementById("splashStatus");
    var full = "HI, I'M SAI TEJA";
    var i = 0;

    body.classList.add("splash-active");
    splash.addEventListener("click", endSplash);   // click anywhere = skip
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" || e.key === "Enter") endSplash();
    });

    // Typewriter: reveal one character at a time with a blinking cursor
    function type() {
      i++;
      hi.firstChild.nodeValue = full.slice(0, i);
      var p = Math.round((i / full.length) * 100);
      fill.style.width = p + "%";
      pct.textContent = p + "%";
      if (i < full.length) {
        setTimeout(type, 85);
      } else {
        status.textContent = "> PORTFOLIO READY";
        welcome.classList.add("show");
        setTimeout(endSplash, 900);
      }
    }
    setTimeout(type, 700);   // short pause for the grid lines to draw
  }

  if (splash) {
    var seen = false;
    try { seen = sessionStorage.getItem("splashSeen") === "1"; } catch (e) { /* ignore */ }
    if (seen || reduceMotion) {
      splash.classList.add("removed");           // only show once per visit
    } else {
      runSplash();
    }
  }

  /* ---------- 2. PAGE TRANSITIONS ---------- */
  var overlay = document.getElementById("pageTransition");
  var inFrame = false;
  try { inFrame = window.self !== window.top; } catch (e) { inFrame = true; }
  // Skip the fancy transition inside iframes/previews: plain links work everywhere
  if (overlay && !reduceMotion && !inFrame) {
    // Arriving from another page: the cover is already showing (see inline script in <head>);
    // removing the class lets it slide away.
    window.addEventListener("pageshow", function () {
      document.documentElement.classList.remove("page-enter");
      overlay.classList.remove("in");
    });
    document.addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
      var href = a.getAttribute("href");
      if (!href || href.charAt(0) === "#" || a.target === "_blank" || /^(mailto:|tel:|https?:)/.test(href)) return;
      if (!/\.html(#.*)?$/.test(href)) return;
      var path = href.split("#")[0];
      if (path === location.pathname.split("/").pop()) return;   // same page: let the browser scroll
      e.preventDefault();
      try { sessionStorage.setItem("navT", "1"); } catch (err) { /* ignore */ }
      overlay.classList.add("in");                               // cover slides up
      setTimeout(function () { window.location.href = href; }, 450);
      // Safety net: if navigation is blocked for any reason, never leave the cover stuck
      setTimeout(function () { overlay.classList.remove("in"); }, 2500);
    });
  }

  /* ---------- 3. FULL-SCREEN MENU ---------- */
  var menu = document.getElementById("menuOverlay");
  var openBtn = document.getElementById("menuOpen");
  var closeBtn = document.getElementById("menuClose");

  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle("open", open);
    menu.setAttribute("aria-hidden", open ? "false" : "true");
    openBtn.setAttribute("aria-expanded", open ? "true" : "false");
    body.style.overflow = open ? "hidden" : "";
    if (open) { closeBtn.focus(); } else { openBtn.focus(); }
  }
  if (menu && openBtn && closeBtn) {
    openBtn.addEventListener("click", function () { setMenu(true); });
    closeBtn.addEventListener("click", function () { setMenu(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) setMenu(false);
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { menu.classList.remove("open"); body.style.overflow = ""; });
    });
    // Basic focus trap inside the open menu
    menu.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var f = menu.querySelectorAll("a, button");
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ---------- 4. ACTIVE NAV LINK ---------- */
  var current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach(function (a) {
    var match = a.getAttribute("href").split("#")[0] === current;
    a.classList.toggle("active", match);
    if (match) a.setAttribute("aria-current", "page");
  });

  /* ---------- 5. SCROLL REVEAL ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in-view"); obs.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---------- 6. COUNTER ANIMATION ---------- */
  var counters = document.querySelectorAll("[data-count]");
  function runCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var pad = parseInt(el.getAttribute("data-pad") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1200, start = null;
    function fmt(n) { var s = String(n); while (s.length < pad) s = "0" + s; return s; }
    function tick(ts) {
      if (start === null) start = ts;
      var t = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      el.firstChild.nodeValue = fmt(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(tick);
    }
    if (reduceMotion) { el.firstChild.nodeValue = fmt(target); return; }
    requestAnimationFrame(tick);
  }
  if ("IntersectionObserver" in window) {
    var cObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) { if (en.isIntersecting) { runCounter(en.target); obs.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cObs.observe(c); });
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- 7. CUSTOM CURSOR + MAGNETIC BUTTONS ---------- */
  if (!isTouch && !reduceMotion) {
    var ring = document.getElementById("cursorRing");
    var dot = document.getElementById("cursorDot");
    var mx = 0, my = 0, rx = 0, ry = 0;
    if (ring && dot) {
      document.addEventListener("mousemove", function (e) {
        mx = e.clientX; my = e.clientY;
        body.classList.add("has-cursor");
        dot.style.transform = "translate(" + mx + "px," + my + "px)";
      });
      document.addEventListener("mouseleave", function () { body.classList.remove("has-cursor"); });
      (function loop() {               // the ring eases toward the pointer
        rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
        ring.style.transform = "translate(" + rx + "px," + ry + "px)";
        requestAnimationFrame(loop);
      })();
      document.addEventListener("mouseover", function (e) {
        body.classList.toggle("cursor-hover", !!e.target.closest("a, button, .skill-tile, .tile-b, input, textarea"));
      });
    }

    // Magnetic buttons: translate a few pixels toward the cursor
    document.querySelectorAll(".magnetic").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - (r.left + r.width / 2)) * 0.2;
        var y = (e.clientY - (r.top + r.height / 2)) * 0.3;
        el.style.transform = "translate(" + x + "px," + y + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  /* ---------- 8a. SKILL TILES: keyboard-focusable (hover rules also fire on focus) ---------- */
  document.querySelectorAll(".skill-tile").forEach(function (t) { t.setAttribute("tabindex", "0"); });

  /* ---------- 8b. TIMELINE: click to expand ---------- */
  document.querySelectorAll(".t-head").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".t-item");
      var open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* ---------- 8c. COPY BUTTONS (contact page) ---------- */
  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      var done = function () {
        var old = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check2"></i>';
        setTimeout(function () { btn.innerHTML = old; }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {});
      }
    });
  });
})();
