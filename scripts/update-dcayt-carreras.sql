-- Update Departamento de Ciencias Aplicadas y Tecnología with careers list
UPDATE items
SET 
  descripcion = 'Departamento dedicado a las carreras de tecnología, ingeniería, diseño y ciencias aplicadas de la Universidad Nacional de Moreno.',
  datos_especificos = '{
    "carreras": [
      {
        "nombre": "Arquitectura",
        "codigo": "ARQ",
        "plan_de_estudios": "https://www.unm.edu.ar/files/ARQUITECTURA_UNM_2019_versin_difusin_20240404.pdf"
      },
      {
        "nombre": "Licenciatura en Biotecnología",
        "codigo": "BIO",
        "plan_de_estudios": "https://www.unm.edu.ar/files/LICENCIATURA_EN_BIOTECNOLOGIA_UNM_2022_versin_difusin_20240404.pdf"
      },
      {
        "nombre": "Diseño en Comunicación Visual",
        "codigo": "DCV",
        "plan_de_estudios": "https://www.unm.edu.ar/files/DISEO_COMUNICACION_VISUAL_UNM_2023_versin_difusin_20240404.pdf"
      },
      {
        "nombre": "Diseño de Indumentaria",
        "codigo": "DI",
        "plan_de_estudios": "https://www.unm.edu.ar/files/INDUMENTARIA23.pdf"
      },
      {
        "nombre": "Diseño Industrial",
        "codigo": "DIN",
        "plan_de_estudios": "https://www.unm.edu.ar/files/DISEO_INDUSTRIAL_UNM_2023_versin_difusin_20240404.pdf"
      },
      {
        "nombre": "Diseño Multimedial",
        "codigo": "DM",
        "plan_de_estudios": "https://www.unm.edu.ar/files/DISEO_MULTIMEDIAL_UNM_2023_versin_difusin_20240404.pdf"
      },
      {
        "nombre": "Ingeniería en Electrónica",
        "codigo": "IE",
        "plan_de_estudios": "https://www.unm.edu.ar/files/INGENIERIA_EN_ELECTRONICA_UNM_2017_3_orientaciones_versin_difusin_20240404.pdf"
      },
      {
        "nombre": "Licenciatura en Gestión Ambiental",
        "codigo": "LGA",
        "plan_de_estudios": "https://www.unm.edu.ar/files/LICENCIATURA_EN_GESTION_AMBIENTAL_UNM_2015_versin_difusin_20240404.pdf"
      }
    ]
  }'::jsonb,
  tags = ARRAY['tecnología', 'ingeniería', 'diseño', 'arquitectura', 'biotecnología', 'ambiental', 'electrónica', 'multimedial'],
  updated_at = NOW()
WHERE categoria = 'carrera' AND titulo = 'Departamento de Ciencias Aplicadas y Tecnología';
