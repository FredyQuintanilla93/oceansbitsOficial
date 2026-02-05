/**
 * Service Worker para Oceansbits PWA
 * Proporciona funcionalidad offline y mejora de performance
 */

const CACHE_NAME = 'oceansbits-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/contact.html',
  '/services.html',
  '/caseSucess.html',
  '/desmebración.html',
  '/js/planes.js',
  '/manifest.json',
  '/img/Recurso 1.png'
];

/**
 * Evento de instalación del Service Worker
 * Almacena en caché los assets estáticos
 */
self.addEventListener('install', event => {
  console.log('🔧 Service Worker instalándose...');
  
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('📦 Almacenando assets estáticos en caché');
      return cache.addAll(STATIC_ASSETS).catch(error => {
        console.warn('⚠️ Algunos assets no pudieron ser cacheados:', error);
        // No fallar la instalación si faltan algunos assets
      });
    })
  );
  
  self.skipWaiting();
});

/**
 * Evento de activación del Service Worker
 * Limpia cachés antiguos
 */
self.addEventListener('activate', event => {
  console.log('✨ Service Worker activándose...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  self.clients.claim();
});

/**
 * Evento de fetch - Estrategia Cache First, Network Fallback
 * Intenta servir desde caché primero, luego de red
 */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorar peticiones no-GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Ignorar peticiones a dominios externos
  if (url.origin !== location.origin) {
    return;
  }
  
  // Estrategia: Cache First, Network Fallback
  event.respondWith(
    caches.match(request).then(response => {
      if (response) {
        console.log('✅ Sirviendo desde caché:', request.url);
        return response;
      }
      
      return fetch(request).then(response => {
        // No cachear respuestas que no sean OK
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        
        // Clonar la respuesta para guardar en caché
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseToCache);
        });
        
        return response;
      }).catch(error => {
        console.error('❌ Error en fetch:', error);
        
        // Retornar página de offline si existe
        if (request.destination === 'document') {
          return caches.match('/index.html');
        }
      });
    })
  );
});

/**
 * Escuchar mensajes desde los clientes
 */
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('🚀 Service Worker cargado correctamente');
