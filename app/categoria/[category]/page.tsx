import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SearchBar } from '@/components/search-bar'
import { ItemCard } from '@/components/item-card'
import { ItemInternoCard } from '@/components/item-interno-card'
import { TramiteCard } from '@/components/tramite-card'
import { ConsultaCard } from '@/components/consulta-card'
import { EnlaceCard } from '@/components/enlace-card'
import { EdificioCard } from '@/components/edificio-card'
import { sql, type Category, type Item, type ItemUnificada, categoryLabels, categoryDescriptions } from '@/lib/db'
import { getDepartamentoFullName, getDepartamentoCode } from '@/lib/departments'
import { resolveUnmFileUrl } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

const validCategories: Category[] = ['tramite', 'tramites-interno', 'consulta', 'asignatura', 'carrera', 'edificio', 'enlace']

async function getItemsByCategory(category: Category) {
  const items = await sql`
    SELECT * FROM items 
    WHERE categoria = ${category}
    ORDER BY titulo ASC
  `
  return items as Item[]
}

async function getItemsInternosUnificados() {
  const items = await sql`
    SELECT * FROM items_unificada
    WHERE tipo = 'nodocente' AND categoria IN ('interno', 'enlace')
    ORDER BY titulo ASC
  `
  return items as ItemUnificada[]
}

async function getItemsTramitesUnificados() {
  const items = await sql`
    SELECT * FROM items_unificada
    WHERE tipo = 'estudiantes' AND categoria = 'tramite'
    ORDER BY titulo ASC
  `
  return items as ItemUnificada[]
}

async function getItemsConsultasUnificadas() {
  const items = await sql`
    SELECT * FROM items_unificada
    WHERE tipo = 'estudiantes' AND categoria = 'consulta'
    ORDER BY titulo ASC
  `
  return items as ItemUnificada[]
}

async function getItemsEnlacesUnificados() {
  const items = await sql`
    SELECT * FROM items_unificada
    WHERE tipo = 'estudiantes' AND categoria = 'enlace'
    ORDER BY titulo ASC
  `
  return items as ItemUnificada[]
}

interface CarrerasDepartmentSummary {
  departamento: string
  total_carreras: number
}

async function getCarrerasDepartments() {
  const rows = await sql`
    SELECT 
      departamento, 
      COUNT(*) as total_carreras
    FROM public.carreras
    WHERE departamento IS NOT NULL
    GROUP BY departamento
    ORDER BY departamento ASC
  `
  return rows as CarrerasDepartmentSummary[]
}

async function getTagsForCategory(category: Category) {
  const result = await sql`
    SELECT DISTINCT unnest(tags) as tag 
    FROM items 
    WHERE categoria = ${category}
    ORDER BY tag
  `
  return result.map((row) => row.tag as string)
}

interface ProgramDepartmentSummary {
  departamento: string
  total_carreras: number
}

interface EdificioItem {
  id: number
  nombre: string
  color: string
  imagen: string
  aulas: string[]
}

async function getProgramDepartments(limit = 3) {
  const rows = await sql`
    SELECT departamento, COUNT(*) as total_carreras
    FROM public.programas
    GROUP BY departamento
    ORDER BY departamento ASC
    LIMIT ${limit}
  `
  return rows as ProgramDepartmentSummary[]
}

