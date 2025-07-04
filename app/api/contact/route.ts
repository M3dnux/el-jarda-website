import { NextRequest, NextResponse } from 'next/server'
import sql from '../../../lib/db'
import { sendEmail } from '../../../lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, type } = body

    // Save to database
    const [contactMessage] = await sql`
      INSERT INTO contact_messages (name, email, phone, message, type)
      VALUES (${name}, ${email}, ${phone || null}, ${message}, ${type})
      RETURNING *
    `

    // Send email notification to admin
    const emailSubject = type === 'appointment' 
      ? `Nouvelle demande de rendez-vous - ${name}`
      : `Nouvelle question - ${name}`

    const emailContent = `
      <h3>${emailSubject}</h3>
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Téléphone:</strong> ${phone}</p>` : ''}
      <p><strong>Type:</strong> ${type === 'appointment' ? 'Prise de rendez-vous' : 'Question générale'}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      
      <hr>
      <p><small>Message envoyé depuis le site El Jarda</small></p>
    `

    await sendEmail({
      to: process.env.EMAIL_USER as string,
      subject: emailSubject,
      html: emailContent
    })

    // Send confirmation email to customer
    const confirmationSubject = type === 'appointment'
      ? 'Confirmation de votre demande de rendez-vous - El Jarda'
      : 'Confirmation de votre message - El Jarda'

    const confirmationContent = `
      <h3>Merci pour votre message !</h3>
      <p>Bonjour ${name},</p>
      <p>Nous avons bien reçu votre ${type === 'appointment' ? 'demande de rendez-vous' : 'question'} et nous vous répondrons dans les plus brefs délais.</p>
      
      <h4>Résumé de votre message:</h4>
      <p><strong>Type:</strong> ${type === 'appointment' ? 'Prise de rendez-vous' : 'Question générale'}</p>
      <p><strong>Message:</strong> ${message}</p>
      
      <p>En cas d'urgence, n'hésitez pas à nous contacter directement:</p>
      <ul>
        <li>Téléphone: 26 503 701 / 40 279 250</li>
        <li>Email: contact@eljarda.com</li>
      </ul>
      
      <p>Cordialement,<br>L'équipe El Jarda</p>
    `

    await sendEmail({
      to: email,
      subject: confirmationSubject,
      html: confirmationContent
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Message envoyé avec succès',
      id: contactMessage.id 
    })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json({ error: 'Erreur lors de l\'envoi du message' }, { status: 500 })
  }
}
