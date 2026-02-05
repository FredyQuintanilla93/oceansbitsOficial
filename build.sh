#!/bin/bash

# build.sh - Script de compilación para minificación
# Uso: bash build.sh [development|production]

MODE=${1:-production}

echo "🔨 Iniciando compilación en modo: $MODE"

# Crear carpeta dist si no existe
mkdir -p dist/js

# Copiar Service Worker sin minificar (necesario para producción)
echo "📦 Copiando Service Worker..."
cp js/sw.js dist/js/sw.js

# Minificar JavaScript con Terser
echo "🗜️ Minificando JavaScript..."
if command -v terser &> /dev/null; then
  terser js/planes.js \
    --compress drop_console=true,dead_code=true \
    --mangle \
    --output dist/js/planes.min.js \
    --source-map

  terser js/pwa-register.js \
    --compress drop_console=true,dead_code=true \
    --mangle \
    --output dist/js/pwa-register.min.js \
    --source-map
  
  echo "✅ JavaScript minificado"
else
  echo "⚠️ Terser no instalado. Instalalo con: npm install -g terser"
fi

# Minificar CSS si existen archivos
if [ -d "css" ]; then
  echo "🎨 Minificando CSS..."
  if command -v cleancss &> /dev/null; then
    cleancss css/*.css -o dist/styles.min.css
    echo "✅ CSS minificado"
  else
    echo "⚠️ clean-css no instalado. Instalalo con: npm install -g clean-css-cli"
  fi
fi

# Minificar HTML
echo "📄 Minificando HTML..."
if command -v html-minifier &> /dev/null; then
  for html_file in *.html; do
    if [ -f "$html_file" ]; then
      html-minifier --input-dir . --output-dir dist --file-ext html "$html_file"
    fi
  done
  echo "✅ HTML minificado"
else
  echo "⚠️ html-minifier no instalado. Instalalo con: npm install -g html-minifier"
fi

# Generar reporte de tamaño
echo ""
echo "📊 Reporte de tamaño:"
echo "===================="
echo ""
echo "JavaScript original:"
du -sh js/

echo ""
echo "JavaScript minificado:"
du -sh dist/js/ 2>/dev/null || echo "No minificado"

echo ""
echo "Total dist:"
du -sh dist/

if [ "$MODE" = "production" ]; then
  echo ""
  echo "✅ Compilación para PRODUCCIÓN completada"
  echo "🚀 Archivos listos en carpeta: dist/"
  echo "📝 Actualiza tu index.html para usar:"
  echo "   <script src=\"js/planes.min.js\"></script>"
  echo "   <script src=\"js/pwa-register.min.js\"></script>"
else
  echo ""
  echo "✅ Compilación para DESARROLLO completada"
fi

echo ""
echo "⏱️ Compilación finalizada"
