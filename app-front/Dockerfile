FROM node:latest
WORKDIR /app-front

COPY ./app-front/package*.json ./
RUN npm install

COPY ./app-front/src ./src/
COPY ./app-front/public ./public/

CMD ["npm", "start"]