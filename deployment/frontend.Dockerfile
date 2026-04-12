FROM node:20-alpine
WORKDIR /app
COPY giftlink-frontend/package*.json ./
RUN npm install
COPY giftlink-frontend/. .
EXPOSE 3000
CMD ["npm", "start"]
