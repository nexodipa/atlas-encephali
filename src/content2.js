// ===== v8: contenido clínico añadido (hemorragia, metástasis, seis psicopatologías, casos y preguntas) =====
Object.assign(REFS,{
  hemphill2001:{au:"Hemphill y cols.",y:"2001",t:"The ICH score: a simple, reliable grading scale for intracerebral hemorrhage",j:"Stroke",v:"32",p:"891-7",pmid:"11283388",doi:"10.1161/01.str.32.4.891"},
  kothari1996:{au:"Kothari y cols.",y:"1996",t:"The ABCs of measuring intracerebral hemorrhage volumes",j:"Stroke",v:"27",p:"1304-5",pmid:"8711791",doi:"10.1161/01.str.27.8.1304"},
  greenberg2022:{au:"Greenberg y cols.",y:"2022",t:"2022 Guideline for the Management of Patients With Spontaneous Intracerebral Hemorrhage: A Guideline From the American Heart Association/American Stroke Association",j:"Stroke",v:"53",p:"e282-e361",pmid:"35579034",doi:"10.1161/STR.0000000000000407"},
  delattre1988:{au:"Delattre y cols.",y:"1988",t:"Distribution of brain metastases",j:"Arch Neurol",v:"45",p:"741-4",pmid:"3390029",doi:"10.1001/archneur.1988.00520310047016"},
  yamamoto2014:{au:"Yamamoto y cols.",y:"2014",t:"Stereotactic radiosurgery for patients with multiple brain metastases (JLGK0901): a multi-institutional prospective observational study",j:"Lancet Oncol",v:"15",p:"387-95",pmid:"24621620",doi:"10.1016/S1470-2045(14)70061-0"},
  brown2020:{au:"Brown y cols.",y:"2020",t:"Hippocampal Avoidance During Whole-Brain Radiotherapy Plus Memantine for Patients With Brain Metastases: Phase III Trial NRG Oncology CC001",j:"J Clin Oncol",v:"38",p:"1019-1029",pmid:"32058845",doi:"10.1200/JCO.19.02767"},
  vogelbaum2022:{au:"Vogelbaum y cols.",y:"2022",t:"Treatment for Brain Metastases: ASCO-SNO-ASTRO Guideline",j:"J Clin Oncol",v:"40",p:"492-516",pmid:"34932393",doi:"10.1200/JCO.21.02314"},
  hallett2022:{au:"Hallett y cols.",y:"2022",t:"Functional neurological disorder: new subtypes and shared mechanisms",j:"Lancet Neurol",v:"21",p:"537-550",pmid:"35430029",doi:"10.1016/S1474-4422(21)00422-1"},
  voon2010:{au:"Voon y cols.",y:"2010",t:"Emotional stimuli and motor conversion disorder",j:"Brain",v:"133",p:"1526-36",pmid:"20371508",doi:"10.1093/brain/awq054"},
  voon2010b:{au:"Voon y cols.",y:"2010",t:"The involuntary nature of conversion disorder",j:"Neurology",v:"74",p:"223-8",pmid:"20083798",doi:"10.1212/WNL.0b013e3181ca00e9"},
  henningsen2007:{au:"Henningsen y cols.",y:"2007",t:"Management of functional somatic syndromes",j:"Lancet",v:"369",p:"946-55",pmid:"17368156",doi:"10.1016/S0140-6736(07)60159-7"},
  vandenbergh2017:{au:"Van den Bergh y cols.",y:"2017",t:"Symptoms and the body: Taking the inferential leap",j:"Neurosci Biobehav Rev",v:"74",p:"185-203",pmid:"28108416",doi:"10.1016/j.neubiorev.2017.01.015"},
  sierra1998:{au:"Sierra y Berrios",y:"1998",t:"Depersonalization: neurobiological perspectives",j:"Biol Psychiatry",v:"44",p:"898-908",pmid:"9807645",doi:"10.1016/s0006-3223(98)00015-8"},
  riemann2010:{au:"Riemann y cols.",y:"2010",t:"The hyperarousal model of insomnia: a review of the concept and its evidence",j:"Sleep Med Rev",v:"14",p:"19-31",pmid:"19481481",doi:"10.1016/j.smrv.2009.04.002"},
  sateia2017:{au:"Sateia y cols.",y:"2017",t:"Clinical Practice Guideline for the Pharmacologic Treatment of Chronic Insomnia in Adults: An American Academy of Sleep Medicine Clinical Practice Guideline",j:"J Clin Sleep Med",v:"13",p:"307-349",pmid:"27998379",doi:"10.5664/jcsm.6470"},
  riemann2023:{au:"Riemann y cols.",y:"2023",t:"The European Insomnia Guideline: An update on the diagnosis and treatment of insomnia 2023",j:"J Sleep Res",v:"32",p:"e14035",pmid:"38016484",doi:"10.1111/jsr.14035"},
  postuma2019:{au:"Postuma y cols.",y:"2019",t:"Risk and predictors of dementia and parkinsonism in idiopathic REM sleep behaviour disorder: a multicentre study",j:"Brain",v:"142",p:"744-759",pmid:"30789229",doi:"10.1093/brain/awz030"},
  howell2023:{au:"Howell y cols.",y:"2023",t:"Management of REM sleep behavior disorder: an American Academy of Sleep Medicine systematic review, meta-analysis, and GRADE assessment",j:"J Clin Sleep Med",v:"19",p:"769-810",pmid:"36515150",doi:"10.5664/jcsm.10426"},
  schenck1986:{au:"Schenck y cols.",y:"1986",t:"Chronic behavioral disorders of human REM sleep: a new category of parasomnia",j:"Sleep",v:"9",p:"293-308",pmid:"3505730",doi:"10.1093/sleep/9.2.293"},
  mcelroy2015:{au:"McElroy y cols.",y:"2015",t:"Efficacy and safety of lisdexamfetamine for treatment of adults with moderate to severe binge-eating disorder: a randomized clinical trial",j:"JAMA Psychiatry",v:"72",p:"235-46",pmid:"25587645",doi:"10.1001/jamapsychiatry.2014.2162"},
  kessler2016:{au:"Kessler y cols.",y:"2016",t:"The neurobiological basis of binge-eating disorder",j:"Neurosci Biobehav Rev",v:"63",p:"223-38",pmid:"26850211",doi:"10.1016/j.neubiorev.2016.01.013"}
});

