// ===== v13: más casos que evolucionan y más recorridos =====
Object.assign(REFS,{
  glauser2016:{au:"Glauser y cols.",y:"2016",t:"Evidence-Based Guideline: Treatment of Convulsive Status Epilepticus in Children and Adults: Report of the Guideline Committee of the American Epilepsy Society",j:"Epilepsy Curr",v:"16",p:"48-61",pmid:"26900382",doi:"10.5698/1535-7597-16.1.48"},
  kapur2019:{au:"Kapur y cols.",y:"2019",t:"Randomized Trial of Three Anticonvulsant Medications for Status Epilepticus",j:"N Engl J Med",v:"381",p:"2103-2113",pmid:"31774955",doi:"10.1056/NEJMoa1905795"},
  schuckit2014:{au:"Schuckit",y:"2014",t:"Recognition and management of withdrawal delirium (delirium tremens)",j:"N Engl J Med",v:"371",p:"2109-13",pmid:"25427113",doi:"10.1056/NEJMra1407298"},
  mayosmith1997:{au:"Mayo-Smith",y:"1997",t:"Pharmacological management of alcohol withdrawal. A meta-analysis and evidence-based practice guideline",j:"JAMA",v:"278",p:"144-51",pmid:"9214531",doi:"10.1001/jama.278.2.144"},
  perry2013:{au:"Perry y cols.",y:"2013",t:"Clinical decision rules to rule out subarachnoid hemorrhage for acute headache",j:"JAMA",v:"310",p:"1248-55",pmid:"24065011",doi:"10.1001/jama.2013.278018"},
  hoh2023:{au:"Hoh y cols.",y:"2023",t:"2023 Guideline for the Management of Patients With Aneurysmal Subarachnoid Hemorrhage: A Guideline From the American Heart Association/American Stroke Association",j:"Stroke",v:"54",p:"e314-e370",pmid:"37212182",doi:"10.1161/STR.0000000000000436"},
  vandebeek2016:{au:"van de Beek y cols.",y:"2016",t:"ESCMID guideline: diagnosis and treatment of acute bacterial meningitis",j:"Clin Microbiol Infect",v:"22 Suppl 3",p:"S37-62",pmid:"27062097",doi:"10.1016/j.cmi.2016.01.007"},
  degans2002:{au:"de Gans y van de Beek",y:"2002",t:"Dexamethasone in adults with bacterial meningitis",j:"N Engl J Med",v:"347",p:"1549-56",pmid:"12432041",doi:"10.1056/NEJMoa021334"}
});
Object.assign(ECASES,{
status:{es:"Crisis que no se detiene",area:"Neurología de urgencias",refs:["glauser2016","kapur2019"],start:"n0",nodes:{
 n0:{t:"Domicilio",x:"Varón de 31 años con epilepsia. Su pareja llama porque lleva convulsionando cinco minutos sin parar; la ambulancia llega cuando ya van siete. Ha dejado la medicación hace una semana y anoche bebió.",vit:{Duración:"7 min",SatO2:"89%",Glucemia:"capilar pendiente"},hl:["superiorfrontal","precentral","thal","hippo"],col:"#e2685a",v:"latL",g:1,
  ch:[{l:"Esperar a que ceda sola; las crisis suelen parar",to:"n1b",q:"bad",fb:"Una crisis de más de 5 minutos es un estado epiléptico: cuanto más dura, más difícil es detenerla y más daño produce."},
      {l:"Midazolam intramuscular, oxígeno, glucemia capilar",to:"n1",q:"ok",fb:"Es la primera línea: benzodiacepina sin esperar (midazolam intramuscular si no hay vía, lorazepam o diazepam intravenosos si la hay)."}]},
 n1b:{t:"Minuto 20",x:"Sigue convulsionando; la saturación cae a 82% y aparece cianosis.",vit:{Duración:"20 min",SatO2:"82%"},hl:["superiorfrontal","precentral","thal","hippo","amyg"],col:"#e2685a",v:"latL",g:1,
  ch:[{l:"Midazolam intramuscular de inmediato",to:"n1",q:"meh",fb:"Ahora la respuesta a la benzodiacepina es menor: los receptores GABA-A se internalizan a medida que la crisis se prolonga."}]},
 n1:{t:"Urgencias, minuto 15",x:"La glucemia es normal. Tras el midazolam y una segunda dosis de benzodiacepina intravenosa en urgencias, las convulsiones siguen.",vit:{Duración:"15 min",SatO2:"94% con O₂",PA:"168/92"},
  ch:[{l:"Segunda línea intravenosa: levetiracetam, valproato o fosfenitoína",to:"n2",q:"ok",fb:"Tras dos dosis de benzodiacepina, se pasa a un antiepiléptico de segunda línea; en el ensayo ESETT los tres detuvieron el estado en alrededor de la mitad de los pacientes (Kapur y cols., 2019)."},
      {l:"Una tercera y una cuarta dosis de benzodiacepina",to:"n2b",q:"bad",fb:"Más benzodiacepinas añaden depresión respiratoria sin mucha más eficacia."}]},
 n2b:{t:"Depresión respiratoria",x:"Las convulsiones disminuyen pero el paciente hipoventila y hay que ventilarlo con bolsa.",vit:{SatO2:"85%"},
  ch:[{l:"Antiepiléptico de segunda línea y asegurar la vía aérea",to:"n2",q:"meh",fb:"Corregido, con una complicación evitable."}]},
 n2:{t:"Minuto 45",x:"Las convulsiones visibles se han detenido, pero el paciente no despierta: Glasgow 7, con leves sacudidas de los párpados.",vit:{Glasgow:"7",T:"38,1 °C"},hl:["superiorfrontal","precentral","thal","hippo"],col:"#e2685a",v:"latL",g:1,
  ch:[{l:"Es un estado poscrítico; esperar a que despierte",to:"n3b",q:"bad",fb:"Si no recupera la conciencia en unos 20–30 minutos, hay que descartar un estado epiléptico no convulsivo con EEG."},
      {l:"EEG urgente, intubación y anestésico (midazolam o propofol en perfusión) si persiste la actividad",to:"n3",q:"ok",fb:"Las sacudidas sutiles y la falta de despertar sugieren estado no convulsivo; el estado refractario a dos líneas se trata con anestésicos en cuidados intensivos."}]},
 n3b:{t:"Seis horas después",x:"Sigue sin despertar. El EEG, hecho por fin, muestra descargas continuas: estado epiléptico no convulsivo.",
  ch:[{l:"Intubación y anestésico con monitorización EEG",to:"n3",q:"meh",fb:"El retraso aumenta el riesgo de daño neuronal, sobre todo en el hipocampo."}]},
 n3:{t:"Cuidados intensivos",x:"Con perfusión de midazolam y monitorización EEG continua las descargas cesan. La TC es normal. En 48 horas se retira la sedación y el paciente despierta.",
  ch:[{l:"Reintroducir su antiepiléptico, abordar la adherencia y el alcohol, y explicar el riesgo",to:"end_ok",q:"ok",fb:"La causa fue el abandono del tratamiento con alcohol: hay que prevenir el siguiente episodio."}]},
 end_ok:{end:true,good:true,t:"Desenlace",x:"El paciente se recupera sin secuelas evidentes. Lo aprendido: el estado epiléptico es una urgencia con tiempos: benzodiacepina a los 5 minutos, segunda línea a los 20, anestésicos si persiste a los 40, y EEG si no despierta (Glauser y cols., 2016).",go:"org:epilepsy"}
}},
mania:{es:"Un joven que no duerme",area:"Psiquiatría",refs:["yatham2018","goodwin2022"],start:"n0",nodes:{
 n0:{t:"Urgencias",x:"Varón de 24 años, traído por su familia. Hace dos meses empezó sertralina por depresión. Desde hace diez días duerme dos horas, habla sin parar, ha gastado sus ahorros en un proyecto «que cambiará el mundo» y dice que Dios le ha encomendado una misión. Se muestra irritable cuando le interrumpen.",vit:{FC:"98 lpm",PA:"128/80",T:"36,8 °C"},hl:["amyg","accumb","parsorbitalis","lateralorbitofrontal"],col:"#e8c46a",nt:{da_ml:"hyper"},v:"inf",g:0.4,
  ch:[{l:"Descartar tóxicos y causas médicas, y valorar riesgo y capacidad",to:"n1",q:"ok",fb:"Un primer episodio maníaco obliga a descartar estimulantes, corticoides, hipertiroidismo y lesiones; también a evaluar riesgos (gastos, conducción, suicidio) y la necesidad de ingreso."},
      {l:"Subir la sertralina porque la depresión no ha mejorado",to:"n1b",q:"bad",fb:"Es una manía, probablemente desencadenada por el antidepresivo en un trastorno bipolar no reconocido; el antidepresivo debe retirarse."}]},
 n1b:{t:"Tres días después",x:"Lo traen la policía tras una pelea en la calle. Está más acelerado, con ideas de grandeza delirantes y no ha dormido.",
  ch:[{l:"Retirar la sertralina, ingresar y descartar causas",to:"n1",q:"meh",fb:"Corregido tras una complicación."}]},
 n1:{t:"Estudio",x:"Tóxicos en orina negativos, TSH normal, analítica normal. No hay focalidad neurológica. Cumple criterios de episodio maníaco con síntomas psicóticos: diagnóstico de trastorno bipolar I. Acepta el ingreso de forma voluntaria.",
  ch:[{l:"Retirar la sertralina e iniciar un antipsicótico (por ejemplo quetiapina u olanzapina) con litio",to:"n2",q:"ok",fb:"Las guías CANMAT/ISBD y BAP sitúan el litio, el valproato y varios antipsicóticos de segunda generación como primera línea en la manía aguda; la combinación se usa en la manía grave o con psicosis."},
      {l:"Solo lorazepam para que duerma",to:"n2b",q:"bad",fb:"Las benzodiacepinas ayudan con la agitación y el insomnio, pero no tratan la manía."}]},
 n2b:{t:"Una semana después",x:"Duerme algo mejor pero persisten la aceleración y las ideas delirantes.",
  ch:[{l:"Añadir antipsicótico y litio",to:"n2",q:"meh",fb:"El tratamiento antimaníaco era necesario desde el principio."}]},
 n2:{t:"Antes del litio",x:"Antes de iniciar el litio hay que hacer algunas pruebas.",
  ch:[{l:"Función renal, TSH, calcio, ECG y prueba de embarazo si procede; litemias a los 5–7 días",to:"n3",q:"ok",fb:"El litio afecta al riñón, al tiroides y a las paratiroides; su margen terapéutico es estrecho."},
      {l:"Empezar sin pruebas; ya se harán en la consulta",to:"n3",q:"meh",fb:"Faltan los valores de referencia para detectar efectos adversos después."}]},
 n3:{t:"Tres semanas después",x:"La manía ha remitido; el paciente duerme siete horas y critica las ideas de grandeza. Pregunta si puede dejar la medicación ahora que está bien.",
  ch:[{l:"Mantener el litio a largo plazo, psicoeducación sobre señales de alarma y sueño regular",to:"end_ok",q:"ok",fb:"Tras un episodio maníaco el riesgo de recaída es alto; el litio es el estabilizador de mantenimiento con más evidencia y reduce el riesgo de suicidio."},
      {l:"Retirar todo al alta",to:"end_meh",q:"bad",fb:"La retirada, sobre todo brusca del litio, aumenta mucho el riesgo de recaída."}]},
 end_ok:{end:true,good:true,t:"Desenlace",x:"Dos años después sigue estable con litio. Lo aprendido: un antidepresivo puede desencadenar una manía en un trastorno bipolar no diagnosticado; ante una depresión, preguntar siempre por antecedentes de hipomanía y por historia familiar.",go:"psy:bd"},
 end_meh:{end:true,good:false,t:"Desenlace",x:"A los cuatro meses recae con un episodio maníaco grave. Lo aprendido: el trastorno bipolar es crónico y el tratamiento de mantenimiento es la base.",go:"psy:bd"}
}},
dt:{es:"Temblor y bichos en la pared",area:"Psiquiatría de enlace",refs:["schuckit2014","mayosmith1997"],start:"n0",nodes:{
 n0:{t:"Planta de medicina interna, día 3",x:"Varón de 52 años ingresado por neumonía. Hoy está desorientado, sudoroso y tembloroso, ve insectos en la pared y quiere irse. Su mujer cuenta que bebía una botella de licor al día; no lo dijo al ingresar.",vit:{T:"38,2 °C",FC:"132 lpm",PA:"172/100",Glasgow:"13"},hl:["amyg","thal","hippo","insula"],col:"#d0a070",nt:{ne:"hyper"},v:"latL",g:0.5,
  ch:[{l:"Haloperidol para la agitación y las alucinaciones",to:"n1b",q:"bad",fb:"Los antipsicóticos solos no tratan la abstinencia, bajan el umbral convulsivo y empeoran el pronóstico; como mucho son un complemento."},
      {l:"Benzodiacepina (diazepam o lorazepam) a dosis suficientes según síntomas, y tiamina intravenosa",to:"n1",q:"ok",fb:"Las benzodiacepinas reducen el delirium y las crisis de abstinencia (Mayo-Smith, 1997); la tiamina previene la encefalopatía de Wernicke."}]},
 n1b:{t:"Una hora después",x:"Sufre una crisis tónico-clónica generalizada.",vit:{FC:"140 lpm",T:"38,6 °C"},
  ch:[{l:"Benzodiacepinas a dosis altas y tiamina",to:"n1",q:"meh",fb:"El tratamiento correcto, tras una complicación evitable."}]},
 n1:{t:"Analítica",x:"Magnesio 1,2 mg/dL, potasio 3,1 mmol/L, fósforo bajo, glucemia 64 mg/dL. Una enfermera prepara suero glucosado.",
  ch:[{l:"Tiamina antes o con la glucosa, y reponer magnesio, potasio y fósforo",to:"n2",q:"ok",fb:"La glucosa consume tiamina; el magnesio es cofactor de las enzimas dependientes de tiamina y su déficit hace la abstinencia refractaria."},
      {l:"Glucosa ya; la tiamina puede esperar a mañana",to:"n2b",q:"bad",fb:"Dar glucosa sin tiamina en un alcohólico puede precipitar una encefalopatía de Wernicke."}]},
 n2b:{t:"Doce horas después",x:"El paciente tiene nistagmo, no puede mover los ojos hacia los lados y no se tiene en pie.",hl:["mam","thal","stem0"],col:"#e6b35a",v:"inf",g:0.3,
  ch:[{l:"Tiamina intravenosa a dosis altas (varias veces al día)",to:"n2",q:"meh",fb:"Encefalopatía de Wernicke: oftalmoplejia, ataxia y confusión; con tiamina precoz los signos oculares mejoran en horas."}]},
 n2:{t:"Día 5",x:"Con dosis decrecientes de benzodiacepinas y reposición de electrolitos, el temblor y las alucinaciones ceden; la neumonía mejora. El paciente está orientado y avergonzado.",
  ch:[{l:"Entrevista motivacional, plan de deshabituación y fármaco anticraving (naltrexona o acamprosato)",to:"end_ok",q:"ok",fb:"La desintoxicación no es el tratamiento de la dependencia; el ingreso es una oportunidad para empezarlo."},
      {l:"Alta con benzodiacepinas para casa sin plan",to:"end_meh",q:"bad",fb:"Combinar benzodiacepinas con alcohol en casa es peligroso, y sin plan de tratamiento la recaída es lo esperable."}]},
 end_ok:{end:true,good:true,t:"Desenlace",x:"Acepta seguimiento en la unidad de adicciones y mantiene la abstinencia a los seis meses. Lo aprendido: preguntar por el alcohol en todo ingreso; el delirium tremens aparece a las 48–96 horas del último consumo, se trata con benzodiacepinas y siempre con tiamina (Schuckit, 2014).",go:"psy:aud"},
 end_meh:{end:true,good:false,t:"Desenlace",x:"Reingresa al mes intoxicado con alcohol y benzodiacepinas. Lo aprendido: tras la abstinencia viene el tratamiento de la dependencia.",go:"psy:aud"}
}},
sah:{es:"La peor cefalea de su vida",area:"Neurología de urgencias",refs:["perry2013","hoh2023"],start:"n0",nodes:{
 n0:{t:"Urgencias",x:"Mujer de 47 años, fumadora. Mientras hacía ejercicio notó un dolor de cabeza brutal que alcanzó su máximo en segundos, con vómitos. Ahora está consciente y sin focalidad, pero le duele el cuello al flexionarlo.",vit:{PA:"176/98",FC:"88 lpm",Glasgow:"15"},
  ch:[{l:"Analgesia y alta como migraña",to:"n1b",q:"bad",fb:"Cumple varios criterios de la regla de Ottawa (40 años o más, dolor de cuello, inicio con el esfuerzo, máximo instantáneo, flexión limitada): hay que descartar una hemorragia subaracnoidea (Perry y cols., 2013)."},
      {l:"TC craneal sin contraste urgente",to:"n1",q:"ok",fb:"La TC en las primeras 6 horas es muy sensible para la hemorragia subaracnoidea."}]},
 n1b:{t:"Al día siguiente",x:"Vuelve en ambulancia: tuvo un segundo dolor brusco y ahora está somnolienta.",vit:{Glasgow:"12"},hl:["vent","hth","medialorbitofrontal"],col:"#9c3446",v:"inf",g:0.4,
  ch:[{l:"TC urgente",to:"n1",q:"bad",fb:"Fue un resangrado: la primera hemorragia era una «cefalea centinela» y el resangrado tiene una mortalidad muy alta."}]},
 n1:{t:"Imagen",x:"La TC muestra sangre en las cisternas basales y la cisura interhemisférica. La angio-TC encuentra un aneurisma de 7 mm en la arteria comunicante anterior.",hl:["medialorbitofrontal","rostralanteriorcingulate","hth","vent"],col:"#9c3446",v:"inf",g:0.4,
  ch:[{l:"Asegurar el aneurisma lo antes posible (embolización o clipaje), nimodipino oral y control de la presión",to:"n2",q:"ok",fb:"Tratar el aneurisma precozmente reduce el resangrado; el nimodipino mejora el pronóstico (guía AHA/ASA 2023)."},
      {l:"Esperar dos semanas a que se estabilice para operar",to:"n2b",q:"bad",fb:"El riesgo de resangrado es máximo en las primeras horas y días; el tratamiento precoz es la norma."}]},
 n2b:{t:"Día 3",x:"Resangra en la UCI con caída brusca del nivel de conciencia.",vit:{Glasgow:"7"},
  ch:[{l:"Embolización urgente",to:"end_bad",q:"bad",fb:"Llega tarde."}]},
 n2:{t:"Día 6",x:"Tras la embolización la paciente estaba bien, pero hoy está confusa y tiene debilidad nueva de la pierna derecha.",vit:{Glasgow:"13",Na:"129 mmol/L"},hl:["L_superiorfrontal","L_paracentral","L_caudalanteriorcingulate"],col:"#8ab4d8",v:"medL",g:1,
  ch:[{l:"Sospechar vasoespasmo e isquemia cerebral diferida: TC, Doppler o angiografía, euvolemia y tratamiento endovascular si procede",to:"end_ok",q:"ok",fb:"El vasoespasmo es máximo entre los días 4 y 14; la isquemia de la cerebral anterior explica la pierna. Se mantiene la normovolemia y se corrige la hiponatremia sin restringir líquidos."},
      {l:"Restringir líquidos por la hiponatremia",to:"end_meh",q:"bad",fb:"En la hemorragia subaracnoidea la hiponatremia suele ser por pérdida renal de sal; restringir líquidos causa hipovolemia y empeora la isquemia."}]},
 end_ok:{end:true,good:true,t:"Desenlace",x:"Con tratamiento del vasoespasmo la debilidad mejora. A los seis meses vuelve a trabajar a tiempo parcial. Lo aprendido: una cefalea en trueno exige descartar hemorragia subaracnoidea; las complicaciones típicas son resangrado, vasoespasmo, hidrocefalia e hiponatremia (Hoh y cols., 2023)."},
 end_meh:{end:true,good:false,t:"Desenlace",x:"Desarrolla un infarto frontal medial con abulia persistente. Lo aprendido: no restringir líquidos en la hemorragia subaracnoidea."},
 end_bad:{end:true,good:false,t:"Desenlace",x:"La paciente queda en estado de mínima conciencia. Lo aprendido: la primera cefalea en trueno es la oportunidad de diagnóstico; el resangrado es la complicación más letal."}
}},
meningitis:{es:"Fiebre, rigidez de nuca y manchas en la piel",area:"Neurología de urgencias",refs:["vandebeek2016","degans2002"],start:"n0",nodes:{
 n0:{t:"Urgencias",x:"Estudiante de 19 años que vive en una residencia. Desde esta mañana tiene fiebre alta, cefalea intensa, vómitos y ahora está confuso. Rigidez de nuca y petequias en las piernas que no desaparecen al presionar.",vit:{T:"39,6 °C",FC:"128 lpm",PA:"96/58",Glasgow:"13"},hl:["superiorfrontal","superiortemporal","vent"],col:"#d98a6a",v:"latL",g:0.6,
  ch:[{l:"Hemocultivos, dexametasona y ceftriaxona de inmediato; después punción lumbar",to:"n1",q:"ok",fb:"En la sospecha de meningitis bacteriana el antibiótico no debe retrasarse por ninguna prueba; la dexametasona va antes o con la primera dosis (van de Beek y cols., 2016)."},
      {l:"TC craneal y punción lumbar antes de dar antibióticos para no alterar los cultivos",to:"n1b",q:"bad",fb:"Cada hora de retraso aumenta la mortalidad. La TC antes de la punción solo se necesita si hay focalidad, crisis, Glasgow muy bajo o inmunosupresión, y nunca debe retrasar el antibiótico."}]},
 n1b:{t:"Dos horas después",x:"Mientras esperaba la TC, la presión cae a 78/40 y aparecen más petequias que confluyen.",vit:{PA:"78/40",FC:"148 lpm",Glasgow:"10"},
  ch:[{l:"Antibiótico, dexametasona, fluidos y cuidados intensivos",to:"n1",q:"meh",fb:"Ahora hay además shock séptico meningocócico."}]},
 n1:{t:"Líquido cefalorraquídeo",x:"Líquido turbio: 2400 células/µL con 90% de neutrófilos, glucosa 18 mg/dL (glucemia 110), proteínas 280 mg/dL. Gram: diplococos gramnegativos.",
  ch:[{l:"Meningitis meningocócica: aislamiento respiratorio, notificación y profilaxis de los contactos cercanos",to:"n2",q:"ok",fb:"Neisseria meningitidis se transmite por gotas; los contactos estrechos (convivientes, compañeros de residencia, quien hizo maniobras sin protección) reciben ciprofloxacino, rifampicina o ceftriaxona."},
      {l:"Seguir igual; no hace falta avisar a nadie",to:"n2b",q:"bad",fb:"La meningitis meningocócica es de declaración obligatoria y sus contactos necesitan profilaxis."}]},
 n2b:{t:"Una semana después",x:"Un compañero de habitación ingresa con el mismo cuadro.",
  ch:[{l:"Notificar y dar profilaxis a los contactos",to:"n2",q:"bad",fb:"Llega tarde para ese compañero."}]},
 n2:{t:"Evolución",x:"Tras siete días de ceftriaxona el paciente está afebril y orientado. Refiere que oye peor por el oído izquierdo.",
  ch:[{l:"Audiometría antes del alta",to:"end_ok",q:"ok",fb:"La hipoacusia neurosensorial es la secuela más frecuente de la meningitis bacteriana; detectarla pronto permite rehabilitarla."},
      {l:"Alta sin más; mejorará",to:"end_meh",q:"meh",fb:"Puede no mejorar, y si hay osificación de la cóclea el implante coclear se complica."}]},
 end_ok:{end:true,good:true,t:"Desenlace",x:"Recibe un audífono y vuelve a la universidad. Lo aprendido: ante sospecha de meningitis bacteriana, antibiótico y dexametasona sin demora; la punción lumbar y la TC nunca deben retrasarlos (de Gans y van de Beek, 2002)."},
 end_meh:{end:true,good:false,t:"Desenlace",x:"Meses después consulta por sordera unilateral establecida. Lo aprendido: hacer audiometría tras una meningitis bacteriana."}
}}
});

