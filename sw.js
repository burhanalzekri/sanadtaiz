const CACHE_NAME = 'sana-v1';
const urlsToCache = [
  './index.html',
  './atanafas.html',
  './library.html',
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
