FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install

COPY . .

ARG RESEND_API_KEY
ENV RESEND_API_KEY=$RESEND_API_KEY

RUN npm run build

FROM node:24-alpine

WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

RUN npm install --omit=dev

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
USER nextjs

EXPOSE 3000

CMD ["npm" , "start"]