/* ---- simulación: hemorragia y metástasis ---- */
const HEMLOC={
  put:{es:"Putamen izquierdo (hipertensiva)",site:"Lput",focal:"La localización más frecuente. Hemiparesia y hemihipoestesia derechas densas por compresión de la cápsula interna, desviación de la mirada hacia la izquierda, hemianopsia y afasia si el hematoma es grande."},
  thal:{es:"Tálamo derecho (hipertensiva)",site:"Rthal",focal:"Hemihipoestesia izquierda con hemiparesia por la cápsula interna vecina; si se extiende al mesencéfalo, mirada desviada hacia abajo y pupilas pequeñas. Se abre con frecuencia al ventrículo y causa hidrocefalia."},
  caud:{es:"Caudado izquierdo",site:"Lcaud",focal:"Cefalea, vómitos y confusión más que déficit motor; casi siempre vuelca sangre al ventrículo lateral y puede imitar una hemorragia subaracnoidea."},
  lobar:{es:"Lobar parietal izquierda (angiopatía amiloide)",site:"L_inferiorparietal",sink:14,focal:"Déficit cortical del lóbulo afectado (aquí afasia, apraxia y hemianopsia) y más crisis epilépticas que en las profundas. En mayores de 70 años sugiere angiopatía amiloide: la RM muestra microsangrados lobares y siderosis superficial, y el riesgo de recurrencia es alto."},
  cb:{es:"Hemisferio cerebeloso derecho",site:"cbR",infra:true,focal:"Vértigo, vómitos, cefalea occipital e imposibilidad de mantenerse en pie, con ataxia del lado derecho. Puede comprimir el cuarto ventrículo y el tronco en pocas horas: con deterioro, compresión del tronco o hidrocefalia, la evacuación quirúrgica es urgente."},
  pons:{es:"Protuberancia",site:"stem1",infra:true,focal:"Coma brusco, tetraplejia, pupilas puntiformes reactivas, parálisis de la mirada horizontal e hipertermia. Pronóstico grave cuando es extensa."}
};
const HEMTX=[
  "Confirmar con TC sin contraste y buscar la causa con angio-TC: el «spot sign» (contraste dentro del hematoma) predice su crecimiento.",
  "En hemorragias leves o moderadas con presión sistólica de 150 a 220 mmHg, bajarla de forma sostenida hacia 140 mmHg, sin descender de 130.",
  "Revertir la anticoagulación de inmediato: complejo protrombínico y vitamina K para la warfarina, idarucizumab para el dabigatrán, andexanet alfa o complejo protrombínico para los inhibidores del factor Xa.",
  "Hemorragia cerebelosa con deterioro, compresión del tronco o hidrocefalia: evacuación quirúrgica urgente; el drenaje ventricular solo no basta.",
  "Drenaje ventricular externo si hay hidrocefalia con disminución de la conciencia.",
  "Unidad de ictus o cuidados intensivos neurológicos, control de glucemia y temperatura, y compresión neumática intermitente para prevenir la trombosis venosa."
];
const METSITES=[["L_superiorfrontal",1],["R_inferiorparietal",0.9],["cbR",0.8],["L_lateraloccipital",0.85],["R_rostralmiddlefrontal",0.75],["L_supramarginal",0.7],["cbL",0.65],["R_middletemporal",0.7],["Lput",0.55],["R_precuneus",0.6]];
const METPRIM={
  lung:{es:"Pulmón",txt:"Es el primario más frecuente, alrededor de la mitad de las metástasis cerebrales. En el carcinoma microcítico son tan habituales que se vigila con RM o se ofrece irradiación craneal profiláctica. En el adenocarcinoma con mutación de EGFR o reordenamiento de ALK, osimertinib, alectinib o lorlatinib tienen buena actividad intracraneal."},
  breast:{es:"Mama",txt:"Más frecuentes en los subtipos HER2 positivo y triple negativo. En el HER2 positivo hay tratamientos con actividad intracraneal, como tucatinib o trastuzumab deruxtecán."},
  melanoma:{es:"Melanoma",txt:"Es el tumor con mayor tendencia a metastatizar en el encéfalo; las lesiones suelen ser múltiples y hemorrágicas. La combinación de ipilimumab y nivolumab logra respuestas intracraneales en metástasis asintomáticas."},
  renal:{es:"Riñón",txt:"Metástasis muy vascularizadas, con tendencia a sangrar. Son poco sensibles a la radioterapia convencional, pero responden bien a la radiocirugía."},
  crc:{es:"Colorrectal",txt:"Menos frecuentes y tardías, casi siempre con enfermedad extracraneal avanzada. Los primarios pélvicos y abdominales tienen una predilección relativa por la fosa posterior (Delattre y cols., 1988)."}
};

