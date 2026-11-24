(() => {
  const config = {
    links: {
      whatsapp: 'https://wa.me/6287773634682',
      telegram: 'https://t.me/workatull',
      instagram: 'https://www.instagram.com/work.atull?knvt=dGxjaDRhdnhkNDlj&utm_source=qr'
    }
  };

  const setLinks = () => {
    const links = {
      '[data-whatsapp]': config.links.whatsapp,
      '[data-telegram]': config.links.telegram,
      '[data-instagram]': config.links.instagram
    };
    Object.entries(links).forEach(([selector, url]) => document.querySelectorAll(selector).forEach(link => {
      if (!url) {
        link.href = '#';
        link.removeAttribute('target');
        link.removeAttribute('rel');
        link.addEventListener('click', event => event.preventDefault());
        return;
      }
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener';
    }));
  };

  const setupGalleries = () => document.querySelectorAll('[data-gallery]').forEach(gallery => {
    gallery.querySelectorAll('img').forEach(image => { image.loading = 'eager'; });
    const name = gallery.dataset.gallery;
    const previous = document.querySelector(`[data-gallery-prev="${name}"]`);
    const next = document.querySelector(`[data-gallery-next="${name}"]`);
    const step = () => Math.max(gallery.clientWidth * 0.72, 220);
    let timer;
    let paused = false;
    const move = direction => {
      const end = gallery.scrollWidth - gallery.clientWidth - 4;
      const nextPosition = gallery.scrollLeft + direction * step();
      gallery.scrollTo({ left: nextPosition >= end ? 0 : Math.max(nextPosition, 0), behavior: 'smooth' });
    };
    const start = () => {
      window.clearInterval(timer);
      timer = window.setInterval(() => { if (!paused) move(1); }, 4000);
    };
    previous?.addEventListener('click', () => { move(-1); start(); });
    next?.addEventListener('click', () => { move(1); start(); });
    gallery.addEventListener('mouseenter', () => { paused = true; });
    gallery.addEventListener('mouseleave', () => { paused = false; });
    gallery.addEventListener('focusin', () => { paused = true; });
    gallery.addEventListener('focusout', () => { paused = false; });
    gallery.addEventListener('pointerdown', () => { paused = true; });
    gallery.addEventListener('pointerup', () => { paused = false; start(); });
    const ready = () => {
      if (gallery.scrollWidth > gallery.clientWidth) start();
    };
    gallery.querySelectorAll('img').forEach(image => image.addEventListener('load', ready, { once: true }));
    if ([...gallery.querySelectorAll('img')].every(image => image.complete)) ready();
  });

  const setupFaq = () => document.querySelectorAll('.faq-question').forEach(button => button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(other => {
      other.classList.remove('open');
      other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
    }
  }));

  const setupFloatingChat = () => {
    const chat = document.getElementById('floating-chat');
    const close = document.getElementById('close-chat');
    if (!chat || !close || sessionStorage.getItem('chat-closed') === '1') return;
    window.setTimeout(() => { chat.hidden = false; }, 10000);
    close.addEventListener('click', () => {
      chat.hidden = true;
      sessionStorage.setItem('chat-closed', '1');
    });
  };

  const setupReveal = () => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    document.querySelectorAll('.section, .package-card, .benefit-item, .step').forEach(element => observer.observe(element));
  };

  const setYear = () => {
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
  };

  setLinks();
  setYear();
  setupGalleries();
  setupFaq();
  setupFloatingChat();
  setupReveal();
})();
