FROM node:23.3.0-alpine3.20

WORKDIR /app

COPY . .
RUN npm install

CMD ["node", "server.js"]