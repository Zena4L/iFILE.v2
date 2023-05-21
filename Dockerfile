FROM node:lts-alpine

WORKDIR /usr/dist/app

COPY package*.json .

RUN npm install

COPY . . 

EXPOSE 3000
 
CMD [ "node","dist/server.js" ]