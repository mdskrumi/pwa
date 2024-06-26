const assets = ["/", "app.js"];

self.addEventListener("install", (event) => {
  console.log("SW install complete");

  event.waitUntil(
    caches.open("assets").then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", () => {
  console.log("SW activate complete");
});

// Cache First Strategy
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((cachedResponse) => {
//       return (
//         cachedResponse ||
//         fetch(event.request).then((networkResponse) => {
//           return caches.open("assets").then((cache) => {
//             cache.put(event.request.url, networkResponse.clone());
//             return networkResponse;
//           });
//         })
//       );
//     })
//   );
// });

// Network First Strategy
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        return caches.open("assets").then((cache) => {
          cache.put(event.request.url, networkResponse.clone());
          return networkResponse;
        });
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          return cachedResponse;
        });
      })
  );
});
