import { useState, useMemo, useRef, useEffect } from "react";

const TIPOS_CUPO = [
  { codigo: "PT", descripcion: "PUNCION TIROIDEA", tipologia: "NUEVO" },
  { codigo: "IN", descripcion: "CONTROL INTERNO", tipologia: "CONTROL" },
  { codigo: "NP", descripcion: "NO PROGRAMADO", tipologia: "NUEVO" },
  { codigo: "OP", descripcion: "PASE OPERATORIO", tipologia: "NUEVO" },
  { codigo: "AL", descripcion: "POST ALTA", tipologia: "CONTROL" },
  { codigo: "P", descripcion: "PROCEDIMIENTO", tipologia: "NUEVO" },
  { codigo: "R", descripcion: "RECETA", tipologia: "RECETA" },
  { codigo: "T", descripcion: "TRATAMIENTO (N)", tipologia: "NUEVO" },
  { codigo: "DE", descripcion: "PIEZA ANTERIOR", tipologia: "NUEVO" },
  { codigo: "PN", descripcion: "PLAN 90 DIAS NUEVO", tipologia: "NUEVO" },
  { codigo: "AO", descripcion: "ANTERO POSTERIOR", tipologia: "NUEVO" },
  { codigo: "OA", descripcion: "OPERATORIA", tipologia: "NUEVO" },
  { codigo: "RR", descripcion: "RECETA", tipologia: "RECETA" },
  { codigo: "LH", descripcion: "LINFOMA DE HODGKING", tipologia: "CONTROL" },
  { codigo: "PV", descripcion: "PREVENTIVAS", tipologia: "NUEVO" },
  { codigo: "PD", descripcion: "PIE DIABETICO", tipologia: "NUEVO" },
  { codigo: "UC", descripcion: "UCRI", tipologia: "NUEVO" },
  { codigo: "RE", descripcion: "REPOSICIONES", tipologia: "NUEVO" },
  { codigo: "TR", descripcion: "TRANSPLANTES", tipologia: "NUEVO" },
  { codigo: "FU", descripcion: "FUNCIONARIOS", tipologia: "NUEVO" },
  { codigo: "PA", descripcion: "PARKINSON", tipologia: "NUEVO" },
  { codigo: "LM", descripcion: "LEUCEMIA METODICA CRONICA", tipologia: "CONTROL" },
  { codigo: "N", descripcion: "NUEVO", tipologia: "NUEVO" },
  { codigo: "C", descripcion: "CONTROL", tipologia: "CONTROL" },
  { codigo: "AC", descripcion: "AUTORIZADO CUADERNO", tipologia: "CONTROL" },
  { codigo: "PS", descripcion: "PRIVACION DE SUEÑO", tipologia: "NUEVO" },
  { codigo: "CI", descripcion: "CIRUGIA MENOR", tipologia: "NUEVO" },
  { codigo: "MM", descripcion: "MELANOMA LULTIPLE", tipologia: "CONTROL" },
  { codigo: "OD", descripcion: "OXIGENO DEPENDENCIA", tipologia: "CONTROL" },
  { codigo: "HM", descripcion: "HEMOFILIA", tipologia: "CONTROL" },
  { codigo: "AP", descripcion: "APS", tipologia: "NUEVO" },
  { codigo: "H", descripcion: "HOSPITALIZADO", tipologia: "NUEVO" },
  { codigo: "U", descripcion: "URGENCIA", tipologia: "NUEVO" },
  { codigo: "LL", descripcion: "LEUCEMIA LINFATICA CRONIC", tipologia: "CONTROL" },
  { codigo: "AT", descripcion: "ARTRITIS", tipologia: "CONTROL" },
  { codigo: "PB", descripcion: "PABELLON", tipologia: "CONTROL" },
  { codigo: "PR", descripcion: "PRAIS", tipologia: "NUEVO" },
  { codigo: "HI", descripcion: "HIPERTENCION", tipologia: "NUEVO" },
  { codigo: "CA", descripcion: "CONTROL AUGE", tipologia: "CONTROL" },
  { codigo: "LV", descripcion: "LABORATORIO DE VOZ", tipologia: "NUEVO" },
  { codigo: "A", descripcion: "AUGE", tipologia: "NUEVO" },
  { codigo: "PM", descripcion: "PREMATURO", tipologia: "CONTROL" },
  { codigo: "IA", descripcion: "INFARTADO AUGE", tipologia: "CONTROL" },
  { codigo: "AV", descripcion: "ACCIDENTE VASCULAR ENCEFA", tipologia: "CONTROL" },
  { codigo: "NI", descripcion: "NIÑOS", tipologia: "NUEVO" },
  { codigo: "AD", descripcion: "ADULTO", tipologia: "NUEVO" },
  { codigo: "LN", descripcion: "LINFOME NO HODGKING", tipologia: "CONTROL" },
  { codigo: "TA", descripcion: "TRATAMIENTO ANTICOAGULANT", tipologia: "CONTROL" },
  { codigo: "EF", descripcion: "ENFERMEDADES DEL TEJIDO", tipologia: "CONTROL" },
  { codigo: "SI", descripcion: "SIDA", tipologia: "CONTROL" },
  { codigo: "TB", descripcion: "TUBERCULOSIS", tipologia: "NUEVO" },
  { codigo: "HE", descripcion: "HEMODINAMIA", tipologia: "CONTROL" },
  { codigo: "MO", descripcion: "MOLAR", tipologia: "NUEVO" },
  { codigo: "PE", descripcion: "PREMOLAR", tipologia: "NUEVO" },
  { codigo: "OR", descripcion: "OFTALMOLOGIA RETINA", tipologia: "NUEVO" },
  { codigo: "LA", descripcion: "LASER", tipologia: "NUEVO" },
  { codigo: "CS", descripcion: "CISTOSCOPIA", tipologia: "NUEVO" },
  { codigo: "BI", descripcion: "BIOPSIA", tipologia: "NUEVO" },
  { codigo: "BE", descripcion: "BECADOS", tipologia: "CONTROL" },
  { codigo: "RU", descripcion: "CONTROLES DE URGENCIA", tipologia: "CONTROL" },
  { codigo: "PG", descripcion: "PROG-500 CONTROLES", tipologia: "CONTROL" },
  { codigo: "P5", descripcion: "PROG-500 NUEVO", tipologia: "NUEVO" },
  { codigo: "L8", descripcion: "LINEA 800", tipologia: "NUEVO" },
  { codigo: "QU", descripcion: "QUEMADOS", tipologia: "NUEVO" },
  { codigo: "CL", descripcion: "COLONSCOPIA LARGA", tipologia: "NUEVO" },
  { codigo: "CC", descripcion: "COLONSCOPIA CORTA", tipologia: "NUEVO" },
  { codigo: "PL", descripcion: "POLIPECTOMIA", tipologia: "NUEVO" },
  { codigo: "RL", descripcion: "RECTOLIGADURA", tipologia: "NUEVO" },
  { codigo: "DO", descripcion: "DOPLER", tipologia: "NUEVO" },
  { codigo: "EC", descripcion: "ECO DUPLEX CAROTIDEO", tipologia: "NUEVO" },
  { codigo: "ED", descripcion: "ECO DUPLEX EXTREMIDADES", tipologia: "NUEVO" },
  { codigo: "ER", descripcion: "ECO ARTERIAL RENAL", tipologia: "NUEVO" },
  { codigo: "VP", descripcion: "PVR", tipologia: "NUEVO" },
  { codigo: "TE", descripcion: "TEST DE ESFUERZO VASCULAR", tipologia: "NUEVO" },
  { codigo: "ZZ", descripcion: "OTRO", tipologia: "NUEVO" },
  { codigo: "RX", descripcion: "RX GENERAL", tipologia: "NUEVO" },
  { codigo: "RI", descripcion: "RX IRA", tipologia: "NUEVO" },
  { codigo: "RA", descripcion: "RX ERA", tipologia: "NUEVO" },
  { codigo: "RH", descripcion: "RX HOSPITALIZADO", tipologia: "NUEVO" },
  { codigo: "RT", descripcion: "RX TRAUMA", tipologia: "NUEVO" },
  { codigo: "RG", descripcion: "RX URGENCIA", tipologia: "NUEVO" },
  { codigo: "PO", descripcion: "PRIORIZADO <5 Y >65", tipologia: "NUEVO" },
  { codigo: "ES", descripcion: "ESPIROMETRIA", tipologia: "NUEVO" },
  { codigo: "ME", descripcion: "METACOLINA", tipologia: "NUEVO" },
  { codigo: "TC", descripcion: "TEST DE CAMINATA", tipologia: "NUEVO" },
  { codigo: "FP", descripcion: "FUNCION PULMONAR", tipologia: "NUEVO" },
  { codigo: "GA", descripcion: "GASES ARTERIALES", tipologia: "NUEVO" },
  { codigo: "PI", descripcion: "PEDIATRIA", tipologia: "NUEVO" },
  { codigo: "OC", descripcion: "ONCO AUGE CDT", tipologia: "NUEVO" },
  { codigo: "PZ", descripcion: "PENSIONADO", tipologia: "NUEVO" },
  { codigo: "CN", descripcion: "CIRUGIA INFANTIL", tipologia: "NUEVO" },
  { codigo: "MD", descripcion: "MEDICINA", tipologia: "NUEVO" },
  { codigo: "CR", descripcion: "CIRUGIA", tipologia: "NUEVO" },
  { codigo: "OG", descripcion: "ONCO GINE CDT", tipologia: "NUEVO" },
  { codigo: "OE", descripcion: "ONCO GINE", tipologia: "NUEVO" },
  { codigo: "UR", descripcion: "UROLOGIA", tipologia: "NUEVO" },
  { codigo: "BR", descripcion: "BRONCOPULMONAR INF", tipologia: "NUEVO" },
  { codigo: "PQ", descripcion: "PSIQUIATRIA POLI", tipologia: "NUEVO" },
  { codigo: "MX", descripcion: "MAXILOFACIAL", tipologia: "NUEVO" },
  { codigo: "PU", descripcion: "PARTICULAR", tipologia: "NUEVO" },
  { codigo: "GC", descripcion: "GASTRO CDT", tipologia: "NUEVO" },
  { codigo: "NU", descripcion: "NEUROCIRUGIA", tipologia: "NUEVO" },
  { codigo: "VI", descripcion: "VISITA", tipologia: "NUEVO" },
  { codigo: "FN", descripcion: "FUNCIONARIOS", tipologia: "CONTROL" },
  { codigo: "UE", descripcion: "URGENCIA DENTAL", tipologia: "NUEVO" },
  { codigo: "PC", descripcion: "PLAN 90 DIAS CONTROLES", tipologia: "CONTROL" },
  { codigo: "PH", descripcion: "PSIQUIATRIA HOSPITAL", tipologia: "NUEVO" },
  { codigo: "TI", descripcion: "TRAUMATOLOGIA", tipologia: "NUEVO" },
  { codigo: "OO", descripcion: "OTORRINO OFTALMOLOGIA", tipologia: "NUEVO" },
  { codigo: "CU", descripcion: "CURACION", tipologia: "NUEVO" },
  { codigo: "CT", descripcion: "CATEGORIZACION", tipologia: "NUEVO" },
  { codigo: "GL", descripcion: "GLAUCOMA", tipologia: "NUEVO" },
  { codigo: "AU", descripcion: "AUDIOPHONE-C", tipologia: "CONTROL" },
  { codigo: "RY", descripcion: "TEST DE RAYNAUD", tipologia: "CONTROL" },
  { codigo: "OT", descripcion: "TEST DE OPERCULO TORAXICO", tipologia: "CONTROL" },
  { codigo: "R3", descripcion: "LEY R. SOTO-N", tipologia: "NUEVO" },
  { codigo: "NX", descripcion: "N.LEQX", tipologia: "NUEVO" },
  { codigo: "B1", descripcion: "CBCT - PROCEDIMIENTOS", tipologia: "NUEVO" },
  { codigo: "FR", descripcion: "FINANCIAMIENTO RELE", tipologia: "NUEVO" },
  { codigo: "CP", descripcion: "PERITAJE CONTROL", tipologia: "CONTROL" },
  { codigo: "PJ", descripcion: "PERITAJE NUEVO", tipologia: "NUEVO" },
  { codigo: "TT", descripcion: "TRATAMIENTO (C)", tipologia: "CONTROL" },
  { codigo: "P1", descripcion: "PLETISMOGRAFIA DIGITAL", tipologia: "NUEVO" },
  { codigo: "CQ", descripcion: "CONSULTAS LEQ", tipologia: "CONTROL" },
  { codigo: "CZ", descripcion: "CLOZAPINA", tipologia: "CONTROL" },
  { codigo: "EX", descripcion: "EXAMENES DE LABORATORIO", tipologia: "NUEVO" },
  { codigo: "UT", descripcion: "URGENCIA OFTALMOLOGICA, N", tipologia: "NUEVO" },
  { codigo: "N1", descripcion: "NANEAS CONTROL", tipologia: "CONTROL" },
  { codigo: "B5", descripcion: "RX PANO O TELE RX - PROC", tipologia: "NUEVO" },
  { codigo: "B7", descripcion: "CBCT ORTODONCIA", tipologia: "NUEVO" },
  { codigo: "B8", descripcion: "ESTUDIO ORTODONCIA", tipologia: "NUEVO" },
  { codigo: "B9", descripcion: "TAD ORTODONCIA", tipologia: "NUEVO" },
  { codigo: "EP", descripcion: "EPOF", tipologia: "CONTROL" },
  { codigo: "PX", descripcion: "POST OPERATORIO", tipologia: "CONTROL" },
  { codigo: "AA", descripcion: "ACCIDENTE TRANSITO", tipologia: "NUEVO" },
  { codigo: "EO", descripcion: "EMISIONES OTOACUSTICAS", tipologia: "NUEVO" },
  { codigo: "R2", descripcion: "RNLE", tipologia: "CONTROL" },
  { codigo: "R1", descripcion: "RNLE", tipologia: "NUEVO" },
  { codigo: "R4", descripcion: "LEY R. SOTO-C", tipologia: "CONTROL" },
  { codigo: "CX", descripcion: "C.LEQX", tipologia: "CONTROL" },
  { codigo: "CG", descripcion: "COMGES", tipologia: "NUEVO" },
  { codigo: "B2", descripcion: "CBCT ATM - PROCEDIMIENTO", tipologia: "NUEVO" },
  { codigo: "B3", descripcion: "CBCT IMPLANTE - PROCED", tipologia: "NUEVO" },
  { codigo: "B6", descripcion: "RX PANO S/INFORME - PROC", tipologia: "NUEVO" },
  { codigo: "IF", descripcion: "INFORME", tipologia: "NUEVO" },
  { codigo: "P7", descripcion: "PERCENTIL 75", tipologia: "NUEVO" },
  { codigo: "E9", descripcion: "ECO OCULAR", tipologia: "NUEVO" },
  { codigo: "UP", descripcion: "PREQUIRURGICO", tipologia: "CONTROL" },
  { codigo: "D1", descripcion: "DM1 PREGESTACIONAL", tipologia: "NUEVO" },
  { codigo: "ND", descripcion: "NUEVO DOCENCIA", tipologia: "NUEVO" },
  { codigo: "MI", descripcion: "PROG-33000-N", tipologia: "NUEVO" },
  { codigo: "MC", descripcion: "PROG-33000-C", tipologia: "CONTROL" },
  { codigo: "PP", descripcion: "PROCEDIMIENTO CONTROL", tipologia: "CONTROL" },
  { codigo: "IO", descripcion: "CRIOTERAPIA", tipologia: "CONTROL" },
  { codigo: "T1", descripcion: "TELE DERMATOLOGIA CONTROL", tipologia: "CONTROL" },
  { codigo: "T2", descripcion: "TELE DERMATOLOGIA NUEVO", tipologia: "NUEVO" },
  { codigo: "TG", descripcion: "TTGO", tipologia: "NUEVO" },
  { codigo: "MA", descripcion: "MODECATE", tipologia: "CONTROL" },
  { codigo: "UO", descripcion: "URGENCIA OFTALMOLOGICA, C", tipologia: "CONTROL" },
  { codigo: "N2", descripcion: "NANEAS NUEVO", tipologia: "NUEVO" },
  { codigo: "B4", descripcion: "CBCT UNITARIO - PROCED", tipologia: "NUEVO" },
  { codigo: "AN", descripcion: "POST ALTA NUEVO", tipologia: "NUEVO" },
  { codigo: "CB", descripcion: "CONTROL ABREVIADO", tipologia: "CONTROL" },
  { codigo: "PY", descripcion: "PERITONEODIALISIS", tipologia: "CONTROL" },
  { codigo: "BB", descripcion: "BOMBA DE INSULINA", tipologia: "CONTROL" }
];

