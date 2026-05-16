/* ─── Navigation ─────────────────────────────────────────────────────────── */

const nav = document.querySelector('.nav');
const menuBtn = document.querySelector('.nav-menu-btn');
const mobileNav = document.querySelector('.nav-mobile');

// Scroll behavior — add .scrolled class after 40px
const handleNavScroll = () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

// Mobile menu toggle
if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const open = menuBtn.classList.toggle('open');
    if (open) {
      mobileNav.style.display = 'flex';
      requestAnimationFrame(() => mobileNav.classList.add('open'));
      document.body.style.overflow = 'hidden';
    } else {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(() => { mobileNav.style.display = 'none'; }, 300);
    }
  });

  // Close mobile nav on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(() => { mobileNav.style.display = 'none'; }, 300);
    });
  });
}

// Mark current page nav link as active
const currentPath = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPath || (currentPath === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});


/* ─── Fade-up on scroll ──────────────────────────────────────────────────── */

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));


/* ─── Skill bar animation ────────────────────────────────────────────────── */

const skillBarObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        skillBarObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.skill-bar-fill').forEach(el => skillBarObserver.observe(el));


/* ─── Gallery filter ─────────────────────────────────────────────────────── */

const galleryBtns = document.querySelectorAll('.gallery-filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item[data-category]');

if (galleryBtns.length) {
  galleryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}


/* ─── Journal category filter ────────────────────────────────────────────── */

const journalCatBtns = document.querySelectorAll('.journal-cat-btn');
const journalCards = document.querySelectorAll('.journal-post-card[data-category]');

if (journalCatBtns.length) {
  journalCatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      journalCatBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      journalCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}


/* ─── Newsletter form ────────────────────────────────────────────────────── */

const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input[type="email"]');
    const btn = newsletterForm.querySelector('button');
    const originalText = btn.textContent;

    btn.textContent = 'Thank you ✓';
    btn.style.background = '#5C3E30';
    input.value = '';
    input.disabled = true;

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      input.disabled = false;
    }, 4000);
  });
}


/* ─── Contact form ───────────────────────────────────────────────────────── */

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit .btn');
    const originalText = btn.textContent;
    btn.textContent = 'Message sent ✓';
    btn.style.background = '#5C3E30';
    btn.style.borderColor = '#5C3E30';
    contactForm.reset();

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.borderColor = '';
    }, 5000);
  });
}


/* ─── Image placeholder camera icon SVG ─────────────────────────────────── */
const cameraIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
  <circle cx="12" cy="13" r="4"></circle>
</svg>`;

document.querySelectorAll('.img-ph-inner svg').forEach(el => {
  el.outerHTML = cameraIcon;
});
