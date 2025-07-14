import { NextRequest } from 'next/server'
import { verifyToken } from './auth'
import sql from './db'

export async function validateAdminToken(request: NextRequest): Promise<{ valid: boolean; user?: any; error?: string }> {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { valid: false, error: 'Token manquant' }
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix
    
    // Verify JWT token
    const decoded = verifyToken(token)
    if (!decoded) {
      return { valid: false, error: 'Token invalide' }
    }

    // Check if user still exists and is admin
    const [user] = await sql`
      SELECT id, email, role FROM users 
      WHERE id = ${decoded.userId} AND role = 'admin'
    `

    if (!user) {
      return { valid: false, error: 'Utilisateur non trouvé ou non autorisé' }
    }

    return { valid: true, user }
  } catch (error) {
    console.error('Token validation error:', error)
    return { valid: false, error: 'Erreur de validation du token' }
  }
}

export function createAuthResponse(error: string, status: number = 401) {
  return new Response(
    JSON.stringify({ error }),
    { 
      status,
      headers: { 'Content-Type': 'application/json' }
    }
  )
}
