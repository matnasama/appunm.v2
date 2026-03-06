-- Inserta tramites internos de alumnos en la tabla items.

BEGIN;

DELETE FROM items WHERE categoria = 'tramites-interno';

WITH payload AS (
  SELECT $$
{
  "tramites-alumnos": [
    {
      "nombre": "Solicitud de titulos",
      "hoja_de_calculo": "https://docs.google.com/spreadsheets/d/1NJ0U5hUxO32Dxe141yxRLANJHzgoXogxkf4MSHH5b2U/edit?gid=1229277479#gid=1229277479",
      "formulario": "https://forms.gle/LibNsDSZnxcmsXUv9"
    },
    {
      "nombre": "Cambio de institucion",
      "hoja_de_calculo": "https://docs.google.com/spreadsheets/d/1vhw_eXkmaC_NfCSadUv4aDA9Ti97zFVEHUfVgGWomPo/edit?gid=2043766057#gid=2043766057",
      "formulario": "https://forms.gle/hGVD9xY4fu3KA3oW8"
    },
    {
      "nombre": "Cambio/simultaneidad de carrera",
      "hoja_de_calculo": "https://docs.google.com/spreadsheets/d/1kPfT80iUlQc0blh8ZcYBHEhU8kxNgnTITpyjQyxA51k/edit?gid=1950064011#gid=1950064011",
      "formulario": "https://forms.gle/2nEuygSB767QGjN19"
    },
    {
      "nombre": "Estudiantes sin analitico",
      "hoja_de_calculo": "https://docs.google.com/spreadsheets/d/1LeZ9HxFV4yPuhKnN-cMS5Fbarr-e1ZORcfvMrOa-xC8/edit?gid=1205947732#gid=1205947732"
    },
    {
      "nombre": "Estudiantes sin fotos",
      "hoja_de_calculo": "https://docs.google.com/spreadsheets/d/1sME60px2GIfR8xhZqtaNkd7vlM7RQs1fW4vh0VoRJWE/edit?gid=1205947732#gid=1205947732"
    },
    {
      "nombre": "Solicitud de eximicion",
      "hoja_de_calculo": "https://docs.google.com/spreadsheets/d/16Xi5I6X-ngeXlVjyhzRMc4IV96v1PuefxZ3QkMS1T0Q/edit?gid=809197868#gid=809197868",
      "formulario": "https://forms.gle/SDwGKa5MhaTPQsNj7"
    },
    {
      "nombre": "Correo institucional",
      "hoja_de_calculo": "https://docs.google.com/spreadsheets/d/1jtweVUEms_qL4XusogHM4CpeDRn4xcRCA5JT2Byhc00/edit?gid=1932031335#gid=1932031335",
      "formulario": "https://docs.google.com/forms/d/e/1FAIpQLSf9dZIMjBg9kDe6Brx_VZYR-vMcOKlKvTotTwo4nVjazj4u2w/viewform"
    },
    {
      "nombre": "Tramite de equivalencias",
      "hoja_de_calculo": "https://docs.google.com/spreadsheets/d/11rKA_dek5sI1mg6yjuvg3QNqmvXMb3P_hrqKM5nEfCU/edit?gid=1393828240#gid=1393828240"
    },
    {
      "nombre": "Solicitud de equivalencias",
      "hoja_de_calculo": "https://docs.google.com/spreadsheets/d/13-Pba7x59t7rDWlwMOo88KG9OjqLExOwlK8RlZEGZ3E/edit?gid=1841912448#gid=1841912448",
      "formulario": "https://forms.gle/evRpvskzsTytFEdUA"
    },
    {
      "nombre": "Solicitud de eximicion del COPRUN",
      "hoja_de_calculo": "https://docs.google.com/spreadsheets/d/16Xi5I6X-ngeXlVjyhzRMc4IV96v1PuefxZ3QkMS1T0Q/edit?gid=809197868#gid=809197868",
      "formulario": "https://forms.gle/RvoKihFSBXnYH28h7"
    }
  ]
}
  $$::jsonb as p
),
tramites AS (
  SELECT jsonb_array_elements(p->'tramites-alumnos') as t
  FROM payload
)
INSERT INTO items (categoria, titulo, descripcion, tags, enlaces, datos_especificos)
SELECT
  'tramites-interno',
  t->>'nombre',
  NULL,
  ARRAY[]::text[],
  COALESCE(
    (
      SELECT jsonb_agg(
        jsonb_build_object(
          'url', v.url,
          'label', v.label,
          'tipo', v.tipo
        )
      )
      FROM (
        VALUES
          (t->>'hoja_de_calculo', 'Hoja de calculo', 'hoja_de_calculo'),
          (t->>'formulario', 'Formulario', 'formulario')
      ) as v(url, label, tipo)
      WHERE v.url IS NOT NULL
    ),
    '[]'::jsonb
  ),
  jsonb_build_object(
    'hoja_de_calculo', t->>'hoja_de_calculo',
    'formulario', t->>'formulario'
  )
