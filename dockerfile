FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/main"]
