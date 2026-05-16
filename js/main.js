/* ─── Scroll Progress Bar ────────────────────────────────────────────────── */

const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);

const updateProgress = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
};

window.addEventListener('scroll', updateProgress, { passive: true });


/* ─── Navigation ─────────────────────────────────────────────────────────── */

const nav = document.querySelector('.nav');
const menuBtn = document.querySelector('.nav-menu-btn');
const mobileNav = document.querySelector('.nav-mobile');

const handleNavScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  updateProgress();
};

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

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

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(() => { mobileNav.style.display = 'none'; }, 300);
    });
  });
}

const currentPath = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPath || (currentPath === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});


/* ─── Hero Parallax ──────────────────────────────────────────────────────── */

const heroWrap = document.querySelector('.hero-image .photo-wrap');
if (heroWrap) {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY * 0.25;
    heroWrap.style.transform = `translateY(${offset}px)`;
  }, { passive: true });
}


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
  { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
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


/* ─── 3D Card Tilt ───────────────────────────────────────────────────────── */

const TILT_MAX = 8; // degrees

function applyTilt(el) {
  el.classList.add('tilt-card');

  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const rotX = -dy * TILT_MAX;
    const rotY =  dx * TILT_MAX;
    el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
}

document.querySelectorAll('.work-card, .journal-card, .tool-item, .read-card, .value-item').forEach(applyTilt);


/* ─── Magnetic Buttons ───────────────────────────────────────────────────── */

const MAGNETIC_STRENGTH = 0.35;

document.querySelectorAll('.btn').forEach(btn => {
  btn.classList.add('btn-magnetic');

  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * MAGNETIC_STRENGTH;
    const dy = (e.clientY - (rect.top  + rect.height / 2)) * MAGNETIC_STRENGTH;
    btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-2px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});


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
const journalCards   = document.querySelectorAll('.journal-post-card[data-category]');

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
    const btn   = newsletterForm.querySelector('button');
    btn.textContent = 'Thank you ✓';
    btn.style.background = '#5C3E30';
    input.value = '';
    input.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Subscribe';
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
    btn.textContent = 'Message sent ✓';
    btn.style.background = '#5C3E30';
    btn.style.borderColor = '#5C3E30';
    contactForm.reset();
    setTimeout(() => {
      btn.textContent = 'Send message';
      btn.style.background = '';
      btn.style.borderColor = '';
    }, 5000);
  });
}
