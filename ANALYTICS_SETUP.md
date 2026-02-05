# Guía de Analytics para Oceansbits

## 📊 Descripción

Esta guía explica cómo implementar analytics completo en Oceansbits con dos opciones:
1. **Google Analytics 4** - Más completo y gratuito hasta cierto tráfico
2. **Plausible Analytics** - Más privado y simple (pago pero ético)

## 🎯 Objetivos de Tracking

### Conversiones
- ✅ Clics en "Facturación Electrónica"
- ✅ Clics en "Contacto"
- ✅ Envío de formulario de contacto
- ✅ Cambios de plan visualizados
- ✅ Tiempo en página

### Comportamiento del Usuario
- ✅ Scroll profundo
- ✅ Secciones vistas
- ✅ Interacciones con botones
- ✅ Enlaces externos visitados
- ✅ Tiempo total en sitio

### Información Técnica
- ✅ País y idioma
- ✅ Dispositivo (desktop/mobile)
- ✅ Navegador
- ✅ Fuente de tráfico

## 🚀 Opción 1: Google Analytics 4 (Recomendado)

### Ventajas
✅ Gratuito y muy potente
✅ Informes detallados
✅ Integración con Google Ads
✅ Retargeting automático
✅ Análisis de conversión completo

### Desventajas
❌ Requiere aceptar cookies
❌ Google recibe los datos
❌ Complejo para principiantes

### Instalación

