FROM node:10

WORKDIR /usr/src/api-app

COPY . .

RUN npm install

CMD node bin/automigrate.js | node server/server.js
