/* ========================================================================
   ANF TANNING COMPANY — Gallery / Lightbox
   Vanilla JS · No dependencies · Keyboard accessible
   Functions:
   - initLightbox()   : Bind clicks on gallery items + close button
   - openLightbox()   : Show overlay + populate image
   - closeLightbox()  : Hide overlay + restore focus / scroll lock
   - handleEsc()      : Close on ESC key
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', initLightbox);

  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxClose = document.getElementById('lightbox-close');
    var galleryItems = document.querySelectorAll('.gallery-item');

    if (!lightbox || !lightboxImg || !galleryItems.length) return;

    // Bind gallery item clicks
    galleryItems.forEach(function (item) {
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.setAttribute('aria-label', 'Open full-size image');

      item.addEventListener('click', function () {
        var galleryImg = item.querySelector('img');
        var fullSrc = galleryImg && galleryImg.getAttribute('src')
          ? galleryImg.getAttribute('src')
          : (item.getAttribute('data-full') || '');
        var alt = galleryImg ? (galleryImg.getAttribute('alt') || '') : '';
        openLightbox(lightbox, lightboxImg, fullSrc, alt);
      });

      // Keyboard: Enter / Space opens lightbox
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.click();
        }
      });
    });

    // Close button
    if (lightboxClose) {
      lightboxClose.addEventListener('click', function () {
        closeLightbox(lightbox, lightboxImg);
      });
    }

    // Click overlay to close
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox(lightbox, lightboxImg);
    });

    // ESC to close
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox(lightbox, lightboxImg);
      }
    });
  }

  function openLightbox(lightbox, lightboxImg, fullSrc, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.setAttribute('src', fullSrc);
    lightboxImg.setAttribute('alt', alt || 'Full-size gallery image');
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(lightbox, lightboxImg) {
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Clear src after transition completes
    setTimeout(function () {
      if (!lightbox.classList.contains('open')) {
        lightboxImg.setAttribute('src', '');
      }
    }, 400);
  }

})();
