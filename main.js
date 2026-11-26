/* ==========================================================================
   NK7 GAME — JavaScript
   Mobile nav, back-to-top, smooth scroll, download button, year
   ========================================================================== */

(function () {
  "use strict";

  // ---------- Dynamic Footer Year ----------
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // ---------- Mobile Navigation ----------
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  function closeMobileMenu() {
    if (navLinks && navToggle) {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    }
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = navLinks.classList.contains("open");
      navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("click", function (e) {
      if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navLinks.classList.contains("open")) {
        closeMobileMenu();
        navToggle.focus();
      }
    });
  }

  // ---------- Smooth Scroll for Anchor Links ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        closeMobileMenu();
      }
    });
  });

  // ---------- Back to Top Button ----------
  const toTopBtn = document.getElementById("toTop");

  if (toTopBtn) {
    function toggleBackToTop() {
      if (window.scrollY > 300) {
        toTopBtn.classList.add("visible");
        toTopBtn.removeAttribute("hidden");
      } else {
        toTopBtn.classList.remove("visible");
        toTopBtn.setAttribute("hidden", "");
      }
    }

    window.addEventListener("scroll", toggleBackToTop, { passive: true });
    toggleBackToTop();

    toTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ---------- Download Button Behavior ----------
  const downloadBtn = document.getElementById("downloadBtn");

  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
      const announcement = document.createElement("div");
      announcement.setAttribute("aria-live", "polite");
      announcement.className = "sr-only";
      announcement.textContent = "Redirecting to NK7 GAME official download page.";
      document.body.appendChild(announcement);
      setTimeout(function () {
        if (announcement.parentNode) {
          announcement.parentNode.removeChild(announcement);
        }
      }, 5000);
    });
  }
})();
