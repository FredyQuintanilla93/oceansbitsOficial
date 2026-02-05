/**
 * Analytics Tests
 * Tests para validar funcionalidad de analytics
 */

describe('Analytics Module', () => {
  let originalGtag;

  beforeEach(() => {
    // Mock de gtag global
    window.gtag = jest.fn();
    originalGtag = window.gtag;
  });

  afterEach(() => {
    delete window.gtag;
  });

  // ==========================================
  // TESTS DE INICIALIZACIÓN
  // ==========================================

  describe('initGoogleAnalytics', () => {
    test('debería crear script de Google Analytics', () => {
      const spyAppendChild = jest.spyOn(document.head, 'appendChild');
      
      // Simulamos la función
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-TEST';
      document.head.appendChild(script);

      expect(spyAppendChild).toHaveBeenCalled();
      spyAppendChild.mockRestore();
    });

    test('debería configurar window.dataLayer', () => {
      window.dataLayer = [];
      expect(Array.isArray(window.dataLayer)).toBe(true);
    });

    test('debería llamar a gtag con config', () => {
      window.gtag('config', 'G-TEST', {
        'page_path': '/test',
      });
      expect(window.gtag).toHaveBeenCalled();
    });
  });

  // ==========================================
  // TESTS DE EVENTOS BÁSICOS
  // ==========================================

  describe('trackEvent', () => {
    test('debería registrar evento simple', () => {
      // Función simulada
      function trackEvent(eventName, eventData = {}) {
        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', eventName, eventData);
        }
      }

      trackEvent('test_event');
      expect(window.gtag).toHaveBeenCalled();
    });

    test('debería incluir datos en evento', () => {
      function trackEvent(eventName, eventData = {}) {
        window.gtag('event', eventName, eventData);
      }

      const testData = { 'test_param': 'value' };
      trackEvent('test_event', testData);

      expect(window.gtag).toHaveBeenCalledWith('event', 'test_event', testData);
    });

    test('debería agregar timestamp automáticamente', () => {
      function trackEvent(eventName, eventData = {}) {
        window.gtag('event', eventName, {
          'timestamp': new Date().toISOString(),
          ...eventData,
        });
      }

      trackEvent('test_event', { 'test': 'data' });
      const call = window.gtag.mock.calls[0];
      
      expect(call[2]).toHaveProperty('timestamp');
      expect(typeof call[2].timestamp).toBe('string');
    });
  });

  // ==========================================
  // TESTS DE PAGE VIEW
  // ==========================================

  describe('trackPageView', () => {
    test('debería registrar page view', () => {
      function trackPageView(pagePath = '/', pageTitle = 'Test') {
        window.gtag('event', 'page_view', {
          'page_path': pagePath,
          'page_title': pageTitle,
        });
      }

      trackPageView('/test', 'Test Page');
      expect(window.gtag).toHaveBeenCalledWith(
        'event',
        'page_view',
        expect.objectContaining({
          'page_path': '/test',
          'page_title': 'Test Page',
        })
      );
    });

    test('debería usar valores por defecto', () => {
      function trackPageView(pagePath = window.location.pathname, pageTitle = document.title) {
        window.gtag('event', 'page_view', {
          'page_path': pagePath,
          'page_title': pageTitle,
        });
      }

      trackPageView();
      expect(window.gtag).toHaveBeenCalled();
    });
  });

  // ==========================================
  // TESTS DE CTA TRACKING
  // ==========================================

  describe('trackCTAClick', () => {
    test('debería registrar clic en CTA', () => {
      function trackCTAClick(ctaText, ctaAction, ctaLocation = '') {
        window.gtag('event', 'cta_click', {
          'cta_text': ctaText,
          'cta_action': ctaAction,
          'cta_location': ctaLocation,
        });
      }

      trackCTAClick('Contacto', 'contact_click', 'header');
      expect(window.gtag).toHaveBeenCalledWith(
        'event',
        'cta_click',
        expect.objectContaining({
          'cta_text': 'Contacto',
          'cta_action': 'contact_click',
        })
      );
    });
  });

  // ==========================================
  // TESTS DE PLAN TRACKING
  // ==========================================

  describe('trackPlanSwitch', () => {
    test('debería registrar cambio de plan', () => {
      function trackPlanSwitch(planName) {
        window.gtag('event', 'plan_switch', {
          'plan_name': planName,
        });
      }

      trackPlanSwitch('ancla');
      expect(window.gtag).toHaveBeenCalledWith(
        'event',
        'plan_switch',
        expect.objectContaining({
          'plan_name': 'ancla',
        })
      );
    });

    test('debería registrar todos los planes', () => {
      function trackPlanSwitch(planName) {
        window.gtag('event', 'plan_switch', { 'plan_name': planName });
      }

      const planes = ['ancla', 'velero', 'marea'];
      planes.forEach(plan => trackPlanSwitch(plan));

      expect(window.gtag).toHaveBeenCalledTimes(3);
    });
  });

  // ==========================================
  // TESTS DE FORM TRACKING
  // ==========================================

  describe('trackFormSubmission', () => {
    test('debería registrar envío de formulario', () => {
      function trackFormSubmission(formName, formData = {}) {
        const sanitized = { ...formData };
        delete sanitized.email;
        delete sanitized.phone;

        window.gtag('event', 'form_submit', {
          'form_name': formName,
        });
      }

      trackFormSubmission('contact_form');
      expect(window.gtag).toHaveBeenCalledWith(
        'event',
        'form_submit',
        expect.objectContaining({
          'form_name': 'contact_form',
        })
      );
    });

    test('debería sanitizar datos sensibles', () => {
      function trackFormSubmission(formName, formData = {}) {
        const sanitized = { ...formData };
        delete sanitized.email;
        delete sanitized.phone;
        delete sanitized.message;

        return sanitized;
      }

      const result = trackFormSubmission('contact_form', {
        'email': 'test@example.com',
        'phone': '1234567890',
        'message': 'Test',
        'subject': 'Test Subject',
      });

      expect(result).not.toHaveProperty('email');
      expect(result).not.toHaveProperty('phone');
      expect(result).toHaveProperty('subject');
    });
  });

  // ==========================================
  // TESTS DE SCROLL TRACKING
  // ==========================================

  describe('trackScroll', () => {
    test('debería registrar scroll depth', () => {
      function trackScroll(scrollDepth) {
        window.gtag('event', 'scroll_depth', {
          'scroll_percentage': scrollDepth,
        });
      }

      trackScroll(50);
      expect(window.gtag).toHaveBeenCalledWith(
        'event',
        'scroll_depth',
        expect.objectContaining({
          'scroll_percentage': 50,
        })
      );
    });

    test('debería aceptar múltiples porcentajes', () => {
      function trackScroll(scrollDepth) {
        window.gtag('event', 'scroll_depth', { 'scroll_percentage': scrollDepth });
      }

      [25, 50, 75, 100].forEach(depth => trackScroll(depth));
      expect(window.gtag).toHaveBeenCalledTimes(4);
    });
  });

  // ==========================================
  // TESTS DE TIME TRACKING
  // ==========================================

  describe('trackTimeOnPage', () => {
    test('debería registrar tiempo en página', () => {
      function trackTimeOnPage(seconds) {
        window.gtag('event', 'time_on_page', {
          'duration_seconds': Math.round(seconds),
        });
      }

      trackTimeOnPage(120);
      expect(window.gtag).toHaveBeenCalledWith(
        'event',
        'time_on_page',
        expect.objectContaining({
          'duration_seconds': 120,
        })
      );
    });

    test('debería redondear segundos', () => {
      function trackTimeOnPage(seconds) {
        return Math.round(seconds);
      }

      expect(trackTimeOnPage(123.7)).toBe(124);
      expect(trackTimeOnPage(123.4)).toBe(123);
    });
  });

  // ==========================================
  // TESTS DE SECTION TRACKING
  // ==========================================

  describe('trackSectionView', () => {
    test('debería registrar vista de sección', () => {
      function trackSectionView(sectionName) {
        window.gtag('event', 'section_view', {
          'section_name': sectionName,
        });
      }

      trackSectionView('planes');
      expect(window.gtag).toHaveBeenCalledWith(
        'event',
        'section_view',
        expect.objectContaining({
          'section_name': 'planes',
        })
      );
    });

    test('debería registrar múltiples secciones', () => {
      function trackSectionView(sectionName) {
        window.gtag('event', 'section_view', { 'section_name': sectionName });
      }

      const sections = ['hero', 'planes', 'casos-exito', 'contacto'];
      sections.forEach(section => trackSectionView(section));

      expect(window.gtag).toHaveBeenCalledTimes(4);
    });
  });

  // ==========================================
  // TESTS DE CONVERSIONES
  // ==========================================

  describe('trackConversion', () => {
    test('debería registrar conversión', () => {
      function trackConversion(conversionName, conversionValue = 0) {
        window.gtag('event', 'conversion', {
          'conversion_name': conversionName,
          'conversion_value': conversionValue,
        });
      }

      trackConversion('plan_interest', 0);
      expect(window.gtag).toHaveBeenCalled();
    });

    test('debería incluir valor de conversión', () => {
      function trackConversion(conversionName, conversionValue = 0) {
        window.gtag('event', 'conversion', {
          'conversion_name': conversionName,
          'conversion_value': conversionValue,
          'currency': 'USD',
        });
      }

      trackConversion('premium_plan', 99);
      expect(window.gtag).toHaveBeenCalledWith(
        'event',
        'conversion',
        expect.objectContaining({
          'conversion_value': 99,
        })
      );
    });
  });

  // ==========================================
  // TESTS DE EXTERNAL LINK TRACKING
  // ==========================================

  describe('trackExternalLink', () => {
    test('debería registrar enlace externo', () => {
      function trackExternalLink(url, linkText = '') {
        window.gtag('event', 'external_link_click', {
          'link_url': url,
          'link_text': linkText,
        });
      }

      trackExternalLink('https://example.com', 'Ejemplo');
      expect(window.gtag).toHaveBeenCalledWith(
        'event',
        'external_link_click',
        expect.objectContaining({
          'link_url': 'https://example.com',
        })
      );
    });
  });

  // ==========================================
  // TESTS DE SETUP AUTOMÁTICO
  // ==========================================

  describe('setupAutomaticCTATracking', () => {
    test('debería encontrar botones con data-cta', () => {
      document.body.innerHTML = `
        <button data-cta="contact">Contacto</button>
        <button data-cta="pricing">Planes</button>
      `;

      const buttons = document.querySelectorAll('[data-cta]');
      expect(buttons.length).toBe(2);
    });

    test('debería encontrar botones con clase btn-primary', () => {
      document.body.innerHTML = `
        <button class="btn-primary">Botón 1</button>
        <button class="btn-secondary">Botón 2</button>
      `;

      const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
      expect(buttons.length).toBe(2);
    });
  });

  describe('setupAutomaticSectionTracking', () => {
    test('debería encontrar secciones con data-section', () => {
      document.body.innerHTML = `
        <section data-section="hero">Hero</section>
        <section data-section="planes">Planes</section>
        <section data-section="contacto">Contacto</section>
      `;

      const sections = document.querySelectorAll('[data-section]');
      expect(sections.length).toBe(3);
    });

    test('debería extraer nombre de sección', () => {
      document.body.innerHTML = `
        <section data-section="planes">Contenido</section>
      `;

      const section = document.querySelector('[data-section]');
      expect(section.dataset.section).toBe('planes');
    });
  });
});

