(() => {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('motion-ready');

  const revealEls = [...document.querySelectorAll('[data-reveal], [data-title-reveal]')];
  revealEls.forEach((el, i) => el.style.setProperty('--reveal-delay', `${(i % 5) * 70}ms`));

  const visible = el => {
    const r = el.getBoundingClientRect();
    return r.top < innerHeight * 0.92 && r.bottom > 0;
  };

  if (reduceMotion) {
    revealEls.forEach(el => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -7% 0px' });
    revealEls.forEach(el => visible(el) ? el.classList.add('is-visible') : observer.observe(el));
  }

  const focusEls = [...document.querySelectorAll('[data-focus]')];
  if (!reduceMotion && focusEls.length) {
    const focusObserver = new IntersectionObserver(entries => {
      entries.forEach(e => e.target.classList.toggle('is-focused', e.isIntersecting));
    }, { threshold: 0.55 });
    focusEls.forEach(el => focusObserver.observe(el));
  }

  const progress = document.getElementById('progressBar');
  const parallaxEls = [...document.querySelectorAll('[data-parallax]')];
  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? scrollY / max : 0;
    if (progress) progress.style.width = `${(p * 100).toFixed(3)}%`;
    if (!reduceMotion && innerWidth > 680) {
      parallaxEls.forEach(el => {
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const delta = (center - innerHeight / 2) / innerHeight;
        el.style.transform = `translateY(${Math.max(-1, Math.min(1, delta)) * -14}px)`;
      });
    }
    ticking = false;
  };
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
  addEventListener('resize', update, { passive: true });
  update();
})();
