// BABİL CAM — shared behaviors
document.addEventListener('DOMContentLoaded', () => {

    /* Mobile nav toggle */
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav-main');
    if(toggle && nav){
      toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.classList.remove('open');
      }));
    }
  
    /* Scroll reveal */
    const revealEls = document.querySelectorAll('[data-reveal]');
    if('IntersectionObserver' in window && revealEls.length){
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting){
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach((el, i) => {
        el.style.transitionDelay = (i % 6) * 60 + 'ms';
        io.observe(el);
      });
    } else {
      revealEls.forEach(el => el.classList.add('in-view'));
    }
  
    /* Marquee duplication for seamless loop */
    document.querySelectorAll('.marquee-track').forEach(track => {
      track.innerHTML += track.innerHTML;
    });
  
    /* Project gallery filter */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.g-item');
    if(filterBtns.length && galleryItems.length){
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.setAttribute('aria-pressed','false'));
          btn.setAttribute('aria-pressed','true');
          const cat = btn.dataset.filter;
          galleryItems.forEach(item => {
            const show = cat === 'all' || item.dataset.cat === cat;
            item.classList.toggle('is-hidden', !show);
          });
        });
      });
    }
  
    /* Simple contact form UX (no backend — static site) */
    const form = document.querySelector('#contact-form');
    if(form){
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const original = btn.textContent;
        btn.textContent = 'Mesajınız alındı ✓';
        form.reset();
        setTimeout(() => { btn.textContent = original; }, 3200);
      });
    }
  
  });