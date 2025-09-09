const CACHE = 'pwa-v1';
const ASSETS = [
  '/diy-fueling/DIYfueling.html',
  '/diy-fueling/manifest.json',
  '/diy-fueling/icons/icon-192.png',
  '/diy-fueling/icons/icon-512.png',
  '/diy-fueling/icons/apple-touch-icon-180.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((r) => r || fetch(event.request))
  );
});
