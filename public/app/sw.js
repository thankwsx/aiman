// importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

// workbox.setConfig({
//   debug: true,
// });

// Establish a cache name
const cacheName = "myimages-v1";

// Assets to precache
const precachedAssets = [
  "https://alpha.adbi.moonton.net/e74e41f11a96a1402330.png",
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(cacheName).then(cache => {
    return cache.addAll(precachedAssets);
  }));
});

self.addEventListener("fetch", event => {
  const isPrecachedRequest = precachedAssets.includes(event.request.url);

  if (isPrecachedRequest) {
    event.respondWith(caches.open(cacheName).then(cache => {
      console.log("Cache only request for: " + event.request.url);

      return cache.match(event.request.url);
    }));
  } else {
    console.log("Network only request for: " + event.request.url);

    return;
  }
});