FROM tramites
ON CONFLICT DO NOTHING;

INSERT INTO items (categoria, titulo, descripcion, tags, enlaces, datos_especificos)
VALUES (
  'tramites-interno',
  'Formularios',
  NULL,
  ARRAY[]::text[],
  '[
    {"url": "https://drive.google.com/file/d/1YGModsHXKRBM7vInE8ElVYt1AI6uQqbD/view?usp=drive_link", "label": "alumno inscripto coprun recup 2025", "tipo": "formulario"},
    {"url": "https://drive.google.com/file/d/1ZtmB62j1dMmiAVSTFrqMazxQIzAXObxr/view?usp=drive_link", "label": "alumno regular especifico", "tipo": "formulario"},
    {"url": "https://drive.google.com/file/d/1tJIYUYAqDHc3RWzyKMeBFYWBVu57KeGM/view?usp=drive_link", "label": "f2 - certificado de examen", "tipo": "formulario"},
    {"url": "https://drive.google.com/file/d/1OWzOipiwb5s7BhKS_7mt7OucZMfQVv_q/view?usp=drive_link", "label": "formulario de licencias", "tipo": "formulario"},
    {"url": "https://drive.google.com/file/d/14ehR4L8HmfJFC7RhdS4HS1LORkUTGBnS/view?usp=drive_link", "label": "formulario alta de usuario", "tipo": "formulario"},
    {"url": "https://drive.google.com/file/d/1OCxnrvG8kLLQDsYSjCeWVnyLJXBSacJS/view?usp=drive_link", "label": "formulario alta sistemas de gestion", "tipo": "formulario"},
    {"url": "https://drive.google.com/file/d/1Pk52yq_refwT74nxRra7eFiGkz16ZWST/view?usp=drive_link", "label": "formulario solicitud de equivalencias", "tipo": "formulario"},
    {"url": "https://drive.google.com/file/d/1cWM-KR92e40neQFxo2OZOiEQZ0iDH0qq/view?usp=drive_link", "label": "modificacion de datos de genero no registral", "tipo": "formulario"},
    {"url": "https://drive.google.com/file/d/12iSBVln7RpQOZsjnC_4TtPLSmRrW4Ljx/view?usp=drive_link", "label": "modificacion de datos genero", "tipo": "formulario"},
    {"url": "https://drive.google.com/file/d/1YMorHkwqU3lQpbm75NYTrVrNXThdjKxZ/view?usp=drive_link", "label": "modificacion de datos", "tipo": "formulario"},
    {"url": "https://drive.google.com/file/d/1zxIHM0erjDFvUd5EfuJE4hu_5AD1hLhy/view?usp=drive_link", "label": "nota para ingresantes art7", "tipo": "formulario"},
    {"url": "https://drive.google.com/file/d/1W9QJIOWUaRBatpAjCqtd1xCUAyOaXuIw/view?usp=drive_link", "label": "nota para la solicitud de eximicion del coprun", "tipo": "formulario"}
  ]'::jsonb,
  '{}'::jsonb
)
ON CONFLICT DO NOTHING;

