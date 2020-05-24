FROM node:10-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
ENV PORT=8080
ENV VR_API=inputApiHere
ENV CLOUDANT_URL=inputURLHere
ENTRYPOINT npm start