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

  // 4. ميزة تتبع التقدم
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const pathwayPages = ['atanafas.html', 'anam.html', 'ahzan.html', 'arabi.html', 'asmod.html', 'salam.html', 'ghadab.html', 'anazih.html'];
  
  if (pathwayPages.includes(currentPage)) {
    const steps = document.querySelectorAll('.step');
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
      
      if (localStorage.getItem(stepId) === 'completed') {
        btn.innerText = '✅ مكتملة (اضغط للتراجع)';
        btn.style.background = 'var(--primary)';
        btn.style.color = '#fff';
      } else {
        btn.style.background = 'transparent';
        btn.style.color = 'var(--text-muted)';
        btn.style.border = '1px solid var(--border)';
      }

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
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

  // 6. إنشاء شريط التنقل السفلي تلقائياً في كل صفحة
  if (!document.querySelector('.bottom-nav')) {
    const bottomNavHTML = `
      <div class="bottom-dropdown" id="pathwaysDropdown">
        <a href="atanafas.html">🌿 أتنفّس (القلق)</a>
        <a href="anam.html">🌙 أنام (الأرق)</a>
        <a href="ahzan.html">💙 أحزن (الفقد)</a>
        <a href="arabi.html">👨‍👩‍👧 أربّي (الأطفال)</a>
        <a href="asmod.html">🛡️ أصمد (الصدمة)</a>
        <a href="salam.html">🕊️ أتصالح (الذنب)</a>
        <a href="ghadab.html">🔥 أهدّئ غضبي</a>
        <a href="anazih.html">🏠 أنزح (النزوح)</a>
      </div>
      <div class="bottom-dropdown" id="assessmentsDropdown">
        <a href="quick_assessment.html">🧠 تقييم سريع</a>
        <a href="gad7.html">📊 مقياس القلق</a>
        <a href="phq9.html">💡 مقياس الاكتئاب</a>
        <a href="pcl5.html">🛡️ مقياس الصدمة</a>
        <a href="wellbeing.html">🌱 مقياس الرفاهية</a>
      </div>
      
      <div class="bottom-nav">
        <a href="index.html" class="bottom-nav-item" id="nav-home">
          <span class="icon">🏠</span>
          <span>الرئيسية</span>
        </a>
        <div class="bottom-nav-item" id="nav-pathways" onclick="toggleBottomDropdown('pathwaysDropdown')">
          <span class="icon">🧭</span>
          <span>المسارات</span>
        </div>
        <div class="bottom-nav-item" id="nav-assessments" onclick="toggleBottomDropdown('assessmentsDropdown')">
          <span class="icon">📊</span>
          <span>التقييمات</span>
        </div>
        <a href="library.html" class="bottom-nav-item" id="nav-library">
          <span class="icon">📚</span>
          <span>المكتبة</span>
        </a>
        <a href="emergency.html" class="bottom-nav-item" id="nav-emergency" style="color: var(--danger-br);">
          <span class="icon">🚨</span>
          <span>الطوارئ</span>
        </a>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', bottomNavHTML);

    // تفعيل حالة النشاط (Active) للصفحة الحالية
    const page = window.location.pathname.split('/').pop() || 'index.html';
    if (page === 'index.html' || page === '') document.getElementById('nav-home').classList.add('active');
    if (pathwayPages.includes(page)) document.getElementById('nav-pathways').classList.add('active');
    if (['gad7.html', 'phq9.html', 'pcl5.html', 'wellbeing.html', 'quick_assessment.html'].includes(page)) document.getElementById('nav-assessments').classList.add('active');
    if (page === 'library.html' || page === 'articles.html' || page === 'awareness.html') document.getElementById('nav-library').classList.add('active');
    if (page === 'emergency.html') document.getElementById('nav-emergency').classList.add('active');
  }
});

// دالة فتح/إغلاق القوائم المنسدلة السفلية
function toggleBottomDropdown(id) {
  const dropdown = document.getElementById(id);
  const allDropdowns = document.querySelectorAll('.bottom-dropdown');
  
  allDropdowns.forEach(d => {
    if (d.id !== id) d.classList.remove('show');
  });
  
  dropdown.classList.toggle('show');
}

// إغلاق القوائم عند النقر في أي مكان آخر
document.addEventListener('click', (e) => {
  if (!e.target.closest('.bottom-nav-item') && !e.target.closest('.bottom-dropdown')) {
    document.querySelectorAll('.bottom-dropdown').forEach(d => d.classList.remove('show'));
  }
});
