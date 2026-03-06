import { neon } from '@neondatabase/serverless'

export const sql = neon(process.env.DATABASE_URL!)

export type Category = 'tramite' | 'tramites-interno' | 'interno' | 'consulta' | 'asignatura' | 'carrera' | 'edificio' | 'enlace'

export interface Item {
  id: number
  categoria: Category
  titulo: string
  descripcion: string
  tags: string[]
  enlaces: { url: string; label: string; tipo: string }[]
  datos_especificos: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface ItemUnificada {
  id: number
  tipo: 'nodocente' | 'estudiantes'
  categoria: 'tramite' | 'consulta' | 'enlace' | 'interno'
  titulo: string
  descripcion: string | null
  tags: string[]
  formulario: { url: string; label: string; tipo: string }[] | null
  documento: { url: string; label: string; tipo: string }[] | null
  logo: string | null
  enlace: string | null
  created_at: string
  updated_at: string
}

export const categoryLabels: Record<Category, string> = {
  tramite: 'Trámites',
  'tramites-interno': 'Trámites internos',
  interno: 'Interno',
  consulta: 'Consultas',
  asignatura: 'Asignaturas',
  carrera: 'Carreras',
  edificio: 'Edificios',
  enlace: 'Enlaces Útiles',
}

export const categoryDescriptions: Record<Category, string> = {
  tramite: 'Procedimientos administrativos y gestiones',
  'tramites-interno': 'Gestiones internas del Departamento de Alumnos',
  interno: 'Recursos internos',
  consulta: 'Preguntas frecuentes y consultas generales',
  asignatura: 'Materias y programas de estudio',
  carrera: 'Carreras y planes de estudio',
  edificio: 'Ubicaciones y espacios del campus',
  enlace: 'Links y recursos externos útiles',
}
