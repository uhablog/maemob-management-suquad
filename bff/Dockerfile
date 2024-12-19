FROM node:23.4.0-alpine3.20

WORKDIR /app

# Nest CLI をグローバルインストール
RUN npm install -g @nestjs/cli

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]

EXPOSE 8888