# Testing Guide - Oceansbits

## 📋 Descripción

Suite completa de tests para el proyecto Oceansbits usando Jest como framework de testing.

## 🚀 Instalación

```bash
npm install
```

## ▶️ Ejecutar Tests

### Todos los tests
```bash
npm test
```

### Tests en modo watch (reejecutar al cambiar archivos)
```bash
npm run test:watch
```

### Cobertura de tests
```bash
npm run test:coverage
```

## 📁 Estructura de Tests

```
__tests__/
├── planes.test.js      # Tests para el switcher de planes
├── html.test.js        # Tests para validación de HTML y meta tags
├── pwa.test.js         # Tests para PWA
└── utils.test.js       # Tests de utilidades generales
```

## 🧪 Suite de Tests

### 1. **planes.test.js** - Switcher de Planes
Pruebas para la funcionalidad de cambio de planes de facturación.

**Temas cubiertos:**
- ✅ Estructura del DOM (botones, tarjetas, indicador)
- ✅ Funcionalidad de planes
- ✅ Accesibilidad (tabindex, navegación por teclado)
- ✅ Eventos (click, mouseenter, keydown)
- ✅ Clases CSS (hidden, visible)
- ✅ Validación de datos (planes válidos)

**Ejemplo:**
```bash
npm test planes.test.js
```

### 2. **html.test.js** - Validación HTML
Pruebas para asegurar que el HTML contiene todos los meta tags necesarios.

**Temas cubiertos:**
- ✅ Meta tags SEO (description, keywords, viewport)
- ✅ Open Graph meta tags (og:title, og:description, etc.)
- ✅ Twitter Card tags
- ✅ PWA meta tags
- ✅ Estructura HTML básica
- ✅ Validación de caracteres especiales

**Ejemplo:**
```bash
npm test html.test.js
```

### 3. **pwa.test.js** - Progressive Web App
Pruebas para validar la configuración PWA.

**Temas cubiertos:**
- ✅ manifest.json (nombre, colores, iconos)
- ✅ Service Worker
- ✅ Estrategia de caching
- ✅ Soporte offline
- ✅ Accesibilidad PWA
- ✅ Notificaciones y actualizaciones

**Ejemplo:**
```bash
npm test pwa.test.js
```

### 4. **utils.test.js** - Utilidades Generales
Pruebas de funciones y comportamientos comunes en JavaScript.

**Temas cubiertos:**
- ✅ DOM Queries (querySelector, querySelectorAll, getElementById)
- ✅ Métodos de Elementos (classList, setAttribute, dataset)
- ✅ Event Listeners
- ✅ Estilos CSS
- ✅ Validaciones de datos
- ✅ Métodos String
- ✅ Performance

**Ejemplo:**
```bash
npm test utils.test.js
```

## 📊 Cobertura de Tests

El proyecto tiene configurado un threshold de cobertura:
- **Branches:** 70%
- **Functions:** 80%
- **Lines:** 80%
- **Statements:** 80%

Ver reporte de cobertura:
```bash
npm run test:coverage
```

## 🔧 Configuración

### `jest.config.js`
Archivo de configuración principal de Jest.

```javascript
{
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['js/**/*.js'],
  coverageThreshold: { ... },
  testMatch: ['**/__tests__/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  verbose: true
}
```

### `jest.setup.js`
Setup global para todos los tests.

**Proporciona:**
- Mock de localStorage
- Mock de console
- Limpieza automática de mocks

## 📝 Escribir Nuevos Tests

### Estructura básica de un test

```javascript
describe('Descripción de lo que pruebas', () => {
  beforeEach(() => {
    // Preparación antes de cada test
  });

  test('debería hacer algo específico', () => {
    // Arrange (preparar)
    const el = document.createElement('div');
    
    // Act (actuar)
    el.classList.add('active');
    
    // Assert (afirmar)
    expect(el.classList.contains('active')).toBe(true);
  });

  afterEach(() => {
    // Limpieza después de cada test
  });
});
```

### Matchers comunes

```javascript
expect(value).toBe(expected);           // === estricto
expect(value).toEqual(expected);        // Igualdad profunda
expect(value).toBeTruthy();             // Truthy
expect(value).toBeFalsy();              // Falsy
expect(value).toBeNull();               // null
expect(value).toBeUndefined();          // undefined
expect(array).toContain(item);          // Incluye elemento
expect(fn).toHaveBeenCalled();          // Función fue llamada
expect(value).toMatch(/regex/);         // Regex match
```

## ✅ Checklist de Calidad

- [x] Tests para funcionalidad principal (planes.js)
- [x] Tests para HTML y meta tags
- [x] Tests para PWA
- [x] Tests para utilidades generales
- [x] Cobertura mínima del 70%
- [x] Tests accesibles y mantenibles
- [x] Documentación clara

## 🚀 Integración Continua

Para CI/CD, ejecutar:
```bash
npm run test:coverage
```

Los tests fallarán si:
- Hay errores en el código
- La cobertura está por debajo del threshold
- Fallan las validaciones de accesibilidad

## 🐛 Debugging Tests

### Ejecutar un test específico
```bash
npm test -- --testNamePattern="debería encontrar todos los botones"
```

### Modo de depuración interactivo
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Ver logs detallados
```bash
npm test -- --verbose
```

## 📚 Recursos

- [Jest Documentation](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [Jest Best Practices](https://jestjs.io/docs/getting-started)

## 🤝 Contribuir

Cuando agregues nuevo código:
1. Escribe tests para la nueva funcionalidad
2. Asegúrate de que todos los tests pasen
3. Verifica que la cobertura se mantiene

## 📞 Soporte

Para preguntas sobre los tests, consulta la documentación de Jest o contacta al equipo de desarrollo.

---

**Última actualización:** 5 de Febrero 2026
