// Imports
importScripts("js/pouchdb.min.js");
importScripts("swHelpers/sw-utils.js");
importScripts("swHelpers/sw-db.js");

// Users Helpers
const USERS_NUM = 15;
const usersViews = Array( USERS_NUM ).fill().map((_, i) => `users/${100-i}`);
const usersEdits = Array( USERS_NUM ).fill().map((_, i) => `users/${100-i}/edit`);

// Caches
const STATIC_CACHE = "crud-static-v2.0";
const INMUTABLE_CACHE = "crud-inmutable-v2.0";
const DYNAMIC_CACHE = "crud-dynamic-v2.0";
const USERS_CACHE = "crud-users-v2.0";

// APP_SHELLS
const STATIC_APP_SHELL = [
    "/",
    "users",
    "user/create",
    "swHelpers/register.js",
    "swHelpers/sw-db.js",
    "swHelpers/sw-utils.js",
    "favicon.ico"
];

const INMUTABLE_APP_SHELL = [
    "css/bootstrap.min.css",
    "js/bootstrap.bundle.min.js",
    "js/pouchdb.min.js",
    "js/axios.min.js",
    "js/axios.min.map",
    "css/bootstrap.min.css.map",
    "js/bootstrap.bundle.min.js.map",
    "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap",
    "https://fonts.gstatic.com/s/nunito/v16/XRXW3I6Li01BKofA6sKUYevIWzgPDA.woff2",
    "https://fonts.gstatic.com/s/nunito/v16/XRXV3I6Li01BKofINeaBTMnFcQ.woff2"
];

self.addEventListener("install", (e) => {

    
    // Register caches
    const staticCache = caches.open(STATIC_CACHE).then((cache) => {
        cache.addAll(STATIC_APP_SHELL);
    });
    const inmutableCache = caches.open(INMUTABLE_CACHE).then((cache) => {
        cache.addAll(INMUTABLE_APP_SHELL);
    });
    const usersCache = caches.open(USERS_CACHE).then((cache) => {
        cache.addAll( usersEdits );
        cache.addAll( usersViews );
    });

    self.skipWaiting();

    e.waitUntil(Promise.all([ staticCache, inmutableCache, usersCache ]));
});

self.addEventListener("activate", (e) => {
    // Remove cache old versions
    const remove_cache_old_versions = caches.keys().then((keys) => {
        keys.forEach((key) => {
            if (key.includes("static") && key !== STATIC_CACHE) {
                return caches.delete(key);
            }

            if (key.includes("dynamic") && key !== DYNAMIC_CACHE) {
                return caches.delete(key);
            }
        });
    });

    e.waitUntil(remove_cache_old_versions);
});

self.addEventListener("fetch", (e) => {

    var response = null;
    const request = e.request;
    const method = e.request.method;

    switch ( method ) {
        case "POST":
            response = handlePost( request.clone() )
            break;
        case "DELETE":
            response = handlePost( request.clone() )
            break;
        default:
            response = handleGet( request.clone() )
    }

    e.respondWith( response );
});

self.addEventListener("sync", (e) => {
    if (e.tag === tag) {
        var requestsSended = sendRequestsToServer();
        e.waitUntil(requestsSended);
    }
});
