# XO76 (xosieteseis)

Dark, Chile-inspired ecommerce for tees + beats built with Next.js App Router, Prisma, Auth.js (Google), and PayPal/manual checkout options.

## Stack
- Next.js 14 (App Router) + TypeScript
- TailwindCSS + custom dark theme
- Prisma + PostgreSQL
- Auth.js / NextAuth with Google
- Payments: PayPal (server-side stubs) + Instagram DM fallback
- Docker-ready

## Getting Started (local)
1. Copy env: `cp .env.example .env` and set secrets.
2. Start Postgres via Docker: `docker compose up db` (or `docker compose up` for app + db).
3. Install deps: `pnpm install` (or npm).
4. Run Prisma: `pnpm prisma migrate dev` then `pnpm prisma db seed`.
5. Start dev server: `pnpm dev`.

### Database
- Connection via `DATABASE_URL`.
- Prisma schema in `prisma/schema.prisma`.
- Seed adds 2 tees, 2 beats, admin user (email from `ADMIN_EMAIL`).

### Auth
- Google OAuth credentials required.
- NEXTAUTH_SECRET required.
- Protected routes: checkout/account (login), admin (role=ADMIN).

### Payments
- `/api/paypal/create-order` and `/api/paypal/capture-order` compute totals server-side, create Order + Payment rows.
- Manual fallback `/api/order/manual` creates `PENDING_MANUAL` order then opens Instagram.
- Replace sandbox stubs with real PayPal REST credentials for production.

### Security
- Security headers via `next.config.mjs`.
- Basic rate limiting for payment/auth endpoints.
- Zod validation at API boundaries.

### Testing
- `pnpm test` uses Vitest (pricing + order payload tests).
- `pnpm lint` for ESLint.

### Deployment
- Vercel: set env vars, run `pnpm prisma migrate deploy` on managed Postgres (Neon/Supabase). Optionally add `vercel.json` headers.
- Docker: `docker compose -f docker-compose.prod.yml up --build -d` (set env vars). Entrypoint runs migrations before start.

### Scripts
- `scripts/wait-for-db.sh` waits for Postgres.
- `scripts/start.sh` runs migrations (and seed if `SEED_ON_START=true`) then starts Next.js.

### CI
- GitHub Actions workflow for lint + test on push/PR.
