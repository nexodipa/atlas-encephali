/* ===== v15: hemorragias extraaxiales, hipertensión intracraneal y herniaciones ===== */

Object.assign(REFS,{
  ropper1986:{au:"Ropper",y:"1986",t:"Lateral displacement of the brain and level of consciousness in patients with an acute hemispheral mass",j:"N Engl J Med",v:"314",p:"953-958",pmid:"3960059",doi:"10.1056/NEJM198604103141504"},
  bullock2006edh:{au:"Bullock y cols.",y:"2006",t:"Surgical management of acute epidural hematomas",j:"Neurosurgery",v:"58",p:"S7-15",pmid:"16710967"},
  bullock2006sdh:{au:"Bullock y cols.",y:"2006",t:"Surgical management of acute subdural hematomas",j:"Neurosurgery",v:"58",p:"S16-24",pmid:"16710968"},
  frontera2006:{au:"Frontera y cols.",y:"2006",t:"Prediction of symptomatic vasospasm after subarachnoid hemorrhage: the modified Fisher scale",j:"Neurosurgery",v:"59",p:"21-27",pmid:"16823296",doi:"10.1227/01.neu.0000243277.86222.6c"},
  pickard1989:{au:"Pickard y cols.",y:"1989",t:"Effect of oral nimodipine on cerebral infarction and outcome after subarachnoid haemorrhage: British aneurysm nimodipine trial",j:"BMJ",v:"298",p:"636-642",pmid:"2496789",doi:"10.1136/bmj.298.6674.636"},
  hutchinson2020:{au:"Hutchinson y cols.",y:"2020",t:"Trial of dexamethasone for chronic subdural hematoma",j:"N Engl J Med",v:"383",p:"2616-2627",pmid:"33326713",doi:"10.1056/NEJMoa2020473"},
  santarius2009:{au:"Santarius y cols.",y:"2009",t:"Use of drains versus no drains after burr-hole evacuation of chronic subdural haematoma: a randomised controlled trial",j:"Lancet",v:"374",p:"1067-1073",pmid:"19782872",doi:"10.1016/S0140-6736(09)61115-6"},
  davies2024:{au:"Davies y cols.",y:"2024",t:"Adjunctive middle meningeal artery embolization for subdural hematoma",j:"N Engl J Med",v:"391",p:"1890-1900",pmid:"39565988",doi:"10.1056/NEJMoa2313472"},
  liu2024mma:{au:"Liu y cols.",y:"2024",t:"Middle meningeal artery embolization for nonacute subdural hematoma",j:"N Engl J Med",v:"391",p:"1901-1912",pmid:"39565989",doi:"10.1056/NEJMoa2401201"},
  fiorella2024:{au:"Fiorella y cols.",y:"2024",t:"Embolization of the middle meningeal artery for chronic subdural hematoma",j:"N Engl J Med",v:"392",p:"855-864",pmid:"39565980",doi:"10.1056/NEJMoa2409845"}
});
REFMAP['sim:xa']=["ropper1986","bullock2006edh","bullock2006sdh","hutchinson2020","santarius2009","davies2024","liu2024mma","fiorella2024","frontera2006","pickard1989","hoh2023"];
for(const k of ['sim:ich','sim:gbm','sim:met']) REFMAP[k]=[...(REFMAP[k]||[]),"ropper1986"];

/* colecciones extraaxiales. Rs: radio de extensión sobre la superficie (mm); shape: lente o semiluna;
   reserve: volumen compensado antes de que suba la presión (mL), mayor con atrofia */
