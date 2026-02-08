document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  // Close menu when a link is clicked (mobile UX)
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => menu.classList.add('hidden'));
  });
});
