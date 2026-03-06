-- Crear tablas para edificios y aulas, e insertar datos base.

BEGIN;

CREATE TABLE IF NOT EXISTS public.edificios (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL,
  imagen TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS public.edificios_aulas (
  id SERIAL PRIMARY KEY,
  edificio_id INTEGER NOT NULL REFERENCES public.edificios(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL
);

TRUNCATE TABLE public.edificios_aulas, public.edificios RESTART IDENTITY;

INSERT INTO public.edificios (nombre, color, imagen) VALUES
('Dorrego', 'verde', 'img/dorrego.png'),
('Daract I', 'rojo', 'img/daract1.png'),
('Daract II', 'naranja', 'img/daract2.png'),
('Histórico', 'gris', 'img/historico.png');

-- Dorrego
INSERT INTO public.edificios_aulas (edificio_id, nombre)
SELECT e.id, v.aula
FROM public.edificios e
CROSS JOIN (VALUES
  ('1 DORREGO'), ('2 DORREGO'), ('3 DORREGO'), ('4 DORREGO'), ('5 DORREGO'),
  ('6 DORREGO'), ('7 DORREGO'), ('8 DORREGO'), ('9 DORREGO'), ('10 DORREGO'),
  ('11 DORREGO'), ('12 DORREGO'), ('13 DORREGO'), ('14 DORREGO'), ('15 DORREGO'),
  ('16 DORREGO'), ('17 DORREGO'), ('18 DORREGO'), ('19 DORREGO')
) AS v(aula)
WHERE e.nombre = 'Dorrego';

-- Daract I
INSERT INTO public.edificios_aulas (edificio_id, nombre)
SELECT e.id, v.aula
FROM public.edificios e
CROSS JOIN (VALUES
  ('1 DARACT I'), ('2 DARACT I'), ('3 DARACT I'), ('4 DARACT I'), ('5 DARACT I'),
  ('6 DARACT I'), ('7 DARACT I'), ('8 DARACT I'), ('9 DARACT I'), ('10 DARACT I'),
  ('11 DARACT I'), ('12 DARACT I'), ('13 DARACT I'), ('14 DARACT I'), ('15 DARACT I'),
  ('16 DARACT I'), ('17 DARACT I'), ('18 DARACT I'), ('19 DARACT I')
) AS v(aula)
WHERE e.nombre = 'Daract I';

-- Daract II
INSERT INTO public.edificios_aulas (edificio_id, nombre)
SELECT e.id, v.aula
FROM public.edificios e
CROSS JOIN (VALUES
  ('1 DARACT II'), ('2 DARACT II'), ('3 DARACT II'), ('4 DARACT II'), ('5 DARACT II'),
  ('6 DARACT II'), ('7 DARACT II'), ('8 DARACT II'), ('9 DARACT II'), ('10 DARACT II'),
  ('11 DARACT II'), ('12 DARACT II'), ('13 DARACT II'), ('14 DARACT II'), ('15 DARACT II'),
  ('16 DARACT II'), ('17 DARACT II'), ('18 DARACT II'), ('19 DARACT II')
) AS v(aula)
WHERE e.nombre = 'Daract II';

-- Histórico
INSERT INTO public.edificios_aulas (edificio_id, nombre)
SELECT e.id, v.aula
FROM public.edificios e
CROSS JOIN (VALUES
  ('A001'), ('A002'), ('A003'), ('B001'), ('B002'), ('B101'), ('C001'),
  ('C201'), ('D001'), ('E001'), ('F001'), ('F004'), ('G001'), ('H001'),
  ('H201B'), ('I001'), ('J001'), ('J101'), ('K001'), ('P005'), ('P007')
) AS v(aula)
WHERE e.nombre = 'Histórico';

COMMIT;
