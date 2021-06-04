// Imports
importScripts( 'js/pouchdb.min.js' );

const db = new PouchDB('crud_db');
const tag = "new-user";
const customResponse = "Guardado offline";

function saveToDb(request){

    return request.json()
    .then(text => {
        const builtRequest = {
            _id: new Date().toISOString(),
            url: 'https://crud.test/user/create',
            ...text
        };

        return db.put( builtRequest )
        .then(res => {
            self.registration.sync.register( tag );       
            return new Response( customResponse );
        });
    });

}