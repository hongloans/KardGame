FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm ci --omit=dev
COPY . .
EXPOSE 8080
CMD ["node", "websocket.js"]
