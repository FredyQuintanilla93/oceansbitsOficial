/**
 * WhatsApp Floating Button
 * Botón flotante de WhatsApp que redirige a conversación
 * @module whatsapp-button
 */

/**
 * Configuración de WhatsApp
 */
const WHATSAPP_CONFIG = {
  phoneNumber: '+50377504099', // Reemplaza con tu número
  message: '¡Hola! Me interesa obtener más información sobre vuestros servicios de facturación electrónica.',
  displayText: 'Hola, ¿Cómo podemos ayudarte?',
};

/**
 * Crea y muestra el botón flotante de WhatsApp
 * @function createWhatsAppButton
 */
function createWhatsAppButton() {
  // Crear contenedor del botón
  const container = document.createElement('div');
  container.id = 'whatsapp-button-container';
  container.innerHTML = `
    <div class="whatsapp-button-wrapper">
      <!-- Botón flotante -->
      <a 
        id="whatsapp-button"
        href="https://wa.me/${WHATSAPP_CONFIG.phoneNumber.replace(/\+/g, '')}?text=${encodeURIComponent(WHATSAPP_CONFIG.message)}"
        target="_blank"
        rel="noopener noreferrer"
        class="whatsapp-button"
        title="Contactar por WhatsApp"
        aria-label="Abrir WhatsApp"
      >
        <svg class="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.393.773-2.54 1.859-3.297 3.176-1.566 2.84-1.948 6.734.269 10.141 1.805 2.752 5.072 4.165 8.541 3.821 2.424-.223 4.389-1.111 5.922-2.666.929-.912 1.614-1.95 2.083-3.12.571-1.448.647-2.984.511-4.522-.268-3.159-2.111-5.866-4.511-7.05-1.565-.789-3.368-1.158-5.083-1.158zm10.906-9.149C17.32 0 10.226 0 7.945 2.281 5.664 4.562 5.664 11.656 7.945 13.937 10.226 16.219 17.32 16.219 19.601 13.937c2.282-2.281 2.282-9.375 0-11.656zm-1.06 15.108c-1.628 1.628-4.26 2.418-6.841 2.418s-5.213-.79-6.841-2.418c-3.77-3.77-3.77-9.912 0-13.682 3.769-3.77 9.912-3.77 13.681 0 3.77 3.77 3.77 9.912 0 13.682z"/>
        </svg>
      </a>

      <!-- Tooltip -->
      <div class="whatsapp-tooltip">
        ${WHATSAPP_CONFIG.displayText}
      </div>
    </div>
  `;

  // Agregar estilos CSS
  const style = document.createElement('style');
  style.textContent = `
    /* WhatsApp Button Styles */
    #whatsapp-button-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }

    .whatsapp-button-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
    }

    .whatsapp-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #25D366 0%, #20BA5A 100%);
      color: white;
      text-decoration: none;
      box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4), 0 8px 24px rgba(0, 0, 0, 0.15);
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      cursor: pointer;
      border: none;
      padding: 0;
      flex-shrink: 0;
    }

    .whatsapp-button:hover {
      transform: scale(1.1) translateY(-2px);
      box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6), 0 12px 32px rgba(0, 0, 0, 0.2);
    }

    .whatsapp-button:active {
      transform: scale(0.95);
    }

    .whatsapp-icon {
      width: 28px;
      height: 28px;
      animation: whatsapp-pulse 2s infinite;
    }

    /* Mostrar tooltip al hover */
    .whatsapp-button-wrapper:hover .whatsapp-tooltip {
      opacity: 1;
      visibility: visible;
    }

    .whatsapp-tooltip {
      background: white;
      color: #333;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      white-space: nowrap;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      pointer-events: none;
    }

    /* Animación de pulso sutil */
    @keyframes whatsapp-pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.8;
      }
    }

    /* Animación de entrada */
    @keyframes whatsapp-slide-in {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    #whatsapp-button-container {
      animation: whatsapp-slide-in 0.5s ease-out;
    }

    /* Responsive - Mobile */
    @media (max-width: 768px) {
      #whatsapp-button-container {
        bottom: 16px;
        right: 16px;
      }

      .whatsapp-button {
        width: 50px;
        height: 50px;
      }

      .whatsapp-icon {
        width: 24px;
        height: 24px;
      }

      .whatsapp-tooltip {
        display: none;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .whatsapp-tooltip {
        background: #2a2a2a;
        color: #fff;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
      }
    }

    /* Animación alternativa - bounce */
    @keyframes whatsapp-bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-4px);
      }
    }

    .whatsapp-button:hover .whatsapp-icon {
      animation: whatsapp-bounce 0.6s ease-in-out;
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(container);

  // Track button click
  const button = document.getElementById('whatsapp-button');
  if (button) {
    button.addEventListener('click', () => {
      if (typeof trackEvent === 'function') {
        trackEvent('whatsapp_click', {
          'phone': WHATSAPP_CONFIG.phoneNumber,
          'timestamp': new Date().toISOString(),
        });
      }
      console.log('📱 WhatsApp button clicked');
    });
  }

  console.log('✅ WhatsApp floating button creado');
}

/**
 * Actualiza el número de WhatsApp
 * @function setWhatsAppNumber
 * @param {string} phoneNumber - Número de teléfono en formato internacional
 * @param {string} message - Mensaje predeterminado
 */
function setWhatsAppNumber(phoneNumber, message = WHATSAPP_CONFIG.message) {
  WHATSAPP_CONFIG.phoneNumber = phoneNumber;
  if (message) {
    WHATSAPP_CONFIG.message = message;
  }

  // Actualizar botón si ya existe
  const button = document.getElementById('whatsapp-button');
  if (button) {
    button.href = `https://wa.me/${phoneNumber.replace(/\+/g, '')}?text=${encodeURIComponent(WHATSAPP_CONFIG.message)}`;
  }

  console.log(`📱 WhatsApp número actualizado: ${phoneNumber}`);
}

/**
 * Muestra/oculta el botón de WhatsApp
 * @function toggleWhatsAppButton
 * @param {boolean} show - true para mostrar, false para ocultar
 */
function toggleWhatsAppButton(show = true) {
  const container = document.getElementById('whatsapp-button-container');
  if (container) {
    container.style.display = show ? 'block' : 'none';
  }
}

/**
 * Elimina el botón de WhatsApp
 * @function removeWhatsAppButton
 */
function removeWhatsAppButton() {
  const container = document.getElementById('whatsapp-button-container');
  if (container) {
    container.remove();
  }
  console.log('❌ WhatsApp button removido');
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createWhatsAppButton);
} else {
  createWhatsAppButton();
}

// Exportar funciones para uso externo
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createWhatsAppButton,
    setWhatsAppNumber,
    toggleWhatsAppButton,
    removeWhatsAppButton,
    WHATSAPP_CONFIG,
  };
}
