const CACHE_NAME = 'v1';

const FILES_TO_CACHE = [
    './',
    './upload',
    './images/icons/favicon.ico',
    './images/icons/Icon-36.png',
    './images/icons/Icon-48.png',
    './images/icons/Icon-72.png',
    './images/icons/Icon-96.png',
    './images/icons/Icon-144.png',
    './images/icons/Icon-192.png',
    './images/icons/Icon-512.png',
    './javascripts/index.client.js',
    './javascripts/upload.client.js',
    './stylesheets/style.css'
];

self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Fetch', evt.request.url);
    if (evt.request.mode !== 'navigate') {
        return;
    }
    evt.respondWith(
        fetch(evt.request)
            .catch(() => {
                return caches.open(CACHE_NAME)
                    .then((cache) => {
                        return cache.match('index.html');
                    });
            })
    );
});

