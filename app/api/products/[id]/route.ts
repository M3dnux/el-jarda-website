import { NextRequest, NextResponse } from 'next/server'
import sql from '../../../../lib/db'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()
    const { name_fr, name_ar, description_fr, description_ar, price, category_id, stock, reference, image_url } = body

    const [product] = await sql`
      UPDATE products 
      SET 
        name_fr = ${name_fr},
        name_ar = ${name_ar},
        description_fr = ${description_fr},
        description_ar = ${description_ar},
        price = ${price},
        category_id = ${category_id},
        stock = ${stock},
        reference = ${reference},
        image_url = ${image_url},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const [deletedProduct] = await sql`
      DELETE FROM products 
      WHERE id = ${id}
      RETURNING *
    `

    if (!deletedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
