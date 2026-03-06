import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { type ItemUnificada } from '@/lib/db'
import { FileText, ExternalLink } from 'lucide-react'

interface ItemInternoCardProps {
  item: ItemUnificada
}

export function ItemInternoCard({ item }: ItemInternoCardProps) {
  const isFormulariosParaDescargar =
    item.titulo.trim().toUpperCase() === 'FORMULARIOS PARA DESCARGAR'
  const isBedelia = item.titulo.trim().toUpperCase() === 'BEDELÍA'
  const isModelosCorreos =
    item.titulo.trim().toUpperCase() === 'MODELOS DE RESPUESTA PARA CORREOS'
  const useSingleActionButton = isFormulariosParaDescargar || isBedelia || isModelosCorreos

  return (
    <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-2 text-lg font-semibold uppercase">
          {item.titulo}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {item.descripcion && !useSingleActionButton && (
          <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">{item.descripcion}</p>
        )}
        
        <div className="space-y-2">
          {isFormulariosParaDescargar && (
            <div>
              <Link href="/interno/formularios-para-descargar" className="inline-flex">
                <Button variant="default" size="sm" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Carpeta de archivos
                </Button>
              </Link>
            </div>
          )}

          {isBedelia && (
            <div>
              <Link href="/interno/bedelia/repositorio" className="inline-flex">
                <Button variant="default" size="sm" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Repositorio
                </Button>
              </Link>
            </div>
          )}

          {isModelosCorreos && (
            <div>
              <Link href="/interno/modelos-respuesta-correos/repositorio" className="inline-flex">
                <Button variant="default" size="sm" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Repositorio
                </Button>
              </Link>
            </div>
          )}

          {/* Enlace directo */}
          {item.enlace && (
            <div>
              <a
                href={item.enlace}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button variant="default" size="sm" className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Ir al enlace
                </Button>
              </a>
            </div>
          )}

          {/* Formularios */}
          {!useSingleActionButton && item.formulario && item.formulario.length > 0 && (
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Formularios:</p>
              <div className="flex flex-wrap gap-1.5">
                {item.formulario.map((form, i) => (
                  <a
                    key={i}
                    href={form.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary hover:bg-primary/20"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {form.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Documentos/Hojas de cálculo */}
          {!useSingleActionButton && item.documento && item.documento.length > 0 && (
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Documentos:</p>
              <div className="flex flex-wrap gap-1.5">
                {item.documento.map((doc, i) => (
                  <a
                    key={i}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-medium hover:bg-secondary/80"
                  >
                    <FileText className="h-3 w-3" />
                    {doc.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {item.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{item.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
