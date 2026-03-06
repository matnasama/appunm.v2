import { sql, type Category } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get('category') as Category | null
  const search = searchParams.get('search')
  const tag = searchParams.get('tag')

  try {
    let query = `SELECT * FROM items WHERE 1=1`
    const params: (string | Category)[] = []
    let paramIndex = 1

    if (category) {
      query += ` AND categoria = $${paramIndex}`
      params.push(category)
      paramIndex++
    }

    if (search) {
      query += ` AND (titulo ILIKE $${paramIndex} OR descripcion ILIKE $${paramIndex})`
      params.push(`%${search}%`)
      paramIndex++
    }

    if (tag) {
      query += ` AND $${paramIndex} = ANY(tags)`
      params.push(tag)
      paramIndex++
    }

    query += ` ORDER BY updated_at DESC`

    const items = await sql(query, params)
    return NextResponse.json(items)
  } catch (error) {
    console.error('Error fetching items:', error)
    return NextResponse.json({ error: 'Error fetching items' }, { status: 500 })
  }
}
