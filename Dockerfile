FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

FROM node:18-alpine
WORKDIR /app
RUN apk add --no-cache tzdata
ENV TZ=Asia/Tashkent
ENV NODE_ENV=production
COPY --from=builder /app ./
RUN mkdir -p logs uploads/books uploads/covers uploads/videos uploads/thumbnails && \
    chown -R node:node logs uploads
USER node
EXPOSE 4001
CMD ["npm", "start"]