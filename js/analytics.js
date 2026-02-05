/**
 * Analytics Module - Google Analytics 4 & Custom Event Tracking
 * Gestiona el seguimiento de eventos y comportamiento del usuario
 * @module analytics
 */

// ==========================================
// CONFIGURACIÓN DE GOOGLE ANALYTICS 4
// ==========================================

/**
 * Inicializa Google Analytics 4
 * Reemplaza 'G-XXXXXXXXXX' con tu ID de medición real
 * @function initGoogleAnalytics
 */
function initGoogleAnalytics() {
  const GA_ID = 'G-XXXXXXXXXX'; // Reemplazar con tu ID real

  // Script de Google Analytics
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  // Configuración global
  window.dataLayer = window.dataLayer || [];

  function gtag(...args) {
    window.dataLayer.push(arguments);
  }

  gtag('js', new Date());
  gtag('config', GA_ID, {
    'page_path': window.location.pathname,
    'page_title': document.title,
    'language': document.documentElement.lang || 'es',
  });

  window.gtag = gtag;
  console.log('✅ Google Analytics 4 inicializado');
}

// ==========================================
// EVENTOS PERSONALIZADOS
// ==========================================

/**
 * Registra un evento personalizado en GA4
 * @function trackEvent
 * @param {string} eventName - Nombre del evento
 * @param {object} eventData - Datos adicionales del evento
 */
function trackEvent(eventName, eventData = {}) {
  if (typeof gtag === 'undefined') {
    console.warn('⚠️ Google Analytics no inicializado');
    return;
  }

  gtag('event', eventName, {
    'timestamp': new Date().toISOString(),
    ...eventData,
  });

  console.log(`📊 Evento registrado: ${eventName}`, eventData);
}

/**
 * Registra visualización de página
 * @function trackPageView
 * @param {string} pagePath - Ruta de la página
 * @param {string} pageTitle - Título de la página
 */
function trackPageView(pagePath = window.location.pathname, pageTitle = document.title) {
  trackEvent('page_view', {
    'page_path': pagePath,
    'page_title': pageTitle,
    'page_location': window.location.href,
  });
}

/**
 * Registra clic en CTA (Call To Action)
 * @function trackCTAClick
 * @param {string} ctaText - Texto del botón
 * @param {string} ctaAction - Acción asociada
 * @param {string} ctaLocation - Ubicación en la página
 */
function trackCTAClick(ctaText, ctaAction, ctaLocation = '') {
  trackEvent('cta_click', {
    'cta_text': ctaText,
    'cta_action': ctaAction,
    'cta_location': ctaLocation,
  });
}

/**
 * Registra cambio de plan
 * @function trackPlanSwitch
 * @param {string} planName - Nombre del plan
 */
function trackPlanSwitch(planName) {
  trackEvent('plan_switch', {
    'plan_name': planName,
    'timestamp': new Date().toISOString(),
  });
}

/**
 * Registra envío de formulario de contacto
 * @function trackFormSubmission
 * @param {string} formName - Nombre del formulario
 * @param {object} formData - Datos del formulario (sin datos sensibles)
 */
function trackFormSubmission(formName, formData = {}) {
  // Sanitizar datos sensibles
  const sanitized = { ...formData };
  delete sanitized.email;
  delete sanitized.phone;
  delete sanitized.message;

  trackEvent('form_submit', {
    'form_name': formName,
    'form_data': JSON.stringify(sanitized),
  });
}

/**
 * Registra scroll profundo
 * @function trackScroll
 * @param {number} scrollDepth - Porcentaje de scroll (0-100)
 */
function trackScroll(scrollDepth) {
  trackEvent('scroll_depth', {
    'scroll_percentage': scrollDepth,
  });
}

/**
 * Registra tiempo en página
 * @function trackTimeOnPage
 * @param {number} seconds - Segundos en página
 */
function trackTimeOnPage(seconds) {
  trackEvent('time_on_page', {
    'duration_seconds': Math.round(seconds),
  });
}

/**
 * Registra interacción con sección específica
 * @function trackSectionView
 * @param {string} sectionName - Nombre de la sección
 */
function trackSectionView(sectionName) {
  trackEvent('section_view', {
    'section_name': sectionName,
  });
}

/**
 * Registra clic en enlace externo
 * @function trackExternalLink
 * @param {string} url - URL del enlace
 * @param {string} linkText - Texto del enlace
 */
function trackExternalLink(url, linkText = '') {
  trackEvent('external_link_click', {
    'link_url': url,
    'link_text': linkText,
  });
}

/**
 * Registra búsqueda
 * @function trackSearch
 * @param {string} searchTerm - Término de búsqueda
 * @param {number} results - Número de resultados
 */
function trackSearch(searchTerm, results = 0) {
  trackEvent('search', {
    'search_term': searchTerm,
    'results_count': results,
  });
}

// ==========================================
// CONVERSIONES Y OBJETIVOS
// ==========================================

/**
 * Registra una conversión (e.g., solicitud de demo)
 * @function trackConversion
 * @param {string} conversionName - Nombre de la conversión
 * @param {number} conversionValue - Valor de la conversión
 */