async function getEdificios() {
  const rows = await sql`
    SELECT
      e.id,
      e.nombre,
      e.color,
      e.imagen,
      COALESCE(
        array_agg(
          a.nombre
          ORDER BY
            (a.nombre ~ '^\d+') DESC,
            CASE
              WHEN a.nombre ~ '^\d+' THEN (substring(a.nombre from '^(\d+)'))::int
              ELSE NULL
            END,
            a.nombre
        ) FILTER (WHERE a.nombre IS NOT NULL),
        ARRAY[]::text[]
      ) as aulas
    FROM public.edificios e
    LEFT JOIN public.edificios_aulas a ON a.edificio_id = e.id
    GROUP BY e.id
    ORDER BY e.nombre ASC
  `
  return rows as EdificioItem[]
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params
  
  if (!validCategories.includes(category as Category)) {
    return { title: 'Categoría no encontrada - Portal UNM' }
  }
  
  const label = categoryLabels[category as Category]
  return {
    title: `${label} - Portal UNM`,
    description: categoryDescriptions[category as Category],
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  
  if (!validCategories.includes(category as Category)) {
    notFound()
  }
  
  const typedCategory = category as Category
  let items: Item[] = []
  let itemsInternos: ItemUnificada[] = []
  let itemsTramites: ItemUnificada[] = []
  let itemsConsultas: ItemUnificada[] = []
  let itemsEnlaces: ItemUnificada[] = []
  let tags: string[] = []
  let programasDepartments: ProgramDepartmentSummary[] = []
  let carrerasDepartments: CarrerasDepartmentSummary[] = []
  let edificios: EdificioItem[] = []

  if (typedCategory === 'carrera') {
    carrerasDepartments = await getCarrerasDepartments()
  } else if (typedCategory === 'asignatura') {
    programasDepartments = await getProgramDepartments(3)
    tags = await getTagsForCategory(typedCategory)
  } else if (typedCategory === 'edificio') {
    edificios = await getEdificios()
  } else if (typedCategory === 'tramites-interno') {
    itemsInternos = await getItemsInternosUnificados()
  } else if (typedCategory === 'tramite') {
    itemsTramites = await getItemsTramitesUnificados()
  } else if (typedCategory === 'consulta') {
    itemsConsultas = await getItemsConsultasUnificadas()
  } else if (typedCategory === 'enlace') {
    itemsEnlaces = await getItemsEnlacesUnificados()
  } else {
    const results = await Promise.all([
      getItemsByCategory(typedCategory),
      getTagsForCategory(typedCategory)
    ])
    items = results[0]
    tags = results[1]
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background px-4 py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">Inicio</Link>
              <span className="mx-2">/</span>
              <span>{categoryLabels[typedCategory]}</span>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
              {categoryLabels[typedCategory]}
            </h1>
            <p className="mb-6 max-w-2xl text-muted-foreground">
              {categoryDescriptions[typedCategory]}
            </p>
            {typedCategory !== 'edificio' && typedCategory !== 'tramites-interno' && typedCategory !== 'tramite' && typedCategory !== 'consulta' && typedCategory !== 'enlace' && (
              <SearchBar 
                placeholder={`Buscar en ${categoryLabels[typedCategory].toLowerCase()}...`}
                className="max-w-xl"
              />
            )}
          </div>
        </section>

        {/* Tags Filter */}
        {tags.length > 0 && typedCategory !== 'tramites-interno' && typedCategory !== 'tramite' && typedCategory !== 'consulta' && typedCategory !== 'enlace' && (
          <section className="border-b border-border px-4 py-4 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Etiquetas:</span>
                {tags.map((tag) => (
                  <Link key={tag} href={`/buscar?tag=${encodeURIComponent(tag)}`}>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 hover:border-primary">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Items / Departments Grid */}
        <section className="px-4 py-8 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-7xl">
            {typedCategory === 'edificio' ? (
              <div>
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground">
                    {edificios.length} {edificios.length === 1 ? 'edificio' : 'edificios'}
                  </p>
                </div>
                <div className="flex flex-col gap-6 lg:flex-row">
                  {/* Mapa a la izquierda */}
                  <div className="flex-shrink-0 lg:w-3/5">
                    <Image
                      src="/img/mapa.jpg"
                      alt="Mapa de edificios"
                      width={1200}
                      height={700}
                      className="h-auto w-full rounded-lg border border-border object-contain"
                      priority
                    />
                  </div>
                  
                  {/* Cards a la derecha */}
                  <div className="flex-1 lg:max-h-[675px] lg:flex lg:flex-col">
                    {edificios.length > 0 ? (
                      <div className="grid flex-1 auto-rows-fr gap-2 sm:grid-cols-2 lg:grid-cols-1">
                        {edificios.map((edificio) => (
                          <EdificioCard
                            key={edificio.id}
                            id={edificio.id}
                            nombre={edificio.nombre}
                            imagen={edificio.imagen}
                            aulas={edificio.aulas}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="py-12 text-center">
                        <p className="text-muted-foreground">No hay edificios registrados.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : typedCategory === 'carrera' ? (
              <div>
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground">
                    {carrerasDepartments.length} {carrerasDepartments.length === 1 ? 'departamento' : 'departamentos'}
                  </p>
                </div>
                {carrerasDepartments.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {carrerasDepartments.map((departamento) => {
                      const fullName = getDepartamentoFullName(departamento.departamento)
                      const deptCode = getDepartamentoCode(departamento.departamento)
                      return (
                      <Link key={departamento.departamento} href={`/categoria/carrera/${encodeURIComponent(deptCode)}`}>
                        <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                          <CardHeader className="pb-3">
                            <CardTitle className="line-clamp-2 text-lg font-semibold">
                              {deptCode}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            {fullName && (
                              <p className="text-sm text-muted-foreground">
                                {fullName}
                              </p>
                            )}
                            <p className="text-sm text-muted-foreground">Ver carreras y programas de este departamento.</p>
                            <p className="text-xs text-muted-foreground">
                              {Number(departamento.total_carreras)} {Number(departamento.total_carreras) === 1 ? 'carrera' : 'carreras'}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                      )
                    })}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">No hay carreras disponibles.</p>
                  </div>
                )}
              </div>
            ) : typedCategory === 'asignatura' ? (
              <div>
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground">
                    {programasDepartments.length} {programasDepartments.length === 1 ? 'departamento' : 'departamentos'}
                  </p>
                </div>
                {programasDepartments.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {programasDepartments.map((departamento) => {
                      const fullName = getDepartamentoFullName(departamento.departamento)
                      return (
                      <Link key={departamento.departamento} href={`/asignaturas/${encodeURIComponent(departamento.departamento)}`}>
                        <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                          <CardHeader className="pb-3">
                            <CardTitle className="line-clamp-2 text-lg font-semibold">
                              {departamento.departamento}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            {fullName && (
                              <p className="text-sm text-muted-foreground">
                                {fullName}
                              </p>
                            )}
                            <p className="text-sm text-muted-foreground">Ver carreras y programas de este departamento.</p>
                            <p className="text-xs text-muted-foreground">
                              {Number(departamento.total_carreras)} {Number(departamento.total_carreras) === 1 ? 'carrera' : 'carreras'}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                      )
                    })}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">No hay programas disponibles.</p>
                  </div>
                )}
              </div>
            ) : typedCategory === 'tramites-interno' ? (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {itemsInternos.length} {itemsInternos.length === 1 ? 'recurso' : 'recursos'}
                  </p>
                </div>

                {itemsInternos.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {itemsInternos.map((item) => (
                      <ItemInternoCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">
                      No hay recursos disponibles.
                    </p>
                  </div>
                )}
              </div>
            ) : typedCategory === 'tramite' ? (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {itemsTramites.length} {itemsTramites.length === 1 ? 'trámite' : 'trámites'}
                  </p>
                </div>

                {itemsTramites.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {itemsTramites.map((item) => (
                      <TramiteCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">
                      No hay trámites disponibles.
                    </p>
                  </div>
                )}
              </div>
            ) : typedCategory === 'consulta' ? (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {itemsConsultas.length} {itemsConsultas.length === 1 ? 'consulta' : 'consultas'}
                  </p>
                </div>

                {itemsConsultas.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {itemsConsultas.map((item) => (
                      <ConsultaCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">
                      No hay consultas disponibles.
                    </p>
                  </div>
                )}
              </div>
            ) : typedCategory === 'enlace' ? (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {itemsEnlaces.length} {itemsEnlaces.length === 1 ? 'enlace' : 'enlaces'}
                  </p>
                </div>

                {itemsEnlaces.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {itemsEnlaces.map((item) => (
                      <EnlaceCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">
                      No hay enlaces disponibles.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {items.length} {items.length === 1 ? 'resultado' : 'resultados'}
                  </p>
                </div>

                {items.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">
                      No hay elementos en esta categoría todavía.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
