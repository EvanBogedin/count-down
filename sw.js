const CACHE_NAME = 'count-down-cache-v3';
const ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/timer.js',
  '/assets/img/HourGlass192.png',
  '/assets/audio/Chill_Alarm3.mp3'
];

// install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// clean up
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// handle requests from cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});

