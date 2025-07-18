import { NextRequest, NextResponse } from 'next/server'
import sql from '../../../../lib/db'
import { verifyPassword, generateToken } from '../../../../lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 })
    }

    // Get user from database
    const [user] = await sql`
      SELECT * FROM users WHERE email = ${email} AND role = 'admin'
    `

    if (!user) {
      return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 })
    }

    // Generate JWT token
    const token = generateToken(user.id.toString())

    // Update last login
    await sql`
      UPDATE users 
      SET updated_at = CURRENT_TIMESTAMP 
      WHERE id = ${user.id}
    `

    return NextResponse.json({ 
      success: true, 
      message: 'Connexion réussie',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    console.error('Error in admin login:', error)
    return NextResponse.json({ error: 'Erreur lors de la connexion' }, { status: 500 })
  }
}
