# Usamos Node para construir
FROM node:18-alpine

WORKDIR /app

# Copiamos dependencias
COPY package*.json ./
RUN npm install

# Copiamos el código
COPY . .

# Exponemos el puerto de Vite
EXPOSE 5173

# Iniciamos en modo desarrollo (para que puedas editar en vivo)
CMD ["npm", "run", "dev", "--", "--host"]