/** Entrada discreta dos blocos abaixo da primeira dobra (respeita redução de movimento). */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduce && 'IntersectionObserver' in window) {
  const selector = '.section-head, .situation, .pillar, .service, .ipd, .step, .entries, .faq__item, .credentials, .training__list li';
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-revealed');
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    // Só anima o que ainda está fora da tela, evitando "piscar" conteúdo visível.
    if (el.getBoundingClientRect().top > window.innerHeight) {
      el.classList.add('reveal');
      io.observe(el);
    }
  });
}
export {};
