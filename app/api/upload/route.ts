import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
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

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 5MB.' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${timestamp}_${originalName}`
    
    // Save to public/uploads directory
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    const filePath = join(uploadDir, filename)
    
    // Create uploads directory if it doesn't exist
    try {
      const fs = require('fs')
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }
      await writeFile(filePath, buffer)
    } catch (error) {
      console.error('Error writing file:', error)
      return NextResponse.json({ error: 'Failed to save file to server' }, { status: 500 })
    }

    // Return the URL that can be used to access the image
    const imageUrl = `/uploads/${filename}`
    
    return NextResponse.json({ 
      message: 'Image uploaded successfully',
      imageUrl: imageUrl 
    })

  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
