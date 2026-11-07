/* ===== v14: mapeo fino del encéfalo =====
   - núcleos del tálamo: atlas THOMAS (Saranathan y cols., 2021; CC0)
   - núcleos del sistema activador ascendente del tronco: Harvard AAN v2 (Edlow y cols., 2024; CC0)
   - territorios arteriales por vértice: Digital 3D Brain MRI Arterial Territories Atlas (Liu y cols., 2023; Johns Hopkins, CC BY-SA 4.0) */

Object.assign(REFS,{
  saranathan2021:{au:"Saranathan y cols.",y:"2021",t:"In vivo high-resolution structural MRI-based atlas of human thalamic nuclei",j:"Sci Data",v:"8",p:"275",pmid:"34711852",doi:"10.1038/s41597-021-01062-y"},
  edlow2012:{au:"Edlow y cols.",y:"2012",t:"Neuroanatomic connectivity of the human ascending arousal system critical to consciousness and its disorders",j:"J Neuropathol Exp Neurol",v:"71",p:"531-546",pmid:"22592840",doi:"10.1097/NEN.0b013e3182588293"},
  edlow2024:{au:"Edlow y cols.",y:"2024",t:"Multimodal MRI reveals brainstem connections that sustain wakefulness in human consciousness",j:"Sci Transl Med",v:"16",p:"eadj4303",pmid:"38691619",doi:"10.1126/scitranslmed.adj4303"},
  liu2023:{au:"Liu y cols.",y:"2023",t:"Digital 3D Brain MRI Arterial Territories Atlas",j:"Sci Data",v:"10",p:"74",pmid:"36739282",doi:"10.1038/s41597-022-01923-0"}
});

