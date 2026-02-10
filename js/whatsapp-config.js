/**
 * CONFIGURACIÓN RÁPIDA DE WHATSAPP
 * 
 * Este archivo contiene TODOS los números que usan WhatsApp en el sitio.
 * Actualiza aquí para cambiar el número en todas las páginas de una vez.
 * 
 * INSTRUCCIONES:
 * 1. Reemplaza +50367892365 con tu número real
 * 2. El formato DEBE ser: +[código país][número completo]
 * 3. Guarda el archivo
 * 4. El cambio se aplica inmediatamente a todas las páginas
 */

// ==========================================
// NÚMERO PRINCIPAL DE WHATSAPP
// ==========================================
// Reemplaza SOLO el número entre comillas
window.WHATSAPP_MAIN_NUMBER = '+50367892365';

// ==========================================
// MENSAJE POR DEFECTO
// ==========================================
// Mensaje que se envía cuando el usuario hace clic
window.WHATSAPP_DEFAULT_MESSAGE = '¡Hola! Me interesa obtener más información sobre vuestros servicios de facturación electrónica.';

// ==========================================
// TOOLTIP (Texto que aparece en hover)
// ==========================================
window.WHATSAPP_TOOLTIP_TEXT = 'Hola, ¿Cómo podemos ayudarte?';

// ==========================================
// NÚMEROS PERSONALIZADOS POR PÁGINA (Opcional)
// ==========================================
window.WHATSAPP_PAGE_CONFIG = {
  'index.html': {
    number: '+50367892365',
    message: '¡Hola! Me interesa obtener más información sobre vuestros servicios de facturación electrónica.'
  },
  'about.html': {
    number: '+50367892365',
    message: '¿Podrían contarme más sobre Oceansbits?'
  },
  'contact.html': {
    number: '+50367892365',
    message: 'Quisiera agendar una llamada para discutir sobre el proyecto.'
  },
  'services.html': {
    number: '+50367892365',
    message: 'Me interesa conocer más detalles sobre vuestros servicios.'
  },
  'caseSucess.html': {
    number: '+50367892365',
    message: '¿Pueden mostrarme casos similares a mi negocio?'
  },
  'desmebración.html': {
    number: '+50367892365',
    message: '¿Cuál es el mejor plan para mi empresa?'
  }
};

// ==========================================
// HORARIOS (Opcional - para mostrar/ocultar)
// ==========================================
window.WHATSAPP_SCHEDULE = {
  enabled: false,              // Cambiar a true para habilitar
  startHour: 8,                // Hora de inicio (0-23)
  endHour: 18,                 // Hora final (0-23)
  daysOfWeek: [1, 2, 3, 4, 5], // Días de la semana (1=lunes, 5=viernes)
};

// ==========================================
// REGIÓN (Opcional - para diferentes números por país)
// ==========================================
window.WHATSAPP_REGION_CONFIG = {
  'SV': {  // El Salvador
    number: '+50367892365',
    message: '¡Hola! Soy de El Salvador.'
  },
  'GT': {  // Guatemala
    number: '+50212345678',
    message: '¡Hola! Soy de Guatemala.'
  },
  'HN': {  // Honduras
    number: '+50412345678',
    message: '¡Hola! Soy de Honduras.'
  }
};

// ==========================================
// COPIAR NÚMERO RÁPIDAMENTE
// ==========================================
// Uso: Copia esto en la consola del navegador para probar el número:
// 
// console.log('Número actual:', window.WHATSAPP_MAIN_NUMBER);
// 
// O para cambiar dinámicamente:
// window.WHATSAPP_MAIN_NUMBER = '+50312345678';
// setWhatsAppNumber('+50312345678');

console.log('✅ Configuración de WhatsApp cargada');
console.log('Número actual:', window.WHATSAPP_MAIN_NUMBER);
