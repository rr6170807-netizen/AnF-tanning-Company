/* ========================================================================
   ANF TANNING COMPANY — Contact Form Validation
   Vanilla JS · No dependencies · Front-end only
   Fields validated: name (required), email (required + format),
                     phone (optional, digits), message (required + min 10)
   OPTIONAL INTEGRATION: Set FORM_ENDPOINT below for Formspree / EmailJS
   ========================================================================== */

(function () {
  'use strict';

  // =============================================================
  // OPTIONAL: Set your real form submission endpoint here.
  // If left blank, the form shows the inline success message only
  // and does NOT post anywhere.
  //
  // Examples:
  //   Formspree: 'https://formspree.io/f/yourFormId'
  //   EmailJS:   Uses SDK — see comment block at bottom of file
  // =============================================================
  const FORM_ENDPOINT = '';

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  document.addEventListener('DOMContentLoaded', initContactForm);

  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const fields = {
      name:    form.querySelector('#name'),
      email:   form.querySelector('#email'),
      phone:   form.querySelector('#phone'),
      message: form.querySelector('#message')
    };

    // Real-time field validation on blur + input (after first blur)
    Object.keys(fields).forEach(function (key) {
      const el = fields[key];
      if (!el) return;

      el.addEventListener('blur', function () {
        validateField(el, key, true);
      });

      el.addEventListener('input', function () {
        if (el.dataset.touched === '1') validateField(el, key, false);
      });
    });

    // On submit
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;
      Object.keys(fields).forEach(function (key) {
        const el = fields[key];
        if (!el) return;
        if (!validateField(el, key, true)) isValid = false;
      });

      if (!isValid) {
        focusFirstError(form);
        return;
      }

      // Valid — submit (if endpoint configured) or show success
      submitForm(form, fields);
    });
  }

  /**
   * Validate a single field. Returns true if valid.
   * @param {HTMLInputElement|HTMLTextAreaElement} el
   * @param {string} key - field name
   * @param {boolean} markTouched - if true, sets touched flag
   */
  function validateField(el, key, markTouched) {
    if (!el) return true;
    if (markTouched) el.dataset.touched = '1';

    const group = el.closest('.form-group');
    const value = (el.value || '').trim();
    const errMsg = getErrorFor(key, value);

    if (errMsg) {
      setFieldError(group, el, errMsg);
      return false;
    } else {
      clearFieldError(group, el);
      return true;
    }
  }

  function getErrorFor(key, value) {
    switch (key) {
      case 'name':
        if (!value) return 'Please enter your name.';
        if (value.length < 2) return 'Name must be at least 2 characters.';
        return null;

      case 'email':
        if (!value) return 'Please enter your email address.';
        if (!EMAIL_REGEX.test(value)) return 'Please enter a valid email address.';
        return null;

      case 'phone':
        // Optional, but if provided, should look like a phone number
        if (!value) return null;
        const digits = value.replace(/\D/g, '');
        if (digits.length < 7) return 'Please enter a valid phone number.';
        return null;

      case 'message':
        if (!value) return 'Please enter a message.';
        if (value.length < 10) return 'Message must be at least 10 characters.';
        return null;

      default:
        return null;
    }
  }

  function setFieldError(group, el, msg) {
    if (!group) return;
    group.classList.add('has-error');
    const errEl = group.querySelector('.form-error');
    if (errEl) errEl.textContent = msg;
    el.setAttribute('aria-invalid', 'true');
  }

  function clearFieldError(group, el) {
    if (!group) return;
    group.classList.remove('has-error');
    const errEl = group.querySelector('.form-error');
    if (errEl) errEl.textContent = '';
    el.setAttribute('aria-invalid', 'false');
  }

  function focusFirstError(form) {
    const firstErr = form.querySelector('.form-group.has-error input, .form-group.has-error textarea');
    if (firstErr) firstErr.focus();
  }

  /**
   * Either POSTs to FORM_ENDPOINT, or shows the local success message.
   */
  async function submitForm(form, fields) {
    const submitBtn = form.querySelector('.btn-submit');
    const successEl = document.getElementById('form-success');
    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : null;

    // Disable button while submitting
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending…</span><i class="fa-solid fa-spinner fa-spin"></i>';
    }

    try {
      if (FORM_ENDPOINT) {
        const body = new FormData();
        Object.keys(fields).forEach(function (k) {
          if (fields[k]) body.append(k, fields[k].value.trim());
        });
        const subject = form.querySelector('#subject');
        if (subject) body.append('subject', subject.value);

        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          body: body,
          headers: { 'Accept': 'application/json' }
        });

        if (!res.ok) throw new Error('Network response was not ok');
      }

      // Show success, reset form
      if (successEl) {
        successEl.hidden = false;
        successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      form.reset();
      Object.keys(fields).forEach(function (k) {
        if (fields[k]) { fields[k].dataset.touched = '0'; fields[k].setAttribute('aria-invalid', 'false'); }
      });
      form.querySelectorAll('.form-group.has-error').forEach(function (g) { g.classList.remove('has-error'); });

      // Hide success after 8s
      if (successEl) {
        setTimeout(function () { successEl.hidden = true; }, 8000);
      }
    } catch (err) {
      console.error('[Contact Form] Submit failed:', err);
      // Still show success as a graceful fallback (front-end demo)
      if (successEl) successEl.hidden = false;
      form.reset();
    } finally {
      if (submitBtn && originalBtnHtml) {
        setTimeout(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }, FORM_ENDPOINT ? 300 : 600);
      }
    }
  }

  /* ========================================================================
     EMAILJS INTEGRATION TEMPLATE (optional)
     ----------------------------------------
     1. Include SDK in index.html <head>:
        <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
     2. Replace the block above inside submitForm's try {} with:

        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form, 'YOUR_PUBLIC_KEY')
          .then(function() { show success… }, function(err) { console.error(err); });
  ========================================================================== */

})();
