import React from "react"
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { type Category, categoryLabels, categoryDescriptions } from '@/lib/db'
import { 
  FileText, 
  ClipboardList,
  HelpCircle, 
  BookOpen, 
  GraduationCap, 
  Building2, 
  Link2,
  ArrowRight
} from 'lucide-react'

const categoryIcons: Record<Category, React.ComponentType<{ className?: string }>> = {
  tramite: FileText,
  'tramites-interno': ClipboardList,
  interno: ClipboardList,
  consulta: HelpCircle,
  asignatura: BookOpen,
  carrera: GraduationCap,
  edificio: Building2,
  enlace: Link2,
}

interface CategoryCardProps {
  category: Category
  count?: number
}

export function CategoryCard({ category, count }: CategoryCardProps) {
  const Icon = categoryIcons[category]
  
  return (
    <Link href={`/categoria/${category}`} className="group block">
      <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
        <CardContent className="flex flex-col items-center p-6 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
            <Icon className="h-7 w-7 text-primary" />
          </div>
          <h3 className="mb-2 font-semibold text-foreground group-hover:text-primary">
            {categoryLabels[category]}
          </h3>
          <p className="mb-3 text-sm text-muted-foreground">
            {categoryDescriptions[category]}
          </p>
          {count !== undefined && (
            <span className="text-xs text-muted-foreground">
              {count} {count === 1 ? 'elemento' : 'elementos'}
            </span>
          )}
          <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Ver todos <ArrowRight className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
