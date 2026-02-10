## 🚀 GUÍA RÁPIDA: Cambiar el Número de WhatsApp

### ⚡ Opción Más Fácil (Recomendado)

1. **Abre este archivo:**
   ```
   js/whatsapp-config.js
   ```

2. **Busca esta línea (línea ~16):**
   ```javascript
   window.WHATSAPP_MAIN_NUMBER = '+50367892365';
   ```

3. **Reemplaza con tu número:**
   ```javascript
   window.WHATSAPP_MAIN_NUMBER = '+50367892365';  // ← Cambia aquí
   ```

4. **Guarda el archivo (Ctrl+S o Cmd+S)**

5. **¡Listo!** El botón ahora apunta a tu número en TODAS las páginas

---

### 📋 Formato Correcto del Número

Tu número debe estar así:
- ✅ Correcto: `'+50367892365'` (con + y comillas)
- ❌ Incorrecto: `50367892365` (sin +)
- ❌ Incorrecto: `+503 6789 2365` (con espacios)
- ❌ Incorrecto: `'50367892365'` (sin +)

### 🌍 Ejemplos por País

**El Salvador:**
```javascript
window.WHATSAPP_MAIN_NUMBER = '+50367892365';
```

**Guatemala:**
```javascript
window.WHATSAPP_MAIN_NUMBER = '+50212345678';
```

**Honduras:**
```javascript
window.WHATSAPP_MAIN_NUMBER = '+50412345678';
```

---

### 🎯 Cambiar Mensaje (Opcional)

En `js/whatsapp-config.js`, línea ~20:

```javascript
window.WHATSAPP_DEFAULT_MESSAGE = '¡Hola! Me interesa obtener más información sobre vuestros servicios de facturación electrónica.';
```

**Ejemplos:**
- `'Hola, quiero solicitar una demostración'`
- `'Me interesa conocer tus servicios de facturación'`
- `'¿Cuál es el costo de vuestras soluciones?'`

---

### 💬 Cambiar Tooltip (Texto al Pasar Mouse)

En `js/whatsapp-config.js`, línea ~24:

```javascript
window.WHATSAPP_TOOLTIP_TEXT = 'Hola, ¿Cómo podemos ayudarte?';
```

---

### ✅ Verificar que Funcione

1. **Abre cualquier página del sitio**
2. **Busca el botón verde de WhatsApp** en la esquina inferior derecha
3. **Pasa el mouse** - Debe aparecer el tooltip
4. **Haz clic** - Debe abrir WhatsApp con tu número

---

### 🔧 Opciones Avanzadas

Si necesitas **diferentes números en diferentes páginas**, edita:

```javascript
window.WHATSAPP_PAGE_CONFIG = {
  'index.html': { number: '+50367892365', message: 'Mensaje para home' },
  'services.html': { number: '+50367892365', message: 'Mensaje para servicios' },
  'contact.html': { number: '+50367892365', message: 'Mensaje para contacto' }
};
```

---

### 🐛 Si no Funciona

1. **Verifica el número tenga formato correcto:**
   - Debe empezar con `+50`
   - Debe tener 12 dígitos total (con +)
   - Sin espacios ni guiones

2. **Recarga la página (Ctrl+Shift+R)** para limpiar caché

3. **Abre la consola (F12)** y verifica:
   ```javascript
   console.log(window.WHATSAPP_MAIN_NUMBER);
   ```
   Debe mostrar tu número con `+`

---

### 📞 Obtener tu Número de WhatsApp

El número debe ser el número de **WhatsApp Business** o personal:

1. **Abre WhatsApp en tu teléfono**
2. **Configuración → Cuenta → Mi número**
3. **Copia tu número completo con código de país**
4. **Agrega el + al inicio:** `+503...`

---

### 🎨 Cambiar Color del Botón (Avanzado)

En `js/whatsapp-button.js`, busca:

```css
.whatsapp-button {
  background: linear-gradient(135deg, #25D366 0%, #20BA5A 100%);
}
```

Reemplaza `#25D366` y `#20BA5A` con tus colores preferidos.

---

### 📊 Ver Clics en Google Analytics

1. **Abre Google Analytics**
2. **Reportes → Real-time → Events**
3. **Busca evento: `whatsapp_click`**
4. **Verás cada vez que alguien haga clic**

---

### 📝 Resumen Rápido

| Archivo | Qué cambiar | Línea |
|---------|-------------|-------|
| `js/whatsapp-config.js` | Número de WhatsApp | 16 |
| `js/whatsapp-config.js` | Mensaje por defecto | 20 |
| `js/whatsapp-config.js` | Tooltip | 24 |
| `js/whatsapp-button.js` | Color del botón | ~180 |
| `js/whatsapp-button.js` | Tamaño del botón | ~120 |

---

### ✨ ¿Necesitas Ayuda?

1. **Botón no aparece:** Verifica que el script esté en HTML
2. **Número incorrecto:** Usa el formato `+50367892365`
3. **No abre WhatsApp:** Prueba con número en WhatsApp Web
4. **Mensaje no se envía:** Verifica que el mensaje no tenga caracteres especiales

---

**¡Listo! Cambiar el número es así de fácil. 🎉**
