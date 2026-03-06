'use client'

import { useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface AsignaturaItem {
  nombre: string
  url: string
  codigo: string
  materia: string
  ciclo_lectivo: string
  resolucion: string
}

interface AsignaturasFilterProps {
  asignaturas: AsignaturaItem[]
  initialQuery?: string
}

const normalizeValue = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

export function AsignaturasFilter({ asignaturas, initialQuery = '' }: AsignaturasFilterProps) {
  const [query, setQuery] = useState(initialQuery)

  const filteredAsignaturas = useMemo(() => {
    const normalizedQuery = normalizeValue(query.trim())
    if (!normalizedQuery) return asignaturas

    return asignaturas.filter((asignatura) => {
      const codigo = normalizeValue(asignatura.codigo)
      const materia = normalizeValue(asignatura.materia)
      const nombre = normalizeValue(asignatura.nombre)

      return (
        codigo.includes(normalizedQuery) ||
        materia.includes(normalizedQuery) ||
        nombre.includes(normalizedQuery)
      )
    })
  }, [asignaturas, query])

  return (
    <section className="px-4 py-8 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 max-w-xl">
          <Input
            type="search"
            placeholder="Buscar por codigo o materia"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <p className="mt-2 text-sm text-muted-foreground">
            {filteredAsignaturas.length} {filteredAsignaturas.length === 1 ? 'resultado' : 'resultados'}
          </p>
        </div>

        {filteredAsignaturas.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAsignaturas.map((asignatura, index) => (
              <Card key={`${asignatura.codigo}-${index}`} className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold">
                    {asignatura.materia || asignatura.nombre}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">Codigo: {asignatura.codigo}</p>
                    {asignatura.ciclo_lectivo && (
                      <p className="text-muted-foreground">Ciclo lectivo: {asignatura.ciclo_lectivo}</p>
                    )}
                    {asignatura.resolucion && (
                      <p className="text-muted-foreground">Resolucion: {asignatura.resolucion}</p>
                    )}
                    <a
                      href={asignatura.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex text-primary hover:underline"
                    >
                      Ver programa
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No hay asignaturas para esta busqueda.</p>
          </div>
        )}
      </div>
    </section>
  )
}
