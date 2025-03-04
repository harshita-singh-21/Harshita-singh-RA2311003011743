self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('ecommerce-cache').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/manifest.json'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});

self.addEventListener('push', event => {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/icon.png'
    });
});