FROM node:alpine 
WORKDIR /client

COPY package*.json .

RUN npm install --verbose

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve","-p","3000","build/"]