/* ============ idiomas ============
   La fuente es el español. Cada idioma tiene una memoria de traducción (TM): clave = texto español normalizado
   (números -> {0},{1}…; fragmentos de un mismo párrafo unidos por ␟), valor = lista de fragmentos traducidos.
   Orden de búsqueda: paquete revisado (lang/xx.json, incrustado en la compilación) -> paquete de interfaz de este archivo ->
   traducciones automáticas guardadas en este navegador -> Claude (capacidad sample del artefacto) en lotes. */
const LANGPACKS = /*LANGPACKS*/{};
const LANGS = [
  ['es','Español','Spanish'],['en','English','English'],['fr','Français','French'],['de','Deutsch','German'],
  ['pt','Português','Portuguese (Brazil and Portugal neutral)'],['it','Italiano','Italian'],['ru','Русский','Russian'],
  ['zh','中文（简体）','Simplified Chinese'],['ja','日本語','Japanese'],['ko','한국어','Korean'],
  ['ar','العربية','Modern Standard Arabic'],['he','עברית','Hebrew'],['hi','हिन्दी','Hindi']];
const RTL = new Set(['ar','he']);
const LFONT = {zh:'Noto Sans SC',ja:'Noto Sans JP',ko:'Noto Sans KR',ar:'Noto Sans Arabic',he:'Noto Sans Hebrew',hi:'Noto Sans Devanagari'};

const UIK = ["Módulo {0} · Encéfalo","Anatomía","Patología","Simulación","Fármacos","Estudio","Cargando superficies corticales y núcleos…","Vista",
"superior","inferior","anterior","posterior","lateral izquierda","lateral derecha","medial izquierda","medial derecha",
"anterolateral izquierda","anterolateral derecha","posterolateral izquierda","posterolateral derecha",
"Arrastra para rotar · rueda o pellizco para acercar · toca una región","d de Cohen (casos − controles)","Quitar selección","Pasa el cursor por el corte",
"Izq","Der","Ant","Post","Sup","Inf","Hemisferio","Ambos","Mapa","Lóbulos","{0} regiones","{0} áreas",
"Inflar","Separar","Corteza","Corte","No","Axial","Coronal","Sagital","Estructuras","Tractos","Solo T1","Invertir",
"Núcleos","Ventrículos","Cerebelo","Tronco","Densidad relativa de la diana (PET)","baja","alta",
"Actividad o volumen relativos (esquema)","menor","sin cambio","mayor",
"Axial · z = {0} mm (MNI)","Coronal · y = {0} mm (MNI)","Sagital · x = {0} mm (MNI)","Anterior a la derecha","Izquierda del paciente a la izquierda","Fuera del encéfalo",
"Idioma","Traduciendo con Claude…","Traducción automática con Claude; puede contener errores.",
"Traducción automática no disponible aquí: el texto sin paquete se muestra en español.","Límite de uso alcanzado; inténtalo más tarde.",
"Exportar traducciones","Traducción pausada por un error; toca para reintentar.","Tracto:","Aprender"];

