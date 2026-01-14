import { NextResponse } from 'next/server'

const STUDIO_SALES_EMAIL = 'studiosales@adnova.digital'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, message, subject } = body || {}

        console.log('[Contact API] Received request:', { name, email, subject: subject?.substring(0, 50), hasMessage: !!message })

        if (!name || !email || !message) {
            console.warn('[Contact API] Missing fields - name:', !!name, 'email:', !!email, 'message:', !!message)
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // Basic email format check
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            console.warn('[Contact API] Invalid email format:', email)
            return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
        }

        // Send email to studiosales@adnova.digital using Resend
        // Environment variable RESEND_API_KEY should be set
        const resendApiKey = process.env.RESEND_API_KEY

        if (!resendApiKey) {
            console.warn('[Contact API] RESEND_API_KEY not set')
            return NextResponse.json({ ok: true, warning: 'Email service not configured' })
        }

        // Use the verified domain for both development and production
        // studio.adnova.digital is verified in Resend, so we can use it in both environments
        const fromEmail = 'noreply@studio.adnova.digital'

        console.log('[Contact API] Sending email via Resend - FROM:', fromEmail, 'TO:', STUDIO_SALES_EMAIL)

        const emailBody = JSON.stringify({
            from: fromEmail,
            to: STUDIO_SALES_EMAIL,
            replyTo: email,
            subject: `Nuevo mensaje de contacto: ${subject || 'Sin asunto'}`,
            html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Asunto:</strong> ${escapeHtml(subject || 'N/A')}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `
        })

        const emailResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${resendApiKey}`
            },
            body: emailBody
        })

        console.log('[Contact API] Resend response status:', emailResponse.status)

        if (!emailResponse.ok) {
            let errorMessage = 'Unknown error'
            try {
                const errorData = await emailResponse.json()
                console.error('[Contact API] Resend API error response:', errorData)
                errorMessage = errorData.message || errorData.error || JSON.stringify(errorData)
            } catch (parseErr) {
                console.error('[Contact API] Failed to parse Resend error:', parseErr)
                const errorText = await emailResponse.text()
                console.error('[Contact API] Resend API error (text):', errorText)
                errorMessage = errorText
            }
            return NextResponse.json({
                error: 'Failed to send email',
                details: errorMessage
            }, { status: 500 })
        }

        console.log('[Contact API] Email sent successfully')
        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error('[Contact API] Unexpected error:', error)
        const errorMessage = error instanceof Error ? error.message : String(error)
        return NextResponse.json({
            error: 'Invalid request',
            details: errorMessage
        }, { status: 400 })
    }
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    }
    return text.replace(/[&<>"']/g, (char) => map[char])
}