const XATYPES={
 edh:{es:"Hematoma epidural",col:0x6a0c16,Rs:32,shape:"lens",reserve:25,max:120,
  sites:{temporal:{es:"Temporoparietal (arteria meníngea media)",dk:["superiortemporal","supramarginal","postcentral"]},
         frontal:{es:"Frontal",dk:["rostralmiddlefrontal","superiorfrontal"]},
         parietal:{es:"Parietal",dk:["superiorparietal","inferiorparietal"]},
         pfossa:{es:"Fosa posterior (senos venosos)",cb:true,max:40}},
  mech:"Sangre entre la tabla interna del cráneo y la duramadre. En el 85–90 % de los casos es arterial: una fractura temporal desgarra la arteria meníngea media, que discurre por un surco del hueso. La duramadre está muy adherida en las suturas, así que el hematoma no las cruza y adopta forma de lente biconvexa.",
  clin:"Típico de adultos jóvenes tras un golpe. El intervalo lúcido clásico (pérdida breve de conciencia, recuperación y deterioro horas después) aparece solo en una minoría; su ausencia no lo descarta. Cefalea creciente, vómitos y somnolencia; la midriasis ipsilateral anuncia la herniación uncal. En la fosa posterior suele deberse a una lesión de un seno venoso y puede comprimir el tronco de forma brusca.",
  prog:"Si se evacua a tiempo el pronóstico es excelente, porque el cerebro subyacente suele estar sano: es la urgencia neuroquirúrgica en la que el retraso cuesta más."},
 asdh:{es:"Hematoma subdural agudo",col:0x5c0a14,Rs:80,shape:"cres",reserve:25,max:150,
  sites:{convex:{es:"Convexidad frontotemporoparietal",dk:["caudalmiddlefrontal","precentral","postcentral","supramarginal","superiortemporal"]}},
  mech:"Sangre entre la duramadre y la aracnoides, por rotura de las venas puente que cruzan del córtex a los senos durales cuando el cerebro se acelera y frena dentro del cráneo. Como el espacio subdural no tiene adherencias, la sangre se extiende como una semiluna que cruza las suturas, pero no la hoz ni la tienda del cerebelo.",
  clin:"En jóvenes, por traumatismos de alta energía y con lesión cerebral asociada; en mayores y anticoagulados, por caídas banales. Deterioro de conciencia, hemiparesia contralateral y anisocoria. El pronóstico depende tanto del hematoma como del daño del parénquima subyacente.",
  prog:"Mortalidad mucho mayor que la del epidural, porque el impacto suele lesionar también el cerebro."},
 csdh:{es:"Hematoma subdural crónico",col:0x6b5530,Rs:85,shape:"cres",reserve:90,max:200,
  sites:{convex:{es:"Convexidad frontotemporoparietal",dk:["caudalmiddlefrontal","precentral","postcentral","supramarginal","superiortemporal"]}},
  mech:"Colección que crece durante semanas a partir de un sangrado pequeño de las venas puente. Alrededor se forman membranas inflamatorias con capilares frágiles, irrigadas por ramas de la arteria meníngea media, que vuelven a sangrar. La atrofia cerebral de la edad avanzada da espacio y por eso volúmenes grandes producen pocos síntomas al principio.",
  clin:"Personas mayores, con antiagregantes o anticoagulantes, consumo de alcohol o caídas que a menudo no recuerdan. Cefalea, lentitud, confusión fluctuante, apatía, trastorno de la marcha y hemiparesia leve. Puede imitar una demencia, una depresión o un delirium: es una causa orgánica tratable que hay que buscar con TC ante un deterioro cognitivo subagudo.",
  prog:"La evacuación suele dar una recuperación rápida y llamativa, pero recurre en uno de cada diez a cinco pacientes."},
 sah:{es:"Hemorragia subaracnoidea",col:0x7a1018}
};

