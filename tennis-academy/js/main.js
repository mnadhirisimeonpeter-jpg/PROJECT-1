// ================================================================
// main.js — Shared JavaScript for Ace Tennis Academy
// Runs on every page via <script src="js/main.js"></script>
//
// Features:
//   1. Active Navigation Highlighting — marks the current page's nav link
//   2. Dark Mode Toggle — persists user preference via localStorage
//   3. Contact Form Validation — custom client-side validation with styled errors
//   4. Programme Search Filter — live text search on the coaching page
//   5. Gallery Category Filter — show/hide photos by category on the gallery page
//   6. Scroll Reveal Animation — fade-in elements as they enter the viewport
// ================================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Active Navigation Highlighting ──
  // Extracts the current filename from the URL and adds .active class to the matching nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // ── 2. Dark Mode Toggle ──
  // Checks localStorage for saved preference and applies dark-mode class to body
  // Click handler toggles the class and updates both button text and localStorage
  const toggle = document.getElementById('darkModeToggle');
  const saved = localStorage.getItem('darkMode');

  if (saved === 'on') {
    document.body.classList.add('dark-mode');
    if (toggle) toggle.textContent = '☀️ Light';
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      toggle.textContent = isDark ? '☀️ Light' : '🌙 Dark';
      localStorage.setItem('darkMode', isDark ? 'on' : 'off');
    });
  }

  // ── 3. Contact Form Validation (contact.html only) ──
  // The form uses novalidate attribute to disable browser defaults
  // Each field is validated individually with custom error messages
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      // Validate name field — must be at least 2 characters long
      const name = document.getElementById('name');
      if (!name.value.trim() || name.value.trim().length < 2) {
        setInvalid(name, 'Please enter your full name.');
        valid = false;
      } else {
        setValid(name);
      }

      // Validate email — must match basic email format (text@text.text)
      const email = document.getElementById('email');
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email.value.trim())) {
        setInvalid(email, 'Please enter a valid email address.');
        valid = false;
      } else {
        setValid(email);
      }

      // Validate phone (optional) — if provided, must be 7-15 digits with optional +, spaces, dashes
      const phone = document.getElementById('phone');
      if (phone && phone.value.trim()) {
        const phoneRe = /^[+]?[\d\s\-()]{7,15}$/;
        if (!phoneRe.test(phone.value.trim())) {
          setInvalid(phone, 'Enter a valid phone number.');
          valid = false;
        } else {
          setValid(phone);
        }
      }

      // Validate subject dropdown — must select an option (not the default empty one)
      const subject = document.getElementById('subject');
      if (subject && !subject.value) {
        setInvalid(subject, 'Please select a subject.');
        valid = false;
      } else if (subject) {
        setValid(subject);
      }

      // Validate message textarea — must be at least 10 characters long
      const message = document.getElementById('message');
      if (!message.value.trim() || message.value.trim().length < 10) {
        setInvalid(message, 'Message must be at least 10 characters.');
        valid = false;
      } else {
        setValid(message);
      }

      // Simulate form submission — 1.2s delay since there's no backend server
      // Shows "Sending..." on the button, then displays a success alert and resets the form
      if (valid) {
        const btn = form.querySelector('button[type="submit"]');
        btn.textContent = 'Sending…';
        btn.disabled = true;

        setTimeout(() => {
          showSuccessAlert();
          form.reset();
          form.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
          btn.textContent = 'Send Message';
          btn.disabled = false;
        }, 1200);
      }
    });
  }

  // Helper: adds .is-invalid class (red border) and inserts error message text below the field
  function setInvalid(el, msg) {
    el.classList.add('is-invalid');
    el.classList.remove('is-valid');
    let fb = el.nextElementSibling;
    if (!fb || !fb.classList.contains('invalid-feedback')) {
      fb = document.createElement('div');
      fb.classList.add('invalid-feedback');
      el.parentNode.insertBefore(fb, el.nextSibling);
    }
    fb.textContent = msg;
  }

  function setValid(el) {
    el.classList.remove('is-invalid');
    el.classList.add('is-valid');
  }

  // Helper: creates a green Bootstrap success alert that auto-removes after 5 seconds
  function showSuccessAlert() {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success mt-3';
    alert.role = 'alert';
    alert.innerHTML = '<strong>Message sent!</strong> We\'ll get back to you within 24 hours.';
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(alert, form.nextSibling);
    setTimeout(() => alert.remove(), 5000);
  }

  // ── 4. Programme Search Filter (coaching.html only) ──
  // Listens for input on the search field and hides programme cards that don't match the query
  // Comparison is case-insensitive and checks the full text content of each card
  const searchInput = document.getElementById('programmeSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase();
      document.querySelectorAll('.programme-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.closest('.col').style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  // ── 5. Gallery Category Filter (gallery.html only) ──
  // Filter buttons (All, Training, Tournament, Team) show/hide gallery items by data-category
  // Active button gets filled gold style; inactive buttons get outline style
  const filterBtns = document.querySelectorAll('[data-filter]');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Swap active/outline classes on all filter buttons
        filterBtns.forEach(b => b.classList.remove('active', 'btn-gold'));
        filterBtns.forEach(b => b.classList.add('btn-outline-gold'));
        btn.classList.add('active', 'btn-gold');
        btn.classList.remove('btn-outline-gold');

        const filter = btn.dataset.filter;
        document.querySelectorAll('.gallery-item').forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ── 6. Scroll Reveal Animation ──
  // Elements with class "reveal" start invisible and slide up + fade in when scrolled into view
  // Uses IntersectionObserver API (more performant than scroll event listeners)
  // Threshold 0.1 means the animation triggers when 10% of the element is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

});
