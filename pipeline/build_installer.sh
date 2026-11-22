#!/usr/bin/env bash
# Construye el instalador de Windows sin wine: electron-packager (binarios win32) + makensis.
# Uso: bash pipeline/build_installer.sh   (después de build_page.py y build_app.py)
set -euo pipefail
cd "$(dirname "$0")/../app/electron"
VER=$(node -p "require('./package.json').version")
rm -rf www dist dist-installer && cp -r ../www www && mkdir dist-installer
npx electron-packager . "Atlas Encephali" --platform=win32 --arch=x64 --out=dist --overwrite --icon=../icons/icon.ico \
  --ignore="^/dist" --ignore="^/node_modules" --ignore="installer.nsi" --app-version="$VER" --build-version="$VER" \
  --app-copyright="Nexo Digital Partners" --win32metadata.CompanyName="Nexo Digital Partners" \
  --win32metadata.FileDescription="Atlas Encephali" --win32metadata.ProductName="Atlas Encephali"
makensis -V2 -DVERSION="$VER" installer.nsi
ls -la dist-installer
