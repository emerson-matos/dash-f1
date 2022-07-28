FROM node:16
WORKDIR /app_dash
COPY . .
RUN npm install
RUN npm install mime

EXPOSE 20777
EXPOSE 3000
ENTRYPOINT npm start
