FROM node:lts-alpine as build-stage

WORKDIR /vue-streamservice

COPY package*.json ./

RUN npm install

COPY . .

# build app for development
CMD [ "npm", "run", "serve" ]

# build app for production
#CMD [ "npm", "run", "build" ]

EXPOSE 8080 80
