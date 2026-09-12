/* =========================================================
   ME/CFS Symptom-Tracker – sw.js (Service Worker)
   Cache-First-Strategie für Offline-Betrieb.
   ========================================================= */

// ---------- Versionierung ----------
// WICHTIG: Bei jedem Release die VERSION erhöhen (Semantic Versioning, z. B. 'v9.0.1' oder 'v9.1.0').
// So erkennt der Browser den neuen Service Worker und leert den alten Cache.
const VERSION = 'v9.0.1';
const CACHE_NAME = `mecfs-tracker-${VERSION}`;

// Beim ersten Install zu cachende Dateien (App-Shell)
const CACHE_URLS = [
  './',
  'index.html',
  'style.css',
  'core.js',
  'app.js',
  'manifest.json',
  'icon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

// ---------- install: App-Shell cachen ----------
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHE_URLS))
  );
  self.skipWaiting();
});

// ---------- activate: alte Caches löschen ----------
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
      .then(() =>
        // Offene App über das Update informieren (weiches Update)
        self.clients.matchAll({ type: 'window' }).then((clients) => {
          clients.forEach((client) => client.postMessage({ type: 'UPDATE_READY' }));
        })
      )
  );
});

// ---------- fetch: Cache First, then Network ----------
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request)
        .then((networkResponse) => {
          // Erfolgreiche, gleich-origin GET-Antworten zusätzlich cachen
          if (networkResponse && networkResponse.ok && networkResponse.type === 'basic') {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        })
        .catch(() => {
          // Offline-Fallback für Navigationsanfragen
          if (event.request.mode === 'navigate') {
            return caches.match('./');
          }
          return undefined;
        });
    })
  );
});
