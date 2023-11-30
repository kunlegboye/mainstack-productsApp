FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY tsconfig.json ./

COPY . .

RUN npm run build

EXPOSE 5100

CMD ["node", "dist/app.js"]
