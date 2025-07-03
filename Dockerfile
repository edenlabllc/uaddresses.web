FROM node:18-alpine

EXPOSE 8080

ENV PORT=8080
ENV NODE_ENV=production
ENV NODE_OPTIONS=--tls-min-v1.2

RUN apk add --update python3

COPY package.json /tmp/package.json
RUN cd /tmp && npm install --omit=dev --quiet --legacy-peer-deps && mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

RUN cd /tmp && npm install karma-jasmine karma-chrome-launcher jasmine-core --save-dev --legacy-peer-deps

WORKDIR /opt/app

COPY . /opt/app

RUN addgroup -g 1001 appgroup && adduser -D -u 1001 -G appgroup appuser

RUN chown -R 1001:1001 /opt/app

RUN npm run build

RUN rm -rf ./app/client \
	rm -rf ./app/common \
	rm -rf ./node_modules/webpack

# Clear deps and caches
RUN apk --purge del python3 && rm -rf /var/cache/apk/*

USER 1001:1001

CMD ["node", "--inspect", "static/server.js"]
