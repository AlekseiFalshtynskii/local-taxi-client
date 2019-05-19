FROM node:alpine

WORKDIR /usr/src/app

COPY . .

EXPOSE 4200

CMD npm start
