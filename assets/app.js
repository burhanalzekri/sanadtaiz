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
      <div class="ticker" id="tickerContent">
        <!-- سيتم تحميل النص من الذاكرة هنا -->
        <span>✨ "لا تحاول السيطرة على كل شيء، ركز على ما يمكنك فعله اليوم."</span>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  // تحميل نص الشريط المتحرك من الذاكرة
  const savedTicker = localStorage.getItem('sana_ticker');
  if (savedTicker) {
    document.getElementById('tickerContent').innerHTML = `<span>✨ ${savedTicker}</span>`;
  }

  // 3. بناء القائمة الجانبية
  const sidebarHTML = `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header"><h2>القائمة</h2></div>
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
        <a href="articles.html" class="side-link">📝 مقالات</a>
        <a href="skills.html" class="side-link">🛠️ المهارات</a>
        <div class="side-group-title">🤝 الدعم</div>
        <a href="booking.html" class="side-link">🗓️ احجز جلسة</a>
        <a href="super_admin.html" class="side-link" style="color: var(--accent);">⚙️ إدارة المحتوى</a>
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

  // 5. منطق القائمة الجانبية
  window.toggleSidebar = function() {
    document.body.classList.toggle('sidebar-collapsed');
  }

  // 6. تحميل الصور المخصصة (إذا تم تغييرها من لوحة التحكم)
  const pages = ['atanafas', 'ahzan']; // يمكنك إضافة المزيد
  pages.forEach(page => {
    const customImg = localStorage.getItem(`sana_img_${page}`);
    if (customImg) {
      // البحث عن الصورة في الصفحة الحالية وتحديثها
      const cardImg = document.querySelector(`.card[href="${page}.html"] .card-image`);
      if (cardImg) {
        cardImg.style.backgroundImage = `url('${customImg}')`;
      }
    }
  });

  // 7. الأكواد القديمة
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

// تطبيق النصوص المخصصة على صفحة المسار
document.addEventListener('DOMContentLoaded', () => {
  // تحميل نصوص مسار "أتنفس"
  if (window.location.pathname.includes('atanafas.html')) {
    const qTitle = localStorage.getItem('sana_txt_qalaq_title');
    const qLead = localStorage.getItem('sana_txt_qalaq_lead');
    const bTitle = localStorage.getItem('sana_txt_breath_title');
    const bLead = localStorage.getItem('sana_txt_breath_lead');

    if (qTitle && document.getElementById('txt-qalaq-title')) document.getElementById('txt-qalaq-title').innerText = qTitle;
    if (qLead && document.getElementById('txt-qalaq-lead')) document.getElementById('txt-qalaq-lead').innerText = qLead;
    if (bTitle && document.getElementById('txt-breath-title')) document.getElementById('txt-breath-title').innerText = bTitle;
    if (bLead && document.getElementById('txt-breath-lead')) document.getElementById('txt-breath-lead').innerText = bLead;
  }
});

/* =========================================
   نظام التنبيهات المخصص (Custom Toast Notifications)
   ========================================= */

function showToast(message, type = 'success') {
  // إنشاء عنصر التنبيه
  const toast = document.createElement('div');
  toast.className = `custom-toast ${type}`;
  
  // تحديد الأيقونة واللون
  let icon = '✅';
  if (type === 'error') icon = '❌';
  if (type === 'info') icon = 'ℹ️';

  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-message">${message}</span>
  `;

  document.body.appendChild(toast);

  // إظهار التنبيه
  setTimeout(() => toast.classList.add('show'), 10);

  // إخفاء التنبيه بعد 3 ثوانٍ
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// استبدال دالة alert الافتراضية بدالة showToast
window.alert = function(msg) {
  showToast(msg, 'info');
};

/* =========================================
   نظام النوافذ المنبثقة (Custom Modal) في منتصف الشاشة
   ========================================= */

function showToast(message, type = 'success') {
  // إزالة أي نافذة قديمة
  const oldModal = document.querySelector('.custom-modal-overlay');
  if (oldModal) oldModal.remove();

  // إنشاء العنصر
  const overlay = document.createElement('div');
  overlay.className = 'custom-modal-overlay';

  let icon = '✅';
  let btnText = 'حسناً';
  if (type === 'error') icon = '❌';
  if (type === 'info') icon = 'ℹ️';
  if (type === 'confirm') { icon = '❓'; btnText = 'تأكيد'; }

  overlay.innerHTML = `
    <div class="custom-modal-box ${type}">
      <div class="custom-modal-icon">${icon}</div>
      <div class="custom-modal-message">${message}</div>
      <button class="custom-modal-btn" onclick="this.closest('.custom-modal-overlay').remove()">${btnText}</button>
    </div>
  `;

  document.body.appendChild(overlay);

  // إظهار النافذة بحركة
  setTimeout(() => overlay.classList.add('show'), 10);
}

// استبدال دالة alert الافتراضية
window.alert = function(msg) {
  showToast(msg, 'info');
};
