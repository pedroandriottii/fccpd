# Etapa 1: Build do backend e geração do Prisma Client
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copia a pasta prisma e gera o Prisma Client
COPY prisma ./prisma
RUN npx prisma generate

# Copia o restante do código para compilar
COPY . .

# Compila o código do backend NestJS
RUN npm run build

# Etapa 2: Imagem de produção
FROM node:18-alpine

WORKDIR /app

# Copia apenas as dependências de produção
COPY package*.json ./
RUN npm install --only=production

# Copia a build do backend e o Prisma Client gerado
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]
