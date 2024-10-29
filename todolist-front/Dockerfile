# Dockerfile para o Frontend
FROM node:18-alpine

WORKDIR /app/src

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