/* fuentes de hemorragia subaracnoidea: peso de sangre por región (i: ipsilateral, c: contralateral, sin prefijo: ambos lados) */
const SAHSRC={
 acomm:{es:"Aneurisma de la comunicante anterior",w:{medialorbitofrontal:1,rostralanteriorcingulate:0.9,lateralorbitofrontal:0.5,frontalpole:0.6,insula:0.45,"i:parsorbitalis":0.4,stem0:0.3,v3:0.5},
  txt:"La localización más frecuente. La sangre llena la cisura interhemisférica anterior y puede formar un hematoma en el giro recto. Su rotura o el vasoespasmo de ambas cerebrales anteriores producen abulia, mutismo acinético, confabulación y amnesia por lesión del prosencéfalo basal y del lóbulo frontal medial."},
 pcomm:{es:"Aneurisma de la comunicante posterior",w:{"i:parahippocampal":1,"i:entorhinal":1,"i:temporalpole":0.8,"i:insula":0.6,stem0:0.8,"c:parahippocampal":0.3},
  txt:"Sangre en la cisterna supraselar y ambiental del lado afectado. El aneurisma comprime el III par: parálisis oculomotora con ptosis y midriasis, porque las fibras pupilares van en la superficie del nervio. Una parálisis del III par dolorosa con pupila afectada es un aneurisma hasta que se demuestre lo contrario."},
 mca:{es:"Aneurisma de la bifurcación de la cerebral media",w:{"i:insula":1,"i:parsopercularis":0.8,"i:parstriangularis":0.6,"i:transversetemporal":0.8,"i:superiortemporal":0.7,"i:temporalpole":0.5,"c:insula":0.25},
  txt:"La sangre se acumula en la cisura de Silvio del lado roto y a menudo forma un hematoma temporal, con hemiparesia y, en el lado izquierdo, afasia. Es la localización que con más frecuencia produce hematoma intraparenquimatoso asociado."},
 basilar:{es:"Aneurisma del extremo de la basilar",w:{stem0:1,stem1:0.9,parahippocampal:0.6,entorhinal:0.5,v4:0.6,v3:0.6},
  txt:"Sangre en las cisternas interpeduncular y prepontina, que se extiende al cuarto ventrículo. Riesgo alto de hidrocefalia aguda; el vasoespasmo puede afectar al tálamo y al mesencéfalo. Se trata casi siempre por vía endovascular."},
 perimes:{es:"Perimesencefálica no aneurismática",w:{stem0:0.7,stem1:0.3},
  txt:"Sangre limitada a las cisternas delante del mesencéfalo y la protuberancia, con angiografía normal. Se atribuye a un sangrado venoso. Tiene un pronóstico excelente, pocas complicaciones y no suele repetirse; el diagnóstico exige que el patrón sea típico y descartar un aneurisma de la basilar."}
};
const HUNTHESS=["Asintomática o cefalea leve con discreta rigidez de nuca","Cefalea moderada o intensa, rigidez de nuca, sin déficit salvo parálisis de un par craneal","Somnolencia, confusión o déficit focal leve","Estupor, hemiparesia moderada o grave, posible rigidez de descerebración precoz","Coma profundo, rigidez de descerebración, aspecto moribundo"];
const FISHERM=[
 "Grado 0: sin hemorragia subaracnoidea ni intraventricular.",
 "Grado 1: hemorragia subaracnoidea fina (menos de 1 mm), sin sangre intraventricular.",
 "Grado 2: hemorragia subaracnoidea fina con sangre intraventricular.",
 "Grado 3: hemorragia subaracnoidea gruesa, sin sangre intraventricular.",
 "Grado 4: hemorragia subaracnoidea gruesa con sangre intraventricular."];
const SAHTX=[
 "Confirmar con TC sin contraste; si es normal y la sospecha persiste, punción lumbar o angio-TC según el tiempo transcurrido. Localizar el aneurisma con angio-TC o angiografía.",
 "Asegurar el aneurisma lo antes posible, idealmente en las primeras 24 horas, por vía endovascular o con clip quirúrgico según su forma y localización: el resangrado es más probable en los primeros días y su mortalidad es muy alta.",
 "Nimodipino oral durante 21 días: reduce el infarto cerebral y mejora el pronóstico (Pickard y cols., 1989).",
 "Mantener la euvolemia y evitar la hipotensión; vigilar a diario la aparición de un nuevo déficit o de una caída de conciencia entre los días 3 y 14 (isquemia cerebral diferida).",
 "Drenaje ventricular externo si hay hidrocefalia aguda con deterioro de conciencia.",
 "Vigilar la natremia: la hiponatremia por pérdida cerebral de sal es frecuente y no se trata restringiendo líquidos."];

/* ropper: desplazamiento horizontal de la glándula pineal y nivel de conciencia */
function ropperLevel(p){ if(p<3) return "alerta"; if(p<6) return "somnolencia"; if(p<8.5) return "estupor"; return "coma"; }

ROUTES.neuro.units.push({t:"Hipertensión intracraneal",it:[["sim","xa","Hemorragias extraaxiales y herniación"],["sim","ich","Hemorragia intraparenquimatosa"],["sim","gbm","Glioblastoma y efecto de masa"]]});
