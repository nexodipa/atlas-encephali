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
- Núcleos del tálamo (atlas THOMAS): anteroventral, ventral anterior, ventral lateral anterior y posterior (VIM), ventral posterolateral, pulvinar, geniculados lateral y medial, centromediano, mediodorsal y habénula. Se activan como capa propia y sustituyen al tálamo en bloque.
- Núcleos del sistema activador ascendente del tronco (atlas Harvard AAN v2): locus coeruleus, rafe dorsal y mediano, sustancia gris periacueductal, pedunculopontino, laterodorsal, complejo parabraquial, reticular oral del puente y formación reticular mesencefálica. Las vías de noradrenalina y serotonina parten ahora de sus centroides reales.
- Territorios arteriales a nivel de vértice (atlas JHU, 1298 pacientes con ictus): mapa «Arterias» con 15 territorios (cerebrales anterior, media en cinco ramas y posterior en dos, lenticuloestriadas mediales y laterales, coroidea anterior, talamoperforantes, basilar, cerebelosas superior e inferiores), ficha de cada territorio y la irrigación de cada núcleo en porcentaje.
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
- **Psicopatología:** 113 entradas que cubren los 21 capítulos del DSM-5-TR (incluidas la conducta suicida y la autolesión no suicida), desde el neurodesarrollo hasta los trastornos motores inducidos por medicamentos, con código CIE-11. Cada una indica la solidez de su modelo de circuito (consolidado, parcial o preliminar); cuando no hay un patrón cerebral consistente, como en la disforia de género, los trastornos parafílicos o varios trastornos de la personalidad, el modelo queda en gris en lugar de inventar uno. Mapa de hiper e hipoactividad, circuitos, sistemas de neurotransmisores, síntomas asociados a cada circuito, fármacos con nivel de recomendación y guías.
- **Organicidad:** 36 causas médicas de cuadros psiquiátricos en diez grupos, entre ellas neurocisticercosis, encefalitis límbica autoinmune, hiponatremia, hipoglucemia, Cushing, Addison, hipercalcemia, uremia, pelagra, feocromocitoma, síndromes serotoninérgico y anticolinérgico, intoxicación por litio, metales pesados y depresión tras ictus, además de (delirium, encefalitis anti-NMDA y herpética, Wernicke-Korsakoff, encefalopatía hepática, tiroides, B12, neurosífilis, VIH, traumatismo, tumor frontal, epilepsia temporal, hidrocefalia normotensiva, monóxido de carbono, metanol, corticoides, lupus, porfiria, demencia frontotemporal), con signos de alarma, diagnóstico y tratamiento.
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
- **Referencias verificadas:** 188 artículos comprobados en PubMed, más el DSM-5-TR, contra PubMed (autor, revista, año, volumen y página), enlazados por PMID y DOI en cada ficha, y una bibliografía general.
- **Guías clínicas y nivel de recomendación:** cada trastorno enlaza sus guías (APA, NICE, CANMAT, BAP) y marca los fármacos como primera línea, segunda línea, potenciación, casos resistentes o evidencia limitada o negativa.
- **Estudio:** 31 casos clínicos de localización (el estudiante toca la estructura lesionada en un cerebro sin colores ni nombres y recibe corrección y pregunta de seguimiento), banco de más de 230 preguntas y tarjetas de repetición espaciada (Leitner) en siete mazos.
- **Semiología:** exploración neurológica con localización resaltada en el modelo (pares craneales, motor, sensibilidad, cerebelo, ganglios basales, mirada, funciones corticales) y psicopatología descriptiva (examen del estado mental, curso y forma del pensamiento, delirios, alucinaciones, Schneider, síntomas negativos, catatonia).
- **Cortes seccionales:** cortes axiales, coronales y sagitales sobre la plantilla MNI ICBM152 con estructuras (CerebrA) o tractos superpuestos; al pasar el cursor se identifica la estructura y sus coordenadas MNI.
- **Farmacología clínica:** vida media, metabolismo, monitorización y embarazo para 43 fármacos, equivalencias de antipsicóticos y benzodiacepinas, y un comprobador de interacciones por mecanismo.
- **Terminología:** nombres en latín e inglés en las fichas, glosario trilingüe con búsqueda y códigos CIE-11.

**Aprender**
- **Rutas de aprendizaje:** cinco programas por asignatura (neuroanatomía funcional, neurología clínica, psicopatología, psicofarmacología, neuropsiquiatría y organicidad) que ordenan en unidades 153 actividades: recorridos, fichas, casos, diferenciales, simulaciones, preguntas y tarjetas. El progreso se guarda en el navegador, con un botón para continuar donde se dejó.
- **Recorridos guiados:** catorce explicaciones paso a paso sobre el modelo, con cámara animada, estructuras que se encienden, flujos de neurotransmisores y reproducción automática o con las flechas del teclado: circuito de Papez, vías de la dopamina y antipsicóticos, vía visual, lenguaje y afasias, vía motora, miedo y extinción, recompensa y adicción, sueño y vigilia, pares craneales, territorios arteriales, eje del estrés, serotonina y antidepresivos, sistema límbico, y sistema activador ascendente y conciencia.
- **Modo clase:** oculta los controles y muestra el texto del recorrido en grande sobre el modelo, con botones para avanzar; pensado para proyectar.
- **Casos que evolucionan:** diez casos ramificados (108 recorridos posibles) en los que cada decisión cambia la evolución del paciente, las constantes y lo que muestra el modelo: psicosis por encefalitis anti-NMDA, delirium posoperatorio, ictus con oclusión de la cerebral media, síndrome serotoninérgico, intoxicación por litio, estado epiléptico, primer episodio maníaco, delirium tremens, hemorragia subaracnoidea y meningitis bacteriana. Al final se muestra cada decisión con su explicación, la puntuación y las referencias; el mejor resultado se guarda en el navegador.
- **Diagnóstico diferencial:** dos fichas cualesquiera (psicopatología, organicidad, neurodegenerativas, raras) lado a lado, con sus regiones en colores distintos y comunes en un tercero, una tabla comparativa y 17 pares clásicos con las claves para distinguirlos y la prueba que suele decidir (pánico y feocromocitoma, esquizofrenia y encefalitis anti-NMDA, síndrome neuroléptico maligno y serotoninérgico, delirium y demencia, entre otros).

