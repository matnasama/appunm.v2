import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SearchBar } from '@/components/search-bar'
import { CategoryCard } from '@/components/category-card'
import { ItemCard } from '@/components/item-card'
import { sql, type Category, type Item, categoryLabels } from '@/lib/db'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const categories: Category[] = ['tramite', 'tramites-interno', 'consulta', 'asignatura', 'carrera', 'edificio', 'enlace']

async function getCategoryCounts() {
  try {
    const counts = await sql`
      SELECT categoria, COUNT(*) as count 
      FROM items 
      GROUP BY categoria
    `
    const map = Object.fromEntries(counts.map(row => [row.categoria, Number(row.count)])) as Record<string, number>

    // Use unified table counts for migrated categories
    try {
      const unified = await sql`
        SELECT
          COUNT(*) FILTER (WHERE tipo = 'estudiantes' AND categoria = 'tramite') AS tramite_count,
          COUNT(*) FILTER (WHERE tipo = 'estudiantes' AND categoria = 'consulta') AS consulta_count,
          COUNT(*) FILTER (WHERE tipo = 'estudiantes' AND categoria = 'enlace') AS enlace_count,
          COUNT(*) FILTER (WHERE tipo = 'nodocente' AND categoria IN ('interno', 'enlace')) AS tramites_interno_count
        FROM items_unificada
      `

      if (unified[0]) {
        map['tramite'] = Number(unified[0].tramite_count ?? 0)
        map['consulta'] = Number(unified[0].consulta_count ?? 0)
        map['enlace'] = Number(unified[0].enlace_count ?? 0)
        map['tramites-interno'] = Number(unified[0].tramites_interno_count ?? 0)
      }
    } catch (e) {
      // ignore — if unified table doesn't exist, keep original counts
    }

    // If there's a separate `public.carreras` table, use its count for the 'carrera' category
    try {
      const res = await sql`SELECT COUNT(*) as c FROM public.carreras`
      const carreraCount = res[0] ? Number(res[0].c) : 0
      map['carrera'] = carreraCount
    } catch (e) {
      // ignore — if the table doesn't exist, keep the original count (or zero)
    }

    // If program data exists, use it for the 'asignatura' category count
    try {
      const res = await sql`SELECT COUNT(*) as c FROM public.programas_contenidos`
      const asignaturaCount = res[0] ? Number(res[0].c) : 0
      map['asignatura'] = asignaturaCount
    } catch (e) {
      // ignore — if the table doesn't exist, keep the original count (or zero)
    }

    return map as Record<Category, number>
  } catch (err) {
    // If the table doesn't exist (or any DB error), log and return zeros
    // so the UI doesn't crash during dev when DB isn't initialized.
    // eslint-disable-next-line no-console
    console.error('getCategoryCounts error:', err)
    return Object.fromEntries(categories.map(c => [c, 0])) as Record<Category, number>
  }
}

async function getRecentItems() {
  try {
    const items = await sql`
      SELECT * FROM items 
      ORDER BY updated_at DESC 
      LIMIT 6
    `
    return items as Item[]
  } catch (err) {
    // If the table doesn't exist, avoid throwing and return an empty list.
    // eslint-disable-next-line no-console
    console.error('getRecentItems error:', err)
    return [] as Item[]
  }
}

export default async function HomePage() {
  const [categoryCounts, recentItems] = await Promise.all([
    getCategoryCounts(),
    getRecentItems()
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background px-4 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              Portal de Información UNM
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-foreground">
              Encuentra toda la información que necesitas sobre trámites, trámites internos, consultas,
              asignaturas, carreras, edificios y enlaces útiles de la Universidad Nacional de Moreno.
            </p>
            <SearchBar size="lg" className="mx-auto max-w-2xl" />
          </div>
        </section>

        {/* Categories Section */}
        <section className="px-4 py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-2xl font-bold text-foreground">Categorías</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
              {categories.map((category) => (
                <CategoryCard 
                  key={category} 
                  category={category} 
                  count={categoryCounts[category] || 0}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Recent Items Section */}
        <section className="bg-secondary/30 px-4 py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Últimas Actualizaciones</h2>
              <Button variant="ghost" asChild>
                <Link href="/buscar" className="flex items-center gap-2">
                  Ver todo <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recentItems.map((item) => (
                <ItemCard key={item.id} item={item} showCategory />
              ))}
            </div>
          </div>
        </section>

        {/* Quick Info Section */}
        <section className="px-4 py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl bg-primary/5 p-8 lg:p-12">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="mb-4 text-2xl font-bold text-foreground">
                  ¿No encuentras lo que buscas?
                </h2>
                <p className="mb-6 text-muted-foreground">
                  Utiliza nuestro buscador avanzado para encontrar información específica 
                  o navega por las diferentes categorías para explorar todo el contenido disponible.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button asChild>
                    <Link href="/buscar">Búsqueda Avanzada</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/categoria/consulta">Ver Consultas Frecuentes</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
