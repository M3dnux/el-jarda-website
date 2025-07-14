import { NextRequest, NextResponse } from 'next/server'
import sql from '../../../../lib/db'
import { validateAdminToken, createAuthResponse } from '../../../../lib/middleware'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  // Validate admin token for updating categories
  const authResult = await validateAdminToken(request)
  if (!authResult.valid) {
    return createAuthResponse(authResult.error || 'Non autorisé')
  }

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
  // Validate admin token for deleting categories
  const authResult = await validateAdminToken(request)
  if (!authResult.valid) {
    return createAuthResponse(authResult.error || 'Non autorisé')
  }

  try {
    const id = params.id

    // Validate that id is a number
    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 })
    }

    // Check if there are products using this category
    const productsUsingCategory = await sql`
      SELECT COUNT(*) as count FROM products WHERE category_id = ${id}
    `

    if (productsUsingCategory[0].count > 0) {
      return NextResponse.json(
        { error: 'Impossible de supprimer la catégorie. Il y a des produits qui utilisent cette catégorie.' }, 
        { status: 400 }
      )
    }

    // First check if the category exists
    const existingCategory = await sql`
      SELECT id FROM categories WHERE id = ${id}
    `

    if (existingCategory.length === 0) {
      return NextResponse.json({ error: 'Catégorie non trouvée' }, { status: 404 })
    }

    // Delete the category
    const [deletedCategory] = await sql`
      DELETE FROM categories 
      WHERE id = ${id}
      RETURNING *
    `

    if (!deletedCategory) {
      return NextResponse.json({ error: 'Erreur lors de la suppression de la catégorie' }, { status: 500 })
    }

    return NextResponse.json({ 
      message: 'Catégorie supprimée avec succès',
      deletedCategory 
    })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json({ 
      error: 'Erreur interne du serveur lors de la suppression de la catégorie' 
    }, { status: 500 })
  }
}
