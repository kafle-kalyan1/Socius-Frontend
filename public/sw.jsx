
// Define the cache name
const CACHE_NAME = 'socius v-1';

// Define the assets to cache
const urlsToCache = [
 '/index.html',
 '/offline.html',
 '/src/Offline/Offline.jsx',
 '/Favicons/browser.png',
];
const self= this;
// Install the service worker and cache the assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
}); 

// Serve the cached assets when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request)).catch(()=>caches.match('/offline.html'))
  );
});
self.addEventListener('fetch', event => {
   if (navigator.onLine) {
      console.log('Online mode');
   } else {
      console.log('Offline mode');
   }
});

//activate sw
self.addEventListener('activate', event => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);
  event.waitUntil(
    caches.keys()
      .then(keyList => Promise.all(keyList.map(key => {
        if (!cacheWhitelist.includes(key)) {
          return caches.delete(key);
        }
      })))
  ); 
});