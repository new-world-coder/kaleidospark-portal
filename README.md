# KaleidoSpark marketing site

Greenfield **Next.js App Router** marketing site for [kaleidosparkhq.com](https://kaleidosparkhq.com).

The previous CRA + FastAPI + Mongo portal in this repository has been replaced. Product experiences live on the portal at `NEXT_PUBLIC_PORTAL_URL` (default `https://app.kaleidosparkhq.com`).

## Stack (free-tier oriented)

| Need | Choice |
|------|--------|
| App | Next.js + TypeScript + Tailwind CSS + shadcn-style primitives + Framer Motion |
| Content | Keystatic (git-backed Markdoc) for blog / research / newsroom / events |
| Leads DB | Neon serverless Postgres (`DATABASE_URL`) — in-memory fallback when unset |
| Admin auth | Auth.js + Google OAuth (`ADMIN_EMAILS` allowlist) |
| Email | Resend |
| Spam | Honeypot + optional Cloudflare Turnstile |
| CRM | Optional `CRM_WEBHOOK_URL` (Zapier/Make) |
| Hosting | Vercel Hobby |

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

Scripts: `npm run lint` · `npm run typecheck` · `npm run build`

## Environment variables

See `.env.example`. Minimum for a public deploy:

- `NEXT_PUBLIC_SITE_URL=https://kaleidosparkhq.com`
- `NEXT_PUBLIC_PORTAL_URL=https://app.kaleidosparkhq.com`
- `AUTH_SECRET` (generate with `openssl rand -base64 32`)

Recommended for production forms/admin:

- `DATABASE_URL` — Neon
- `RESEND_API_KEY` / `RESEND_FROM_EMAIL` / `LEAD_NOTIFY_EMAIL`
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` / `ADMIN_EMAILS`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` (optional)
- `CRM_WEBHOOK_URL` (optional)

When `DATABASE_URL` or `RESEND_API_KEY` are missing, lead capture still succeeds using an in-memory store / skipped email (useful for CI and local UI).

## Content

- Collections live under `content/{blog,research,newsroom,events}`
- Edit via `/keystatic` (open in development; SSO-gated in production)
- Resource downloads under `public/resources/`

## Admin

- `/admin` — Google SSO, allowlisted emails only
- `/admin/leads` · `/admin/subscribers`
- `/keystatic` — content CMS

## Vercel project settings (required — fixes platform `NOT_FOUND`)

This app lives at the **repo root** (not `frontend/`). A root `vercel.json` locks Framework to **Next.js** and sets build/install commands. It **cannot** clear a dashboard Root Directory override.

If every URL returns Vercel platform 404 (`x-vercel-error: NOT_FOUND`, plain-text body — not a Next.js HTML 404), the project almost certainly still has CRA-era settings (`Root Directory = frontend`, Output Directory `build`/`public`, non-Next framework). Fix:

1. Open the Vercel project → **Settings** → **General**
2. **Root Directory** → **Edit** → clear the value (leave empty / `.`) → **Save**
3. **Framework Preset** → **Next.js**
4. **Build & Development Settings** → clear any **Output Directory** override (Next.js manages `.next`; do not set `build` or `public`)
5. Confirm **Build Command** is `npm run build` (or leave Override off so `vercel.json` applies)
6. **Deployments** → open the latest → **⋯** → **Redeploy** (uncheck “Use existing Build Cache” if available)

After redeploy, `https://kaleidospark-portal.vercel.app/` should return **HTTP 200** with HTML containing `KaleidoSpark`.

## DNS / Vercel Hobby checklist (kaleidosparkhq.com)

1. Confirm project settings above (root `.`, Framework Next.js, no Output Directory override).
2. Add environment variables from `.env.example` (production + preview as needed). Minimum: `AUTH_SECRET`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_PORTAL_URL`.
3. In the domain registrar for **kaleidosparkhq.com**:
   - Apex: point to Vercel (`A` 76.76.21.21 or Vercel nameservers)
   - `www` CNAME → `cname.vercel-dns.com` (or Vercel’s shown target)
4. In Vercel → Domains: add `kaleidosparkhq.com` and `www.kaleidosparkhq.com`; set **www → apex** redirect.
5. Plan `app.kaleidosparkhq.com` separately for the portal product (not this app).
6. Create a Neon project; paste `DATABASE_URL`; redeploy.
7. Create a Resend account; verify sending domain (or use onboarding domain for tests); set keys.
8. Google Cloud OAuth client (Web): authorized redirect URI `https://kaleidosparkhq.com/api/auth/callback/google` (and localhost for dev).
9. Set `ADMIN_EMAILS` to the Google accounts that may access `/admin`.
10. Optional: Cloudflare Turnstile site + secret; Zapier/Make webhook URL.
11. Confirm `/sitemap.xml` and `/robots.txt` after first deploy.
12. Smoke-test contact form, newsletter, assessment email gate, and admin SSO.

## Primary IA

Services · Industries · Insights · Products · About · Contact — plus footer/sitemap routes for solutions, case studies, research, careers, investors, partners, open source, resources, assessment, and legal pages.