const THG="Tálamo · núcleos", BSG="Tronco · sistema activador ascendente";
Object.assign(DEEP,{
  thav:{es:"Núcleo anteroventral del tálamo",group:THG,color:"#f4d58d",
    fn:"Principal núcleo del grupo anterior. Recibe del cuerpo mamilar por el haz mamilotalámico y proyecta a la corteza cingulada y retrosplenial: es el eslabón talámico del circuito de Papez y participa en la memoria episódica y en la orientación espacial.",
    clin:"El infarto tuberotalámico (arteria polar) produce amnesia anterógrada y apatía. Degenera junto al cuerpo mamilar en el síndrome de Wernicke-Korsakoff. Es diana de estimulación cerebral profunda en la epilepsia focal farmacorresistente."},
  thva:{es:"Núcleo ventral anterior",group:THG,color:"#e9b872",
    fn:"Recibe la salida de los ganglios basales (pálido interno y sustancia negra reticulada) y proyecta a la corteza premotora y prefrontal. Interviene en la preparación y selección del movimiento y en funciones ejecutivas.",
    clin:"Las lesiones anteriores izquierdas producen afasia talámica, con lenguaje reducido y parafasias pero repetición conservada; también abulia."},
  thvla:{es:"Ventral lateral anterior (VLa)",group:THG,color:"#e3a65c",
    fn:"Relevo palidal hacia el área motora suplementaria y la corteza premotora (corresponde al Vo de la nomenclatura de Hassler). Forma parte del bucle motor córtico-ganglios basales-tálamo-cortical.",
    clin:"Se ha usado como diana de talamotomía y estimulación en algunas distonías."},
  thvlp:{es:"Ventral lateral posterior (VLp)",group:THG,color:"#d98f45",
    fn:"Recibe del núcleo dentado del cerebelo por el pedúnculo cerebeloso superior (vía dentatorrubrotalámica) y proyecta a la corteza motora primaria. Incluye el núcleo ventral intermedio (VIM) de Hassler.",
    clin:"El VIM es la diana clásica de la estimulación profunda y de la talamotomía por ultrasonido focalizado guiado por resonancia para el temblor esencial y el temblor parkinsoniano."},
  thvpl:{es:"Ventral posterolateral (VPL)",group:THG,color:"#c97b3a",
    fn:"Relevo somatosensitivo del cuerpo: recibe el lemnisco medial (tacto fino, propiocepción) y el haz espinotalámico (dolor, temperatura) y proyecta a la corteza somatosensitiva primaria. El ventral posteromedial, vecino, hace lo mismo para la cara.",
    clin:"Un infarto lacunar aquí produce un síndrome sensitivo puro del hemicuerpo contralateral. Semanas después puede aparecer dolor central post-ictus (síndrome de Dejerine-Roussy). Lo irrigan las arterias talamogeniculadas, ramas de la cerebral posterior."},
  thpul:{es:"Pulvinar",group:THG,color:"#f0c060",
    fn:"El núcleo más voluminoso del tálamo humano. Conectado con la corteza de asociación parietal, temporal y occipital y con el colículo superior; participa en la atención visual, la detección de estímulos relevantes y la integración multisensorial.",
    clin:"La hiperintensidad bilateral del pulvinar en resonancia (signo del pulvinar) es característica de la variante de la enfermedad de Creutzfeldt-Jakob. Sus lesiones pueden producir negligencia y alteraciones de la atención."},
  thlgn:{es:"Cuerpo geniculado lateral",group:THG,color:"#f5e6b3",
    fn:"Relevo de la vía visual. Tiene seis capas: las 1 y 2 magnocelulares (movimiento) y las 3 a 6 parvocelulares (detalle y color), con capas koniocelulares entre ellas. Las capas 1, 4 y 6 reciben del ojo contralateral; las 2, 3 y 5, del ipsilateral. Proyecta a V1 por las radiaciones ópticas.",
    clin:"Su lesión produce hemianopsia homónima contralateral. Por su doble irrigación (coroidea anterior y coroidea posterior lateral), los infartos dan defectos en cuña o en sectores muy característicos."},
  thmgn:{es:"Cuerpo geniculado medial",group:THG,color:"#eadba8",
    fn:"Relevo auditivo: recibe del colículo inferior y proyecta a la corteza auditiva primaria del giro de Heschl por las radiaciones auditivas.",
    clin:"La vía auditiva es bilateral desde el tronco, por eso una lesión unilateral rara vez causa sordera. Las lesiones bilaterales producen sordera cortical o agnosia auditiva."},
  thcm:{es:"Núcleo centromediano",group:THG,color:"#b8865a",
    fn:"El mayor de los núcleos intralaminares. Recibe del pálido interno y de la formación reticular del tronco y proyecta sobre todo al estriado. Interviene en la alerta, la orientación de la atención hacia estímulos relevantes y la selección de acciones.",
    clin:"Es diana de estimulación cerebral profunda en el síndrome de Tourette y en epilepsias generalizadas como el síndrome de Lennox-Gastaut. Las lesiones intralaminares bilaterales alteran la conciencia."},
  thmd:{es:"Núcleo mediodorsal",group:THG,color:"#a87d4f",
    fn:"Conectado de forma recíproca con la corteza prefrontal dorsolateral, orbitofrontal y cingulada anterior; recibe de la amígdala y del pálido ventral. Sostiene la memoria de trabajo, la flexibilidad cognitiva y la toma de decisiones.",
    clin:"Se lesiona en el síndrome de Korsakoff y en el infarto paramediano bilateral (arteria de Percheron), con amnesia, apatía y somnolencia. Se han descrito reducciones de volumen y de conectividad prefrontal en la esquizofrenia."},
  thhb:{es:"Habénula (THOMAS)",group:THG,color:"#c4a7d6",
    fn:"Núcleo del epitálamo. Recibe por la estría medular desde el pálido y el septo, y por el fascículo retroflexo frena el rafe y el área tegmental ventral. Señala la ausencia de una recompensa esperada y el castigo.",
    clin:"Su hiperactividad se ha propuesto como mecanismo de la depresión; en modelos animales, la ketamina bloquea las descargas en ráfaga de la habénula lateral. La versión de CIT168 aparece también como «Habénula»."},

  bslc:{es:"Locus coeruleus",group:BSG,color:"#4f8fd9",
    fn:"Núcleo pequeño del tegmento pontino dorsal, pigmentado por neuromelanina, con unas decenas de miles de neuronas por lado. Es la principal fuente de noradrenalina del sistema nervioso central y proyecta a toda la corteza, el hipocampo, el tálamo, el cerebelo y la médula. Regula la vigilia, la atención, la respuesta al estrés y el dolor.",
    clin:"Es uno de los primeros lugares donde aparece patología tau en el envejecimiento y la enfermedad de Alzheimer, y degenera en la enfermedad de Parkinson. Su hiperactividad explica muchos signos de la abstinencia de opioides, que se tratan con agonistas α2 como la clonidina; se ha implicado en la hiperalerta del pánico y del estrés postraumático."},
  bsldtg:{es:"Núcleo tegmental laterodorsal",group:BSG,color:"#86c26a",
    fn:"Grupo de neuronas colinérgicas, con otras GABAérgicas y glutamatérgicas, en la sustancia gris central del puente. Proyecta al tálamo, al hipotálamo y al área tegmental ventral; activa la corteza en la vigilia y en el sueño REM y modula la liberación de dopamina asociada a la recompensa.",
    clin:"Con el pedunculopontino, forma los núcleos colinérgicos del tronco, que pierden neuronas en la enfermedad de Parkinson y en la parálisis supranuclear progresiva."},
  bspbc:{es:"Complejo parabraquial",group:BSG,color:"#e0a24f",
    fn:"Rodea el pedúnculo cerebeloso superior en el puente rostral. Recibe información visceral y gustativa del núcleo del tracto solitario, además de dolor y temperatura; la envía a la amígdala, el hipotálamo y el prosencéfalo basal. Sostiene la vigilia y las respuestas de alarma; su parte lateral (Kölliker-Fuse) ajusta el ritmo respiratorio.",
    clin:"En estudios experimentales su lesión produce un estado parecido al coma. Participa en el despertar ante la hipercapnia, relevante en la apnea del sueño."},
  bsptg:{es:"Núcleo pedunculopontino",group:BSG,color:"#7ab89b",
    fn:"Núcleo del tegmento mesopontino con neuronas colinérgicas, glutamatérgicas y GABAérgicas (llamado pedunculotegmental en el atlas). Conectado con los ganglios basales (pálido interno, subtálamo, sustancia negra reticulada) y con la médula. Forma parte de la región locomotora mesencefálica e interviene en la marcha, la postura, la alerta y el sueño REM.",
    clin:"Su degeneración en la enfermedad de Parkinson y en la parálisis supranuclear progresiva se relaciona con las caídas y la congelación de la marcha, que responden poco a la levodopa. Se ha ensayado su estimulación profunda con resultados variables."},
  bspno:{es:"Núcleo reticular oral del puente",group:BSG,color:"#9aa7c9",
    fn:"Parte de la formación reticular del puente rostral. Recibe aferencias colinérgicas del laterodorsal y del pedunculopontino y participa en la generación del sueño REM: activación cortical, movimientos oculares rápidos y atonía muscular.",
    clin:"La región sublaterodorsal vecina mantiene la atonía del REM; su daño explica el trastorno de conducta del sueño REM, en el que la persona representa sus sueños y que con frecuencia precede a una sinucleinopatía."},
  bsmrt:{es:"Formación reticular mesencefálica",group:BSG,color:"#b0a0d0",
    fn:"Núcleo del sistema reticular activador clásico descrito por Moruzzi y Magoun en 1949. Integra señales sensitivas y proyecta al tálamo intralaminar y al hipotálamo para mantener la corteza despierta.",
    clin:"Las lesiones bilaterales del tegmento mesencefálico, por ejemplo en la hernia transtentorial o en las hemorragias de Duret, producen coma."},
  bsdr:{es:"Núcleo dorsal del rafe",group:BSG,color:"#d06aa0",
    fn:"La mayor fuente de serotonina para el prosencéfalo: corteza, estriado, amígdala y tálamo. También contiene neuronas dopaminérgicas y glutamatérgicas. Modula el estado de ánimo, la impulsividad, el sueño, el apetito y el dolor.",
    clin:"Sus autorreceptores somatodendríticos 5-HT1A frenan su descarga al inicio de un ISRS; su desensibilización progresiva es una de las explicaciones de la latencia de semanas del efecto antidepresivo."},
  bsmnr:{es:"Núcleo mediano del rafe",group:BSG,color:"#e08fbf",
    fn:"Núcleo serotoninérgico y glutamatérgico de la línea media pontomesencefálica que proyecta sobre todo al hipocampo y al septo. Regula el ritmo theta hipocampal, la consolidación de memorias y la respuesta al estrés.",
    clin:"Se ha implicado en modelos experimentales de ansiedad y en la resiliencia al estrés; su relación con el hipocampo es uno de los vínculos propuestos entre serotonina y memoria."},
  bspag:{es:"Sustancia gris periacueductal",group:BSG,color:"#8a8f9e",
    fn:"Columnas de neuronas alrededor del acueducto de Silvio que organizan las respuestas de defensa (lucha, huida, inmovilidad), la vocalización, el control de la micción y la analgesia descendente a través del bulbo rostroventromedial hacia el asta dorsal.",
    clin:"Es diana de los opioides. Su estimulación produce analgesia o reacciones de pánico, y forma parte de los modelos neurobiológicos del trastorno de pánico. En la encefalopatía de Wernicke aparece hiperintensidad periacueductal en resonancia."}
});

