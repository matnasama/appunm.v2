import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ItemCard } from '@/components/item-card'
import { CopyTextButton } from '@/components/copy-text-button'
import { sql, type Item, categoryLabels } from '@/lib/db'
import { resolveUnmFileUrl } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'

interface ItemPageProps {
  params: Promise<{ id: string }>
}

async function getItem(id: number) {
  const items = await sql`SELECT * FROM items WHERE id = ${id}`
  return items[0] as Item | undefined
}

async function getRelatedItems(item: Item) {
  const items = await sql`
    SELECT * FROM items 
    WHERE categoria = ${item.categoria} 
    AND id != ${item.id}
    ORDER BY updated_at DESC
    LIMIT 3
  `
  return items as Item[]
}

async function getAsignaturasByCareer(careerName: string) {
  const items = await sql`
    SELECT * FROM items
    WHERE categoria = 'asignatura'
    AND (datos_especificos->>'carrera') ILIKE ${careerName}
    ORDER BY titulo ASC
  `
  return items as Item[]
}

async function AsyncAsignaturas({ careerName }: { careerName: string }) {
  const asignaturas = await getAsignaturasByCareer(careerName)

  if (!asignaturas || asignaturas.length === 0) {
    return <p className="text-sm text-muted-foreground">No hay asignaturas registradas para esta carrera.</p>
  }

  return (
    <div className="mt-3 grid gap-3 sm:grid-cols-1 lg:grid-cols-2">
      {asignaturas.map((a) => (
        <Link key={a.id} href={`/item/${a.id}`} className="block">
          <div className="rounded-md border border-border bg-background p-3 hover:bg-secondary/50">
            <h5 className="font-medium text-foreground">{a.titulo}</h5>
            <p className="text-sm text-muted-foreground line-clamp-2">{a.descripcion}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export async function generateMetadata({ params }: ItemPageProps) {
  const { id } = await params
  const item = await getItem(parseInt(id))
  
  if (!item) {
    return { title: 'No encontrado - Portal UNM' }
  }
  
  return {
    title: `${item.titulo} - Portal UNM`,
    description: item.descripcion,
  }
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { id } = await params
  const item = await getItem(parseInt(id))
  
  if (!item) {
    notFound()
  }

  const relatedItems = await getRelatedItems(item)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb and Back */}
        <section className="border-b border-border bg-secondary/30 px-4 py-4 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Inicio</Link>
                <span>/</span>
                <Link href={`/categoria/${item.categoria}`} className="hover:text-primary">
                  {categoryLabels[item.categoria]}
                </Link>
                <span>/</span>
                <span className="text-foreground">{item.titulo}</span>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/categoria/${item.categoria}`} className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Volver
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="px-4 py-8 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Content Column */}
              <div className="lg:col-span-2">
                <article>
                  <header className="mb-8">
                    <Badge variant="secondary" className="mb-4">
                      {categoryLabels[item.categoria]}
                    </Badge>
                    <h1 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
                      {item.titulo}
                    </h1>
                    <p className="whitespace-pre-wrap text-lg text-muted-foreground">
                      {item.descripcion}
                    </p>
                  </header>

                  {item.categoria !== 'consulta' && (
                  <Card>
                    <CardContent className="prose prose-slate max-w-none p-6 lg:p-8">
                      <div className="text-foreground [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-medium [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2">
                        {item.datos_especificos && Object.keys(item.datos_especificos).length > 0 && (
                          <div className="mt-6 space-y-3">
                            {Object.entries(item.datos_especificos).map(([key, value]) => (
                              <div key={key} className="rounded-lg bg-secondary/50 p-4">
                                <h3 className="mb-2 font-medium capitalize">{key.replace(/_/g, ' ')}</h3>

                                {key === 'modelos' && Array.isArray(value) && value.length > 0 ? (
                                  <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-1">
                                    {value.map((model: any) => (
                                      <div key={model.id ?? model.nombre} className="rounded-md border border-border bg-card p-4">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                          <h4 className="font-medium text-foreground">{model.nombre}</h4>
                                          <div className="flex flex-wrap gap-2">
                                            {model.url && (
                                              <a
                                                href={model.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1 text-sm font-medium hover:bg-secondary/50"
                                              >
                                                Ver enlace
                                              </a>
                                            )}
                                            <CopyTextButton
                                              text={`${model.nombre}\n\n${model.descripcion ?? ''}${model.url ? `\n\n${model.url}` : ''}`}
                                            />
                                          </div>
                                        </div>
                                        {model.descripcion && (
                                          <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">
                                            {model.descripcion}
                                          </p>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                ) : Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' ? (
                                  // Assume this is the `carreras` array from the department
                                  <section>
                                    <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-1">
                                      {value.map((career: any, i: number) => (
                                        <div key={i} className="rounded-md border border-border bg-card p-4">
                                          <div className="flex items-center justify-between">
                                            <div>
                                              <h4 className="mb-1 font-medium text-foreground">
                                                <Link href={`/carrera/${encodeURIComponent(career.nombre)}`} className="hover:text-primary">
                                                  {career.nombre}
                                                </Link>
                                              </h4>
                                              {career.codigo && <p className="text-sm text-muted-foreground">Código: {career.codigo}</p>}
                                            </div>
                                            {career.plan_de_estudios && (
                                              <a
                                                href={resolveUnmFileUrl(career.plan_de_estudios)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1 text-sm font-medium hover:bg-secondary/50"
                                              >
                                                Plan
                                              </a>
                                            )}
                                          </div>

                                          {/* Asignaturas for this career */}
                                          <div className="mt-4">
                                            {/* Server-side fetch asignaturas for this career */}
                                            {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
                                            {
                                              // We need to fetch asignaturas server-side; do it inline via an async IIFE
                                            }
                                            {/* @ts-expect-error Async Server Component */}
                                            <AsyncAsignaturas careerName={career.nombre} />
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </section>
                                ) : Array.isArray(value) ? (
                                  <p className="text-sm text-muted-foreground">{(value as string[]).join(', ')}</p>
                                ) : typeof value === 'object' ? (
                                  <pre className="text-sm text-muted-foreground">{JSON.stringify(value, null, 2)}</pre>
                                ) : (
                                  <p className="text-sm text-muted-foreground">{String(value)}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        {item.enlaces && item.enlaces.length > 0 && (
                          <div className="mt-6">
                            <h3 className="mb-3 font-medium">Enlaces</h3>
                            <div className="flex flex-wrap gap-2">
                              {item.enlaces.map((enlace, i) => (
                                <a
                                  key={i}
                                  href={enlace.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
                                >
                                  {enlace.label}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  )}
                </article>
              </div>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* Meta Info */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="mb-4 font-semibold text-foreground">Información</h2>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Actualizado: {formatDate(item.updated_at)}</span>
                      </div>
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex items-start gap-2">
                          <Tag className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                          <div className="flex flex-wrap gap-1.5">
                            {item.tags.map((tag) => (
                              <Link key={tag} href={`/buscar?tag=${encodeURIComponent(tag)}`}>
                                <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                                  {tag}
                                </Badge>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Related Items */}
                {relatedItems.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="mb-4 font-semibold text-foreground">Relacionados</h2>
                      <div className="space-y-3">
                        {relatedItems.map((relatedItem) => (
                          <Link 
                            key={relatedItem.id} 
                            href={`/item/${relatedItem.id}`}
                            className="block rounded-lg border border-border p-3 transition-colors hover:bg-secondary/50"
                          >
                            <h3 className="mb-1 font-medium text-foreground line-clamp-2">
                              {relatedItem.titulo}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {relatedItem.descripcion}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Quick Actions */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="mb-4 font-semibold text-foreground">Acciones Rápidas</h2>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                        <Link href={`/categoria/${item.categoria}`}>
                          Ver más en {categoryLabels[item.categoria]}
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                        <Link href="/buscar">
                          Buscar otra información
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </div>
        </section>

        {/* More Related Items */}
        {relatedItems.length > 0 && (
          <section className="bg-secondary/30 px-4 py-12 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-6 text-2xl font-bold text-foreground">
                Más en {categoryLabels[item.categoria]}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedItems.map((relatedItem) => (
                  <ItemCard key={relatedItem.id} item={relatedItem} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button asChild>
                  <Link href={`/categoria/${item.categoria}`}>
                    Ver todos los {categoryLabels[item.categoria].toLowerCase()}
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
