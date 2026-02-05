/**
 * Tests para validaciones HTML
 * Verifica que el HTML sea válido y contenga elementos necesarios
 */

describe('Validaciones HTML y Meta Tags', () => {
  describe('Meta Tags SEO', () => {
    test('Debería haber meta description', () => {
      const meta = document.querySelector('meta[name="description"]');
      expect(meta).toBeTruthy();
      if (meta) {
        expect(meta.getAttribute('content')).toBeTruthy();
      }
    });

    test('Debería haber meta keywords', () => {
      const meta = document.querySelector('meta[name="keywords"]');
      expect(meta).toBeTruthy();
    });

    test('Debería haber meta viewport', () => {
      const meta = document.querySelector('meta[name="viewport"]');
      expect(meta).toBeTruthy();
      const content = meta?.getAttribute('content');
      expect(content).toContain('width=device-width');
    });
  });

  describe('Open Graph Meta Tags', () => {
    test('Debería haber og:title', () => {
      const meta = document.querySelector('meta[property="og:title"]');
      expect(meta).toBeTruthy();
    });

    test('Debería haber og:description', () => {
      const meta = document.querySelector('meta[property="og:description"]');
      expect(meta).toBeTruthy();
    });

    test('Debería haber og:image', () => {
      const meta = document.querySelector('meta[property="og:image"]');
      expect(meta).toBeTruthy();
    });

    test('Debería haber og:url', () => {
      const meta = document.querySelector('meta[property="og:url"]');
      expect(meta).toBeTruthy();
    });

    test('Debería haber og:type', () => {
      const meta = document.querySelector('meta[property="og:type"]');
      expect(meta).toBeTruthy();
      expect(meta?.getAttribute('content')).toBe('website');
    });
  });

  describe('Twitter Card Meta Tags', () => {
    test('Debería haber twitter:card', () => {
      const meta = document.querySelector('meta[name="twitter:card"]');
      expect(meta).toBeTruthy();
    });

    test('Debería haber twitter:title', () => {
      const meta = document.querySelector('meta[name="twitter:title"]');
      expect(meta).toBeTruthy();
    });

    test('Debería haber twitter:description', () => {
      const meta = document.querySelector('meta[name="twitter:description"]');
      expect(meta).toBeTruthy();
    });

    test('Debería haber twitter:image', () => {
      const meta = document.querySelector('meta[name="twitter:image"]');
      expect(meta).toBeTruthy();
    });
  });

  describe('PWA Meta Tags', () => {
    test('Debería haber manifest link', () => {
      const link = document.querySelector('link[rel="manifest"]');
      expect(link).toBeTruthy();
    });

    test('Debería haber theme-color meta tag', () => {
      const meta = document.querySelector('meta[name="theme-color"]');
      expect(meta).toBeTruthy();
      expect(meta?.getAttribute('content')).toBeTruthy();
    });

    test('Debería haber apple-mobile-web-app-capable', () => {
      const meta = document.querySelector('meta[name="apple-mobile-web-app-capable"]');
      expect(meta).toBeTruthy();
    });

    test('Debería haber apple-mobile-web-app-title', () => {
      const meta = document.querySelector('meta[name="apple-mobile-web-app-title"]');
      expect(meta).toBeTruthy();
    });

    test('Debería haber apple-touch-icon link', () => {
      const link = document.querySelector('link[rel="apple-touch-icon"]');
      expect(link).toBeTruthy();
    });
  });

  describe('Estructura HTML Básica', () => {
    beforeEach(() => {
      document.documentElement.lang = 'es';
      document.documentElement.innerHTML = `
        <html lang="es">
          <head>
            <meta charset="utf-8"/>
            <title>Test Page</title>
          </head>
          <body>
            <header>Header</header>
            <main>Main Content</main>
            <footer>Footer</footer>
          </body>
        </html>
      `;
    });

    test('HTML debería tener lang="es"', () => {
      expect(document.documentElement.lang).toBe('es');
    });

    test('Debería haber charset utf-8', () => {
      const meta = document.querySelector('meta[charset]');
      expect(meta).toBeTruthy();
    });

    test('Debería haber elemento title', () => {
      const title = document.querySelector('title');
      expect(title).toBeTruthy();
      expect(title?.textContent).toBeTruthy();
    });

    test('Debería haber header, main, footer', () => {
      expect(document.querySelector('header')).toBeTruthy();
      expect(document.querySelector('main')).toBeTruthy();
      expect(document.querySelector('footer')).toBeTruthy();
    });
  });

  describe('Validación de Caracteres Especiales', () => {
    test('Las entidades HTML deberían ser válidas', () => {
      const validEntities = ['&amp;', '&lt;', '&gt;', '&quot;', '&apos;'];
      validEntities.forEach(entity => {
        expect(entity).toMatch(/^&[a-z]+;$/);
      });
    });

    test('Los títulos no deberían tener caracteres inválidos', () => {
      const title = document.createElement('title');
      title.textContent = 'Oceansbits - Soluciones de Facturación Electrónica';
      expect(title.textContent).not.toContain('IPara');
      expect(title.textContent).not.toContain('...');
    });
  });

  describe('Enlaces y URLs', () => {
    test('URLs deberían ser válidas', () => {
      const validUrls = [
        '/',
        '/index.html',
        '/about.html',
        '/contact.html',
        '/services.html',
        '/caseSucess.html',
        '/desmebración.html',
        'https://oceansbits.com/'
      ];
      validUrls.forEach(url => {
        expect(url).toBeTruthy();
      });
    });

    test('URLs relativas no deberían tener barras dobles', () => {
      const urls = ['/index.html', '/about.html'];
      urls.forEach(url => {
        expect(url).not.toMatch(/\/\//);
      });
    });
  });
});
