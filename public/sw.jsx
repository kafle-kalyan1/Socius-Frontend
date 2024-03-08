// Define the cache name
const CACHE_NAME = 'socius v-1';

// Define the assets to cache
const urlsToCache = [
    '/index.html',
    '/offline.html',
    '/posts.html',
    '/src/Offline/Offline.jsx',
    '/Favicons/browser.png',
    '/src/Offline/offline.js',
    '/src/Offline/offline.css',
];

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
            .then(response => response || fetch(event.request))
            .catch(() => caches.match('/offline.html'))
    );
});

// Listen for the 'online' event
self.addEventListener('online', event => {
    // Log "Online" when the internet connection is restored
    console.log('Online');
});

// Listen for the 'offline' event
self.addEventListener('offline', event => {
    // Log "Offline" when the internet connection is lost
    console.log('Offline');
});

// Activate the service worker
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys()
            .then(keyList => Promise.all(keyList.map(key => {
                if (!cacheWhitelist.includes(key)) {
                    return caches.delete(key);
                }
            })))
    ); 
});