/* territorios arteriales: índice = (etiqueta Level1 - 1) >> 1; etiquetas impares = izquierda */
const ART=[
 {k:"ACA",es:"Arteria cerebral anterior",fam:"Carótida · cerebral anterior",color:"#4fb38a",st:"aca",
  irr:"Cara medial de los lóbulos frontal y parietal hasta el precúneo, incluido el lobulillo paracentral, donde se representa la pierna; giro cingulado anterior, corteza orbitaria medial y los dos tercios anteriores del cuerpo calloso.",
  def:"Paresia e hipoestesia contralaterales de predominio crural, incontinencia urinaria, reflejo de prensión y abulia. En el lado izquierdo, afasia motora transcortical; la lesión callosa puede producir apraxia de la mano izquierda o síndrome de la mano ajena. La afectación bilateral produce mutismo acinético."},
 {k:"MLS",es:"Lenticuloestriadas mediales y recurrente de Heubner",fam:"Carótida · cerebral anterior",color:"#97d5b0",st:"aca",
  irr:"Perforantes del segmento A1 y arteria recurrente de Heubner: cabeza del núcleo caudado, porción anterior del putamen y del pálido y brazo anterior de la cápsula interna.",
  def:"Paresia faciobraquial contralateral leve, disartria y, por la lesión del caudado, abulia, desinhibición o alteraciones conductuales que pueden confundirse con un cuadro psiquiátrico."},
 {k:"LLS",es:"Lenticuloestriadas laterales",fam:"Carótida · cerebral media",color:"#f2c14e",st:"lac",
  irr:"Perforantes del segmento M1: putamen, pálido lateral, cuerpo del caudado, rodilla y brazo posterior de la cápsula interna y corona radiada.",
  def:"Infartos lacunares por enfermedad de pequeño vaso: hemiparesia motora pura, disartria-mano torpe o hemiparesia atáxica. Es además la localización más frecuente de la hemorragia hipertensiva, en el putamen."},
 {k:"MCAF",es:"Cerebral media, ramas frontales",fam:"Carótida · cerebral media",color:"#e4572e",st:"mcaS",
  irr:"Convexidad frontal lateral: giro precentral en su porción de cara y mano, giros frontales medio e inferior y opérculo frontal, con el área de Broca en el hemisferio dominante.",
  def:"Paresia faciobraquial contralateral y desviación de la mirada hacia el lado de la lesión. En el lado izquierdo, afasia no fluente; en el derecho, aprosodia motora."},
 {k:"MCAP",es:"Cerebral media, ramas parietales",fam:"Carótida · cerebral media",color:"#f28a3c",st:"mca",
  irr:"Giro poscentral, lobulillo parietal inferior (giros supramarginal y angular) y parte del superior.",
  def:"Pérdida de la sensibilidad cortical contralateral (estereognosia, grafestesia). En el lado izquierdo, apraxia ideomotora y síndrome de Gerstmann; en el derecho, heminegligencia, anosognosia y apraxia del vestir. Cuadrantanopsia inferior contralateral."},
 {k:"MCAT",es:"Cerebral media, ramas temporales",fam:"Carótida · cerebral media",color:"#d9404f",st:"mcaI",
  irr:"Giros temporales superior y medio, giro de Heschl y porción lateral del polo temporal.",
  def:"En el lado izquierdo, afasia de Wernicke o de conducción; en el derecho, aprosodia receptiva y estados confusionales con agitación. Cuadrantanopsia superior contralateral por afectación del asa de Meyer."},
 {k:"MCAO",es:"Cerebral media, ramas temporooccipitales",fam:"Carótida · cerebral media",color:"#c0627f",st:"mcaI",
  irr:"Convexidad occipital lateral y unión temporooccipital, en la frontera con el territorio de la cerebral posterior.",
  def:"Defectos del campo visual contralateral y trastornos de la percepción visual; en el lado izquierdo, alexia con agrafia cuando se afecta el giro angular."},
 {k:"MCAI",es:"Cerebral media, segmento insular",fam:"Carótida · cerebral media",color:"#f5a37a",st:"mca",
  irr:"Ínsula y opérculos frontal, parietal y temporal, a través de las ramas del segmento M2.",
  def:"Disartria, disgeusia y alteraciones autonómicas como arritmias; en el lado derecho, menor conciencia del déficit. En la TC precoz, la pérdida del ribete insular es uno de los primeros signos de isquemia."},
 {k:"PCAT",es:"Cerebral posterior, ramas temporales",fam:"Vertebrobasilar · cerebral posterior",color:"#6c8ee0",st:"pca",
  irr:"Cara inferior y medial del lóbulo temporal: parte del hipocampo, giro parahipocampal y giro fusiforme.",
  def:"Amnesia anterógrada, sobre todo en lesiones izquierdas o bilaterales; prosopagnosia y acromatopsia en lesiones fusiformes, más a menudo derechas; alucinosis visual."},
 {k:"PCAO",es:"Cerebral posterior, ramas occipitales",fam:"Vertebrobasilar · cerebral posterior",color:"#4a63c4",st:"pca",
  irr:"Corteza calcarina (V1), cuneus, giro lingual, polo occipital y esplenio del cuerpo calloso.",
  def:"Hemianopsia homónima contralateral con respeto macular. En el lado izquierdo con lesión del esplenio, alexia sin agrafia. La afectación bilateral produce ceguera cortical, a veces con negación del déficit (síndrome de Anton)."},
 {k:"PCTP",es:"Talamoperforantes y coroideas posteriores",fam:"Vertebrobasilar · cerebral posterior",color:"#9b86e0",st:"thal",
  irr:"Ramas del segmento P1 y de la comunicante posterior: tálamo paramediano y posterior (mediodorsal, intralaminares, pulvinar, geniculados), mesencéfalo rostral y plexos coroideos.",
  def:"Síndromes talámicos: hemihipoestesia y dolor central, amnesia y apatía en el infarto paramediano, somnolencia y parálisis de la mirada vertical. La arteria de Percheron, un solo tronco para ambos tálamos, produce un infarto paramediano bilateral."},
 {k:"ACTP",es:"Coroidea anterior y perforantes asociadas",fam:"Carótida · coroidea anterior",color:"#c7a0e8",st:"achor",
  irr:"Rama de la carótida interna: porción inferior del brazo posterior de la cápsula interna, cola del caudado, pálido medial, amígdala, uncus e hipocampo anterior, cintilla óptica, parte del geniculado lateral y plexo coroideo del asta temporal.",
  def:"Tríada de hemiparesia, hemihipoestesia y hemianopsia homónima contralaterales. El atlas JHU la agrupa con el sistema posterior por su distribución, aunque nace de la carótida."},
 {k:"B",es:"Arteria basilar y perforantes del tronco",fam:"Vertebrobasilar",color:"#3fb6c9",st:"bas",
  irr:"Ramas paramedianas y circunferenciales cortas del puente y del mesencéfalo.",
  def:"Coma, tetraparesia, parálisis bulbar y oftalmoplejias. El infarto ventral del puente produce el síndrome de enclaustramiento: conciencia preservada con parpadeo y movimientos oculares verticales como única vía de comunicación."},
 {k:"SC",es:"Arteria cerebelosa superior",fam:"Vertebrobasilar",color:"#7fd6e2",st:"sca",
  irr:"Cara superior del cerebelo (vermis y hemisferio superior), núcleo dentado, pedúnculo cerebeloso superior y tegmento lateral del puente rostral.",
  def:"Ataxia de los miembros del mismo lado, disartria, síndrome de Horner ipsilateral y pérdida de la sensibilidad al dolor y a la temperatura en el hemicuerpo contralateral. Es la arteria que con más frecuencia comprime el nervio trigémino en la neuralgia."},
 {k:"IC",es:"Cerebelosas inferiores (PICA y AICA)",fam:"Vertebrobasilar",color:"#2b8a9e",st:"pica",
  irr:"Cara inferior del cerebelo, amígdalas cerebelosas y flóculo; la PICA irriga además el bulbo lateral, y la AICA el puente lateral caudal y el oído interno a través de la arteria laberíntica.",
  def:"Vértigo, nistagmo, vómitos y ataxia. La PICA produce el síndrome bulbar lateral de Wallenberg; la AICA añade hipoacusia súbita y parálisis facial del mismo lado."},
 {k:"LV",es:"Ventrículo lateral",fam:"Sin territorio arterial",color:"#8a8f96",st:null,irr:"",def:""}
];
const ARTCOL=ART.map(a=>{const n=parseInt(a.color.slice(1),16); return [(n>>16&255)/255,(n>>8&255)/255,(n&255)/255];});
const artBase=l=>l>0?(l-1)>>1:-1;

