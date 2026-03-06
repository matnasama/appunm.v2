-- Clear existing data
DELETE FROM items_unificada;

-- Insert all items from tramites, consultas and enlaces
INSERT INTO items_unificada (tipo, categoria, titulo, descripcion, tags, formulario, documento, logo, enlace) VALUES
-- ============ TRÁMITES ============
(
  'estudiantes',
  'tramite',
  'CAMBIO O SIMULTANEIDAD DE CARRERAS',
  'Reglamento de Alumnos - artículos 16 y 17.

Si sos alumno de la UNM y querés cambiarte de carrera o cursar simultáneamente otra.

En el Calendario Académico publicado en nuestra web vas a encontrar las fechas en las cuales podés dar inicio al trámite para el próximo cuatrimestre.

Para solicitar un cambio o simultaneidad* de carrera tenés que completar el siguiente formulario virtual para dejar registro y subir la documentación (DNI y Certificado Analítico).

*La solicitud de cursado simultaneo de carreras, requerirá que el alumno cuente con al menos el 25% (veinticinco por ciento) de las asignaturas aprobadas en la carrera en la que se encuentre inscripto al momento de su solicitud',
  ARRAY['carrera', 'cambio', 'simultaneidad', 'formulario'],
  '[{"url": "https://forms.gle/N28rcYSVJiXffuzn9", "label": "Ir al formulario", "tipo": "formulario"}]'::jsonb,
  NULL,
  NULL,
  NULL
),
(
  'estudiantes',
  'tramite',
  'PRESENTAR EQUIVALENCIAS EN OTRA INSTITUCIÓN',
  'Los estudiantes o ex estudiantes que requieran documentación para solicitar equivalencias en otra institución, dependiendo de los requerimientos de la misma.

Deberán realizar la solicitud a través del formulario web que encontrarán al final.

Una vez finalizado el trámite, tu documentación será emitida de distinta manera, dependiendo del formato en el que la hayas pedido al completar el formulario.

• En FORMATO PAPEL te notificaremos a través de tu correo electrónico para que puedas retirar la documentación.

• En FORMATO DIGITAL te enviaremos la documentación al correo electrónico declarado en el formulario.

La realización de este trámite NO AFECTA a tu condición como alumno/a regular en la institución.
Tené en cuenta que el trámite puede demorar de 20 a 30 días.',
  ARRAY['equivalencias', 'documentación', 'formulario', 'otra institución'],
  '[{"url": "https://forms.gle/Lmu9XfJSC9u9DacR9", "label": "Ir al formulario", "tipo": "formulario"}]'::jsonb,
  NULL,
  NULL,
  NULL
),
(
  'estudiantes',
  'tramite',
  'CERTIFICADO DE EXAMEN',
  'Los alumnos que necesiten constancias de haber rendido examen.

A través del siguiente enlace podrán descargar el modelo de Certificado de Examen.

Recordá que dicho certificado tenés que presentarlo en el Departamento de Alumnos completo con firma y aclaración del docente para que pueda ser certificado (sellado)*.

Las constancias se certifican en el Departamento de Alumnos de lunes a viernes de 9 a 19hs.

(*)Las prácticas de las asignaturas TALLER de la carrera Licenciatura Trabajo Social se certifican en el Departamento de Humanidades y Ciencias Sociales.',
  ARRAY['examen', 'certificado', 'constancia', 'descargar'],
  NULL,
  '[{"url": "https://drive.google.com/file/d/1SGe8080Igdsz7QeH_o-Twjtblmdtj-8t/view?usp=drive_link", "label": "Descargar modelo", "tipo": "descarga"}]'::jsonb,
  NULL,
  NULL
),
(
  'estudiantes',
  'tramite',
  'SOLICITUD DE EQUIVALENCIAS',
  'Reglamento de Alumnos - artículos 32 al 39
RÉGIMEN DE EQUIVALENCIAS

Para solicitar equivalencias necesitás pedir en la institución donde estudiaste la documentación enumerada en el artículo 33 del Reglamento de Alumnos.

Una vez que tenés la documentación en tu poder, vas a descargar el formulario que se encuentra al final de la página, completarlo y enviarlo al departamento de tu carrera para solicitar la autorización.

En el departamento de tu carrera podrás consultar acerca de las asignaturas que puedan ser equivalentes con las de la carrera que cursaste.

Una vez autorizado vas a presentarlo junto con la documentación completa en el Departamento de Alumnos para dar comienzo a tu trámite.

ES IMPORTANTE QUE TENGAS PRESENTE QUE TU TRÁMITE DE EQUIVALENCIA NO INICIARÁ HASTA QUE NO PRESENTES TODA LA DOCUMENTACIÓN COMPLETA SEGÚN LOS REQUISITOS',
  ARRAY['equivalencias', 'formulario', 'documentación', 'requisitos'],
  NULL,
  '[{"url": "https://drive.google.com/file/d/1Pk52yq_refwT74nxRra7eFiGkz16ZWST/view?usp=drive_link", "label": "Descargar formulario", "tipo": "descarga"}, {"url": "https://drive.google.com/file/d/1ARmvpwAma118d4-49X9mH4772hXaPraI/view?usp=sharing", "label": "Ver requisitos", "tipo": "descarga"}]'::jsonb,
  NULL,
  NULL
),
(
  'estudiantes',
  'tramite',
  'SOLICITUD DE TÍTULOS',
  'Antes de completar y enviar tu solicitud recordá verificar en tu historia académica el cumplimiento del 100% del requerimiento de materias aprobadas según el plan de la carrera, para el título que vas a solicitar.

Se deben encontrar todas las actividades correspondientes aprobadas y en actas cerradas, para que consten en su historial académico.

Si completás el formulario no teniendo aún aprobadas la totalidad de las asignaturas necesarias para la emisión del título, se desestimará la solicitud.

En caso de corresponder, se realizarán las modificaciones de sus datos en el sistema antes de enviarte la documentación.

Completando la solicitud te otorgaremos la siguiente documentación:
• Certificado de Cumplimiento de Requisitos de Ingreso
• Certificado de Asignaturas Rendidas, que posteriormente vas a presentar al Departamento de Títulos.

Una vez finalizado el trámite remitiremos la documentación al correo que declaraste en el formulario.',
  ARRAY['título', 'egreso', 'formulario', 'certificado'],
  '[{"url": "https://forms.gle/qzNUnqYwkhUonzRQ9", "label": "Ir al formulario", "tipo": "formulario"}]'::jsonb,
  NULL,
  NULL,
  NULL
),
(
  'estudiantes',
  'tramite',
  'MODIFICACIÓN DE DATOS PERSONALES EN EL SISTEMA',
  'Como estudiante vas a poder cambiar o corregir datos personales, tales como NOMBRE, APELLIDO, GÉNERO o DNI.

Para ello tenés que completar el formulario correspondiente y presentarlo en el Departamento de Alumnos.

Motivos para la modificación:
• Por errores a la hora de realizar el primer registro en la UNM o por cambios en su Documento Nacional de Identidad (DNI).
• Por motivos de género sin cambio registral (Ley de Identidad de Género N° 26.743).
• Por motivos de género con cambio registral (Ley de Identidad de Género N° 26.743).

Para dar inicio al trámite tenés que acercarte personalmente con el formulario correspondiente y con tu DNI (original y fotocopia certificada por el Departamento de Mesa de Entrada).

El Departamento de Mesa de Entrada tiene atención de lunes a viernes en la franja horaria de 9 a 16hs.',
  ARRAY['datos personales', 'DNI', 'género', 'formulario', 'modificación'],
  NULL,
  '[{"url": "https://drive.google.com/file/d/1YMorHkwqU3lQpbm75NYTrVrNXThdjKxZ/view?usp=sharing", "label": "Formulario cambio de datos", "tipo": "descarga"}, {"url": "https://drive.google.com/file/d/12iSBVln7RpQOZsjnC_4TtPLSmRrW4Ljx/view?usp=sharing", "label": "Formulario cambio de género", "tipo": "descarga"}, {"url": "https://drive.google.com/file/d/1cWM-KR92e40neQFxo2OZOiEQZ0iDH0qq/view?usp=sharing", "label": "Formulario género sin cambio registral", "tipo": "descarga"}]'::jsonb,
  NULL,
  NULL
),
(
  'estudiantes',
  'tramite',
  'SOLICITAR CONSTANCIAS EN SIU-GUARANÍ',
  'Podés solicitar certificados de alumno regular o de asignaturas rendidas a través de SIU-GUARANÍ.

A continuación podrás ver los pasos para generar las constancias:

1. Ingresá dentro de la pestaña TRÁMITES dentro de tu sesión de SIU-GUARANÍ.
2. Una vez que ingresás en Solicitar Constancias y Certificados tenés que ingresar en la opción NUEVA SOLICITUD.
3. Seleccioná que tipo de constancia querés solicitar y completá los datos obligatorios marcados con (*).
4. El ícono color rojo que se encuentra en la derecha es un archivo PDF y al seleccionarlo iniciarás la descarga de la constancia generada.

¿Qué pasa si no se descarga mi constancia?
Normalmente puede producirse un error en la descarga de las constancias, en el cual la descarga nunca finaliza. Este error se produce solo en el navegador Google Chrome. Intentá realizar la descarga de las constancias desde otro navegador (Mozilla Firefox, Safari, Microsoft Edge, etc).',
  ARRAY['constancia', 'SIU Guaraní', 'alumno regular', 'certificado'],
  NULL,
  NULL,
  NULL,
  NULL
),
(
  'estudiantes',
  'tramite',
  'CONSTANCIA DE ALUMNO REGULAR ESPECÍFICA',
  'Para solicitar constancias de Alumno Regular específicas donde se indican días y horarios de cursada de cada una de tus asignaturas, tenés que descargar el siguiente formulario y presentarlo completo personalmente en el Departamento de Alumnos.',
  ARRAY['constancia', 'alumno regular', 'horarios', 'formulario'],
  NULL,
  '[{"url": "https://drive.google.com/file/d/1ZtmB62j1dMmiAVSTFrqMazxQIzAXObxr/view?usp=sharing", "label": "Descargar formulario", "tipo": "descarga"}]'::jsonb,
  NULL,
  NULL
),
(
  'estudiantes',
  'tramite',
  'PROMEDIO HISTÓRICO DE CARRERA',
  '¿Cómo hago para solicitar el Promedio Histórico de mi carrera?

Si necesitás solicitar la Certificación del Promedio Histórico de tu carrera tenés que comunicarte con alumnos@unm.edu.ar.

Consigná tus datos en la consulta (nombre y apellido, DNI, carrera).

Becas de Estímulo a las Vocaciones Científicas (EVC-CIN)
La Certificación del Promedio Histórico para presentar en las Becas de Estímulo a las Vocaciones Científicas (EVC-CIN) tenés que solicitarla a sec.investigacion@unm.edu.ar.',
  ARRAY['promedio', 'certificación', 'becas', 'EVC-CIN'],
  NULL,
  NULL,
  NULL,
  NULL
),
-- ============ CONSULTAS ============
(
  'estudiantes',
  'consulta',
  'PROCESO DE INSCRIPCIÓN A ASIGNATURAS',
  'Recordá que en el Calendario Académico vas a encontrar las fechas de inscripción a asignaturas para cada instancia del año.
Si realizaste un cambio/simultaneidad de carrera o si acabás de finalizar el curso de ingreso, tu inscripción tenés que realizarla en la fecha indicada en el Calendario Académico para alumnos INGRESANTES.
IMPORTANTE A LA HORA DE REALIZAR LA INSCRIPCIÓN:
• Podés elegir más de una comisión para cada asignatura, NO es obligatorio, no te inscribas en comisiones con horarios en los que no podés cursar.
• Cuando seleccionás la comisión que te interesa vas a encontrar la opción ORDENAR PRIORIDADES que te permitirá continuar la inscripción (habiendo seleccionado una sola comisión o varias). Ese botón cambiará de nombre una vez seleccionado y pasará a llamarse FINALIZAR INSCRIPCIÓN. Si no finalizás la inscripción, haciendo click en el mismo, no podrás acceder al comprobante y tu solicitud no quedar
• En el Calendario Académico vas a ver la fecha de Publicación de Inscripción a asignaturas, y en ese día verás en tu usuario las asignaturas aceptadas.
• En caso de que no se haya aceptado alguna de tus inscripciones deberás volver a intentar la inscripción en el segundo llamado.
• Para cambiarte de comisión tenés que darte de baja en la comisión en la que te hayas inscripto y que no puedas o no quieras cursar.
• El período para darse de baja se encuentra publicado en el Calendario Académico.
• Si tuvieras algún inconveniente a la hora de inscribirte en el Segundo Llamado de Inscripción a Asignaturas deberás comunicarse con el departamento de tu carrera.',
  ARRAY['inscripción', 'asignaturas', 'comisión', 'calendario'],
  NULL,
  NULL,
  NULL,
  NULL
),
(
  'estudiantes',
  'consulta',
  'CAMBIO DE COMISIÓN',
  'En caso de haber obtenido la inscripción aceptada en una asignatura/comisión, donde finalmente no puedas o no deseas cursar; deberás darte de baja en la comisión en cuestión, antes de finalizar el segundo llamado de inscripción a asignaturas, e inscribirte en la comisión que sea de tu interés. Si tu consulta o duda surge el último día de inscripción o apenas finalizado el último llamado deberás realizar tu consulta al departamento académico de tu carrera.',
  ARRAY['comisión', 'cambio', 'inscripción'],
  NULL,
  NULL,
  NULL,
  NULL
),
(
  'estudiantes',
  'consulta',
  'INSCRIPCIÓN A EXÁMENES FINALES',
  'La inscripción a exámenes finales se realiza en 3(tres) momentos del año. Turnos: Febrero-Marzo / Julio / Diciembre.
Los finales pueden rendirse de manera REGULAR o LIBRE en las mismas mesas previstas para cada asignatura.
Los períodos de inscripción y desarrollo de los exámenes finales se encuentran informados en el CALENDARIO ACADÉMICO.
REGULARES: Recordá que en cada turno de finales SIEMPRE deberás inscribirte en el llamado que desees a través del SIU-Guaraní de la misma manera en que te inscribís a asignaturas y sólo podés elegir una de las mesas del turno.
LIBRES: Si cursaste una asignatura y el resultado fue: ABANDONÓ, AUSENTE o LIBRE, o NUNCA la cursaste, el sistema aceptará la inscripción al examen final en calidad de LIBRE, siempre y cuando el Plan de Estudios de tu carrera lo admita (ver en el programa de la asignatura el régimen de aprobación).
Siempre que tengas inconvenientes a la hora de realizar una inscripción podrás comunicarte con el Departamento de Alumnos antes de que finalice el período.',
  ARRAY['exámenes', 'finales', 'inscripción', 'SIU-Guaraní'],
  NULL,
  NULL,
  NULL,
  NULL
),
(
  'estudiantes',
  'consulta',
  'TRAMITAR TU TÍTULO',
  '¿Finalizaste tu carrera y querés iniciar el trámite del título?
Para iniciar tu trámite de título deberás enviar a titulos@unm.edu.ar la siguiente documentación:
FICHA DEL EGRESADO: A través de tu sesión de Gestión Online, en la pestaña Trámites podrás completar la Ficha de Egresado ingresando en la opción SOLICITAR TÍTULO. Una vez completada tenés que imprimirla, firmar y aclarar, para luego enviarla escaneada junto con el resto de la documentación.
ENCUESTA DE EGRESADO: A tu correo te llegará la encuesta para Egresados que tenés que completar de manera virtual (si no lo encontrás verificá la carpeta de Spam o Correo no deseado).
ASIGNATURAS RENDIDAS Y CUMPLIMIENTO DE REQUISITOS DE INGRESO
Deberás solicitar al Departamento de Alumnos el Certificado de Asignaturas Rendidas y Constancia de Cumplimiento de Requisitos de Ingreso, para lo cual completarás un formulario web.
Dicha solicitud podrás encontrarla en la pestaña Información de trámites o solicitarlo vía mail a alumnos@unm.edu.ar o bien completar el siguiente formulario web Solicitud de Títulos.
Una vez que el Departamento de Alumnos te envíe la documentación solicitada tenés que adjuntarla a los demás requisitos para presentarlos en el Departamento de Títulos.
LIBRE DE DEUDA DE BIBLIOTECA: Para poder iniciar el trámite del título deberás presentar el LIBRE DE DEUDA DE BIBLIOTECA.
Podrás solicitarlo al Departamento de Biblioteca y Centro de Documentación (biblioteca@unm.edu.ar) o bien completar el siguiente formulario web Libre Deuda Biblioteca.
Cuando envías toda la documentación requerida para el inicio del trámite del título tenés que dar aviso al Departamento de Títulos de que ya has completado dicha encuesta.
Es importante que verifiques que los datos que consten en dicha documentación sean correctos antes de enviarlos, caso contrario, deberás solicitar la rectificación al área correspondiente.',
  ARRAY['título', 'egresado', 'graduación', 'documentación'],
  NULL,
  NULL,
  NULL,
  NULL
),
(
  'estudiantes',
  'consulta',
  'SOLICITUD DE EQUIVALENCIAS',
  'En el caso de presentar asignaturas aprobadas en otra universidad reconocida como tal, la equivalencia es EXTERNA.
Si cursaste o cursás otra carrera dentro de la UNM y deseas solicitar equivalencias entre ambas carreras la equivalencia es INTERNA.

Para solicitar equivalencias deberás completar una NOTA DE SOLICITUD que encontrará en el sector TRÁMITES (en el caso de las INTERNAS, sólo deberá presentar la NOTA DE SOLICITUD).

Junto con la mencionada nota deberá presentar los REQUISITOS DE EQUIVALENCIAS.

Las materias que podrás solicitar por equivalencias deben estar aprobadas en su totalidad.
Se recuerda que solo podrán presentar dichas solicitudes por materias aprobadas en Universidades, que cuenten con fecha de aprobación no superior a diez años. Además el Reglamento no admite solicitud de equivalencias de materias aprobadas en Instituciones de Nivel Terciario.

Podrás enviar un correo con su historia académica al departamento de su carrera realizando la consulta para informarse acerca de las asignaturas que puede solicitar y autorizar el formulario de solicitud una vez completado.

DEPARTAMENTO DE CIENCIAS ECONÓMICAS Y JURÍDICAS
dceyj@unm.edu.ar
DEPARTAMENTO DE CIENCIAS APLICADAS Y TECNOLOGÍA
dcayt@unm.edu.ar
DEPARTAMENTO DE HUMANIDADES Y CIENCIAS SOCIALES
dhycs@unm.edu.ar',
  ARRAY['equivalencias', 'materias', 'universidad'],
  NULL,
  NULL,
  NULL,
  NULL
),
(
  'estudiantes',
  'consulta',
  'CONSULTAS A BIENESTAR UNIVERSITARIO',
  'Para consultas sobre
Becas Internas
Becas Externas
Deporte Universitario
Bolsa de trabajo y pasantías
Programa Comunidad UNM
Convivencia Universitaria
Boleto estudiantil
podés comunicarte con el Departamento de Bienestar Universitario
a través del correo electrónico: bienestaruniversitario@unm.edu.ar',
  ARRAY['becas', 'bienestar', 'deporte', 'pasantías', 'boleto'],
  NULL,
  NULL,
  NULL,
  NULL
),
(
  'estudiantes',
  'consulta',
  'REGULARIDAD',
  '¿Cuándo pierdo la regularidad de una asignatura? ¿Cuándo puedo volver a cursar la asignatura?

Como estipula el Reglamento de Alumnos

ARTÍCULO 21.- El alumno que no hubiere aprobado su examen final en el plazo previsto en el artículo 16 y/o hubiera reprobado en 3 (tres) oportunidades su examen final, perderá la regularidad en la asignatura y deberá recursarla, con excepción de las 2 (dos) últimas unidades curriculares que pudiere adeudar de su Plan de Estudios. Esta circunstancia no afectará su inscripción y condición en relación a las obligaciones curriculares correlativas. ARTÍCULO 22.- El CONSEJO del DEPARTAMENTO ACADÉMICO correspondiente, podrá conceder una prórroga o nueva oportunidad de examen final, previa solicitud debidamente justificada del interesado y dictamen del titular de la asignatura.
En caso de la denegatoria, el interesado podrá interponer recurso por escrito ante la SECRETARÍA ACADÉMICA. (artículo modificado por el artículo 3º de la Resolución UNM-CS Nº 1.222/25) ARTÍCULO 23.- El alumno que optare por recursar una materia en condición regular, a efectos de su promoción mediante el régimen de regularidad, perderá la condición de regular en la materia obtenida con anterioridad. No se admitirá la inscripción para recursar una materia en condición regular, antes del plazo de 1 (un) año a computar desde la fecha de su regularización, con excepción de aquellos alumnos que se encuentren en condición de cursar hasta las 2 (dos) últimas obligaciones académicas para obtener el respectivo título de grado. (artículo modificado por el artículo 1º de la Resolución UNM-CS Nº 964/22)',
  ARRAY['regularidad', 'reglamento', 'examen', 'recursar'],
  NULL,
  NULL,
  NULL,
  NULL
),
(
  'estudiantes',
  'consulta',
  'ACTUALIZAR DATOS DE SISTEMA',
  'Para realizar cambios de datos de contacto, tales como número telefónico o correo electrónico registrados, tenés que enviarnos un correo con una foto de tu DNI de frente y dorso, especificando la información que querés actualizar, a alumnos@unm.edu.ar.',
  ARRAY['datos', 'actualizar', 'DNI', 'contacto'],
  NULL,
  NULL,
  NULL,
  NULL
),
(
  'estudiantes',
  'consulta',
  'SOLICITAR CONSTANCIAS O CERTIFICADOS',
  'Para solicitar Certificado de Alumno Regular o de Asignaturas Rendidas, seguí los pasos que a continuación se detallan:

1. Accede dentro del SIU-GUARANÍ en la pestaña TRÁMITES.

2. Selecciona la opción ''Solicitar Constancias y Certificados''.

3. Haz clic en el botón ''NUEVA SOLICITUD''.

4. Completa el formulario con tu información de la constancia o certificado que necesitas.

5. Verifica que toda la información sea correcta y confirma la solicitud.

6. El sistema generará automáticamente la constancia o certificado solicitado para que la descargues.',
  ARRAY['constancia', 'certificado', 'alumno regular', 'SIU-Guaraní'],
  NULL,
  NULL,
  NULL,
  NULL
),
-- ============ ENLACES ============
(
  'estudiantes',
  'enlace',
  'GESTIÓN ONLINE',
  'Sistema de gestión académica SIU Guaraní para inscripciones, consulta de notas, estado académico y trámites administrativos.',
  ARRAY['guaraní', 'inscripción', 'notas', 'académico'],
  NULL,
  NULL,
  '/guarani.webp',
  'http://gestiononline.unm.edu.ar/unm3w/'
),
(
  'estudiantes',
  'enlace',
  'CAMPUS VIRTUAL',
  'Plataforma Moodle para acceder a las aulas virtuales de las asignaturas. Incluye acceso a ciclos lectivos anteriores y campus especializados.',
  ARRAY['moodle', 'aulas virtuales', 'clases', 'materiales'],
  '[
    {"url": "http://campusvirtual.unm.edu.ar/moodle/login/index.php", "label": "Campus Virtual Principal", "tipo": "principal"},
    {"url": "https://campus2025.unm.edu.ar/moodle/", "label": "Ciclo Lectivo 2025", "tipo": "ciclo"},
    {"url": "http://campus2024.unm.edu.ar/moodle/", "label": "Ciclo Lectivo 2024", "tipo": "ciclo"},
    {"url": "http://campus2023.unm.edu.ar/moodle/", "label": "Ciclo Lectivo 2023", "tipo": "ciclo"},
    {"url": "http://campus2022.unm.edu.ar", "label": "Ciclo Lectivo 2022", "tipo": "ciclo"},
    {"url": "http://campus2020-2021.unm.edu.ar/", "label": "Ciclo Lectivo 2020-2021", "tipo": "ciclo"},
    {"url": "http://cv02.unm.edu.ar/", "label": "Campus Virtual COPRUN", "tipo": "especial"},
    {"url": "http://campusposgrado.unm.edu.ar/", "label": "Campus Virtual Posgrado", "tipo": "especial"}
  ]'::jsonb,
  NULL,
  '/campusvirtual.webp',
  'http://campusvirtual.unm.edu.ar/moodle/login/index.php'
),
(
  'estudiantes',
  'enlace',
  'INSTITUTO TECNOLÓGICO UNM (ITUNM)',
  'Portal del Instituto Tecnológico de la Universidad Nacional de Moreno. Formación técnica y tecnológica.',
  ARRAY['itunm', 'tecnológico', 'formación técnica'],
  NULL,
  NULL,
  '/itunm.webp',
  'http://itunm.unm.edu.ar/'
),
(
  'estudiantes',
  'enlace',
  'POSGRADO',
  'Información sobre carreras de posgrado, especializaciones y maestrías de la Universidad Nacional de Moreno.',
  ARRAY['posgrado', 'maestría', 'especialización', 'formación continua'],
  NULL,
  NULL,
  '/posgrado.webp',
  'http://www.unm.edu.ar/index.php/carreras/posgrado'
),
(
  'estudiantes',
  'enlace',
  'BIBLIOTECA Y CENTRO DE DOCUMENTACIÓN',
  'Catálogo en línea de la biblioteca universitaria. Búsqueda de libros, revistas, tesis y otros recursos bibliográficos.',
  ARRAY['biblioteca', 'libros', 'catálogo', 'recursos'],
  NULL,
  NULL,
  '/biblioteca.webp',
  'http://biblioteca.unm.edu.ar/cgi-bin/koha/opac-main.pl'
),
(
  'estudiantes',
  'enlace',
  'BANCO DE ASIGNATURAS',
  'Repositorio con información detallada de todas las asignaturas de las carreras de la UNM: programas, bibliografía y contenidos.',
  ARRAY['asignaturas', 'programas', 'materias', 'contenidos'],
  NULL,
  NULL,
  '/banco-asignaturas.webp',
  'http://asignaturas.unm.edu.ar/'
),
(
  'nodocente',
  'enlace',
  'BORRAR PREINSCRIPCIÓN',
  'Sistema para anular una preinscripción realizada previamente a carreras de grado de la UNM.',
  ARRAY[],
  NULL,
  NULL,
  NULL,
  'http://borrar-preinscripcion.unm.edu.ar/'
),
(
  'nodocente',
  'enlace',
  'PREINSCRIPCIÓN',
  'Sistema de preinscripción online para aspirantes a carreras de grado de la Universidad Nacional de Moreno.',
  ARRAY[],
  NULL,
  NULL,
  NULL,
  'https://preinscripcion.unm.edu.ar/preinscripcion/grado/?__o='
),
-- ============ INTERNOS ============
(
  'nodocente',
  'interno',
  'SOLICITUD DE TÍTULOS',
  NULL,
  ARRAY[]::text[],
  '[{"url": "https://forms.gle/LibNsDSZnxcmsXUv9", "label": "Formulario", "tipo": "formulario"}]'::jsonb,
  '[{"url": "https://docs.google.com/spreadsheets/d/1NJ0U5hUxO32Dxe141yxRLANJHzgoXogxkf4MSHH5b2U/edit?gid=1229277479#gid=1229277479", "label": "Hoja de calculo", "tipo": "hoja_de_calculo"}]'::jsonb,
  NULL,
  NULL
),
(
  'nodocente',
  'interno',
  'CAMBIO DE INSTITUCIÓN',
  NULL,
  ARRAY[]::text[],
  '[{"url": "https://forms.gle/hGVD9xY4fu3KA3oW8", "label": "Formulario", "tipo": "formulario"}]'::jsonb,
  '[{"url": "https://docs.google.com/spreadsheets/d/1vhw_eXkmaC_NfCSadUv4aDA9Ti97zFVEHUfVgGWomPo/edit?gid=2043766057#gid=2043766057", "label": "Hoja de calculo", "tipo": "hoja_de_calculo"}]'::jsonb,
  NULL,
  NULL
),
(
  'nodocente',
  'interno',
  'CAMBIO/SIMULTANEIDAD DE CARRERA',
  NULL,
  ARRAY[]::text[],
  '[{"url": "https://forms.gle/2nEuygSB767QGjN19", "label": "Formulario", "tipo": "formulario"}]'::jsonb,
  '[{"url": "https://docs.google.com/spreadsheets/d/1kPfT80iUlQc0blh8ZcYBHEhU8kxNgnTITpyjQyxA51k/edit?gid=1950064011#gid=1950064011", "label": "Hoja de calculo", "tipo": "hoja_de_calculo"}]'::jsonb,
  NULL,
  NULL
),
(
  'nodocente',
  'interno',
  'REPORTE ESTUDIANTES SIN ANALÍTICO',
  NULL,
  ARRAY[]::text[],
  NULL,
  '[{"url": "https://docs.google.com/spreadsheets/d/1LeZ9HxFV4yPuhKnN-cMS5Fbarr-e1ZORcfvMrOa-xC8/edit?gid=1205947732#gid=1205947732", "label": "Hoja de calculo", "tipo": "hoja_de_calculo"}]'::jsonb,
  NULL,
  NULL
),
(
  'nodocente',
  'interno',
  'REPORTE ESTUDIANTES SIN FOTO',
  NULL,
  ARRAY[]::text[],
  NULL,
  '[{"url": "https://docs.google.com/spreadsheets/d/1sME60px2GIfR8xhZqtaNkd7vlM7RQs1fW4vh0VoRJWE/edit?gid=1205947732#gid=1205947732", "label": "Hoja de calculo", "tipo": "hoja_de_calculo"}]'::jsonb,
  NULL,
  NULL
),
(
  'nodocente',
  'interno',
  'SOLICITUD DE EXIMICIÓN',
  NULL,
  ARRAY[]::text[],
  '[{"url": "https://forms.gle/SDwGKa5MhaTPQsNj7", "label": "Formulario", "tipo": "formulario"}]'::jsonb,
  '[{"url": "https://docs.google.com/spreadsheets/d/16Xi5I6X-ngeXlVjyhzRMc4IV96v1PuefxZ3QkMS1T0Q/edit?gid=809197868#gid=809197868", "label": "Hoja de calculo", "tipo": "hoja_de_calculo"}]'::jsonb,
  NULL,
  NULL
),
(
  'nodocente',
  'interno',
  'CORREO INSTITUCIONAL',
  NULL,
  ARRAY[]::text[],
  '[{"url": "https://docs.google.com/forms/d/e/1FAIpQLSf9dZIMjBg9kDe6Brx_VZYR-vMcOKlKvTotTwo4nVjazj4u2w/viewform", "label": "Formulario", "tipo": "formulario"}]'::jsonb,
  '[{"url": "https://docs.google.com/spreadsheets/d/1jtweVUEms_qL4XusogHM4CpeDRn4xcRCA5JT2Byhc00/edit?gid=1932031335#gid=1932031335", "label": "Hoja de calculo", "tipo": "hoja_de_calculo"}]'::jsonb,
  NULL,
  NULL
),
(
  'nodocente',
  'interno',
  'TRÁMITE DE EQUIVALENCIAS',
  NULL,
  ARRAY[]::text[],
  NULL,
  '[{"url": "https://docs.google.com/spreadsheets/d/11rKA_dek5sI1mg6yjuvg3QNqmvXMb3P_hrqKM5nEfCU/edit?gid=1393828240#gid=1393828240", "label": "Hoja de calculo", "tipo": "hoja_de_calculo"}]'::jsonb,
  NULL,
  NULL
),
(
  'nodocente',
  'interno',
  'SOLICITUD DE EQUIVALENCIAS',
  NULL,
  ARRAY[]::text[],
  '[{"url": "https://forms.gle/evRpvskzsTytFEdUA", "label": "Formulario", "tipo": "formulario"}]'::jsonb,
  '[{"url": "https://docs.google.com/spreadsheets/d/13-Pba7x59t7rDWlwMOo88KG9OjqLExOwlK8RlZEGZ3E/edit?gid=1841912448#gid=1841912448", "label": "Hoja de calculo", "tipo": "hoja_de_calculo"}]'::jsonb,
  NULL,
  NULL
),
(
  'nodocente',
  'interno',
  'SOLICITUD DE EXIMICIÓN DEL COPRUN',
  NULL,
  ARRAY[]::text[],
  '[{"url": "https://forms.gle/RvoKihFSBXnYH28h7", "label": "Formulario", "tipo": "formulario"}]'::jsonb,
  '[{"url": "https://docs.google.com/spreadsheets/d/16Xi5I6X-ngeXlVjyhzRMc4IV96v1PuefxZ3QkMS1T0Q/edit?gid=809197868#gid=809197868", "label": "Hoja de calculo", "tipo": "hoja_de_calculo"}]'::jsonb,
  NULL,
  NULL
),
(
  'nodocente',
  'interno',
  'FORMULARIOS PARA DESCARGAR',
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
  NULL,
  NULL,
  NULL
),
(
  'nodocente',
  'interno',
  'MODELOS DE RESPUESTA PARA CORREOS',
  NULL,
  ARRAY[]::text[],
  NULL,
  NULL,
  NULL,
  NULL
),
(
  'nodocente',
  'interno',
  'BEDELÍA',
  NULL,
  ARRAY[]::text[],
  '[
    {"url": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRTINU4dgA4Qc_i0xQ7rTS2LI3vBjqLOmBPNQ3favIXmKA0WDlcm8YUMGl5ZjQ8uQ/pubhtml?urp=gmail_link", "label": "asignaturas dcayt", "tipo": "hoja_de_calculo"},
    {"url": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRIeco8T34I669MQ5Q3fyeumboxZyzwSL6ZpkB-o2E0AIQoxPqYAgqxK3BtfDuRnw/pubhtml?urp=gmail_link", "label": "asignaturas dceyj", "tipo": "hoja_de_calculo"},
    {"url": "https://docs.google.com/spreadsheets/d/e/2PACX-1vTUwm-M6KVB94IbNzxbCzTLvYhuSIaTW8ah4-iiSvpjwtQUqeYHYJFhQfXXzmBPzA/pubhtml?urp=gmail_link", "label": "asignaturas dhycs", "tipo": "hoja_de_calculo"},
    {"url": "https://docs.google.com/spreadsheets/u/2/d/e/2PACX-1vRA2lyxbmH1sP8tAqCCauI8UOlBzrH7MbxQJk09ht6wA-Icyy26_NPGhchmr6oFzQ/pubhtml?gid=1276171040&single=true&urp=gmail_link", "label": "examenes dcayt", "tipo": "hoja_de_calculo"},
    {"url": "https://docs.google.com/spreadsheets/u/2/d/e/2PACX-1vRA2lyxbmH1sP8tAqCCauI8UOlBzrH7MbxQJk09ht6wA-Icyy26_NPGhchmr6oFzQ/pubhtml?gid=258106575&single=true&urp=gmail_link", "label": "examenes dceyj", "tipo": "hoja_de_calculo"},
    {"url": "https://docs.google.com/spreadsheets/u/2/d/e/2PACX-1vRA2lyxbmH1sP8tAqCCauI8UOlBzrH7MbxQJk09ht6wA-Icyy26_NPGhchmr6oFzQ/pubhtml?gid=1874348986&single=true&urp=gmail_link", "label": "examenes dhycs", "tipo": "hoja_de_calculo"},
    {"url": "https://docs.google.com/spreadsheets/d/1f35VmeL0453XlAgdqr-Du9oqUuVtJVUt/edit?gid=1137066258#gid=1137066258", "label": "bedelia coprun y examenes", "tipo": "hoja_de_calculo"},
    {"url": "https://docs.google.com/spreadsheets/d/1f35VmeL0453XlAgdqr-Du9oqUuVtJVUt/edit?gid=1137066258#gid=1137066258", "label": "bedelia 1er cuatrimestre", "tipo": "hoja_de_calculo"},
    {"url": "https://docs.google.com/spreadsheets/d/1f35VmeL0453XlAgdqr-Du9oqUuVtJVUt/edit?gid=1137066258#gid=1137066258", "label": "bedelia 2do cuatrimestre", "tipo": "hoja_de_calculo"}
  ]'::jsonb,
  NULL,
  NULL,
  NULL
);
