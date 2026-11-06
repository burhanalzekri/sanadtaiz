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

  // 4. ميزة تتبع التقدم في المسارات (Progress Tracker)
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  // قائمة الصفحات التي تعتبر "مسارات"
  const pathwayPages = ['atanafas.html', 'anam.html', 'ahzan.html', 'arabi.html', 'asmod.html', 'salam.html', 'ghadab.html', 'anazih.html'];
  
  if (pathwayPages.includes(currentPage)) {
    const steps = document.querySelectorAll('.step');
    
    // إضافة زر الإكمال لكل خطوة
    steps.forEach((step, index) => {
      const stepBody = step.querySelector('.step-body');
      if (!stepBody) return;
      
      const stepId = `${currentPage}-step-${index}`;
      
      const btn = document.createElement('button');
      btn.className = 'btn';
      btn.style.width = '100%';
      btn.style.marginTop = '20px';
      btn.style.padding = '10px';
      btn.style.fontSize = '0.95em';
      btn.innerText = 'تحديد كخطوة مكتملة';
      
      // التحقق من الحالة المحفوظة مسبقاً
      if (localStorage.getItem(stepId) === 'completed') {
        btn.innerText = '✅ مكتملة (اضغط للتراجع)';
        btn.style.background = 'var(--primary)';
        btn.style.color = '#fff';
      } else {
        btn.style.background = 'transparent';
        btn.style.color = 'var(--text-muted)';
        btn.style.border = '1px solid var(--border)';
      }

      // حدث الضغط على الزر
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // منع إغلاق/فتح الأكورديون عند الضغط على الزر
        if (localStorage.getItem(stepId) === 'completed') {
          localStorage.removeItem(stepId);
          btn.innerText = 'تحديد كخطوة مكتملة';
          btn.style.background = 'transparent';
          btn.style.color = 'var(--text-muted)';
          btn.style.border = '1px solid var(--border)';
        } else {
          localStorage.setItem(stepId, 'completed');
          btn.innerText = '✅ مكتملة (اضغط للتراجع)';
          btn.style.background = 'var(--primary)';
          btn.style.color = '#fff';
          btn.style.border = 'none';
        }
      });
      
      stepBody.appendChild(btn);
    });
  }

  // 5. الوضع الليلي والنهاري
  const themeBtn = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme') || 'light'; 
  
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeBtn) themeBtn.innerText = '☀️';
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (themeBtn) themeBtn.innerText = '🌙';
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
