// Dumbbell Loader — service worker (offline shell + installability)
// __BUILD__ is replaced with the commit SHA at deploy time so every release
// ships a distinct worker, which is what triggers the update-and-reload flow.
const CACHE = "dumbbell-loader-__BUILD__";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png",
  "./fonts/plex-mono-400.woff2",
  "./fonts/plex-mono-500.woff2",
  "./fonts/plex-mono-600.woff2",
  "./fonts/plex-sans-500.woff2",
  "./fonts/plex-sans-600.woff2",
  "./fonts/plex-sans-700.woff2",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function cachePut(req, res) {
  if (res && (res.ok || res.type === "opaque")) {
    caches.open(CACHE).then((c) => c.put(req, res));
  }
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  // Page loads: network-first so updates show, cached shell when offline.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          cachePut(req, res.clone());
          return res;
        })
        .catch(() => caches.match("./index.html").then((r) => r || caches.match("./")))
    );
    return;
  }

  // Assets and web fonts: cache-first, then network (and cache for next time).
  e.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req)
          .then((res) => {
            cachePut(req, res.clone());
            return res;
          })
          .catch(() => hit)
    )
  );
});
