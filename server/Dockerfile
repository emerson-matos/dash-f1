FROM node:16
WORKDIR /server
COPY . .
RUN npm install
RUN npm install mime

EXPOSE 20777
EXPOSE 3000
ENTRYPOINT npm start
