const CACHE_NAME = "cappy-hoding-second-pwa";

var urlsToCache = [
  "/",
  "/service-worker.js",
  "/manifest.json",
  "/nav.html",
  "/index.html",
  "/images/404.jpg",
  "/images/bdc.jpeg",
  "/images/empty-bookmark.png",
  "/images/icon.png",
  "/images/pwa.png",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/api.js",
  "/js/db.js",
  "/js/idb.js",
  "/js/nav.js",
  "/js/view-helper.js",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function (response) {
        if (response) {
          return response;
        }

        console.log(event.request.url);
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', event => {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Hello from MainBola';
  }

  var options = {
    body: body,
    icon: 'images/icon.png',
    vibrate: [50, 75, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('MainBola', options)  
  );
});