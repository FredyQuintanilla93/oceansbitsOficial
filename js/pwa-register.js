/**
 * PWA Registration Script
 * Registra el Service Worker y maneja actualizaciones
 */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/js/sw.js').then(registration => {
      console.log('✅ Service Worker registrado exitosamente:', registration);
      
      // Escuchar actualizaciones del Service Worker
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // Nueva versión disponible
            console.log('📦 Nueva versión disponible');
            showUpdateNotification();
          }
        });
      });
    }).catch(error => {
      console.error('❌ Error al registrar Service Worker:', error);
    });
    
    // Verificar actualizaciones cada hora
    setInterval(() => {
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration) {
          registration.update();
        }
      });
    }, 60 * 60 * 1000); // 1 hora
  });
  
  // Manejar actualizaciones cuando el Service Worker se activa
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('🔄 Service Worker actualizado');
  });
} else {
  console.warn('⚠️ Service Workers no soportados en este navegador');
}

/**
 * Mostrar notificación de actualización disponible
 */
function showUpdateNotification() {
  // Crear elemento de notificación
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #1A85D1;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 9999;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 12px;
  `;
  
  notification.innerHTML = `
    <span style="flex: 1;">Nueva versión disponible</span>
    <button id="update-btn" style="
      background: white;
      color: #1A85D1;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      font-size: 13px;
    ">Actualizar</button>
    <button id="close-btn" style="
      background: transparent;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 20px;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    ">×</button>
  `;
  
  document.body.appendChild(notification);
  
  // Botón de actualizar
  document.getElementById('update-btn').addEventListener('click', () => {
    window.location.reload();
  });
  
  // Botón de cerrar
  document.getElementById('close-btn').addEventListener('click', () => {
    notification.remove();
  });
  
  // Auto cerrar después de 10 segundos
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 10000);
}

/**
 * Detectar conexión offline
 */
window.addEventListener('online', () => {
  console.log('🟢 Conexión restaurada');
});

window.addEventListener('offline', () => {
  console.log('🔴 Conexión perdida - usando caché');
});

console.log('📱 PWA Script cargado correctamente');