INSERT INTO items (categoria, titulo, descripcion, tags, enlaces, datos_especificos)
VALUES (
  'tramites-interno',
  'Modelos de respuesta',
  NULL,
  ARRAY[]::text[],
  '[]'::jsonb,
  $$
  {
    "modelos": [
      {
        "id": 1,
        "nombre": "INSCRIPCION INGRESANTES",
        "descripcion": "Si estas interesado en ser estudiante de alguna carrera de grado de la Universidad Nacional de Moreno y todavia no te inscribiste en ninguna carrera, podras encontrar la informacion acerca de como hacer tu inscripcion en el siguiente enlace que te lleva a nuestro sitio web.\nAlli podras encontrar las respuestas acerca de como inscribirse en la UNM.\n\nCarreras\nPreguntas Frecuentes\nCurso de Orientacion y Preparacion Universitaria (COPRUN)\nMayores de 25 anos\nProceso de Inscripcion y validacion de documentacion\nDocumentacion Requerida\nRequisitos para los Ciclos de Licenciaturas",
        "url": "http://www.unm.edu.ar/index.php/ingresantes"
      },
      {
        "id": 2,
        "nombre": "INSCRIPCION A ASIGNATURAS",
        "descripcion": "En el Calendario Academico podras encontrar las fechas de inscripciones a asignaturas antes de comenzar cada cuatrimestre.\nPara saber en que fechas te corresponde inscribirte debes tener en cuenta la siguiente informacion:\nLa inscripcion en calidad de INGRESANTES es para aquellos que recien han finalizado el COPRUN y en la primera instancia inmediata de inscripciones a asignaturas de la carrera, gestiona la inscripcion.\nSi hubieras realizado un cambio o simultaneidad de carreras y es tu primer cuatrimestre en la carrera tambien realizaras tu inscripcion en calidad de INGRESANTE.\nLos estudiantes que deberan inscribirse en las fechas previstas para NO INGRESANTES son aquellos que ya realizaron gestiones de inscripcion a asignaturas de la carrera de grado en periodos de anteriores."
      },
      {
        "id": 3,
        "nombre": "PROCESO DE INSCRIPCIONES A ASIGNATURAS",
        "descripcion": "La grilla de oferta de asignaturas de carreras de grado de cada periodo de cursada se publica en nuestra pagina web, con el correspondiente detalle que informa materias, comisiones, dias y horarios de cursadas.\n\nEn el Calendario Academico de la UNM, estan informadas las fechas de cada llamado de inscripcion a asignaturas de las carreras de grado, para cada periodo del ciclo lectivo.\n\nEn el primer llamado, las pre-inscripciones que realiza el estudiante desde su sesion de GESTION ONLINE a asignaturas le permiten indicar hasta tres opciones de comisiones de la oferta total de comisiones disponibles de una asignatura, que cuente con varias comisiones en distintos dias y horarios.\n\nEl estudiante debera elegir solo las opciones de dias y horarios en las que efectivamente pueda cursar, ya que cualquiera de las opciones que elija podran quedar aceptadas.\n\nLuego, en las fechas previstas por el calendario de 'Publicacion Inscripcion asignaturas del primer llamado', podran ver cuales de sus pre-inscripciones a comisiones quedaron aceptadas, ya que son las que podra cursar.\n\nEn el caso de que alguna de tus inscripciones gestionadas desde tu sesion de gestion online en ese primer llamado no hubiera quedado aceptada, deberas volver a tramitar la inscripcion en el segundo llamado. Ya que el proceso de inscripcion finaliza recien al culminar este ultimo. Este segundo llamado de inscripcion es de aceptacion automatica, por lo cual en el mismo momento de la inscripcion a las materias y comisiones que cuenten con disponibilidad, quedara esa inscripcion aceptada.\n\nSi tuviera algun inconveniente a la hora de inscribirse en el segundo llamado de inscripcion a asignaturas, deberas comunicarte con el departamento de tu carrera.\n\nDEPARTAMENTO DE CIENCIAS ECONOMICAS Y JURIDICAS\ndceyj@unm.edu.ar\nDEPARTAMENTO DE CIENCIAS APLICADAS Y TECNOLOGIA\ndcayt@unm.edu.ar\nDEPARTAMENTO DE HUMANIDADES Y CIENCIAS SOCIALES\ndhycs@unm.edu.ar"
      },
      {
        "id": 4,
        "nombre": "OFERTA ACADEMICA",
        "descripcion": "En nuestro sitio web se encuentra publicada la oferta academica con la informacion de cada asignatura.\n",
        "url": "https://www.unm.edu.ar/index.php/destacados/3117-oferta-academica-primer-cuatrimestre-2025"
      },
      {
        "id": 5,
        "nombre": "INSCRIPCION A FINALES REGULARES Y LIBRES",
        "descripcion": "La inscripcion a examenes finales se realiza en 3 (tres) momentos del ano.\nTurnos: Febrero-Marzo / Julio / Diciembre\n\nLos finales pueden rendirse de manera REGULAR o LIBRE en las mismas mesas previstas para cada asignatura.\n\nLos periodos de inscripcion y desarrollo de los examenes finales se encuentran informados en el CALENDARIO ACADEMICO.\n\nREGULARES: Recorda que en cada turno de finales SIEMPRE deberas inscribirte en el llamado que desees a traves del SIU-Guarani de la misma manera en que te inscribis a asignaturas y solo podes elegir una de las mesas del turno.\n\nLIBRES: Si cursaste una asignatura y el resultado fue: ABANDONO, AUSENTE o LIBRE, o NUNCA la cursaste, el sistema aceptara la inscripcion al examen final en calidad de LIBRE, siempre y cuando el Plan de Estudios de tu carrera lo admita (ver en el programa de la asignatura el regimen de aprobacion).\n\nSiempre que tengas inconvenientes a la hora de realizar una inscripcion podras comunicarte con el Departamento de Alumnos antes de que finalice el periodo."
      },
      {
        "id": 6,
        "nombre": "INICIO DEL TRAMITE DEL TITULO",
        "descripcion": "Una vez que hayas cumplido con el 100% del requerimiento de asignaturas aprobadas que preve el plan de estudios de tu carrera, para dar inicio al tramite de solicitud del titulo de GRADO o PRE-GRADO deberas comunicarte con la Departamento de Titulos a traves de su correo titulos@unm.edu.ar.\nEn dicha area te indicaran los requisitos para iniciar dicha tramitacion."
      },
      {
        "id": 7,
        "nombre": "SOLICITUD DE EQUIVALENCIAS",
        "descripcion": "REGIMEN DE EQUIVALENCIAS\nARTICULO 28.- La UNIVERSIDAD NACIONAL DE MORENO podra otorgar el reconocimiento total de las obligaciones academicas equivalentes que hayan sido aprobadas por sus alumnos regulares en la misma o en otra u otras Universidades argentinas debidamente reconocidas, tanto nacionales, privadas o provinciales, asi como del extranjero que posean reconocimiento oficial en su pais de origen.\nEl reconocimiento de obligaciones academicas equivalentes que hayan sido aprobadas en otra u otras Universidades se registrara sin calificacion numerica.\nARTICULO 29.- Para solicitar dicho reconocimiento, el interesado debera presentar ante la SECRETARIA ACADEMICA un requerimiento por escrito, en el que debera enunciar que asignaturas del Plan de Estudios de su Carrera, solicita sean reconocidas como equivalentes a otras obligaciones curriculares que haya aprobado en otras instituciones, exponer los fundamentos que motivan su solicitud y adjuntar la siguiente documentacion:\na) Copia debidamente certificada del Plan de Estudios de la Carrera cursada, con indicacion de la carga horaria de cada obligacion curricular.\nb) Certificado analitico emitido por la Universidad de origen y suscrito por autoridad competente en el que consten las asignaturas rendidas y las calificaciones definitivas obtenidas, indicando la fecha de los examenes finales e incluidas las reprobadas o con calificacion de insuficiente y demas actividades y obligaciones academicas realizadas.\nc) Constancia de la inexistencia o no de sanciones disciplinarias.\nd) Copia debidamente certificada de los programas correspondientes a las asignaturas aprobadas, y que ostenten la constancia de que son aquellos segun los cuales fuera rendido el examen correspondiente.\nARTICULO 32.- La UNIVERSIDAD NACIONAL DE MORENO reconocera por equivalencias una cantidad de asignaturas tal que no exceda en ningun caso el 30% (treinta por ciento) del total de las obligaciones curriculares que integran el Plan de Estudios de la Carrera en cuestion.\nARTICULO 33.- Sera admisible la solicitud del reconocimiento de equivalencias de asignaturas promovidas en otra Universidad, en tanto hayan sido aprobadas dentro de los ultimos diez (10) anos anteriores al del ciclo lectivo de la solicitud.\nPara solicitar equivalencias necesitas solicitar en la institucion donde estudiaste la documentacion enumerada en el articulo 29 del Reglamento de Alumnos. Una vez que tenes la documentacion en tu poder, vas a descargar el formulario que se encuentra al final del correo, completarlo y enviarlo al departamento de tu carrera para solicitar la autorizacion.\nEn el departamento de tu carrera, cuyos correos vas a encontrar a continuacion, podras consultar acerca de las asignaturas que puedan ser equivalentes con las de la carrera que cursaste.\n\nDEPARTAMENTO DE CIENCIAS ECONOMICAS Y JURIDICAS\ndceyj@unm.edu.ar\nDEPARTAMENTO DE CIENCIAS APLICADAS Y TECNOLOGIA\ndcayt@unm.edu.ar\nDEPARTAMENTO DE HUMANIDADES Y CIENCIAS SOCIALES\ndhycs@unm.edu.ar\nUna vez autorizado vas a presentarlo junto con la documentacion completa en el Departamento de Alumnos para dar comienzo a tu tramite.",
        "url": "https://drive.google.com/file/d/1Pk52yq_refwT74nxRra7eFiGkz16ZWST/view?usp=drive_link"
      },
      {
        "id": 8,
        "nombre": "CONSULTAS A BIENESTAR UNIVERSITARIO",
        "descripcion": "Para consultas sobre:\n\nBecas Internas\nBecas Externas\nDeporte Universitario\nBolsa de trabajo y pasantias\nPrograma Comunidad UNM\nConvivencia Universitaria\nBoleto estudiantil\n\ntenes que comunicarte con el Departamento de Bienestar Universitario a traves del correo electronico: bienestaruniversitario@unm.edu.ar"
      },
      {
        "id": 9,
        "nombre": "REGULARIDAD",
        "descripcion": "Como estipula el Reglamento de Alumnos:\n\nARTICULO 20.- Aquellos alumnos en condicion regular en una asignatura deberan rendir su examen final para promoverla, en cualquiera de los Turnos de Examenes dentro del plazo de 2 (dos) anos, a computar desde la fecha del primer llamado posterior a la fecha de regularizacion de la materia.\n\nARTICULO 21.- El alumno que no hubiere aprobado su examen final en el plazo previsto en el articulo 16 y/o hubiera reprobado en 3 (tres) oportunidades su examen final, perdera la regularidad en la asignatura y debera recursarla, con excepcion de las 2 (dos) ultimas unidades curriculares que pudiere adeudar de su Plan de Estudios. Esta circunstancia no afectara su inscripcion y condicion en relacion a las obligaciones curriculares correlativas.\n\nARTICULO 22.- El CONSEJO del DEPARTAMENTO ACADEMICO correspondiente, podra conceder una prorroga o nueva oportunidad de examen final, previa solicitud debidamente justificada del interesado y dictamen del titular de la asignatura. En caso de la denegatoria, el interesado podra interponer recurso por escrito ante la SECRETARIA ACADEMICA.\n\nARTICULO 23.- El alumno que optare por recursar una materia en condicion regular, a efectos de su promocion mediante el regimen de regularidad, perdera la condicion de regular en la materia obtenida con anterioridad. No se admitira la inscripcion para recursar una materia en condicion regular, antes del plazo de 1 (un) ano a computar desde la fecha de su regularizacion, con excepcion de aquellos alumnos que se encuentren en condicion de cursar hasta las 2 (dos) ultimas obligaciones academicas para obtener el respectivo titulo de grado."
      },
      {
        "id": 10,
        "nombre": "MODIFICACION DE DATOS PERSONALES",
        "descripcion": "Si deseas solicitar Modificacion de Datos en el sistema, deberas presentarte con tu DNI (original y copia) en el Departamento de Alumnos para completar un formulario de solicitud."
      },
      {
        "id": 11,
        "nombre": "SOLICITAR CONSTANCIAS O CERTIFICADOS",
        "descripcion": "Para solicitar Certificado de Alumno Regular o de Asignaturas Rendidas, segui los pasos que a continuacion se detallan:\n\n1. Accede dentro del SIU-GUARANI en la pestana TRAMITES.\n\n2. Selecciona la opcion 'Solicitar Constancias y Certificados'.\n\n3. Haz clic en el boton 'NUEVA SOLICITUD'.\n\n4. Completa el formulario con tu informacion de la constancia o certificado que necesitas.\n\n5. Verifica que toda la informacion sea correcta y confirma la solicitud.\n\n6. El sistema generara automaticamente la constancia o certificado solicitado para que la descargues."
      },
      {
        "id": 12,
        "nombre": "PROCESO DE INSCRIPCION A CARRERAS",
        "descripcion": "De acuerdo a su condicion siga los pasos para la preinscripcion como a continuacion se detallan:\n\n1) ASPIRANTES QUE SE INSCRIBAN POR PRIMERA VEZ EN LA UNM:\n\n a) Completar todos los datos solicitados en el formulario online\n b) Adjuntar toda la documentacion requerida obligatoria segun tu situacion en forma digital en el mismo formulario en la pestana 'Documentacion'.\n c) Una vez chequeada y guardada la informacion, deberas clickear en 'Finalizar' a fin de confirmar el proceso de preinscripcion.\n\n d) La documentacion sera tomada en caracter condicional hasta tanto pueda validar la misma junto a la documentacion original en la Oficina de Alumnos de la Universidad de forma presencial. Para ello, deberas solicitar un turno durante el proceso de inscripcion.\n\n2) ASPIRANTES QUE SE HAYAN INSCRIPTO PREVIAMENTE A LA UNM\n\n a) Actualizar todos los datos y elegir la carrera, realizando una preinscripcion desde el Sistema de Gestion On line, para ello, deberas ingresar directamente a http://gestiononline.unm.edu.ar/unm3w/, ingresar con tu usuario (DNI) y contrasena, si lo has obtenido previamente. Si se ha inscripto a la UNM pero nunca obtuvo su usuario, debera solicitarlo siguiendo los pasos alli indicados.\n Dentro de Gestion online deberas ingresar a Tramites/Preinscripciones.\n Tener en cuenta que si ya existe una inscripcion previa, para recuperar la contrasena, el Sistema usara el mail registrado en el momento de dicha inscripcion. De ser necesario, debera escribir a alumnos@unm.edu.ar, informando sus datos y solicitando modificacion del correo oportunamente registrado.\n De no recordar que se haya inscripto previamente, se podra corroborar ingresando directamente por el Formulario Electronico con el DNI: el Sistema podra detectar esta situacion, redireccionando a hacerlo por esta otra via.\n b) Adjuntar toda la documentacion requerida obligatoria segun la situacion en forma digital en el mismo formulario en la pestana 'Requisitos'.\n c) Una vez chequeada y guardada la informacion, debera guardar los datos a fin de confirmar el proceso de preinscripcion.\n d) La documentacion sera tomada en caracter condicional hasta tanto puedas validarla junto a los originales en la Oficina de Alumnos de la Universidad de forma presencial."
      },
      {
        "id": 13,
        "nombre": "CORREO INSTITUCIONAL",
        "descripcion": "Como hago para solicitar mi correo institucional?\nPara solicitar tu correo institucional tenes que completar el formulario web que encontraras al final de la pagina.\n1. Dentro de las proximas 48hs te va a llegar un correo de la creacion del correo institucional.\n\n2. En el correo que te va a llegar vas a encontrar un enlace para confirmar la cuenta (tenes 48hs para confirmar la cuenta desde el momento en que te llega el mensaje).\n\n3. Si no confirmaste la cuenta a tiempo podes escribirnos dando aviso a alumnos@unm.edu.ar, con la misma informacion solicitada en el formulario.\n\nEl primer ingreso sera con tu numero de DNI como CONTRASENA.",
        "url": "https://forms.gle/XpjiGpqE8XwzCWbH6"
      },
      {
        "id": 14,
        "nombre": "PRIMER LLAMADO - ACEPTADAS O RECHAZADAS",
        "descripcion": "En el caso de que alguna de tus inscripciones gestionadas desde tu sesion de gestion online en ese primer llamado no hubiera quedado aceptada, deberas volver a tramitar la inscripcion en el segundo llamado. Ya que el proceso de inscripcion finaliza recien al culminar este ultimo. Este segundo llamado de inscripcion es directa, por lo que al inscribirse en una asignatura-comision que cuente con disponibilidad, ya estara aceptado/a en la misma. Si tuvieras algun inconveniente a la hora de inscribirse en el segundo llamado de inscripcion a asignaturas, deberas comunicarte con el departamento de tu carrera.\n\nDEPARTAMENTO DE CIENCIAS ECONOMICAS Y JURIDICAS\ndceyj@unm.edu.ar\nDEPARTAMENTO DE CIENCIAS APLICADAS Y TECNOLOGIA\ndcayt@unm.edu.ar\nDEPARTAMENTO DE HUMANIDADES Y CIENCIAS SOCIALES\ndhycs@unm.edu.ar"
      },
      {
        "id": 15,
        "nombre": "PRIMER LLAMADO - CAMBIO DE COMISION",
        "descripcion": "En caso de haber obtenido la inscripcion aceptada en una asignatura/comision, donde finalmente no podes o no deseas cursar; deberas darte de baja en la comision en cuestion, antes de finalizar el segundo llamado de inscripcion a asignaturas, e inscribirte en la comision que sea de tu interes. Si tu consulta o duda surge el ultimo dia de inscripcion o apenas finalizado el ultimo llamado deberas realizar tu consulta al departamento academico de tu carrera.\n\nDEPARTAMENTO DE CIENCIAS ECONOMICAS Y JURIDICAS\ndceyj@unm.edu.ar\nDEPARTAMENTO DE CIENCIAS APLICADAS Y TECNOLOGIA\ndcayt@unm.edu.ar\nDEPARTAMENTO DE HUMANIDADES Y CIENCIAS SOCIALES\ndhycs@unm.edu.ar"
      },
      {
        "id": 16,
        "nombre": "SEGUNDO LLAMADO DE INSCRIPCION",
        "descripcion": "Este segundo llamado de inscripcion es directa, por lo que al inscribirte en una asignatura-comision que cuente con disponibilidad, ya estaras aceptado/a en la misma. Si tuvieras algun inconveniente a la hora de inscribirte en el segundo llamado de inscripcion a asignaturas, deberas comunicarte con el departamento de tu carrera.\n\nDEPARTAMENTO DE CIENCIAS ECONOMICAS Y JURIDICAS\ndceyj@unm.edu.ar\nDEPARTAMENTO DE CIENCIAS APLICADAS Y TECNOLOGIA\ndcayt@unm.edu.ar\nDEPARTAMENTO DE HUMANIDADES Y CIENCIAS SOCIALES\ndhycs@unm.edu.ar"
      },
      {
        "id": 17,
        "nombre": "CALENDARIO ACADEMICO",
        "descripcion": "Les recordamos que las fechas de todas las actividades academicas que se desarrollaran en el Ciclo Lectivo 2025, estan informadas en el Calendario Academico 2025, publicado en nuestra web, en el apartado de Estudiantes, Calendario Academico, Calendario Academico 2025. Siempre deberan consultar y verificar alli, las fechas correspondientes.",
        "url": "https://www.unm.edu.ar/files/Calendario-Academico-2025-UNM-Oct-2024.pdf"
      },
      {
        "id": 18,
        "nombre": "RECUPERATORIO COPRUN",
        "descripcion": "Las inscripciones para el RECUPERATORIO del COPRUN seran desde el 25 al 31 de marzo. Debe realizar la reinscripcion a traves de su usuario de SIU-GUARANI y presentar nuevamente la documentacion en el Depto. de Alumnos.",
        "url": "http://gestiononline.unm.edu.ar/unm3w/acceso"
      },
      {
        "id": 19,
        "nombre": "DATOS",
        "descripcion": "Siempre que te comuniques por este medio deberas consignar todos tus datos para que podamos realizar las gestiones necesarias en el sistema.\n\nNombre y Apellido:\nDNI:\nCarrera:\nCorreo Electronico:\nConsulta:\nCon esos datos podremos verificar la situacion academica, y dar respuesta o enviar lo solicitado si asi correspondiera.",
        "url": "http://gestiononline.unm.edu.ar/unm3w/acceso"
      },
      {
        "id": 20,
        "nombre": "CONSULTAS AL DEPARTAMENTO",
        "descripcion": "Debera realizar su consulta al departamento de su carrera.\n\nDEPARTAMENTO DE CIENCIAS ECONOMICAS Y JURIDICAS\ndceyj@unm.edu.ar\nDEPARTAMENTO DE CIENCIAS APLICADAS Y TECNOLOGIA\ndcayt@unm.edu.ar\nDEPARTAMENTO DE HUMANIDADES Y CIENCIAS SOCIALES\ndhycs@unm.edu.ar"
      },
      {
        "id": 21,
        "nombre": "RECEPCION DE DOCUMENTACION",
        "descripcion": "Su documentacion fue recibida y cargada correctamente."
      },
      {
        "id": 22,
        "nombre": "CONSULTA A ITUNM",
        "descripcion": "Debe realizar su consulta a itunm@unm.edu.ar."
      },
      {
        "id": 23,
        "nombre": "CONSULTA A COPRUN",
        "descripcion": "Debe realizar su consulta a coprun@unm.edu.ar."
      },
      {
        "id": 24,
        "nombre": "INSCRIPCIONES DE VERANO",
        "descripcion": "Acerca de la oferta de asignaturas del periodo estival y de los requisitos para inscribirse debera comunicarse con el departamento de su carrera.\nDEPARTAMENTO DE CIENCIAS ECONOMICAS Y JURIDICAS\ndceyj@unm.edu.ar\nDEPARTAMENTO DE CIENCIAS APLICADAS Y TECNOLOGIA\ndcayt@unm.edu.ar\nDEPARTAMENTO DE HUMANIDADES Y CIENCIAS SOCIALES\ndhycs@unm.edu.ar"
      },
      {
        "id": 25,
        "nombre": "BAJA BOLETO ESTUDIANTIL",
        "descripcion": "Para realizar la baja del boleto estudiantil en nuestra institucion debe ingresar en el siguiente enlace:",
        "url": "https://denuncias-bes.transporte.gba.gob.ar/denunciasboleto.php"
      },
      {
        "id": 26,
        "nombre": "CERTIFICADOS DE EXAMEN",
        "descripcion": "A traves del siguiente enlace podras descargar el modelo de Certificado de Examen.\nRecorda que dicho certificado tenes que presentarlo en el Departamento de Alumnos con firma y aclaracion del docente para que pueda ser certificado (*).\nLas constancias se certifican en el Departamento de Alumnos de lunes a viernes de 9 a 19hs.\n(*) Las practicas de las asignaturas TALLER de la carrera Licenciatura Trabajo Social se certifican en el Departamento de Humanidades y Ciencias Sociales.",
        "url": "https://drive.google.com/file/d/1SGe8080Igdsz7QeH_o-Twjtblmdtj-8t/view?usp=drive_link"
      },
      {
        "id": 27,
        "nombre": "CONSTANCIA DE ALUMNO REGULAR ESPECIFICA",
        "descripcion": "Podras solicitar certificados de alumno regular con dias y horarios de cursada en el Departamento de Alumnos.\nPara solicitar constancias de Alumno Regular especificas donde se indican dias y horarios de cursada de cada una de sus asignaturas, podra descargar el siguiente formulario y presentarlo completo personalmente en el Departamento de Alumnos.",
        "url": "https://drive.google.com/file/d/1Cw_rbcdV6SSKdGlH4GLlX1IzNGah1KZv/view?usp=drive_link"
      },
      {
        "id": 28,
        "nombre": "CAMBIO O SIMULTANEIDAD DE CARRERA",
        "descripcion": "Para solicitar un cambio o simultaneidad* de carrera tenes que completar el siguiente formulario virtual para dejar registro de la solicitud que queres realizar:\n* Para poder solicitar simultaneidad de carreras tenes que contar con un 25% de las asignaturas aprobadas de la carrera en la que te encontras previamente inscripto.\nEl tramite de cambio/simultaneidad de carrera lo puede realizar desde el 29/09/2025 al 20/11/2025.",
        "url": "https://forms.gle/J72NmuPYeRhfKpxKA"
      },
      {
        "id": 29,
        "nombre": "INSCRIPCION PARA EGRESADOS",
        "descripcion": "Para solicitar la reinscripcion a una nueva carrera tenes que completar el siguiente formulario virtual para dejar registro de la solicitud que queres realizar:\n* Al momento de completar el formulario deberas seleccionar dentro de SITUACION ACADEMICA la opcion EGRESADO UNM.\nEl tramite de reinscripcion a una nueva carrera lo podes realizar desde el 29/09/2025 al 20/11/2025.",
        "url": "https://forms.gle/J72NmuPYeRhfKpxKA"
      },
      {
        "id": 30,
        "nombre": "INSCRIPCION PARA RECHAZADOS (COPRUN APROBADO)",
        "descripcion": "Para solicitar la reinscripcion a una carrera tenes que completar el siguiente formulario virtual para dejar registro de la solicitud que queres realizar:\n* Al momento de completar el formulario deberas seleccionar dentro de SITUACION ACADEMICA la opcion COPRUN APROBADO Y QUIERO REINSCRIBIRME.\nEl tramite de reinscripcion lo podes realizar desde el 29/09/2025 al 20/11/2025.",
        "url": "https://forms.gle/J72NmuPYeRhfKpxKA"
      },
      {
        "id": 31,
        "nombre": "INSCRIPCION CICLO LECTIVO 2026",
        "descripcion": "A partir del 29 de septiembre hasta el 31 de octubre podras comenzar el proceso de inscripcion para comenzar a cursar en el ciclo lectivo 2026.\nPara comenzar a inscribirte deberas completar un formulario a traves de nuestro sitio web y luego validar la documentacion el dia que seleccionaste en el formulario en la opcion solicitar turno.\nEn el espacio de documentacion dentro del formulario tendras que subir:\nuna foto tuya como la que figura en el documento;\nfoto de frente y dorso del DNI;\nimagen o archivo pdf de la documentacion que tengas de tus estudios del nivel secundario (constancia de alumno regular, constancia de finalizacion adeudando asignaturas, constancia de titulo en tramite o Certificado Analitico).\n* No aplica este ultimo item para ingresantes por articulo 7 de la Ley de Educacion Superior\n* Al momento de completar el formulario vas a estar realizando la preinscripcion al Curso de Orientacion y Preparacion Universitaria (COPRUN) cuyo dictado comenzara el dia 2 de febrero en el horario que seleccionaste en el formulario.\nSi no validas tu inscripcion personalmente antes del 31 de octubre presentando los originales de la documentacion subida en el formulario tu inscripcion NO habra finalizado.",
        "url": "https://www.unm.edu.ar/index.php/ingresantes/proceso-de-inscripcion-y-validacion-de-documentacion"
      }
    ]
  }
  $$::jsonb
)
ON CONFLICT DO NOTHING;

