import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const result = await sql`
      SELECT DISTINCT unnest(tags) as tag 
      FROM items 
      ORDER BY tag
    `
    const tags = result.map((row) => row.tag as string)
    return NextResponse.json(tags)
  } catch (error) {
    console.error('Error fetching tags:', error)
    return NextResponse.json({ error: 'Error fetching tags' }, { status: 500 })
  }
}
