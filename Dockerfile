FROM node:12

WORKDIR /

COPY package*.json ./

RUN npm install

COPY ./src .

EXPOSE 8002

CMD ["node", "index.js"]