const UIPACK = {
en:["Module {0} · Brain","Anatomy","Pathology","Simulation","Drugs","Study","Loading cortical surfaces and nuclei…","View",
"superior","inferior","anterior","posterior","left lateral","right lateral","left medial","right medial",
"left anterolateral","right anterolateral","left posterolateral","right posterolateral",
"Drag to rotate · scroll or pinch to zoom · tap a region","Cohen's d (cases − controls)","Clear selection","Hover over the slice",
"L","R","Ant","Post","Sup","Inf","Hemisphere","Both","Map","Lobes","{0} regions","{0} areas",
"Inflate","Explode","Cortex","Slice","None","Axial","Coronal","Sagittal","Structures","Tracts","T1 only","Flip",
"Nuclei","Ventricles","Cerebellum","Brainstem","Relative target density (PET)","low","high",
"Relative activity or volume (schematic)","lower","no change","higher",
"Axial · z = {0} mm (MNI)","Coronal · y = {0} mm (MNI)","Sagittal · x = {0} mm (MNI)","Anterior to the right","Patient's left on the left","Outside the brain",
"Language","Translating with Claude…","Machine translation by Claude; may contain errors.",
"Machine translation is not available here: text without a language pack is shown in Spanish.","Usage limit reached; try again later.",
"Export translations","Translation paused by an error; tap to retry.","Tract:","Learn"],
fr:["Module {0} · Encéphale","Anatomie","Pathologie","Simulation","Médicaments","Étude","Chargement des surfaces corticales et des noyaux…","Vue",
"supérieure","inférieure","antérieure","postérieure","latérale gauche","latérale droite","médiale gauche","médiale droite",
"antérolatérale gauche","antérolatérale droite","postérolatérale gauche","postérolatérale droite",
"Faites glisser pour pivoter · molette ou pincement pour zoomer · touchez une région","d de Cohen (cas − témoins)","Effacer la sélection","Survolez la coupe",
"G","D","Ant","Post","Sup","Inf","Hémisphère","Les deux","Carte","Lobes","{0} régions","{0} aires",
"Gonfler","Écarter","Cortex","Coupe","Aucune","Axiale","Coronale","Sagittale","Structures","Faisceaux","T1 seul","Inverser",
"Noyaux","Ventricules","Cervelet","Tronc cérébral","Densité relative de la cible (TEP)","faible","élevée",
"Activité ou volume relatifs (schéma)","réduit","inchangé","accru",
"Axiale · z = {0} mm (MNI)","Coronale · y = {0} mm (MNI)","Sagittale · x = {0} mm (MNI)","Antérieur à droite","Gauche du patient à gauche","Hors de l'encéphale",
"Langue","Traduction avec Claude…","Traduction automatique par Claude ; peut contenir des erreurs.",
"Traduction automatique indisponible ici : le texte sans pack linguistique s'affiche en espagnol.","Limite d'utilisation atteinte ; réessayez plus tard.",
"Exporter les traductions","Traduction interrompue par une erreur ; touchez pour réessayer.","Faisceau :","Apprendre"],
de:["Modul {0} · Gehirn","Anatomie","Pathologie","Simulation","Medikamente","Lernen","Kortikale Oberflächen und Kerne werden geladen…","Ansicht",
"superior","inferior","anterior","posterior","lateral links","lateral rechts","medial links","medial rechts",
"anterolateral links","anterolateral rechts","posterolateral links","posterolateral rechts",
"Ziehen zum Drehen · Mausrad oder Pinch zum Zoomen · Region antippen","Cohens d (Fälle − Kontrollen)","Auswahl aufheben","Mit dem Cursor über den Schnitt fahren",
"L","R","Ant","Post","Sup","Inf","Hemisphäre","Beide","Karte","Lappen","{0} Regionen","{0} Areale",
"Aufblähen","Auseinanderziehen","Kortex","Schnitt","Keiner","Axial","Koronar","Sagittal","Strukturen","Bahnen","Nur T1","Spiegeln",
"Kerne","Ventrikel","Kleinhirn","Hirnstamm","Relative Dichte der Zielstruktur (PET)","niedrig","hoch",
"Relative Aktivität oder relatives Volumen (Schema)","geringer","unverändert","höher",
"Axial · z = {0} mm (MNI)","Koronar · y = {0} mm (MNI)","Sagittal · x = {0} mm (MNI)","Anterior rechts","Linke Patientenseite links","Außerhalb des Gehirns",
"Sprache","Übersetzung mit Claude…","Maschinelle Übersetzung durch Claude; kann Fehler enthalten.",
"Maschinelle Übersetzung ist hier nicht verfügbar: Text ohne Sprachpaket wird auf Spanisch angezeigt.","Nutzungslimit erreicht; später erneut versuchen.",
"Übersetzungen exportieren","Übersetzung wegen eines Fehlers angehalten; zum Wiederholen antippen.","Bahn:","Lernpfade"],
pt:["Módulo {0} · Encéfalo","Anatomia","Patologia","Simulação","Fármacos","Estudo","Carregando superfícies corticais e núcleos…","Vista",
"superior","inferior","anterior","posterior","lateral esquerda","lateral direita","medial esquerda","medial direita",
"anterolateral esquerda","anterolateral direita","posterolateral esquerda","posterolateral direita",
"Arraste para girar · roda ou pinça para ampliar · toque numa região","d de Cohen (casos − controles)","Limpar seleção","Passe o cursor sobre o corte",
"E","D","Ant","Post","Sup","Inf","Hemisfério","Ambos","Mapa","Lobos","{0} regiões","{0} áreas",
"Inflar","Separar","Córtex","Corte","Nenhum","Axial","Coronal","Sagital","Estruturas","Tratos","Só T1","Inverter",
"Núcleos","Ventrículos","Cerebelo","Tronco encefálico","Densidade relativa do alvo (PET)","baixa","alta",
"Atividade ou volume relativos (esquema)","menor","sem alteração","maior",
"Axial · z = {0} mm (MNI)","Coronal · y = {0} mm (MNI)","Sagital · x = {0} mm (MNI)","Anterior à direita","Esquerda do paciente à esquerda","Fora do encéfalo",
"Idioma","Traduzindo com Claude…","Tradução automática pelo Claude; pode conter erros.",
"Tradução automática indisponível aqui: o texto sem pacote é exibido em espanhol.","Limite de uso atingido; tente mais tarde.",
"Exportar traduções","Tradução pausada por um erro; toque para tentar de novo.","Trato:","Aprender"],
it:["Modulo {0} · Encefalo","Anatomia","Patologia","Simulazione","Farmaci","Studio","Caricamento delle superfici corticali e dei nuclei…","Vista",
"superiore","inferiore","anteriore","posteriore","laterale sinistra","laterale destra","mediale sinistra","mediale destra",
"anterolaterale sinistra","anterolaterale destra","posterolaterale sinistra","posterolaterale destra",
"Trascina per ruotare · rotella o pizzico per ingrandire · tocca una regione","d di Cohen (casi − controlli)","Annulla selezione","Passa il cursore sulla sezione",
"Sx","Dx","Ant","Post","Sup","Inf","Emisfero","Entrambi","Mappa","Lobi","{0} regioni","{0} aree",
"Gonfia","Separa","Corteccia","Sezione","Nessuna","Assiale","Coronale","Sagittale","Strutture","Tratti","Solo T1","Inverti",
"Nuclei","Ventricoli","Cervelletto","Tronco encefalico","Densità relativa del bersaglio (PET)","bassa","alta",
"Attività o volume relativi (schema)","minore","invariato","maggiore",
"Assiale · z = {0} mm (MNI)","Coronale · y = {0} mm (MNI)","Sagittale · x = {0} mm (MNI)","Anteriore a destra","Sinistra del paziente a sinistra","Fuori dall'encefalo",
"Lingua","Traduzione con Claude…","Traduzione automatica di Claude; può contenere errori.",
"Traduzione automatica non disponibile qui: il testo senza pacchetto è mostrato in spagnolo.","Limite di utilizzo raggiunto; riprova più tardi.",
"Esporta traduzioni","Traduzione sospesa per un errore; tocca per riprovare.","Tratto:","Imparare"],
ru:["Модуль {0} · Головной мозг","Анатомия","Патология","Моделирование","Препараты","Обучение","Загрузка поверхностей коры и ядер…","Вид",
"верхний","нижний","передний","задний","левый латеральный","правый латеральный","левый медиальный","правый медиальный",
"левый переднебоковой","правый переднебоковой","левый заднебоковой","правый заднебоковой",
"Перетащите для вращения · колесо или щипок для масштаба · коснитесь области","d Коэна (пациенты − контроль)","Снять выделение","Наведите курсор на срез",
"Л","П","Пер","Зад","Верх","Низ","Полушарие","Оба","Карта","Доли","{0} областей","{0} полей",
"Раздуть","Разнести","Кора","Срез","Нет","Аксиальный","Корональный","Сагиттальный","Структуры","Тракты","Только T1","Отразить",
"Ядра","Желудочки","Мозжечок","Ствол","Относительная плотность мишени (ПЭТ)","низкая","высокая",
"Относительная активность или объём (схема)","меньше","без изменений","больше",
"Аксиальный · z = {0} мм (MNI)","Корональный · y = {0} мм (MNI)","Сагиттальный · x = {0} мм (MNI)","Передняя сторона справа","Левая сторона пациента слева","Вне мозга",
"Язык","Перевод с помощью Claude…","Машинный перевод Claude; возможны ошибки.",
"Машинный перевод здесь недоступен: текст без языкового пакета показан на испанском.","Достигнут лимит использования; попробуйте позже.",
"Экспорт переводов","Перевод приостановлен из-за ошибки; нажмите, чтобы повторить.","Тракт:","Маршруты"],
zh:["模块 {0} · 脑","解剖","病理","模拟","药物","学习","正在加载皮层表面和核团…","视图",
"上面","下面","前面","后面","左外侧","右外侧","左内侧","右内侧","左前外侧","右前外侧","左后外侧","右后外侧",
"拖动旋转 · 滚轮或双指缩放 · 点击区域","Cohen d 值（病例 − 对照）","清除选择","将光标移到切片上",
"左","右","前","后","上","下","半球","双侧","图谱","脑叶","{0} 个区域","{0} 个分区",
"膨胀","分离","皮层","切面","无","轴位","冠状位","矢状位","结构","纤维束","仅 T1","翻转",
"核团","脑室","小脑","脑干","靶点相对密度（PET）","低","高","相对活动或体积（示意）","降低","无变化","升高",
"轴位 · z = {0} mm (MNI)","冠状位 · y = {0} mm (MNI)","矢状位 · x = {0} mm (MNI)","前方在右侧","患者左侧在左","脑外",
"语言","正在用 Claude 翻译…","由 Claude 机器翻译，可能有误。","此处无法使用机器翻译：没有语言包的文本以西班牙语显示。","已达使用上限，请稍后再试。",
"导出翻译","翻译因错误暂停，点击重试。","纤维束：","导学"],
ja:["モジュール {0} · 脳","解剖","病理","シミュレーション","薬剤","学習","皮質表面と神経核を読み込み中…","表示",
"上面","下面","前面","後面","左外側","右外側","左内側","右内側","左前外側","右前外側","左後外側","右後外側",
"ドラッグで回転 · ホイールまたはピンチで拡大 · 領域をタップ","Cohen の d（患者 − 対照）","選択を解除","断面上にカーソルを置いてください",
"左","右","前","後","上","下","半球","両側","マップ","脳葉","{0} 領域","{0} 野",
"膨張","分離","皮質","断面","なし","軸位","冠状","矢状","構造","線維束","T1 のみ","反転",
"神経核","脳室","小脳","脳幹","標的の相対密度（PET）","低","高","相対的活動または体積（模式）","低下","変化なし","上昇",
"軸位 · z = {0} mm (MNI)","冠状 · y = {0} mm (MNI)","矢状 · x = {0} mm (MNI)","右が前方","患者の左が左","脳外",
"言語","Claude で翻訳中…","Claude による機械翻訳です。誤りを含む場合があります。","ここでは機械翻訳を利用できません。言語パックのない文はスペイン語で表示されます。","利用上限に達しました。後でもう一度お試しください。",
"翻訳をエクスポート","エラーで翻訳を一時停止しました。タップして再試行。","線維束：","ガイド"],
ko:["모듈 {0} · 뇌","해부","병리","시뮬레이션","약물","학습","피질 표면과 핵을 불러오는 중…","보기",
"위쪽","아래쪽","앞쪽","뒤쪽","왼쪽 가쪽","오른쪽 가쪽","왼쪽 안쪽","오른쪽 안쪽","왼쪽 앞가쪽","오른쪽 앞가쪽","왼쪽 뒤가쪽","오른쪽 뒤가쪽",
"드래그하여 회전 · 휠 또는 핀치로 확대 · 영역을 탭하세요","Cohen의 d (환자 − 대조군)","선택 해제","단면 위에 커서를 올리세요",
"좌","우","앞","뒤","위","아래","반구","양쪽","지도","엽","{0}개 영역","{0}개 구역",
"부풀리기","분리","피질","단면","없음","축상","관상","시상","구조물","신경로","T1만","반전",
"핵","뇌실","소뇌","뇌간","표적 상대 밀도 (PET)","낮음","높음","상대적 활성 또는 부피 (모식)","감소","변화 없음","증가",
"축상 · z = {0} mm (MNI)","관상 · y = {0} mm (MNI)","시상 · x = {0} mm (MNI)","오른쪽이 앞쪽","환자의 왼쪽이 왼쪽","뇌 밖",
"언어","Claude로 번역 중…","Claude 기계 번역이며 오류가 있을 수 있습니다.","여기서는 기계 번역을 사용할 수 없습니다. 언어 팩이 없는 텍스트는 스페인어로 표시됩니다.","사용 한도에 도달했습니다. 나중에 다시 시도하세요.",
"번역 내보내기","오류로 번역이 일시 중지되었습니다. 탭하여 다시 시도하세요.","신경로:","가이드"],
ar:["الوحدة {0} · الدماغ","التشريح","علم الأمراض","المحاكاة","الأدوية","الدراسة","جارٍ تحميل أسطح القشرة والنوى…","المنظر",
"علوي","سفلي","أمامي","خلفي","وحشي أيسر","وحشي أيمن","إنسي أيسر","إنسي أيمن","أمامي وحشي أيسر","أمامي وحشي أيمن","خلفي وحشي أيسر","خلفي وحشي أيمن",
"اسحب للتدوير · العجلة أو القرص للتكبير · المس منطقة","d لكوهين (الحالات − الضوابط)","إلغاء التحديد","مرّر المؤشر فوق المقطع",
"يسار","يمين","أمام","خلف","أعلى","أسفل","نصف الكرة","كلاهما","الخريطة","الفصوص","{0} منطقة","{0} باحة",
"نفخ","فصل","القشرة","المقطع","لا شيء","محوري","إكليلي","سهمي","البنى","المسالك","T1 فقط","عكس",
"النوى","البطينات","المخيخ","جذع الدماغ","الكثافة النسبية للهدف (PET)","منخفضة","مرتفعة","النشاط أو الحجم النسبي (تخطيطي)","أقل","دون تغيير","أكبر",
"محوري · z = {0} مم (MNI)","إكليلي · y = {0} مم (MNI)","سهمي · x = {0} مم (MNI)","الأمام إلى اليمين","يسار المريض على اليسار","خارج الدماغ",
"اللغة","جارٍ الترجمة باستخدام Claude…","ترجمة آلية بواسطة Claude؛ قد تحتوي على أخطاء.","الترجمة الآلية غير متاحة هنا: يُعرض النص الذي لا توجد له حزمة لغوية بالإسبانية.","تم بلوغ حد الاستخدام؛ حاول لاحقًا.",
"تصدير الترجمات","توقفت الترجمة بسبب خطأ؛ المس لإعادة المحاولة.","المسلك:","تعلّم"],
he:["מודול {0} · מוח","אנטומיה","פתולוגיה","סימולציה","תרופות","לימוד","טוען משטחי קורטקס וגרעינים…","מבט",
"עליון","תחתון","קדמי","אחורי","צידי שמאלי","צידי ימני","מדיאלי שמאלי","מדיאלי ימני","קדמי-צידי שמאלי","קדמי-צידי ימני","אחורי-צידי שמאלי","אחורי-צידי ימני",
"גרור לסיבוב · גלגלת או צביטה להגדלה · הקש על אזור","d של כהן (מקרים − ביקורת)","נקה בחירה","העבר את הסמן מעל החתך",
"שמ׳","ימ׳","קד׳","אח׳","על׳","תח׳","המיספרה","שתיהן","מפה","אונות","{0} אזורים","{0} שדות",
"ניפוח","הפרדה","קורטקס","חתך","ללא","אקסיאלי","קורונלי","סגיטלי","מבנים","מסילות","T1 בלבד","היפוך",
"גרעינים","חדרים","מוחון","גזע המוח","צפיפות יחסית של המטרה (PET)","נמוכה","גבוהה","פעילות או נפח יחסיים (סכמטי)","פחות","ללא שינוי","יותר",
"אקסיאלי · z = {0} מ״מ (MNI)","קורונלי · y = {0} מ״מ (MNI)","סגיטלי · x = {0} מ״מ (MNI)","קדמי מימין","שמאל המטופל משמאל","מחוץ למוח",
"שפה","מתרגם עם Claude…","תרגום מכונה של Claude; עלול להכיל שגיאות.","תרגום מכונה אינו זמין כאן: טקסט ללא חבילת שפה מוצג בספרדית.","הגעת למגבלת השימוש; נסה שוב מאוחר יותר.",
"ייצוא תרגומים","התרגום הושהה בגלל שגיאה; הקש לניסיון חוזר.","מסילה:","הדרכה"],
hi:["मॉड्यूल {0} · मस्तिष्क","शरीर रचना","विकृति विज्ञान","सिमुलेशन","दवाएँ","अध्ययन","कॉर्टिकल सतहें और नाभिक लोड हो रहे हैं…","दृश्य",
"ऊपरी","निचला","अग्र","पश्च","बायाँ पार्श्व","दायाँ पार्श्व","बायाँ मध्य","दायाँ मध्य","बायाँ अग्र-पार्श्व","दायाँ अग्र-पार्श्व","बायाँ पश्च-पार्श्व","दायाँ पश्च-पार्श्व",
"घुमाने के लिए खींचें · ज़ूम के लिए व्हील या पिंच · किसी क्षेत्र पर टैप करें","कोहेन का d (रोगी − नियंत्रण)","चयन हटाएँ","कर्सर को सेक्शन पर ले जाएँ",
"बा","दा","अग्र","पश्च","ऊ","नि","गोलार्ध","दोनों","मानचित्र","पालियाँ","{0} क्षेत्र","{0} क्षेत्रक",
"फुलाएँ","अलग करें","कॉर्टेक्स","सेक्शन","कोई नहीं","अक्षीय","कोरोनल","सैजिटल","संरचनाएँ","ट्रैक्ट","केवल T1","उलटें",
"नाभिक","निलय","अनुमस्तिष्क","मस्तिष्क स्तंभ","लक्ष्य का सापेक्ष घनत्व (PET)","कम","अधिक","सापेक्ष गतिविधि या आयतन (योजनाबद्ध)","कम","कोई बदलाव नहीं","अधिक",
"अक्षीय · z = {0} mm (MNI)","कोरोनल · y = {0} mm (MNI)","सैजिटल · x = {0} mm (MNI)","आगे का भाग दाईं ओर","रोगी का बायाँ बाईं ओर","मस्तिष्क के बाहर",
"भाषा","Claude से अनुवाद हो रहा है…","Claude द्वारा मशीनी अनुवाद; इसमें त्रुटियाँ हो सकती हैं।","यहाँ मशीनी अनुवाद उपलब्ध नहीं है: बिना भाषा पैक वाला पाठ स्पेनिश में दिखाया जाता है।","उपयोग सीमा पूरी हो गई; बाद में पुनः प्रयास करें।",
"अनुवाद निर्यात करें","त्रुटि के कारण अनुवाद रुका; पुनः प्रयास के लिए टैप करें।","ट्रैक्ट:","सीखें"]
};

