# Ketapiphany — Setup Guide

## 1. Supabase (Database + File Storage)

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run everything in `supabase/schema.sql`
3. Copy your project credentials from **Settings → API**:
   - `NEXT_PUBLIC_SUPABASE_URL` — Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — anon/public key
   - `SUPABASE_SERVICE_ROLE_KEY` — service_role key (keep secret)

## 2. Environment Variables

Edit `.env.local` and fill in real values:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
ADMIN_PASSWORD=choose_a_strong_password
RESEND_API_KEY=re_...          # optional — for contact form emails
CONTACT_EMAIL=noodlenuggetllc@gmail.com
```

## 3. Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## 4. Admin Panel

Go to `/admin` and enter your `ADMIN_PASSWORD` to review submissions.

## 5. Deploy to Vercel

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Add all env vars from `.env.local` in the Vercel dashboard
4. Deploy — Vercel auto-deploys on every push

## 6. Email Notifications (Optional)

Sign up at [resend.com](https://resend.com) → create an API key → add to `.env.local`.
This sends you an email when someone fills out the contact form.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home with hero + recent gallery |
| `/gallery` | Full masonry gallery with category filters |
| `/about` | Mission + community guidelines |
| `/submit` | Submission form (image or text) |
| `/contact` | Contact form |
| `/admin` | Moderation panel (password protected) |
