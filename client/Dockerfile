# Use Node.js for building and running
FROM node:20-slim

# Set working directory
WORKDIR /app

# Install dependencies separately for caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Expose Vite port
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev", "--", "--host"]
