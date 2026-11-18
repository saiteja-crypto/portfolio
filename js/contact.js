/* ==========================================================
   SAI TEJA — PORTFOLIO · contact.js
   Front-end validation for the contact form.
   There is NO backend. A valid submission opens a prefilled
   mailto draft; the visitor sends it from their own email app.
   ========================================================== */
(function () {
  "use strict";

  var form = document.getElementById("contactForm");
  if (!form) return;

  var TO_EMAIL = "sai.teja@mahindrauniversity.edu.in";
  var status = document.getElementById("formStatus");
  var fields = {
    name: form.elements["name"],
    email: form.elements["email"],
    message: form.elements["message"]
  };
  var errs = {
    name: "Please enter your name (at least 2 characters).",
    email: "Please enter a valid email address.",
    message: "Please write a message (at least 10 characters)."
  };

  function validate(key) {
    var f = fields[key];
    var v = f.value.trim();
    var ok;
    if (key === "name") ok = v.length >= 2;
    else if (key === "email") ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    else ok = v.length >= 10;
    f.classList.toggle("is-invalid", !ok);
    f.classList.toggle("is-valid", ok);
    f.setAttribute("aria-invalid", ok ? "false" : "true");
    f.parentElement.querySelector(".err").textContent = ok ? "" : errs[key];
    return ok;
  }

  // Validate when leaving a field and re-check live once it was marked invalid
  Object.keys(fields).forEach(function (k) {
    fields[k].addEventListener("blur", function () { if (fields[k].value !== "") validate(k); });
    fields[k].addEventListener("input", function () { if (fields[k].classList.contains("is-invalid")) validate(k); });
  });

  function showStatus(kind, html) {
    status.className = "form-status show " + kind;
    status.innerHTML = html;
    status.focus();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();                              // stay on the page
    var allOk = Object.keys(fields).map(validate).every(Boolean);

    if (!allOk) {
      showStatus("bad", "<strong>✕ Please fix the highlighted fields.</strong>");
      var firstBad = form.querySelector(".is-invalid");
      if (firstBad) firstBad.focus();
      return;
    }

    var name = fields.name.value.trim();
    var subject = encodeURIComponent("Portfolio message from " + name);
    var body = encodeURIComponent(fields.message.value.trim() + "\n\n— " + name + " (" + fields.email.value.trim() + ")");
    var mailto = "mailto:" + TO_EMAIL + "?subject=" + subject + "&body=" + body;
    var gmail = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(TO_EMAIL) + "&su=" + subject + "&body=" + body;
    var safeName = name.replace(/[<>&"]/g, "");

    showStatus("ok",
      "<strong>✓ Thanks, " + safeName + " — your message is ready.</strong><br>" +
      "Choose where to open it. Review and send the draft from your email account.<br>" +
      '<a class="btn-sharp btn-sharp--dark" href="' + gmail + '" target="_blank" rel="noopener">Compose in Gmail <span class="arr">↗</span></a> ' +
      '<a class="btn-sharp btn-sharp--ghost" href="' + mailto + '">Use default mail app <span class="arr">↗</span></a>');
  });
})();
