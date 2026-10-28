# Edunite2Serve

Next.js website for Edunite2Serve — a non-profit organization working through education, humanitarian service, and sustainable development in Malawi.

## Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL + RLS)
- **Media**: Cloudinary CDN
- **Language**: TypeScript
- **Deployment**: Netlify and Cloudflare Workers

## Getting Started

1. Copy .env.example to .env.local and fill in your credentials
2. Run 
pm install
3. Run 
pm run dev

Open [http://localhost:3000](http://localhost:3000) to view the site.
Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

## Environment Variables

See .env.example for required variables (Supabase + Cloudinary).

### Admin login CAPTCHA (Cloudflare Turnstile)

The admin login uses Cloudflare Turnstile and passes its token to Supabase Auth. In local development, the Cloudflare test site key is used automatically. To test Supabase CAPTCHA verification locally, enable CAPTCHA protection in the Supabase Auth settings, choose Cloudflare Turnstile, and use Cloudflare's matching test secret key (`1x0000000000000000000000000000000AA`).

For production, set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` to your real Turnstile site key and configure the matching secret key in Supabase Auth. Keep the secret key in Supabase; do not expose it as a `NEXT_PUBLIC_` variable.

## Cloudflare Workers deployment

The app can be deployed to Cloudflare Workers with the OpenNext adapter while keeping the existing Next.js application. Use Node.js 22 or newer for the Cloudflare tooling.

1. Use Node.js 22 or newer and install dependencies with `npm install`.
2. Copy `.dev.vars.example` to `.dev.vars` for local Cloudflare preview mode. Keep secrets in `.env.local` for local development and in Cloudflare for deployed environments.
3. Run `npm run preview` to build and preview in the Workers runtime.
4. For deployment, authenticate with `npx wrangler login`, then run `npm run deploy`.

For a direct `npm run deploy`, make sure the build variables are present in `.env.local`. For Workers Builds, set them in **Build variables and secrets** so Next.js can inline the `NEXT_PUBLIC_` values and access server values needed during build. Also set runtime values in the Worker's **Settings → Variables and Secrets**. Keep `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` as secrets; the `NEXT_PUBLIC_` values are public.

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`

The Wrangler config binds Next.js image optimization to Cloudflare Images. Enable Images for the Cloudflare account before production deployment; image transformations may have separate usage costs. Add the production hostname in Wrangler/Workers settings after the Worker is deployed.
# Edunite2Serve
