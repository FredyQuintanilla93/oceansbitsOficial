# Botón Flotante de WhatsApp

## 📱 Descripción

Componente flotante de WhatsApp que aparece en todas las páginas. Permite a los usuarios contactar directamente por WhatsApp con un solo clic.

## ✨ Características

✅ **Botón flotante visual** - Se muestra en la esquina inferior derecha  
✅ **Tooltip informativo** - Muestra mensaje al pasar el mouse  
✅ **Animación de entrada** - Aparece suavemente al cargar la página  
✅ **Responsive** - Se adapta a todos los tamaños de pantalla  
✅ **Pulso sutil** - Icono con animación para llamar la atención  
✅ **Link directo a WhatsApp** - Abre conversación automáticamente  
✅ **Mensaje predefinido** - Proporciona contexto al usuario  
✅ **Analytics integrado** - Registra clics en Google Analytics  
✅ **Dark mode support** - Compatible con tema oscuro  
✅ **Performance** - Carga y renderiza rápidamente  

## 🚀 Instalación

El botón ya está agregado a todas las páginas HTML:

```html
<script src="js/whatsapp-button.js"></script>
```

## ⚙️ Configuración

### 1. Cambiar el Número de Teléfono

**Opción A: En el archivo JavaScript** (Recomendado)

Edita `js/whatsapp-button.js` línea ~11:

```javascript
const WHATSAPP_CONFIG = {
  phoneNumber: '+50367892365', // ← Reemplaza con tu número en formato +50X XXXX XXXX
  message: '¡Hola! Me interesa obtener más información sobre vuestros servicios de facturación electrónica.',
  displayText: 'Hola, ¿Cómo podemos ayudarte?',
};
```

**Opción B: Dinámicamente en código**

```javascript
// Cambiar número en cualquier momento
setWhatsAppNumber('+50367892365', 'Hola, ¿en qué puedo ayudarte?');
```

### 2. Número Correcto

El número debe estar en formato internacional:
- **Formato correcto**: `+50367892365` (El Salvador)
- **Estructura**: `+[país][área][número]`
- **Ejemplos**:
  - El Salvador: `+50367892365`
  - Guatemala: `+50212345678`
  - Honduras: `+50412345678`

### 3. Mensaje Predefinido

Personaliza el mensaje que se envía automáticamente:

```javascript
WHATSAPP_CONFIG.message = 'Quiero solicitar información sobre facturación electrónica';
```

### 4. Texto del Tooltip

El tooltip es el texto que aparece al pasar el mouse:

```javascript
WHATSAPP_CONFIG.displayText = 'Contacta con nosotros por WhatsApp';
```

## 🎨 Personalización Visual

### Cambiar Colores

Edita `js/whatsapp-button.js` en la sección de estilos:

```css
.whatsapp-button {
  background: linear-gradient(135deg, #25D366 0%, #20BA5A 100%); /* Verde WhatsApp */
  /* Cambiar a tu color preferido */
}
```

### Cambiar Posición

Default: Esquina inferior derecha. Para cambiar:

```css
#whatsapp-button-container {
  bottom: 20px;   /* Distancia del bottom */
  right: 20px;    /* Distancia del right */
  /* O cambiar a left: 20px; para esquina inferior izquierda */
}
```

### Cambiar Tamaño

```css
.whatsapp-button {
  width: 56px;    /* Ancho del botón */
  height: 56px;   /* Alto del botón */
}

.whatsapp-icon {
  width: 28px;    /* Ancho del icono */
  height: 28px;   /* Alto del icono */
}
```

## 🎯 Funciones Disponibles

### Mostrar/Ocultar Botón

```javascript
// Ocultar botón
toggleWhatsAppButton(false);

// Mostrar botón
toggleWhatsAppButton(true);
```

### Cambiar Número Dinámicamente

```javascript
setWhatsAppNumber('+50367892365', 'Nuevo mensaje');
```

### Eliminar Botón

```javascript
removeWhatsAppButton();
```

## 📊 Analytics

El botón rastrea automáticamente los clics en Google Analytics:

```javascript
// Se registra automáticamente cuando el usuario hace clic
Event: whatsapp_click
Data: {
  phone: '+50367892365',
  timestamp: '2026-02-10T15:30:00Z'
}
```

Para ver estos datos en Google Analytics:
1. Ir a **Analytics** → **Real-time** → **Events**
2. Buscar evento `whatsapp_click`
3. O en **Reportes** → **All events** → Filtrar por `whatsapp_click`

## 📱 Comportamiento Responsive

