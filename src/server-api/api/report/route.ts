import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { post_id, reason } = await req.json()

    if (!post_id || !reason) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const supabase = await createAdminClient()

    // Log report to the reports table
    await supabase.from('reports').insert({ post_id, reason })

    // Optionally email the moderator
    const resendKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL ?? 'noodlenuggetllc@gmail.com'

    if (resendKey && resendKey !== 'your_resend_api_key') {
      const { Resend } = await import('resend')
      const resend = new Resend(resendKey)
      await resend.emails.send({
        from: 'Ketapiphany <onboarding@resend.dev>',
        to: contactEmail,
        subject: `⚠️ Content reported — Ketapiphany`,
        text: `A post has been flagged.\n\nPost ID: ${post_id}\nReason: ${reason}\n\nReview it in the admin panel.`,
      })
    } else {
      console.log('[Report]', { post_id, reason })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[Report API]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
