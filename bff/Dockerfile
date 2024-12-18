FROM node:23.4.0-alpine3.20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]

EXPOSE 8888