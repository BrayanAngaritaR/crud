// Imports
importScripts( 'swHelpers/sw-db.js' );

function handlePost( request ){

    // Si el navegador soporta envío de peticiones offline
    if( self.registration.sync ) return saveToDb( request.clone() );
    
    return fetch( request.clone() );
}

function handleGet( request ){

    // Primero hace la petición al server
    return fetch( request )
    .then(res => {

        // Si la petición al server falla, entonces busca ese mismo recurso en la cache
        if( !res ) caches.match( request );

        caches.match( request )
        .then(itMatches => {

            // Si el recurso se obtuvo correctamente del server y todavía no está en cache, entonces lo guardamos en cache (DYNAMIC_CACHE)
            if( !itMatches ){
                caches.open( DYNAMIC_CACHE )
                .then(dynamicCache => {
                    if( !request.url.includes('chrome-extension') ) dynamicCache.put( request, res );
                });
            }
        });

        return res.clone();
    })
    .catch( caches.match( request ) );
}

function sendRequestsToServer( requests ){

    var requests = [];

    db.allDocs({ include_docs : true })
    .then(docs => {
                
        docs.rows.forEach(row => {
            const doc = row.doc;

            const requestSended = fetch( row.doc.url, {
                method: 'POST',
                headers: {
                    'Content-Type'      : 'application/json;charset=UTF-8'
                },
                body: JSON.stringify( doc )
            })
            .then(() => {
                db.remove( doc );
            });

            /*const requestSended = fetch( doc.url, {
                method: 'POST',
                headers: {
                    'Content-Type'      : 'application/x-www-form-urlencoded;charset=UTF-8',
                    //'X-CSRF-TOKEN'      : doc.csrf,
                    //'X-Requested-With'  : 'XMLHttpRequest',
                    //'X-XSRF-TOKEN'      : doc.xsrf
                },
                body: JSON.stringify( doc )
            })
            .then(() => {
                return db.remove( doc );
            });*/

            requests.push( requestSended );
        });

    });

    // Esperar hasta que se ejecuten todas las peticiones de la DB
    return Promise.all( requests );
}