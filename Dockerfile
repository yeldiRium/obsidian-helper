FROM node:20.11.1-alpine as BUILDER
WORKDIR /build

ADD package.json /build/package.json
ADD package-lock.json /build/package-lock.json

RUN npm install --silent

ADD . /build/

RUN npm run build

FROM node:20.11.1-alpine
WORKDIR /app

ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json

RUN npm install --production --silent

COPY --from=BUILDER /build/build/ /app/build/

CMD [ "node", "build/bin/obs.js" ]
