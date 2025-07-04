import { NextRequest, NextResponse } from 'next/server'
import sql from '../../../lib/db'

export async function GET() {
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
  try {
    const body = await request.json()
    const { settings } = body

    for (const [key, value] of Object.entries(settings)) {
      await sql`
        UPDATE settings 
        SET value = ${value as string}, updated_at = CURRENT_TIMESTAMP
        WHERE key = ${key}
      `
    }

    return NextResponse.json({ success: true, message: 'Paramètres mis à jour avec succès' })
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Erreur lors de la mise à jour des paramètres' }, { status: 500 })
  }
}
