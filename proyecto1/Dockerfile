FROM node:alpine as build

WORKDIR /client

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "start"]