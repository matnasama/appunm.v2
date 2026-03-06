import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { sql } from '@/lib/db'
import { getDepartamentoFullName } from '@/lib/departments'
import { resolveUnmFileUrl } from '@/lib/utils'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface CarreraPageProps {
  params: Promise<{ department: string; carrera: string }>
}

interface AsignaturaItem {
  nombre: string
  url: string
  codigo: string
  materia: string
  ciclo_lectivo: string
  resolucion: string
}

async function getAsignaturasForCarrera(departamento: string, carrera: string) {
  const rows = await sql`
    SELECT 
      pc.nombre,
      pc.url,
      pc.codigo,
      pc.materia,
      pc.ciclo_lectivo,
      pc.resolucion
    FROM public.programas p
    JOIN public.programas_contenidos pc ON pc.programa_id = p.id
    WHERE p.departamento = ${departamento}
      AND p.carrera = ${carrera}
    ORDER BY pc.codigo ASC
  `
  return rows as AsignaturaItem[]
}

export async function generateMetadata({ params }: CarreraPageProps) {
  const { department, carrera } = await params
  const deptAcronym = decodeURIComponent(department)
  const carreraName = decodeURIComponent(carrera)
  const departamentoFullName = getDepartamentoFullName(deptAcronym)
  const departamentoLabel = departamentoFullName
    ? `${deptAcronym} - ${departamentoFullName}`
    : deptAcronym
  return {
    title: `${carreraName} - ${departamentoLabel} - Carreras - Portal UNM`,
    description: `Asignaturas de ${carreraName} (${departamentoLabel}).`,
  }
}

export default async function CarreraAsignaturasPage({ params }: CarreraPageProps) {
  const { department, carrera } = await params
  const deptAcronym = decodeURIComponent(department)
  const carreraName = decodeURIComponent(carrera)
  const departamentoFullName = getDepartamentoFullName(deptAcronym)
  const departamentoLabel = departamentoFullName
    ? `${deptAcronym} - ${departamentoFullName}`
    : deptAcronym
  
  // Use department code (not full name) for programas table query
  const asignaturas = await getAsignaturasForCarrera(deptAcronym, carreraName)

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
              <Link
                href={`/categoria/carrera/${encodeURIComponent(deptAcronym)}`}
                className="hover:text-primary"
              >
                {departamentoLabel}
              </Link>
              <span className="mx-2">/</span>
              <span>{carreraName}</span>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
              {carreraName}
            </h1>
            <p className="mb-6 text-muted-foreground">
              {asignaturas.length} {asignaturas.length === 1 ? 'asignatura' : 'asignaturas'}
            </p>
          </div>
        </section>

        <section className="px-4 py-8 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-7xl">
            {asignaturas.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {asignaturas.map((asignatura) => (
                  <Card key={`${asignatura.codigo}-${asignatura.nombre}`} className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                    <CardHeader className="pb-3">
                      <CardTitle className="line-clamp-2 text-lg font-semibold">
                        {asignatura.nombre}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <p className="text-sm text-muted-foreground">Código: {asignatura.codigo}</p>
                      
                      {asignatura.materia && (
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Materia:</p>
                          <p className="text-sm">{asignatura.materia}</p>
                        </div>
                      )}
                      
                      {asignatura.ciclo_lectivo && (
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Ciclo Lectivo:</p>
                          <p className="text-sm">{asignatura.ciclo_lectivo}</p>
                        </div>
                      )}
                      
                      {asignatura.resolucion && (
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Resolución:</p>
                          <p className="text-sm">{asignatura.resolucion}</p>
                        </div>
                      )}
                      
                      {asignatura.url && (
                        <div>
                          <a
                            href={resolveUnmFileUrl(asignatura.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary underline hover:no-underline"
                          >
                            Ver Programa
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No hay asignaturas disponibles para esta carrera.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
