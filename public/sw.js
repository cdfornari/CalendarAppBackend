importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.loadModule('workbox-background-sync');
workbox.precaching.precacheAndRoute([{"revision":"8abc48d2d13bdf275cb2dcb60323b03e","url":"asset-manifest.json"},{"revision":"c92b85a5b907c70211f4ec25e29a8c4a","url":"favicon.ico"},{"revision":"b450c41110f57eec1042d8bd6e3128b5","url":"index.html"},{"revision":"33dbdd0177549353eeeb785d02c294af","url":"logo192.png"},{"revision":"917515db74ea8d1aee6a246cfbcc0b45","url":"logo512.png"},{"revision":"66fae9dd8a0c6dfeb521e8a7c5732c8b","url":"manifest.json"},{"revision":"fa1ded1ed7c11438a9b0385b1e112850","url":"robots.txt"},{"revision":"a1dc67d4d9d56cd89d448d4e5fb0e210","url":"static/css/main.bc8f44a8.css"},{"revision":"fe4a2714dd328c9fcb59b13dcc8c5572","url":"static/js/main.5c9ac6d1.js"},{"revision":"acc395ed6b85b9232ed2fc42c65d7291","url":"static/js/main.5c9ac6d1.js.LICENSE.txt"}]);

const {registerRoute} = workbox.routing;
const {CacheFirst,NetworkFirst,NetworkOnly} = workbox.strategies;
const {BackgroundSyncPlugin} = workbox.backgroundSync;

const cacheNF = [
    '/api/auth/renew',
    '/api/events'
]

registerRoute(
    ({req,url}) => cacheNF.includes(url.pathname) ? true : false,
    new NetworkFirst()
)

const cacheCF = [
    'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
]

registerRoute(
    ({req,url}) => cacheCF.includes(url.href) ? true : false,
    new CacheFirst()
)

//offline requests

const bgSyncPlugin = new BackgroundSyncPlugin('offline-requests', {
    maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
    ({req,url}) => url.pathname === '/api/events' ? true : false,
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'POST'
)

registerRoute(
    ({req,url}) => url.pathname.includes('/api/events/') ? true : false,
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'PUT'
)

registerRoute(
    ({req,url}) => url.pathname.includes('/api/events/') ? true : false,
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'DELETE'
)