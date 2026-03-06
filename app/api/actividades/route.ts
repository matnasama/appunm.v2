import { sql } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// Obtener actividades por fecha o rango
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const fecha = searchParams.get('fecha')
    const mesAno = searchParams.get('mes-ano') // formato: YYYY-MM

    if (!fecha && !mesAno) {
      return NextResponse.json(
        { error: 'Se requiere fecha o mes-ano' },
        { status: 400 }
      )
    }

    let actividades

    if (fecha) {
      // Obtener actividades de un día específico
      const [fijas, usuarios] = await Promise.all([
        sql`
          SELECT id, titulo, fecha_inicio, fecha_fin, descripcion, 'fija' as tipo
          FROM public.actividades_fijas
          WHERE fecha_inicio <= ${fecha}::date
            AND fecha_fin >= ${fecha}::date
          ORDER BY fecha_inicio, titulo ASC
        `,
        sql`
          SELECT id, titulo, fecha, descripcion, usuario, 'usuario' as tipo, created_at
          FROM public.actividades_usuarios
          WHERE fecha = ${fecha}
          ORDER BY created_at DESC
        `
      ])
      actividades = [...fijas, ...usuarios]
    } else if (mesAno) {
      // Obtener actividades del mes
      const primerDia = `${mesAno}-01`
      const [fijas, usuarios] = await Promise.all([
        sql`
          SELECT id, titulo, fecha_inicio, fecha_fin, descripcion, 'fija' as tipo
          FROM public.actividades_fijas
          WHERE fecha_inicio <= (DATE_TRUNC('month', ${primerDia}::date) + interval '1 month' - interval '1 day')
            AND fecha_fin >= DATE_TRUNC('month', ${primerDia}::date)
          ORDER BY fecha_inicio, titulo ASC
        `,
        sql`
          SELECT id, titulo, fecha, descripcion, usuario, 'usuario' as tipo, created_at
          FROM public.actividades_usuarios
          WHERE DATE_TRUNC('month', fecha) = DATE_TRUNC('month', ${primerDia}::date)
          ORDER BY fecha, created_at DESC
        `
      ])
      actividades = [...fijas, ...usuarios]
    }

    return NextResponse.json(actividades)
  } catch (error) {
    console.error('Error fetching actividades:', error)
    return NextResponse.json(
      { error: 'Error al obtener actividades' },
      { status: 500 }
    )
  }
}

// Crear actividad de usuario
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { titulo, fecha, descripcion, usuario } = body

    if (!titulo || !fecha || !usuario) {
      return NextResponse.json(
        { error: 'Se requieren titulo, fecha y usuario' },
        { status: 400 }
      )
    }

    const result = await sql`
      INSERT INTO public.actividades_usuarios (titulo, fecha, descripcion, usuario)
      VALUES (${titulo}, ${fecha}, ${descripcion || null}, ${usuario})
      RETURNING id, titulo, fecha, descripcion, usuario, created_at
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('Error creating actividad:', error)
    return NextResponse.json(
      { error: 'Error al crear actividad' },
      { status: 500 }
    )
  }
}