**Desktop:**
- Botón: 56x56px
- Posición: 20px desde esquina
- Tooltip visible al hover
- Animación de bounce al hover

**Mobile:**
- Botón: 50x50px (más pequeño para caber mejor)
- Posición: 16px desde esquina
- Tooltip: No se muestra (ahorra espacio)
- Toque directo abre WhatsApp

## 🔗 URL de WhatsApp

El botón construye automáticamente la URL correcta:

```
https://wa.me/[NÚMERO_SIN_PLUS]?text=[MENSAJE_CODIFICADO]

Ejemplo:
https://wa.me/50367892365?text=¡Hola!%20Me%20interesa%20obtener%20más%20información
```

## 🌐 Compatibilidad

✅ Chrome/Chromium  
✅ Firefox  
✅ Safari (escritorio)  
✅ Safari (iOS) - Abre WhatsApp app si está instalada  
✅ Android Chrome - Abre WhatsApp app si está instalada  
✅ Edge  
✅ Opera  

## 🛡️ Consideraciones de Seguridad

- ✅ No almacena datos personales
- ✅ No requiere permisos especiales
- ✅ Link externo a WhatsApp seguro
- ✅ Abre en pestaña nueva (rel="noopener noreferrer")
- ✅ Accesible (aria-label para lectores de pantalla)

## 🐛 Solución de Problemas

### Botón no aparece

**Verificar:**
1. ¿El script está cargado? Abre DevTools (F12) → Console
2. ¿No hay errores? Revisar pestaña **Console** por errores
3. ¿El z-index es correcto? Puede estar debajo de otro elemento

**Solución:**
```javascript
// Asegúrate de que el script está al final del HTML
<script src="js/whatsapp-button.js"></script>
```

### El link no funciona

**Verificar:**
1. ¿El número está en formato correcto? `+50367892365`
2. ¿El usuario tiene WhatsApp instalado?
3. ¿No hay espacios extra en el número?

**Solución:**
```javascript
// Verifica en console que la config es correcta
console.log(WHATSAPP_CONFIG);
```

### Botón se superpone con otros elementos

**Solución:**
Cambiar el z-index en `js/whatsapp-button.js`:

```css
#whatsapp-button-container {
  z-index: 9999; /* Aumentar si es necesario */
}
```

### No rastrea clics en Analytics

**Verificar:**
1. ¿Google Analytics está configurado? Ver `js/analytics.js`
2. ¿El evento aparece en real-time?

**Solución:**
```javascript
// Verifica en console que se registra el evento
document.getElementById('whatsapp-button').click();
// Debe mostrar en console: "📱 WhatsApp button clicked"
```

## 📋 Checklist de Implementación

- [ ] Número de teléfono actualizado en `WHATSAPP_CONFIG`
- [ ] Mensaje personalizado configurado
- [ ] Botón visible en todas las páginas
- [ ] Tooltip aparece en desktop
- [ ] Link abre WhatsApp correctamente
- [ ] Analytics registra clics
- [ ] Responsive se ve bien en mobile
- [ ] Color combina con branding

## 📝 Ejemplos de Uso

### Diferentes mensajes por página

```javascript
// En index.html
setWhatsAppNumber('+50367892365', '¿Cómo podemos ayudarte con facturación?');

// En services.html
setWhatsAppNumber('+50367892365', 'Me interesa conocer tus servicios');

// En contact.html
setWhatsAppNumber('+50367892365', 'Quisiera agendar una llamada');
```

### Mostrar botón solo en cierta hora

```javascript
const hour = new Date().getHours();
if (hour >= 9 && hour < 18) {
  toggleWhatsAppButton(true);  // Mostrar en horario de oficina
} else {
  toggleWhatsAppButton(false);
}
```

### Cambiar número por región

```javascript
const country = navigator.language.split('-')[1];
if (country === 'SV') {
  setWhatsAppNumber('+50367892365'); // El Salvador
} else if (country === 'GT') {
  setWhatsAppNumber('+50212345678'); // Guatemala
}
```

## 🔄 Actualización Futura

Para agregar más funcionalidad:

1. **Badge de contador** - Mostrar número de mensajes no leídos
2. **Calendario** - Elegir horario para mostrar botón
3. **Múltiples números** - Diferentes números por departamento
4. **Chat widget** - Chat embebido en página
5. **Integraciones** - Conectar con CRM

## 📚 Recursos

- [WhatsApp Business API](https://www.whatsapp.com/business/api)
- [WhatsApp Web Link Format](https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat)
- [Google Analytics Events](https://support.google.com/analytics/answer/9322688)

---

**Última actualización:** 10 de Febrero 2026
