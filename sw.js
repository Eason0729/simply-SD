self.addEventListener("install", (event) => {
    console.log("swBasic: install (v:2020/9/17 12:50(GMT)");
    event.waitUntil(
      caches.open('v1').then((cache) => {
        return cache.addAll([
          '/icon/icon64.png',
          '/icon/icon128.png',
          '/icon/icon256.png',
          '/icon/icon512.png',
          '/calculate.svg',
          '/index.css',
          '/index.js',
          '/index.html',
        ]);
      })
    );
  });
  
  self.addEventListener("activate", (event) => {
    //console.log("swBasic: activate");
  });
  
  self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);
    event.respondWith(
      caches.match(event.request).then((response) => {
        if(!response){
          //console.log(`from Internet( ${event.request.url} )`)
          return fetch(event.request);
        }else{
          //console.log(`from cashe( ${event.request.url} )`)
          return response;
        }
        //return response || fetch(event.request);
      })
    );
  });