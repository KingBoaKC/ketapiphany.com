# Ketapiphany — Setup Guide

---

## Step 1 — Supabase (Database + File Storage)

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run everything in `supabase/schema.sql`
3. Copy your credentials from **Settings → API**

---

## Step 2 — Vercel Project

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Import **KingBoaKC/ketapiphany.com** from GitHub
4. Vercel will detect Next.js automatically
5. Under **Environment Variables**, add all of these:

| Variable | Where to get it |
|----------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API → anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → service_role key |
| `ADMIN_PASSWORD` | Choose a strong password |
| `RESEND_API_KEY` | resend.com (optional — for email notifications) |
| `CONTACT_EMAIL` | noodlenuggetllc@gmail.com |

6. Click **Deploy**

---

## Step 3 — GitHub Secrets (for auto-deploy on push)

Every push to `main` on GitHub will automatically deploy to Vercel.
To make this work, add these secrets to your GitHub repo:

**GitHub repo → Settings → Secrets and variables → Actions → New repository secret**

| Secret | Where to get it |
|--------|----------------|
| `VERCEL_TOKEN` | Vercel → Account Settings → Tokens → Create token |
| `VERCEL_ORG_ID` | Vercel → your team/account → Settings → General → Team ID |
| `VERCEL_PROJECT_ID` | Vercel → Project → Settings → General → Project ID |
| `NEXT_PUBLIC_SUPABASE_URL` | Same as Step 2 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same as Step 2 |
| `SUPABASE_SERVICE_ROLE_KEY` | Same as Step 2 |
| `ADMIN_PASSWORD` | Same as Step 2 |
| `RESEND_API_KEY` | Same as Step 2 |
| `CONTACT_EMAIL` | noodlenuggetllc@gmail.com |

Once secrets are set, the workflow is:
- Push to `main` → GitHub Actions builds + deploys → live on Vercel ✓
- Pull request → GitHub Actions runs a build check, catches errors before merge ✓

---

## Step 4 — Custom Domain

In your Vercel project → **Settings → Domains**, add `ketapiphany.com`.
Then update your DNS registrar to point to Vercel's nameservers (they'll show you exactly what to add).

---

## Step 5 — Email Notifications (Optional)

Sign up at [resend.com](https://resend.com) → create an API key → add to Vercel env vars and GitHub secrets.

This sends you an email when:
- Someone submits a contact form message
- A post gets flagged with the report button

---

## Admin Panel

Go to `/admin` on your live site and enter your `ADMIN_PASSWORD` to:
- See pending submissions
- Approve or reject posts before they appear publicly
- View approved and rejected posts

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home with hero + recent art + recent writings |
| `/gallery` | Art gallery — images only, masonry grid |
| `/writings` | Text posts — poetry, journals, stories |
| `/about` | Mission, origin story, community guidelines |
| `/submit` | Submit art or writing (goes to pending review) |
| `/contact` | Contact form |
| `/admin` | Moderation panel (password protected) |
