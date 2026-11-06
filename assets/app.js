document.addEventListener('DOMContentLoaded', () => {
  // 1. بوابة الموافقة (Modal)
  const modal = document.getElementById('consentModal');
  const consentBtn = document.getElementById('consentBtn');
  if (modal && consentBtn) {
    if (!localStorage.getItem('sana_consent')) {
      modal.style.display = 'flex';
    } else {
      modal.style.display = 'none';
    }
    consentBtn.addEventListener('click', () => {
      localStorage.setItem('sana_consent', 'true');
      modal.style.display = 'none';
    });
  }

  // 2. تفاعل الخطوات (Accordion)
  const stepHeads = document.querySelectorAll('.step-head');
  stepHeads.forEach(head => {
    head.addEventListener('click', () => {
      const step = head.parentElement;
      const isOpen = step.classList.contains('open');
      
      // إغلاق الكل
      document.querySelectorAll('.step').forEach(s => s.classList.remove('open'));
      
      // فتح المطلوب إذا لم يكن مفتوحاً
      if (!isOpen) {
        step.classList.add('open');
      }
    });
  });

  // 3. مساحة التفريغ (Vent)
  const ventText = document.getElementById('ventText');
  const ventClear = document.getElementById('ventClear');
  if (ventText && ventClear) {
    ventClear.addEventListener('click', () => {
      ventText.value = '';
      ventText.focus();
    });
  }
});
