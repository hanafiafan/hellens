(function () {
  const translations = {
    id: {
      'meta.title': 'Hellens Developer — Website, Automasi & Sistem Bisnis',
      'meta.description': 'Hellens Developer membangun website berorientasi konversi, dashboard operasional, integrasi sistem, dan automasi bisnis untuk membantu perusahaan bertumbuh.',
      'nav.intro': 'Awal', 'nav.approach': 'Layanan', 'nav.works': 'Karya', 'nav.about': 'Tentang', 'nav.more': 'Lainnya',
      'hero.eyebrow': 'Website, Automasi & Sistem', 'hero.scroll': 'Gulir untuk melihat karya.',
      'intro.trusted': 'Dipercaya oleh 20+ bisnis 🤝<br>untuk membangun website yang menghasilkan 🌐,<br>dashboard yang memperjelas data 📊,<br>dan automasi yang bertumbuh ⚡',
      'approach.website': 'Membangun website yang cepat, jelas, dan dirancang untuk mengubah pengunjung menjadi pelanggan.',
      'approach.automation': 'Menghubungkan sistem, data, dan alur kerja agar proses bisnis berjalan otomatis, cepat, dan konsisten.',
      'approach.system': 'Membangun sistem yang terintegrasi, stabil, dan mudah dikembangkan untuk mendukung operasional bisnis.',
      'approach.creativity': 'Menggabungkan ide, visual, dan teknologi untuk menciptakan pengalaman digital yang berkarakter dan berkesan.',
      'featured.title': 'PROYEK PILIHAN',
      'about.title': 'Mengubah ide menjadi pengalaman digital yang tumbuh bersama bisnis',
      'about.p1': 'Saya Hanafi Afan, developer di balik Hellens yang membangun website, sistem, dan automasi untuk membantu bisnis bekerja lebih efektif.',
      'about.p2': 'Saya memadukan desain, engineering, dan kebutuhan bisnis menjadi solusi digital yang jelas, terukur, dan mudah dikembangkan.',
      'about.p3': 'Melalui Hellens, saya bekerja bersama bisnis dari berbagai sektor untuk mengubah tantangan operasional menjadi produk yang benar-benar terpakai.',
      'about.p4': 'Sederhana dalam proses, jelas dalam komunikasi, dan selalu berorientasi pada dampak nyata.',
      'outro.line1': 'Mari bangun', 'outro.line2': 'hal besar berikutnya', 'email.copy': 'Klik untuk menyalin email', 'email.copied': 'Email berhasil disalin!'
    },
    en: {
      'meta.title': 'Hellens Developer — Websites, Automation & Business Systems',
      'meta.description': 'Hellens Developer builds conversion-focused websites, operational dashboards, system integrations, and business automation for growing companies.',
      'nav.intro': 'Intro', 'nav.approach': 'Approach', 'nav.works': 'Works', 'nav.about': 'About', 'nav.more': 'More',
      'hero.eyebrow': 'Websites, Automation & Systems', 'hero.scroll': 'Scroll on for the work.',
      'intro.trusted': 'Trusted by 20+ businesses 🤝<br>to build websites that convert 🌐,<br>dashboards that clarify 📊,<br>and automation that scales ⚡',
      'approach.website': 'Building fast, focused websites designed to turn visitors into customers.',
      'approach.automation': 'Connecting systems, data, and workflows so business processes run automatically, quickly, and consistently.',
      'approach.system': 'Building integrated, stable, and scalable systems that support day-to-day business operations.',
      'approach.creativity': 'Combining ideas, visuals, and technology to create distinctive and memorable digital experiences.',
      'featured.title': 'FEATURED PROJECTS',
      'about.title': 'Turning ideas into digital experiences that grow with the business',
      'about.p1': 'I’m Hanafi Afan, the developer behind Hellens, building websites, systems, and automation that help businesses work more effectively.',
      'about.p2': 'I bring design, engineering, and business needs together into digital solutions that are clear, measurable, and ready to evolve.',
      'about.p3': 'Through Hellens, I work with businesses across different sectors to turn operational challenges into products people actually use.',
      'about.p4': 'Simple processes, clear communication, and an unwavering focus on meaningful impact.',
      'outro.line1': 'Let’s build', 'outro.line2': 'the next big thing', 'email.copy': 'Click to copy email', 'email.copied': 'Copied to clipboard!'
    }
  };
  const requestedLanguage = new URLSearchParams(location.search).get('lang');
  let language = requestedLanguage === 'en' ? 'en' : requestedLanguage === 'id' ? 'id' : 'id';
  if (!requestedLanguage) { try { language = localStorage.getItem('hellens-language') === 'en' ? 'en' : 'id'; } catch (e) {} }
  const copy = translations[language];
  document.documentElement.lang = language;
  document.title = copy['meta.title'];
  const description = document.querySelector('meta[name="description"]'); if (description) description.content = copy['meta.description'];
  const ogTitle = document.querySelector('meta[property="og:title"]'); if (ogTitle) ogTitle.content = copy['meta.title'];
  const ogDescription = document.querySelector('meta[property="og:description"]'); if (ogDescription) ogDescription.content = copy['meta.description'];
  const twitterTitle = document.querySelector('meta[name="twitter:title"]'); if (twitterTitle) twitterTitle.content = copy['meta.title'];
  const twitterDescription = document.querySelector('meta[name="twitter:description"]'); if (twitterDescription) twitterDescription.content = copy['meta.description'];
  const canonical = document.querySelector('link[rel="canonical"]'); if (canonical) canonical.href = language === 'en' ? 'https://hellens.dev/?lang=en' : 'https://hellens.dev/';
  const ogUrl = document.querySelector('meta[property="og:url"]'); if (ogUrl) ogUrl.content = canonical ? canonical.href : location.href;
  document.querySelectorAll('[data-i18n]').forEach((element) => { const value = copy[element.dataset.i18n]; if (value) element.textContent = value; });
  document.querySelectorAll('[data-i18n-html]').forEach((element) => { const value = copy[element.dataset.i18nHtml]; if (value) element.innerHTML = value; });
  document.querySelectorAll('[data-more-link]').forEach((link) => {
    link.querySelector('.more-menu__label').textContent = language === 'en' ? link.dataset.moreEn : link.dataset.moreId;
    link.querySelector('.more-menu__hover').textContent = language === 'en' ? link.dataset.hoverEn : link.dataset.hoverId;
  });
  document.querySelectorAll('[data-language]').forEach((button) => {
    const active = button.dataset.language === language;
    button.setAttribute('aria-pressed', String(active));
    button.addEventListener('pointerdown', (event) => event.stopPropagation());
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      if (button.dataset.language === language) return;
      try { localStorage.setItem('hellens-language', button.dataset.language); } catch (e) {}
      document.documentElement.classList.add('is-language-changing');
      const url = new URL(location.href); if (button.dataset.language === 'id') url.searchParams.delete('lang'); else url.searchParams.set('lang', 'en');
      setTimeout(() => location.assign(url.href), 180);
    });
  });
})();
