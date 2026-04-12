FROM node:20-alpine
WORKDIR /app
COPY giftlink-backend/package*.json ./
RUN npm install
COPY giftlink-backend/. .
EXPOSE 5000
CMD ["npm", "start"]
