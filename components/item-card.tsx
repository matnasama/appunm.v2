import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { type Item, categoryLabels } from '@/lib/db'
import { ArrowRight } from 'lucide-react'

interface ItemCardProps {
  item: Item
  showCategory?: boolean
}

export function ItemCard({ item, showCategory = false }: ItemCardProps) {
  return (
    <Link href={`/item/${item.id}`} className="group block">
      <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="line-clamp-2 text-lg font-semibold uppercase group-hover:text-primary">
              {item.titulo}
            </CardTitle>
            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:text-primary group-hover:opacity-100" />
          </div>
          {showCategory && (
            <Badge variant="secondary" className="w-fit">
              {categoryLabels[item.categoria]}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="pt-0">
          <p className="line-clamp-3 text-sm text-muted-foreground">{item.descripcion}</p>
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
        </CardContent>
      </Card>
    </Link>
  )
}
