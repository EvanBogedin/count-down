const CACHE_NAME = 'count-down-cache-v4';
const ASSETS = [
  '/count-down/',
  '/count-down/index.html',
  '/count-down/css/style.css',
  '/count-down/js/timer.js',
  '/count-down/assets/img/HourGlass192.png',
  '/count-down/assets/audio/Chill_Alarm3.mp3'
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

