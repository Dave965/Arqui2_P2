FROM node:alpine as build

WORKDIR /client

COPY package*.json .

RUN npm install

COPY . .

EXPOSE "8080"

CMD ["node", "app.js"]


