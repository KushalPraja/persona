FROM node:18

WORKDIR /app
COPY . .
COPY .env .env
RUN npm install

EXPOSE 5000
CMD ["node", "src/index.js"]
