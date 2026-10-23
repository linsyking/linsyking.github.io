// Highlight the top navigation link of the section currently in view.
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.topnav');
  const links = Array.from(nav.querySelectorAll('a[href^="#"]:not(.brand)'));
  const sections = links.map((link) => document.querySelector(link.getAttribute('href')));

  const update = () => {
    const offset = nav.offsetHeight + 40;
    let current = 0;
    sections.forEach((section, i) => {
      if (section && section.getBoundingClientRect().top <= offset) current = i;
    });
    // The last section may be too short to reach the top of the viewport.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = sections.length - 1;
    }
    links.forEach((link, i) => {
      link.classList.toggle('active', i === current);
      if (i === current) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      update();
    });
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
});
