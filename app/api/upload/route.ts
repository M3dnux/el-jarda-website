import { NextRequest, NextResponse } from 'next/server'
import { validateAdminToken, createAuthResponse } from '../../../lib/middleware'

export async function POST(request: NextRequest) {
  // Validate admin token for file uploads
  const authResult = await validateAdminToken(request)
  if (!authResult.valid) {
    return createAuthResponse(authResult.error || 'Non autorisé')
  }

  try {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 })
    }

    // Validate file size (max 2MB for database storage)
    const maxSize = 2 * 1024 * 1024 // 2MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 2MB for database storage.' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Convert to base64
    const base64Data = buffer.toString('base64')
    const mimeType = file.type
    const imageDataUrl = `data:${mimeType};base64,${base64Data}`
    
    // Return the base64 data URL that can be stored directly in database
    return NextResponse.json({ 
      message: 'Image processed successfully',
      imageUrl: imageDataUrl,
      originalName: file.name,
      size: file.size,
      type: file.type
    })

  } catch (error) {
    console.error('Error processing image:', error)
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 })
  }
}
