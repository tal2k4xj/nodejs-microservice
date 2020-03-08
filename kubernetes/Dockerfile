FROM node:10-alpine
WORKDIR /app
COPY ./app/package.json .
COPY ./app/public/* ./public/
COPY ./app/server.js .
RUN npm install
EXPOSE 8080
ENV PORT=8080
ENTRYPOINT npm start