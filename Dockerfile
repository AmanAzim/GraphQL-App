FROM node as server_build

WORKDIR /server

COPY ./server/src /server/src
COPY ./server/package.json /server/package.json
COPY ./server/package-lock.json /server/package-lock.json

RUN npm install && npm build

FROM node as app_build

WORKDIR /app

COPY app/src /app/src
COPY app/public /app/public
COPY app/package.json /app/package.json
COPY app/package-lock.json /app/package-lock.json

RUN npm install && npm build

FROM node

RUN mkdir -p /server
COPY --from=server_build /server/build ./server
COPY --from=server_build /server/node_modules ./server/node_modules

RUN mkdir -p /server/public
COPY --from=app_build /app/build ./server/public

EXPOSE ${LISTEN_PORT}

CMD ["node" "/server/index.prod.js"]