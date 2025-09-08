FROM node:24-alpine AS builder

WORKDIR /usr/src/app

COPY ./services/product/package*.json .

RUN npm install

COPY _proto /usr/_proto
COPY ./services/product .

RUN apk update && \
    apk add --no-cache make protobuf-dev \
    && rm -rf /var/cache/apk/*

RUN npm run proto:all
RUN npm run build

FROM node:24-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/_proto /usr/_proto
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

CMD ["node", "dist/main"]
