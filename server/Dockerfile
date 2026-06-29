# =============================================================================
# Portfolio backend — Hono (Node.js)
# Multi-stage build: compile TypeScript, then run a lean production image.
# =============================================================================
FROM node:20-slim AS builder

WORKDIR /app

# Install deps separately for better layer caching.
COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build


# =============================================================================
# Production image — only runtime deps + compiled output.
# =============================================================================
FROM node:20-slim AS runner

ENV NODE_ENV=production
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/drizzle ./drizzle

EXPOSE 8000
CMD ["node", "dist/index.js"]
