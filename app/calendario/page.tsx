'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import Link from 'next/link'
import { es } from 'date-fns/locale'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isWithinInterval, parseISO } from 'date-fns'

interface Actividad {
  id: number
  titulo: string
  fecha?: string
  fecha_inicio?: string
  fecha_fin?: string
  descripcion?: string
  usuario?: string
  tipo: 'fija' | 'usuario'
}

const USUARIO_MOCK = 'usuario-actual' // TODO: Reemplazar con usuario real de sesión

export default function CalendarioPage() {
  const [mes, setMes] = useState(new Date(2026, 1)) // Febrero 2026 por defecto
  const [actividades, setActividades] = useState<Actividad[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [actividadesDelDia, setActividadesDelDia] = useState<Actividad[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [formData, setFormData] = useState({ titulo: '', descripcion: '' })
  const [loading, setLoading] = useState(false)

  // Obtener actividades del mes
  useEffect(() => {
    const fetchActividades = async () => {
      const mesAno = format(mes, 'yyyy-MM')
      try {
        const res = await fetch(`/api/actividades?mes-ano=${mesAno}`)
        const data = await res.json()
        setActividades(data)
      } catch (error) {
        console.error('Error fetching actividades:', error)
      }
    }
    fetchActividades()
  }, [mes])

  // Actualizar actividades del día cuando se selecciona
  useEffect(() => {
    if (selectedDate) {
      const fecha = format(selectedDate, 'yyyy-MM-dd')
      const actividadesDia = actividades.filter((a) => {
        if (a.tipo === 'fija' && a.fecha_inicio && a.fecha_fin) {
          const inicio = parseISO(a.fecha_inicio)
          const fin = parseISO(a.fecha_fin)
          return isWithinInterval(parseISO(fecha), { start: inicio, end: fin })
        }
        if (a.fecha) {
          return format(parseISO(a.fecha), 'yyyy-MM-dd') === fecha
        }
        return false
      })
      setActividadesDelDia(actividadesDia)
      return
    }
    setActividadesDelDia([])
  }, [selectedDate, actividades])

  const handleAgregarActividad = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !formData.titulo.trim()) return

    setLoading(true)
    try {
      const fecha = format(selectedDate, 'yyyy-MM-dd')
      const res = await fetch('/api/actividades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: formData.titulo,
          fecha,
          descripcion: formData.descripcion,
          usuario: USUARIO_MOCK
        })
      })

      if (res.ok) {
        const newActividad = await res.json()
        setActividades([...actividades, newActividad])
        setFormData({ titulo: '', descripcion: '' })
        setOpenDialog(false)
      }
    } catch (error) {
      console.error('Error agregando actividad:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEliminarActividad = async (id: number) => {
    try {
      const res = await fetch(`/api/actividades/${id}?usuario=${USUARIO_MOCK}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setActividades(actividades.filter(a => a.id !== id))
      }
    } catch (error) {
      console.error('Error eliminando actividad:', error)
    }
  }

  const diasConActividades = (() => {
    const inicioMes = startOfMonth(mes)
    const finMes = endOfMonth(mes)
    const dias = new Set<string>()

    actividades.forEach((a) => {
      if (a.tipo === 'fija' && a.fecha_inicio && a.fecha_fin) {
        const inicio = parseISO(a.fecha_inicio)
        const fin = parseISO(a.fecha_fin)
        const rangoInicio = inicio > inicioMes ? inicio : inicioMes
        const rangoFin = fin < finMes ? fin : finMes

        if (rangoInicio <= rangoFin) {
          eachDayOfInterval({ start: rangoInicio, end: rangoFin }).forEach((d) => {
            dias.add(format(d, 'yyyy-MM-dd'))
          })
        }
      } else if (a.fecha) {
        dias.add(format(parseISO(a.fecha), 'yyyy-MM-dd'))
      }
    })

    return Array.from(dias, (d) => parseISO(d))
  })()

  const diasFeriados = (() => {
    const inicioMes = startOfMonth(mes)
    const finMes = endOfMonth(mes)
    const dias = new Set<string>()

    actividades.forEach((a) => {
      if (a.tipo !== 'fija' || a.descripcion !== 'Feriado') return
      if (!a.fecha_inicio || !a.fecha_fin) return

      const inicio = parseISO(a.fecha_inicio)
      const fin = parseISO(a.fecha_fin)
      const rangoInicio = inicio > inicioMes ? inicio : inicioMes
      const rangoFin = fin < finMes ? fin : finMes

      if (rangoInicio <= rangoFin) {
        eachDayOfInterval({ start: rangoInicio, end: rangoFin }).forEach((d) => {
          dias.add(format(d, 'yyyy-MM-dd'))
        })
      }
    })

    return Array.from(dias, (d) => parseISO(d))
  })()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background px-4 py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">Inicio</Link>
              <span className="mx-2">/</span>
              <span>Calendario</span>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
              Calendario {mes.getFullYear()}
            </h1>
            <p className="mb-6 max-w-2xl text-muted-foreground">
              Visualiza y gestiona actividades, feriados y eventos importantes del año.
            </p>
          </div>
        </section>

        {/* Calendario Content */}
        <section className="px-4 py-8 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Calendario */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{format(mes, 'MMMM yyyy', { locale: es })}</span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setMes(new Date(mes.getFullYear(), mes.getMonth() - 1))}
                      >
                        ←
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setMes(new Date(mes.getFullYear(), mes.getMonth() + 1))}
                      >
                        →
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate || undefined}
                    onSelect={setSelectedDate}
                    month={mes}
                    onMonthChange={setMes}
                    locale={es}
                    footer={selectedDate ? `${format(selectedDate, 'dd/MM/yyyy')}` : 'Selecciona un día'}
                    disabled={(date) => false}
                    modifiers={{
                      hasActivities: diasConActividades,
                      isHoliday: diasFeriados
                    }}
                    modifiersClassNames={{
                      hasActivities: 'bg-primary/20 font-bold hover:bg-primary/30',
                      isHoliday: 'bg-red-200/70 text-red-900 font-semibold hover:bg-red-200'
                    }}
                    className="w-full"
                  />
                </CardContent>
              </Card>

              {/* Actividades del día */}
              <div className="flex flex-col gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {selectedDate
                        ? `Actividades - ${format(selectedDate, 'dd/MM/yyyy')}`
                        : 'Selecciona un día'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedDate && (
                      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                        <DialogTrigger asChild>
                          <Button className="mb-4 w-full">+ Agregar actividad</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Nueva actividad - {format(selectedDate, 'dd/MM/yyyy')}
                            </DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleAgregarActividad} className="space-y-4">
                            <div>
                              <Label htmlFor="titulo">Título</Label>
                              <Input
                                id="titulo"
                                placeholder="Título de la actividad"
                                value={formData.titulo}
                                onChange={(e) =>
                                  setFormData({ ...formData, titulo: e.target.value })
                                }
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="descripcion">Descripción</Label>
                              <Textarea
                                id="descripcion"
                                placeholder="Describe la actividad (opcional)"
                                value={formData.descripcion}
                                onChange={(e) =>
                                  setFormData({ ...formData, descripcion: e.target.value })
                                }
                              />
                            </div>
                            <DialogFooter>
                              <Button type="submit" disabled={loading}>
                                {loading ? 'Guardando...' : 'Guardar'}
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    )}

                    {actividadesDelDia.length > 0 ? (
                      <div className="space-y-3">
                        {actividadesDelDia.map((actividad) => (
                          <Card key={actividad.id} className="border-l-4 border-l-primary p-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-semibold">{actividad.titulo}</p>
                                {actividad.descripcion && (
                                  <p className="text-sm text-muted-foreground">
                                    {actividad.descripcion}
                                  </p>
                                )}
                                {actividad.usuario && (
                                  <p className="text-xs text-muted-foreground">
                                    Por: {actividad.usuario}
                                  </p>
                                )}
                                {actividad.tipo === 'fija' && actividad.descripcion === 'Feriado' && (
                                  <p className="text-xs text-primary font-medium">Feriado</p>
                                )}
                              </div>
                              {actividad.tipo === 'usuario' &&
                                actividad.usuario === USUARIO_MOCK && (
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleEliminarActividad(actividad.id)}
                                  >
                                    Eliminar
                                  </Button>
                                )}
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No hay actividades para este día.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
