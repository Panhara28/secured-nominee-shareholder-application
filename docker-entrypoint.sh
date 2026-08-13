#!/bin/sh
set -e

npx prisma migrate deploy

# Only seed on first boot (empty database) - the seed script wipes existing
# data before recreating it, which is fine for a one-off local reset but
# would silently destroy real UAT data if it ran on every container start.
SEED_CHECK=$(cat <<'EOF'
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./lib/generated/prisma/index.js";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });
const count = await prisma.user.count();
await prisma.$disconnect();
process.exit(count === 0 ? 0 : 1);
EOF
)

if echo "$SEED_CHECK" | npx tsx - ; then
  echo "Database is empty - seeding..."
  npx tsx prisma/seed.ts
else
  echo "Database already has data - skipping seed."
fi

exec npm start
