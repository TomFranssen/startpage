"use strict";

var cacheName = 'cacheV1';
var cachePagesName = 'cachePagesV1';
var cacheImagesName = 'cacheImagesV1';

var cacheFiles = [
    'index.php',
    'data/links.json',
    'data/instagram.php'
];

self.addEventListener('install', function (event) {
    console.log('From SW: Install!!' , event);

    event.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                return cache.addAll(cacheFiles);
            })
    );

});

self.addEventListener('activate', function (event) {
    console.log('From SW: Activate!!' , event);

    self.clients.claim();
    event.waitUntil(
        caches.keys()
            .then(function(cacheKeys){
                var deletePromises = [];
                for(var i = 0; i < cacheKeys.length; i++){
                    if(cacheKeys[i] != cacheName &&
                        cacheKeys[i] != cachePagesName &&
                        cacheKeys[i] != cacheImagesName){
                        deletePromises.push(caches.delete(cacheKeys[i]));
                    }
                }
                return Promise.all(deletePromises);
            })
    )


});