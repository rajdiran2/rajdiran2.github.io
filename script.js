// ── Navbar scroll effect ─────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── Mobile nav toggle ────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ── Scroll reveal animation ──────────────────────────
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Animate cards and sections on scroll
const animateEls = document.querySelectorAll(
  '.app-card, .pillar, .team-card, .about-text, .about-pillars'
);

animateEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity .5s ease ${i * 0.06}s, transform .5s ease ${i * 0.06}s`;
  observer.observe(el);
});

// ── Active nav link highlight ────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchorLinks = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  navAnchorLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ── Contact form ─────────────────────────────────────
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const successMsg = document.getElementById('formSuccess');
  const errorMsg = document.getElementById('formError');
  const submitBtn = form.querySelector('button[type="submit"]');

  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;
  successMsg.classList.remove('show');
  errorMsg.classList.remove('show');

  const data = new FormData(form);
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: data
  });
  const result = await response.json();

  if (result.success) {
    successMsg.classList.add('show');
    form.reset();
  } else {
    errorMsg.classList.add('show');
  }

  submitBtn.textContent = 'Send Message';
  submitBtn.disabled = false;
}
