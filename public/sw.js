/**
 * PWA Service Worker (sw.js)
 * 
 * Think of this as a background script running silently in the browser.
 * It intercepts network requests (like opening a page or loading an icon)
 * and serves cached files instead of requesting them from the internet.
 * This makes the app run offline, feel incredibly fast, and qualifies it as an installable app!
 */

// Name of our virtual cache container. We increment this version if we update core designs/assets
const CACHE_NAME = 'folja-cache-v1';

// List of core files/assets we want to download and cache immediately when the app is opened
const ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/manifest.json',
  '/pwa-icon.svg',
  '/pwa-icon-maskable.svg'
];

/**
 * 1. INSTALL EVENT
 * Triggered the very first time a user visits the website.
 * We download all files in the `ASSETS` list and save them inside the cache database.
 */
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

/**
 * 2. ACTIVATE EVENT
 * Triggered when a new version of the Service Worker is loaded.
 * We clean up and delete any old versions of the cache to free up browser storage.
 */
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

/**
 * 3. FETCH EVENT
 * Intercepts every resource request (e.g. image loads, styling imports).
 * We check if the requested file is already saved in our offline cache.
 * - If yes: return the cached file immediately (zero internet needed!).
 * - If no: download it from the live internet normally.
 */
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
