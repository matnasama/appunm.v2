import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { type ItemUnificada } from '@/lib/db'

interface TramiteCardProps {
  item: ItemUnificada
}

export function TramiteCard({ item }: TramiteCardProps) {
  return (
    <Link href={`/tramite/${item.id}`}>
      <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md cursor-pointer">
        <CardHeader className="pb-3">
          <CardTitle className="line-clamp-2 text-lg font-semibold uppercase">
            {item.titulo}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {item.descripcion && (
            <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
              {item.descripcion}
            </p>
          )}
          
          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
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
        </CardContent>
      </Card>
    </Link>
  )
}