const PROFESIONALES = new Map([
["99","REEMPLAZANTE. ."],
["2222","ISABEL DEL TRANSITOGARRIDO CASTRO"],
["3521","FABIOLAHELBIG SOTO"],
["3124","VIKY SUSANMUÑOZ JAUREGUI"],
["4131","NICOL BEATRIZABACA CANDIA"],
["1582","YESSICAABACA FAUNDEZ"],
["6248","FRANCISCO NICOLASABACA JIMENEZ"],
["1268","TERESA DEL CARMENABACA ROMAN"],
["5333","RAMON FRANCISCOABARCA CARDENAS"],
["906","PAMELA ANDREAABARZA CANCINO"],
["3581","CINTYA LEONORABARZA ORMEÑO"],
["5037","CARMENABARZA SAN MARTIN"],
["5460","DANICSAABARZA VILLAGRA"],
["6276","AYLINNEABARZUA URRUTIA"],
["6407","NESTORABARZUA AVILES"],
["4949","JAIME ISRAEL ESTEBANABARZUA VALDES"],
["5438","JUAN CARLOSABDALA GOMEZ"],
["3892","CLAUDIAABELLO ESPINOZA"],
["5481","KATHERINE ELIZABETHABREU CORONADO"],
["2181","SANTINA ISABELABREU CORONADO"],
["3367","GERARDO ANTONIOABREU MARTINEZ"],
["5503","CATALINA ALEJANDRAABRIGA VILLA"],
["4319","CRISTOFERABRIGO FUENTEZ"],
["3655","CAROLINAABRIGO CHAVARRIA"],
["397","MAGDALENA SOLANGABURTO INOSTROZA"],
["3235","VALENTINAABURTO VALDIVIA"],
["3224","JUANITA DANIELAABURTO VALENZUELA"],
["3498","NANCY DE LAS MERCEDEABURTO MOYA"],
["2129","BEATRIZ DEL CARMENACEVEDO DIAZ"],
["724","FELIPE ORLANDOACEVEDO ALARCON"],
["2816","YASNA NICOLEACEVEDO ALARCON"],
["3587","NATALIA ANDREAACEVEDO CAMPOS"],
["6578","BARBARA PAOLAACEVEDO CASTILLO"],
["4850","PAULINAACEVEDO CIFUENTES"],
["672","CAROLINA VIVIANAACEVEDO CORDERO"],
["1441","ANTONIAACEVEDO CORIA"],
["4544","BARBARA DARINKAACEVEDO DOTE"],
["1084","CAROLINA ISABELACEVEDO GAETE"],
["732","ERIK ALFREDOACEVEDO GARRIDO"],
["1066","MARCELAACEVEDO GOMEZ"],
["6197","JAYRENNE MILENKAACEVEDO GONZALEZ"],
["1623","PAMELAACEVEDO GUERRERO"],
["4235","PRISCILAACEVEDO HENRIQUEZ"],
["6593","FERNANDAACEVEDO NEIRA"],
["3082","NICOLAS JAVIERACEVEDO OJEDA"],
["5629","FELIPEACEVEDO ORELLANA"],
["5777","DANIELA BELENACEVEDO PAVEZ"],
["2625","CESAR HERNANACEVEDO PEREIRA"],
["5948","PAOLA CAROLINAACEVEDO TALARN"],
["5283","LUCÍAACEVEDO VALENZUELA"],
["6668","FERNANDAACEVEDO AGUILAR"],
["6726","BELENACEVEDO BRAVO"],
["760","ROSE MARYACEVEDO CAMPOS"],
["5725","KERENACEVEDO CONTRERAS"],
["3831","OSVALDO ENRIQUEACEVEDO GUTIERREZ"],
["4597","ROSA ESTERACEVEDO LARA"],
["5921","CONSTANZA PAOLAACEVEDO LASTRA"],
["6329","MILLARAY ANDREAACEVEDO MORALES"],
["6194","CONSTANZAACEVEDO VALENZUELA"],
["5073","DANIELACHOCALLA DEL CAMPO"],
["1697","JOSEACHOCALLA TARQUI"],
["1032","MARCELAACHU NUÑEZ"],
["475","PAULINA ALEJANDRAACHU NUÑEZ"],
["1049","PAULINA ALEJANDRAACHU NUNEZ"],
["2614","CAROLINA AYLEENACOSTA ARAYA"],
["2639","KARELLYS ESTHERACOSTA REYES"],
["2488","LORENZA SANTAMARIAACOSTA ROMERO"],
["6585","LORENZAACOSTA ROMERO"],
["1577","RODRIGUEZACUÑA ALEJANDRA PAOLA"],
["6161","DIEGO PABLOACUÑA CAROCA"],
["1953","MARIA JOSEACUÑA CONTRERAS"],
["1285","NICOLAS PATRICIOACUÑA FUENTES"],
["2932","YASNA NICOLEACUÑA HERNÁNDEZ"],
["1922","MARIA PAZ ALEJANDRAACUÑA ORELLANA"],
["3140","MARIANETTE DEL CARMEACUÑA QUINTANA"],
["4532","MAGDALENA CAROLINAACUÑA VALDERAS"],
["3592","GUILLERMO ALEJANDROACUÑA GONZALEZ"],
["3919","FREDDY ALVAROACUÑA YAÑEZ"],
["950","ANDRES ANTONIOACUNA CARRASCO"],
["581","BERNARDITAADASME ALBUQUERQUE"],
["2928","MYRIAM DEL CARMENADASME APAZ"],
["5596","CLAUDIA ANDREAADASME MORALES"],
["5808","MARIA IGNACIAADASME VALENZUELA"],
["5168","CAMILA FERNANDAADAZME CORNEJO"],
["731","USUARIOADMINISTRADOR SISMAULE"],
["681","RUTHADONIS ROJAS"],
["5437","JANDYADONIS ROJAS"],
["4477","DULCEADRIAN ALFONZO"],
["112","FRANCISCA PILARADRIAZOLA DIAZ"],
["19","HUESOSADULTO ."],
["2293","NICOLE GABRIELAAEDO AEDO"],
["4428","RAFAELA HERODITAAEDO ALARCON"],
["2714","ANTONIETA PAULINAAEDO FAUNDEZ"],
["744","HUMBERTO JOSEAÑEZ VALDEZ"],
["280","JUAN OSVALDOAFONSO RODRIGUEZ"],
["467","FRANK ANTHONYAGNESE GONZALEZ"],
["1614","FRANKAGNESE GONZÁLEZ"],
["2847","CARLA STEPHANIEAGUAYO ESPINOZA"],
["4900","FABIANAGUAYO ROJAS"],
["2878","NATALY FRANCISCAAGUILA BUSTAMANTE"],
["2130","BARBARA JAVIERAAGUILA NUNEZ"],
["5764","JAVIER IGNACIOAGUILA VERA"],
["6681","FELIPE IGNACIOAGUILA BARRERA"],
["1095","DIEGO ALBERTOAGUILA BUSTAMANTE"],
["6081","JAVIERAAGUILA CRISTI"],
["4057","JUAN MAURICIOAGUILAR AGUILAR"],
["2438","ARNEDIS MARIAAGUILAR DE HERRERA"],
["5713","DANIELA ADRIANAAGUILAR GÓMEZ"],
["5528","BLANCAAGUILAR MANRIQUEZ"],
["1501","GUILLERMO LEONARDOAGUILAR NORAMBUENA"],
["1801","JOSEAGUILAR QUEZADA"],
["5543","YISELL ANDREAAGUILAR RAMIREZ"],
["4563","PAULAAGUILAR ROJAS"],
["1093","VERONICA DEL PILARAGUILAR SAAVEDRA"],
["2736","MARCELO ANDRESAGUILAR VASQUEZ"],
["7124","ENZOAGUILAR VIDAL"],
["1597","ANGELICA VIVIANAAGUILAR ARAVENA"],
["962","GIANINE ESTHEFANIAGUILAR CONTRERAS"],
["6298","FRANCISCAAGUILAR MUÑOZ"],
["3311","GUILLERMO LEONARDOAGUILAR NORAMBUENA"],
["2461","HILDA ALEJANDRAAGUILAR VASQUEZ"],
["5143","ORIANAAGUILAR MUÑOZ"],
["1706","MARIA ALEJANDRAAGUILERA APONTE"],
["1264","DANIEL IGNACIOAGUILERA AVALOS"],
["458","JUAN PABLOAGUILERA BAEZA"],
["5422","FRANCISCAAGUILERA CAMPOS"],
["70","LEONARDOAGUILERA CASTILLO"],
["140","JULIA ISABELAGUILERA MUNOZ"],
["6781","ISIDORAAGUILERA OROSTICA"],
["951","JUAN CARLOSAGUILERA VEGA"],
["6785","NATHALY FRANCISCAAGUILERA AGUILERA"],
["4933","JANZAGUILERA MÉNDEZ"],
["3057","FRANCISCO JAVIERAGUIRRE CABELLO"],
["3188","VILMAAGUIRRE FLORES"],
["6141","MAGDALENAAGURTO BASCUÑAN"],
["1927","GLADYS ALEJANDRAAGURTO GALVEZ"],
["356","DOMINIQUE ANTONIETAAGURTO GUTIERREZ"],
["861","JOSEAGURTO MONDACA"],
["5950","MARIA LUISAAGURTO PEÑAILILLO"],
["2001","XIMENAAGURTO VARGAS"],
["2246","VANESSA VERONICAAHUMADA FARIAS"],
["3945","DANIELAAHUMADA CATALÁN"],
["5436","JAVIERA ESTEFANIAAHUMADA CLAUVELART"],
["3458","ENZO OSVALDOAHUMADA DIAZ"],
["3914","MARIA JESÚSAINARDI RUIZ-TAGLE"],
["5448","FELIPEALARCÓN FERNÁNDEZ"],
["5313","MAURICIO IGNACIOALARCÓN MARTÍNEZ"],
["5022","LLAIRAALARCÓN SEGURA"],
["3730","SOFHIAALARCÓN DÌAZ"],
["4369","CAROLINA ANDREAALARCON ABACA"],
["793","PATRICIOALARCON ACEVEDO"],
["3371","FERNANDA DANIELAALARCON ALBORNOZ"],
["2748","PABLO IGNACIOALARCON ARIAS"],
["219","VICTORIA DANIELAALARCON BEROIZA"],
["1352","LISSETTE MAXIMILIANAALARCON CORTINEZ"],
["4628","KONI ALLISONALARCON GONZALEZ"],
["5847","CONSTANZA MILAGROALARCON HERNANDEZ"],
["4748","FRANCISCO FERNANDOALARCON JENO"],
["2893","NINOSKA ALEJANDRAALARCON LOBOS"],
["192","SANDY CARLINAALARCON MENDEZ"],
["743","DANIEL ENRIQUEALARCON MONTECINO"],
["2952","FRANCISCA INESALARCON MUNOZ"],
["3696","MARLENYALARCON PARRA"],
["3959","PAOLAALARCON RETAMAL"],
["6466","LUISALARCON REYES"],
["4353","CARLAALARCON SEPULVEDA"],
["5890","VALENTINA JACQUELINEALARCON URRA"],
["3943","PIA CATALINAALARCON ALBORNOZ"],
["4700","LESLEYALARCON CRESPO"],
["3970","CLAUDIAALARCON FLORES"],
["3598","CONSUELO ANTONIETAALARCON MUNOZ"],
["2996","DENISSE ALEJANDRAALARCON MUÑOZ"],
["5850","JOSE MIGUELALARCON SEPULVEDA"],
["6514","MILLARAYALARCON SOLIS"],
["3827","MARIA LUISAALAS PEREZ"],
["5432","WALTER ALANALAVAREZ SEPULVEDA"],
["1519","CARLA RUTHALBA PAREJA"],
["604","OLGAALBORNOZ ACEVEDO"],
["5548","RAQUELALBORNOZ BERMEDO"],
["2561","CAMILA ALEJANDRAALBORNOZ CIFUENTES"],
["3451","DANIELA PAZALBORNOZ ENCINA"],
["5592","NATALIAALBORNOZ GARRIDO"],
["8287","CLAUDIA ROCIOALBORNOZ GARRIDO"],
["1548","CECILIAALBORNOZ GUZMAN"],
["1502","ALICIA DEL CARMENALBORNOZ HERRERA"],
["1815","NICOLAS ANDRESALBORNOZ JORQUERA"],
["2806","LAURA SUSANAALBORNOZ MUENA"],
["4592","LUIS EDUARDOALBORNOZ ORELLANA"],
["1977","CONSTANZAALBORNOZ PARRA"],
["4569","NINOSHKAALBORNOZ PIZARRO"],
["777","CRISTIANALBORNOZ ROA"],
["6303","GONZALO PATRICIOALBORNOZ ROJAS"],
["3435","FRANCISCAALBORNOZ ULLOA"],
["3088","FERNANDO NICOLASALBORNOZ VARAS"],
["3596","ROSSANA LAS MERCEDESALBORNOZ ARENAS"],
["5660","EDUARDO NICOLASALBORNOZ CANCINO"],
["6368","CATALINA ANGELICAALBORNOZ CIFUENTES"],
["4032","EDITHALBORNOZ MORALES"],
["3543","CRISTIAN ANDRESALBORNOZ MORALES"],
["755","MARIA PIAALBORNOZ ULLOA"],
["7076","MARLENEALBURQUENQUE HERRERA"],
["5256","MAXIMILIANOALBURQUENQUE LÓPEZ"],
["5697","JAIMEALCAINO CAMPOS"],
["5152","CAROLINA ALEJANDRAALCAINO JAQUE"],
["2824","MARIA JOSEALCAINO PEREZ"],
["6607","JAVIER EDUARDOALCAINO RODRIGUEZ"],
["522","FELIPE ALBERTOALCALDE GUDENSCHWAGER"],
["4870","TAMARAALCANTARA VALDES"],
["953","BLANCA VERONICAALCANTARA SAAVEDRA"],
["632","VIVIAN SOLEDADALCOTA ALCOTA"],
["169","JOSADEC ELIUALCOTA VEGA"],
["651","MARIA ANTONIETAALDANA BERRIOS"],
["2506","MARIAALDANA MOLINA"],
["4941","ESTEFANY ALEJANDRAALDANA PICART"],
["5266","PAULINAALDANA PULGAR"],
["2386","CLAUDIA ANDREAALDANA URIBE"],
["4944","JAVIERA JOSÉALEGRÍA ARCOS"],
["1080","MIGUEL ANGELALEGRIA AEDO"],
["1800","DENISSE CAROLINAALEGRIA BARRIOS"],
["4400","GLORIA VIVIANAALEGRIA NAVARRO"],
["3660","CONSTANZA ARACELYALEGRIA VALENZUELA"],
["4886","ALFREDO NICOLAS ENRIALFARO CARVAJAL"],
["1834","ORLANDOALFARO HURTADO"],
["4484","NICOLE ELIZABETHALFARO LARAMA"],
["6661","RODRIGO ARTUROALFARO MARTINEZ"],
["6442","CLAUDIO FERNANDOALFARO PARADA"],
["1143","MABYALFARO PONCE"],
["6177","JOSE LUISALFARO GUTIERREZ"],
["597","ERNESTO ALADINOALFONSO CANOVAS"],
["6381","GISELLEALFONSO CRUZ"],
["6493","MIGUEL ANGELALFONZO GOMEZ"],
["6758","PAMELAALIAGA ALBORNOZ"],
["3901","RODRIGOALIAGA DURAN"],
["2004","MARGARITA AMALIAALIAGA URRA"],
["546","AUGUSTO ALEJANDROALIAGA PLAZA"],
["127","PAULINA HELGAALID CUADRA"],
["3305","ROSAALISTE SEPULVEDA"],
["6763","PAULAALISTE ALISTE"],
["5862","LISSETTEALISTE LEFIMAN"],
["1088","KATHERINEALLENDE AZOCAR"],
["4310","PAZALLENDE MEDRANO"],
["4274","SANDRA PATRICIAALLENDES ARAYA"],
["1771","MARIA FRANCISCAALLENDES FLORES"],
["1212","ALEJANDRO LEONELALLENDES RIOS"],
["5559","SANDRAALMENDRA BRAVO"],
["2244","NICOLAS ANTONIOALMENDRAS ESPINOZA"],
["6082","JENNIFER ALEJANDRAALMUNA ALARCON"],
["3438","NATALI ANDREAALMUNA ALFARO"],
["7082","NALIT RENYALMUNA FERNANDEZ"],
["1655","PABLO MAURICIOALMUNA FERNANDEZ"],
["5875","RODRIGOALMUNA FERNANDEZ"],
["5662","FERNANDAALMUNA GUTIÉRREZ"],
["1984","BARBARAALMUNA FERNANDEZ"],
["4752","LUISANAALONSO ACEVEDO"],
["4567","BASILIOALRUIZ GONZALEZ"],
["4167","MARCELOALRUIZ ROJAS"],
["961","MAURICIO ANDRESALRUIZ ROJAS"],
["3418","HAROLDALTAMAR ASCENCIO"],
["2792","CLAUDIO IGNACIOALTAMIRANO GALINDO"],
["7021","MEDICOALTERNATIVO ALTERNATIVO"],
["7022","MEDICOALTERNATIVO PSIQUIATRIA"],
["5099","GONZÁLEZALVARADO ANA TERESA"],
["5195","NORLISALVARADO HIDALGO"],
["2749","BARBARA VIVIANAALVARADO MALDONADO"],
["6393","PEDROALVARADO RIVERO"],
["4562","MARIAALVARADO TOLEDO"],
["3733","DEBORAALVARADO VILLEGAS"],
["6581","JAVIERA IGNACIAALVARADO JARA"],
["6802","LIBNA ELIZABETHALVARADO NOVOA"],
["5905","VIRGINIAALVARES SEPULVEDA"],
["5329","FRANCISCAALVAREZ ALARCON"],
["3848","MATIASALVAREZ BAEZA"],
["3309","FRANCHESCOALVAREZ CESCUTTI"],
["6375","FLAVIO ANDRESALVAREZ CID"],
["5084","JOAQUIN FERNANDOALVAREZ CIFUENTES"],
["516","MILTON HUMBERTOALVAREZ CONDEZA"],
["2608","HOMERO ANDRESALVAREZ DIAZ"],
["6336","NARIONALVAREZ DIAZ"],
["2530","PAULINA NATALIAALVAREZ DURALDE"],
["3763","ALEXIS RODRIGOALVAREZ GARRIDO"],
["555","JUANALVAREZ GOMEZ"],
["1117","GLADYS ELIANAALVAREZ MAYORGA"],
["8081","MARCOS FERNANDOALVAREZ RAMIREZ"],
["528","PAULA CAROLINAALVAREZ ROJAS"],
["1673","ASTRIDALVAREZ SERON"],
["2586","ANDRES MAURICIOALVAREZ URDINOLA"],
["2216","PAMELA ANDREAALVAREZ VALDES"],
["3139","TTIARA ALEJANDRAALVAREZ VILCHES"],
["4683","DANIELALVAREZ YRAUSQUIN"],
["4034","FRANCISCAALVAREZ GONZALEZ"],
["3332","JORGE LUISALVAREZ HERNANDEZ"],
["5805","IGNACIAALVAREZ RODRIGUEZ"],
["4645","CARLOS ALEJANDROALVAREZ SANCHEZ"],
["3564","VIVIANAALVAREZ TOLEDO"],
["3796","HECTOR IGNACIOALVAREZ VILCHES"],
["5217","JUANALVEAR VILLAR"],
["6437","JAVIERA CONSTANZAALVIAL PACHECO"],
["2250","CLAUDIA ANDREAامARO GUAJARDO"],
["2295","CLAUDIA ALEJANDRAامARO MEZA"],
["5137","CAMILA NICOLEAMARO MORALES"],
["6687","VALESKA DEL PILARAMARO SEPULVEDA"],
["6146","DANIELAMATO SILVA"],
["5210","MAURICIOAMAYA AMAYA"],
["1133","JAIME PATRICIOAMAYA DIAZ"],
["5659","MAKARENAAMBIADO MARTINEZ"],
["776","DANIELAAMIGO FUENTES"],
["779","DANIELAAMIGO HENRIQUEZ"],
["829","SALVADOR JESUSAMIGO LETELIER"],
["3129","CARLOS FABIÁNAMIGO MENDOZA"],
["1803","PATRICIOAMIGO PEREZ"],
["3570","MUÑOZAMIGO RODRIGO ALBERTO"],
["447","CLAUDIAAMIGO ROJAS"],
["6545","KARLA ANDREAAMIGO SEPULVEDA"],
["1154","SERGIO ANDRESAMIGO TOLEDO"],
["4333","CONSTANZA ARACELYAMIGO TRONCOSO"],
["3106","MANUEL ANTONIOAMIGO MOYA"],
["2834","ROMYNA CONSUELOAMIGO VIVANCO"],
["2442","OLGA ELIZABETHAMPUERO DIAZ"],
["4526","GERARDO ANDRESAMUNDARAY CLEMENTE"],
["5775","SERGIO NICOLASANABALON MIRANDA"],
["1542","RODRIGOANACONA COCIO"],
["5828","LORENA CONSTANZAANCIETA SANZANA"],
["6683","FRANCISCA ALEJANDRAANDAUR BRAVO"],
["6224","FRANCISCO IGNACIOANDAUR CACERES"],
["1413","LUISANDAUR CASTILLO"],
["6182","JORGEANDAUR CIFUENTES"],
["5634","CATALINAANDAUR CONCHA"],
["5249","CHRISTOPHER RIGOBERTANDAUR FIGUEROA"],
["6060","DENISE MURIELANDRADE DIAZ"],
["2627","VINICIO JESUSANDRADE LARRAZABAL"],
["1832","LISSET ALISSONANDRADE PAVEZ"],
["5169","PAOLA ANDREAANDRADE ROJAS"],
["2297","ELIANA ISABELANDRADE VARELA"],
["6037","JOSTINE VIVIANAANDRADE ORMEÑO"],
["463","NIKOLE ALEXANDRAANDRADES ALBORNOZ"],
["4641","JOSSELYN ANDREAANDRADES ALBORNOZ"],
["1275","FELIPE HERNANANDRADES ARAYA"],
["5877","ADRIELY NICOLEANDRADES BARRERA"],
["154","EMMANUEL MIGUEL A.ANDRADES RODRIGUEZ"],
["5526","JAVIERANDRADES ROJAS"],
["2998","TAMARA GISELLEANDRADES SEPULVEDA"],
["816","OMAR JESUSANDRADES VASQUEZ"],
["6476","CARMEN LORENAANDRADES VERDUGO"],
["4607","CECICLIA ANDREAANDRADES ADASME"],
["5315","JAVIERAANGULO RODRIGUEZ"],
["2507","CLAUDEANNIA LOUIS"],
["1651","MIGUEL JAVIERANNICCHIARICO VILLAGRÁN"],
["2800","LUIS GERARDOANTEQUERA VELASQUEZ"],
["1830","ENZOANTONUCCI SOTOMAYOR"],
["3557","DANIELAAPABLAZA VALENZUELA"],
["913","FELIPE AQUILESAPARICIO CONSTANZO"],
["266","PERSONAL DEAPOYO A LA PRODUCCION"],
["1176","TERESAAQUEVEQUE GUINEZ"],
["1503","ENRIQUE RIGOBERTOARACENA ARAYA"],
["6150","MARIANAARACENA ALVAREZ"],
["6425","MANUEL IGNACIOARACENA ESPECH"],
["2654","MARIA TERESAARANCIBIA PACHECO"],
["3430","GONZALOARANCIBIA PALOMO"],
["2005","JOSEARANCIBIA VACCARO"],
["3481","VALERIA NICOLEARANCIBIA ALBURQUENQUE"],
["2760","CAROLINA FERNANDAARANCIBIA AVENDAÑO"],
["2997","LORENA HERMINIAARANCIBIA CORTES"],
["4059","MARGOT ORIANAARANCIBIA PACHECO"],
["126","MAX ARTUROARANEDA ALBORNOZ"],
["5348","MIRKO ANDRESARANEDA CALISTO"],
["3105","DIEGO GONZALOARANEDA CALISTO"],
["6069","KARDBIOARANEDA GACITUA"],
["5428","ALEJANDRO ANDRESARANEDA UGARTE"],
["4829","MICHELLE FRANCISCAARANEDA GATICA"],
["2955","CATALINA ISOLARANGUIZ VERGARA"],
["1343","MARIA JOSEARAVENA ALARCON"],
["2076","ESTEBANARAVENA ARAVENA"],
["1187","MERYAM DE LOS ANGELEARAVENA BERNAL"],
["5492","CLAUDIA ANGÉLICAARAVENA BROWN"],
["3370","CLAUDIAARAVENA CARRASCO"],
["5564","EVELYN YANINARAVENA CHAVEZ"],
["582","ANGELA DEL PILARARAVENA COFRE"],
["3652","JUANARAVENA COFRE"],
["3771","NATALIAARAVENA CONTRERAS"],
["6213","ABIGAILARAVENA CORALES"],
["547","ADELA DEL CARMENARAVENA ESPINOZA"],
["545","ADELA DEL CARMENARAVENA ESPINOZA"],
["3059","ISRRAELARAVENA GUTIERREZ"],
["144","JUAN FRANCISCOARAVENA JARA"],
["5246","MAXIMILIANO ANDRESARAVENA LAZO"],
["2261","EDUARDOARAVENA MANRIQUEZ"],
["2298","ANITA MARIAARAVENA MORAN"],
["495","CAMILA ESTERARAVENA MUÑOZ"],
["9654","RUBY DEL CARMENARAVENA NORIEGA"],
["5887","FRANCISCA BELÉNARAVENA PALMA"],
["6199","MACARENAARAVENA QUEZADA"],
["6415","ALICIA DEL CARMENARAVENA RAMOS"],
["2215","OSCAR ANDRÉSARAVENA SAAVEDRA"],
["5882","CARLOS ORLANDOARAVENA SANHUEZA"],
["3974","MARYARAVENA SEPULVEDA"],
["1816","MARGARITA MARIAARAVENA TORRES"],
["858","LUZARAVENA URBINA"],
["2299","MARIA INESARAVENA VERDUGO"],
["3494","VICTORIAARAVENA VIVANCO"],
["3966","LORETTO DEL PILARARAVENA ZALAME"],
["5683","CAMILAARAVENA BRIONES"],
["2204","EVELIN AURELIAARAVENA GUTIERREZ"],
["5732","SELENAARAVENA MORALES"],
["5186","KAROLAYN INÉSARAVENA PEREIRA"],
["4361","CAROLINAARAYA ANTUNEZ"],
["2696","PATRICIA MARIAARAYA ARAYA"],
["2966","MARIA ELISAARAYA BUSTAMANTE"],
["911","THIARE DE MARIAARAYA CANDIA"],
["4892","CLAUDIO ENRIQUEARAYA DIAZ"],
["752","XIMENA ALEJANDRAARAYA ESPINOZA"],
["2436","FELIPE IGNACIOARAYA GALLARDO"],
["6186","NOELIA ROMINAARAYA GONZALEZ"],
["4938","CATALINAARAYA GUERRA"],
["398","STEPHY LORETOARAYA HERRERA"],
["4229","FERNANDA IGNACIAARAYA HURTADO"],
["5708","ALEJANDROARAYA JAQUE"],
["1987","ROSAARAYA JARA"],
["6497","IGNACIA VALENTINAARAYA MENDEZ"],
["3702","PABLO ANDRESARAYA MORENO"],
["56","HERNANARAYA MOYA"],
["5746","JAVIERA ALEJANDRAARAYA NEIRA"],
["6694","GLORIAARAYA PARRA"],
["1319","DAYSI JASMINEARAYA PINCHEIRA"],
["764","SUSANAARAYA RAMIREZ"],
["5076","CAROLINAARAYA RETAMAL"],
["171","JORGE ALEJANDROARAYA RIQUELME"],
["1711","VICTORIAARAYA ROJAS"],
["5060","BARBARAARAYA RUBIO"],
["5540","PAMELA ANDREAARAYA SANHUEZA"],
["3847","NANCY CAROLINAARAYA VASQUEZ"],
["1015","MARIA ANGELAARAYA VILLAR"],
["6813","VALENTINA IGNACIAARAYA AGURTO"],
["6782","INGRID ISABELARAYA ARAYA"],
["6252","MARIELA SOFIAARAYA GRACIA"],
["5737","TIARA FERNANDAARAYA LABRAÑA"],
["5738","CLAUDIA PATRICIAARAYA MUÑOZ"],
["5990","RODRIGO NICOLASARAYA RUBIO"],
["4981","LUIS GABRIELARAYA SALDÍAS"],
["5351","FABIOLAARAYA VERGARA"],
// ... (truncated for brevity - full map continues as in original)
]);

