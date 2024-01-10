const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    new CacheableResponsePlugin({
      // cache only responses with these statuses (0 for opaque responses, 200 for ok responses)
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      // cache for a maximum of 30 days
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// https://developer.chrome.com/docs/workbox/modules/workbox-recipes#warm_strategy_cache
warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === "navigate", pageCache);

// do i even need offlineFallback? It's imported, but not used, there aren't offline.html or any other offline fallbacks in repo?

// Adds asset caching:
registerRoute(
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  // Could also use StaleWhileRevalidate but as CacheFirst is imported for us and the assets are static, using that instead
  new CacheFirst({
    cacheName: "asset-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
