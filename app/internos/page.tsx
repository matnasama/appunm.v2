import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { InternosFilter } from '@/components/internos-filter'
import { sql } from '@/lib/db'

interface Usuario {
  nombre: string
  interno: string[]
  area: string
}

interface UsuariosPageProps {
  searchParams: Promise<{ q?: string }>
}

async function getUsuarios() {
  try {
    return (await sql`
      SELECT nombre, interno, area FROM public.usuarios
      ORDER BY area ASC, nombre ASC
    `) as Usuario[]
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getUsuarios error:', err)
    return [] as Usuario[]
  }
}

export async function generateMetadata({ searchParams }: UsuariosPageProps) {
  const { q } = await searchParams
  return {
    title: q ? `Internos: ${q} - Portal UNM` : 'Internos - Portal UNM',
    description: 'Listado de internos institucionales de la Universidad Nacional de Moreno.',
  }
}

export default async function InternosPage({ searchParams }: UsuariosPageProps) {
  const { q } = await searchParams
  const usuarios = await getUsuarios()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/5 to-background px-4 py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">Internos</h1>
            <p className="mb-6 text-muted-foreground">
              Listado de internos institucionales de la Universidad Nacional de Moreno.
            </p>
          </div>
        </section>

        <InternosFilter usuarios={usuarios} initialQuery={q} />
      </main>

      <Footer />
    </div>
  )
}