const AGENDAS = new Map([
["108","ATENCION PRIMARIA ODONTOLOGICA"],
["292","ODONTOLOGIA GENERAL - ENDODONCIA"],
// ... (full map as in original)
]);

const DIAS = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO", "DOMINGO"];
const DIAS_SHORT = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"];
const DIAS_JS_IDX = [1, 2, 3, 4, 5, 6, 0];

const CUPO_COLORS = [
  "#2563eb","#16a34a","#dc2626","#9333ea","#ea580c","#0891b2","#be185d",
  "#854d0e","#065f46","#1e3a8a","#7c3aed","#b91c1c","#0369a1","#166534",
];

function getColorForCodigo(codigo) {
  const idx = TIPOS_CUPO.findIndex(t => t.codigo === codigo);
  return CUPO_COLORS[idx % CUPO_COLORS.length];
}

function generateTimeSlots() {
  const slots = [];
  for (let h = 7; h <= 20; h++) {
    for (let m = 0; m < 60; m += 5) {
      slots.push(`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`);
    }
  }
  return slots;
}
const TIME_SLOTS = generateTimeSlots();
const INTERVALOS = [2,3,4,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120];

function fmtFecha(dateStr) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${d}-${m}-${y}`;
}

function getLunes(d) {
  const tmp = new Date(d.getTime());
  const day = tmp.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  tmp.setDate(tmp.getDate() + diff);
  tmp.setHours(0, 0, 0, 0);
  return tmp;
}

function addDays(d, n) {
  const tmp = new Date(d.getTime());
  tmp.setDate(tmp.getDate() + n);
  return tmp;
}

function homologarTipologia(codigo) {
  if (codigo === "R" || codigo === "RR") return "RECETA";
  const tipo = TIPOS_CUPO.find(t => t.codigo === codigo);
  return tipo?.tipologia || "NUEVO";
}

export default function AgendaMedica() {
  const [step, setStep] = useState(1);
  const [cabecera, setCabecera] = useState({
    codigoRecurso: "", codigoAgenda: "", nombreProfesional: "",
    nombreAgenda: "", especialidad: "", fechaInicio: "", fechaTermino: "",
    escalonada: "SI", modalidadFinanciamiento: "INSTITUCIONAL",
    requiereFicha: "SI", permiteVariasHoras: "NO",
    comentarioGeneral: "",
  });
  const [bloques, setBloques] = useState([]);
  const [vistaCalendario, setVistaCalendario] = useState("semanal");
  const [semanaActual, setSemanaActual] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ dia: "", hora: "", semana: 1 });
  const [formBloque, setFormBloque] = useState({ tipoCupo: "", cantidad: 1, intervalo: 15 });
  const [busquedaCupo, setBusquedaCupo] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [conflicto, setConflicto] = useState(null);
  const [modalCopiar, setModalCopiar] = useState(false);
  const [generandoPDF, setGenerandoPDF] = useState(false);
  const [xmlError, setXmlError] = useState("");
  const xmlInputRef = useRef(null);

  useEffect(() => {
    if (!window.html2pdf) {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      document.head.appendChild(script);
    }
  }, []);

  // ── Semanas con fechas reales ──────────────────────────────────────────
  const semanas = useMemo(() => {
    if (!cabecera.fechaInicio || !cabecera.fechaTermino) return [];
    const start = new Date(cabecera.fechaInicio + "T00:00:00");
    const end   = new Date(cabecera.fechaTermino + "T00:00:00");
    if (end < start) return [];
    let lunes = getLunes(start);
    const result = [];
    let idx = 1;
    while (lunes <= getLunes(end)) {
      const domingo = addDays(lunes, 6);
      result.push({
        num: idx,
        lunes: new Date(lunes),
        domingo: new Date(domingo),
        label: `Sem ${idx} (${fmtFecha(lunes.toISOString().slice(0,10))} → ${fmtFecha(domingo.toISOString().slice(0,10))})`,
        labelLargo: `Semana ${idx} — ${fmtFecha(lunes.toISOString().slice(0,10))} al ${fmtFecha(domingo.toISOString().slice(0,10))}`,
      });
      lunes = addDays(lunes, 7);
      idx++;
    }
    return result;
  }, [cabecera.fechaInicio, cabecera.fechaTermino]);

  const diasDisponiblesPorSemana = useMemo(() => {
    const mapa = {};
    semanas.forEach(s => {
      const start = new Date(cabecera.fechaInicio + "T00:00:00");
      const end   = new Date(cabecera.fechaTermino + "T00:00:00");
      mapa[s.num] = DIAS.filter((dia, i) => {
        const jsIdx = DIAS_JS_IDX[i];
        const offset = jsIdx === 0 ? 6 : jsIdx - 1;
        const fechaDia = addDays(s.lunes, offset);
        return fechaDia >= start && fechaDia <= end;
      });
    });
    return mapa;
  }, [semanas, cabecera.fechaInicio, cabecera.fechaTermino]);

  function diasDisponibles(semanaNum) {
    return diasDisponiblesPorSemana[semanaNum] || DIAS;
  }

  const resumenCupos = useMemo(() => {
    const mapa = {};
    bloques.forEach(b => {
      if (!mapa[b.tipoCupo]) {
        const tipo = TIPOS_CUPO.find(t => t.codigo === b.tipoCupo);
        mapa[b.tipoCupo] = { descripcion: tipo?.descripcion || b.tipoCupo, tipologia: homologarTipologia(b.tipoCupo), total: 0 };
      }
      mapa[b.tipoCupo].total += b.cantidad;
    });
    const items = Object.entries(mapa).map(([cod, v]) => ({ codigo: cod, ...v }));
    const totalNuevo   = items.filter(i => i.tipologia === "NUEVO").reduce((s, i) => s + i.total, 0);
    const totalControl = items.filter(i => i.tipologia === "CONTROL").reduce((s, i) => s + i.total, 0);
    const totalReceta  = items.filter(i => i.tipologia === "RECETA").reduce((s, i) => s + i.total, 0);
    const totalGeneral = bloques.reduce((s, b) => s + b.cantidad, 0);
    const porSemana = {};
    bloques.forEach(b => {
      const key = b.semana ?? 0;
      if (!porSemana[key]) porSemana[key] = { total: 0, nuevo: 0, control: 0, receta: 0 };
      const tip = homologarTipologia(b.tipoCupo);
      porSemana[key].total   += b.cantidad;
      if (tip === "NUEVO")   porSemana[key].nuevo   += b.cantidad;
      if (tip === "CONTROL") porSemana[key].control += b.cantidad;
      if (tip === "RECETA")  porSemana[key].receta  += b.cantidad;
    });
    return { items, totalNuevo, totalControl, totalReceta, totalGeneral, porSemana };
  }, [bloques]);

  function toMinutes(hhmm) {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  }

  function rangoBloque(b) {
    const inicio = toMinutes(b.horaInicio);
    const duracion = b.intervalo * (cabecera.escalonada === "SI" ? b.cantidad : 1);
    return { inicio, fin: inicio + duracion };
  }

  function detectarConflicto(nuevo, excluirIdx = null) {
    const { inicio: nI, fin: nF } = rangoBloque(nuevo);
    for (let i = 0; i < bloques.length; i++) {
      if (i === excluirIdx) continue;
      const b = bloques[i];
      if (b.dia !== nuevo.dia) continue;
      if ((b.semana || 0) !== (nuevo.semana || 0)) continue;
      const { inicio: bI, fin: bF } = rangoBloque(b);
      if (nI < bF && nF > bI) {
        return { mensaje: `Se superpone con el bloque ${b.tipoCupo} (${b.horaInicio}, ${b.intervalo} min × ${b.cantidad} cupo${b.cantidad > 1 ? "s" : ""}) que ocupa hasta las ${String(Math.floor(bF/60)).padStart(2,"0")}:${String(bF%60).padStart(2,"0")}.` };
      }
    }
    return null;
  }

  const cuposFiltrados = useMemo(() =>
    TIPOS_CUPO.filter(t =>
      t.codigo.toLowerCase().includes(busquedaCupo.toLowerCase()) ||
      t.descripcion.toLowerCase().includes(busquedaCupo.toLowerCase())
    ), [busquedaCupo]);

  const bloquesEnVista = useMemo(() => {
    if (vistaCalendario === "semanal") return bloques.filter(b => !b.semana || b.semana === semanaActual);
    return bloques;
  }, [bloques, vistaCalendario, semanaActual]);

  function chipsParaCelda(dia, hora) {
    const slotMin = toMinutes(hora);
    return bloques.filter(b => {
      if (b.dia !== dia) return false;
      if (vistaCalendario === "semanal" && b.semana && b.semana !== semanaActual) return false;
      if (cabecera.escalonada === "SI" && b.cantidad > 1) {
        const { inicio, fin } = rangoBloque(b);
        return slotMin >= inicio && slotMin < fin;
      }
      return b.horaInicio === hora;
    });
  }

  const horasConBloques = useMemo(() => {
    const set = new Set();
    bloquesEnVista.forEach(b => {
      if (cabecera.escalonada === "SI" && b.cantidad > 1) {
        const { inicio, fin } = rangoBloque(b);
        TIME_SLOTS.forEach(t => { const m = toMinutes(t); if (m >= inicio && m < fin) set.add(t); });
      } else {
        set.add(b.horaInicio);
      }
    });
    return TIME_SLOTS.filter(t => set.has(t));
  }, [bloquesEnVista, cabecera.escalonada]);

  const horasVisibles = useMemo(() => {
    const base = TIME_SLOTS.filter((_, i) => i % 4 === 0);
    const extra = new Set([...horasConBloques, ...base]);
    return TIME_SLOTS.filter(t => extra.has(t));
  }, [horasConBloques]);

  // ── XML ────────────────────────────────────────────────────────────────
  function generarXML() {
    const esc = s => String(s || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
    const bloquesXml = bloques.map(b =>
      `    <bloque dia="${esc(b.dia)}" horaInicio="${esc(b.horaInicio)}" semana="${b.semana ?? ""}" tipoCupo="${esc(b.tipoCupo)}" cantidad="${b.cantidad}" intervalo="${b.intervalo}"/>`
    ).join("\n");
    return `<?xml version="1.0" encoding="UTF-8"?>\n<agenda>\n  <cabecera\n    codigoRecurso="${esc(cabecera.codigoRecurso)}"\n    codigoAgenda="${esc(cabecera.codigoAgenda)}"\n    nombreProfesional="${esc(cabecera.nombreProfesional)}"\n    nombreAgenda="${esc(cabecera.nombreAgenda)}"\n    especialidad="${esc(cabecera.especialidad)}"\n    fechaInicio="${esc(cabecera.fechaInicio)}"\n    fechaTermino="${esc(cabecera.fechaTermino)}"\n    escalonada="${esc(cabecera.escalonada)}"\n    modalidadFinanciamiento="${esc(cabecera.modalidadFinanciamiento)}"\n    requiereFicha="${esc(cabecera.requiereFicha)}"\n    permiteVariasHoras="${esc(cabecera.permiteVariasHoras)}"\n    comentarioGeneral="${esc(cabecera.comentarioGeneral)}"\n  />\n  <bloques>\n${bloquesXml}\n  </bloques>\n</agenda>`;
  }

  function descargarXML(xmlStr) {
    const blob = new Blob([xmlStr], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `agenda_${cabecera.codigoAgenda || "medica"}.xml`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function cargarDesdeXML(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setXmlError("");
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(ev.target.result, "application/xml");
        if (doc.querySelector("parsererror")) throw new Error("XML malformado");
        const cab = doc.querySelector("cabecera");
        if (!cab) throw new Error("Falta nodo cabecera");
        const getAttr = (node, name) => node.getAttribute(name) || "";
        setCabecera({
          codigoRecurso: getAttr(cab,"codigoRecurso"),
          codigoAgenda: getAttr(cab,"codigoAgenda"),
          nombreProfesional: getAttr(cab,"nombreProfesional"),
          nombreAgenda: getAttr(cab,"nombreAgenda"),
          especialidad: getAttr(cab,"especialidad"),
          fechaInicio: getAttr(cab,"fechaInicio"),
          fechaTermino: getAttr(cab,"fechaTermino"),
          escalonada: getAttr(cab,"escalonada") || "SI",
          modalidadFinanciamiento: getAttr(cab,"modalidadFinanciamiento") || "INSTITUCIONAL",
          requiereFicha: getAttr(cab,"requiereFicha") || "SI",
          permiteVariasHoras: getAttr(cab,"permiteVariasHoras") || "NO",
          comentarioGeneral: getAttr(cab,"comentarioGeneral"),
        });
        setBloques([...doc.querySelectorAll("bloque")].map(b => ({
          dia: getAttr(b,"dia"),
          horaInicio: getAttr(b,"horaInicio"),
          semana: getAttr(b,"semana") ? Number(getAttr(b,"semana")) : null,
          tipoCupo: getAttr(b,"tipoCupo"),
          cantidad: Number(getAttr(b,"cantidad")) || 1,
          intervalo: Number(getAttr(b,"intervalo")) || 15,
        })));
        setSemanaActual(1);
        setXmlError("");
      } catch(err) {
        setXmlError("No se pudo leer el archivo. Asegúrate de que sea un archivo de agenda .xml válido.");
      } finally {
        if (xmlInputRef.current) xmlInputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  }

  // ── PDF — CORRECCIÓN PRINCIPAL ─────────────────────────────────────────
  // Se construye un elemento DOM aislado fuera del árbol de la app
  // para evitar que hereden márgenes/padding del layout de React.
  async function handlePrint() {
    setGenerandoPDF(true);

    // Esperar a que html2pdf esté disponible
    if (!window.html2pdf) {
      await new Promise(resolve => {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
        script.onload = resolve;
        document.head.appendChild(script);
      });
    }

    // Crear contenedor PDF completamente aislado — sin herencia de estilos de la app
    const pdfEl = document.createElement("div");
    pdfEl.style.cssText = [
      "position:fixed",
      "top:-9999px",
      "left:-9999px",
      "width:277mm",      // ancho A4 landscape menos márgenes
      "background:#fff",
      "font-family:Arial,Helvetica,sans-serif",
      "font-size:12px",
      "color:#000",
      "padding:0",
      "margin:0",
    ].join(";");

    const bloquesOrdenados = [...bloques].sort((a, b) => {
      const sA = a.semana || 0, sB = b.semana || 0;
      if (sA !== sB) return sA - sB;
      const dA = DIAS.indexOf(a.dia), dB = DIAS.indexOf(b.dia);
      if (dA !== dB) return dA - dB;
      return a.horaInicio.localeCompare(b.horaInicio);
    });

    function getFechaDia(bloque) {
      const semInfo = semanas.find(s => s.num === bloque.semana);
      if (!semInfo) return "";
      const dIdx = DIAS.indexOf(bloque.dia);
      if (dIdx === -1) return "";
      const jsIdx = DIAS_JS_IDX[dIdx];
      const offset = jsIdx === 0 ? 6 : jsIdx - 1;
      return fmtFecha(addDays(semInfo.lunes, offset).toISOString().slice(0, 10));
    }

    const { items: resItems, totalGeneral, totalNuevo, totalControl, totalReceta, porSemana } = resumenCupos;
    const resumenLinea = resItems.map(i => `${i.codigo}: ${i.total}`).join(" · ");
    const semanasSorted = Object.keys(porSemana).map(Number).sort((a, b) => a - b);
    const porSemanaLinea = semanasSorted.map(sn => {
      const s = porSemana[sn];
      const parts = [`N:${s.nuevo}`, `C:${s.control}`];
      if (s.receta > 0) parts.push(`R:${s.receta}`);
      return `Sem ${sn}: ${s.total} (${parts.join(" ")})`;
    }).join("  ·  ");

    const rowsHtml = bloquesOrdenados.map((b, i) => {
      const tipo = TIPOS_CUPO.find(t => t.codigo === b.tipoCupo);
      const semInfo = semanas.find(s => s.num === b.semana);
      const fechaDia = getFechaDia(b);
      const bg = i % 2 === 0 ? "#ffffff" : "#f8fafc";
      return `<tr style="background:${bg};page-break-inside:avoid;break-inside:avoid;">
        <td style="border:1px solid #d1d5db;padding:4px 6px;text-align:center;font-size:11px;">
          ${b.semana ? `S${b.semana}` : ""}
          ${semInfo ? `<br><span style="font-size:9px;color:#64748b">${fmtFecha(semInfo.lunes.toISOString().slice(0,10))}</span>` : ""}
        </td>
        <td style="border:1px solid #d1d5db;padding:4px 6px;text-align:center;">
          ${b.dia}${fechaDia ? `<br><span style="font-size:9px;color:#64748b">${fechaDia}</span>` : ""}
        </td>
        <td style="border:1px solid #d1d5db;padding:4px 6px;text-align:center;font-family:monospace;">${b.horaInicio}</td>
        <td style="border:1px solid #d1d5db;padding:4px 6px;text-align:center;">${b.intervalo}</td>
        <td style="border:1px solid #d1d5db;padding:4px 6px;">
          <span style="background:${getColorForCodigo(b.tipoCupo)};color:#fff;border-radius:4px;padding:2px 6px;font-size:11px;font-weight:700;">${b.tipoCupo}</span>
          <span style="margin-left:6px;color:#475569;">${tipo?.descripcion || ""}</span>
        </td>
        <td style="border:1px solid #d1d5db;padding:4px 6px;text-align:center;">${b.cantidad}</td>
      </tr>`;
    }).join("");

    // HTML del PDF — sin wrappers extra, directo al contenido
    pdfEl.innerHTML = `
      <div style="padding:0;margin:0;">
        <div style="text-align:center;margin-bottom:14px;">
          <span style="font-size:18px;font-weight:700;color:#0f172a;letter-spacing:1px;">CREAR AGENDA</span>
        </div>

        <table style="width:100%;border-collapse:collapse;margin-bottom:4px;font-size:12px;">
          <tbody>
            <tr>
              <td style="border:1px solid #000;padding:5px 8px;font-weight:700;background:#e2e8f0;width:20%;">CÓDIGO RECURSO</td>
              <td style="border:1px solid #000;padding:5px 8px;width:30%;">${cabecera.codigoRecurso}</td>
              <td style="border:1px solid #000;padding:5px 8px;font-weight:700;background:#e2e8f0;width:20%;">CÓDIGO AGENDA</td>
              <td style="border:1px solid #000;padding:5px 8px;width:30%;">${cabecera.codigoAgenda}</td>
            </tr>
            <tr>
              <td style="border:1px solid #000;padding:5px 8px;font-weight:700;background:#e2e8f0;">NOMBRE PROFESIONAL</td>
              <td style="border:1px solid #000;padding:5px 8px;">${cabecera.nombreProfesional}</td>
              <td style="border:1px solid #000;padding:5px 8px;font-weight:700;background:#e2e8f0;">NOMBRE AGENDA</td>
              <td style="border:1px solid #000;padding:5px 8px;">${cabecera.nombreAgenda || "—"}</td>
            </tr>
            <tr>
              <td style="border:1px solid #000;padding:5px 8px;font-weight:700;background:#e2e8f0;">ESPECIALIDAD / ESTAMENTO</td>
              <td style="border:1px solid #000;padding:5px 8px;">${cabecera.especialidad}</td>
              <td style="border:1px solid #000;padding:5px 8px;font-weight:700;background:#e2e8f0;">FECHA INICIO</td>
              <td style="border:1px solid #000;padding:5px 8px;">${fmtFecha(cabecera.fechaInicio)}</td>
            </tr>
            <tr>
              <td style="border:1px solid #000;padding:5px 8px;font-weight:700;background:#e2e8f0;">ESCALONADA</td>
              <td style="border:1px solid #000;padding:5px 8px;">${cabecera.escalonada}</td>
              <td style="border:1px solid #000;padding:5px 8px;font-weight:700;background:#e2e8f0;">FECHA TÉRMINO</td>
              <td style="border:1px solid #000;padding:5px 8px;">${fmtFecha(cabecera.fechaTermino)}</td>
            </tr>
            <tr>
              <td style="border:1px solid #000;padding:5px 8px;font-weight:700;background:#e2e8f0;">MODALIDAD FINANCIAMIENTO</td>
              <td style="border:1px solid #000;padding:5px 8px;">${cabecera.modalidadFinanciamiento}</td>
              <td style="border:1px solid #000;padding:5px 8px;font-weight:700;background:#e2e8f0;">REQUIERE FICHA</td>
              <td style="border:1px solid #000;padding:5px 8px;">${cabecera.requiereFicha}</td>
            </tr>
            <tr>
              <td style="border:1px solid #000;padding:5px 8px;font-weight:700;background:#e2e8f0;">PERMITE MÁS DE UNA HORA AL DÍA</td>
              <td style="border:1px solid #000;padding:5px 8px;">${cabecera.permiteVariasHoras}</td>
              <td style="border:1px solid #000;padding:5px 8px;font-weight:700;background:#e2e8f0;">COMENTARIO GENERAL</td>
              <td style="border:1px solid #000;padding:5px 8px;">${cabecera.comentarioGeneral || "—"}</td>
            </tr>
          </tbody>
        </table>

        <div style="margin:10px 0;padding:7px 12px;background:#f0f4ff;border:1px solid #c7d2fe;border-radius:6px;font-size:11px;page-break-inside:avoid;break-inside:avoid;">
          <strong>RESUMEN DE CUPOS:</strong>
          Total: <strong>${totalGeneral}</strong> |
          NUEVO: <strong>${totalNuevo}</strong> |
          CONTROL: <strong>${totalControl}</strong>
          ${totalReceta > 0 ? ` | RECETA: <strong>${totalReceta}</strong>` : ""}
          — ${resumenLinea}
          ${semanasSorted.length > 1 ? `<br><strong>Por semana:</strong> ${porSemanaLinea}` : ""}
        </div>

        <div style="font-weight:700;margin:10px 0 6px;font-size:13px;">DETALLE DE AGENDA</div>

        <table style="width:100%;border-collapse:collapse;font-size:12px;">
          <thead>
            <tr>
              ${["SEMANA","DÍA","HORA INICIO","INTERVALO (min)","TIPO CUPO","CUPOS"].map(h =>
                `<th style="border:1px solid #000;padding:5px 6px;background:#1d4ed8;color:#fff;font-size:11px;text-align:center;">${h}</th>`
              ).join("")}
            </tr>
          </thead>
          <tbody>
            ${bloques.length === 0
              ? `<tr><td colspan="6" style="border:1px solid #000;padding:12px;text-align:center;color:#94a3b8;">Sin bloques agregados</td></tr>`
              : rowsHtml
            }
          </tbody>
        </table>
      </div>
    `;

    document.body.appendChild(pdfEl);

    try {
      const filename = `agenda_${cabecera.codigoAgenda || "medica"}.pdf`;

      const worker = window.html2pdf().set({
        margin: [8, 8, 12, 8],         // top, right, bottom, left — margen superior reducido
        filename,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          windowWidth: 1050,            // ancho fijo para canvas consistente
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
        pagebreak: {
          mode: ["css", "legacy"],      // NO usar "avoid-all" — causa páginas en blanco
          avoid: ["tr", "thead"],       // evitar corte dentro de filas y encabezados
        },
      }).from(pdfEl);

      const pdf = await worker.toPdf().get("pdf");
      const totalPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(150);
        const pw = pdf.internal.pageSize.getWidth();
        const ph = pdf.internal.pageSize.getHeight();
        pdf.text(`Página ${i} de ${totalPages}`, pw - 10, ph - 5, { align: "right" });
      }
      pdf.save(filename);
    } finally {
      document.body.removeChild(pdfEl);
      setGenerandoPDF(false);
    }

    // Descargar XML también
    descargarXML(generarXML());
  }

  // ── Modal ──────────────────────────────────────────────────────────────
  function abrirModal(dia, hora, semana = semanaActual) {
    setModalData({ dia, hora, semana });
    setFormBloque({ tipoCupo: "", cantidad: 1, intervalo: 15 });
    setBusquedaCupo(""); setEditIndex(null); setConflicto(null); setModalOpen(true);
  }

  function abrirEdicion(idx) {
    const b = bloques[idx];
    setModalData({ dia: b.dia, hora: b.horaInicio, semana: b.semana || semanaActual });
    setFormBloque({ tipoCupo: b.tipoCupo, cantidad: b.cantidad, intervalo: b.intervalo });
    setBusquedaCupo(""); setEditIndex(idx); setConflicto(null); setModalOpen(true);
  }

  function guardarBloque() {
    if (!formBloque.tipoCupo) return;
    const nuevo = {
      dia: modalData.dia, horaInicio: modalData.hora,
      semana: vistaCalendario === "semanal" ? modalData.semana : null,
      tipoCupo: formBloque.tipoCupo, cantidad: formBloque.cantidad, intervalo: formBloque.intervalo,
    };
    const conflict = detectarConflicto(nuevo, editIndex);
    if (conflict) { setConflicto(conflict); return; }
    setConflicto(null);
    if (editIndex !== null) setBloques(prev => prev.map((b, i) => i === editIndex ? nuevo : b));
    else setBloques(prev => [...prev, nuevo]);
    setModalOpen(false);
  }

  function eliminarBloque(idx) { setBloques(prev => prev.filter((_, i) => i !== idx)); setModalOpen(false); }

  function copiarSemana1ATodasLasSemanas() {
    const bloquesS1 = bloques.filter(b => b.semana === 1);
    if (bloquesS1.length === 0) return;
    const nuevosBloques = [
      ...bloquesS1,
      ...semanas.filter(s => s.num !== 1).flatMap(s => {
        const diasOk = diasDisponibles(s.num);
        return bloquesS1.filter(b => diasOk.includes(b.dia)).map(b => ({ ...b, semana: s.num }));
      }),
    ];
    setBloques(nuevosBloques);
    setModalCopiar(false);
  }

  const cabeceraCompleta = cabecera.codigoRecurso && cabecera.codigoAgenda &&
    cabecera.nombreProfesional && cabecera.especialidad &&
    cabecera.fechaInicio && cabecera.fechaTermino;

  const semActualObj = semanas.find(s => s.num === semanaActual);
  const diasDisp = vistaCalendario === "mensual" ? DIAS : (semActualObj ? diasDisponibles(semanaActual) : DIAS);

  function ResumenCupos({ compact = false }) {
    if (bloques.length === 0) return (
      <div style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "10px 16px", fontSize: 13, color: "#94a3b8" }}>
        Aún no hay cupos agregados.
      </div>
    );
    const semanasSorted = Object.keys(resumenCupos.porSemana).map(Number).sort((a, b) => a - b);
    return (
      <div style={{ background: compact ? "#f8fafc" : "#fff", border: "1.5px solid #e2e8f0", borderRadius: 10, padding: compact ? "10px 14px" : "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#475569", textTransform: "uppercase" }}>Total cupos:</span>
          <span style={{ fontWeight: 800, fontSize: 15, color: "#0f172a" }}>{resumenCupos.totalGeneral}</span>
          <span style={{ background: "#dbeafe", color: "#1d4ed8", borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>NUEVO: {resumenCupos.totalNuevo}</span>
          <span style={{ background: "#dcfce7", color: "#16a34a", borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>CONTROL: {resumenCupos.totalControl}</span>
          {resumenCupos.totalReceta > 0 && <span style={{ background: "#fef9c3", color: "#854d0e", borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>RECETA: {resumenCupos.totalReceta}</span>}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: semanasSorted.length > 0 ? 10 : 0 }}>
          {resumenCupos.items.map(item => (
            <div key={item.codigo} style={{ display: "flex", alignItems: "center", gap: 4, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6, padding: "3px 8px", fontSize: 11 }}>
              <span style={{ background: getColorForCodigo(item.codigo), color: "#fff", borderRadius: 3, padding: "1px 5px", fontWeight: 700 }}>{item.codigo}</span>
              <span style={{ color: "#475569" }}>{item.descripcion}</span>
              <span style={{ fontWeight: 700, color: "#0f172a" }}>×{item.total}</span>
              <span style={{ color: "#94a3b8", fontSize: 10 }}>({item.tipologia})</span>
            </div>
          ))}
        </div>
        {semanasSorted.length > 1 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 5, borderTop: "1px solid #e2e8f0", paddingTop: 8 }}>
              Cupos por semana
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {semanasSorted.map(semNum => {
                const s = resumenCupos.porSemana[semNum];
                const semInfo = semanas.find(x => x.num === semNum);
                const sublabel = semInfo ? fmtFecha(semInfo.lunes.toISOString().slice(0,10)) : "";
                return (
                  <div key={semNum} style={{ background: "#f0f4ff", border: "1px solid #c7d2fe", borderRadius: 7, padding: "5px 10px", fontSize: 11 }}>
                    <div style={{ fontWeight: 700, color: "#1d4ed8", marginBottom: 2 }}>
                      Sem {semNum}
                      {sublabel && <span style={{ fontWeight: 400, color: "#6366f1", marginLeft: 5, fontSize: 10 }}>{sublabel}</span>}
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 700, color: "#0f172a" }}>{s.total} cupos</span>
                      {s.nuevo   > 0 && <span style={{ color: "#1d4ed8" }}>N:{s.nuevo}</span>}
                      {s.control > 0 && <span style={{ color: "#16a34a" }}>C:{s.control}</span>}
                      {s.receta  > 0 && <span style={{ color: "#854d0e" }}>R:{s.receta}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#f0f4f8" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .btn-primary { background: #1d4ed8; color: #fff; border: none; border-radius: 8px; padding: 10px 22px; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.15s; font-family: inherit; }
        .btn-primary:hover { background: #1e40af; }
        .btn-primary:disabled { background: #93c5fd; cursor: not-allowed; }
        .btn-secondary { background: #fff; color: #1d4ed8; border: 1.5px solid #1d4ed8; border-radius: 8px; padding: 10px 22px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; }
        .btn-secondary:hover { background: #eff6ff; }
        .btn-danger { background: #fee2e2; color: #dc2626; border: none; border-radius: 8px; padding: 8px 16px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit; }
        .btn-danger:hover { background: #fecaca; }
        .input-field { width: 100%; padding: 9px 13px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 14px; font-family: inherit; outline: none; transition: border 0.15s; background: #fff; }
        .input-field:focus { border-color: #1d4ed8; }
        .select-field { width: 100%; padding: 9px 13px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 14px; font-family: inherit; outline: none; background: #fff; cursor: pointer; }
        .label { font-size: 12px; font-weight: 600; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 5px; display: block; }
        .card { background: #fff; border-radius: 14px; padding: 28px; box-shadow: 0 1px 4px rgba(0,0,0,0.07); }
        .step-indicator { display: flex; gap: 8px; align-items: center; }
        .step-dot { width: 10px; height: 10px; border-radius: 50%; }
        .cal-cell { min-height: 44px; border: 1px solid #e2e8f0; padding: 3px; cursor: pointer; transition: background 0.1s; vertical-align: top; }
        .cal-cell:hover { background: #eff6ff; }
        .cal-cell-blocked { min-height: 44px; border: 1px solid #e2e8f0; padding: 3px; background: #f1f5f9; cursor: not-allowed; vertical-align: top; }
        .cal-header { background: #1d4ed8; color: #fff; padding: 10px 8px; font-size: 12px; font-weight: 700; text-align: center; }
        .cal-header-blocked { background: #94a3b8; color: #fff; padding: 10px 8px; font-size: 12px; font-weight: 700; text-align: center; }
        .cal-time { background: #f8fafc; padding: 8px 10px; font-size: 11px; font-weight: 600; color: #64748b; font-family: 'DM Mono', monospace; text-align: right; white-space: nowrap; border: 1px solid #e2e8f0; }
        .bloque-chip { border-radius: 5px; padding: 3px 6px; font-size: 11px; font-weight: 700; color: #fff; margin: 1px; display: inline-flex; align-items: center; gap: 3px; cursor: pointer; white-space: nowrap; }
        .bloque-chip-cont { border-radius: 5px; padding: 2px 5px; font-size: 10px; font-weight: 600; color: #fff; margin: 1px; display: inline-flex; align-items: center; gap: 2px; opacity: 0.5; white-space: nowrap; border-left: 3px solid rgba(255,255,255,0.5); }
        .modal-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal { background: #fff; border-radius: 16px; padding: 28px; width: 440px; max-width: 95vw; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
        .cupo-option { padding: 8px 12px; border-radius: 7px; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: background 0.1s; }
        .cupo-option:hover { background: #eff6ff; }
        .cupo-badge { width: 32px; height: 24px; border-radius: 5px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #fff; flex-shrink: 0; }
        .vista-toggle { display: flex; border: 1.5px solid #cbd5e1; border-radius: 8px; overflow: hidden; }
        .vista-btn { padding: 7px 16px; font-size: 13px; font-weight: 600; border: none; cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .semana-tabs { display: flex; gap: 4px; flex-wrap: wrap; }
        .semana-tab { padding: 5px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; border: 1.5px solid #cbd5e1; cursor: pointer; font-family: inherit; transition: all 0.15s; white-space: nowrap; }
      `}</style>

      {/* Header */}
      <div style={{ background: "#1d4ed8", color: "#fff", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 36, height: 36, background: "rgba(255,255,255,0.2)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏥</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Generador de Agendas Médicas</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Sistema de confección de agendas</div>
          </div>
        </div>
        <div className="step-indicator">
          {[1,2,3].map(s => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div className="step-dot" style={{ background: step >= s ? "#fff" : "rgba(255,255,255,0.3)", width: step === s ? 14 : 10, height: step === s ? 14 : 10 }} />
              {s < 3 && <div style={{ width: 24, height: 2, background: step > s ? "#fff" : "rgba(255,255,255,0.3)" }} />}
            </div>
          ))}
          <span style={{ fontSize: 12, opacity: 0.9, marginLeft: 8 }}>Paso {step} de 3</span>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 20px" }}>

        {/* ── PASO 1 ── */}
        {step === 1 && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a" }}>Datos de la Agenda</h2>
              <p style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>Complete la información del profesional y configuración de la agenda.</p>
            </div>

            {/* Cargar desde XML */}
            <div className="card" style={{ padding: "16px 20px", marginBottom: 16, background: "#f0f4ff", border: "1.5px solid #c7d2fe" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#1d4ed8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                    Cargar agenda desde archivo XML
                  </div>
                  <div style={{ fontSize: 11, color: "#4338ca" }}>
                    Selecciona el archivo .xml generado al descargar una agenda anterior para precargar todos sus datos.
                  </div>
                </div>
                <div>
                  <input ref={xmlInputRef} type="file" accept=".xml" style={{ display:"none" }} onChange={cargarDesdeXML} />
                  <button className="btn-primary" onClick={() => xmlInputRef.current?.click()}>
                    Seleccionar archivo .xml
                  </button>
                </div>
              </div>
              {xmlError && (
                <div style={{ marginTop: 10, fontSize: 11, color: "#dc2626", background: "#fef2f2", padding: "7px 10px", borderRadius: 6, border: "1px solid #fca5a5" }}>
                  ⚠ {xmlError}
                </div>
              )}
            </div>

            <div className="card">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <label className="label">Código Recurso *</label>
                  <input className="input-field" value={cabecera.codigoRecurso}
                    onChange={e => {
                      const cod = e.target.value;
                      const nombre = PROFESIONALES.get(cod) || "";
                      setCabecera(p => ({...p, codigoRecurso: cod, nombreProfesional: nombre || p.nombreProfesional}));
                    }}
                    placeholder="Ej: 1234" />
                  {cabecera.codigoRecurso && !PROFESIONALES.has(cabecera.codigoRecurso) && (
                    <div style={{ fontSize: 11, color: "#f59e0b", marginTop: 4 }}>⚠ Código no encontrado en el mantenedor</div>
                  )}
                </div>
                <div>
                  <label className="label">Código Agenda *</label>
                  <input className="input-field" value={cabecera.codigoAgenda}
                    onChange={e => {
                      const cod = e.target.value;
                      const nombre = AGENDAS.get(cod) || "";
                      setCabecera(p => ({...p, codigoAgenda: cod, nombreAgenda: nombre || p.nombreAgenda}));
                    }}
                    placeholder="Ej: 108" />
                  {cabecera.codigoAgenda && !AGENDAS.has(cabecera.codigoAgenda) && (
                    <div style={{ fontSize: 11, color: "#f59e0b", marginTop: 4 }}>⚠ Código no encontrado en el mantenedor</div>
                  )}
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <label className="label">Nombre Profesional *</label>
                  <input className="input-field"
                    value={cabecera.nombreProfesional}
                    onChange={e => setCabecera(p => ({...p, nombreProfesional: e.target.value}))}
                    placeholder="Nombre completo del profesional" />
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <label className="label">Nombre Agenda</label>
                  <input className="input-field"
                    value={cabecera.nombreAgenda || ""}
                    onChange={e => setCabecera(p => ({...p, nombreAgenda: e.target.value}))}
                    placeholder="Se completa automáticamente al ingresar el Código Agenda" />
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <label className="label">Especialidad o Estamento *</label>
                  <input className="input-field" value={cabecera.especialidad} onChange={e => setCabecera(p => ({...p, especialidad: e.target.value}))} placeholder="Ej: Medicina Interna, Enfermería..." />
                </div>
                <div>
                  <label className="label">Fecha Inicio *</label>
                  <input type="date" className="input-field" value={cabecera.fechaInicio} onChange={e => setCabecera(p => ({...p, fechaInicio: e.target.value}))} />
                </div>
                <div>
                  <label className="label">Fecha Término *</label>
                  <input type="date" className="input-field" value={cabecera.fechaTermino} onChange={e => setCabecera(p => ({...p, fechaTermino: e.target.value}))} />
                </div>
              </div>

              <div style={{ borderTop: "1.5px solid #f1f5f9", marginTop: 24, paddingTop: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>Configuración</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16 }}>
                  {[{key:"escalonada",label:"Escalonada"},{key:"requiereFicha",label:"Requiere Ficha"},{key:"permiteVariasHoras",label:"Permite +1 hora/día"}].map(({key,label}) => (
                    <div key={key}>
                      <label className="label">{label}</label>
                      <select className="select-field" value={cabecera[key]} onChange={e => setCabecera(p => ({...p, [key]: e.target.value}))}>
                        <option value="SI">SÍ</option>
                        <option value="NO">NO</option>
                      </select>
                    </div>
                  ))}
                  <div>
                    <label className="label">Modalidad Financiamiento</label>
                    <select className="select-field" value={cabecera.modalidadFinanciamiento} onChange={e => setCabecera(p => ({...p, modalidadFinanciamiento: e.target.value}))}>
                      {["INSTITUCIONAL","HONORARIOS","CONSULTORES DE LLAMADO","COMPRAS REALIZADAS AL SISTEMA","COMPRAS REALIZADAS AL EXTRA SISTEMA","VENTA DE SERVICIOS","PLAN 500","OPERATIVO","CONVENIO 33.000"].map(o => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: "1.5px solid #f1f5f9", marginTop: 24, paddingTop: 24 }}>
                <label className="label">Comentario General (opcional)</label>
                <textarea className="input-field" rows={3} style={{ resize: "vertical" }}
                  placeholder="Observaciones generales sobre la agenda..."
                  value={cabecera.comentarioGeneral}
                  onChange={e => setCabecera(p => ({...p, comentarioGeneral: e.target.value}))} />
              </div>

              <div style={{ marginTop: 28, display: "flex", justifyContent: "flex-end" }}>
                <button className="btn-primary" disabled={!cabeceraCompleta} onClick={() => setStep(2)}>Continuar → Calendario</button>
              </div>
            </div>
          </div>
        )}

        {/* ── PASO 2 ── */}
        {step === 2 && (
          <div>
            <div style={{ marginBottom: 14, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a" }}>Calendario de Cupos</h2>
                <p style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>{cabecera.nombreProfesional} — {cabecera.especialidad}</p>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <div className="vista-toggle">
                  <button className="vista-btn" onClick={() => setVistaCalendario("semanal")} style={{ background: vistaCalendario==="semanal"?"#1d4ed8":"#fff", color: vistaCalendario==="semanal"?"#fff":"#475569" }}>Semanal</button>
                  <button className="vista-btn" onClick={() => setVistaCalendario("mensual")} style={{ background: vistaCalendario==="mensual"?"#1d4ed8":"#fff", color: vistaCalendario==="mensual"?"#fff":"#475569" }}>Mensual</button>
                </div>
                <button className="btn-secondary" onClick={() => setStep(1)}>← Volver</button>
                <button className="btn-primary" disabled={bloques.length === 0} onClick={() => setStep(3)}>Ver Resumen →</button>
              </div>
            </div>

            <div style={{ marginBottom: 12 }}><ResumenCupos compact /></div>

            {vistaCalendario === "semanal" && semanas.length > 1 && (
              <div className="card" style={{ padding: "14px 18px", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Período:</span>
                    <div className="semana-tabs">
                      {semanas.map(s => (
                        <button key={s.num} className="semana-tab" onClick={() => setSemanaActual(s.num)}
                          style={{ background: semanaActual===s.num?"#1d4ed8":"#fff", color: semanaActual===s.num?"#fff":"#475569", borderColor: semanaActual===s.num?"#1d4ed8":"#cbd5e1" }}>
                          {s.label}
                          {bloques.filter(b => b.semana === s.num).length > 0 && (
                            <span style={{ marginLeft: 5, background: semanaActual===s.num?"rgba(255,255,255,0.3)":"#e0e7ff", color: semanaActual===s.num?"#fff":"#1d4ed8", borderRadius: 10, padding: "1px 6px", fontSize: 10 }}>
                              {bloques.filter(b => b.semana === s.num).length}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  {bloques.filter(b => b.semana === 1).length > 0 && (
                    <button onClick={() => setModalCopiar(true)}
                      style={{ background: "#f0fdf4", color: "#16a34a", border: "1.5px solid #86efac", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
                      📋 Copiar Sem 1 → Todas
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
                  <thead>
                    <tr>
                      <th style={{ background: "#0f172a", color: "#fff", padding: "10px 12px", fontSize: 11, fontWeight: 700, textAlign: "left", width: 80 }}>HORA</th>
                      {DIAS.map((dia, i) => {
                        const disponible = diasDisp.includes(dia);
                        let fechaDiaStr = "";
                        if (vistaCalendario === "semanal" && semActualObj) {
                          const jsIdx = DIAS_JS_IDX[i];
                          const offset = jsIdx === 0 ? 6 : jsIdx - 1;
                          const fechaDia = addDays(semActualObj.lunes, offset);
                          fechaDiaStr = fmtFecha(fechaDia.toISOString().slice(0, 10));
                        }
                        return (
                          <th key={dia} className={disponible ? "cal-header" : "cal-header-blocked"}>
                            {vistaCalendario === "semanal" ? (
                              <>
                                <div>{DIAS_SHORT[i]}</div>
                                {fechaDiaStr && <div style={{ fontSize: 9, fontWeight: 400, opacity: 0.9, marginTop: 2 }}>{fechaDiaStr}</div>}
                              </>
                            ) : dia}
                            {!disponible && <div style={{ fontSize: 9, opacity: 0.75, fontWeight: 400, marginTop: 1 }}>fuera del período</div>}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {horasVisibles.map(hora => (
                      <tr key={hora}>
                        <td className="cal-time">{hora}</td>
                        {DIAS.map(dia => {
                          const disponible = diasDisp.includes(dia);
                          if (!disponible) return (
                            <td key={dia} className="cal-cell-blocked">
                              <div style={{ width:"100%", height:"100%", background:"repeating-linear-gradient(45deg,transparent,transparent 4px,rgba(0,0,0,0.04) 4px,rgba(0,0,0,0.04) 8px)" }} />
                            </td>
                          );
                          const chips = chipsParaCelda(dia, hora);
                          const esInicio = chips.filter(b => b.horaInicio === hora);
                          const esCont   = chips.filter(b => b.horaInicio !== hora);
                          return (
                            <td key={dia} className="cal-cell" onClick={() => abrirModal(dia, hora)}>
                              {esInicio.map(b => {
                                const idx = bloques.findIndex(x => x === b);
                                const color = getColorForCodigo(b.tipoCupo);
                                return (
                                  <div key={idx} className="bloque-chip" style={{ background: color }}
                                    onClick={e => { e.stopPropagation(); abrirEdicion(idx); }}>
                                    <span>{b.tipoCupo}</span><span style={{ opacity:.85, fontSize:10 }}>×{b.cantidad}</span>
                                  </div>
                                );
                              })}
                              {esCont.map(b => (
                                <div key={b.tipoCupo+b.horaInicio} className="bloque-chip-cont" style={{ background: getColorForCodigo(b.tipoCupo) }}>
                                  <span>{b.tipoCupo}</span><span style={{ fontSize:9 }}>↓</span>
                                </div>
                              ))}
                              {chips.length === 0 && (
                                <div style={{ opacity:0, transition:"opacity 0.1s", display:"flex", alignItems:"center", justifyContent:"center", height:"100%", minHeight:38 }}
                                  onMouseEnter={e => e.currentTarget.style.opacity=1}
                                  onMouseLeave={e => e.currentTarget.style.opacity=0}>
                                  <span style={{ fontSize:18, color:"#93c5fd" }}>+</span>
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ padding: "10px 16px", background: "#f8fafc", borderTop: "1px solid #e2e8f0", fontSize: 11, color: "#64748b" }}>
                💡 Clic en celda disponible para agregar cupos. Los días con trama gris están fuera del período. Los chips con ↓ indican continuación de un bloque escalonado.
              </div>
            </div>
          </div>
        )}

        {/* ── PASO 3 ── */}
        {step === 3 && (
          <div>
            <div style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a" }}>Resumen de Agenda</h2>
                <p style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>Revisa los datos y genera el PDF con el formato oficial.</p>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn-secondary" onClick={() => setStep(2)}>← Volver</button>
                <button className="btn-primary" onClick={handlePrint} disabled={generandoPDF}>
                  {generandoPDF ? "⏳ Generando..." : "⬇️ Descargar PDF + XML"}
                </button>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}><ResumenCupos /></div>

            <div className="card" style={{ padding: "14px 18px", marginBottom: 16, background: "#f0fdf4", border: "1.5px solid #86efac" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#166534", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                    Guardar agenda como archivo XML
                  </div>
                  <div style={{ fontSize: 11, color: "#166534" }}>
                    Descarga el archivo .xml para poder recargar esta agenda en el futuro y modificarla.
                  </div>
                </div>
                <button onClick={() => descargarXML(generarXML())}
                  style={{ background: "#fff", color: "#16a34a", border: "1.5px solid #16a34a", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
                  Descargar .xml
                </button>
              </div>
            </div>

            {/* Vista previa del PDF */}
            <div className="card" style={{ fontFamily: "Arial, sans-serif" }}>
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", letterSpacing: 1 }}>CREAR AGENDA — VISTA PREVIA</div>
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 4, fontSize: 12 }}>
                <tbody>
                  <tr>
                    <td style={{ border:"1px solid #000", padding:"5px 8px", fontWeight:700, background:"#e2e8f0", width:"20%" }}>CÓDIGO RECURSO</td>
                    <td style={{ border:"1px solid #000", padding:"5px 8px", width:"30%" }}>{cabecera.codigoRecurso}</td>
                    <td style={{ border:"1px solid #000", padding:"5px 8px", fontWeight:700, background:"#e2e8f0", width:"20%" }}>CÓDIGO AGENDA</td>
                    <td style={{ border:"1px solid #000", padding:"5px 8px", width:"30%" }}>{cabecera.codigoAgenda}</td>
                  </tr>
                  <tr>
                    <td style={{ border:"1px solid #000", padding:"5px 8px", fontWeight:700, background:"#e2e8f0" }}>NOMBRE PROFESIONAL</td>
                    <td style={{ border:"1px solid #000", padding:"5px 8px" }}>{cabecera.nombreProfesional}</td>
                    <td style={{ border:"1px solid #000", padding:"5px 8px", fontWeight:700, background:"#e2e8f0" }}>NOMBRE AGENDA</td>
                    <td style={{ border:"1px solid #000", padding:"5px 8px" }}>{cabecera.nombreAgenda || "—"}</td>
                  </tr>
                  <tr>
                    <td style={{ border:"1px solid #000", padding:"5px 8px", fontWeight:700, background:"#e2e8f0" }}>ESPECIALIDAD / ESTAMENTO</td>
                    <td style={{ border:"1px solid #000", padding:"5px 8px" }}>{cabecera.especialidad}</td>
                    <td style={{ border:"1px solid #000", padding:"5px 8px", fontWeight:700, background:"#e2e8f0" }}>FECHA INICIO</td>
                    <td style={{ border:"1px solid #000", padding:"5px 8px" }}>{fmtFecha(cabecera.fechaInicio)}</td>
                  </tr>
                  <tr>
                    <td style={{ border:"1px solid #000", padding:"5px 8px", fontWeight:700, background:"#e2e8f0" }}>ESCALONADA</td>
                    <td style={{ border:"1px solid #000", padding:"5px 8px" }}>{cabecera.escalonada}</td>
                    <td style={{ border:"1px solid #000", padding:"5px 8px", fontWeight:700, background:"#e2e8f0" }}>FECHA TÉRMINO</td>
                    <td style={{ border:"1px solid #000", padding:"5px 8px" }}>{fmtFecha(cabecera.fechaTermino)}</td>
                  </tr>
                  <tr>
                    <td style={{ border:"1px solid #000", padding:"5px 8px", fontWeight:700, background:"#e2e8f0" }}>MODALIDAD FINANCIAMIENTO</td>
                    <td style={{ border:"1px solid #000", padding:"5px 8px" }}>{cabecera.modalidadFinanciamiento}</td>
                    <td style={{ border:"1px solid #000", padding:"5px 8px", fontWeight:700, background:"#e2e8f0" }}>REQUIERE FICHA</td>
                    <td style={{ border:"1px solid #000", padding:"5px 8px" }}>{cabecera.requiereFicha}</td>
                  </tr>
                  <tr>
                    <td style={{ border:"1px solid #000", padding:"5px 8px", fontWeight:700, background:"#e2e8f0" }}>PERMITE MÁS DE UNA HORA AL DÍA</td>
                    <td style={{ border:"1px solid #000", padding:"5px 8px" }}>{cabecera.permiteVariasHoras}</td>
                    <td style={{ border:"1px solid #000", padding:"5px 8px", fontWeight:700, background:"#e2e8f0" }}>COMENTARIO GENERAL</td>
                    <td style={{ border:"1px solid #000", padding:"5px 8px" }}>{cabecera.comentarioGeneral || "—"}</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ fontWeight: 700, margin: "10px 0 6px", fontSize: 13 }}>DETALLE DE AGENDA</div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr>
                    {["SEMANA","DÍA","HORA INICIO","INTERVALO (min)","TIPO CUPO","CUPOS"].map(h => (
                      <th key={h} style={{ border:"1px solid #000", padding:"5px 6px", background:"#1d4ed8", color:"#fff", fontSize:11, textAlign:"center" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bloques.length === 0 ? (
                    <tr><td colSpan={6} style={{ border:"1px solid #000", padding:"12px", textAlign:"center", color:"#94a3b8" }}>Sin bloques agregados</td></tr>
                  ) : (
                    [...bloques].sort((a,b) => {
                      const sA=a.semana||0, sB=b.semana||0;
                      if (sA!==sB) return sA-sB;
                      const dA=DIAS.indexOf(a.dia), dB=DIAS.indexOf(b.dia);
                      if (dA!==dB) return dA-dB;
                      return a.horaInicio.localeCompare(b.horaInicio);
                    }).map((b,i) => {
                      const tipo = TIPOS_CUPO.find(t => t.codigo === b.tipoCupo);
                      const semInfo = semanas.find(s => s.num === b.semana);
                      let fechaDiaCelda = "";
                      if (semInfo) {
                        const dIdx = DIAS.indexOf(b.dia);
                        if (dIdx !== -1) {
                          const jsIdx = DIAS_JS_IDX[dIdx];
                          const offset = jsIdx === 0 ? 6 : jsIdx - 1;
                          fechaDiaCelda = fmtFecha(addDays(semInfo.lunes, offset).toISOString().slice(0, 10));
                        }
                      }
                      return (
                        <tr key={i} style={{ background: i%2===0?"#fff":"#f8fafc" }}>
                          <td style={{ border:"1px solid #d1d5db", padding:"4px 6px", textAlign:"center", fontSize:11 }}>
                            {b.semana ? `S${b.semana}` : ""}
                            {semInfo && <div style={{ fontSize:9, color:"#64748b" }}>{fmtFecha(semInfo.lunes.toISOString().slice(0,10))}</div>}
                          </td>
                          <td style={{ border:"1px solid #d1d5db", padding:"4px 6px", textAlign:"center" }}>
                            <div>{b.dia}</div>
                            {fechaDiaCelda && <div style={{ fontSize:9, color:"#64748b" }}>{fechaDiaCelda}</div>}
                          </td>
                          <td style={{ border:"1px solid #d1d5db", padding:"4px 6px", textAlign:"center", fontFamily:"monospace" }}>{b.horaInicio}</td>
                          <td style={{ border:"1px solid #d1d5db", padding:"4px 6px", textAlign:"center" }}>{b.intervalo}</td>
                          <td style={{ border:"1px solid #d1d5db", padding:"4px 6px" }}>
                            <span style={{ background:getColorForCodigo(b.tipoCupo), color:"#fff", borderRadius:4, padding:"2px 6px", fontSize:11, fontWeight:700 }}>{b.tipoCupo}</span>
                            <span style={{ marginLeft:6, color:"#475569" }}>{tipo?.descripcion}</span>
                          </td>
                          <td style={{ border:"1px solid #d1d5db", padding:"4px 6px", textAlign:"center" }}>{b.cantidad}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ── Modal agregar/editar ── */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <div>
                <div style={{ fontSize:16, fontWeight:700, color:"#0f172a" }}>{editIndex!==null?"Editar bloque":"Agregar cupos"}</div>
                <div style={{ fontSize:13, color:"#64748b", marginTop:2 }}>
                  {modalData.dia} — {modalData.hora}
                  {vistaCalendario==="semanal" && semanas.length>1 && ` — ${semanas.find(s=>s.num===modalData.semana)?.labelLargo||""}`}
                </div>
              </div>
              <button onClick={() => setModalOpen(false)} style={{ border:"none", background:"none", fontSize:20, cursor:"pointer", color:"#94a3b8" }}>×</button>
            </div>

            <div style={{ marginBottom:16 }}>
              <label className="label">Hora de inicio</label>
              <select className="select-field" value={modalData.hora} onChange={e => { setConflicto(null); setModalData(p=>({...p,hora:e.target.value})); }}>
                {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:16 }}>
              <div>
                <label className="label">Intervalo (minutos)</label>
                <select className="select-field" value={formBloque.intervalo} onChange={e => { setConflicto(null); setFormBloque(p=>({...p,intervalo:Number(e.target.value)})); }}>
                  {INTERVALOS.map(i => <option key={i} value={i}>{i} min</option>)}
                </select>
              </div>
              <div>
                <label className="label">Cantidad de cupos</label>
                <input type="number" min={1} max={99} className="input-field" value={formBloque.cantidad} onChange={e => { setConflicto(null); setFormBloque(p=>({...p,cantidad:Number(e.target.value)})); }} />
              </div>
            </div>

            {cabecera.escalonada==="SI" && formBloque.cantidad>1 && (
              <div style={{ background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:8, padding:"8px 12px", marginBottom:14, fontSize:12, color:"#1d4ed8" }}>
                📅 Escalonado: desde {modalData.hora} hasta {(() => {
                  const fin = toMinutes(modalData.hora) + formBloque.intervalo * formBloque.cantidad;
                  return `${String(Math.floor(fin/60)).padStart(2,"0")}:${String(fin%60).padStart(2,"0")}`;
                })()}
              </div>
            )}

            <div style={{ marginBottom:20 }}>
              <label className="label">Tipo de cupo *</label>
              <input className="input-field" placeholder="Buscar por código o nombre..." value={busquedaCupo} onChange={e => setBusquedaCupo(e.target.value)} style={{ marginBottom:8 }} />
              <div style={{ maxHeight:180, overflowY:"auto", border:"1.5px solid #e2e8f0", borderRadius:8 }}>
                {cuposFiltrados.slice(0,20).map(t => (
                  <div key={t.codigo} className="cupo-option"
                    style={{ background: formBloque.tipoCupo===t.codigo?"#eff6ff":undefined }}
                    onClick={() => { setConflicto(null); setFormBloque(p=>({...p,tipoCupo:t.codigo})); }}>
                    <div className="cupo-badge" style={{ background:getColorForCodigo(t.codigo) }}>{t.codigo}</div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:500, color:"#0f172a" }}>{t.descripcion}</div>
                      <div style={{ fontSize:11, color:"#64748b" }}>{homologarTipologia(t.codigo)}</div>
                    </div>
                    {formBloque.tipoCupo===t.codigo && <span style={{ marginLeft:"auto", color:"#1d4ed8", fontSize:16 }}>✓</span>}
                  </div>
                ))}
                {cuposFiltrados.length===0 && <div style={{ padding:16, color:"#94a3b8", fontSize:13, textAlign:"center" }}>Sin resultados</div>}
              </div>
            </div>

            {conflicto && (
              <div style={{ background:"#fef2f2", border:"1.5px solid #fca5a5", borderRadius:10, padding:"12px 14px", marginBottom:16, display:"flex", gap:10, alignItems:"flex-start" }}>
                <span style={{ fontSize:18, flexShrink:0 }}>⚠️</span>
                <div>
                  <div style={{ fontWeight:700, color:"#dc2626", fontSize:13, marginBottom:3 }}>Superposición de horarios detectada</div>
                  <div style={{ color:"#7f1d1d", fontSize:12, lineHeight:1.5 }}>{conflicto.mensaje}</div>
                  <div style={{ color:"#7f1d1d", fontSize:12, marginTop:4 }}>Ajusta la hora, el intervalo o la cantidad de cupos.</div>
                </div>
              </div>
            )}

            <div style={{ display:"flex", gap:10, justifyContent:"space-between" }}>
              {editIndex!==null && <button className="btn-danger" onClick={() => eliminarBloque(editIndex)}>🗑 Eliminar</button>}
              <div style={{ display:"flex", gap:10, marginLeft:"auto" }}>
                <button className="btn-secondary" onClick={() => setModalOpen(false)}>Cancelar</button>
                <button className="btn-primary" disabled={!formBloque.tipoCupo} onClick={guardarBloque}>
                  {editIndex!==null?"Guardar cambios":"Agregar bloque"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal copiar semana 1 ── */}
      {modalCopiar && (
        <div className="modal-overlay" onClick={() => setModalCopiar(false)}>
          <div className="modal" style={{ width:420 }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign:"center", marginBottom:20 }}>
              <div style={{ fontSize:40, marginBottom:12 }}>📋</div>
              <div style={{ fontSize:17, fontWeight:700, color:"#0f172a", marginBottom:8 }}>Copiar Semana 1 a todas las semanas</div>
              <div style={{ fontSize:13, color:"#64748b", lineHeight:1.6 }}>
                Se copiarán los {bloques.filter(b=>b.semana===1).length} bloques de la Semana 1 a las demás semanas, respetando los días disponibles de cada período.
              </div>
            </div>
            <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
              <button className="btn-secondary" onClick={() => setModalCopiar(false)}>Cancelar</button>
              <button className="btn-primary" onClick={copiarSemana1ATodasLasSemanas}>✓ Sí, copiar a todas</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
