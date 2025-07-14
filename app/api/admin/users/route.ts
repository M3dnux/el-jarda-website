import { NextRequest, NextResponse } from 'next/server'
import sql from '../../../../lib/db'
import { validateAdminToken, createAuthResponse } from '../../../../lib/middleware'

export async function GET(request: NextRequest) {
  // Validate admin token
  const authResult = await validateAdminToken(request)
  if (!authResult.valid) {
    return createAuthResponse(authResult.error || 'Non autorisé')
  }

  try {
    // Get admin users (excluding passwords for security)
    const adminUsers = await sql`
      SELECT id, email, role, created_at
      FROM users
      WHERE role = 'admin'
      ORDER BY created_at DESC
    `

    return NextResponse.json(adminUsers)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des utilisateurs admin' },
      { status: 500 }
    )
  }
}
