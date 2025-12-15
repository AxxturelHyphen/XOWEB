# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile || pnpm install
COPY . .
RUN pnpm prisma generate || true
RUN pnpm run build

# Runtime stage
FROM node:20-alpine
RUN addgroup -S xo && adduser -S xo -G xo
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app .
USER xo
EXPOSE 3000
CMD ["pnpm", "start"]
