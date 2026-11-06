import re
with open('index.html', 'r', encoding='utf-8') as f: c = f.read()
new_hero = '''<section class="hero-3d-container"><div class="hero-3d-glow"></div><div class="hero-3d-card capsule"><h1 class="hero-3d-title">سند تعز</h1><p class="hero-3d-subtitle">خطوات صغيرة يومية تعيد لك الإحساس بالأمان.</p><div class="hero-3d-buttons"><a href="skills.html" class="btn-3d gold">⚡ تحتاج تهدئة الآن؟</a><a href="booking.html" class="btn-3d green">🗓️ احجز جلسة مع مختص</a></div></div></section>'''
c = re.sub(r'<section class="hero.*?</section>', new_hero, c, flags=re.DOTALL)
with open('index.html', 'w', encoding='utf-8') as f: f.write(c)
print('✅ تم الاستبدال')
