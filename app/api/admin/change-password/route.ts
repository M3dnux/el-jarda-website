import { NextRequest, NextResponse } from 'next/server'
import sql from '../../../../lib/db'
import { hashPassword, verifyPassword } from '../../../../lib/auth'
import { validateAdminToken, createAuthResponse } from '../../../../lib/middleware'

export async function POST(request: NextRequest) {
  // Validate admin token
  const authResult = await validateAdminToken(request)
  if (!authResult.valid) {
    return createAuthResponse(authResult.error || 'Non autorisé')
  }

  try {
    const body = await request.json()
    const { currentPassword, newPassword } = body

    // Use authenticated user's email from token
    const email = authResult.user.email

    // Validate input
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Le nouveau mot de passe doit contenir au moins 6 caractères' }, { status: 400 })
    }

    // Get user from database
    const [user] = await sql`
      SELECT * FROM users WHERE email = ${email} AND role = 'admin'
    `

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 })
    }

    // Verify current password
    const isCurrentPasswordValid = await verifyPassword(currentPassword, user.password)
    
    if (!isCurrentPasswordValid) {
      return NextResponse.json({ error: 'Mot de passe actuel incorrect' }, { status: 400 })
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(newPassword)

    // Update password in database
    await sql`
      UPDATE users 
      SET password = ${hashedNewPassword}, updated_at = CURRENT_TIMESTAMP
      WHERE email = ${email} AND role = 'admin'
    `

    return NextResponse.json({ 
      success: true, 
      message: 'Mot de passe mis à jour avec succès' 
    })

  } catch (error) {
    console.error('Error changing password:', error)
    return NextResponse.json({ error: 'Erreur lors du changement de mot de passe' }, { status: 500 })
  }
}
