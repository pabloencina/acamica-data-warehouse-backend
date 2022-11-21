# syntax=docker/dockerfile:1
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY ./src ./src/
EXPOSE 3500
CMD ["npm", "run", "start"]
