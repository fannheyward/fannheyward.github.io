importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

workbox.core.setCacheNameDetails({
  prefix: "im.fann",
  suffix: "v2"
});

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.googleAnalytics.initialize();

workbox.routing.registerRoute(
  /\.(?:js|json|css)$/,
  new workbox.strategies.StaleWhileRevalidate()
);
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  new workbox.strategies.CacheFirst()
);
