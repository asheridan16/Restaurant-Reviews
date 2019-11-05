// Files to be cached
const cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
];

// Add Files to Cache when Installion is started
self.addEventListener('install', function(x) {
    x.waitUntil(
        caches.open('v1').then(cache => cache.addAll(cacheFiles))
    );
});

// Fetch items from Cache if needed
self.addEventListener('fetch', (x) => {
    x.respondWith(
        caches.match(x.request).then((response) => {
            if(response) {
                return response;
            }
            else {
                return fetch(x.request)
                .then((response) => {
                    const clonedResponse = response.clone();
                    caches.open('v1').then(cache => cache.put(x.request, clonedResponse)
                    )
                    return response;
                })
                .catch(err => console.error(err));
            }
        })
    );
});