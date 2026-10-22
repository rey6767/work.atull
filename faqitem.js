  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
      item.classList.toggle('active');
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
        }
      });
    });
  });