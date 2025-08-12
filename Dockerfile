FROM node:18.19.1-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package*.json ./
COPY tsconfig.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compila TypeScript a JavaScript
RUN npm run build

# Etapa de producción
FROM node:18.19.1-alpine

WORKDIR /usr/src/app

# Copiar solo lo necesario desde la etapa de construcción
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Variables de entorno (puedes sobreescribirlas al ejecutar)
ENV NODE_ENV=production
ENV PORT=4600

# Puerto expuesto
EXPOSE ${PORT}

# Comando para iniciar la aplicación
CMD ["npm", "start"]