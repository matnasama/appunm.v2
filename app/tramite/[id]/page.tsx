import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { sql, type ItemUnificada } from '@/lib/db'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, FileText } from 'lucide-react'

interface TramitePageProps {
  params: Promise<{ id: string }>
}

async function getTramite(id: number) {
  const items = await sql`
    SELECT * FROM items_unificada 
    WHERE id = ${id} AND tipo = 'estudiantes' AND categoria = 'tramite'
  `
  return items[0] as ItemUnificada | undefined
}

async function getRelatedTramites() {
  const items = await sql`
    SELECT * FROM items_unificada 
    WHERE tipo = 'estudiantes' AND categoria = 'tramite'
    ORDER BY titulo ASC
    LIMIT 5
  `
  return items as ItemUnificada[]
}

export async function generateMetadata({ params }: TramitePageProps) {
  const { id } = await params
  const tramite = await getTramite(parseInt(id))
  
  if (!tramite) {
    return { title: 'No encontrado - Portal UNM' }
  }
  
  return {
    title: `${tramite.titulo} - Portal UNM`,
    description: tramite.descripcion,
  }
}

export default async function TramitePage({ params }: TramitePageProps) {
  const { id } = await params
  const tramite = await getTramite(parseInt(id))
  
  if (!tramite) {
    notFound()
  }

  const relatedTramites = await getRelatedTramites()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-secondary/30">
        <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
          {/* Back button */}
          <Link href="/categoria/tramite" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" />
            Volver a Trámites
          </Link>

          {/* Main content */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col gap-4">
                <CardTitle className="text-3xl uppercase">{tramite.titulo}</CardTitle>
                
                {/* Tags */}
                {tramite.tags && tramite.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tramite.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Description */}
              {tramite.descripcion && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Descripción</h3>
                  <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                    {tramite.descripcion}
                  </p>
                </div>
              )}

              {/* Formulario links */}
              {tramite.formulario && tramite.formulario.length > 0 && (
                <div className="space-y-3 border-t pt-6">
                  <h3 className="font-semibold text-foreground">Formularios</h3>
                  <div className="flex flex-wrap gap-2">
                    {tramite.formulario.map((form, idx) => (
                      <Button
                        key={idx}
                        variant="default"
                        size="sm"
                        asChild
                      >
                        <a href={form.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {form.label}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Documento links */}
              {tramite.documento && tramite.documento.length > 0 && (
                <div className="space-y-3 border-t pt-6">
                  <h3 className="font-semibold text-foreground">Documentos</h3>
                  <div className="flex flex-wrap gap-2">
                    {tramite.documento.map((doc, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">
                          <FileText className="h-4 w-4 mr-2" />
                          {doc.label}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Related tramites */}
          {relatedTramites && relatedTramites.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Otros Trámites</h2>
              <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                {relatedTramites.filter(t => t.id !== tramite.id).slice(0, 4).map((item) => (
                  <Link key={item.id} href={`/tramite/${item.id}`} className="block">
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-lg uppercase line-clamp-2">
                          {item.titulo}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">
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