/* ictus: territorios reales del atlas JHU */
Object.assign(STROKE.mca,{art:[2,3,4,5,6,7]});
Object.assign(STROKE.mcaS,{art:[3,4,7],dk:"mcaS"});
Object.assign(STROKE.mcaI,{art:[4,5,6],dk:"mcaI"});
Object.assign(STROKE.aca,{art:[0,1]});
Object.assign(STROKE.pca,{art:[8,9,10]});
Object.assign(STROKE,{
  lac:{es:"Lenticuloestriadas laterales (infarto lacunar)",art:[2],view:"deep",
    L:["Hemiparesia motora pura derecha que afecta por igual a cara, brazo y pierna, por lesión de la cápsula interna.","Sin afasia, negligencia ni hemianopsia: la corteza queda indemne.","Si se afecta la rodilla de la cápsula, disartria con torpeza de la mano."],
    R:["Hemiparesia motora pura izquierda que afecta por igual a cara, brazo y pierna.","Sin negligencia ni hemianopsia: la corteza queda indemne.","Si se afecta la rodilla de la cápsula, disartria con torpeza de la mano."],
    note:"Los infartos lacunares miden menos de 15 mm, se deben sobre todo a la enfermedad de pequeño vaso asociada a hipertensión y diabetes y suponen alrededor de una cuarta parte de los ictus isquémicos. Aquí se muestra el territorio completo de las perforantes; una laguna real ocupa solo una pequeña parte."},
  achor:{es:"Arteria coroidea anterior",art:[11],view:"deep",
    L:["Hemiparesia derecha por lesión del brazo posterior de la cápsula interna.","Hemihipoestesia derecha.","Hemianopsia homónima derecha por lesión de la cintilla óptica o del geniculado lateral."],
    R:["Hemiparesia izquierda.","Hemihipoestesia izquierda.","Hemianopsia homónima izquierda; a veces negligencia leve."],
    note:"Un infarto de pocos milímetros en el brazo posterior de la cápsula interna puede producir una hemiplejia densa: el déficit es mucho mayor que el volumen de la lesión."},
  thal:{es:"Perforantes talámicas y coroideas posteriores",art:[10],view:"deep",
    L:["Hemihipoestesia derecha y, semanas después, posible dolor central (síndrome de Dejerine-Roussy).","Amnesia, apatía y lenguaje empobrecido si se afecta el tálamo paramediano izquierdo.","Somnolencia en la fase aguda."],
    R:["Hemihipoestesia izquierda y posible dolor central.","Heminegligencia y alteraciones visuoespaciales.","Somnolencia en la fase aguda."],
    note:"La arteria de Percheron, una variante anatómica, irriga ambos tálamos paramedianos desde un solo tronco: su oclusión produce un infarto bilateral con hipersomnia, amnesia y parálisis de la mirada vertical que puede confundirse con un cuadro psiquiátrico o tóxico."},
  bas:{es:"Arteria basilar",art:[12],bil:true,view:"infra",
    L:["Disminución del nivel de conciencia o coma por lesión del sistema activador del tegmento pontomesencefálico.","Tetraparesia y parálisis bulbar.","Síndrome de enclaustramiento si el infarto es ventral del puente: conciencia preservada con parpadeo y movimientos oculares verticales.","Oftalmoplejias y pupilas puntiformes (puente) o arreactivas (mesencéfalo)."],
    note:"Ante un coma súbito con signos oculares hay que pensar en una oclusión basilar. Sin recanalización la mortalidad es muy alta. Activa la capa «Núcleos del tronco» para ver qué núcleos del sistema activador quedan dentro del territorio."},
  sca:{es:"Arteria cerebelosa superior",art:[13],view:"infra",
    L:["Ataxia de los miembros izquierdos: el cerebelo controla el mismo lado del cuerpo.","Disartria y marcha inestable.","Síndrome de Horner izquierdo.","Hipoestesia al dolor y la temperatura en el hemicuerpo derecho."],
    R:["Ataxia de los miembros derechos.","Disartria y marcha inestable.","Síndrome de Horner derecho.","Hipoestesia al dolor y la temperatura en el hemicuerpo izquierdo."],note:""},
  pica:{es:"Cerebelosas inferiores (PICA y AICA)",art:[14],view:"infra",
    L:["Vértigo, náuseas, nistagmo y ataxia de los miembros izquierdos.","Síndrome de Wallenberg si se afecta el bulbo lateral: hipoestesia termoalgésica de la hemicara izquierda y del hemicuerpo derecho, Horner izquierdo, disfagia y disfonía.","Hipoacusia y parálisis facial izquierdas si el territorio es el de la AICA."],
    R:["Vértigo, náuseas, nistagmo y ataxia de los miembros derechos.","Síndrome de Wallenberg si se afecta el bulbo lateral: hipoestesia termoalgésica de la hemicara derecha y del hemicuerpo izquierdo, Horner derecho, disfagia y disfonía.","Hipoacusia y parálisis facial derechas si el territorio es el de la AICA."],
    note:"El infarto cerebeloso puede presentarse solo con vértigo y confundirse con un trastorno vestibular periférico; la exploración HINTS ayuda a distinguirlos. Entre el segundo y el cuarto día, el edema puede comprimir el cuarto ventrículo y el tronco."}
});
STROKE.bas.R=STROKE.bas.L;

