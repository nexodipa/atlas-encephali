/* ===== v17: simulador de combinaciones de fármacos =====
   Carga serotoninérgica (criterios de Hunter), carga anticolinérgica (escala ACB), riesgo de QT (puntuación de Tisdale),
   depresión respiratoria, umbral convulsivo, fenoconversión por CYP450 y todas las interacciones por pares. */

Object.assign(REFS,{
  tisdale2013:{au:"Tisdale y cols.",y:"2013",t:"Development and validation of a risk score to predict QT interval prolongation in hospitalized patients",j:"Circ Cardiovasc Qual Outcomes",v:"6",p:"479-487",pmid:"23716032",doi:"10.1161/CIRCOUTCOMES.113.000152"},
  dunkley2003:{au:"Dunkley y cols.",y:"2003",t:"The Hunter Serotonin Toxicity Criteria: simple and accurate diagnostic decision rules for serotonin toxicity",j:"QJM",v:"96",p:"635-642",pmid:"12925718",doi:"10.1093/qjmed/hcg109"},
  fox2011:{au:"Fox y cols.",y:"2011",t:"Anticholinergic medication use and cognitive impairment in the older population: the Medical Research Council Cognitive Function and Ageing Study",j:"J Am Geriatr Soc",v:"59",p:"1477-1483",pmid:"21707557",doi:"10.1111/j.1532-5415.2011.03491.x"}
});
REFMAP['regimen']=["dunkley2003","fox2011","tisdale2013"];

/* fármacos no psicotrópicos que aparecen a menudo junto a los psicofármacos (solo para el simulador) */
const XDRUGS={
  ibuprofen:{es:"Ibuprofeno (AINE)",cls:"Otros fármacos frecuentes"},
  enalapril:{es:"Enalapril (IECA)",cls:"Otros fármacos frecuentes"},
  hydrochlorothiazide:{es:"Hidroclorotiazida",cls:"Otros fármacos frecuentes"},
  furosemide:{es:"Furosemida",cls:"Otros fármacos frecuentes"},
  ondansetron:{es:"Ondansetrón",cls:"Otros fármacos frecuentes"},
  metoclopramide:{es:"Metoclopramida",cls:"Otros fármacos frecuentes"},
  azithromycin:{es:"Azitromicina",cls:"Otros fármacos frecuentes"},
  clarithromycin:{es:"Claritromicina",cls:"Otros fármacos frecuentes"},
  fluconazole:{es:"Fluconazol",cls:"Otros fármacos frecuentes"},
  linezolid:{es:"Linezolid",cls:"Otros fármacos frecuentes"},
  rifampicin:{es:"Rifampicina",cls:"Otros fármacos frecuentes"},
  omeprazole:{es:"Omeprazol",cls:"Otros fármacos frecuentes"},
  tramadol:{es:"Tramadol",cls:"Otros fármacos frecuentes"},
  codeine:{es:"Codeína",cls:"Otros fármacos frecuentes"},
  dextromethorphan:{es:"Dextrometorfano",cls:"Otros fármacos frecuentes"}
};
Object.assign(IX,{
  ibuprofen:{liup:1},enalapril:{liup:1},hydrochlorothiazide:{liup:1,hypok:1},furosemide:{loop:1,hypok:1},
  ondansetron:{qt:1,ser:1,cyp:{sub:['3A4']}},metoclopramide:{da:'ant'},azithromycin:{qt:1},
  clarithromycin:{qt:1,cyp:{inh:{'3A4':'potente'}}},fluconazole:{qt:1,cyp:{inh:{'3A4':'moderado','2C19':'potente','2C9':'moderado'}}},
  linezolid:{ser:'lzd'},rifampicin:{cyp:{ind:['3A4','2C9','2C19','1A2','2B6']}},omeprazole:{cyp:{inh:{'2C19':'moderado'}}},
  tramadol:{ser:2,op:1,cns:1,seiz:1,pro2d6:1,cyp:{sub:['2D6','3A4']}},codeine:{op:1,cns:1,pro2d6:1,cyp:{sub:['2D6']}},
  dextromethorphan:{ser:1,cyp:{sub:['2D6']}}
});
// umbral convulsivo
for(const k of ['clozapine','amitriptyline','clomipramine','chlorpromazine']) if(IX[k]) IX[k].seiz=1;

/* factores del paciente; tisdale: puntos de la escala de Tisdale (2013) */
const PTF=[
  ['age','68 años o más',{tisdale:1}],
  ['female','Mujer',{tisdale:1}],
  ['k','Potasio por debajo de 3,5 mEq/L',{tisdale:2}],
  ['qtc','QTc de partida de 450 ms o más',{tisdale:2}],
  ['mi','Infarto agudo de miocardio',{tisdale:2}],
  ['sepsis','Sepsis',{tisdale:3}],
  ['hf','Insuficiencia cardiaca o disfunción del ventrículo izquierdo',{tisdale:3}],
  ['dementia','Demencia o deterioro cognitivo',{}],
  ['epilepsy','Epilepsia o crisis previas',{}],
  ['resp','EPOC, apnea del sueño u otra enfermedad respiratoria',{}],
  ['pm2d6','Metabolizador lento de CYP2D6 (genotipo)',{}],
  ['renal','Insuficiencia renal o deshidratación',{}]
];
const HUNTER=[['spont','Clonus espontáneo'],['induc','Clonus inducible'],['ocular','Clonus ocular'],['agit','Agitación'],['diaph','Diaforesis'],['tremor','Temblor'],['hyperref','Hiperreflexia'],['hypert','Hipertonía'],['temp','Temperatura por encima de 38 °C']];
function hunterMet(h){ const a=h.agit||h.diaph;
  return !!(h.spont||(h.induc&&a)||(h.ocular&&a)||(h.tremor&&h.hyperref)||(h.hypert&&h.temp&&(h.ocular||h.induc))); }

ROUTES.pharm.units.splice(ROUTES.pharm.units.length-1,0,{t:"Combinaciones",it:[["go","regimen","Simulador de combinaciones"],["ec","serotonin"],["ec","lithium"]]});
