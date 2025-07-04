import { NextRequest, NextResponse } from 'next/server'
import sql from '../../../lib/db'

export async function GET() {
  try {
    const products = await sql`
      SELECT 
        p.*,
        c.name_fr as category_name_fr,
        c.name_ar as category_name_ar
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `
    
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name_fr, name_ar, description_fr, description_ar, price, category_id, stock, reference, image_url } = body

    const [product] = await sql`
      INSERT INTO products (name_fr, name_ar, description_fr, description_ar, price, category_id, stock, reference, image_url)
      VALUES (${name_fr}, ${name_ar}, ${description_fr}, ${description_ar}, ${price}, ${category_id}, ${stock}, ${reference}, ${image_url})
      RETURNING *
    `

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