/* referencias por ficha */
for(const k in DEEP){ if(DEEP[k].group===THG) REFMAP['deep:'+k]=["saranathan2021"]; if(DEEP[k].group===BSG) REFMAP['deep:'+k]=["edlow2024","edlow2012"]; }
REFMAP['art']=["liu2023"];
REFMAP['sim:isq']=[...(REFMAP['sim:isq']||[]),"liu2023"];

/* recorrido nuevo: sistema activador ascendente */
TOURS.arousal={es:"El sistema activador ascendente y la conciencia",lvl:"Neurociencia",min:5,
 lede:"Qué núcleos del tronco y del tálamo mantienen despierta la corteza, con qué neurotransmisores y qué ocurre cuando fallan.",
 steps:[
  {t:"Una red, no un centro",x:"La vigilia depende de una red de núcleos del tegmento del puente y del mesencéfalo que proyectan al tálamo, al hipotálamo y al prosencéfalo basal. Moruzzi y Magoun la llamaron sistema reticular activador en 1949; hoy se cartografía núcleo a núcleo con resonancia de alta resolución e histología (atlas Harvard AAN).",hl:["bsmrt","bspno","bspbc"],col:"#b0a0d0",v:"medL",g:0.15,d:300,p:-0.5,ncb:true},
  {t:"Noradrenalina: locus coeruleus",x:"Un núcleo diminuto que inerva casi todo el encéfalo. Aumenta la ganancia de las redes ante estímulos relevantes y prepara la respuesta al estrés. Su actividad desciende en el sueño no REM y casi cesa en el REM.",hl:["bslc"],col:"#4f8fd9",v:"medL",g:0.15,d:300,p:-0.5,ncb:true,go:"deep:Lbslc"},
  {t:"Serotonina: núcleos del rafe",x:"El rafe dorsal inerva la corteza, el estriado y la amígdala; el mediano, el hipocampo y el septo. Modulan el ánimo, la impulsividad y el sueño, y son el punto de partida de la acción de los ISRS.",hl:["bsdr","bsmnr"],col:"#d06aa0",v:"medL",g:0.15,d:300,p:-0.5,ncb:true,go:"deep:bsdr"},
  {t:"Acetilcolina: pedunculopontino y laterodorsal",x:"Activan el tálamo durante la vigilia y el sueño REM. El prosencéfalo basal completa el sistema colinérgico llevando acetilcolina a la corteza.",hl:["bsptg","bsldtg","bf"],col:"#86c26a",v:"medL",g:0.15,d:300,p:-0.5,ncb:true,go:"deep:Lbsptg"},
  {t:"La puerta talámica",x:"Los núcleos intralaminares, como el centromediano, y el mediodorsal reciben el sistema activador y sincronizan la corteza. Las lesiones talámicas paramedianas bilaterales producen hipersomnia o alteración de la conciencia.",hl:["thcm","thmd"],col:"#b8865a",v:"medL",g:0.15,d:300,go:"deep:Lthcm"},
  {t:"Sustancia gris periacueductal",x:"Organiza las respuestas de defensa y la analgesia descendente, y conecta el sistema activador con la emoción y el dolor. Es diana de los opioides.",hl:["bspag"],col:"#8a8f9e",v:"medL",g:0.15,d:300,p:-0.5,ncb:true,go:"deep:bspag"},
  {t:"Cuando falla: el coma",x:"El coma se produce por una lesión de ambos hemisferios o por una lesión pequeña del tegmento pontomesencefálico. Por eso una oclusión de la arteria basilar o una hernia que comprime el mesencéfalo pueden apagar la conciencia aunque la corteza esté intacta.",hl:["bsmrt","bspno","bspbc","bslc","bsdr","bsmnr","bsptg","bsldtg","bspag"],col:"#e2685a",v:"medL",g:0.15,d:300,p:-0.5,ncb:true,go:"art:12:lh"}
 ]};
TOURS.arteries.steps.push({t:"Mapa arterial real",x:"Los territorios anteriores son una aproximación sobre regiones anatómicas. El atlas de Liu y cols. (2023) los define a partir de la distribución de lesiones en 1298 pacientes con ictus agudo. Abre el mapa «Arterias» para verlos vértice a vértice, incluidos las perforantes, la coroidea anterior y los territorios cerebelosos.",hl:[],col:"#9fd8ff",v:"latL",g:1,go:"art:3:lh"});
ROUTES.anat.units.push({t:"Mapeo fino",it:[["tour","arousal"],["go","deep:Lthmd"],["go","deep:Lthpul"],["go","deep:Lbslc"],["go","deep:bsdr"],["go","art:2:lh"],["go","art:9:lh"]]});
ROUTES.neuro.units.push({t:"Territorios arteriales reales",it:[["go","art:0:lh"],["go","art:11:lh"],["go","art:13:lh"],["sim","isq","Simulación de ictus"]]});
