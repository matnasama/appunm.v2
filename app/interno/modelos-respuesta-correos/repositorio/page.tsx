import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, FolderOpen } from 'lucide-react'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { CopyTextButton } from '@/components/copy-text-button'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { sql, type ItemUnificada } from '@/lib/db'

interface ModeloRespuesta {
  id: number
  url?: string
  nombre: string
  descripcion: string
}

async function getModelosRespuestaItem() {
  const items = await sql`
    SELECT *
    FROM items_unificada
    WHERE tipo = 'nodocente'
      AND categoria = 'interno'
      AND titulo ILIKE 'MODELOS%'
    LIMIT 1
  `

  return items[0] as ItemUnificada | undefined
}

export async function generateMetadata() {
  return {
    title: 'Repositorio Modelos de Respuesta - Portal UNM',
    description: 'Repositorio de modelos de respuesta para correos internos.',
  }
}

export default async function ModelosRespuestaCorreosRepositorioPage() {
  const item = await getModelosRespuestaItem()

  if (!item || !item.descripcion) {
    notFound()
  }

  let modelos: ModeloRespuesta[] = []
  try {
    const descriptor = JSON.parse(item.descripcion)
    modelos = descriptor.modelos || []
  } catch {
    notFound()
  }

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
                <CardTitle className="text-3xl uppercase">Repositorio de Modelos de Respuesta</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="inline-flex items-center gap-1">
                    <FolderOpen className="h-3.5 w-3.5" />
                    {modelos.length} {modelos.length === 1 ? 'modelo' : 'modelos'}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {modelos.length > 0 ? (
                modelos.map((modelo) => (
                  <div key={modelo.id} className="border-b pb-6 last:border-0 last:pb-0">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {modelo.id}. {modelo.nombre}
                        </h3>
                      </div>
                    </div>

                    <div className="mb-4 space-y-2 text-sm text-muted-foreground leading-relaxed">
                      {modelo.descripcion.split('\\n').map((line, idx) => (
                        <p key={idx}>{line}</p>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <CopyTextButton
                        text={`${modelo.nombre}\n\n${modelo.descripcion.split('\\n').join('\n')}`}
                        label="Copiar texto"
                      />
                      {modelo.url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={modelo.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Ir al enlace
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No hay modelos disponibles.
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
