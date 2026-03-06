import { sql } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const items = await sql`SELECT * FROM items WHERE id = ${parseInt(id)}`
    
    if (items.length === 0) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    return NextResponse.json(items[0])
  } catch (error) {
    console.error('Error fetching item:', error)
    return NextResponse.json({ error: 'Error fetching item' }, { status: 500 })
  }
}
