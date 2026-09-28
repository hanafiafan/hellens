(function () {
  const menu = document.getElementById('more-menu');
  const openButtons = [...document.querySelectorAll('[data-more-open]')];
  const closeButton = document.querySelector('[data-more-close]');
  if (!menu || !openButtons.length || !closeButton) return;
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let lastFocused = null;
  const setOpen = (open) => {
    menu.toggleAttribute('data-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    openButtons.forEach((button) => button.setAttribute('aria-expanded', String(open)));
    document.body.toggleAttribute('data-more-open', open);
    if (open) { lastFocused = document.activeElement; setTimeout(() => closeButton.focus(), 160); }
    else if (lastFocused) lastFocused.focus({ preventScroll:true });
  };
  openButtons.forEach((button) => {
    button.addEventListener('pointerdown', (event) => event.stopPropagation());
    button.addEventListener('click', (event) => { event.stopPropagation(); setOpen(true); });
  });
  closeButton.addEventListener('click', () => setOpen(false));
  menu.addEventListener('click', (event) => { if (event.target === menu) setOpen(false); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && menu.hasAttribute('data-open')) setOpen(false); });
  menu.querySelectorAll('[data-more-link]').forEach((link) => {
    const hover = link.querySelector('.more-menu__hover');
    let timer = 0;
    const scramble = () => {
      const target = hover.textContent;
      let iteration = 0;
      clearInterval(timer);
      timer = setInterval(() => {
        hover.textContent = target.split('').map((character,index) => character === ' ' ? ' ' : index < iteration ? target[index] : letters[Math.floor(Math.random()*letters.length)]).join('');
        iteration += .45;
        if (iteration >= target.length) { clearInterval(timer); hover.textContent = target; }
      }, 28);
    };
    link.addEventListener('mouseenter', scramble);
    link.addEventListener('focus', scramble);
    link.addEventListener('mouseleave', () => clearInterval(timer));
    link.addEventListener('click', () => { if (link.hash) setOpen(false); });
  });
})();
