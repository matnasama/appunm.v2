import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SearchBar } from '@/components/search-bar'
import { sql } from '@/lib/db'
import { getDepartamentoCode } from '@/lib/departments'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

async function getDepartments(limit = 3) {
  const rows = await sql`
    SELECT DISTINCT departamento FROM public.carreras
    WHERE departamento IS NOT NULL
    ORDER BY departamento ASC
    LIMIT ${limit}
  `
  return rows.map((r: any) => r.departamento as string)
}

export default async function CarrerasIndex() {
  const departments = await getDepartments(3)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/5 to-background px-4 py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">Inicio</Link>
              <span className="mx-2">/</span>
              <span>Carreras</span>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">Carreras</h1>
            <p className="mb-6 max-w-2xl text-muted-foreground">Selecciona un departamento para ver sus carreras.</p>
            <SearchBar placeholder={`Buscar en carreras...`} className="max-w-xl" />
          </div>
        </section>

        <section className="px-4 py-8 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-4 text-xl font-semibold">Departamentos</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {departments.map((dep) => {
                const depCode = getDepartamentoCode(dep)
                return (
                  <Link key={dep} href={`/categoria/carrera/${encodeURIComponent(depCode)}`} className="group block">
                    <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                      <CardHeader className="pb-3">
                        <CardTitle className="line-clamp-2 text-lg font-semibold group-hover:text-primary">{dep}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground">Ver carreras y planes de estudio de este departamento.</p>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
