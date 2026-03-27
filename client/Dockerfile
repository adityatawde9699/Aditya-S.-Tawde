# =============================================================================
# Stage 1: Build
# Build the React app into static assets using Node.js.
# This stage is discarded after the build — nothing from it leaks into prod.
# =============================================================================
FROM node:20-slim AS builder

WORKDIR /app

# Install dependencies separately to maximize Docker layer caching.
# If package.json doesn't change, this layer is skipped on rebuilds.
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build for production.
COPY . .
RUN npm run build


# =============================================================================
# Stage 2: Serve
# Serve the compiled assets using Nginx (minimal Alpine image).
# No Node.js, no source code, no dev dependencies — just the static files.
# =============================================================================
FROM nginx:1.27-alpine AS production

# Remove the default Nginx welcome page.
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled assets from the build stage.
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config for SPA routing support.
# Without this, page refresh on /projects would return 404.
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -q --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
