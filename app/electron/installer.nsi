; Instalador de Atlas Encephali para Windows (NSIS, sin permisos de administrador).
; Un doble clic: instala en %LOCALAPPDATA%\Programs\Atlas Encephali, crea accesos en el escritorio y en Inicio,
; registra el desinstalador y abre la app. Se construye con makensis en Linux (pipeline/build_installer.sh).
Unicode true
!include "MUI2.nsh"
!define APPNAME "Atlas Encephali"
!ifndef VERSION
  !define VERSION "16.0.0"
!endif
!ifndef SRCDIR
  !define SRCDIR "dist\Atlas Encephali-win32-x64"
!endif
Name "${APPNAME}"
OutFile "dist-installer\AtlasEncephali-Setup-${VERSION}.exe"
InstallDir "$LOCALAPPDATA\Programs\${APPNAME}"
RequestExecutionLevel user
SetCompressor /SOLID lzma
BrandingText "Atlas Encephali ${VERSION}"
VIProductVersion "${VERSION}.0"
VIAddVersionKey "ProductName" "${APPNAME}"
VIAddVersionKey "CompanyName" "Nexo Digital Partners"
VIAddVersionKey "FileDescription" "Instalador de ${APPNAME}"
VIAddVersionKey "FileVersion" "${VERSION}"
VIAddVersionKey "ProductVersion" "${VERSION}"
VIAddVersionKey "LegalCopyright" "Nexo Digital Partners"

!define MUI_ICON "..\icons\icon.ico"
!define MUI_UNICON "..\icons\icon.ico"
!define MUI_INSTFILESPAGE_COLORS "E8E4DA 0A0F12"
!define MUI_FINISHPAGE_NOAUTOCLOSE
!define MUI_FINISHPAGE_RUN "$INSTDIR\${APPNAME}.exe"
!define MUI_FINISHPAGE_RUN_TEXT "Abrir Atlas Encephali"
!define MUI_FINISHPAGE_TITLE "Atlas Encephali está instalado"
!define MUI_FINISHPAGE_TEXT "Lo encontrarás en el escritorio y en el menú Inicio. Se actualiza solo al abrirlo con conexión y funciona sin ella."
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES
!insertmacro MUI_LANGUAGE "Spanish"

Section "Instalar"
  ; cerrar una copia abierta antes de reemplazar archivos
  nsExec::Exec 'taskkill /IM "${APPNAME}.exe" /F'
  SetOutPath "$INSTDIR"
  File /r "${SRCDIR}\*.*"
  WriteUninstaller "$INSTDIR\Desinstalar.exe"
  CreateShortcut "$DESKTOP\${APPNAME}.lnk" "$INSTDIR\${APPNAME}.exe" "" "$INSTDIR\${APPNAME}.exe" 0
  CreateShortcut "$SMPROGRAMS\${APPNAME}.lnk" "$INSTDIR\${APPNAME}.exe" "" "$INSTDIR\${APPNAME}.exe" 0
  !define UNKEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\AtlasEncephali"
  WriteRegStr HKCU "${UNKEY}" "DisplayName" "${APPNAME}"
  WriteRegStr HKCU "${UNKEY}" "DisplayVersion" "${VERSION}"
  WriteRegStr HKCU "${UNKEY}" "Publisher" "Nexo Digital Partners"
  WriteRegStr HKCU "${UNKEY}" "DisplayIcon" "$INSTDIR\${APPNAME}.exe"
  WriteRegStr HKCU "${UNKEY}" "InstallLocation" "$INSTDIR"
  WriteRegStr HKCU "${UNKEY}" "UninstallString" '"$INSTDIR\Desinstalar.exe"'
  WriteRegStr HKCU "${UNKEY}" "URLInfoAbout" "https://github.com/nexodipa/atlas-encephali"
  WriteRegDWORD HKCU "${UNKEY}" "NoModify" 1
  WriteRegDWORD HKCU "${UNKEY}" "NoRepair" 1
SectionEnd

Section "Uninstall"
  nsExec::Exec 'taskkill /IM "${APPNAME}.exe" /F'
  Delete "$DESKTOP\${APPNAME}.lnk"
  Delete "$SMPROGRAMS\${APPNAME}.lnk"
  RMDir /r "$INSTDIR"
  DeleteRegKey HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\AtlasEncephali"
SectionEnd
