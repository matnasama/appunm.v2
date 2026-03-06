import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { sql, type ItemUnificada } from '@/lib/db'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, FileText } from 'lucide-react'

interface EnlacePageProps {
  params: Promise<{ id: string }>
}

async function getEnlace(id: number) {
  const items = await sql`
    SELECT * FROM items_unificada
    WHERE id = ${id} AND tipo = 'estudiantes' AND categoria = 'enlace'
  `
  return items[0] as ItemUnificada | undefined
}

async function getRelatedEnlaces() {
  const items = await sql`
    SELECT * FROM items_unificada
    WHERE tipo = 'estudiantes' AND categoria = 'enlace'
    ORDER BY titulo ASC
    LIMIT 5
  `
  return items as ItemUnificada[]
}

export async function generateMetadata({ params }: EnlacePageProps) {
  const { id } = await params
  const enlace = await getEnlace(parseInt(id))

  if (!enlace) {
    return { title: 'No encontrado - Portal UNM' }
  }

  return {
    title: `${enlace.titulo} - Portal UNM`,
    description: enlace.descripcion,
  }
}

export default async function EnlacePage({ params }: EnlacePageProps) {
  const { id } = await params
  const enlace = await getEnlace(parseInt(id))

  if (!enlace) {
    notFound()
  }

  const relatedEnlaces = await getRelatedEnlaces()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-secondary/30">
        <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
          <Link
            href="/categoria/enlace"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a Enlaces
          </Link>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col gap-4">
                <CardTitle className="text-3xl uppercase">{enlace.titulo}</CardTitle>

                {enlace.tags && enlace.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {enlace.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {enlace.descripcion && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Descripción</h3>
                  <p className="whitespace-pre-wrap leading-relaxed text-foreground">
                    {enlace.descripcion}
                  </p>
                </div>
              )}

              {enlace.enlace && (
                <div className="space-y-3 border-t pt-6">
                  <h3 className="font-semibold text-foreground">Acceso directo</h3>
                  <Button variant="default" size="sm" asChild>
                    <a href={enlace.enlace} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Ir al enlace
                    </a>
                  </Button>
                </div>
              )}

              {enlace.formulario && enlace.formulario.length > 0 && (
                <div className="space-y-3 border-t pt-6">
                  <h3 className="font-semibold text-foreground">Formularios</h3>
                  <div className="flex flex-wrap gap-2">
                    {enlace.formulario.map((form, idx) => (
                      <Button key={idx} variant="default" size="sm" asChild>
                        <a href={form.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          {form.label}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {enlace.documento && enlace.documento.length > 0 && (
                <div className="space-y-3 border-t pt-6">
                  <h3 className="font-semibold text-foreground">Documentos</h3>
                  <div className="flex flex-wrap gap-2">
                    {enlace.documento.map((doc, idx) => (
                      <Button key={idx} variant="outline" size="sm" asChild>
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">
                          <FileText className="mr-2 h-4 w-4" />
                          {doc.label}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {relatedEnlaces && relatedEnlaces.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Otros Enlaces</h2>
              <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                {relatedEnlaces
                  .filter((item) => item.id !== enlace.id)
                  .slice(0, 4)
                  .map((item) => (
                    <Link key={item.id} href={`/enlace/${item.id}`} className="block">
                      <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg">
                        <CardHeader>
                          <CardTitle className="line-clamp-2 text-lg uppercase">
                            {item.titulo}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="line-clamp-2 text-sm text-muted-foreground">
                            {item.descripcion}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}