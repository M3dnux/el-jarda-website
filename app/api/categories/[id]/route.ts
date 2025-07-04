import { NextRequest, NextResponse } from 'next/server'
import sql from '../../../../lib/db'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()
    const { name_fr, name_ar, description_fr, description_ar } = body

    const [category] = await sql`
      UPDATE categories 
      SET 
        name_fr = ${name_fr},
        name_ar = ${name_ar},
        description_fr = ${description_fr},
        description_ar = ${description_ar},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Check if there are products using this category
    const productsUsingCategory = await sql`
      SELECT COUNT(*) as count FROM products WHERE category_id = ${id}
    `

    if (productsUsingCategory[0].count > 0) {
      return NextResponse.json(
        { error: 'Cannot delete category. There are products using this category.' }, 
        { status: 400 }
      )
    }

    const [deletedCategory] = await sql`
      DELETE FROM categories 
      WHERE id = ${id}
      RETURNING *
    `

    if (!deletedCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Category deleted successfully' })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
  }
}
