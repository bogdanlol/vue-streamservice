FROM node:15.0.0

ENV NODE_ENV=development

WORKDIR /streamservice-app/vue-streamservice

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD [ "npm", "run", "serve" ]
