
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
});


// cache files

const cacheName = "epw_PWA-v1";
const appShellFiles = [
  '/',
  '/index.html',
  '/css',
  '/css/style.css',
  '/css/fonts/',
  '/javascript/',
  '/javascript/script.js'
]



const images = [];
for (let i = 0; i < pic.length; i++) {
  images.push(`img/${pic[i].slug}.png`);
}


// Combine arrays

const contentToCache = appShellFiles.concat(images);



self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(contentToCache);
  })());
});




self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) { return r; }
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});








// Clear old cache

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
      if (key === cacheName) { return; }
      return caches.delete(key);
    }))
  }));
});

