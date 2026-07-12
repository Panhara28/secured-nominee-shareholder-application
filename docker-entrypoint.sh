#!/bin/sh
set -e

# Container root filesystem is read-only except /tmp (tmpfs), so the SQLite
# database lives under /tmp and is recreated fresh on every container start.
mkdir -p /tmp/data

npx prisma migrate deploy
npx tsx prisma/seed.ts

exec npm start
