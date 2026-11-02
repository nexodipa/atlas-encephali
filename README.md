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
- Núcleos profundos: tálamo, caudado, putamen, pálido, accumbens, hipocampo, amígdala y prosencéfalo basal.
- Mesencéfalo y diencéfalo: sustancia negra (compacta y reticulada), área tegmental ventral, núcleo rojo, subtalámico, hipotálamo, habénula y cuerpos mamilares.
- Sistema ventricular (laterales, III y IV), quiasma óptico, tronco del encéfalo y cerebelo por lóbulos de Larsell.
- 75 tractos de sustancia blanca: asociación, proyección, comisurales, pedúnculos cerebelosos, vías del tronco y pares craneales. Se colorean por tipo o por dirección, como en la imagen por tensor de difusión.
- Sistemas de neurotransmisores animados: dopamina (vías nigroestriatal, mesolímbica, mesocortical y tuberoinfundibular), serotonina, noradrenalina y acetilcolina.
- Los lóbulos se seleccionan como unidades completas, con ficha propia (funciones, clínica, conexiones y regiones que lo forman).
- Una región seleccionada se separa de la superficie. El control "Inflar" despliega los surcos, "Separar" aleja los bloques y "Corteza" la vuelve translúcida para ver las estructuras profundas.

**Patología**
Mapas de la d de Cohen (casos − controles) de los metaanálisis del consorcio ENIGMA para 10 trastornos:
- esquizofrenia, trastorno bipolar, depresión mayor, TOC;
- TEA, TDAH;
- epilepsia temporal con esclerosis hipocampal;
- Parkinson, anorexia nerviosa, síndrome de deleción 22q11.2.

Cada ficha anatómica cruza su región con los diez trastornos. Para esquizofrenia y Parkinson se muestra además la alteración dopaminérgica: exceso mesolímbico y déficit mesocortical en el primer caso, pérdida nigroestriatal en el segundo.

**Patología** (cinco pestañas)
- **Psicopatología:** 14 trastornos como modelos de circuito (esquizofrenia, bipolar, depresión, ansiedad generalizada, pánico, TEPT, TOC, TDAH, autismo, Tourette, adicción, anorexia, límite de la personalidad, catatonia). Mapa de hiper e hipoactividad, circuitos y sistemas de neurotransmisores animados, síntomas asociados a cada circuito y fármacos enlazados.
- **Organicidad:** 19 causas médicas de cuadros psiquiátricos (delirium, encefalitis anti-NMDA y herpética, Wernicke-Korsakoff, encefalopatía hepática, tiroides, B12, neurosífilis, VIH, traumatismo, tumor frontal, epilepsia temporal, hidrocefalia normotensiva, monóxido de carbono, metanol, corticoides, lupus, porfiria, demencia frontotemporal), con signos de alarma, diagnóstico y tratamiento.
- **Neurodegenerativas:** 14 procesos con progresión por estadios: Alzheimer, Parkinson, ELA, Huntington, esclerosis múltiple, hidrocefalia, demencia frontotemporal conductual, cuerpos de Lewy, parálisis supranuclear progresiva, atrofia multisistémica, degeneración corticobasal, atrofia cortical posterior, afasias progresivas primarias y demencia vascular subcortical.
- **Raras:** 20 enfermedades, de Wilson y Creutzfeldt-Jakob a Niemann-Pick C, CADASIL, esclerosis tuberosa, insomnio familiar fatal o narcolepsia tipo 1.
- **ENIGMA:** mapas de grosor y volumen de 10 trastornos.

**Fármacos**
81 fármacos en 11 clases. Cada uno muestra:
- el perfil de afinidad por diana y el tipo de acción (antagonista, agonista parcial, inhibidor...);
- la densidad real de sus dianas en el cerebro, a partir de 20 mapas PET (Hansen y cols., 2022), una por una o como huella combinada;
- la curva de ocupación según la dosis para antipsicóticos (D2) y antidepresivos (SERT), con las ventanas clínicas;
- su efecto sobre los sistemas de neurotransmisores, ahora con histamina y orexina, modulado por la dosis;
- mecanismo, efecto buscado, efectos adversos y los trastornos en que se usa.

