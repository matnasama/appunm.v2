-- Delete existing consulta items
DELETE FROM items WHERE categoria = 'consulta';

-- Insert new consulta items
INSERT INTO items (categoria, titulo, descripcion, tags, enlaces, datos_especificos) VALUES
(
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
  '[]'::jsonb,
  '{}'::jsonb
),
(
  'consulta',
  'CAMBIO DE COMISIÓN',
  'En caso de haber obtenido la inscripción aceptada en una asignatura/comisión, donde finalmente no puedas o no deseas cursar; deberás darte de baja en la comisión en cuestión, antes de finalizar el segundo llamado de inscripción a asignaturas, e inscribirte en la comisión que sea de tu interés. Si tu consulta o duda surge el último día de inscripción o apenas finalizado el último llamado deberás realizar tu consulta al departamento académico de tu carrera.',
  ARRAY['comisión', 'cambio', 'inscripción'],
  '[]'::jsonb,
  '{}'::jsonb
),
(
  'consulta',
  'INSCRIPCIÓN A EXÁMENES FINALES',
  'La inscripción a exámenes finales se realiza en 3(tres) momentos del año. Turnos: Febrero-Marzo / Julio / Diciembre.
Los finales pueden rendirse de manera REGULAR o LIBRE en las mismas mesas previstas para cada asignatura.
Los períodos de inscripción y desarrollo de los exámenes finales se encuentran informados en el CALENDARIO ACADÉMICO.
REGULARES: Recordá que en cada turno de finales SIEMPRE deberás inscribirte en el llamado que desees a través del SIU-Guaraní de la misma manera en que te inscribís a asignaturas y sólo podés elegir una de las mesas del turno.
LIBRES: Si cursaste una asignatura y el resultado fue: ABANDONÓ, AUSENTE o LIBRE, o NUNCA la cursaste, el sistema aceptará la inscripción al examen final en calidad de LIBRE, siempre y cuando el Plan de Estudios de tu carrera lo admita (ver en el programa de la asignatura el régimen de aprobación).
Siempre que tengas inconvenientes a la hora de realizar una inscripción podrás comunicarte con el Departamento de Alumnos antes de que finalice el período.',
  ARRAY['exámenes', 'finales', 'inscripción', 'SIU-Guaraní'],
  '[]'::jsonb,
  '{}'::jsonb
),
(
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
  '[]'::jsonb,
  '{}'::jsonb
),
(
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
  '[]'::jsonb,
  '{}'::jsonb
),
(
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
  '[]'::jsonb,
  '{}'::jsonb
),
(
  'consulta',
  'REGULARIDAD',
  '¿Cuándo pierdo la regularidad de una asignatura? ¿Cuándo puedo volver a cursar la asignatura?

Como estipula el Reglamento de Alumnos

ARTÍCULO 21.- El alumno que no hubiere aprobado su examen final en el plazo previsto en el artículo 16 y/o hubiera reprobado en 3 (tres) oportunidades su examen final, perderá la regularidad en la asignatura y deberá recursarla, con excepción de las 2 (dos) últimas unidades curriculares que pudiere adeudar de su Plan de Estudios. Esta circunstancia no afectará su inscripción y condición en relación a las obligaciones curriculares correlativas. ARTÍCULO 22.- El CONSEJO del DEPARTAMENTO ACADÉMICO correspondiente, podrá conceder una prórroga o nueva oportunidad de examen final, previa solicitud debidamente justificada del interesado y dictamen del titular de la asignatura.
En caso de la denegatoria, el interesado podrá interponer recurso por escrito ante la SECRETARÍA ACADÉMICA. (artículo modificado por el artículo 3º de la Resolución UNM-CS Nº 1.222/25) ARTÍCULO 23.- El alumno que optare por recursar una materia en condición regular, a efectos de su promoción mediante el régimen de regularidad, perderá la condición de regular en la materia obtenida con anterioridad. No se admitirá la inscripción para recursar una materia en condición regular, antes del plazo de 1 (un) año a computar desde la fecha de su regularización, con excepción de aquellos alumnos que se encuentren en condición de cursar hasta las 2 (dos) últimas obligaciones académicas para obtener el respectivo título de grado. (artículo modificado por el artículo 1º de la Resolución UNM-CS Nº 964/22)',
  ARRAY['regularidad', 'reglamento', 'examen', 'recursar'],
  '[]'::jsonb,
  '{}'::jsonb
),
(
  'consulta',
  'ACTUALIZAR DATOS DE SISTEMA',
  'Para realizar cambios de datos de contacto, tales como número telefónico o correo electrónico registrados, tenés que enviarnos un correo con una foto de tu DNI de frente y dorso, especificando la información que querés actualizar, a alumnos@unm.edu.ar.',
  ARRAY['datos', 'actualizar', 'DNI', 'contacto'],
  '[]'::jsonb,
  '{}'::jsonb
),
(
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
  '[]'::jsonb,
  '{}'::jsonb
);
