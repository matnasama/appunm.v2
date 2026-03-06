-- UNM Information Portal Database Schema
-- This script creates the items table for storing university information

-- Create enum type for categories
DO $$ BEGIN
    CREATE TYPE item_categoria AS ENUM ('tramite', 'tramites-interno', 'consulta', 'asignatura', 'carrera', 'edificio', 'enlace');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TYPE item_categoria ADD VALUE IF NOT EXISTS 'tramites-interno';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create items table
CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    categoria item_categoria NOT NULL,
    titulo VARCHAR(500) NOT NULL,
    descripcion TEXT,
    tags TEXT[] DEFAULT '{}',
    enlaces JSONB DEFAULT '[]',
    datos_especificos JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better search performance
CREATE INDEX IF NOT EXISTS idx_items_categoria ON items(categoria);
CREATE INDEX IF NOT EXISTS idx_items_tags ON items USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_items_titulo ON items USING GIN(to_tsvector('spanish', titulo));
CREATE INDEX IF NOT EXISTS idx_items_descripcion ON items USING GIN(to_tsvector('spanish', COALESCE(descripcion, '')));

-- Insert sample data for each category
INSERT INTO items (categoria, titulo, descripcion, tags, enlaces, datos_especificos) VALUES
-- Tramites
('tramite', 'Inscripción a Materias', 'Proceso para inscribirse a las materias del cuatrimestre. La inscripción se realiza a través del sistema SIU Guaraní.', ARRAY['inscripcion', 'materias', 'cuatrimestre', 'siu guarani'], '[{"url": "https://guarani.unm.edu.ar", "label": "SIU Guaraní", "tipo": "sistema"}]', '{"requisitos": ["Tener usuario en SIU Guaraní", "Estar al día con la documentación", "Haber aprobado las correlativas"], "periodo": "Febrero-Marzo / Julio-Agosto", "duracion": "1-2 días hábiles"}'),

('tramite', 'Solicitud de Certificado de Alumno Regular', 'Certificado que acredita la condición de alumno regular de la universidad. Se puede solicitar de forma online.', ARRAY['certificado', 'alumno regular', 'documentacion'], '[{"url": "https://guarani.unm.edu.ar", "label": "Solicitar Online", "tipo": "sistema"}]', '{"requisitos": ["Ser alumno regular", "Tener materias inscriptas en el año"], "tiempo_entrega": "24-48 horas", "costo": "Gratuito"}'),

('tramite', 'Equivalencias de Materias', 'Solicitud de reconocimiento de materias aprobadas en otras instituciones educativas.', ARRAY['equivalencias', 'reconocimiento', 'materias'], '[{"url": "https://unm.edu.ar/equivalencias", "label": "Formulario de Equivalencias", "tipo": "documento"}]', '{"requisitos": ["Certificado analítico de la institución de origen", "Programas de las materias a equivaler", "Constancia de regularidad o egreso"], "tiempo_resolucion": "30-60 días"}'),

-- Consultas
('consulta', 'Horarios de Atención Administrativa', 'Información sobre los horarios de atención de las distintas oficinas administrativas de la universidad.', ARRAY['horarios', 'atencion', 'administracion'], '[]', '{"horarios": {"lunes_viernes": "9:00 - 20:00", "sabados": "9:00 - 13:00"}, "ubicacion": "Edificio Principal - Planta Baja"}'),

('consulta', 'Calendario Académico 2026', 'Fechas importantes del ciclo lectivo: inicio y fin de clases, períodos de exámenes, recesos.', ARRAY['calendario', 'fechas', 'academico', '2026'], '[{"url": "https://unm.edu.ar/calendario", "label": "Ver Calendario Completo", "tipo": "documento"}]', '{"primer_cuatrimestre": {"inicio": "2026-03-16", "fin": "2026-07-04"}, "segundo_cuatrimestre": {"inicio": "2026-08-10", "fin": "2026-11-28"}, "examenes": ["Julio-Agosto", "Noviembre-Diciembre", "Febrero-Marzo"]}'),

('consulta', 'Becas Disponibles', 'Información sobre los programas de becas disponibles para estudiantes de la UNM.', ARRAY['becas', 'ayuda economica', 'progresar'], '[{"url": "https://unm.edu.ar/becas", "label": "Más Información", "tipo": "informativo"}]', '{"tipos": ["Beca Progresar", "Beca UNM", "Beca de Transporte", "Beca de Comedor"], "requisitos_generales": ["Ser alumno regular", "Cumplir con el rendimiento académico mínimo"]}'),

-- Asignaturas
('asignatura', 'Introducción a la Programación', 'Materia introductoria que aborda los fundamentos de la programación utilizando Python como lenguaje principal.', ARRAY['programacion', 'python', 'informatica', 'primer año'], '[]', '{"codigo": "INFO101", "carrera": "Licenciatura en Informática", "año": 1, "cuatrimestre": 1, "carga_horaria": 96, "correlativas": [], "docentes": ["Dr. Juan Pérez", "Lic. María García"]}'),

('asignatura', 'Matemática I', 'Análisis matemático: límites, derivadas e integrales. Fundamentos del cálculo diferencial e integral.', ARRAY['matematica', 'calculo', 'analisis', 'primer año'], '[]', '{"codigo": "MAT101", "carrera": "Múltiples carreras", "año": 1, "cuatrimestre": 1, "carga_horaria": 128, "correlativas": [], "docentes": ["Dr. Roberto Sánchez"]}'),

