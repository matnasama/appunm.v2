import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, FolderOpen } from 'lucide-react'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { sql, type ItemUnificada } from '@/lib/db'

async function getBedeliaItem() {
  const items = await sql`
    SELECT *
    FROM items_unificada
    WHERE tipo = 'nodocente'
      AND categoria = 'interno'
      AND titulo ILIKE 'BEDEL%'
    LIMIT 1
  `

  return items[0] as ItemUnificada | undefined
}

export async function generateMetadata() {
  return {
    title: 'Repositorio Bedelía - Portal UNM',
    description: 'Repositorio de enlaces de Bedelía para trámites internos.',
  }
}

export default async function BedeliaRepositorioPage() {
  const item = await getBedeliaItem()

  if (!item) {
    notFound()
  }

  const enlaces = [...(item.formulario ?? []), ...(item.documento ?? [])]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-secondary/30">
        <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
          <Link
            href="/categoria/tramites-interno"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a Trámites internos
          </Link>

          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4">
                <CardTitle className="text-3xl uppercase">Repositorio de Bedelía</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="inline-flex items-center gap-1">
                    <FolderOpen className="h-3.5 w-3.5" />
                    {enlaces.length} {enlaces.length === 1 ? 'enlace' : 'enlaces'}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {enlaces.length > 0 ? (
                <div className="grid gap-2 sm:grid-cols-1 lg:grid-cols-2">
                  {enlaces.map((enlace, idx) => (
                    <Button key={`${enlace.url}-${idx}`} variant="outline" className="justify-start" asChild>
                      <a href={enlace.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        <span className="truncate">{enlace.label}</span>
                      </a>
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No hay enlaces cargados por el momento.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
