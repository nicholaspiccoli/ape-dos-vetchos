(() => {
  const root = document.documentElement;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('motion-ready');

  const progressBar = document.getElementById('progressBar');
  const scrollCue = document.getElementById('scrollCue');
  const revealTargets = [...document.querySelectorAll('[data-reveal], [data-title-reveal]')];
  const focusTargets = [...document.querySelectorAll('[data-focus]')];
  const parallaxTargets = [...document.querySelectorAll('[data-parallax]')];
  const phaseScenes = [...document.querySelectorAll('.motion-scene')];

  const alreadyVisible = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top < innerHeight * .92 && rect.bottom > 0;
  };

  revealTargets.forEach((el, index) => {
    el.style.setProperty('--reveal-delay', `${Math.min(index % 5, 4) * 70}ms`);
  });

  if (reduceMotion) {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: .15, rootMargin: '0px 0px -8% 0px' });

    revealTargets.forEach(el => alreadyVisible(el) ? el.classList.add('is-visible') : observer.observe(el));

    const focusObserver = new IntersectionObserver(entries => {
      for (const entry of entries) entry.target.classList.toggle('is-focused', entry.isIntersecting);
    }, { threshold: .55 });
    focusTargets.forEach(el => focusObserver.observe(el));
    phaseScenes.forEach(scene => scene.classList.add('phase-enabled'));
  }

  let ticking = false;
  const updateMotion = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const progress = max > 0 ? scrollY / max : 0;
    if (progressBar) progressBar.style.width = `${Math.max(0, Math.min(1, progress)) * 100}%`;
    if (scrollCue) scrollCue.classList.toggle('is-hidden', scrollY > 220);

    if (!reduceMotion) {
      const parallaxScale = innerWidth <= 760 ? .35 : 1;
      parallaxTargets.forEach(el => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const delta = (center - innerHeight / 2) / innerHeight;
        el.style.setProperty('--parallax', (delta * parallaxScale).toFixed(3));
      });

      phaseScenes.forEach(scene => {
        const rect = scene.getBoundingClientRect();
        const off = Math.max(0, Math.min(1, (-rect.bottom + innerHeight * .18) / Math.max(rect.height, 1)));
        scene.style.setProperty('--phase-off', off.toFixed(3));
      });
    }
    ticking = false;
  };

  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateMotion);
  }, { passive: true });
  addEventListener('resize', updateMotion, { passive: true });
  updateMotion();

  const range = document.getElementById('compareRange');
  const beforeWrap = document.getElementById('beforeWrap');
  const compareLine = document.getElementById('compareLine');
  if (range && beforeWrap && compareLine) {
    const updateCompare = () => {
      const value = Number(range.value);
      beforeWrap.style.width = `${value}%`;
      compareLine.style.left = `${value}%`;
    };
    range.addEventListener('input', updateCompare);
    updateCompare();
  }

  const filters = [...document.querySelectorAll('[data-filter]')];
  const rows = [...document.querySelectorAll('.decision-table tbody tr')];
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-pressed','false'); });
    button.classList.add('is-active');
    button.setAttribute('aria-pressed','true');
    const filter = button.dataset.filter;
    rows.forEach(row => {
      const categories = (row.dataset.category || '').split(' ');
      row.classList.toggle('is-filtered', filter !== 'all' && !categories.includes(filter));
    });
  }));

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.getElementById('mainNav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded','false');
      nav.classList.remove('is-open');
    }));
  }

  if (!reduceMotion && matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.magnetic').forEach(button => {
      button.addEventListener('pointermove', event => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate(${x * .06}px, ${y * .06}px)`;
      });
      button.addEventListener('pointerleave', () => { button.style.transform = ''; });
    });
  }
})();
