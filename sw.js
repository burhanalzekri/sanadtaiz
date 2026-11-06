const CACHE_NAME = 'sana-taiz-v4';
const urlsToCache = [
  './',
  './index.html',
  './atanafas.html',
  './anam.html',
  './ahzan.html',
  './arabi.html',
  './asmod.html',
  './salam.html',
  './ghadab.html',
  './skills.html',
  './library.html',
  './articles.html',
  './assessments.html',
  './wellbeing.html',
  './gad7.html',
  './phq9.html',
  './pcl5.html',
  './emergency.html',
  './assets/style.css',
  './assets/app.js',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