Object.assign(TOURS,{
cn:{es:"Los pares craneales en el tronco",lvl:"Neuroanatomía",min:5,
 lede:"Dónde salen los nervios craneales y cómo la combinación de un par craneal afectado y una vía larga localiza la lesión en el tronco.",
 steps:[
  {t:"Por encima del tronco: I y II",x:"El olfatorio (I) y el óptico (II) no salen del tronco: son prolongaciones del propio encéfalo. La anosmia aparece pronto en el Parkinson y en los traumatismos frontales.",hl:["tr:CNII","chiasm","medialorbitofrontal"],col:"#9fd8ff",v:"inf",g:0.3,tr:true},
  {t:"Mesencéfalo: III y IV",x:"El motor ocular común (III) sale por delante, entre los pedúnculos; el troclear (IV), el único que sale por detrás y se cruza. Un aneurisma de la comunicante posterior comprime el III y dilata la pupila; la diabetes suele respetarla.",hl:["stem0","tr:CNIII","tr:CNIV"],col:"#e8c46a",v:"ant",g:0.2,tr:true,go:"stem:0"},
  {t:"Protuberancia: V, VI, VII y VIII",x:"El trigémino (V) sale por la cara lateral de la protuberancia. El motor ocular externo (VI), el facial (VII) y el vestibulococlear (VIII) salen en el surco bulboprotuberancial. La fibra del VII rodea el núcleo del VI, de modo que una lesión pontina dorsal afecta a ambos.",hl:["stem1","tr:CNV","tr:CNVII","tr:CNVIII"],col:"#e8c46a",v:"ant",g:0.2,tr:true,go:"stem:1"},
  {t:"Bulbo: IX, X, XI y XII",x:"El glosofaríngeo (IX), el vago (X) y el accesorio (XI) salen por el surco lateral del bulbo; el hipogloso (XII), por delante de la oliva. Por eso el síndrome bulbar lateral (Wallenberg) da disfagia y disfonía, y el medial, desviación de la lengua.",hl:["stem2","tr:CNX"],col:"#e8c46a",v:"ant",g:0.2,tr:true,go:"stem:2"},
  {t:"La regla de las vías largas",x:"Un par craneal de un lado con debilidad o pérdida sensitiva del otro localiza la lesión en el tronco, a la altura del par afectado: Weber (III, mesencéfalo), Millard-Gubler (VI y VII, protuberancia), Dejerine (XII, bulbo).",hl:["stem0","stem1","stem2","tr:Cortico_Spinal_Tract","tr:Medial_Lemniscus"],col:"#e2685a",v:"latL",g:0.2,tr:true}
 ]},
arteries:{es:"Territorios arteriales del cerebro",lvl:"Neurología",min:4,
 lede:"Qué irriga cada arteria y qué déficit produce su oclusión.",
 steps:[
  {t:"Cerebral media",x:"Irriga la convexidad lateral: corteza motora y sensitiva de cara y brazo, áreas del lenguaje en el hemisferio dominante, ínsula. Su oclusión produce hemiparesia y hemihipoestesia de predominio facio-braquial, afasia (izquierda) o negligencia (derecha). Es el territorio más afectado.",hl:["precentral","postcentral","caudalmiddlefrontal","rostralmiddlefrontal","parsopercularis","parstriangularis","superiortemporal","supramarginal","inferiorparietal","insula"],col:"#8ab4d8",v:"latL",g:1},
  {t:"Cerebral anterior",x:"Irriga la cara medial de los lóbulos frontal y parietal, incluida la representación de la pierna. Su oclusión produce debilidad de la pierna contralateral, incontinencia y abulia.",hl:["superiorfrontal","paracentral","precuneus","caudalanteriorcingulate","rostralanteriorcingulate","posteriorcingulate","medialorbitofrontal"],col:"#9fd8ff",v:"medL",g:1},
  {t:"Cerebral posterior",x:"Irriga el occipital, la cara inferior del temporal y buena parte del tálamo. Su oclusión produce hemianopsia homónima; si afecta al tálamo, déficit sensitivo, y en el izquierdo con el esplenio, alexia sin agrafia.",hl:["pericalcarine","cuneus","lingual","lateraloccipital","fusiform","parahippocampal","inferiortemporal","thal"],col:"#b9a0e8",v:"medL",g:1},
  {t:"Perforantes profundas",x:"Las arterias lenticuloestriadas y talamoperforantes son finas y nacen en ángulo recto de vasos grandes: sufren la lipohialinosis de la hipertensión. Producen infartos lacunares (motor puro, sensitivo puro) y las hemorragias hipertensivas de putamen y tálamo.",hl:["put","caud","pal","thal"],col:"#e2685a",v:"latL",g:0.2,go:"psy:ncd"},
  {t:"Sistema vertebrobasilar",x:"Las vertebrales y la basilar irrigan el tronco y el cerebelo. Sus oclusiones dan síndromes cruzados, vértigo, diplopía, ataxia y, en la trombosis basilar, coma o síndrome de enclaustramiento.",hl:["stem0","stem1","stem2","cb"],col:"#e8c46a",v:"post",g:0.3}
 ]},
hpa:{es:"El eje del estrés",lvl:"Psiconeuroendocrinología",min:4,
 lede:"Cómo el cerebro activa la respuesta de cortisol, cómo la frena y qué ocurre cuando el estrés se vuelve crónico.",
 steps:[
  {t:"La amígdala detecta la amenaza",x:"Ante un estrés, la amígdala activa el núcleo paraventricular del hipotálamo, que libera hormona liberadora de corticotropina (CRH).",hl:["amyg","hth"],col:"#e2685a",circ:[{color:"#e2685a",path:["d:amyg","d:hth"],mod:"hyper"}],v:"inf",g:0.3},
  {t:"Hipófisis y suprarrenales",x:"La CRH estimula en la hipófisis la liberación de ACTH, que llega a las suprarrenales y produce cortisol. El cortisol moviliza energía, frena la inflamación y prepara al cuerpo para la acción.",hl:["hth"],col:"#e2685a",circ:[{color:"#e8c46a",path:["d:hth","p:pit"],mod:"hyper"}],v:"inf",g:0.3},
  {t:"El freno: hipocampo y prefrontal",x:"El hipocampo y la prefrontal medial, ricos en receptores de glucocorticoides, detectan el cortisol y apagan el eje (retroalimentación negativa). Por eso el eje vuelve a la normalidad cuando pasa la amenaza.",hl:["hippo","medialorbitofrontal","rostralanteriorcingulate"],col:"#9fd8ff",circ:[{color:"#9fd8ff",path:["d:hippo","d:hth"],mod:"hypo"}],v:"medL",g:0.5},
  {t:"Estrés crónico",x:"Con cortisol alto mantenido, las dendritas del hipocampo y la prefrontal se retraen y las de la amígdala crecen: el freno se debilita y la alarma se refuerza. Se relaciona con la depresión, el TEPT y el deterioro de memoria del síndrome de Cushing.",hl:["hippo","medialorbitofrontal","amyg"],col:"#e2685a",v:"medL",g:0.5,go:"org:cushing"},
  {t:"En la clínica",x:"En la depresión melancólica el eje está hiperactivo y falla la supresión con dexametasona; en el TEPT se describe a menudo lo contrario, un cortisol bajo con una retroalimentación muy sensible. Ninguna de estas pruebas sirve para diagnosticar, pero ilustran que el estrés es biología.",hl:["hippo","amyg","hth","medialorbitofrontal"],col:"#e8c46a",v:"medL",g:0.5,go:"psy:mdd"}
 ]},
serotonin:{es:"La serotonina y los antidepresivos",lvl:"Psicofarmacología",min:4,
 lede:"De los núcleos del rafe a la consulta: qué hacen los antidepresivos, por qué tardan y qué efectos adversos explica su mecanismo.",
 steps:[
  {t:"Los núcleos del rafe",x:"Casi toda la serotonina del cerebro se produce en unos pocos miles de neuronas de los núcleos del rafe, en la línea media del tronco, que proyectan a prácticamente toda la corteza, el estriado, el hipocampo y la amígdala.",hl:["stem0","stem1"],col:"#9a8fd8",nt:{ht:"norm"},v:"latL",g:0.3,go:"nt:ht"},
  {t:"Bloquear el transportador",x:"Los ISRS bloquean el transportador de serotonina (SERT) y aumentan la serotonina en la sinapsis en horas. Con dosis habituales ocupan alrededor del 80% de los transportadores. En la ficha del escitalopram puedes ver la ocupación según la dosis.",hl:["stem0","stem1"],col:"#9a8fd8",nt:{ht:"hyper"},v:"latL",g:0.3,go:"drug:escitalopram"},
  {t:"Por qué tardan semanas",x:"Al principio, la serotonina extra activa los autorreceptores 5-HT1A del propio rafe, que frenan el disparo neuronal. En semanas esos autorreceptores se desensibilizan y la transmisión aumenta; además, cambian la plasticidad y el procesamiento emocional, con menos sesgo negativo en la amígdala.",hl:["stem0","amyg","medialorbitofrontal"],col:"#9a8fd8",nt:{ht:"hyper"},v:"medL",g:0.5},
  {t:"Los efectos adversos tienen anatomía",x:"Náuseas y diarrea (receptores 5-HT3 intestinales y del tronco), disfunción sexual (5-HT2 y vía medular), inquietud inicial y, raramente, acatisia; con otros serotoninérgicos, síndrome serotoninérgico. Al retirarlos de golpe, síntomas de discontinuación.",hl:["stem2","hth"],col:"#e2685a",nt:{ht:"hyper"},v:"latL",g:0.3,go:"org:serotonin"},
  {t:"Más allá de la serotonina",x:"Los duales añaden noradrenalina (venlafaxina, duloxetina), el bupropión actúa sobre dopamina y noradrenalina, la mirtazapina bloquea receptores alfa-2 y 5-HT2; la esketamina, antagonista NMDA, actúa en horas. La hipótesis monoaminérgica es una parte de la explicación, no toda.",hl:["stem0","stem1","rostralmiddlefrontal","medialorbitofrontal"],col:"#e8c46a",nt:{ht:"hyper",ne:"hyper"},v:"latL",g:0.5,go:"psy:mdd"}
 ]},
emotion:{es:"El sistema límbico y la emoción",lvl:"Neurociencia",min:4,
 lede:"Las estructuras que dan valor emocional a lo que percibimos, cómo se regulan y su papel en la depresión.",
 steps:[
  {t:"Del sistema límbico a las redes",x:"Broca habló del lóbulo límbico y Papez de un circuito de la emoción; hoy se entiende la emoción como el trabajo de varias redes que incluyen la amígdala, la ínsula, el cingulado anterior, la orbitofrontal, el hipotálamo y el estriado ventral.",hl:["amyg","insula","caudalanteriorcingulate","rostralanteriorcingulate","medialorbitofrontal","hth","accumb"],col:"#e8c46a",v:"medL",g:0.5},
  {t:"Ínsula: sentir el cuerpo",x:"La ínsula anterior integra las señales internas (latido, respiración, visceras) con el contexto, y da el sentimiento subjetivo de la emoción. Su lesión puede borrar el deseo de fumar.",hl:["insula"],col:"#e2685a",v:"latL",g:1,go:"dk:insula"},
  {t:"Cingulado anterior subgenual",x:"La porción subgenual del cingulado (área 25) está hiperactiva en la depresión y se normaliza con la respuesta al tratamiento. Fue la diana de los primeros ensayos de estimulación cerebral profunda en la depresión resistente (Mayberg y cols., 2005).",hl:["rostralanteriorcingulate","medialorbitofrontal"],col:"#e2685a",v:"medL",g:1,go:"psy:mdd"},
  {t:"Orbitofrontal: el valor",x:"La orbitofrontal actualiza el valor de las cosas según el contexto y las consecuencias. Su lesión, como en el caso de Phineas Gage o en la demencia frontotemporal, produce desinhibición y malas decisiones con la inteligencia conservada.",hl:["medialorbitofrontal","lateralorbitofrontal"],col:"#9fd8ff",v:"inf",g:1,go:"org:bvftd_org"},
  {t:"Regular la emoción",x:"La prefrontal lateral y medial reinterpretan y frenan la respuesta límbica. Esa regulación es la que entrena la psicoterapia, y su fallo atraviesa la depresión, la ansiedad, el trastorno límite y la agresión impulsiva.",hl:["rostralmiddlefrontal","medialorbitofrontal","amyg"],col:"#9fd8ff",circ:[{color:"#9fd8ff",path:["c:rostralmiddlefrontal","d:amyg"],mod:"hypo"}],v:"latL",g:0.5,go:"psy:bpd"}
 ]}
});