**Simulación** (didáctica)
- **Ictus:** once oclusiones sobre los territorios reales del atlas JHU, en corteza, núcleos, tronco y cerebelo: cerebral media (tronco, división superior e inferior), anterior y posterior, lenticuloestriadas (infarto lacunar), coroidea anterior, perforantes talámicas, basilar, cerebelosa superior y cerebelosas inferiores, con los déficits según el lado.
- **Hemorragia intraparenquimatosa:** putamen, tálamo, caudado, lobar, cerebelo y protuberancia; volumen con su estimación ABC/2, calculadora de la escala ICH (Hemphill y cols., 2001) y manejo inicial según la guía AHA/ASA 2022.
- **Metástasis:** hasta diez lesiones en la unión corticosubcortical, cinco tumores primarios y la conducta según el número de lesiones (radiocirugía, cirugía, radioterapia holocraneal con protección del hipocampo).
- **Glioblastoma:** crecimiento con edema y efecto de masa. El tejido se desplaza como un medio incompresible, con frenado por la hoz y el cráneo. Calcula la desviación de la línea media.

**Idiomas**
Selector en la cabecera con 13 idiomas: español, inglés, francés, alemán, portugués, italiano, ruso, chino simplificado, japonés, coreano, árabe, hebreo e hindi. Árabe y hebreo invierten la maquetación (derecha a izquierda) y cada escritura carga su tipografía Noto.
- La interfaz (modos, controles, vistas, cortes, leyendas) viene traducida en el propio archivo.
- El contenido (fichas, casos, preguntas) se traduce bajo demanda con Claude cuando el atlas se abre en claude.ai, con instrucciones de terminología médica, y se guarda en el navegador. Es traducción automática y se marca como tal.
- Las traducciones se pueden exportar y, revisadas, añadirse a `lang/` como paquetes que se incrustan en la compilación (ver `lang/README.md`). Abierta fuera de claude.ai, la copia de GitHub muestra traducida la interfaz y lo que tenga paquete; el resto queda en español.

**Accesibilidad:** con el foco en el modelo, las flechas lo giran y + y − acercan o alejan; los recorridos avanzan con las flechas; la interfaz se adapta a móviles.

## Estructura

```
index.html              aplicación compilada (abrir directamente en el navegador)
src/template.html       interfaz, motor 3D (three.js r128) y lógica
src/content*.js         textos: regiones, estructuras, trastornos, territorios, casos, recorridos (content9: núcleos finos y arterias)
src/i18n.js             idiomas: selector, paquetes de interfaz y traducción bajo demanda
lang/*.json             paquetes de traducción revisados (opcional)
pipeline/process.py     genera build/ a partir de los atlas originales
pipeline/process_ext.py añade a build/ los núcleos talámicos, los del tronco y los territorios arteriales
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
# + frankyeh/data-atlas (human/THOMAS), canlab/Neuroimaging_Pattern_Masks (2023_harvard_aan_brainstem_atlas)
#   y el atlas arterial JHU (Atlas_MNI152.zip) en $ATLAS_DATA
python pipeline/process_ext.py    # añade núcleos finos y territorios arteriales a build/
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
| Núcleos del tálamo | THOMAS (Saranathan y cols., 2021), vía frankyeh/data-atlas | CC0 |
| Núcleos del sistema activador del tronco | Harvard AAN v2 (Edlow y cols., 2024), vía canlab/Neuroimaging_Pattern_Masks | CC0 |
| Territorios arteriales | Digital 3D Brain MRI Arterial Territories Atlas (Liu y cols., 2023), Johns Hopkins | **CC BY-SA 4.0: compartir igual**; las etiquetas derivadas en `build/` (`art_*`, `*_art`) se distribuyen con la misma licencia |

El proyecto es de acceso libre y sin fines comerciales. Dos piezas tienen licencia no comercial (el atlas de lóbulos del cerebelo y los mapas de receptores); los mapas de receptores además obligan a compartir sus derivados con la misma licencia.

## Cómo citar

Ver `CITATION.cff`. Para obtener un DOI permanente: activar el repositorio en Zenodo (zenodo.org, sección GitHub) y publicar una *release* en GitHub; Zenodo archiva cada versión y le asigna un DOI.

## Licencias del proyecto

Código: MIT (`LICENSE`). Contenido textual: CC BY-NC-SA 4.0 (`LICENSE-CONTENT.md`). Estado de revisión académica: `REVIEW.md`.

## Advertencia

Es un recurso educativo. Muestra un cerebro promedio y diferencias medias entre grupos de miles de personas. No sirve para diagnosticar ni para predecir la evolución de un paciente.
