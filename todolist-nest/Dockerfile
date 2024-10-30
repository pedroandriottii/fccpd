# Etapa 1: Build do backend e geração do Prisma Client
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

ENV DATABASE_URL=postgresql://admin:admin@db:5432/todolistdb?schema=public
ENV JWT_SECRET=1Ov3CxfZ6JLhuHp2QSmz6MR6ma1Qmgb/jELpW6mFYNo=

COPY prisma ./prisma
RUN npx prisma generate

# Copia o restante do código para compilar
COPY . .

# Compila o código do backend NestJS
RUN npm run build

# Etapa 2: Imagem de produção
FROM node:22-alpine

WORKDIR /app

# Define novamente a DATABASE_URL para a etapa de produção
ENV DATABASE_URL=postgresql://admin:admin@db:5432/todolistdb?schema=public
ENV JWT_SECRET=1Ov3CxfZ6JLhuHp2QSmz6MR6ma1Qmgb/jELpW6mFYNo=

# Copia apenas as dependências de produção
COPY package*.json ./
RUN npm install --only=production

# Copia a build do backend e o Prisma Client gerado
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]