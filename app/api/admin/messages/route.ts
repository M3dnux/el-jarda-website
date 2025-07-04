import { NextRequest, NextResponse } from 'next/server'
import sql from '../../../lib/db'

export async function GET() {
  try {
    const messages = await sql`
      SELECT * FROM contact_messages
      ORDER BY created_at DESC
    `
    
    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}
