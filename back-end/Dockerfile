FROM node:20-slim AS builder

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

FROM node:20-slim AS runner

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/ ./dist
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 7006

CMD ["node", "dist/server.js"]