// Imports
importScripts( 'swHelpers/sw-utils.js' );

// Caches
const STATIC_CACHE = "crud-static-v1.0";
const INMUTABLE_CACHE = "crud-inmutable-v1.0";
const DYNAMIC_CACHE = "crud-dynamic-v1.0";

// APP_SHELLS
const STATIC_APP_SHELL = [
    '/users',
    '/user/create',
    '/favicon.ico',
    '/swHelpers/register.js'
];

const INMUTABLE_APP_SHELL = [
    '/css/bootstrap.min.css',
    '/js/bootstrap.bundle.min.js'
];

self.addEventListener('install', e => {

    // Register caches
    const staticCache = caches.open( STATIC_CACHE )
    .then(cache => {
        cache.addAll( STATIC_APP_SHELL );
    });
    const inmutableCache = caches.open( INMUTABLE_CACHE )
    .then(cache => {
        cache.addAll( INMUTABLE_APP_SHELL );
    });

    self.skipWaiting();

    e.waitUntil( Promise.all([ staticCache, inmutableCache ]) );
});

self.addEventListener('activate', e => {
    // Remove cache old versions

    const remove_cache_old_versions = caches.keys()
    .then(keys => {
        keys.forEach(key => {
            if( key.includes( 'static' ) && key !== STATIC_CACHE ){
                return caches.delete( key );
            }

            if( key.includes( 'dynamic' ) && key !== DYNAMIC_CACHE ){
                return caches.delete( key );
            }
        });
    });

    e.waitUntil( remove_cache_old_versions );
});

self.addEventListener('message', e => {
    console.log('message', e)
});

self.addEventListener('fetch', e => {

    var resp = null;
    const request = e.request;
    const method = e.request.method;

    switch( method ){
        case 'POST':
            resp = handlePost( request );
            break;
        default:
            resp = handleGet( request );        
    }


    e.respondWith( resp );
});

self.addEventListener('sync', e => {
    if( e.tag === tag ){
        var requestsSended = sendRequestsToServer();
        e.waitUntil( requestsSended );
    }
});