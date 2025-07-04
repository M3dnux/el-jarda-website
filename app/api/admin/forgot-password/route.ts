import { NextRequest, NextResponse } from 'next/server'
import sql from '../../../../lib/db'
import { sendEmail } from '../../../../lib/email'
import { generateToken } from '../../../../lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: 'Email requis' }, { status: 400 })
    }

    // Check if user exists
    const [user] = await sql`
      SELECT * FROM users WHERE email = ${email} AND role = 'admin'
    `

    if (!user) {
      // Don't reveal if email exists or not for security
      return NextResponse.json({ 
        success: true, 
        message: 'Si cet email existe, un lien de réinitialisation a été envoyé' 
      })
    }

    // Generate reset token (valid for 1 hour)
    const resetToken = generateToken(user.id)
    const resetExpiry = new Date(Date.now() + 3600000) // 1 hour from now

    // Store reset token in database
    await sql`
      UPDATE users 
      SET reset_token = ${resetToken}, reset_token_expiry = ${resetExpiry}
      WHERE id = ${user.id}
    `

    // Send reset email
    const resetUrl = `${process.env.NEXTAUTH_URL}/admin/reset-password?token=${resetToken}`
    
    const emailSubject = 'Réinitialisation de mot de passe - El Jarda Admin'
    const emailContent = `
      <h3>Réinitialisation de votre mot de passe</h3>
      <p>Bonjour,</p>
      <p>Vous avez demandé la réinitialisation de votre mot de passe administrateur pour El Jarda.</p>
      <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
      <p><a href="${resetUrl}" style="background-color: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Réinitialiser le mot de passe</a></p>
      <p>Ce lien est valide pendant 1 heure.</p>
      <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
      <br>
      <p>Cordialement,<br>L'équipe El Jarda</p>
    `

    await sendEmail({
      to: email,
      subject: emailSubject,
      html: emailContent
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Si cet email existe, un lien de réinitialisation a été envoyé' 
    })

  } catch (error) {
    console.error('Error in forgot password:', error)
    return NextResponse.json({ error: 'Erreur lors de l\'envoi de l\'email' }, { status: 500 })
  }
}
