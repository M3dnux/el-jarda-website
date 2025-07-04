import { NextRequest, NextResponse } from 'next/server'
import sql from '../../../../lib/db'
import { hashPassword, verifyToken } from '../../../../lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, newPassword } = body

    if (!token || !newPassword) {
      return NextResponse.json({ error: 'Token et nouveau mot de passe requis' }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Le mot de passe doit contenir au moins 6 caractères' }, { status: 400 })
    }

    // Verify token
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token invalide ou expiré' }, { status: 400 })
    }

    // Check if user exists and token is valid
    const [user] = await sql`
      SELECT * FROM users 
      WHERE id = ${decoded.userId} 
      AND role = 'admin'
      AND reset_token = ${token}
      AND reset_token_expiry > CURRENT_TIMESTAMP
    `

    if (!user) {
      return NextResponse.json({ error: 'Token invalide ou expiré' }, { status: 400 })
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword)

    // Update password and clear reset token
    await sql`
      UPDATE users 
      SET password = ${hashedPassword}, 
          reset_token = NULL, 
          reset_token_expiry = NULL,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${user.id}
    `

    return NextResponse.json({ 
      success: true, 
      message: 'Mot de passe réinitialisé avec succès' 
    })

  } catch (error) {
    console.error('Error resetting password:', error)
    return NextResponse.json({ error: 'Erreur lors de la réinitialisation du mot de passe' }, { status: 500 })
  }
}