('asignatura', 'Base de Datos', 'Diseño, implementación y administración de bases de datos relacionales. SQL y modelado de datos.', ARRAY['base de datos', 'sql', 'informatica', 'segundo año'], '[]', '{"codigo": "INFO201", "carrera": "Licenciatura en Informática", "año": 2, "cuatrimestre": 1, "carga_horaria": 96, "correlativas": ["INFO101"], "docentes": ["Mg. Ana López"]}'),

-- Carreras
('carrera', 'Licenciatura en Informática', 'Carrera de grado orientada a formar profesionales en el desarrollo de software, sistemas de información y tecnología.', ARRAY['informatica', 'sistemas', 'programacion', 'grado'], '[{"url": "https://unm.edu.ar/carreras/informatica", "label": "Plan de Estudios", "tipo": "documento"}]', '{"duracion": "5 años", "titulo": "Licenciado/a en Informática", "modalidad": "Presencial", "departamento": "Economía y Administración", "plan_estudios": "2020"}'),

('carrera', 'Licenciatura en Administración', 'Formación integral en gestión empresarial, finanzas, marketing y recursos humanos.', ARRAY['administracion', 'empresas', 'gestion', 'grado'], '[{"url": "https://unm.edu.ar/carreras/administracion", "label": "Plan de Estudios", "tipo": "documento"}]', '{"duracion": "5 años", "titulo": "Licenciado/a en Administración", "modalidad": "Presencial", "departamento": "Economía y Administración", "plan_estudios": "2019"}'),

('carrera', 'Licenciatura en Trabajo Social', 'Carrera orientada a la intervención social, desarrollo comunitario y políticas públicas.', ARRAY['trabajo social', 'comunidad', 'social', 'grado'], '[{"url": "https://unm.edu.ar/carreras/trabajo-social", "label": "Plan de Estudios", "tipo": "documento"}]', '{"duracion": "5 años", "titulo": "Licenciado/a en Trabajo Social", "modalidad": "Presencial", "departamento": "Humanidades y Ciencias Sociales", "plan_estudios": "2018"}'),

-- Edificios
('edificio', 'Edificio Principal - Sede Central', 'Edificio principal de la universidad donde se encuentran las oficinas administrativas, aulas y biblioteca.', ARRAY['sede central', 'administracion', 'biblioteca', 'aulas'], '[{"url": "https://maps.google.com/?q=UNM+Moreno", "label": "Ver en Mapa", "tipo": "mapa"}]', '{"direccion": "Av. Bartolomé Mitre 1891, Moreno", "servicios": ["Biblioteca", "Buffet", "Fotocopiadora", "Aulas", "Laboratorios"], "horario": "Lunes a Sábado 7:00 - 23:00", "telefono": "0237-460-9300"}'),

('edificio', 'Laboratorio de Informática', 'Espacios equipados con computadoras para prácticas de las carreras de informática y otras disciplinas.', ARRAY['laboratorio', 'computadoras', 'informatica', 'practicas'], '[]', '{"ubicacion": "Edificio Principal - 2do Piso", "capacidad": 40, "equipamiento": ["40 PCs", "Proyector", "Pizarra digital"], "horario_libre": "Según disponibilidad"}'),

('edificio', 'Biblioteca Central', 'Centro de recursos bibliográficos con material impreso y digital para consulta y préstamo.', ARRAY['biblioteca', 'libros', 'estudio', 'prestamo'], '[{"url": "https://biblioteca.unm.edu.ar", "label": "Catálogo Online", "tipo": "sistema"}]', '{"ubicacion": "Edificio Principal - Planta Baja", "servicios": ["Préstamo de libros", "Sala de lectura", "Acceso a bases de datos", "Wifi"], "horario": "Lunes a Viernes 9:00 - 21:00, Sábados 9:00 - 13:00"}'),

-- Enlaces
('enlace', 'SIU Guaraní - Sistema de Gestión Académica', 'Sistema integral de gestión académica para inscripciones, consulta de notas y trámites online.', ARRAY['siu guarani', 'sistema', 'inscripciones', 'notas'], '[{"url": "https://guarani.unm.edu.ar", "label": "Acceder al Sistema", "tipo": "sistema"}]', '{"tipo_enlace": "Sistema Académico", "acceso": "Con usuario y contraseña"}'),

('enlace', 'Campus Virtual UNM', 'Plataforma de educación a distancia con materiales de estudio, foros y actividades online.', ARRAY['campus virtual', 'moodle', 'aula virtual', 'online'], '[{"url": "https://campus.unm.edu.ar", "label": "Acceder al Campus", "tipo": "sistema"}]', '{"tipo_enlace": "Plataforma Educativa", "acceso": "Con usuario y contraseña"}'),

('enlace', 'Portal de Empleo UNM', 'Bolsa de trabajo con oportunidades laborales para estudiantes y graduados de la universidad.', ARRAY['empleo', 'trabajo', 'bolsa de trabajo', 'pasantias'], '[{"url": "https://empleo.unm.edu.ar", "label": "Ver Ofertas", "tipo": "sistema"}]', '{"tipo_enlace": "Servicio", "acceso": "Público"}')

ON CONFLICT DO NOTHING;
