// quartz/components/scripts/lang-switcher.inline.ts

function highlightLang() {
  const path = window.location.pathname;
  const links = document.querySelectorAll<HTMLAnchorElement>('#lang-switcher a');
  links.forEach((a) => {
    a.classList.remove('active');
    const href = a.getAttribute('href') || '';
    // Подсвечиваем, если часть пути совпадает (работает и для вложенных путей)
    console.log(href);
    console.log(path);
    if (href && (path === href || path.startsWith(href) || path.includes(href))) {
      a.classList.add('active');
    }
  });
}

// Первый запуск после загрузки DOM:
highlightLang();

// Если у тебя включён SPA-роутинг Quartz, нужно обновлять подсветку на каждой навигации:
document.addEventListener('nav', () => {
  highlightLang();
  // Чистка обработчиков при уходе со страницы (best practice из доков)
  window.addCleanup?.(() => {});
});