INSERT INTO items (categoria, titulo, descripcion, tags, enlaces, datos_especificos)
VALUES (
  'tramites-interno',
  'Bedelia',
  NULL,
  ARRAY[]::text[],
  '[
    {"url": "https://docs.google.com/spreadsheets/d/1vQKtE9A_x1Gy4Cz7uA0hAS8J9k09VyqA/edit?gid=190423834#gid=190423834", "label": "aulas", "tipo": "hoja_de_calculo"},
    {"url": "https://docs.google.com/spreadsheets/d/1TK_osf_Fv3h6Z3LgiTRlPV1bnD_1EmN5/edit?gid=1210978255#gid=1210978255", "label": "grilla dcayt", "tipo": "hoja_de_calculo"},
    {"url": "https://docs.google.com/spreadsheets/d/12_XqQDfnswLA6rrKGztgb_R0O5Kmcw6o/edit?gid=417610937#gid=417610937", "label": "grilla dceyj", "tipo": "hoja_de_calculo"},
    {"url": "https://docs.google.com/spreadsheets/d/1vcwk087Q9z71oMdQwIWmf7BviEptxHz7/edit?gid=83667551#gid=83667551", "label": "grilla dhycs", "tipo": "hoja_de_calculo"}
  ]'::jsonb,
  '{}'::jsonb
)
ON CONFLICT DO NOTHING;

COMMIT;
