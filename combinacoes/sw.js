const CACHE='combinacoes-mobile-v1';
const FILES=['./','./index.html','./manifest.webmanifest','./app-icon-192.png','./app-icon-512.png','./apple-touch-icon.png'];
const SHELL=new Set(FILES.map(p=>new URL(p,self.registration.scope).href));
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('combinacoes-mobile-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{const req=event.request,url=new URL(req.url);if(req.method!=='GET'||url.origin!==self.location.origin||!SHELL.has(url.href))return;event.respondWith(fetch(req).then(res=>{if(res.ok){const copy=res.clone();event.waitUntil(caches.open(CACHE).then(c=>c.put(req,copy)));}return res;}).catch(()=>caches.match(req).then(cached=>cached||Response.error())));});