**Herramientas académicas (v6)**
- **Referencias verificadas:** 119 artículos comprobados contra PubMed (autor, revista, año, volumen y página), enlazados por PMID y DOI en cada ficha, y una bibliografía general.
- **Guías clínicas y nivel de recomendación:** cada trastorno enlaza sus guías (APA, NICE, CANMAT, BAP) y marca los fármacos como primera línea, segunda línea, potenciación, casos resistentes o evidencia limitada o negativa.
- **Estudio:** 20 casos clínicos de localización (el estudiante toca la estructura lesionada en un cerebro sin colores ni nombres y recibe corrección y pregunta de seguimiento), banco de más de 230 preguntas y tarjetas de repetición espaciada (Leitner) en siete mazos.
- **Semiología:** exploración neurológica con localización resaltada en el modelo (pares craneales, motor, sensibilidad, cerebelo, ganglios basales, mirada, funciones corticales) y psicopatología descriptiva (examen del estado mental, curso y forma del pensamiento, delirios, alucinaciones, Schneider, síntomas negativos, catatonia).
- **Cortes seccionales:** cortes axiales, coronales y sagitales sobre la plantilla MNI ICBM152 con estructuras (CerebrA) o tractos superpuestos; al pasar el cursor se identifica la estructura y sus coordenadas MNI.
- **Farmacología clínica:** vida media, metabolismo, monitorización y embarazo para 43 fármacos, equivalencias de antipsicóticos y benzodiacepinas, y un comprobador de interacciones por mecanismo.
- **Terminología:** nombres en latín e inglés en las fichas, glosario trilingüe con búsqueda y códigos CIE-11.

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
# + frankyeh/data-atlas (human/CerebrA, human/HCP842_tractography) en ./data-atlas
# + niivue/niivue-demo-images (CIT168) en ./niivue-demo-images
# + DiedrichsenLab/cerebellar_atlases en ./ca
# + netneurolab/hansen_receptors (data/PET_nifti_images) en ./hr
python pipeline/process.py        # escribe out/atlas.bin.gz y out/meta.json -> copiar a build/
python pipeline/build_page.py     # escribe index.html
```

Las coordenadas de fsaverage (MNI305) se llevan a MNI152 con la matriz de FreeSurfer. Después se pasan de RAS a los ejes de three.js (x derecha, y arriba, z anterior).

## Fuentes y licencias de los datos

| Componente | Fuente | Nota de licencia |
|---|---|---|
| Superficies corticales | fsaverage5, FreeSurfer (vía nilearn) | Licencia de FreeSurfer |
| Parcelaciones y estadísticas | ENIGMA Toolbox (Larivière y cols., 2021, Nature Methods) | BSD-3; los datos HCP-MMP1 siguen los términos del Human Connectome Project |
| Núcleos, tronco, ventrículos | CerebrA (Manera y cols., 2020), plantilla MNI ICBM 2009c | Licencia MNI: uso, copia y distribución libres con aviso de copyright |
| Núcleos del mesencéfalo y diencéfalo | CIT168 (Pauli y cols., 2018) | CC BY 4.0 |
| Tractos | Atlas HCP-842 (Yeh y cols., 2018), vía frankyeh/data-atlas | Datos del Human Connectome Project; ver el repositorio original |
| Cerebelo | Diedrichsen y cols. (2009) | **CC BY-NC 3.0: uso no comercial** |
| Plantilla para cortes | MNI ICBM152 2009 simétrica (vía nilearn) | Licencia MNI: uso libre con aviso de copyright |
| Receptores (PET) | Hansen y cols. (2022), netneurolab/hansen_receptors | **CC BY-NC-SA 4.0: no comercial, compartir igual** |

El proyecto es de acceso libre y sin fines comerciales. Dos piezas tienen licencia no comercial (el atlas de lóbulos del cerebelo y los mapas de receptores); los mapas de receptores además obligan a compartir sus derivados con la misma licencia.

## Cómo citar

Ver `CITATION.cff`. Para obtener un DOI permanente: activar el repositorio en Zenodo (zenodo.org, sección GitHub) y publicar una *release* en GitHub; Zenodo archiva cada versión y le asigna un DOI.

## Licencias del proyecto

Código: MIT (`LICENSE`). Contenido textual: CC BY-NC-SA 4.0 (`LICENSE-CONTENT.md`). Estado de revisión académica: `REVIEW.md`.

## Advertencia

Es un recurso educativo. Muestra un cerebro promedio y diferencias medias entre grupos de miles de personas. No sirve para diagnosticar ni para predecir la evolución de un paciente.