#### 1. Crear Cuenta Google Analytics 4
1. Ir a [analytics.google.com](https://analytics.google.com)
2. Inicia sesión con cuenta Google
3. Haz clic en "Crear propiedad"
4. Nombre: "Oceansbits"
5. Zona horaria: "América/El_Salvador"
6. Moneda: "USD"

#### 2. Obtener ID de Medición
1. En Google Analytics, ve a **Admin**
2. En columna izquierda, selecciona tu propiedad
3. Haz clic en **Data Streams**
4. Selecciona tu sitio web
5. Copia tu **Measurement ID** (formato: G-XXXXXXXXXX)

#### 3. Actualizar Script de Analytics
```javascript
// En js/analytics.js, línea ~23
const GA_ID = 'G-XXXXXXXXXX'; // ← Reemplaza aquí
```

#### 4. Agregar Script a HTML
Añade esto en `<head>` de **TODAS** tus páginas:

```html
<!-- Google Analytics 4 -->
<script src="js/analytics.js"></script>

<!-- Alternativa: Importar directamente -->
<script>
  const GA_ID = 'G-XXXXXXXXXX';
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', GA_ID);
</script>
```

### Eventos que se Rastrean Automáticamente

#### 1. Page Views
```javascript
trackPageView() // Automático al cargar
```

#### 2. CTA Clicks
```javascript
// Botones con clase .btn-primary o .btn-secondary
// Botones con atributo [data-cta]
// Botones de tipo submit
```

#### 3. Plan Switches
```javascript
trackPlanSwitch('ancla')
trackPlanSwitch('velero')
trackPlanSwitch('marea')
```

#### 4. Form Submissions
```javascript
trackFormSubmission('contact_form', {
  'subject': 'Consulta sobre planes',
  'type': 'contact'
})
```

#### 5. Scroll Depth
```javascript
// Se registra automáticamente en 25%, 50%, 75%, 100%
```

### Eventos Personalizados

#### Registrar en código JavaScript
```javascript
// Clic en plan específico
trackPlanInterest('marea')

// Solicitud de contacto
trackContactRequest()

// Descarga de recurso
trackResourceDownload('guia-facturas.pdf', 'pdf')

// Búsqueda
trackSearch('facturación electrónica', 5)

// Enlace externo
trackExternalLink('https://ejemplo.com', 'Ver más')
```

#### En HTML
```html
<!-- CTA con data-cta -->
<button class="btn-primary" data-cta="contact_request">
  Contacto
</button>

<!-- Sección para tracking -->
<section data-section="planes">
  <!-- Contenido de planes -->
</section>
```

### Configurar Objetivos (Goals)

En Google Analytics:
1. **Admin** → **Conversions**
2. Haz clic **Create event**
3. Selecciona evento de tu lista
4. Haz clic **Create**

**Objetivos recomendados:**
- `cta_click` - Clic en botones principales
- `form_submit` - Envío de contacto
- `plan_interest` - Interés en plan
- `contact_request` - Solicitud de contacto

## 🔐 Opción 2: Plausible Analytics (Privado)

### Ventajas
✅ Respeta privacidad del usuario
✅ No requiere cookies
✅ Simple e intuitivo
✅ Conforme a GDPR/CCPA
✅ Rápido y ligero

### Desventajas
❌ Pago (~$9-29/mes)
❌ Menos detallado que GA4
❌ Sin retargeting

### Instalación

#### 1. Crear Cuenta Plausible
1. Ir a [plausible.io](https://plausible.io)
2. Regístrate y comienza prueba gratis
3. Agrega nuevo sitio
4. Dominio: `oceansbits.com`

#### 2. Actualizar Script
```javascript
// En js/plausible-analytics.js, línea ~12
const DOMAIN = 'oceansbits.com'; // ← Reemplaza aquí
```

#### 3. Agregar a HTML
```html
<script>
  const DOMAIN = 'oceansbits.com';
  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://plausible.io/js/script.js';
  script.setAttribute('data-domain', DOMAIN);
  document.head.appendChild(script);
</script>
```

### Eventos Plausible
```javascript
trackPlausibleCTA('Contacto', 'contact_click')
trackPlausiblePlanSwitch('marea')
trackPlausibleFormSubmission('contact_form')
trackPlausibleSectionView('planes')
trackPlausibleExternalLink('https://ejemplo.com')
```

## 📊 Implementación Completa

### Paso 1: Elegir Opción
Editar `index.html` (y TODAS las páginas):

**Opción A: Google Analytics 4**
```html
<head>
  ...
  <script src="js/analytics.js"></script>
</head>
```

**Opción B: Plausible**
```html
<head>
  ...
  <script src="js/plausible-analytics.js"></script>
</head>
```

### Paso 2: Configurar IDs
- Google: Reemplazar `G-XXXXXXXXXX` con tu ID
- Plausible: Reemplazar `oceansbits.com` con tu dominio

### Paso 3: Marcar Elementos HTML

#### Botones CTA
```html
<button class="btn-primary" data-cta="contact_main">
  Contacto
</button>

<button class="btn-secondary" data-cta="pricing_plan">
  Ver Planes
</button>
```

#### Secciones
```html
<section data-section="hero">
  <!-- Contenido principal -->
</section>

<section data-section="planes">
  <!-- Sección de planes -->
</section>

<section data-section="casos-exito">
  <!-- Casos de éxito -->
</section>

<section data-section="contacto">
  <!-- Formulario de contacto -->
</section>
```

### Paso 4: Eventos Manuales

En `contact.html`, agregar a formulario:
```html
<form id="contact-form" onsubmit="
  trackFormSubmission('contact_form', {
    'subject': document.getElementById('subject').value,
    'type': 'contact'
  });
  // El formulario se envía normalmente
  return true;
">
  <!-- Campos del formulario -->
</form>
```

En `desmebración.html`, al cambiar plan:
```html
<button onclick="
  activatePlan(this);
  trackPlanSwitch(this.dataset.plan);
" data-plan="ancla" class="plan-btn">
  Ancla
</button>
```

## 📈 Dashboard Google Analytics 4

### Vistas Principales
1. **Resumen** - Usuarios, sesiones, eventos principales
2. **Conversiones** - Goals y objetivos completados
3. **Adquisición** - De dónde vienen los usuarios
4. **Comportamiento** - Páginas más vistas, scroll depth
5. **Tiempo** - Promedio de tiempo en página, tasa de rebote

### Reportes Útiles

#### Por Página
```
Reportes → Vida del usuario → Páginas
Métrica: usuarios, sesiones, eventos por página
```

#### Por Dispositivo
```
Reportes → Demográfica → Dispositivo
Métrica: desktop vs mobile engagement
```

#### Conversiones
```
Reportes → Conversiones → Todos los eventos
Filtrar por: form_submit, cta_click, plan_interest
```

#### Funnel de Planes
```
Análisis → Exploración → Embudo
Pasos:
1. Plan Viewed
2. Plan Switched
3. Contact Requested
```

## 📱 Dashboard Plausible

Plausible ofrece un dashboard mucho más simple:

1. **Today** - Stats en tiempo real
2. **All Events** - Eventos personalizados
3. **Top Pages** - Páginas más vistas
4. **Traffic Sources** - Dónde vienen los usuarios
5. **Devices** - Desktop vs Mobile

## 🔍 Debugging y Validación

### Google Analytics
```bash
# Ver eventos en console
# Abre DevTools (F12) → Console

gtag('event', 'test_event', {'test': 'value'})

# Debe mostrar en GA4 dentro de 24 horas (real-time debugging)
```

### Plausible
```bash
# Plausible muestra eventos en tiempo real
# Abre dashboard → Ver eventos siendo registrados
```

## 📋 Checklist de Implementación

### Google Analytics 4
- [ ] Cuenta creada en analytics.google.com
- [ ] ID de Medición obtenido (G-XXXXXXXXXX)
- [ ] js/analytics.js actualizado con ID
- [ ] Script agregado a todas las páginas
- [ ] Botones marcados con [data-cta]
- [ ] Secciones marcadas con [data-section]
- [ ] Formularios con trackFormSubmission()
- [ ] Objetivos configurados en GA4
- [ ] Real-time monitoring validado

### Plausible Analytics
- [ ] Cuenta creada en plausible.io
- [ ] Dominio agregado a Plausible
- [ ] js/plausible-analytics.js actualizado
- [ ] Script agregado a todas las páginas
- [ ] Elementos HTML marcados
- [ ] Dashboard Plausible accesible
- [ ] Eventos en tiempo real

## 🚀 Lanzamiento

### Antes de Producción
1. Validar que eventos se registren (real-time)
2. Probar en dispositivo móvil
3. Verificar en diferentes navegadores
4. Revisar dashboard de analytics
5. Configurar alertas si es necesario

### En Producción
1. Desplegar código con analytics
2. Actualizar política de privacidad
3. Agregar banner de cookies (GA4)
4. Revisar datos diarios por primera semana

## 📝 Política de Privacidad

Incluir en `privacy.html` o `terms.html`:

```
Utilizamos herramientas de análisis para entender
cómo los usuarios interactúan con nuestro sitio.
Estos datos nos ayudan a mejorar nuestros servicios.

[Con GA4]
- Datos se envían a Google Analytics
- Requiere aceptación de cookies
- Conforme a GDPR con consentimiento

[Con Plausible]
- Analytics respeta privacidad GDPR/CCPA
- Sin cookies de rastreo
- Datos anónimos, no identificables
```

## 🔗 Recursos Útiles

### Google Analytics 4
- [Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Event builder](https://support.google.com/analytics/answer/9322688)
- [Conversion setup](https://support.google.com/analytics/answer/9267568)

### Plausible
- [Documentation](https://plausible.io/docs)
- [Events](https://plausible.io/docs/events-js-api)
- [GDPR Compliant](https://plausible.io/data-policy)

## 💡 Consejos Prácticos

1. **Empieza simple** - Rastrear solo conversiones principales
2. **Revisa datos** - Analiza 1-2 semanas antes de cambios
3. **Evita PII** - Nunca rastrear emails, teléfonos, passwords
4. **Test A/B** - Usa datos para probar cambios
5. **Alertas** - Configura alertas para anomalías

---

**Última actualización:** 5 de Febrero 2026