function trackConversion(conversionName, conversionValue = 0) {
  trackEvent('conversion', {
    'conversion_name': conversionName,
    'conversion_value': conversionValue,
    'currency': 'USD',
  });

  // También registrar en GA4 como objetivo
  if (typeof gtag !== 'undefined') {
    gtag('event', conversionName, {
      'value': conversionValue,
      'currency': 'USD',
    });
  }
}

/**
 * Registra interés en plan específico
 * @function trackPlanInterest
 * @param {string} planName - Nombre del plan
 */
function trackPlanInterest(planName) {
  trackConversion('plan_interest', 0);
  trackEvent('plan_interest', {
    'plan_name': planName,
  });
}

/**
 * Registra solicitud de contacto
 * @function trackContactRequest
 */
function trackContactRequest() {
  trackConversion('contact_request', 0);
}

/**
 * Registra descarga de recurso
 * @function trackResourceDownload
 * @param {string} resourceName - Nombre del recurso
 * @param {string} resourceType - Tipo (pdf, doc, etc)
 */
function trackResourceDownload(resourceName, resourceType = '') {
  trackEvent('resource_download', {
    'resource_name': resourceName,
    'resource_type': resourceType,
  });
}

// ==========================================
// CONFIGURACIÓN AUTOMÁTICA DE EVENTOS
// ==========================================

/**
 * Configura tracking automático de clics en botones
 * @function setupAutomaticCTATracking
 */
function setupAutomaticCTATracking() {
  const ctaSelectors = [
    '[data-cta]',
    '.btn-primary',
    '.btn-secondary',
    'button[type="submit"]',
  ];

  ctaSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(btn => {
      btn.addEventListener('click', function(e) {
        const ctaText = this.textContent.trim();
        const ctaAction = this.dataset.cta || this.id || 'unknown';
        const ctaLocation = this.closest('[data-section]')?.dataset.section || 'general';

        trackCTAClick(ctaText, ctaAction, ctaLocation);
      });
    });
  });

  console.log('📊 Tracking automático de CTAs configurado');
}

/**
 * Configura tracking automático de scroll
 * @function setupAutomaticScrollTracking
 */
function setupAutomaticScrollTracking() {
  const scrollThresholds = [25, 50, 75, 100];
  let trackedThresholds = new Set();

  window.addEventListener('scroll', () => {
    const scrollPercentage = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    scrollThresholds.forEach(threshold => {
      if (scrollPercentage >= threshold && !trackedThresholds.has(threshold)) {
        trackedThresholds.add(threshold);
        trackScroll(threshold);
      }
    });
  }, { passive: true });

  console.log('📊 Tracking automático de scroll configurado');
}

/**
 * Configura tracking automático de tiempo en página
 * @function setupAutomaticTimeTracking
 */
function setupAutomaticTimeTracking() {
  let startTime = Date.now();

  // Registrar tiempo al abandonar página
  window.addEventListener('beforeunload', () => {
    const timeSpent = (Date.now() - startTime) / 1000;
    trackTimeOnPage(timeSpent);
  });

  // Registrar cada 5 minutos si el usuario sigue en la página
  setInterval(() => {
    const timeSpent = (Date.now() - startTime) / 1000;
    if (timeSpent > 60) { // Solo si pasó 1+ minuto
      trackTimeOnPage(timeSpent);
    }
  }, 5 * 60 * 1000);

  console.log('📊 Tracking automático de tiempo configurado');
}

/**
 * Configura tracking automático de secciones vistas
 * @function setupAutomaticSectionTracking
 */
function setupAutomaticSectionTracking() {
  const sections = document.querySelectorAll('[data-section]');

  if (sections.length === 0) {
    console.warn('⚠️ No hay secciones con data-section');
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionName = entry.target.dataset.section;
        trackSectionView(sectionName);
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => observer.observe(section));
  console.log('📊 Tracking automático de secciones configurado');
}

// ==========================================
// INICIALIZACIÓN
// ==========================================

/**
 * Inicializa todo el sistema de analytics
 * @function initAnalytics
 */
function initAnalytics() {
  // Verificar si GA4 debe inicializarse
  if (document.body.dataset.analyticsEnabled === 'true' || true) {
    initGoogleAnalytics();
  }

  // Configurar tracking automático
  setupAutomaticCTATracking();
  setupAutomaticScrollTracking();
  setupAutomaticTimeTracking();
  setupAutomaticSectionTracking();

  // Registrar page view inicial
  trackPageView();

  console.log('✅ Sistema de Analytics completamente inicializado');
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnalytics);
} else {
  initAnalytics();
}

// Exportar funciones para uso externo
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initAnalytics,
    trackEvent,
    trackPageView,
    trackCTAClick,
    trackPlanSwitch,
    trackFormSubmission,
    trackScroll,
    trackTimeOnPage,
    trackSectionView,
    trackExternalLink,
    trackSearch,
    trackConversion,
    trackPlanInterest,
    trackContactRequest,
    trackResourceDownload,
    setupAutomaticCTATracking,
    setupAutomaticScrollTracking,
    setupAutomaticTimeTracking,
    setupAutomaticSectionTracking,
  };
}