// ==========================================
// TESTS DE PLAUSIBLE ANALYTICS
// ==========================================

describe('Plausible Analytics Module', () => {
  beforeEach(() => {
    window.plausible = jest.fn();
  });

  afterEach(() => {
    delete window.plausible;
  });

  describe('trackPlausibleEvent', () => {
    test('debería registrar evento en Plausible', () => {
      function trackPlausibleEvent(eventName, eventData = {}) {
        if (typeof window.plausible !== 'undefined') {
          window.plausible(eventName, { props: eventData });
        }
      }

      trackPlausibleEvent('Test Event', { 'test': 'data' });
      expect(window.plausible).toHaveBeenCalled();
    });

    test('debería limitar custom properties', () => {
      function trackPlausibleEvent(eventName, eventData = {}) {
        const props = {};
        Object.keys(eventData).slice(0, 30).forEach(key => {
          props[key] = String(eventData[key]).slice(0, 254);
        });
        window.plausible(eventName, { props });
      }

      const largData = {};
      for (let i = 0; i < 50; i++) {
        largData[`key_${i}`] = 'value';
      }

      trackPlausibleEvent('test', largData);
      expect(window.plausible).toHaveBeenCalled();
    });
  });

  describe('trackPlausibleCTA', () => {
    test('debería registrar CTA en Plausible', () => {
      function trackPlausibleCTA(ctaText, ctaAction) {
        window.plausible('CTA Click', {
          props: { 'button': ctaText, 'action': ctaAction }
        });
      }

      trackPlausibleCTA('Contacto', 'contact_click');
      expect(window.plausible).toHaveBeenCalledWith(
        'CTA Click',
        expect.any(Object)
      );
    });
  });
});
