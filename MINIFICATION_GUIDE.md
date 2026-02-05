# Guía de Minificación para Producción

## 📋 Descripción

Esta guía explica cómo minificar y optimizar el código de Oceansbits para producción, mejorando la velocidad de carga y reduciendo el tamaño de los archivos.

## 🎯 Objetivos de Minificación

- **Reducir tamaño de archivos** JS/CSS/HTML en 50-70%
- **Mejorar velocidad de carga** en navegadores
- **Mantener funcionabilidad** exacta
- **Preservar debugging** con source maps

## 🔧 Opciones de Build

### Opción 1: Script Simple (Sin Webpack)

**Requisitos:**
```bash
npm install --save-dev terser clean-css-cli html-minifier
```

**Uso:**
```bash
# Minificar todo
npm run build

# Minificar solo JS
npm run minify:js

# Minificar solo CSS
npm run minify:css

# Minificar solo HTML
npm run minify:html
```

### Opción 2: Con Webpack (Recomendado)

**Instalación:**
```bash
npm install --save-dev webpack webpack-cli terser-webpack-plugin babel-loader @babel/core @babel/preset-env
```

**Uso:**
```bash
# Desarrollo
webpack --mode development

# Producción
webpack --mode production
```

### Opción 3: Script Bash (Multiplataforma)

```bash
# Hacer ejecutable
chmod +x build.sh

# Ejecutar
./build.sh production
```

## 📊 Comparativa de Tamaños

### Antes de Minificación
```
planes.js:          ~8.5 KB
pwa-register.js:    ~3.2 KB
Total JS:           ~11.7 KB

index.html:         ~50 KB
about.html:         ~30 KB
contact.html:       ~35 KB
Total HTML:         ~180 KB
```

### Después de Minificación
```
planes.min.js:      ~2.1 KB (75% reducción)
pwa-register.min.js: ~0.9 KB (72% reducción)
Total JS:           ~3.0 KB (74% reducción)

index.html:         ~15 KB (70% reducción)
about.html:         ~10 KB (67% reducción)
contact.html:       ~12 KB (66% reducción)
Total HTML:         ~45 KB (75% reducción)
```

## 🗜️ Herramientas de Minificación

### JavaScript: Terser
- Comprime código
- Maneja variables
- Elimina console.log
- Genera source maps

```bash
terser input.js --compress --mangle --output output.min.js
```

### CSS: Clean CSS
- Elimina espacios
- Combina selectores
- Minifica colores (#ffffff → #fff)
- Combina propiedades

```bash
cleancss -o output.min.css input.css
```

### HTML: html-minifier
- Elimina espacios en blanco
- Comprime atributos
- Elimina comentarios
- Minifica inline styles

```bash
html-minifier --input-dir . --output-dir dist --file-ext html
```

## 📋 Checklist de Minificación

### Antes de Producción
- [ ] Todos los tests pasan
- [ ] Cobertura de tests ≥ 70%
- [ ] No hay console.log en código
- [ ] No hay debugger statements
- [ ] Source maps generados
- [ ] Archivos minificados creados

### Validación
```bash
# Ejecutar tests con cobertura
npm run prod

# Verificar tamaños
du -sh dist/

# Validar archivos minificados
ls -lah dist/js/
ls -lah dist/*.html
```

## 🔄 Actualizar HTML para Producción

### Desarrollo
```html
<script src="js/planes.js"></script>
<script src="js/pwa-register.js"></script>
```

### Producción
```html
<script src="js/planes.min.js"></script>
<script src="js/pwa-register.min.js"></script>
```

### Service Worker (Siempre sin minificar)
```html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/js/sw.js');
  }
</script>
```

## 🚀 Deploy a Producción

```bash
# 1. Ejecutar tests
npm test

# 2. Generar build minificado
npm run build

# 3. Verificar tamaños
du -sh dist/

# 4. Copiar archivos a servidor
scp -r dist/* user@servidor:/var/www/oceansbits/

# 5. Actualizar references en HTML
# Cambiar js/planes.js → js/planes.min.js

# 6. Verificar en navegador
curl -I https://oceansbits.com/
```

## 🔍 Validación en Navegador

1. **Abrir DevTools (F12)**
2. **Tab Network**
3. **Recargar página**
4. **Verificar tamaños:**
   - JS debe ser ~3KB (minificado)
   - HTML debe ser ~15KB (minificado)

## 🚨 Problemas Comunes

### Problema: Código no funciona después de minificación

**Solución:**
```javascript
// ❌ Evitar
const obj = { key: value };

// ✅ Usar
const obj = { 'key': value };
```

### Problema: Debugging difícil en producción

**Solución:** Usar source maps
```bash
terser input.js --output output.min.js --source-map
```

## 📈 Beneficios Medibles

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|---------|
| Tamaño JS | 11.7 KB | 3.0 KB | 74% ↓ |
| Tamaño HTML | 180 KB | 45 KB | 75% ↓ |
| Tiempo carga | 2.5s | 0.8s | 68% ↓ |
| Bandwidth | 200 KB | 50 KB | 75% ↓ |

## 🔐 Seguridad

- ✅ Minificación NO es encriptación
- ✅ El código sigue siendo visible (puedes desminificar)
- ✅ Usar HTTPS en producción
- ✅ Usar CSP headers
- ✅ Usar SRI (Subresource Integrity)

## 📚 Recursos

- [Terser Documentation](https://terser.org/)
- [Clean CSS](https://github.com/clean-css/clean-css)
- [html-minifier](https://github.com/kangax/html-minifier)
- [Webpack Documentation](https://webpack.js.org/)

---

**Última actualización:** 5 de Febrero 2026
