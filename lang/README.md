# Paquetes de idioma revisados

Cada archivo `xx.json` (código ISO 639-1: `en`, `fr`, `zh`…) es una memoria de traducción: la clave es el texto español normalizado (números como `{0}`, fragmentos de un mismo párrafo unidos por `␟`) y el valor, la lista de fragmentos traducidos.

Flujo:
1. Abrir el atlas en claude.ai, elegir el idioma y recorrer las fichas: Claude traduce lo que falta y lo guarda en el navegador.
2. "Exportar traducciones" descarga `atlas-encephali-xx.json`.
3. Un revisor con formación clínica corrige el archivo y lo guarda aquí como `xx.json`.
4. `python pipeline/build_page.py` lo incrusta. Lo que está en un paquete revisado tiene prioridad sobre la traducción automática y funciona también sin conexión a Claude (copia de GitHub).
