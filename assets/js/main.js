/* ========================================================================
   ANF TANNING COMPANY — Main JavaScript
   Functions:
   - initStickyNav()        : Header styling on scroll
   - initSmoothScroll()     : Anchor links with sticky nav offset
   - initRevealOnScroll()   : IntersectionObserver for .reveal elements
   - initHamburger()        : Mobile hamburger / slide-in menu
   - initBackToTop()        : Back-to-top button
   - setCurrentYear()       : Auto-update copyright year
   ========================================================================== */

(function () {
  'use strict';

  // Wait for the DOM to be fully ready
  document.addEventListener('DOMContentLoaded', function () {
    setCurrentYear();
    initStickyNav();
    initSmoothScroll();
    initRevealOnScroll();
    initHamburger();
    initBackToTop();
    initActiveNavLink();
    initMapEmbed();
    initAboutSlider();
  });

  /* ============================================================ */
  /* Auto-update the footer copyright year                        */
  /* ============================================================ */
  function setCurrentYear() {
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ============================================================ */
  /* Sticky Nav — change background / shadow on scroll            */
  /* ============================================================ */
  function initStickyNav() {
    var header = document.getElementById('site-header');
    if (!header) return;

    var check = function () {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
  }

  /* ============================================================ */
  /* Smooth Scroll — anchor links with sticky nav offset          */
  /* ============================================================ */
  function initSmoothScroll() {
    var anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (!href || href === '#') return;

        var target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        // Close mobile menu first if open
        closeMobileMenu();

        var navHeight = getNavHeight();
        var top = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;

        window.scrollTo({
          top: Math.max(0, top),
          behavior: 'smooth'
        });
      });
    });
  }

  function getNavHeight() {
    var header = document.getElementById('site-header');
    if (!header) return 80;
    return header.offsetHeight;
  }

  /* ============================================================ */
  /* Scroll-Reveal Animations via IntersectionObserver            */
  /* ============================================================ */
  function initRevealOnScroll() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    if (!('IntersectionObserver' in window)) {
      // No support — reveal everything immediately
      reveals.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  /* ============================================================ */
  /* Mobile Hamburger / Slide-in Menu                             */
  /* ============================================================ */
  function initHamburger() {
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobile-menu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      document.body.classList.toggle('menu-open', isOpen);
    });

    // Click backdrop to close
    document.addEventListener('click', function (e) {
      if (!mobileMenu.classList.contains('open')) return;
      if (mobileMenu.contains(e.target) || hamburger.contains(e.target)) return;
      closeMobileMenu();
    });

    // ESC closes menu
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMobileMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) closeMobileMenu();
    });
  }

  function closeMobileMenu() {
    var mobileMenu = document.getElementById('mobile-menu');
    var hamburger = document.getElementById('hamburger');
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  }

  /* ============================================================ */
  /* Back-to-Top Button                                           */
  /* ============================================================ */
  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    var check = function () {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    };
    check();
    window.addEventListener('scroll', check, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================ */
  /* Highlight Active Nav Link Based on Scroll Position           */
  /* ============================================================ */
  function initActiveNavLink() {
    var sections = document.querySelectorAll('main section[id]');
    var navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    if (!sections.length || !navLinks.length) return;

    if (!('IntersectionObserver' in window)) return;

    var navHeight = getNavHeight();

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            var match = link.getAttribute('href') === '#' + id;
            link.classList.toggle('active', match);
          });
        }
      });
    }, {
      rootMargin: '-' + (navHeight + 20) + 'px 0px -70% 0px',
      threshold: 0
    });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ============================================================ */
  /* Lazy-load Google Map only when visible and online            */
  /* ============================================================ */
  function initAboutSlider() {
    var slider = document.querySelector('.about-slider');
    if (!slider) return;

    var slides = Array.prototype.slice.call(slider.querySelectorAll('.about-slide'));
    var dots = Array.prototype.slice.call(slider.querySelectorAll('.about-slider-dot'));
    var prevBtn = slider.querySelector('.about-slider-btn.prev');
    var nextBtn = slider.querySelector('.about-slider-btn.next');

    if (!slides.length) return;

    var currentIndex = 0;
    var intervalId;

    function showSlide(index) {
      currentIndex = (index + slides.length) % slides.length;
      slides.forEach(function (slide, idx) {
        slide.classList.toggle('active', idx === currentIndex);
      });
      dots.forEach(function (dot, idx) {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    function startAutoPlay() {
      clearInterval(intervalId);
      intervalId = setInterval(function () {
        showSlide(currentIndex + 1);
      }, 5000);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        showSlide(currentIndex - 1);
        startAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        showSlide(currentIndex + 1);
        startAutoPlay();
      });
    }

    dots.forEach(function (dot, index) {
      dot.addEventListener('click', function () {
        showSlide(index);
        startAutoPlay();
      });
    });

    slider.addEventListener('mouseenter', function () {
      clearInterval(intervalId);
    });

    slider.addEventListener('mouseleave', function () {
      startAutoPlay();
    });

    showSlide(0);
    startAutoPlay();
  }

  function initMapEmbed() {
    var mapWrap = document.getElementById('map');
    var mapFrame = document.querySelector('.map-frame');
    var offlineState = document.getElementById('map-offline');
    if (!mapWrap || !mapFrame) return;

    var mapSrc = mapFrame.getAttribute('data-map-src');
    var mapLoaded = false;

    function showOfflineState() {
      mapFrame.hidden = true;
      if (offlineState) offlineState.hidden = false;
    }

    function showMap() {
      mapFrame.hidden = false;
      if (offlineState) offlineState.hidden = true;
    }

    function loadMap() {
      if (!navigator.onLine) {
        showOfflineState();
        return;
      }

      if (!mapLoaded && mapSrc) {
        mapFrame.setAttribute('src', mapSrc);
        mapLoaded = true;
      }

      showMap();
    }

    if (!navigator.onLine) {
      showOfflineState();
    } else if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            loadMap();
            obs.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '160px 0px',
        threshold: 0.05
      });

      observer.observe(mapWrap);
    } else {
      loadMap();
    }

    window.addEventListener('online', loadMap);
    window.addEventListener('offline', showOfflineState);
  }

})();