/* ---- psicopatología ---- */
Object.assign(PSY,{
  fnd:{es:"Trastorno neurológico funcional",grp:"Síntomas corporales y disociación",
    lede:"Síntomas neurológicos reales (debilidad, temblor, alteración de la marcha, crisis, pérdida sensitiva o visual) que no se deben a una lesión estructural sino a un fallo en cómo el cerebro controla y percibe el cuerpo. Es una de las causas más frecuentes de consulta en neurología. No es simulación: el paciente no produce los síntomas de forma voluntaria.",
    model:"El movimiento funcional se acompaña de una sensación de involuntariedad que se asocia a hipoactividad de la unión temporoparietal derecha, una región que compara la acción prevista con su resultado y genera la sensación de agencia (Voon y cols., 2010). Ante estímulos emocionales, la amígdala está más conectada con el área motora suplementaria, lo que sugiere que la emoción influye directamente en la preparación motora. El modelo actual añade una atención anómala centrada en el cuerpo y expectativas previas que el cerebro toma por señal sensorial (Hallett y cols., 2022).",
    act:{supramarginal:-0.7,inferiorparietal:-0.4,amyg:0.7,superiorfrontal:0.5,caudalanteriorcingulate:0.4,insula:0.4,precentral:-0.3},
    nt:{},
    circ:[{es:"Amígdala sobre el área motora suplementaria",color:"#e2685a",path:["d:amyg","c:superiorfrontal"],mod:"hyper"},{es:"Red de agencia (unión temporoparietal)",color:"#9fd8ff",path:["c:supramarginal","c:superiorfrontal"],mod:"hypo"}],
    sx:[["Debilidad o movimientos funcionales","La vía motora está intacta; falla la preparación del movimiento, influida por la emoción y la atención"],["Sensación de que el movimiento no es propio","Unión temporoparietal hipoactiva: fallo de la sensación de agencia"],["Crisis funcionales (disociativas)","Red de saliencia e ínsula; desregulación emocional y disociación"],["Signo de Hoover positivo","La extensión de la cadera débil vuelve al flexionar la contraria: el movimiento automático está conservado"]],
    tx:["sertraline"],
    note:"El diagnóstico se hace por signos positivos (Hoover, debilidad que cede con la distracción, temblor que se arrastra al ritmo de la otra mano), no por exclusión, y conviene explicarlo así al paciente. El tratamiento es la fisioterapia específica y la psicoterapia; los antidepresivos solo tratan la ansiedad o la depresión asociadas. En la CIE-11 se llama trastorno disociativo de síntomas neurológicos."},
  bdis:{es:"Trastorno de malestar corporal",grp:"Síntomas corporales y disociación",
    lede:"Síntomas corporales persistentes y molestos (dolor, fatiga, molestias digestivas o cardíacas) con una atención y una preocupación excesivas sobre ellos, que generan consultas y pruebas repetidas. La CIE-11 lo introduce en lugar de los antiguos trastornos somatomorfos; el DSM-5 habla de trastorno de síntomas somáticos.",
    model:"El modelo predictivo propone que lo que sentimos del cuerpo es una inferencia: el cerebro combina la señal interoceptiva con sus predicciones. Cuando las predicciones pesan demasiado, se perciben síntomas aunque la señal corporal sea normal (Van den Bergh y cols., 2017). La ínsula y el cingulado anterior, que integran la interocepción y la saliencia, muestran más respuesta; la sensibilización central y una modulación descendente del dolor menos eficaz completan el cuadro.",
    act:{insula:0.7,caudalanteriorcingulate:0.6,rostralanteriorcingulate:0.3,amyg:0.4,postcentral:0.3,thal:0.3,medialorbitofrontal:-0.3,rostralmiddlefrontal:-0.3},
    nt:{},
    circ:[{es:"Red interoceptiva (ínsula y cingulado anterior)",color:"#e2685a",path:["c:insula","c:caudalanteriorcingulate"],mod:"hyper"}],
    sx:[["Síntomas corporales persistentes","Predicciones interoceptivas que pesan más que la señal sensorial"],["Atención y preocupación por el cuerpo","Red de saliencia: ínsula y cingulado anterior"],["Dolor difuso y fatiga","Sensibilización central y modulación descendente deficiente"]],
    tx:["duloxetine","amitriptyline"],
    note:"Funcionan mejor las visitas programadas con un mismo médico, evitar pruebas repetidas sin indicación, explicar el mecanismo sin negar los síntomas y la terapia cognitivo-conductual. La preocupación por tener una enfermedad grave sin síntomas destacados es otra entidad, la hipocondría (CIE-11 6B23), que se agrupa con el trastorno obsesivo-compulsivo."},
  dpdr:{es:"Despersonalización y desrealización",grp:"Síntomas corporales y disociación",
    lede:"Experiencias persistentes de irrealidad: sentirse ajeno a uno mismo, a los propios pensamientos o al cuerpo, como un observador (despersonalización), o percibir el mundo como irreal, lejano o detrás de un cristal (desrealización). El juicio de realidad se conserva: la persona sabe que es una sensación, lo que la distingue de la psicosis.",
    model:"Sierra y Berrios propusieron una desconexión corticolímbica: la prefrontal, sobre todo la ventrolateral, inhibe la respuesta emocional de la amígdala y la ínsula, de modo que lo percibido llega sin su colorido afectivo, mientras se mantiene un estado de alerta. Es una respuesta de protección ante el estrés extremo que se vuelve crónica. Las áreas parietales que integran el esquema corporal también participan.",
    act:{parstriangularis:0.6,parsorbitalis:0.5,medialorbitofrontal:0.4,amyg:-0.6,insula:-0.7,supramarginal:0.4,inferiorparietal:0.3,temporalpole:-0.3},
    nt:{},
    circ:[{es:"Inhibición prefrontal del sistema límbico",color:"#9fd8ff",path:["c:parstriangularis","d:amyg"],mod:"hyper"},{es:"Inhibición prefrontal de la ínsula",color:"#9fd8ff",path:["c:parsorbitalis","c:insula"],mod:"hyper"}],
    sx:[["Sentirse irreal o ajeno al propio cuerpo","Integración corporal parietal e insular alterada"],["Embotamiento emocional","Prefrontal ventrolateral que inhibe la amígdala y la ínsula"],["El mundo parece irreal, como tras un cristal","Lo percibido llega sin respuesta emocional, con la alerta conservada"]],
    tx:[],
    note:"Ningún fármaco tiene eficacia demostrada; los ensayos con lamotrigina y con fluoxetina no fueron concluyentes. Se usa la psicoterapia, centrada en reducir la vigilancia de los síntomas, y se tratan la ansiedad y la depresión asociadas. En la CIE-11 el grupo disociativo incluye además la amnesia disociativa (6B61) y el trastorno de identidad disociativo (6B64), en el que coexisten estados de identidad distintos."},
  insomnia:{es:"Insomnio crónico",grp:"Sueño y vigilia",
    lede:"Dificultad para iniciar o mantener el sueño, o despertar precoz, al menos tres noches por semana durante tres meses, pese a tener oportunidad de dormir, con consecuencias durante el día. Afecta al 6–10% de los adultos.",
    model:"El modelo de hiperactivación (Riemann y cols., 2010) describe un sistema de vigilia que no se apaga: más actividad rápida en el electroencefalograma durante el sueño, mayor tasa metabólica y cortisol, y una mente que rumia al acostarse. Los sistemas de alerta del hipotálamo y el tronco (orexina, noradrenalina, histamina) dominan sobre los que promueven el sueño, y la cama queda asociada a la vigilia por condicionamiento.",
    act:{hth:0.6,thal:0.4,amyg:0.4,insula:0.4,caudalanteriorcingulate:0.5,medialorbitofrontal:0.3,rostralmiddlefrontal:-0.3},
    nt:{orx:"hyper",ne:"hyper",hist:"hyper"},
    circ:[{es:"Sistemas de vigilia sin apagar",color:"#e8c46a",path:["d:hth","d:thal","c:caudalanteriorcingulate"],mod:"hyper"}],
    sx:[["Dificultad para iniciar o mantener el sueño","Orexina, noradrenalina e histamina predominan sobre los sistemas del sueño"],["Rumiación al acostarse","Hiperactivación cognitiva y del cingulado anterior"],["Cansancio y peor concentración diurnos","Sueño fragmentado, aunque la somnolencia objetiva suele ser baja"]],
    tx:["zolpidem","suvorexant","melatonin","trazodone"],
    note:"La terapia cognitivo-conductual para el insomnio (restricción del tiempo en cama, control de estímulos, reestructuración cognitiva) es el tratamiento de primera línea según las guías europea y estadounidense, y su efecto dura más que el de los fármacos. Los hipnóticos se reservan para periodos cortos o cuando la terapia no basta. Antes del diagnóstico hay que buscar apnea del sueño, piernas inquietas, depresión y fármacos o sustancias."},
  rbd:{es:"Trastorno de conducta del sueño REM",grp:"Sueño y vigilia",
    lede:"Durante el sueño REM falta la atonía muscular normal y la persona representa sus sueños: grita, golpea, patalea o se cae de la cama, a menudo en sueños de persecución o defensa. Es más frecuente en hombres mayores de 50 años y se confirma con polisomnografía (Schenck y cols., 1986).",
    model:"La atonía del REM depende del núcleo sublaterodorsal del tegmento pontino, que activa neuronas inhibidoras del bulbo que silencian las motoneuronas. Cuando la alfa-sinucleína daña estos núcleos, años antes de llegar a la sustancia negra, desaparece la atonía. Por eso la forma idiopática es un pródromo de las sinucleinopatías: en un estudio multicéntrico, alrededor del 6% de los pacientes por año desarrolló Parkinson, demencia con cuerpos de Lewy o atrofia multisistémica, y cerca del 74% a los 12 años (Postuma y cols., 2019).",
    act:{stem1:0.8,stem2:0.6,snc:0.4,stem0:0.3},
    nt:{da_ns:"hypo"},
    circ:[{es:"Atonía del REM (protuberancia → bulbo)",color:"#9fd8ff",path:["d:stem1","d:stem2"],mod:"hypo"},{es:"Locus coeruleus",color:"#b9a0e8",path:["p:lc","d:stem1"],mod:"hypo"}],
    sx:[["Representar los sueños con golpes o gritos","Pérdida de la atonía del REM por lesión del tegmento pontino"],["Anosmia, estreñimiento, hipotensión ortostática","Sinucleinopatía periférica y del tronco en fase prodrómica"],["Riesgo de Parkinson o demencia con cuerpos de Lewy","Avance de la sinucleína hacia la sustancia negra y la corteza"]],
    tx:["melatonin"],
    note:"Lo primero es la seguridad del dormitorio (retirar objetos peligrosos, separar la cama). La guía de la Academia Estadounidense de Medicina del Sueño sugiere melatonina de liberación inmediata o clonazepam (Howell y cols., 2023). Los antidepresivos serotoninérgicos pueden desencadenarlo o empeorarlo. Informar del riesgo de neurodegeneración es delicado y debe hacerse con tiempo y seguimiento."},
  bed:{es:"Trastorno por atracón",grp:"Conducta alimentaria",
    lede:"Episodios recurrentes en los que se come una cantidad grande de comida con sensación de pérdida de control, seguidos de malestar y culpa, sin las conductas compensatorias de la bulimia (vómitos, laxantes, ejercicio). Es el trastorno de la conducta alimentaria más frecuente y se asocia a obesidad.",
    model:"Combina una hiperreactividad a las señales de comida en la orbitofrontal medial y el estriado ventral con un control inhibitorio prefrontal más débil, un patrón parecido al de las adicciones (Kessler y cols., 2016). El estrés y el afecto negativo suelen desencadenar los episodios, y la dieta restrictiva los mantiene.",
    act:{accumb:0.6,medialorbitofrontal:0.6,insula:0.4,rostralmiddlefrontal:-0.5,parstriangularis:-0.4,caudalanteriorcingulate:-0.3},
    nt:{},
    circ:[{es:"Valor de recompensa de la comida",color:"#e2685a",path:["c:medialorbitofrontal","d:accumb"],mod:"hyper"},{es:"Control inhibitorio",color:"#9fd8ff",path:["c:rostralmiddlefrontal","d:caud"],mod:"hypo"}],
    sx:[["Atracones con pérdida de control","Control inhibitorio prefrontal reducido"],["Deseo intenso ante la comida","Orbitofrontal y estriado ventral hiperreactivos a las señales de comida"],["Malestar y culpa después","Afecto negativo que desencadena y mantiene el ciclo"]],
    tx:["amphetamine","topiramate"],
    note:"La terapia cognitivo-conductual es el tratamiento de primera línea. La lisdexanfetamina es el único fármaco aprobado para el trastorno (en Estados Unidos) tras reducir los días de atracón en ensayos aleatorizados (McElroy y cols., 2015); el topiramato se usa fuera de ficha técnica."}
});
Object.assign(ICD11,{fnd:"6B60",bdis:"6C20",dpdr:"6B66",insomnia:"7A00",rbd:"7B01.0",bed:"6B82"});
Object.assign(TXLEVEL,{
  fnd:{sertraline:"sintoma"},
  bdis:{duloxetine:"limitada",amitriptyline:"limitada"},
  insomnia:{zolpidem:"corto",suvorexant:"segunda",melatonin:"limitada",trazodone:"limitada"},
  rbd:{melatonin:"primera"},
  bed:{amphetamine:"primera",topiramate:"fuera"}
});
Object.assign(GUIDES,{
  insomnia:[{g:"AASM, tratamiento farmacológico del insomnio crónico (2017)",ref:"sateia2017"},{g:"Guía europea del insomnio (2023)",ref:"riemann2023"}],
  rbd:[{g:"AASM, tratamiento del trastorno de conducta del sueño REM (2023)",ref:"howell2023"}]
});
Object.assign(REFMAP,{
  "sim:ich":["hemphill2001","kothari1996","greenberg2022"],
  "sim:met":["delattre1988","yamamoto2014","brown2020","vogelbaum2022"],
  "psy:fnd":["hallett2022","voon2010b","voon2010"],
  "psy:bdis":["henningsen2007","vandenbergh2017"],
  "psy:dpdr":["sierra1998"],
  "psy:insomnia":["riemann2010","sateia2017","riemann2023"],
  "psy:rbd":["schenck1986","postuma2019","howell2023"],
  "psy:bed":["kessler2016","mcelroy2015"]
});

