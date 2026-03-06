import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { sql } from '@/lib/db'
import { AsignaturasFilter } from '@/components/asignaturas-filter'
import { getDepartamentoFullName } from '@/lib/departments'
import Link from 'next/link'

interface CarreraPageProps {
  params: Promise<{ departamento: string; carrera: string }>
}

interface AsignaturaItem {
  nombre: string
  url: string
  codigo: string
  materia: string
  ciclo_lectivo: string
  resolucion: string
}

async function getAsignaturas(departamento: string, carrera: string) {
  const rows = await sql`
    SELECT c.nombre, c.url, c.codigo, c.materia, c.ciclo_lectivo, c.resolucion
    FROM public.programas p
    JOIN public.programas_contenidos c ON c.programa_id = p.id
    WHERE p.departamento = ${departamento}
      AND p.carrera = ${carrera}
    ORDER BY c.codigo ASC
  `
  return rows as AsignaturaItem[]
}

export async function generateMetadata({ params }: CarreraPageProps) {
  const { departamento, carrera } = await params
  const departamentoName = decodeURIComponent(departamento)
  const carreraName = decodeURIComponent(carrera)
  const departamentoFullName = getDepartamentoFullName(departamentoName)
  const departamentoLabel = departamentoFullName
    ? `${departamentoName} - ${departamentoFullName}`
    : departamentoName
  return {
    title: `${carreraName} - ${departamentoLabel} - Asignaturas - Portal UNM`,
    description: `Asignaturas de ${carreraName} (${departamentoLabel}).`,
  }
}

export default async function CarreraAsignaturasPage({ params }: CarreraPageProps) {
  const { departamento, carrera } = await params
  const departamentoName = decodeURIComponent(departamento)
  const carreraName = decodeURIComponent(carrera)
  const departamentoFullName = getDepartamentoFullName(departamentoName)
  const departamentoLabel = departamentoFullName
    ? `${departamentoName} - ${departamentoFullName}`
    : departamentoName
  const asignaturas = await getAsignaturas(departamentoName, carreraName)

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
              <Link
                href={`/asignaturas/${encodeURIComponent(departamentoName)}`}
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

        <AsignaturasFilter asignaturas={asignaturas} />
      </main>

      <Footer />
    </div>
  )
}
