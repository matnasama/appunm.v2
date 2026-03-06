import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, FileText, FolderOpen } from 'lucide-react'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { sql, type ItemUnificada } from '@/lib/db'

async function getFormulariosParaDescargar() {
  const items = await sql`
    SELECT *
    FROM items_unificada
    WHERE tipo = 'nodocente'
      AND categoria = 'interno'
      AND titulo = 'FORMULARIOS PARA DESCARGAR'
    LIMIT 1
  `

  return items[0] as ItemUnificada | undefined
}

export async function generateMetadata() {
  return {
    title: 'Carpeta de archivos - Portal UNM',
    description: 'Listado de formularios para descargar del área interna.',
  }
}

export default async function FormulariosParaDescargarPage() {
  const item = await getFormulariosParaDescargar()

  if (!item) {
    notFound()
  }

  const formularios = item.formulario ?? []
  const documentos = item.documento ?? []
  const totalArchivos = formularios.length + documentos.length

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
                <CardTitle className="text-3xl uppercase">Carpeta de archivos</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="inline-flex items-center gap-1">
                    <FolderOpen className="h-3.5 w-3.5" />
                    {totalArchivos} {totalArchivos === 1 ? 'archivo' : 'archivos'}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {formularios.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold">Formularios</h2>
                  <div className="grid gap-2 sm:grid-cols-1 lg:grid-cols-2">
                    {formularios.map((form, idx) => (
                      <Button key={`${form.url}-${idx}`} variant="outline" className="justify-start" asChild>
                        <a href={form.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          <span className="truncate">{form.label}</span>
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {documentos.length > 0 && (
                <div className="space-y-3 border-t pt-6">
                  <h2 className="text-lg font-semibold">Documentos</h2>
                  <div className="grid gap-2 sm:grid-cols-1 lg:grid-cols-2">
                    {documentos.map((doc, idx) => (
                      <Button key={`${doc.url}-${idx}`} variant="outline" className="justify-start" asChild>
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">
                          <FileText className="mr-2 h-4 w-4" />
                          <span className="truncate">{doc.label}</span>
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {totalArchivos === 0 && (
                <p className="text-sm text-muted-foreground">
                  No hay archivos cargados por el momento.
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
