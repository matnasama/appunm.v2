'use client'

import { useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Usuario {
  nombre: string
  interno: string[]
  area: string
}

interface InternosFilterProps {
  usuarios: Usuario[]
  initialQuery?: string
}

const normalizeValue = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

export function InternosFilter({ usuarios, initialQuery = '' }: InternosFilterProps) {
  const [query, setQuery] = useState(initialQuery)

  const filteredUsuarios = useMemo(() => {
    const normalizedQuery = normalizeValue(query.trim())
    if (!normalizedQuery) return usuarios

    return usuarios.filter((usuario) => {
      const nombre = normalizeValue(usuario.nombre)
      const area = normalizeValue(usuario.area)
      if (nombre.includes(normalizedQuery) || area.includes(normalizedQuery)) {
        return true
      }

      return usuario.interno.some((interno) =>
        normalizeValue(interno).includes(normalizedQuery),
      )
    })
  }, [usuarios, query])

  const handleReset = () => {
    setQuery('')
  }

  return (
    <>
      <section className="px-4 pb-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex w-full max-w-2xl gap-2">
            <Input
              type="search"
              placeholder="Buscar por nombre"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={!query.trim()}
            >
              Reset
            </Button>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {filteredUsuarios.length} {filteredUsuarios.length === 1 ? 'resultado' : 'resultados'}
          </p>
        </div>
      </section>

      <section className="px-4 py-8 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl">
          {filteredUsuarios.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Internos</TableHead>
                  <TableHead>Area</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsuarios.map((usuario, index) => (
                  <TableRow key={`${usuario.nombre}-${index}`}>
                    <TableCell className="font-medium">{usuario.nombre}</TableCell>
                    <TableCell>
                      {usuario.interno.length > 0 ? usuario.interno.join(' / ') : 'Sin internos'}
                    </TableCell>
                    <TableCell>{usuario.area}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="rounded-lg border border-dashed border-border px-6 py-10 text-center">
              <p className="text-lg font-medium text-foreground">No hay resultados</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Intenta con otro nombre o revisa la escritura.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
