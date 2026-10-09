/* ============================================
   كرياتيفو.dz — السكريبت الرئيسي
   ============================================ */

// ===== الهيدر عند التمرير =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== قائمة الهاتف =====
const menuToggle = document.getElementById('menu-toggle');
const navList = document.getElementById('nav-list');

menuToggle.addEventListener('click', () => {
  navList.classList.toggle('open');
  menuToggle.classList.toggle('open');
});

// إغلاق القائمة عند الضغط على رابط
navList.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('open');
    menuToggle.classList.remove('open');
  });
});

// ===== حركات الظهور عند التمرير =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // تأخير بسيط بين العناصر المتجاورة لتحسين المظهر
      setTimeout(() => entry.target.classList.add('visible'), (index % 3) * 120);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== عدّاد الأرقام =====
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const target = +el.dataset.count;
    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * progress);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ===== تفعيل الرابط في القائمة حسب القسم =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
});

// ===== نموذج النشرة البريدية =====
const newsletterForm = document.getElementById('newsletter-form');
const newsletterMsg = document.getElementById('newsletter-msg');

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = newsletterForm.querySelector('input').value.trim();

  if (email) {
    // TODO: لاحقاً نربطو هنا خدمة تخزين الإيميلات (مثل Formspree — مجانية)
    newsletterMsg.textContent = '✅ تم التسجيل بنجاح! نتمنى لك يوم سعيد.';
    newsletterForm.reset();
    setTimeout(() => { newsletterMsg.textContent = ''; }, 5000);
  }
});