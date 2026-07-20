FROM node:26-alpine AS builder

WORKDIR /app

ENV CI=true

RUN npm add -g corepack
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm dlx prisma generate
RUN pnpm build

FROM node:26-alpine

WORKDIR /app

RUN npm add -g corepack
RUN corepack enable

ENV NODE_ENV=production

COPY --from=builder /app/package.json .
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/src/infra/database/prisma ./src/infra/database/prisma

RUN pnpm dlx prisma generate
EXPOSE 3333

CMD ["sh", "-c", "npx prisma migrate deploy && node build/app.js"]