import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { sql } from '@/lib/db'
import { getDepartamentoFullName, getDepartamentoCode, departamentoFullNames } from '@/lib/departments'
import { resolveUnmFileUrl } from '@/lib/utils'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface DepartmentProps {
  params: Promise<{ department: string }>
}

interface CarreraItem {
  carrera: string
  codigo: string
  plan_de_estudios: string | null
  organizacion_curricular: string | null
  correo: string | null
  asignaturas_count: number
}

async function getCarrerasForDepartamento(departamento: string, departamentoCode: string) {
  const rows = await sql`
    SELECT
      c.carrera,
      c.codigo,
      c.plan_de_estudios,
      c.organizacion_curricular,
      c.correo,
      COALESCE(COUNT(pc.id), 0)::int AS asignaturas_count
    FROM public.carreras c
    LEFT JOIN public.programas p ON p.departamento = ${departamentoCode} AND p.carrera = c.carrera
    LEFT JOIN public.programas_contenidos pc ON pc.programa_id = p.id
    WHERE c.departamento = ${departamento}
    GROUP BY c.carrera, c.codigo, c.plan_de_estudios, c.organizacion_curricular, c.correo
    ORDER BY c.carrera ASC
  `
  return rows as CarreraItem[]
}

export async function generateMetadata({ params }: DepartmentProps) {
  const { department } = await params
  const deptAcronym = decodeURIComponent(department)
  const fullName = getDepartamentoFullName(deptAcronym)
  const departamentoLabel = fullName ? `${deptAcronym} - ${fullName}` : deptAcronym
  return { 
    title: `${departamentoLabel} - Carreras - Portal UNM`,
    description: `Carreras y programas del departamento ${departamentoLabel}.`
  }
}

export default async function DepartmentPage({ params }: DepartmentProps) {
  const { department } = await params
  const deptAcronym = decodeURIComponent(department)
  const departamentoFullName = getDepartamentoFullName(deptAcronym)
  const departamentoLabel = departamentoFullName
    ? `${deptAcronym} - ${departamentoFullName}`
    : deptAcronym

  // Use the full department name for the carreras table query (carreras table uses full names)
  const carreras = await getCarrerasForDepartamento(departamentoFullName || deptAcronym, deptAcronym)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/5 to-background px-4 py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">Inicio</Link>
              <span className="mx-2">/</span>
              <Link href="/categoria/carrera" className="hover:text-primary">Carreras</Link>
              <span className="mx-2">/</span>
              <span>{departamentoLabel}</span>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">{departamentoLabel}</h1>
            <p className="mb-6 text-muted-foreground">
              {carreras.length} {carreras.length === 1 ? 'carrera' : 'carreras'}
            </p>
          </div>
        </section>

        <section className="px-4 py-8 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-7xl">
            {carreras.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {carreras.map((carrera) => (
                  <Card key={`${carrera.codigo}-${carrera.carrera}`} className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                    <CardHeader className="pb-3">
                      <CardTitle className="line-clamp-2 text-lg font-semibold">
                        {carrera.carrera}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <p className="text-sm text-muted-foreground">Código: {carrera.codigo}</p>
                      <p className="text-sm text-muted-foreground">
                        {carrera.asignaturas_count} {carrera.asignaturas_count === 1 ? 'asignatura' : 'asignaturas'}
                      </p>
                      {carrera.plan_de_estudios && (
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Plan de Estudios:</p>
                          <a
                            href={resolveUnmFileUrl(carrera.plan_de_estudios)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary underline hover:no-underline"
                          >
                            Ver PDF
                          </a>
                        </div>
                      )}
                      {carrera.organizacion_curricular && (
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Organización Curricular:</p>
                          <a
                            href={resolveUnmFileUrl(carrera.organizacion_curricular)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary underline hover:no-underline"
                          >
                            Ver detalles
                          </a>
                        </div>
                      )}
                      {carrera.correo && (
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Contacto:</p>
                          <a href={`mailto:${carrera.correo}`} className="text-sm text-primary hover:underline">
                            {carrera.correo}
                          </a>
                        </div>
                      )}
                      <div className="pt-2">
                        <Link
                          href={`/categoria/carrera/${encodeURIComponent(deptAcronym)}/${encodeURIComponent(carrera.carrera)}`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          Ver asignaturas →
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No hay carreras en este departamento.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
