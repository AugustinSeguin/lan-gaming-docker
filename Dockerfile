FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json* ./

# Installer les dépendances
RUN npm ci

# Copier les fichiers du projet
COPY . .

# Générer les clients Prisma
RUN npx prisma generate

# Exposer le port utilisé 
EXPOSE 4000

# Commande par défaut pour démarrer l'app
CMD ["npm", "run", "dev"]