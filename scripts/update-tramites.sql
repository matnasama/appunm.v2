-- Eliminar trámites existentes
DELETE FROM items WHERE categoria = 'tramite';

-- Insertar nuevos trámites
INSERT INTO items (categoria, titulo, descripcion, tags, enlaces, datos_especificos) VALUES
(
  'tramite',
  'Cambio o Simultaneidad de Carreras',
  'Reglamento de Alumnos - artículos 16 y 17.

Si sos alumno de la UNM y querés cambiarte de carrera o cursar simultáneamente otra.

En el Calendario Académico publicado en nuestra web vas a encontrar las fechas en las cuales podés dar inicio al trámite para el próximo cuatrimestre.

Para solicitar un cambio o simultaneidad* de carrera tenés que completar el siguiente formulario virtual para dejar registro y subir la documentación (DNI y Certificado Analítico).

*La solicitud de cursado simultaneo de carreras, requerirá que el alumno cuente con al menos el 25% (veinticinco por ciento) de las asignaturas aprobadas en la carrera en la que se encuentre inscripto al momento de su solicitud',
  ARRAY['carrera', 'cambio', 'simultaneidad', 'formulario'],
  '[{"url": "https://forms.gle/4jaJm6jonDgAv9sA6", "label": "Ir al formulario", "tipo": "formulario"}]'::jsonb,
  '{}'::jsonb
),
(
  'tramite',
  'Presentar Equivalencias en Otra Institución',
  'Los estudiantes o ex estudiantes que requieran documentación para solicitar equivalencias en otra institución, dependiendo de los requerimientos de la misma.

Deberán realizar la solicitud a través del formulario web que encontrarán al final.

Una vez finalizado el trámite, tu documentación será emitida de distinta manera, dependiendo del formato en el que la hayas pedido al completar el formulario.

• En FORMATO PAPEL te notificaremos a través de tu correo electrónico para que puedas retirar la documentación.

• En FORMATO DIGITAL te enviaremos la documentación al correo electrónico declarado en el formulario.

La realización de este trámite NO AFECTA a tu condición como alumno/a regular en la institución.
Tené en cuenta que el trámite puede demorar de 20 a 30 días.',
  ARRAY['equivalencias', 'documentación', 'formulario', 'otra institución'],
  '[{"url": "https://forms.gle/bB7Z5nMt6JefdhDJA", "label": "Ir al formulario", "tipo": "formulario"}]'::jsonb,
  '{}'::jsonb
),
(
  'tramite',
  'Certificado de Examen',
  'Los alumnos que necesiten constancias de haber rendido examen.

A través del siguiente enlace podrán descargar el modelo de Certificado de Examen.

Recordá que dicho certificado tenés que presentarlo en el Departamento de Alumnos completo con firma y aclaración del docente para que pueda ser certificado (sellado)*.

Las constancias se certifican en el Departamento de Alumnos de lunes a viernes de 9 a 19hs.

(*)Las prácticas de las asignaturas TALLER de la carrera Licenciatura Trabajo Social se certifican en el Departamento de Humanidades y Ciencias Sociales.',
  ARRAY['examen', 'certificado', 'constancia', 'descargar'],
  '[{"url": "https://drive.google.com/file/d/1SGe8080Igdsz7QeH_o-Twjtblmdtj-8t/view?usp=drive_link", "label": "Descargar modelo", "tipo": "descarga"}]'::jsonb,
  '{}'::jsonb
),
(
  'tramite',
  'Solicitud de Equivalencias',
  'Reglamento de Alumnos - artículos 32 al 39
RÉGIMEN DE EQUIVALENCIAS

Para solicitar equivalencias necesitás pedir en la institución donde estudiaste la documentación enumerada en el artículo 33 del Reglamento de Alumnos.

Una vez que tenés la documentación en tu poder, vas a descargar el formulario que se encuentra al final de la página, completarlo y enviarlo al departamento de tu carrera para solicitar la autorización.

En el departamento de tu carrera podrás consultar acerca de las asignaturas que puedan ser equivalentes con las de la carrera que cursaste.

Una vez autorizado vas a presentarlo junto con la documentación completa en el Departamento de Alumnos para dar comienzo a tu trámite.

ES IMPORTANTE QUE TENGAS PRESENTE QUE TU TRÁMITE DE EQUIVALENCIA NO INICIARÁ HASTA QUE NO PRESENTES TODA LA DOCUMENTACIÓN COMPLETA SEGÚN LOS REQUISITOS',
  ARRAY['equivalencias', 'formulario', 'documentación', 'requisitos'],
  '[{"url": "https://drive.google.com/file/d/1Pk52yq_refwT74nxRra7eFiGkz16ZWST/view?usp=drive_link", "label": "Descargar formulario", "tipo": "descarga"}, {"url": "https://drive.google.com/file/d/1ARmvpwAma118d4-49X9mH4772hXaPraI/view?usp=sharing", "label": "Ver requisitos", "tipo": "descarga"}]'::jsonb,
  '{}'::jsonb
),
(
  'tramite',
  'Solicitud de Títulos',
  'Antes de completar y enviar tu solicitud recordá verificar en tu historia académica el cumplimiento del 100% del requerimiento de materias aprobadas según el plan de la carrera, para el título que vas a solicitar.

Se deben encontrar todas las actividades correspondientes aprobadas y en actas cerradas, para que consten en su historial académico.

Si completás el formulario no teniendo aún aprobadas la totalidad de las asignaturas necesarias para la emisión del título, se desestimará la solicitud.

En caso de corresponder, se realizarán las modificaciones de sus datos en el sistema antes de enviarte la documentación.

Completando la solicitud te otorgaremos la siguiente documentación:
• Certificado de Cumplimiento de Requisitos de Ingreso
• Certificado de Asignaturas Rendidas, que posteriormente vas a presentar al Departamento de Títulos.

Una vez finalizado el trámite remitiremos la documentación al correo que declaraste en el formulario.',
  ARRAY['título', 'egreso', 'formulario', 'certificado'],
  '[{"url": "https://docs.google.com/forms/d/e/1FAIpQLSeFFj0knk8kUkMyurBEbKcpU-uViEE4C4a6VOH-ATR2hIbYUQ/viewform", "label": "Ir al formulario", "tipo": "formulario"}]'::jsonb,
  '{}'::jsonb
),
(
  'tramite',
  'Modificación de Datos Personales en Sistema',
  'Como estudiante vas a poder cambiar o corregir datos personales, tales como NOMBRE, APELLIDO, GÉNERO o DNI.

Para ello tenés que completar el formulario correspondiente y presentarlo en el Departamento de Alumnos.

Motivos para la modificación:
• Por errores a la hora de realizar el primer registro en la UNM o por cambios en su Documento Nacional de Identidad (DNI).
• Por motivos de género sin cambio registral (Ley de Identidad de Género N° 26.743).
• Por motivos de género con cambio registral (Ley de Identidad de Género N° 26.743).

Para dar inicio al trámite tenés que acercarte personalmente con el formulario correspondiente y con tu DNI (original y fotocopia certificada por el Departamento de Mesa de Entrada).

El Departamento de Mesa de Entrada tiene atención de lunes a viernes en la franja horaria de 9 a 16hs.',
  ARRAY['datos personales', 'DNI', 'género', 'formulario', 'modificación'],
  '[{"url": "https://drive.google.com/file/d/1YMorHkwqU3lQpbm75NYTrVrNXThdjKxZ/view?usp=sharing", "label": "Formulario cambio de datos", "tipo": "descarga"}, {"url": "https://drive.google.com/file/d/12iSBVln7RpQOZsjnC_4TtPLSmRrW4Ljx/view?usp=sharing", "label": "Formulario cambio de género", "tipo": "descarga"}, {"url": "https://drive.google.com/file/d/1cWM-KR92e40neQFxo2OZOiEQZ0iDH0qq/view?usp=sharing", "label": "Formulario género sin cambio registral", "tipo": "descarga"}]'::jsonb,
  '{}'::jsonb
),
(
  'tramite',
  'Solicitar Constancias en SIU-Guaraní',
  'Podés solicitar certificados de alumno regular o de asignaturas rendidas a través de SIU-GUARANÍ.

A continuación podrás ver los pasos para generar las constancias:

1. Ingresá dentro de la pestaña TRÁMITES dentro de tu sesión de SIU-GUARANÍ.
2. Una vez que ingresás en Solicitar Constancias y Certificados tenés que ingresar en la opción NUEVA SOLICITUD.
3. Seleccioná que tipo de constancia querés solicitar y completá los datos obligatorios marcados con (*).
4. El ícono color rojo que se encuentra en la derecha es un archivo PDF y al seleccionarlo iniciarás la descarga de la constancia generada.

¿Qué pasa si no se descarga mi constancia?
Normalmente puede producirse un error en la descarga de las constancias, en el cual la descarga nunca finaliza. Este error se produce solo en el navegador Google Chrome. Intentá realizar la descarga de las constancias desde otro navegador (Mozilla Firefox, Safari, Microsoft Edge, etc).',
  ARRAY['constancia', 'SIU Guaraní', 'alumno regular', 'certificado'],
  '[]'::jsonb,
  '{}'::jsonb
),
(
  'tramite',
  'Constancia de Alumno Regular Específica',
  'Para solicitar constancias de Alumno Regular específicas donde se indican días y horarios de cursada de cada una de tus asignaturas, tenés que descargar el siguiente formulario y presentarlo completo personalmente en el Departamento de Alumnos.',
  ARRAY['constancia', 'alumno regular', 'horarios', 'formulario'],
  '[{"url": "https://drive.google.com/file/d/1ZtmB62j1dMmiAVSTFrqMazxQIzAXObxr/view?usp=sharing", "label": "Descargar formulario", "tipo": "descarga"}]'::jsonb,
  '{}'::jsonb
),
(
  'tramite',
  'Correo Institucional',
  '¿Cómo hago para solicitar mi correo institucional?

Para solicitar tu correo institucional tenés que completar el formulario web que encontrarás al final de la página.

• Una vez creado te va a llegar un correo con la confirmación de tu nueva cuenta.
• En el correo que te va a llegar vas a encontrar un enlace para confirmar la cuenta (tenés 48hs para confirmar la cuenta desde el momento en que te llega el mensaje).
• Si no confirmaste la cuenta a tiempo podes escribirnos a alumnos@unm.edu.ar dando aviso con la misma información solicitada en el formulario.',
  ARRAY['correo', 'email', 'institucional', 'formulario'],
  '[{"url": "https://forms.gle/XpjiGpqE8XwzCWbH6", "label": "Ir al formulario", "tipo": "formulario"}]'::jsonb,
  '{"contacto": "alumnos@unm.edu.ar"}'::jsonb
),
(
  'tramite',
  'Promedio Histórico de Carrera',
  '¿Cómo hago para solicitar el Promedio Histórico de mi carrera?

Si necesitás solicitar la Certificación del Promedio Histórico de tu carrera tenés que comunicarte con alumnos@unm.edu.ar.

Consigná tus datos en la consulta (nombre y apellido, DNI, carrera).

Becas de Estímulo a las Vocaciones Científicas (EVC-CIN)
La Certificación del Promedio Histórico para presentar en las Becas de Estímulo a las Vocaciones Científicas (EVC-CIN) tenés que solicitarla a sec.investigacion@unm.edu.ar.',
  ARRAY['promedio', 'certificación', 'becas', 'EVC-CIN'],
  '[]'::jsonb,
  '{"contacto_alumnos": "alumnos@unm.edu.ar", "contacto_becas": "sec.investigacion@unm.edu.ar"}'::jsonb
);
