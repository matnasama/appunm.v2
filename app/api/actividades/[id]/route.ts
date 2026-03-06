import { sql } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// Editar actividad (solo si es del usuario)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const { titulo, fecha, descripcion, usuario } = body

    if (!usuario) {
      return NextResponse.json(
        { error: 'Se requiere usuario' },
        { status: 400 }
      )
    }

    // Verificar que la actividad pertenece al usuario
    const actividad = await sql`
      SELECT usuario FROM public.actividades_usuarios WHERE id = ${id}
    `

    if (!actividad || actividad.length === 0) {
      return NextResponse.json(
        { error: 'Actividad no encontrada' },
        { status: 404 }
      )
    }

    if (actividad[0].usuario !== usuario) {
      return NextResponse.json(
        { error: 'No tienes permiso para editar esta actividad' },
        { status: 403 }
      )
    }

    const result = await sql`
      UPDATE public.actividades_usuarios
      SET 
        titulo = COALESCE(${titulo || null}, titulo),
        fecha = COALESCE(${fecha || null}, fecha),
        descripcion = ${descripcion || null},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, titulo, fecha, descripcion, usuario, updated_at
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error updating actividad:', error)
    return NextResponse.json(
      { error: 'Error al actualizar actividad' },
      { status: 500 }
    )
  }
}

// Eliminar actividad (solo si es del usuario)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(req.url)
    const usuario = searchParams.get('usuario')

    if (!usuario) {
      return NextResponse.json(
        { error: 'Se requiere usuario' },
        { status: 400 }
      )
    }

    // Verificar que la actividad pertenece al usuario
    const actividad = await sql`
      SELECT usuario FROM public.actividades_usuarios WHERE id = ${id}
    `

    if (!actividad || actividad.length === 0) {
      return NextResponse.json(
        { error: 'Actividad no encontrada' },
        { status: 404 }
      )
    }

    if (actividad[0].usuario !== usuario) {
      return NextResponse.json(
        { error: 'No tienes permiso para eliminar esta actividad' },
        { status: 403 }
      )
    }

    await sql`
      DELETE FROM public.actividades_usuarios WHERE id = ${id}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting actividad:', error)
    return NextResponse.json(
      { error: 'Error al eliminar actividad' },
      { status: 500 }
    )
  }
}
