# Atlas Encephali

Atlas 3D interactivo del encéfalo con fines de enseñanza. Es el módulo 01 de un proyecto más amplio de anatomía interactiva (futuros módulos: corazón, pulmones, hígado).

Toda la aplicación es un solo archivo, `index.html`, que funciona sin servidor. Los datos anatómicos van incrustados.

## Qué hace

**Anatomía**
- Superficie cortical real de un cerebro promedio: fsaverage5 de FreeSurfer, unos 10 000 vértices por hemisferio.
- Tres niveles de parcelación:
  - lóbulos;
  - 68 regiones de Desikan-Killiany;
  - 360 áreas del atlas multimodal HCP-MMP1 (Glasser y cols., 2016).
- Núcleos profundos: tálamo, caudado, putamen, pálido, accumbens, hipocampo y amígdala.
- Ventrículos laterales, tronco del encéfalo y cerebelo por lóbulos de Larsell.
- Una región seleccionada se separa de la superficie. El control "Inflar" despliega los surcos, "Separar" aleja los bloques y "Corteza" la vuelve translúcida para ver las estructuras profundas.

**Patología**
Mapas de la d de Cohen (casos − controles) de los metaanálisis del consorcio ENIGMA para 10 trastornos:
- esquizofrenia, trastorno bipolar, depresión mayor, TOC;
- TEA, TDAH;
- epilepsia temporal con esclerosis hipocampal;
- Parkinson, anorexia nerviosa, síndrome de deleción 22q11.2.

Cada ficha anatómica cruza su región con los diez trastornos.

**Simulación** (didáctica)
- **Ictus:** territorios de las arterias cerebrales media (tronco, división superior e inferior), anterior y posterior, con los déficits según el lado.
- **Glioblastoma:** crecimiento con edema y efecto de masa. El tejido se desplaza como un medio incompresible, con frenado por la hoz y el cráneo. Calcula la desviación de la línea media.

## Estructura

```
index.html              aplicación compilada (abrir directamente en el navegador)
src/template.html       interfaz, motor 3D (three.js r128) y lógica
src/content.js          textos: regiones, estructuras, trastornos, territorios
pipeline/process.py     genera build/ a partir de los atlas originales
pipeline/build_page.py  ensambla index.html desde src/ y build/
build/atlas.bin.gz      mallas y etiquetas cuantizadas (int16, 0,01 mm)
build/meta.json         índice del binario, nombres y estadísticas ENIGMA
```

## Reconstruir

```bash
pip install -r pipeline/requirements.txt
# datos de entrada (en el directorio de trabajo de process.py):
git clone --depth 1 https://github.com/MICA-MNI/ENIGMA.git
# + neuroparc (Harvard-Oxford subcortical 1 mm) en ./np
# + DiedrichsenLab/cerebellar_atlases en ./ca
python pipeline/process.py        # escribe out/atlas.bin.gz y out/meta.json -> copiar a build/
python pipeline/build_page.py     # escribe index.html
```

Las coordenadas de fsaverage (MNI305) se llevan a MNI152 con la matriz de FreeSurfer. Después se pasan de RAS a los ejes de three.js (x derecha, y arriba, z anterior).

## Fuentes y licencias de los datos

| Componente | Fuente | Nota de licencia |
|---|---|---|
| Superficies corticales | fsaverage5, FreeSurfer (vía nilearn) | Licencia de FreeSurfer |
| Parcelaciones y estadísticas | ENIGMA Toolbox (Larivière y cols., 2021, Nature Methods) | BSD-3; los datos HCP-MMP1 siguen los términos del Human Connectome Project |
| Núcleos, tronco, ventrículos | Atlas Harvard-Oxford subcortical (FSL), vía neuroparc | **Licencia FSL: uso no comercial** |
| Cerebelo | Diedrichsen y cols. (2009), DiedrichsenLab/cerebellar_atlases | Ver el repositorio original |

Antes de cualquier uso comercial hay que revisar estas licencias. La del atlas Harvard-Oxford no lo permite sin acuerdo.

## Advertencia

Es un recurso educativo. Muestra un cerebro promedio y diferencias medias entre grupos de miles de personas. No sirve para diagnosticar ni para predecir la evolución de un paciente.
