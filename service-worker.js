this.addEventListener("install", function(event) {
  this.skipWaiting();
  event.waitUntil(
    caches.open("v1").then(function(cache) {
      return cache.addAll([
        "/",
        "/index.html",
        "/blog/archives/",
        "/blog/archives/index.html",
        "/css/main.css",
        "https://cdn.jsdelivr.net/npm/autotrack@2.4.1/autotrack.js"
      ]);
    })
  );
});

this.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.open("v1").then(async function(cache) {
      const response = await cache.match(event.request);
      if (response) {
        return response;
      } else {
        return fetch(event.request).then(function(response_1) {
          if (response_1 && response_1.ok) {
            cache.add(event.request);
          }
          return response_1;
        });
      }
    })
  );
});

this.addEventListener("activate", function activator(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(function(key) {
          return caches.delete(key);
        })
      );
    })
  );
});
