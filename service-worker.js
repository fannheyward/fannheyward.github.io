this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/blog/archives/',
        '/blog/archives/index.html',
        '/css/main.css',
        'https://cdn.jsdelivr.net/npm/autotrack@2.4.1/autotrack.js',
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('v1').then(function(cache) {
      return cache.match(event.request).then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request).then(function(response) {
            if (response && response.ok) {
              cache.put(event.request, response.clone());
            }
            return response;
          });
        }
      });
    })
  );
});

this.addEventListener('activate', function activator(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys
        .filter(function(key) {
          return key.indexOf('v1') !== 0;
        })
        .map(function(key) {
          return caches.delete(key);
        })
      );
    })
  );
});
