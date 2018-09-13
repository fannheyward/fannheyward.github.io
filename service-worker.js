const CACHE_NAME = 'fannheyward_blog_1.0.0';

const URLS = [
  // Add URL you want to cache in this list.
  '/',
  '/index.html',
  '/blog/archives/',
  '/blog/archives/index.html',
  '/css/main.css',
  'https://cdn.jsdelivr.net/npm/autotrack@2.4.1/autotrack.js',
];

// Cache resources
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME)
      return cache.addAll(URLS);
    }).then(_ => {
      return self.skipWaiting();
    })
  );
});

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) {
        return request;
      } else {
        return fetch(e.request);
      }
    })
  );
});
