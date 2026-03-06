import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { sql } from '@/lib/db'
import { getDepartamentoFullName } from '@/lib/departments'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Link from 'next/link'

interface DepartamentoPageProps {
  params: Promise<{ departamento: string }>
}

interface CarreraItem {
  id: number
  carrera: string
  codigo: string
  url: string
  total_asignaturas: number
}

async function getCarrerasForDepartamento(departamento: string) {
  const rows = await sql`
    SELECT
      p.id,
      p.carrera,
      p.codigo,
      p.url,
      COUNT(c.id) as total_asignaturas
    FROM public.programas p
    LEFT JOIN public.programas_contenidos c ON c.programa_id = p.id
    WHERE p.departamento = ${departamento}
    GROUP BY p.id, p.carrera, p.codigo, p.url
    ORDER BY p.carrera ASC
  `
  return rows as CarreraItem[]
}

export async function generateMetadata({ params }: DepartamentoPageProps) {
  const { departamento } = await params
  const departamentoName = decodeURIComponent(departamento)
  const departamentoFullName = getDepartamentoFullName(departamentoName)
  const departamentoLabel = departamentoFullName
    ? `${departamentoName} - ${departamentoFullName}`
    : departamentoName
  return {
    title: `${departamentoLabel} - Asignaturas - Portal UNM`,
    description: `Carreras y programas del departamento ${departamentoLabel}.`,
  }
}

export default async function DepartamentoAsignaturasPage({ params }: DepartamentoPageProps) {
  const { departamento } = await params
  const departamentoName = decodeURIComponent(departamento)
  const departamentoFullName = getDepartamentoFullName(departamentoName)
  const departamentoLabel = departamentoFullName
    ? `${departamentoName} - ${departamentoFullName}`
    : departamentoName
  const carreras = await getCarrerasForDepartamento(departamentoName)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/5 to-background px-4 py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">Inicio</Link>
              <span className="mx-2">/</span>
              <Link href="/categoria/asignatura" className="hover:text-primary">Asignaturas</Link>
              <span className="mx-2">/</span>
              <span>{departamentoLabel}</span>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
              {departamentoLabel}
            </h1>
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
                  <Link
                    key={carrera.id}
                    href={`/asignaturas/${encodeURIComponent(departamentoName)}/${encodeURIComponent(carrera.carrera)}`}
                  >
                    <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                      <CardHeader className="pb-3">
                        <CardTitle className="line-clamp-2 text-lg font-semibold">{carrera.carrera}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground">{carrera.codigo}</p>
                        <p className="text-xs text-muted-foreground">
                          {Number(carrera.total_asignaturas)} {Number(carrera.total_asignaturas) === 1 ? 'asignatura' : 'asignaturas'}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
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
