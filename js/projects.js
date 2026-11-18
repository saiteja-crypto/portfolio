/* ==========================================================
   SAI TEJA — PORTFOLIO · projects.js
   Work page: project filtering + Bootstrap case-study modal.
   Project facts are deliberately limited to verified portfolio details.
   ========================================================== */
(function () {
  "use strict";

  /* ---------- Project data (used to fill the modal) ---------- */
  var PROJECTS = {
    shopez: {
      title: "ShopEZ",
      category: "Web · MERN E-Commerce Application",
      context: "A full-stack e-commerce project completed as part of a MERN development internship.",
      objective: "Build a full-stack e-commerce platform with product management, user authentication and cloud image storage.",
      execution: "Built with the MERN stack during the SmartBridge Full Stack Development virtual internship: React.js front end, Node.js + Express.js REST back end, MongoDB database.",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
      features: ["User authentication", "Product management", "Cloud image storage", "Responsive React interface"],
      outcome: "Delivered a working full-stack application across the complete MERN workflow.",
      learnings: "REST API design, application state, authentication and database integration.",
      github: "https://github.com/Tejaak",
      demo: ""
    },
    syswatch: {
      title: "SysWatch",
      category: "Systems · Linux System Monitoring Tool",
      context: "A practical systems tool for understanding resource usage and system health on Linux.",
      objective: "Monitor CPU, memory, disk and overall system health on Linux and raise real-time alerts.",
      execution: "A Python-based monitoring tool that works with Linux system data, with Bash used for system-level scripting.",
      stack: ["Python", "Linux", "Bash"],
      features: ["CPU, memory and disk monitoring", "System health overview", "Real-time alerts", "Command-line reporting"],
      outcome: "Built a lightweight monitoring utility for local Linux systems.",
      learnings: "Linux internals, process monitoring, scripting and resource reporting.",
      github: "https://github.com/Tejaak",
      demo: ""
    },
    segmentation: {
      title: "Customer Segmentation",
      category: "AI / ML · Customer Insights",
      context: "An unsupervised learning exercise to identify useful customer groups from data.",
      objective: "Group customers using clustering to find business insights and improve targeting.",
      execution: "Data prepared with Pandas and NumPy, then clustered with Scikit-learn (notebook work, e.g. in Google Colab).",
      stack: ["Python", "Pandas", "NumPy", "Scikit-learn"],
      features: ["Data cleaning and preparation", "Clustering of customers into segments", "Insights for targeting", "Model-based segmentation"],
      outcome: "Produced customer groups that can support more focused business analysis.",
      learnings: "Unsupervised learning, feature scaling and interpreting clustering results.",
      github: "https://github.com/Tejaak",
      demo: ""
    },
    dashboard: {
      title: "Sales & Revenue Dashboard",
      category: "Data · Analytics with Power BI",
      context: "A data visualisation project for exploring sales and revenue patterns.",
      objective: "Create an interactive dashboard to analyse sales, revenue trends and key business metrics.",
      execution: "Data prepared in Excel and visualised in Power BI.",
      stack: ["Power BI", "Excel", "Data Visualization"],
      features: ["Interactive visuals", "Sales and revenue trends", "Key business metrics", "Dashboard filtering"],
      outcome: "Created an interactive analytical view of important business measures.",
      learnings: "Data modelling, dashboard design and storytelling with data.",
      github: "",
      demo: ""
    }
  };

  /* ---------- Helpers ---------- */
  function esc(s) {                       // escape text before putting it in innerHTML
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }
  function fmt(s) {                       // highlight [ADD ...] placeholders
    return esc(s).replace(/\[ADD[^\]]*\]/g, function (m) { return '<span class="placeholder">' + m + "</span>"; });
  }
  function cell(title, html, full) {
    return '<div class="case-cell' + (full ? " case-cell--full" : "") + '"><h4>' + title + "</h4>" + html + "</div>";
  }

  /* ---------- Modal ---------- */
  var modalEl = document.getElementById("projectModal");
  var modal = modalEl && window.bootstrap ? new bootstrap.Modal(modalEl) : null;
  var lastTrigger = null;

  function openProject(key, trigger) {
    var p = PROJECTS[key];
    if (!p || !modal) return;
    lastTrigger = trigger || null;
    document.getElementById("projectModalTitle").textContent = p.title;
    var feats = "<ul>" + p.features.map(function (f) { return "<li>" + fmt(f) + "</li>"; }).join("") + "</ul>";
    var tags = '<div class="d-flex flex-wrap gap-2">' + p.stack.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</div>";

    document.getElementById("projectModalBody").innerHTML =
      '<div class="case-grid">' +
      cell("Category", "<p>" + esc(p.category) + "</p>", true) +
      cell("Context", "<p>" + fmt(p.context) + "</p>") +
      cell("Objective", "<p>" + fmt(p.objective) + "</p>") +
      cell("Execution", "<p>" + fmt(p.execution) + "</p>") +
      cell("Tech stack", tags) +
      cell("Features", feats) +
      cell("Outcome", "<p>" + fmt(p.outcome) + "</p>") +
      cell("Learnings", "<p>" + fmt(p.learnings) + "</p>", true) +
      "</div>";

    var foot = document.getElementById("projectModalFoot");
    foot.innerHTML = "";
    var gh = document.createElement("a");
    gh.className = "btn-sharp btn-sharp--dark";
    gh.innerHTML = '<i class="bi bi-github"></i> GitHub <span class="arr">↗</span>';
    if (p.github) { gh.href = p.github; gh.target = "_blank"; gh.rel = "noopener"; }
    else { gh.setAttribute("aria-disabled", "true"); gh.innerHTML = "Repository unavailable"; gh.style.opacity = ".5"; }
    var demo = document.createElement("a");
    demo.className = "btn-sharp btn-sharp--ghost";
    if (p.demo) { demo.href = p.demo; demo.target = "_blank"; demo.rel = "noopener"; demo.innerHTML = 'Live demo <span class="arr">↗</span>'; }
    else { demo.setAttribute("aria-disabled", "true"); demo.innerHTML = "Demo unavailable"; demo.style.opacity = ".5"; }
    foot.appendChild(gh);
    foot.appendChild(demo);

    modal.show();
    if (history.replaceState) history.replaceState(null, "", "#project-" + key);
  }

  document.querySelectorAll("[data-project]").forEach(function (card) {
    card.addEventListener("click", function () { openProject(card.getAttribute("data-project"), card); });
  });
  if (modalEl) {
    modalEl.addEventListener("hidden.bs.modal", function () {
      if (history.replaceState) history.replaceState(null, "", location.pathname);
      if (lastTrigger) lastTrigger.focus();
    });
  }

  /* ---------- Achievement and credential details ---------- */
  var CREDENTIALS = {
    iqoo: {
      title: "iQOO Hackathon 2026",
      details: "Portfolio-listed achievement: participated as team lead of team Delulu. Add an event page, result, or certificate link when available."
    },
    sih: {
      title: "Smart India Hackathon 2026",
      details: "Portfolio-listed achievement: selected problem statement; participation is marked as in progress. Add the official selection or result source when available."
    },
    projects: {
      title: "Projects across four domains",
      details: "The portfolio showcases work in web development, Linux systems, machine learning, and data analytics. Open the Work page to explore the project details."
    },
    internship: {
      title: "Full Stack Development (MERN)",
      details: "Listed on this portfolio as a SmartBridge and AICTE internship completed in 2026. A certificate file or public verification URL has not been provided here; use the LinkedIn profile link to check for published credentials."
    }
  };
  var credentialModalEl = document.getElementById("credentialModal");
  var credentialModal = credentialModalEl && window.bootstrap
    ? new bootstrap.Modal(credentialModalEl)
    : null;
  var credentialTitle = document.getElementById("credentialModalTitle");
  var credentialBody = document.getElementById("credentialModalBody");
  var lastCredentialTrigger = null;

  document.querySelectorAll("[data-credential]").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var credential = CREDENTIALS[trigger.getAttribute("data-credential")];
      if (!credential || !credentialModal) return;
      lastCredentialTrigger = trigger;
      credentialTitle.textContent = credential.title;
      credentialBody.textContent = credential.details;
      credentialModal.show();
    });
  });
  if (credentialModalEl) {
    credentialModalEl.addEventListener("hidden.bs.modal", function () {
      if (lastCredentialTrigger) lastCredentialTrigger.focus();
    });
  }

  // Deep link from the Home page: work.html#project-shopez opens that case study
  var m = location.hash.match(/^#project-(\w+)$/);
  if (m && PROJECTS[m[1]]) {
    var grid = document.getElementById("projects");
    if (grid) grid.scrollIntoView();
    setTimeout(function () { openProject(m[1], document.querySelector('[data-project="' + m[1] + '"]')); }, 500);
  }

  /* ---------- Filtering ---------- */
  var buttons = document.querySelectorAll(".filter-btn");
  var cards = document.querySelectorAll(".proj-card[data-cat]");
  var emptyNote = document.getElementById("emptyNote");

  function applyFilter(cat) {
    var shown = 0;
    cards.forEach(function (card) {
      var match = cat === "all" || card.getAttribute("data-cat") === cat;
      if (match) {
        shown++;
        card.classList.remove("is-gone");
        // next frame: remove is-hidden so the CSS transition animates it back in
        requestAnimationFrame(function () { requestAnimationFrame(function () { card.classList.remove("is-hidden"); }); });
      } else {
        card.classList.add("is-hidden");                    // fade + shrink
        setTimeout(function () {                            // then take it out of the layout
          if (card.classList.contains("is-hidden")) card.classList.add("is-gone");
        }, 400);
      }
    });
    if (emptyNote) emptyNote.classList.toggle("show", shown === 0);
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) { b.classList.remove("active"); b.setAttribute("aria-pressed", "false"); });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      applyFilter(btn.getAttribute("data-filter"));
    });
  });
})();
