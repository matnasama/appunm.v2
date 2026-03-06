-- Crear tabla 'carreras' y poblarla con las carreras de DCAYT
CREATE TABLE IF NOT EXISTS public.carreras (
  id SERIAL PRIMARY KEY,
  carrera text NOT NULL,
  codigo text,
  departamento text,
  codigo_departamento text,
  plan_de_estudios text,
  organizacion_curricular text,
  correo text
);

BEGIN;
INSERT INTO public.carreras (carrera, codigo, departamento, codigo_departamento, plan_de_estudios, organizacion_curricular, correo) VALUES
('Arquitectura', 'ARQ', 'Departamento de Ciencias Aplicadas y Tecnología', 'DCAYT', 'https://www.unm.edu.ar/files/ARQUITECTURA_UNM_2019_versin_difusin_20240404.pdf', 'https://www.unm.edu.ar/files/ARQUITECTURA_UNM_2019_versin_difusin_20240404.pdf', 'arquitectura@unm.edu.ar'),
('Licenciatura en Biotecnología', 'BIO', 'Departamento de Ciencias Aplicadas y Tecnología', 'DCAYT', 'https://www.unm.edu.ar/files/LICENCIATURA_EN_BIOTECNOLOGIA_UNM_2022_versin_difusin_20240404.pdf', 'https://www.unm.edu.ar/files/LICENCIATURA_EN_BIOTECNOLOGIA_UNM_2022_versin_difusin_20240404.pdf', 'biotecnologia@unm.edu.ar'),
('Diseño en Comunicación Visual', 'CVI', 'Departamento de Ciencias Aplicadas y Tecnología', 'DCAYT', 'https://www.unm.edu.ar/files/DISEO_COMUNICACION_VISUAL_UNM_2023_versin_difusin_20240404.pdf', 'https://www.unm.edu.ar/files/DISEO_COMUNICACION_VISUAL_UNM_2023_versin_difusin_20240404.pdf', 'dcayt@unm.edu.ar'),
('Diseño de Indumentaria', 'DUM', 'Departamento de Ciencias Aplicadas y Tecnología', 'DCAYT', 'https://www.unm.edu.ar/files/INDUMENTARIA23.pdf', 'https://www.unm.edu.ar/files/INDUMENTARIA23.pdf', 'dcayt@unm.edu.ar'),
('Diseño Industrial', 'IND', 'Departamento de Ciencias Aplicadas y Tecnología', 'DCAYT', 'https://www.unm.edu.ar/files/DISEO_INDUSTRIAL_UNM_2023_versin_difusin_20240404.pdf', 'https://www.unm.edu.ar/files/DISEO_INDUSTRIAL_UNM_2023_versin_difusin_20240404.pdf', 'dcayt@unm.edu.ar'),
('Diseño Multimedial', 'MUL', 'Departamento de Ciencias Aplicadas y Tecnología', 'DCAYT', 'https://www.unm.edu.ar/files/DISEO_MULTIMEDIAL_UNM_2023_versin_difusin_20240404.pdf', 'https://www.unm.edu.ar/files/DISEO_MULTIMEDIAL_UNM_2023_versin_difusin_20240404.pdf', 'dcayt@unm.edu.ar'),
('Ingeniería en Electrónica', 'IEL', 'Departamento de Ciencias Aplicadas y Tecnología', 'DCAYT', 'https://www.unm.edu.ar/files/INGENIERIA_EN_ELECTRONICA_UNM_2017_3_orientaciones_versin_difusin_20240404.pdf', 'https://www.unm.edu.ar/files/INGENIERIA_EN_ELECTRONICA_UNM_2017_3_orientaciones_versin_difusin_20240404.pdf', 'electronica@unm.edu.ar'),
('Licenciatura en Gestión Ambiental', 'LGA', 'Departamento de Ciencias Aplicadas y Tecnología', 'DCAYT', 'https://www.unm.edu.ar/files/LICENCIATURA_EN_GESTION_AMBIENTAL_UNM_2015_versin_difusin_20240404.pdf', 'https://www.unm.edu.ar/files/LICENCIATURA_EN_GESTION_AMBIENTAL_UNM_2015_versin_difusin_20240404.pdf', 'gestionambiental@unm.edu.ar')
ON CONFLICT DO NOTHING;
COMMIT;

