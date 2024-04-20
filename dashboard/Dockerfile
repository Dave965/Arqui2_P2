FROM node:alpine as build

WORKDIR /client

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve","-p","3000","build/"]