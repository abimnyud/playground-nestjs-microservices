FROM node:24-alpine AS builder

WORKDIR /usr/src/app

COPY ./gateway/package*.json .

RUN npm install

COPY _proto /usr/src/_proto
COPY gateway .

RUN apk update && \
    apk add --no-cache make protobuf-dev \
    && rm -rf /var/cache/apk/*

RUN npm run proto:all
RUN npm run build

FROM node:24-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/_proto /usr/src/_proto
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

CMD ["node", "dist/main"]
