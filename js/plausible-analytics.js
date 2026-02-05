/**
 * Plausible Analytics Integration
 * Alternativa privada a Google Analytics
 * @module plausible-analytics
 */

/**
 * Inicializa Plausible Analytics
 * Reemplaza 'oceansbits.com' con tu dominio real
 * @function initPlausibleAnalytics
 */
function initPlausibleAnalytics() {
  const DOMAIN = 'oceansbits.com'; // Reemplazar con tu dominio real

  // Script de Plausible
  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://plausible.io/js/script.js';
  script.setAttribute('data-domain', DOMAIN);

  document.head.appendChild(script);

  // Wait for Plausible to load
  window.plausible = window.plausible || function() {
    (window.plausible.q = window.plausible.q || []).push(arguments);
  };

  console.log('✅ Plausible Analytics inicializado');
}

/**
 * Registra evento personalizado en Plausible
 * @function trackPlausibleEvent
 * @param {string} eventName - Nombre del evento
 * @param {object} eventData - Datos adicionales (max 30 custom properties)
 */
function trackPlausibleEvent(eventName, eventData = {}) {
  if (typeof window.plausible === 'undefined') {
    console.warn('⚠️ Plausible Analytics no inicializado');
    return;
  }

  // Plausible soporta custom properties limitadas
  const props = {};

  // Mapear datos a propiedades válidas
  Object.keys(eventData).slice(0, 30).forEach(key => {
    props[key] = String(eventData[key]).slice(0, 254); // Max 254 caracteres
  });

  window.plausible(eventName, { props });
  console.log(`📊 Evento Plausible registrado: ${eventName}`, eventData);
}

/**
 * Registra clic en CTA
 * @function trackPlausibleCTA
 * @param {string} ctaText - Texto del botón
 * @param {string} ctaAction - Acción del botón
 */
function trackPlausibleCTA(ctaText, ctaAction) {
  trackPlausibleEvent('CTA Click', {
    'button': ctaText,
    'action': ctaAction,
  });
}

/**
 * Registra cambio de plan
 * @function trackPlausiblePlanSwitch
 * @param {string} planName - Nombre del plan
 */
function trackPlausiblePlanSwitch(planName) {
  trackPlausibleEvent('Plan Switch', {
    'plan': planName,
  });
}

/**
 * Registra envío de formulario
 * @function trackPlausibleFormSubmission
 * @param {string} formName - Nombre del formulario
 */
function trackPlausibleFormSubmission(formName) {
  trackPlausibleEvent('Form Submit', {
    'form': formName,
  });
}

/**
 * Registra vista de sección
 * @function trackPlausibleSectionView
 * @param {string} sectionName - Nombre de la sección
 */
function trackPlausibleSectionView(sectionName) {
  trackPlausibleEvent('Section View', {
    'section': sectionName,
  });
}

/**
 * Registra enlace externo
 * @function trackPlausibleExternalLink
 * @param {string} url - URL del enlace
 */
function trackPlausibleExternalLink(url) {
  trackPlausibleEvent('External Link', {
    'url': url,
  });
}

/**
 * Configura tracking automático de secciones con Plausible
 * @function setupPlausibleSectionTracking
 */
function setupPlausibleSectionTracking() {
  const sections = document.querySelectorAll('[data-section]');

  if (sections.length === 0) {
    console.warn('⚠️ No hay secciones con data-section');
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionName = entry.target.dataset.section;
        trackPlausibleSectionView(sectionName);
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => observer.observe(section));
  console.log('📊 Plausible section tracking configurado');
}

/**
 * Configura tracking automático de CTAs con Plausible
 * @function setupPlausibleCTATracking
 */
function setupPlausibleCTATracking() {
  const ctaSelectors = [
    '[data-cta]',
    '.btn-primary',
    '.btn-secondary',
    'button[type="submit"]',
  ];

  ctaSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(btn => {
      btn.addEventListener('click', function() {
        const ctaText = this.textContent.trim();
        const ctaAction = this.dataset.cta || this.id || 'unknown';
        trackPlausibleCTA(ctaText, ctaAction);
      });
    });
  });

  console.log('📊 Plausible CTA tracking configurado');
}

/**
 * Inicializa todo el sistema Plausible
 * @function initPlausible
 */
function initPlausible() {
  initPlausibleAnalytics();
  setupPlausibleSectionTracking();
  setupPlausibleCTATracking();
  console.log('✅ Plausible Analytics completamente inicializado');
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPlausible);
} else {
  initPlausible();
}

// Exportar funciones
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initPlausibleAnalytics,
    trackPlausibleEvent,
    trackPlausibleCTA,
    trackPlausiblePlanSwitch,
    trackPlausibleFormSubmission,
    trackPlausibleSectionView,
    trackPlausibleExternalLink,
    setupPlausibleSectionTracking,
    setupPlausibleCTATracking,
    initPlausible,
  };
}
