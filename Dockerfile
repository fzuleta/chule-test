FROM node:16-alpine

RUN apk update && \
    apk upgrade && \
    apk add nano && \
    apk add --update bash && \
    rm -rf /var/cache/apk/*

WORKDIR /app

COPY package*.json ./
RUN npm i
COPY . .

HEALTHCHECK --interval=1m --timeout=5s \
  CMD curl -s -f "localhost:8800/health" || exit 1

EXPOSE 8800

VOLUME [ "/etc/letsencrypt", "/data/letsencrypt" ]

CMD [ "node", "dist/index.js" ]
