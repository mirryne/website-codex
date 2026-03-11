document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('[data-animate]');
  const floatingCta = document.getElementById('floatingCta');
  const heroSection = document.getElementById('hero');
  const topbar = document.getElementById('topbar');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const parent = entry.target.parentElement;
      const siblings = parent ? parent.querySelectorAll('[data-animate]') : [entry.target];
      let delay = 0;

      siblings.forEach((sibling, index) => {
        if (sibling === entry.target) {
          delay = index * 90;
        }
      });

      setTimeout(() => {
        entry.target.classList.add('animate-in');
      }, delay);

      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.16,
    rootMargin: '0px 0px -40px 0px'
  });

  animateElements.forEach((element) => observer.observe(element));

  if (floatingCta && heroSection) {
    const floatingObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        floatingCta.classList.toggle('visible', !entry.isIntersecting);
      });
    }, {
      threshold: 0.28
    });

    floatingObserver.observe(heroSection);
  }

  const targetDate = new Date('2026-03-14T10:00:00+08:00');
  const label = document.querySelector('.countdown-label');

  function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      document.getElementById('countDays').textContent = '00';
      document.getElementById('countHours').textContent = '00';
      document.getElementById('countMinutes').textContent = '00';
      document.getElementById('countSeconds').textContent = '00';
      if (label) {
        label.textContent = '說明會已開始';
      }
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countDays').textContent = String(days).padStart(2, '0');
    document.getElementById('countHours').textContent = String(hours).padStart(2, '0');
    document.getElementById('countMinutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('countSeconds').textContent = String(seconds).padStart(2, '0');
  }

  function updateTopbar() {
    if (!topbar) {
      return;
    }

    topbar.classList.toggle('scrolled', window.scrollY > 24);
  }

  updateCountdown();
  updateTopbar();
  window.setInterval(updateCountdown, 1000);
  window.addEventListener('scroll', updateTopbar, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) {
        return;
      }

      event.preventDefault();
      const offset = topbar ? topbar.offsetHeight + 18 : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
});
