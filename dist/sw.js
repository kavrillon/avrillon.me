importScripts("precache-manifest.d610bdd064c9d2f21910fa445c3cb5c9.js", "https://storage.googleapis.com/workbox-cdn/releases/4.1.0/workbox-sw.js");

workbox.setConfig({
  debug: false,
});

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.routing.registerRoute(/\.(?:js|css|html)$/, new workbox.strategies.StaleWhileRevalidate());
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

workbox.googleAnalytics.initialize();

workbox.precaching.precacheAndRoute(self.__precacheManifest);

