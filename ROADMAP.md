# Hoja de ruta

## Hecho (v2)
- [x] Corteza real (fsaverage5) con parcelación Desikan-Killiany y HCP-MMP1
- [x] Núcleos profundos, ventrículos laterales, tronco y cerebelo por lóbulos
- [x] Mapas de patología ENIGMA (10 trastornos), cruzados en cada ficha
- [x] Simulaciones: ictus por territorio arterial; glioblastoma con efecto de masa

## Hecho (v3)
- [x] 75 tractos de sustancia blanca (HCP-842), con color por tipo o por dirección
- [x] Sistemas de neurotransmisores animados (dopamina, serotonina, noradrenalina, acetilcolina)
- [x] Ventrículos III y IV, quiasma, prosencéfalo basal
- [x] Núcleos del mesencéfalo y diencéfalo (CIT168)
- [x] Sustitución de Harvard-Oxford (no comercial) por CerebrA (licencia permisiva)
- [x] Esquizofrenia y Parkinson como alteración dopaminérgica en el modo Patología

## Hecho (v4)
- [x] Lóbulos como unidades seleccionables con ficha propia
- [x] Enfermedades por estadios: Alzheimer, Parkinson, ELA, Huntington, esclerosis múltiple, hidrocefalia
- [x] Nueve enfermedades raras con su distribución característica
- [x] Modo Fármacos: 16 fármacos sobre 20 mapas PET de receptores y los sistemas de neurotransmisores

## Hecho (v5)
- [x] Catálogo de 81 fármacos con perfil de afinidad, huella combinada y curvas de ocupación por dosis
- [x] Sistemas de histamina y orexina
- [x] Psicopatología: 14 trastornos como modelos de circuito
- [x] Organicidad: 19 causas médicas de cuadros psiquiátricos
- [x] Ocho neurodegenerativas más y once enfermedades raras más

## Hecho (v6, académico)
- [x] 119 referencias verificadas en PubMed, enlazadas en las fichas, y bibliografía general
- [x] Guías clínicas y nivel de recomendación de los tratamientos
- [x] Casos clínicos de localización, banco de preguntas y tarjetas de repetición espaciada
- [x] Semiología neurológica y psicopatología descriptiva
- [x] Cortes seccionales sobre la plantilla MNI con estructuras y tractos
- [x] Farmacocinética, monitorización, embarazo, equivalencias e interacciones
- [x] Terminología latina e inglesa, glosario y códigos CIE-11
- [x] Licencias, CITATION.cff, metadatos para Zenodo y registro de revisión

## Hecho (v7, idiomas)
- [x] Selector de 13 idiomas, con derecha a izquierda para árabe y hebreo y tipografías Noto por escritura
- [x] Interfaz traducida a mano en los 13 idiomas
- [x] Contenido traducido bajo demanda con Claude, guardado en el navegador y exportable
- [x] Paquetes revisados en `lang/` incrustados en la compilación

## Hecho (v8, clínica)
- [x] Simulación de hemorragia intraparenquimatosa: seis localizaciones, volumen y ABC/2, escala ICH y manejo según la guía AHA/ASA 2022
- [x] Simulación de metástasis múltiples con cinco primarios y la conducta según el número de lesiones (guía ASCO-SNO-ASTRO 2022)
- [x] Seis psicopatologías más: neurológico funcional, malestar corporal, despersonalización, insomnio crónico, conducta del sueño REM y atracón
- [x] Once casos clínicos más (tronco, diencéfalo, síndromes corticales y diagnósticos diferenciales psiquiátricos) y doce preguntas
- [x] 21 referencias nuevas verificadas en PubMed

## Hecho (v9, DSM-5-TR)
- [x] Psicopatología ampliada a 77 entradas y ordenada por los 20 capítulos del DSM-5-TR
- [x] Nivel de solidez del modelo de circuito en cada trastorno
- [x] 15 referencias nuevas verificadas en PubMed y el DSM-5-TR como referencia general

## Hecho (v10)
- [x] Resto de los diagnósticos del DSM-5-TR: 113 entradas en 21 capítulos
- [x] Organicidad ampliada a 36 causas en diez grupos
- [x] 19 referencias nuevas verificadas en PubMed

## Hecho (v11, aprender)
- [x] Modo Aprender con ocho recorridos guiados
- [x] Diagnóstico diferencial lado a lado con 17 pares clásicos

## Siguiente (visión docente)
- [x] Casos que evolucionan: cinco casos ramificados (v12)
- [x] Cinco casos que evolucionan más (v13)
- [ ] Progreso sincronizado entre dispositivos y paneles para docentes (requiere cuentas)
- [x] Rutas de aprendizaje por asignatura con registro de progreso (v13)
- [x] Recorridos de pares craneales, territorios arteriales, eje del estrés, serotonina y sistema límbico (v13)
- [x] Modo clase para proyectar (v13)

## Pendiente académico
- [ ] Revisión por docentes de cada módulo (ver REVIEW.md)
- [ ] DOI de Zenodo (activar la integración y publicar una release)
- [ ] Paquetes de contenido revisados por clínicos nativos (empezar por inglés, francés y portugués)
- [ ] Casos medulares y de nervio periférico: requieren modelar la médula espinal y los nervios
- [ ] Afinidades numéricas (Ki) desde la base PDSP, en lugar de tres niveles

## Pendiente para completar el mapeo
- [ ] Tronco segmentado con un atlas específico, en lugar del corte por altura
- [ ] Núcleos del tálamo (atlas THOMAS)
- [ ] Locus coeruleus y núcleos del rafe desde un atlas, en vez de posiciones aproximadas
- [ ] Cerebelo con licencia abierta
- [ ] Vascularización: polígono de Willis y territorios arteriales a nivel de vértice
- [ ] Descripciones para más áreas HCP-MMP1

## Simulaciones siguientes
- [ ] Interacciones entre fármacos (síndrome serotoninérgico, carga anticolinérgica, inductores e inhibidores)
- [ ] Hemorragias extraaxiales (subaracnoidea, subdural, epidural) y herniaciones

## Pulido final (cuando esté completo)
- [ ] Revisión de rendimiento en móviles de gama baja (nivel de detalle, carga diferida)
- [ ] Malla cortical de mayor resolución (fsaverage6) con LOD
- [x] Navegación por teclado del modelo y adaptación a móviles (v13)
- [ ] Revisión clínica y bibliográfica de todos los textos
- [ ] Arquitectura común para los módulos de otros órganos (Labs)
