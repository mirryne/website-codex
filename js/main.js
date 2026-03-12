document.addEventListener('DOMContentLoaded', () => {
  const topbar = document.getElementById('topbar');
  const heroSection = document.getElementById('hero');
  const floatingCta = document.getElementById('floatingCta');
  const animatedElements = document.querySelectorAll('[data-animate]');
  const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const countdownElements = {
    days: document.getElementById('countDays'),
    hours: document.getElementById('countHours'),
    minutes: document.getElementById('countMinutes'),
    seconds: document.getElementById('countSeconds')
  };

  const countdownLabel = document.querySelector('.countdown-label');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const eventStartDate = new Date('2026-03-14T10:00:00+08:00');
  const eventEndDate = new Date('2026-03-16T00:00:00+08:00');

  function setCountdownValues(days, hours, minutes, seconds) {
    countdownElements.days.textContent = String(days).padStart(2, '0');
    countdownElements.hours.textContent = String(hours).padStart(2, '0');
    countdownElements.minutes.textContent = String(minutes).padStart(2, '0');
    countdownElements.seconds.textContent = String(seconds).padStart(2, '0');
  }

  function updateCountdown() {
    const now = new Date();
    const countdownTarget = now < eventStartDate ? eventStartDate : eventEndDate;
    const diff = countdownTarget - now;

    if (now < eventStartDate) {
      countdownLabel.textContent = '\u8ddd\u96e2\u8aaa\u660e\u6703\u958b\u59cb';
    } else if (now < eventEndDate) {
      countdownLabel.textContent = '\u8ddd\u96e2\u8aaa\u660e\u6703\u7d50\u675f';
    } else {
      setCountdownValues(0, 0, 0, 0);
      countdownLabel.textContent = '\u8aaa\u660e\u6703\u5df2\u7d50\u675f';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setCountdownValues(days, hours, minutes, seconds);
  }

  function updateTopbar() {
    if (!topbar) {
      return;
    }

    topbar.classList.toggle('scrolled', window.scrollY > 10);
  }

  function revealImmediately() {
    animatedElements.forEach((element) => element.classList.add('animate-in'));
  }

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.14,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealImmediately();
  }

  if (floatingCta && heroSection) {
    if ('IntersectionObserver' in window) {
      const floatingObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          floatingCta.classList.toggle('visible', !entry.isIntersecting);
        });
      }, {
        threshold: 0.16
      });

      floatingObserver.observe(heroSection);
    } else {
      floatingCta.classList.add('visible');
    }
  }

  if (sections.length && 'IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    }, {
      threshold: 0.45,
      rootMargin: '-20% 0px -35% 0px'
    });

    sections.forEach((section) => navObserver.observe(section));
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) {
        return;
      }

      event.preventDefault();
      const offset = topbar ? topbar.offsetHeight + 14 : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      const behavior = prefersReducedMotion ? 'auto' : 'smooth';

      window.scrollTo({ top, behavior });
    });
  });

  document.querySelectorAll('.faq-item').forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) {
        return;
      }

      document.querySelectorAll('.faq-item').forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });
    });
  });

  updateCountdown();
  updateTopbar();
  window.setInterval(updateCountdown, 1000);
  window.addEventListener('scroll', updateTopbar, { passive: true });
});
