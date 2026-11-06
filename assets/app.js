document.addEventListener('DOMContentLoaded', () => {
  // 1. بوابة الموافقة (Modal)
  const modal = document.getElementById('consentModal');
  const consentBtn = document.getElementById('consentBtn');
  if (modal && consentBtn) {
    if (!localStorage.getItem('sana_consent')) {
      modal.classList.add('show');
    } else {
      modal.classList.remove('show');
    }
    consentBtn.addEventListener('click', () => {
      localStorage.setItem('sana_consent', 'yes');
      modal.classList.remove('show');
    });
  }

  // 2. تفاعل الخطوات (Accordion)
  const stepHeads = document.querySelectorAll('.step-head');
  stepHeads.forEach(head => {
    head.addEventListener('click', () => {
      const step = head.parentElement;
      step.classList.toggle('open');
      head.setAttribute('aria-expanded', step.classList.contains('open'));
    });
  });

  // 3. مساحة التفريغ
  const ventText = document.getElementById('ventText');
  const ventClear = document.getElementById('ventClear');
  if (ventText && ventClear) {
    ventClear.addEventListener('click', () => {
      ventText.value = '';
      ventText.focus();
    });
  }

  // 4. الوضع الليلي والنهاري
  const themeBtn = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme') || 'dark'; // الافتراضي داكن
  
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeBtn) themeBtn.innerText = '☀️'; // إذا كان داكناً، اعرض شمس للتبديل للنهاري
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (themeBtn) themeBtn.innerText = '🌙'; // إذا كان نهاري، اعرض قمر
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeBtn.innerText = '🌙';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeBtn.innerText = '☀️';
      }
    });
  }
});
