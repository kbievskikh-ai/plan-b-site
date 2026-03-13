FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NEXT_PUBLIC_API_URL=https://api.gronisbrazil.com
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyAJTOATix6y_ANRcZtW2OJ9bsPWHyt3Mc0
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
