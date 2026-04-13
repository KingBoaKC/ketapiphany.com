import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    if (!email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // If Resend is configured, send an email
    const resendKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL ?? 'noodlenuggetllc@gmail.com'

    if (resendKey && resendKey !== 'your_resend_api_key') {
      const { Resend } = await import('resend')
      const resend = new Resend(resendKey)

      await resend.emails.send({
        from: 'Ketapiphany Contact <onboarding@resend.dev>',
        to: contactEmail,
        replyTo: email,
        subject: `New contact from ${name || 'Anonymous'} — Ketapiphany`,
        text: `Name: ${name || 'Anonymous'}\nEmail: ${email}\n\n${message}`,
      })
    } else {
      // Log to console as fallback during development
      console.log('[Contact form]', { name, email, message })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[Contact API]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
