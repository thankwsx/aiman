
// Establish a cache name
const cacheName = "MyFancyCacheName_v1";

// Assets to precache
const precachedAssets = [
  "https://cdn.glitch.me/32cd740a-9733-4e5d-b961-b3aed2769895%2Fpossum1.jpg",
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

console.log(self);
