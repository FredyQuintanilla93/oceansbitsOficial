# build-package.json - Alternativa a webpack
# Use este archivo si prefieres una solución más simple sin webpack

# Instalación:
# npm install -g terser clean-css-cli html-minifier

# O instalación local:
npm install --save-dev terser clean-css-cli html-minifier

# Scripts disponibles:
# npm run build          - Minifica todo (JS, CSS, HTML)
# npm run minify:js      - Minifica solo JavaScript
# npm run minify:css     - Minifica solo CSS
# npm run minify:html    - Minifica solo HTML
# npm run prod           - Build + tests de cobertura

# Estructura de salida:
# dist/
#   ├── js/
#   │   ├── planes.min.js
#   │   ├── pwa-register.min.js
#   │   └── sw.js (sin minificar en producción)
#   ├── styles.min.css
#   └── *.html (minificados)