/* ---- casos clínicos ---- */
CASES.push(
  {id:"millard",area:"Tronco del encéfalo",es:"Cara de un lado, cuerpo del otro",
   vig:"Mujer de 71 años, diabética. Se despierta con debilidad del brazo y la pierna derechos y con la boca desviada: no puede cerrar el ojo izquierdo ni arrugar la frente de ese lado. Ve doble al mirar a la izquierda.",
   ans:["s:1"],view:{v:"latL",ghost:0.12},
   exp:"Hemiplejia derecha con parálisis facial periférica izquierda (afecta también la frente) y paresia del VI par izquierdo: síndrome de Millard-Gubler, una lesión de la protuberancia ventral izquierda que alcanza el haz corticoespinal antes de cruzar y los nervios VI y VII a su salida. Los síndromes alternos (pares craneales de un lado, vías largas del otro) localizan en el tronco.",
   fq:{q:"¿Qué arterias irrigan esta zona?",o:["Ramas paramedianas de la basilar","Arteria cerebelosa posteroinferior","Arteria coroidea anterior","Lenticuloestriadas"],c:0,why:"La protuberancia ventromedial depende de las ramas paramedianas de la basilar; su oclusión es típica de la enfermedad de pequeño vaso en diabéticos e hipertensos."},go:"stem:1"},
  {id:"dejerine",area:"Tronco del encéfalo",es:"La lengua se desvía",
   vig:"Varón de 66 años. Debilidad súbita del brazo y la pierna izquierdos sin afectar la cara. Al sacar la lengua, se desvía a la derecha. No nota la posición del pie izquierdo con los ojos cerrados; el dolor y la temperatura los siente bien.",
   ans:["s:2"],view:{v:"latR",ghost:0.12},
   exp:"Síndrome bulbar medial (Dejerine): pirámide derecha (hemiplejia izquierda sin cara, porque las fibras faciales ya salieron más arriba), lemnisco medial (pérdida de la posición y la vibración izquierdas) y núcleo o fibras del XII derecho (la lengua se desvía hacia el lado de la lesión). El dolor se conserva porque el haz espinotalámico va por el bulbo lateral.",
   fq:{q:"¿Qué distingue este cuadro del síndrome de Wallenberg?",o:["Wallenberg es lateral: dolor y temperatura cruzados, Horner, ataxia, sin hemiplejia","Wallenberg produce hemiplejia más intensa","Ambos afectan la lengua","Wallenberg afecta la protuberancia"],c:0,why:"El bulbo lateral (arteria cerebelosa posteroinferior o vertebral) contiene el espinotalámico, el núcleo del trigémino, el núcleo ambiguo y la vía simpática; el medial (espinal anterior), la pirámide, el lemnisco medial y el XII."},go:"stem:2"},
  {id:"parinaud",area:"Tronco del encéfalo",es:"No puede mirar hacia arriba",
   vig:"Varón de 19 años con cefalea de semanas, peor por la mañana. No logra mirar hacia arriba; al intentarlo, los ojos convergen y se retraen. Las pupilas apenas responden a la luz pero sí se contraen al mirar de cerca. Papiledema bilateral.",
   ans:["s:0"],view:{v:"post",ghost:0.12},
   exp:"Síndrome mesencefálico dorsal (Parinaud): parálisis de la mirada vertical hacia arriba, nistagmo de convergencia-retracción y disociación luz-cerca, por compresión del techo del mesencéfalo y la comisura posterior. El papiledema se debe a la hidrocefalia por obstrucción del acueducto.",
   fq:{q:"En un varón joven, ¿cuál es la causa más probable?",o:["Tumor de la región pineal, como un germinoma","Esclerosis múltiple","Infarto de la arteria cerebral media","Enfermedad de Parkinson"],c:0,why:"Los tumores pineales (germinomas en varones jóvenes) comprimen el techo del mesencéfalo y el acueducto. En adultos mayores la causa más común es vascular."},go:"stem:0"},
  {id:"korsakoff",area:"Neuropsiquiatría",es:"Inventa lo que no recuerda",
   vig:"Varón de 54 años con consumo intenso de alcohol durante décadas, ingresado hace un mes por confusión y marcha inestable. Ahora está despierto y atento, pero no recuerda nada de lo ocurrido desde el ingreso y rellena los huecos con historias falsas que cuenta con convicción.",
   ans:["d:Lmam","d:Rmam","d:Lthal","d:Rthal"],view:{v:"inf",ghost:0.1},
   exp:"Síndrome de Korsakoff: amnesia anterógrada grave con confabulación tras una encefalopatía de Wernicke no tratada a tiempo. Las lesiones afectan los cuerpos mamilares y el tálamo medial (núcleos mediodorsal y anterior), piezas del circuito de Papez.",
   fq:{q:"¿Qué debe administrarse antes de la glucosa en un paciente alcohólico confuso?",o:["Tiamina","Piridoxina","Ácido fólico","Cianocobalamina"],c:0,why:"La glucosa consume tiamina y puede precipitar o empeorar la encefalopatía de Wernicke; la tiamina se da primero y a dosis altas."},go:"org:wk"},
  {id:"kluver",area:"Neuropsiquiatría",es:"Todo a la boca",
   vig:"Mujer de 39 años, recuperada de una encefalitis grave. Su familia la encuentra extrañamente dócil y sin miedo; se lleva a la boca objetos no comestibles, come sin parar y hace comentarios sexuales impropios. No reconoce objetos comunes por la vista.",
   ans:["d:Lamyg","d:Ramyg","c:L_temporalpole","c:R_temporalpole"],view:{v:"inf",ghost:0.15},
   exp:"Síndrome de Klüver-Bucy: hiperoralidad, hiperfagia, hipersexualidad, placidez y agnosia visual por lesión bilateral de los lóbulos temporales anteriores y las amígdalas. Las causas más habituales son la encefalitis herpética, el traumatismo y la demencia frontotemporal.",
   fq:{q:"¿La pérdida de qué estructura explica la ausencia de miedo?",o:["Amígdala","Hipocampo","Cuerpo calloso","Núcleo caudado"],c:0,why:"La amígdala asigna valor emocional a los estímulos y es necesaria para el aprendizaje y la expresión del miedo."},go:"deep:Lamyg"},
  {id:"balint",area:"Neurología cortical",es:"Ve las partes, no la escena",
   vig:"Mujer de 61 años, profesora. Desde hace dos años tiene dificultad para leer, se pierde en lugares conocidos y no logra encontrar objetos que tiene delante. Ve un detalle de una escena pero no el conjunto, y falla al intentar coger un vaso guiándose por la vista. La memoria está relativamente conservada.",
   ans:["c:L_superiorparietal","c:R_superiorparietal","c:L_lateraloccipital","c:R_lateraloccipital","c:L_inferiorparietal","c:R_inferiorparietal"],view:{v:"post"},
   exp:"Síndrome de Bálint: simultagnosia (no integra la escena), ataxia óptica (no dirige la mano con la vista) y apraxia oculomotora, por lesión parietooccipital bilateral de la vía visual dorsal. Con este curso progresivo y la memoria conservada, la causa probable es la atrofia cortical posterior.",
   fq:{q:"¿Qué enfermedad subyace con más frecuencia a la atrofia cortical posterior?",o:["Enfermedad de Alzheimer","Esclerosis múltiple","Enfermedad de Huntington","Encefalitis herpética"],c:0,why:"La mayoría de los casos de atrofia cortical posterior son una forma atípica, visual, de la enfermedad de Alzheimer."},go:"dk:superiorparietal"},
  {id:"tcmotor",area:"Neurología vascular",es:"Repite pero no inicia",
   vig:"Mujer de 74 años. Tras un ictus habla muy poco y solo si se la anima; responde con una o dos palabras. Sin embargo repite frases largas sin error y comprende bien. Tiene debilidad de la pierna derecha.",
   ans:["c:L_superiorfrontal","c:L_caudalmiddlefrontal","c:L_paracentral"],view:{v:"medL"},
   exp:"Afasia motora transcortical: lenguaje espontáneo muy reducido con repetición conservada, por lesión del área motora suplementaria o de la corteza frontal vecina a Broca, que deja intacto el circuito de repetición. La paresia de la pierna apunta al territorio de la arteria cerebral anterior izquierda.",
   fq:{q:"¿Qué rasgo distingue la afasia transcortical de la de Broca?",o:["La repetición conservada","La comprensión alterada","La fluidez normal","La presencia de parafasias"],c:0,why:"En las afasias transcorticales se conserva la repetición porque la lesión respeta el área de Broca, el fascículo arqueado y el área de Wernicke."},go:"dk:superiorfrontal"},
  {id:"huntington",area:"Movimientos anormales",es:"Inquieto e irritable",
   vig:"Varón de 42 años. Su pareja lo nota irritable y descuidado desde hace años; ahora hace movimientos breves e irregulares de la cara y las manos que intenta disimular. Su padre murió en una residencia con un cuadro parecido.",
   ans:["d:Lcaud","d:Rcaud"],view:{v:"ant",ghost:0.1},
   exp:"Enfermedad de Huntington: corea, cambios conductuales y deterioro cognitivo con herencia autosómica dominante. Las primeras neuronas en perderse son las espinosas medianas del núcleo caudado (vía indirecta), lo que en la imagen aumenta los ventrículos laterales.",
   fq:{q:"¿Cuál es la mutación?",o:["Expansión de tripletes CAG en el gen HTT","Deleción del cromosoma 22q11.2","Mutación de ATP7B","Expansión GAA en la frataxina"],c:0,why:"La expansión CAG de 40 o más repeticiones en HTT es de penetrancia completa; la anticipación se da sobre todo por vía paterna."},go:"deep:Lcaud"},
  {id:"olfgroove",area:"Neuropsiquiatría",es:"Depresión que no responde",
   vig:"Mujer de 58 años tratada por depresión desde hace un año sin mejoría: apática, desinhibida a ratos, se ha vuelto descuidada. En la última visita refiere que ya no huele nada y se ha orinado encima en dos ocasiones sin preocuparle.",
   ans:["c:L_medialorbitofrontal","c:R_medialorbitofrontal","c:L_lateralorbitofrontal","c:R_lateralorbitofrontal"],view:{v:"inf"},
   exp:"Una «depresión» atípica con apatía, desinhibición, anosmia e incontinencia sin preocupación sugiere una masa frontal basal, típicamente un meningioma del surco olfatorio que comprime la orbitofrontal de ambos lados. Puede llegar a producir el síndrome de Foster Kennedy (atrofia óptica de un lado y papiledema del otro).",
   fq:{q:"¿Qué dato de la historia debió hacer pedir una neuroimagen antes?",o:["Anosmia e incontinencia con indiferencia","La edad de la paciente","El sexo femenino","La falta de respuesta a un primer antidepresivo"],c:0,why:"Los signos neurológicos focales y los rasgos frontales (desinhibición, indiferencia) en una depresión de inicio tardío son señales de alarma de causa orgánica."},go:"org:frontal_tumor"},
  {id:"secmania",area:"Neuropsiquiatría",es:"Euforia a los 70",
   vig:"Varón de 70 años sin antecedentes psiquiátricos. En dos semanas pasa a hablar sin parar, duerme tres horas, gasta sus ahorros y se cree elegido para una misión. Su mujer recuerda que un mes antes tuvo un episodio breve de debilidad de la mano izquierda.",
   ans:["c:R_lateralorbitofrontal","c:R_medialorbitofrontal","d:Rcaud","d:Rthal"],view:{v:"inf"},
   exp:"Manía secundaria: un primer episodio maníaco después de los 50 años, sin antecedentes, obliga a buscar una causa orgánica. Las lesiones vasculares del hemisferio derecho, sobre todo orbitofrontales, del caudado y del tálamo, son las que con más frecuencia producen manía.",
   fq:{q:"¿Qué dato orienta a una causa orgánica?",o:["Inicio tardío sin antecedentes y un déficit neurológico previo","El insomnio","La grandiosidad","El gasto excesivo"],c:0,why:"El inicio después de los 50 años, la ausencia de antecedentes personales o familiares y los signos neurológicos sugieren manía secundaria."},go:"psy:bd"},
  {id:"rbd",area:"Neurología del sueño",es:"Pelea en sueños",
   vig:"Varón de 63 años. Su mujer duerme en otra habitación desde que él empezó a gritar y dar puñetazos dormido; al despertarlo cuenta que se defendía de un atacante. Hace años que no huele bien y tiene estreñimiento. La exploración neurológica es normal.",
   ans:["s:1"],view:{v:"latL",ghost:0.12},
   exp:"Trastorno de conducta del sueño REM: falta la atonía del REM por lesión del tegmento pontino (núcleo sublaterodorsal) y sus conexiones bulbares. Con anosmia y estreñimiento, es casi siempre la fase prodrómica de una sinucleinopatía.",
   fq:{q:"¿Qué riesgo a largo plazo tiene este paciente?",o:["Parkinson, demencia con cuerpos de Lewy o atrofia multisistémica","Esclerosis lateral amiotrófica","Enfermedad de Alzheimer exclusivamente","Ninguno: es benigno"],c:0,why:"En un estudio multicéntrico, cerca del 74% de los pacientes con la forma idiopática desarrolló una sinucleinopatía a los 12 años (Postuma y cols., 2019)."},go:"psy:rbd",refs:["postuma2019"]}
);