-- Insertar carreras del Departamento de Ciencias Económicas y Jurídicas (DCEYJ)
BEGIN;
INSERT INTO public.carreras (carrera, codigo, departamento, codigo_departamento, plan_de_estudios, organizacion_curricular, correo) VALUES
('Licenciatura en Relaciones del Trabajo', 'LRT', 'Departamento de Ciencias Económicas y Jurídicas', 'DCEYJ', '/files/LICENCIATURA_EN_RELACIONES_DEL_TRABAJO_UNM_2015_versin_difusin_20240404.pdf', '/index.php/carreras/economia-y-administracion/licenciatura-en-relaciones-del-trabajo/2-uncategorised/2076-organizacion-curricular-licenciatura-en-relaciones-del-trabajo', 'relacionesdeltrabajo@unm.edu.ar'),
('Licenciatura en Administración', 'LAD', 'Departamento de Ciencias Económicas y Jurídicas', 'DCEYJ', '/files/LICENCIATURA_EN_ADMINISTRACION_UNM_2015_versin_difusin_20240404.pdf', '/index.php/carreras/economia-y-administracion/licenciatura-en-administracion/2-uncategorised/2078-organizacion-curricular-licenciatura-en-administracion', 'administracion@unm.edu.ar'),
('Licenciatura en Economía', 'LEC', 'Departamento de Ciencias Económicas y Jurídicas', 'DCEYJ', '/files/LICENCIATURA_EN_ECONOMIA_UNM_2015_versin_difusin_20240404.pdf', '/index.php/carreras/economia-y-administracion/licenciatura-en-economia/2-uncategorised/2080-organizacion-curricular-licenciatura-en-economia', 'economia@unm.edu.ar'),
('Contador Público Nacional', 'CPN', 'Departamento de Ciencias Económicas y Jurídicas', 'DCEYJ', '/files/CONTADOR_PUBLICO_NACIONAL_UNM_2015_versin_difusin_20240404.pdf', '/index.php/carreras/economia-y-administracion/contador-publico-nacional/2-uncategorised/2082-organizacion-curricular-contador-publico-nacional', 'contadorpublico@unm.edu.ar'),
('Abogacía', 'ABG', 'Departamento de Ciencias Económicas y Jurídicas', 'DCEYJ', '/files/ABOGACIA_UNM_2023_versin_difusin_20240404.pdf', '/index.php/carreras/economia-y-administracion/abogacia-proximamente/2-uncategorised/2084-organizacion-curricular-abogacia', 'dceyj@unm.edu.ar'),
('Ciclo Comun - LAD - LRT- LEC - CPN', 'CICLO_COMUN', 'Departamento de Ciencias Económicas y Jurídicas', 'DCEYJ', NULL, NULL, 'dceyj@unm.edu.ar')
ON CONFLICT DO NOTHING;
COMMIT;

-- Insertar carreras del Departamento de Humanidades y Ciencias Sociales (DHYCS)
BEGIN;
INSERT INTO public.carreras (carrera, codigo, departamento, codigo_departamento, plan_de_estudios, organizacion_curricular, correo) VALUES
('Licenciatura en Trabajo Social', 'LTS', 'Departamento de Humanidades y Ciencias Sociales', 'DHYCS', '/files/LICENCIATURA_EN_TRABAJO_SOCIAL_UNM_2016_versin_difusin_20240404.pdf', '/index.php/carreras/humanidades-y-ciencias-sociales/licenciatura-en-trabajo-social/2-uncategorised/2086-organizacion-curricular-licenciatura-en-trabajo-social', 'trabajosocial@unm.edu.ar'),
('Licenciatura en Comunicación Social', 'LCS', 'Departamento de Humanidades y Ciencias Sociales', 'DHYCS', '/files/LICENCIATURA_EN_COMUNICACION_SOCIAL_UNM_2016_2_orientaciones_versin_difusin_20240404.pdf', '/index.php/carreras/humanidades-y-ciencias-sociales/licenciatura-en-comunicacion-social/2-uncategorised/2088-organizacion-curricular-licenciatura-en-comunicacion-social', 'comunicacionsocial@unm.edu.ar'),
('Licenciatura en Educación Secundaria', 'LES', 'Departamento de Humanidades y Ciencias Sociales', 'DHYCS', '/files/LICENCIATURA_EN_EDUCACION_SECUNDARIA_CL_UNM_2013_versin_difusin_20240404.pdf', '/index.php/carreras/humanidades-y-ciencias-sociales/licenciatura-en-educacion-secundaria/2-uncategorised/2090-organizacion-curricular-licenciatura-en-educacion-secundaria', 'areaeducacion@unm.edu.ar'),
('Licenciatura en Educación Inicial', 'LEI', 'Departamento de Humanidades y Ciencias Sociales', 'DHYCS', '/files/LICENCIATURA_EN_EDUCACION_INICIAL_CL_UNM_2022_versin_difusin_20240404.pdf', '/index.php/carreras/humanidades-y-ciencias-sociales/licenciatura-en-educacion-inicial/2-uncategorised/2092-organizacion-curricular-licenciatura-en-educacion-inicial', 'areaeducacion@unm.edu.ar')
ON CONFLICT DO NOTHING;
COMMIT;
