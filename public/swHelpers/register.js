registerServiceWorker();

function registerServiceWorker() {
    //if ( !( 'serviceWorker' in navigator ) ) {
    if ( !( 'serviceWorker' in navigator ) ) {
        console.log('Service workers aren\'t supported in this browser.')
        return;
    }

    navigator.serviceWorker.register('/sw.js');
}