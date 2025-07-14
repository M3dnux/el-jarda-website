import { NextRequest, NextResponse } from 'next/server'
import sql from '../../../lib/db'
import { validateAdminToken, createAuthResponse } from '../../../lib/middleware'

export async function GET() {
  try {
    const categories = await sql`
      SELECT * FROM categories
      ORDER BY name_fr ASC
    `
    
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  // Validate admin token for creating categories
  const authResult = await validateAdminToken(request)
  if (!authResult.valid) {
    return createAuthResponse(authResult.error || 'Non autorisé')
  }

  try {
    const body = await request.json()
    const { name_fr, name_ar, description_fr, description_ar } = body

    const [category] = await sql`
      INSERT INTO categories (name_fr, name_ar, description_fr, description_ar)
      VALUES (${name_fr}, ${name_ar}, ${description_fr}, ${description_ar})
      RETURNING *
    `

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}
