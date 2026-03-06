import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SearchBar } from '@/components/search-bar'
import { ItemCard } from '@/components/item-card'
import { sql, type Category, type Item, categoryLabels } from '@/lib/db'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string; tag?: string }>
}

const categories: Category[] = ['tramite', 'tramites-interno', 'consulta', 'asignatura', 'carrera', 'edificio', 'enlace']

async function searchItems(query?: string, category?: string, tag?: string) {
  let items: Item[]

  if (query && category && tag) {
    items = await sql`
      SELECT * FROM items 
      WHERE (titulo ILIKE ${'%' + query + '%'} OR descripcion ILIKE ${'%' + query + '%'})
      AND categoria = ${category}
      AND ${tag} = ANY(tags)
      ORDER BY updated_at DESC
    ` as Item[]
  } else if (query && category) {
    items = await sql`
      SELECT * FROM items 
      WHERE (titulo ILIKE ${'%' + query + '%'} OR descripcion ILIKE ${'%' + query + '%'})
      AND categoria = ${category}
      ORDER BY updated_at DESC
    ` as Item[]
  } else if (query && tag) {
    items = await sql`
      SELECT * FROM items 
      WHERE (titulo ILIKE ${'%' + query + '%'} OR descripcion ILIKE ${'%' + query + '%'})
      AND ${tag} = ANY(tags)
      ORDER BY updated_at DESC
    ` as Item[]
  } else if (category && tag) {
    items = await sql`
      SELECT * FROM items 
      WHERE categoria = ${category}
      AND ${tag} = ANY(tags)
      ORDER BY updated_at DESC
    ` as Item[]
  } else if (query) {
    items = await sql`
      SELECT * FROM items 
      WHERE titulo ILIKE ${'%' + query + '%'} 
      OR descripcion ILIKE ${'%' + query + '%'}
      ORDER BY updated_at DESC
    ` as Item[]
  } else if (category) {
    items = await sql`
      SELECT * FROM items 
      WHERE categoria = ${category}
      ORDER BY updated_at DESC
    ` as Item[]
  } else if (tag) {
    items = await sql`
      SELECT * FROM items 
      WHERE ${tag} = ANY(tags)
      ORDER BY updated_at DESC
    ` as Item[]
  } else {
    items = await sql`
      SELECT * FROM items 
      ORDER BY updated_at DESC
    ` as Item[]
  }

  return items
}

async function getAllTags() {
  const result = await sql`
    SELECT DISTINCT unnest(tags) as tag 
    FROM items 
    ORDER BY tag
  `
  return result.map((row) => row.tag as string)
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  return {
    title: q ? `Buscar "${q}" - Portal UNM` : 'Buscar - Portal UNM',
    description: 'Busca información en el portal de la Universidad Nacional de Moreno.',
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, category, tag } = await searchParams
  const [items, allTags] = await Promise.all([
    searchItems(q, category, tag),
    getAllTags()
  ])

  const hasFilters = q || category || tag

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Search Header */}
        <section className="bg-gradient-to-b from-primary/5 to-background px-4 py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
              {q ? `Resultados para "${q}"` : 'Buscar'}
            </h1>
            <p className="mb-6 text-muted-foreground">
              {hasFilters 
                ? `${items.length} ${items.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}`
                : 'Busca trámites, trámites internos, consultas, carreras y más.'
              }
            </p>
            <SearchBar 
              defaultValue={q || ''}
              className="max-w-2xl"
            />
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-border px-4 py-4 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap gap-6">
              {/* Category Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Categoría:</span>
                <Link href={`/buscar${q ? `?q=${encodeURIComponent(q)}` : ''}${tag ? `${q ? '&' : '?'}tag=${encodeURIComponent(tag)}` : ''}`}>
                  <Badge 
                    variant={!category ? 'default' : 'outline'} 
                    className="cursor-pointer"
                  >
                    Todas
                  </Badge>
                </Link>
                {categories.map((cat) => (
                  <Link 
                    key={cat} 
                    href={`/buscar?${q ? `q=${encodeURIComponent(q)}&` : ''}category=${cat}${tag ? `&tag=${encodeURIComponent(tag)}` : ''}`}
                  >
                    <Badge 
                      variant={category === cat ? 'default' : 'outline'} 
                      className="cursor-pointer hover:bg-primary/10"
                    >
                      {categoryLabels[cat]}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags Filter */}
            {allTags.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Etiquetas:</span>
                {allTags.slice(0, 10).map((t) => (
                  <Link 
                    key={t} 
                    href={`/buscar?${q ? `q=${encodeURIComponent(q)}&` : ''}${category ? `category=${category}&` : ''}tag=${encodeURIComponent(t)}`}
                  >
                    <Badge 
                      variant={tag === t ? 'default' : 'outline'} 
                      className="cursor-pointer hover:bg-primary/10"
                    >
                      {t}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}

            {/* Active Filters */}
            {hasFilters && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Filtros activos:</span>
                {q && (
                  <Badge variant="secondary">
                    Búsqueda: {q}
                  </Badge>
                )}
                {category && (
                  <Badge variant="secondary">
                    {categoryLabels[category as Category]}
                  </Badge>
                )}
                {tag && (
                  <Badge variant="secondary">
                    {tag}
                  </Badge>
                )}
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/buscar">Limpiar filtros</Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Results Grid */}
        <section className="px-4 py-8 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-7xl">
            {items.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <ItemCard key={item.id} item={item} showCategory />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="mb-4 text-lg text-muted-foreground">
                  No se encontraron resultados
                </p>
                <p className="mb-6 text-sm text-muted-foreground">
                  Intenta con otros términos de búsqueda o explora las categorías.
                </p>
                <Button asChild>
                  <Link href="/">Volver al inicio</Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
