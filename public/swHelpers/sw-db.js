const db = new PouchDB('crud_db');
const tag = "new-user";

function saveToDb( request )
{
    return request.clone().json()
    .then(body => {
        const builtRequest = {
            _id: new Date().toISOString(),
            url: request.clone().url,
            method: body.method,
            body: body
        };

        return db.put( builtRequest )
        .then(() => {
            self.registration.sync.register( tag ); 
            return body;   
        });
    });
}