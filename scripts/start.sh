#!/bin/sh
set -e
npm run prisma:migrate || pnpm prisma migrate deploy || npx prisma migrate deploy
if [ "$SEED_ON_START" = "true" ]; then
  npx ts-node prisma/seed.ts || true
fi
npm run start || pnpm start
