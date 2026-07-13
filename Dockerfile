FROM node:22-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
# NEXT_PUBLIC_* vars are inlined into the client bundle at build time, so
# this has to be a build arg (not a runtime env var on the container) —
# lets non-production environments like UAT opt into demo-only UI (e.g. the
# registration form's "Autofill demo data" button) without exposing it in
# a real production build.
ARG NEXT_PUBLIC_SHOW_DEMO_TOOLS=false
ENV NEXT_PUBLIC_SHOW_DEMO_TOOLS=$NEXT_PUBLIC_SHOW_DEMO_TOOLS
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# skia-canvas (used for certificate PDF generation) falls back to system
# fonts for glyphs missing from the explicitly loaded Khmer fonts (Latin
# letters, punctuation). node:22-slim ships no fonts/fontconfig at all, so
# without this those glyphs render as tofu boxes.
RUN apt-get update \
  && apt-get install -y --no-install-recommends fontconfig fonts-dejavu-core \
  && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app ./
RUN chmod +x ./docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["./docker-entrypoint.sh"]
