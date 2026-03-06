'use client'

import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface EdificioCardProps {
  id: number
  nombre: string
  imagen: string
  aulas: string[]
}

const parseLeadingNumber = (value: string) => {
  const match = value.match(/^(\d+)/)
  return match ? Number(match[1]) : null
}

const compareAulas = (a: string, b: string) => {
  const aNum = parseLeadingNumber(a)
  const bNum = parseLeadingNumber(b)

  if (aNum !== null && bNum !== null) {
    if (aNum !== bNum) return aNum - bNum
    return a.localeCompare(b)
  }

  if (aNum !== null) return -1
  if (bNum !== null) return 1
  return a.localeCompare(b)
}

export function EdificioCard({ id, nombre, imagen, aulas }: EdificioCardProps) {
  const imageSrc = imagen.startsWith('/') ? imagen : `/${imagen}`
  const sortedAulas = [...aulas].sort(compareAulas)

  return (
    <Card className="overflow-hidden p-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="relative aspect-[6/3] w-full overflow-hidden rounded-md border border-border bg-transparent p-0 hover:opacity-80">
            <Image
              src={imageSrc}
              alt={`Edificio ${nombre}`}
              fill
              sizes="(max-width: 1024px) 50vw, 20vw"
              className="object-contain"
            />
          </button>
        </TooltipTrigger>
        <TooltipContent side="left" sideOffset={8} className="max-h-80 w-70 p-3 text-xs">
          <p className="mb-1 text-sm font-bold text-background">
            {nombre}
          </p>
          <p className="mb-2 text-xs font-semibold text-background">
            Aulas ({aulas.length})
          </p>
          {sortedAulas.length > 0 ? (
            <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
              {sortedAulas.map((aula) => (
                <li key={aula}>{aula}</li>
              ))}
            </ul>
          ) : (
            <p>No hay aulas registradas.</p>
          )}
        </TooltipContent>
      </Tooltip>
    </Card>
  )
}