const I18N = (()=>{
  const SEP='␟', NUM=/[−-]?\d+(?:[.,]\d+)*/g;
  const INLINE=new Set(['B','I','EM','STRONG','SMALL','SUB','SUP','A','SPAN','ABBR','MARK','U','S','Q','CITE','TIME','BDI']);
  const SKIP='script,style,textarea,code,.refs,.ba,[data-notr],#langSel,canvas';
  const ATTRS=['placeholder','title','aria-label'];
  let lang='es', TM=null, auto={}, sample=null, sampleState='unknown', downloads=null;
  const src=new WeakMap();           // text node -> {s: español, o: aplicado}
  const asrc=new WeakMap();          // element -> {attr: {s,o}}
  const waiting=new Map();           // clave -> Set(raíces de unidad)
  const queue=[], queued=new Set(), failed=new Set();
  let inflight=0, paused=false, saveT=0, flushT=0;
  const LS=k=>'ae_tr_'+k;
  const lsGet=k=>{ try{ return JSON.parse(localStorage.getItem(LS(k))||'{}'); }catch(e){ return {}; } };
  const lsSet=(k,v)=>{ try{ localStorage.setItem(LS(k),JSON.stringify(v)); }catch(e){} };

  function norm(s){ const nums=[]; const t=s.replace(NUM,m=>{ nums.push(m); return '{'+(nums.length-1)+'}'; }); return [t,nums]; }
  function fill(t,nums){ return t.replace(/\{(\d+)\}/g,(m,i)=>nums[+i]!=null?nums[+i]:m); }
  function trivial(t){ const x=t.replace(/\{\d+\}/g,''); return !(x.match(/\p{L}+/gu)||[]).some(w=>w.length>=2&&/\p{Ll}/u.test(w)); }

  function buildTM(l){
    const tm=Object.create(null);
    const pk=UIPACK[l]; if(pk) UIK.forEach((k,i)=>{ tm[k]=[pk[i]]; });
    const rv=LANGPACKS[l]; if(rv) for(const k in rv) tm[k]=Array.isArray(rv[k])?rv[k]:[rv[k]];
    auto=lsGet(l); for(const k in auto) if(!(k in tm)) tm[k]=auto[k];
    return tm;
  }
  const isInline=el=>INLINE.has(el.tagName)||(el.tagName==='BUTTON'&&el.classList.contains('lnk'))||el.tagName==='BR';
  function unitRoot(n){ let el=n.parentElement; while(el&&isInline(el)&&el.parentElement&&el.parentElement!==document.body) el=el.parentElement; return el; }
  const skipped=el=>!el||!!el.closest(SKIP);
  function segments(root){
    const out=[]; const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT,{acceptNode(n){
      if(n.nodeType===1){ if(n===root) return NodeFilter.FILTER_SKIP; if(n.matches(SKIP)||!isInline(n)) return NodeFilter.FILTER_REJECT; return NodeFilter.FILTER_SKIP; }
      return /\S/.test(n.data)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT; }});
    for(let n;(n=w.nextNode());) out.push(n);
    return out;
  }
  function sourceOf(n){ const r=src.get(n); if(r&&n.data===r.o) return r.s; const s=n.data; src.set(n,{s,o:s}); return s; }
  function split(s){ const m=s.match(/^(\s*)([\s\S]*?)(\s*)$/); return [m[1],m[2],m[3]]; }

  function setText(n,s,t){ src.set(n,{s,o:t}); if(n.data!==t) n.data=t; }
  function processUnit(root){
    if(!root||!root.isConnected||skipped(root)) return;
    const nodes=segments(root); if(!nodes.length) return;
    const parts=nodes.map(n=>split(sourceOf(n)));
    if(lang==='es'){ nodes.forEach((n,i)=>setText(n,parts[i].join(''),parts[i].join(''))); return; }
    // normalización conjunta (numeración continua) y por fragmento
    const all=[], segN=[]; let off=0;
    for(const p of parts){ const nums=[]; const t=p[1].replace(NUM,m=>{ nums.push(m); return '{'+(off+nums.length-1)+'}'; }); off+=nums.length; all.push(...nums); segN.push(t); }
    const key=segN.join(SEP);
    let out=null;
    if(segN.every(trivial)) return restore(nodes,parts);
    if(TM[key]&&TM[key].length===nodes.length) out=TM[key].map(t=>fill(t,all));
    else { const per=parts.map(p=>{ if(trivial(norm(p[1])[0])) return p[1]; const [k,nums]=norm(p[1]); return TM[k]?fill(TM[k].join(' '),nums):null; });
      if(per.every(x=>x!=null)) out=per; }
    if(out){ nodes.forEach((n,i)=>setText(n,parts[i].join(''),parts[i][0]+out[i]+parts[i][2])); return; }
    restore(nodes,parts);
    if(failed.has(key)) return;
    if(!waiting.has(key)) waiting.set(key,new Set()); waiting.get(key).add(root);
    enqueue(key);
  }
  function restore(nodes,parts){ nodes.forEach((n,i)=>{ const s=parts[i].join(''); setText(n,s,s); }); }

  function processAttrs(el){
    if(skipped(el)) return;
    let rec=asrc.get(el); if(!rec){ rec={}; asrc.set(el,rec); }
    for(const a of ATTRS){ if(!el.hasAttribute(a)) continue; const v=el.getAttribute(a); let r=rec[a];
      if(!r||v!==r.o){ r=rec[a]={s:v,o:v}; }
      if(lang==='es'){ if(v!==r.s){ r.o=r.s; el.setAttribute(a,r.s); } continue; }
      const [k,nums]=norm(r.s.trim()); if(!k||trivial(k)) continue;
      if(TM[k]){ const t=fill(TM[k].join(' '),nums); r.o=t; if(v!==t) el.setAttribute(a,t); }
      else if(!failed.has(k)){ if(!waiting.has(k)) waiting.set(k,new Set()); waiting.get(k).add(el); enqueue(k); }
    }
  }

  let dirty=new Set(), dirtyA=new Set(), raf=0;
  function schedule(){ if(!raf) raf=requestAnimationFrame(run); }
  function run(){ raf=0; const u=dirty, a=dirtyA; dirty=new Set(); dirtyA=new Set();
    u.forEach(processUnit); a.forEach(processAttrs); obs.takeRecords(); }
  function scanTree(root){
    if(root.nodeType===3){ const r=unitRoot(root); if(r) dirty.add(r); return; }
    if(root.nodeType!==1||root.matches(SKIP)) return;
    const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT,{acceptNode(n){ if(n.nodeType===1) return n.matches(SKIP)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT; return /\S/.test(n.data)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT; }});
    let n=root; do{ if(n.nodeType===3){ const r=unitRoot(n); if(r) dirty.add(r); } else if(ATTRS.some(a=>n.hasAttribute(a))) dirtyA.add(n); } while((n=w.nextNode()));
  }
  let used=false;
  const obs=new MutationObserver(recs=>{
    if(lang==='es'&&!used) return;
    for(const r of recs){
      if(r.type==='characterData'){ const s=src.get(r.target); if(s&&r.target.data===s.o) continue; scanTree(r.target); }
      else if(r.type==='attributes'){ const rec=asrc.get(r.target), v=r.target.getAttribute(r.attributeName); if(rec&&rec[r.attributeName]&&rec[r.attributeName].o===v) continue; dirtyA.add(r.target); }
      else r.addedNodes.forEach(scanTree);
    }
    schedule();
  });

  // ---- traducción automática ----
  function enqueue(k){ if(queued.has(k)||paused||sampleState==='off') return; queued.add(k); queue.push(k); clearTimeout(flushT); flushT=setTimeout(flush,350); status(); }
  function status(msg){
    const el=document.getElementById('trStatus'); if(!el) return;
    const ex=document.getElementById('trExport');
    if(ex) ex.hidden=!(downloads&&lang!=='es'&&Object.keys(auto).length);
    if(lang==='es'){ el.hidden=true; return; }
    el.hidden=false; el.onclick=null; el.style.cursor='';
    if(msg){ el.textContent=msg; if(paused){ el.style.cursor='pointer'; el.onclick=()=>{ paused=false; rescan(); }; } return; }
    if(sampleState==='off'){ el.textContent=hasPack()?'':'Traducción automática no disponible aquí: el texto sin paquete se muestra en español.'; el.hidden=!el.textContent; return; }
    el.textContent=(inflight||queue.length)?'Traduciendo con Claude…':(Object.keys(auto).length?'Traducción automática con Claude; puede contener errores.':'');
    el.hidden=!el.textContent;
  }
  const hasPack=()=>!!LANGPACKS[lang];
  async function ensureSample(){
    if(sampleState!=='unknown') return sampleState==='on';
    if(!window.claude||!window.claude.use){ sampleState='off'; return false; }
    try{ sample=await window.claude.use('sample'); }catch(e){ sample=null; }
    sampleState=sample?'on':'off'; return !!sample;
  }
  function batches(){
    const out=[]; let cur=[], len=0;
    while(queue.length){ const k=queue[0]; const L=k.length; if(cur.length&&(len+L>3500||cur.length>=60)) break; cur.push(queue.shift()); len+=L; }
    if(cur.length) out.push(cur); return out;
  }
  async function flush(){
    if(paused||!queue.length) return status();
    if(!(await ensureSample())){ queue.length=0; queued.clear(); return status(); }
    while(inflight<2&&queue.length&&!paused){ const b=batches()[0]; if(!b) break; inflight++; translate(b).finally(()=>{ inflight--; if(queue.length) flush(); else status(); }); }
    status();
  }
  function prompt(items,l){
    const name=LANGS.find(x=>x[0]===l)[2];
    return `You are a professional medical translator for a neuroscience atlas used by medical and mental-health students.
Translate each item from Spanish into ${name}.
Each item is a JSON array of consecutive fragments of ONE text; fragments are separated only because some are bold or links. Translate the item as a whole and return the SAME number of fragments, distributing the translation so each fragment keeps the same role (a fragment that is a term or a link stays that term).
Rules: use the standard medical and neuroanatomical terminology taught in ${name}-language medical schools and the official international nonproprietary names of drugs; keep placeholders like {0} exactly; keep receptor and gene symbols (D2, 5-HT2A, ATP7B), abbreviations such as MNI, PET, PMID, DOI, ICD/CIE codes, Brodmann areas (BA6) and Latin terms unchanged; translate Spanish clinical abbreviations to their usual equivalent (e.g. TOC -> OCD in English); keep the register concise and academic; no notes or explanations.
Reply with only a JSON array with exactly ${items.length} elements, each an array of strings with the same length as its input item.
Input:
${JSON.stringify(items)}`;
  }
  async function translate(keys){
    const l=lang, items=keys.map(k=>k.split(SEP));
    const tier=keys.every(k=>k.length<80)?'quick':'default';
    try{
      const res=await sample.json(prompt(items,l),{modelTier:tier,cache:{gcTime:86400000}});
      if(l!==lang) return;
      keys.forEach((k,i)=>{ queued.delete(k); let r=Array.isArray(res)?res[i]:null; if(typeof r==='string') r=[r];
        if(!Array.isArray(r)||r.length!==items[i].length||r.some(x=>typeof x!=='string')){
          if(items[i].length>1){ items[i].forEach(seg=>{ if(!TM[seg]&&!trivial(seg)) enqueue(seg); }); waiting.get(k)&&waiting.get(k).forEach(x=>dirty.add(x)); }
          else failed.add(k); return; }
        TM[k]=r; auto[k]=r; const w=waiting.get(k); waiting.delete(k); if(w) w.forEach(x=>{ if(x.nodeType===1&&ATTRS.some(a=>x.hasAttribute(a))) dirtyA.add(x); dirty.add(x); }); });
      // las unidades segmentadas esperan sus fragmentos sueltos
      for(const [k,w] of waiting) if(k.includes(SEP)&&k.split(SEP).every(s=>TM[s]||trivial(s))){ waiting.delete(k); w.forEach(x=>dirty.add(x)); }
      schedule(); clearTimeout(saveT); saveT=setTimeout(()=>lsSet(l,auto),800);
    }catch(e){
      keys.forEach(k=>queued.delete(k));
      const c=e&&e.code;
      if(['not_granted','sampling_disabled','not_declared','capability_disabled','capability_removed'].includes(c)){ sampleState='off'; queue.length=0; queued.clear(); status(); }
      else if(c==='rate_limited'){ paused=true; queue.length=0; queued.clear(); status('Límite de uso alcanzado; inténtalo más tarde.'); }
      else if(c==='invalid_json'||c==='refused'||c==='empty_completion'||c==='prompt_too_large'){ keys.forEach(k=>failed.add(k)); status(); }
      else if(c!=='cancelled'){ paused=true; queue.length=0; queued.clear(); status('Traducción pausada por un error; toca para reintentar.'); }
    }
  }
  // nombres de todas las entidades, para que índice, listas y enlaces aparezcan traducidos de inmediato
  function prefetch(){
    if(store.get('trpre_'+lang,0)) return;
    const names=new Set();
    const add=s=>{ if(typeof s!=='string') return; const k=norm(s.trim())[0]; if(k&&!TM[k]&&!trivial(k)) names.add(k); };
    const each=(o,f)=>{ try{ Object.values(o).forEach(v=>add(v&&v[f])); }catch(e){} };
    try{ each(LOBES,'name'); each(DK,'es'); each(DEEP,'es'); each(CB,'es'); each(TRACT,'es'); each(NT,'es'); each(DISEASE,'es'); each(RARE,'es');
      each(DRUGS,'es'); each(PSY,'es'); each(ORG,'es'); Object.values(TARGET).forEach(add); Object.values(ACT).forEach(add); DRUGCLS.forEach(add); CASES.forEach(c=>add(c.es)); }catch(e){}
    if(!names.size) return;
    ensureSample().then(ok=>{ if(!ok) return; [...names].forEach(enqueue); store.set('trpre_'+lang,1); });
  }

  function rescan(){ dirty=new Set(); dirtyA=new Set(); scanTree(document.body); run(); }
  function applyFonts(l){
    const de=document.documentElement; de.lang=l; de.dir=RTL.has(l)?'rtl':'ltr';
    const f=LFONT[l];
    if(f&&!document.getElementById('font-'+l)){ const ln=document.createElement('link'); ln.id='font-'+l; ln.rel='stylesheet';
      ln.href='https://fonts.googleapis.com/css2?family='+f.replace(/ /g,'+')+':wght@400;500;600&display=swap'; document.head.appendChild(ln); }
    const add=f?`"${f}",`:'';
    de.style.setProperty('--display',`"Spectral",${add}Georgia,"Times New Roman",serif`);
    de.style.setProperty('--body',`"IBM Plex Sans",${add}system-ui,-apple-system,"Segoe UI",sans-serif`);
    de.style.setProperty('--mono',`"IBM Plex Mono",${add}ui-monospace,"SFMono-Regular",Menlo,monospace`);
  }
  function setLang(l){
    if(!LANGS.some(x=>x[0]===l)) l='es';
    lang=l; store.set('lang',l); if(l!=='es') used=true; TM=buildTM(l); waiting.clear(); queue.length=0; queued.clear(); failed.clear(); paused=false;
    applyFonts(l); const sel=document.getElementById('langSel'); if(sel) sel.value=l;
    rescan(); status(); if(l!=='es') prefetch();
  }
  async function exportTM(){
    if(!downloads) return;
    const data={}; Object.keys(auto).sort().forEach(k=>{ data[k]=auto[k]; });
    try{ await downloads.save({filename:`atlas-encephali-${lang}.json`,data:JSON.stringify(data,null,1)}); }catch(e){}
  }
  function init(){
    const sel=document.getElementById('langSel');
    if(sel){ sel.innerHTML=LANGS.map(([c,n])=>`<option value="${c}" lang="${c}">${n}</option>`).join(''); sel.onchange=()=>setLang(sel.value); }
    const ex=document.getElementById('trExport'); if(ex) ex.onclick=exportTM;
    obs.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:ATTRS});
    setLang(store.get('lang','es'));
    if(window.claude&&window.claude.use) window.claude.use('downloads').then(d=>{ downloads=d; status(); }).catch(()=>{});
  }
  return {init,setLang,get lang(){return lang;},tm:()=>TM};
})();
I18N.init();
