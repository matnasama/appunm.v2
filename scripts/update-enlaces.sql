-- Delete existing enlaces
DELETE FROM items WHERE categoria = 'enlace';

-- Insert new enlaces from JSON
INSERT INTO items (categoria, titulo, descripcion, tags, enlaces, datos_especificos) VALUES
(
  'enlace',
  'Gestión Online',
  'Sistema de gestión académica SIU Guaraní para inscripciones, consulta de notas, estado académico y trámites administrativos.',
  ARRAY['guaraní', 'inscripción', 'notas', 'académico'],
  '[{"url": "http://gestiononline.unm.edu.ar/unm3w/", "label": "Acceder a Gestión Online", "tipo": "principal"}]'::jsonb,
  '{"imagen": "/guarani.webp"}'::jsonb
),
(
  'enlace',
  'Campus Virtual',
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
  '{"email": "campusvirtual@unm.edu.ar", "imagen": "/campusvirtual.webp"}'::jsonb
),
(
  'enlace',
  'Instituto Tecnológico UNM (ITUNM)',
  'Portal del Instituto Tecnológico de la Universidad Nacional de Moreno. Formación técnica y tecnológica.',
  ARRAY['itunm', 'tecnológico', 'formación técnica'],
  '[{"url": "http://itunm.unm.edu.ar/", "label": "Acceder al ITUNM", "tipo": "principal"}]'::jsonb,
  '{"email": "itunm@unm.edu.ar", "imagen": "/itunm.webp"}'::jsonb
),
(
  'enlace',
  'Posgrado',
  'Información sobre carreras de posgrado, especializaciones y maestrías de la Universidad Nacional de Moreno.',
  ARRAY['posgrado', 'maestría', 'especialización', 'formación continua'],
  '[{"url": "http://www.unm.edu.ar/index.php/carreras/posgrado", "label": "Ver carreras de Posgrado", "tipo": "principal"}]'::jsonb,
  '{"email": "posgrado@unm.edu.ar", "imagen": "/posgrado.webp"}'::jsonb
),
(
  'enlace',
  'Biblioteca y Centro de Documentación',
  'Catálogo en línea de la biblioteca universitaria. Búsqueda de libros, revistas, tesis y otros recursos bibliográficos.',
  ARRAY['biblioteca', 'libros', 'catálogo', 'recursos'],
  '[{"url": "http://biblioteca.unm.edu.ar/cgi-bin/koha/opac-main.pl", "label": "Acceder al Catálogo", "tipo": "principal"}]'::jsonb,
  '{"email": "biblioteca@unm.edu.ar", "imagen": "/biblioteca.webp"}'::jsonb
),
(
  'enlace',
  'Banco de Asignaturas',
  'Repositorio con información detallada de todas las asignaturas de las carreras de la UNM: programas, bibliografía y contenidos.',
  ARRAY['asignaturas', 'programas', 'materias', 'contenidos'],
  '[{"url": "http://asignaturas.unm.edu.ar/", "label": "Acceder al Banco de Asignaturas", "tipo": "principal"}]'::jsonb,
  '{"imagen": "/banco-asignaturas.webp"}'::jsonb
),
(
  'enlace',
  'Borrar Preinscripción',
  'Sistema para anular una preinscripción realizada previamente a carreras de grado de la UNM.',
  ARRAY['preinscripción', 'anular', 'ingreso'],
  '[{"url": "http://borrar-preinscripcion.unm.edu.ar/", "label": "Borrar Preinscripción", "tipo": "principal"}]'::jsonb,
  '{}'::jsonb
),
(
  'enlace',
  'Preinscripción',
  'Sistema de preinscripción online para aspirantes a carreras de grado de la Universidad Nacional de Moreno.',
  ARRAY['preinscripción', 'ingreso', 'aspirantes', 'inscripción'],
  '[{"url": "https://preinscripcion.unm.edu.ar/preinscripcion/grado/?__o=", "label": "Iniciar Preinscripción", "tipo": "principal"}]'::jsonb,
  '{}'::jsonb
);
