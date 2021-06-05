registerServiceWorker();

function registerServiceWorker() {
    //if ( ( 'serviceWorker' in navigator ) ) {
    if ( navigator.serviceWorker ) {
        return navigator.serviceWorker.register('/sw.js');
    }

    console.log('Service workers aren\'t supported in this browser.')
    return;
}