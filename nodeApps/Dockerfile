FROM node:10.13-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install

EXPOSE 7272

CMD node server.js