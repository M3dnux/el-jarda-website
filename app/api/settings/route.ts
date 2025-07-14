import { NextRequest, NextResponse } from 'next/server'
import sql from '../../../lib/db'
import { validateAdminToken, createAuthResponse } from '../../../lib/middleware'

export async function GET(request: NextRequest) {
  try {
    const settings = await sql`
      SELECT key, value, description FROM settings
    `
    
    // Convert array to object for easier access
    const settingsObject = settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value
      return acc
    }, {})

    return NextResponse.json(settingsObject)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Erreur lors de la récupération des paramètres' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  // Validate admin token for updating settings
  const authResult = await validateAdminToken(request)
  if (!authResult.valid) {
    return createAuthResponse(authResult.error || 'Non autorisé')
  }

  try {
    const body = await request.json()
    const { settings } = body

    for (const [key, value] of Object.entries(settings)) {
      await sql`
        INSERT INTO settings (key, value, description, created_at, updated_at)
        VALUES (${key}, ${value as string}, '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        ON CONFLICT (key) 
        DO UPDATE SET 
          value = EXCLUDED.value,
          updated_at = CURRENT_TIMESTAMP
      `
    }

    return NextResponse.json({ success: true, message: 'Paramètres mis à jour avec succès' })
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Erreur lors de la mise à jour des paramètres' }, { status: 500 })
  }
}
