// main.js — runs on every page

document.addEventListener('DOMContentLoaded', () => {

  // highlight whichever nav link matches the current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // dark mode — saved in localStorage so it persists between pages
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

  // contact form validation
  // using novalidate on the form so we can show our own error messages
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      // name — at least 2 characters
      const name = document.getElementById('name');
      if (!name.value.trim() || name.value.trim().length < 2) {
        setInvalid(name, 'Please enter your full name.');
        valid = false;
      } else {
        setValid(name);
      }

      // email — basic regex check
      const email = document.getElementById('email');
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email.value.trim())) {
        setInvalid(email, 'Please enter a valid email address.');
        valid = false;
      } else {
        setValid(email);
      }

      // phone is optional, but validate format if they typed something
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

      // subject dropdown — can't leave it on the default empty option
      const subject = document.getElementById('subject');
      if (subject && !subject.value) {
        setInvalid(subject, 'Please select a subject.');
        valid = false;
      } else if (subject) {
        setValid(subject);
      }

      // message — needs to be at least 10 chars
      const message = document.getElementById('message');
      if (!message.value.trim() || message.value.trim().length < 10) {
        setInvalid(message, 'Message must be at least 10 characters.');
        valid = false;
      } else {
        setValid(message);
      }

      // fake a 1.2s send delay since there's no backend
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

  // adds red border + error text below the field
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

  // green banner that disappears after 5 seconds
  function showSuccessAlert() {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success mt-3';
    alert.role = 'alert';
    alert.innerHTML = '<strong>Message sent!</strong> We\'ll get back to you within 24 hours.';
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(alert, form.nextSibling);
    setTimeout(() => alert.remove(), 5000);
  }

  // live search on coaching page — hides cards that don't match what you type
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

  // gallery filter buttons — show/hide photos by category
  const filterBtns = document.querySelectorAll('[data-filter]');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // swap the active button styling
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

  // scroll reveal — elements with class "reveal" fade in when you scroll to them
  // using IntersectionObserver instead of a scroll listener (way better for performance)
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