/* ---- preguntas ---- */
QUIZ.push(
  {d:"Neurología",q:"¿Qué variables componen la escala ICH?",o:["Glasgow, volumen, sangre intraventricular, origen infratentorial y edad","Glasgow, presión arterial, glucemia y edad","NIHSS, volumen y anticoagulación","Volumen, desviación de línea media y temperatura"],c:0,why:"Hemphill y cols. (2001): Glasgow (0–2 puntos), volumen de 30 mL o más, hemorragia intraventricular, origen infratentorial y 80 años o más (1 punto cada uno)."},
  {d:"Neurología",q:"Un hematoma mide 4 × 3 cm en el corte mayor y aparece en 6 cortes de 5 mm. ¿Qué volumen estima ABC/2?",o:["18 mL","36 mL","60 mL","9 mL"],c:0,why:"A = 4 cm, B = 3 cm, C = 6 × 0,5 = 3 cm; 4 × 3 × 3 / 2 = 18 mL."},
  {d:"Neurología",q:"Hemorragia lobar en una persona de 78 años normotensa: ¿causa más probable?",o:["Angiopatía amiloide cerebral","Hipertensión arterial","Malformación arteriovenosa","Aneurisma sacular"],c:0,why:"La angiopatía amiloide produce hemorragias lobares en mayores; la RM muestra microsangrados lobares y siderosis superficial."},
  {d:"Neurología",q:"¿Qué hemorragia requiere con más frecuencia evacuación quirúrgica urgente?",o:["Cerebelosa con deterioro, compresión del tronco o hidrocefalia","Putaminal pequeña","Talámica sin hidrocefalia","Lobar de 10 mL"],c:0,why:"La fosa posterior tiene poca reserva: la hemorragia cerebelosa puede comprimir el tronco y el IV ventrículo en horas."},
  {d:"Neurología",q:"¿Cuál es el primario más frecuente de las metástasis cerebrales?",o:["Pulmón","Próstata","Tiroides","Páncreas"],c:0,why:"El pulmón causa alrededor de la mitad; le siguen la mama y el melanoma."},
  {d:"Neurología",q:"¿Qué metástasis cerebrales sangran con más frecuencia?",o:["Melanoma y carcinoma renal","Próstata y vejiga","Mama luminal y tiroides papilar","Colon y estómago"],c:0,why:"Melanoma, carcinoma renal, coriocarcinoma y tiroides son los primarios con metástasis más hemorrágicas."},
  {d:"Neurología",q:"¿Dónde se detienen típicamente las metástasis cerebrales?",o:["En la unión entre sustancia gris y blanca","En el centro de los ventrículos","En la corteza de las circunvoluciones","En el cuerpo calloso"],c:0,why:"Las arteriolas se estrechan en la unión corticosubcortical y en los territorios frontera, donde quedan atrapados los émbolos tumorales."},
  {d:"Neurología",q:"Debilidad de la pierna derecha: al pedir que flexione la cadera izquierda contra resistencia, aparece fuerza normal de extensión en la derecha. ¿Qué indica?",o:["Signo de Hoover positivo: debilidad funcional","Lesión de la vía piramidal","Neuropatía femoral","Mielopatía"],c:0,why:"La extensión automática de la cadera se conserva cuando la atención se dirige a la otra pierna; es un signo positivo de trastorno neurológico funcional."},
  {d:"Psicopatología",q:"¿Cuál es el tratamiento de primera línea del insomnio crónico?",o:["Terapia cognitivo-conductual para el insomnio","Zolpidem a largo plazo","Benzodiacepinas de vida media larga","Antihistamínicos sedantes"],c:0,why:"Las guías europea (2023) y estadounidense la sitúan como primera línea; sus efectos duran más que los de los hipnóticos."},
  {d:"Psicopatología",q:"El trastorno de conducta del sueño REM idiopático es un marcador precoz de:",o:["Sinucleinopatías","Taupatías","Enfermedades priónicas","Esclerosis múltiple"],c:0,why:"La mayoría de los pacientes desarrolla Parkinson, demencia con cuerpos de Lewy o atrofia multisistémica en la década siguiente."},
  {d:"Psicopatología",q:"¿Qué distingue la despersonalización de un síntoma psicótico?",o:["El juicio de realidad se conserva","Su duración","La edad de inicio","La respuesta a antipsicóticos"],c:0,why:"La persona sabe que la sensación de irrealidad es subjetiva; no la vive como un hecho externo."},
  {d:"Farmacología",q:"¿Qué fármaco está aprobado para el trastorno por atracón?",o:["Lisdexanfetamina","Topiramato","Fluoxetina","Naltrexona"],c:0,why:"La lisdexanfetamina redujo los días de atracón en ensayos aleatorizados (McElroy y cols., 2015) y está aprobada en Estados Unidos."}
);
