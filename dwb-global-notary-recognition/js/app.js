/* File: js/app.js - DWB Global - Notary Recognition Platform | Vanilla, no deps */
(() => {
  // DOM helpers - Utility
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  // Mobile menu - Component: c-mobile
  const burger = $('.c-burger');
  const mobile = $('#mobile');
  burger?.addEventListener('click', () => {
    const open = mobile.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open);
  });

  // Hall of Fame filter - Component: c-filters
  const filterBtns = $$('.c-filters button');
  const cards = $$('.c-hcard');
  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const f = btn.dataset.filter;
    cards.forEach(c => {
      c.style.display = (f === 'all' || c.dataset.region === f) ? '' : 'none';
    });
  }));

  // Count-up animation - Component: c-stats
  const countIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      if(!target) return;
      let cur = 0;
      const step = Math.ceil(target / 60);
      const tick = () => {
        cur = Math.min(target, cur + step);
        el.textContent = cur.toLocaleString();
        if(cur < target) requestAnimationFrame(tick);
      };
      tick();
      countIO.unobserve(el);
    });
  }, {threshold: 0.5});
  $$('.js-count').forEach(el => countIO.observe(el));

  // Seal parallax - Component: c-hero__seal
  const seal = $('#heroSeal');
  window.addEventListener('mousemove', e => {
    if(!seal) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 16;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    seal.style.transform = `translate(${x}px, ${y}px) rotate(-6deg)`;
  }, {passive: true});

  // Story counter - Component: c-form
  const ta = document.querySelector('[name=story]');
  const cnt = $('.c-count');
  ta?.addEventListener('input', () => {
    if(cnt) cnt.textContent = `${ta.value.length} / 3000`;
  });

  // Netlify Forms UX - all forms with data-netlify
  $$('form[data-netlify]').forEach(form => {
    form.addEventListener('submit', () => {
      const btn = form.querySelector('button[type=submit]');
      if(btn){
        btn.textContent = 'Submitted ✓ — Thank you';
        btn.disabled = true;
      }
    });
  });

  // Sticky header hide on scroll - Component: c-header
  let lastY = 0;
  const hdr = $('#header');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if(y > lastY && y > 140) hdr.style.transform = 'translateY(-100%)';
    else hdr.style.transform = 'translateY(0)';
    lastY = y;
  }, {passive: true});
})();
