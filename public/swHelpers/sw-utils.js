function handlePost( request ){

    // Si el navegador soporta envío de peticiones offline, se guarda petición en DB
    if( self.registration.sync ) return saveToDb( request.clone() );
    
    // Si el navegador no soporta peticiones offline, entonces se hace la petición inmediatamente y no se guarda en DB
    return fetch( request.clone() );
}

function handleGet( request ){

    return fetch( request.clone() )
    .then(res => {

        if( !res ) return caches.match(request.clone());

        if ( !request.clone().url.includes("chrome-extension") ) {
            
            // Lo guardamos en cache ( DYNAMIC_CACHE ) y lo devolvemos una vez guardado
            return caches.open( DYNAMIC_CACHE )
            .then(dynamicCache => {
                
                return dynamicCache.put( request.clone(), res.clone() )
                .then(() => {
                    return res.clone();
                });
            });
        }

        return res.clone();
    })
    .catch( caches.match(request.clone()) );
}

function sendRequestsToServer( requests ){

    var requests = [];

    db.allDocs({ include_docs : true })
    .then(docs => {
                
        docs.rows.forEach(row => {
            const doc = row.doc;

            console.log( "Enviando requests a Server..." )
            const requestSended = fetch( row.doc.url, {
                method: row.doc.method,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify( doc.body )
            })
            .then(() => {
                db.remove( doc );
            });

            requests.push( requestSended );
        });

    });

    // Esperar hasta que se ejecuten todas las peticiones de la DB
    return Promise.all( requests );
}