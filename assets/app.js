document.addEventListener('DOMContentLoaded', () => {
  // 1. إخفاء شريط التنقل القديم
  const oldTopbar = document.querySelector('.topbar');
  if (oldTopbar) oldTopbar.style.display = 'none';

  // 2. بناء الهيدر والشريط المتحرك
  const headerHTML = `
    <header class="new-header">
      <button class="menu-btn" onclick="toggleSidebar()">☰</button>
      <div class="header-brand"><span class="logo">س</span> سند تعز</div>
      <button id="themeToggle" class="theme-btn">🌙</button>
    </header>
    <div class="ticker-wrap">
      <div class="ticker">
        <span>✨ "لا تحاول السيطرة على كل شيء، ركز على ما يمكنك فعله اليوم."</span>
        <span>✨ "القلق هو أن تعيش المستقبل قبل أن يأتي."</span>
        <span>✨ "طلب المساعدة النفسية ليس ضعفاً، بل هو قوة."</span>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  // 3. بناء القائمة الجانبية
  const sidebarHTML = `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <h2>القائمة</h2>
      </div>
      <nav class="sidebar-nav">
        <a href="index.html" class="side-link">🏠 الرئيسية</a>
        
        <div class="side-group-title">🧭 المسارات</div>
        <a href="atanafas.html" class="side-link">🌿 أتنفّس</a>
        <a href="anam.html" class="side-link">🌙 أنام</a>
        <a href="ahzan.html" class="side-link">💙 أحزن</a>
        <a href="arabi.html" class="side-link">👨‍👩‍👧 أربّي</a>
        <a href="asmod.html" class="side-link">🛡️ أصمد</a>
        <a href="salam.html" class="side-link">🕊️ أتصالح</a>
        <a href="ghadab.html" class="side-link">🔥 أهدّئ غضبي</a>
        <a href="anazih.html" class="side-link">🏠 أنزح</a>
        
        <div class="side-group-title">📊 التقييمات</div>
        <a href="quick_assessment.html" class="side-link">🧠 تقييم سريع</a>
        <a href="gad7.html" class="side-link">📊 مقياس القلق</a>
        <a href="phq9.html" class="side-link">💡 مقياس الاكتئاب</a>
        
        <div class="side-group-title">📚 المحتوى</div>
        <a href="library.html" class="side-link">📖 المكتبة</a>
        <a href="awareness.html" class="side-link">🧠 الموسوعة</a>
        <a href="skills.html" class="side-link">🛠️ المهارات</a>
        
        <div class="side-group-title">🤝 الدعم</div>
        <a href="booking.html" class="side-link">🗓️ احجز جلسة</a>
        <a href="emergency.html" class="side-link" style="color: var(--danger-br);">🚨 الطوارئ</a>
      </nav>
    </aside>
  `;
  document.body.insertAdjacentHTML('beforeend', sidebarHTML);

  // 4. الوضع الليلي والنهاري
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

  // 5. منطق القائمة الجانبية (تظهر افتراضياً، وتختفي عند الضغط)
  window.toggleSidebar = function() {
    document.body.classList.toggle('sidebar-collapsed');
  }

  // 6. الأكواد القديمة
  const stepHeads = document.querySelectorAll('.step-head');
  stepHeads.forEach(head => {
    head.addEventListener('click', () => {
      const step = head.parentElement;
      step.classList.toggle('open');
      head.setAttribute('aria-expanded', step.classList.contains('open'));
    });
  });

  const ventText = document.getElementById('ventText');
  const ventClear = document.getElementById('ventClear');
  if (ventText && ventClear) {
    ventClear.addEventListener('click', () => { ventText.value = ''; ventText.focus(); });
  }
});
