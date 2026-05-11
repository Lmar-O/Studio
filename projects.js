// Central project list. Add a new project by appending an entry here,
// then create the matching HTML file under /projects/.
//
// Naming convention: keep `title` to ~2–3 words / ~20 characters so the
// dropdown stays clean. Use the project page hero for the longer story.
window.PROJECTS = [
  {
    id: "tokyo-streets",
    title: "Tokyo",
    date: "2024",
    blurb: "Alleys, neon, the slow walks",
    url: "/projects/tokyo-streets.html"
  }
  // { id: "gt3-mr", title: "Mr. GT3",       date: "2025", blurb: "A Sunday at the lookout", url: "/projects/gt3-mr.html" },
  // { id: "pacifica", title: "Pacifica",    date: "2024", blurb: "Coastline series",        url: "/projects/pacifica.html" },
];

// Populates any <ul id="projectsDropdownList"> or <ul data-projects-dropdown> on the page.
// Also marks the current page's link with .is-current.
// Exposed as window.renderProjectsDropdown so React can call it after mount.
(function () {
  function render() {
    var lists = document.querySelectorAll('[data-projects-dropdown], #projectsDropdownList');
    if (!lists.length) return;

    var here = window.location.pathname.replace(/\/$/, '');

    lists.forEach(function (list) {
      list.innerHTML = window.PROJECTS.map(function (p) {
        var path = p.url.replace(/\/$/, '');
        var isCurrent = (here === path);
        return (
          '<li class="proj-drop-item' + (isCurrent ? ' is-current' : '') + '">' +
            '<a href="' + p.url + '">' +
              '<span class="proj-drop-title">' + p.title + '</span>' +
            '</a>' +
          '</li>'
        );
      }).join('') + (window.PROJECTS.length === 0
        ? '<li class="proj-drop-empty">No projects yet — check back soon.</li>'
        : '');
    });

    // Mobile menu list (separate target)
    var mobLists = document.querySelectorAll('[data-projects-mobile]');
    mobLists.forEach(function (list) {
      if (window.PROJECTS.length === 0) {
        list.innerHTML = '<li class="m-projects-empty">No projects yet</li>';
        return;
      }
      list.innerHTML = window.PROJECTS.map(function (p) {
        return '<li><a href="' + p.url + '">' + p.title + '</a></li>';
      }).join('');
    });
  }

  // Mobile menu wiring — toggle, accordion, close on link click & Escape.
  function initMobileMenu() {
    var toggle = document.querySelector('.menu-toggle');
    var menu = document.querySelector('.mobile-menu');
    if (!toggle || !menu || toggle.dataset.bound) return;
    toggle.dataset.bound = '1';

    function setOpen(open) {
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    toggle.addEventListener('click', function () {
      setOpen(!document.body.classList.contains('menu-open'));
    });

    menu.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (link) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) setOpen(false);
    });

    var pBtn = menu.querySelector('.m-projects-toggle');
    var pList = menu.querySelector('.m-projects');
    if (pBtn && pList) {
      pBtn.addEventListener('click', function () {
        var open = pList.classList.toggle('is-open');
        pBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
  }
  window.initMobileMenu = initMobileMenu;

  // Scroll-triggered reveal animations.
  // Add class="reveal" to any element you want to fade-up on scroll.
  // Optional stagger via reveal-d1..reveal-d5 (delays 80ms..400ms).
  function initReveals() {
    if (typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    if (window.__revealObserver) window.__revealObserver.disconnect();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    window.__revealObserver = io;
    var observe = function () {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach(function (el) { io.observe(el); });
    };
    observe();
    setTimeout(observe, 500); // pick up late-mounted nodes
  }
  window.initReveals = initReveals;

  window.renderProjectsDropdown = render;

  function boot() { render(); initMobileMenu(); initReveals(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
