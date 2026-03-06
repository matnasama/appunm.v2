-- Insertar los 3 departamentos
INSERT INTO items (categoria, titulo, descripcion, tags, enlaces, datos_especificos) VALUES
(
  'departamento',
  'Departamento de Ciencias Económicas y Jurídicas',
  'El Departamento de Ciencias Económicas y Jurídicas ofrece carreras orientadas a la formación de profesionales en áreas de economía, administración, contabilidad y derecho. Prepara graduados con sólidos conocimientos teóricos y prácticos para desempeñarse en organizaciones públicas y privadas.',
  ARRAY['economía', 'administración', 'relaciones del trabajo', 'abogacía', 'contador'],
  '[]'::jsonb,
  '{}'::jsonb
),
(
  'departamento',
  'Departamento de Humanidades y Ciencias Sociales',
  'El Departamento de Humanidades y Ciencias Sociales forma profesionales en disciplinas vinculadas a las ciencias humanas y sociales. Ofrece carreras que abordan problemáticas sociales, educativas, comunicacionales y culturales con perspectiva crítica y compromiso social.',
  ARRAY['humanidades', 'ciencias sociales', 'educación', 'comunicación', 'trabajo social'],
  '[]'::jsonb,
  '{}'::jsonb
),
(
  'departamento',
  'Departamento de Ciencias Aplicadas y Tecnología',
  'El Departamento de Ciencias Aplicadas y Tecnología brinda formación en carreras tecnológicas e ingenierías. Prepara profesionales capacitados para desarrollar soluciones innovadoras en áreas como informática, biotecnología, energía y medio ambiente.',
  ARRAY['arquitectura', 'gestión ambiental', 'ingeniería', 'biotecnología', 'ciencias aplicadas', 'diseño'],
  '[]'::jsonb,
  '{}'::jsonb
);
