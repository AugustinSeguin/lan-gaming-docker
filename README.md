# Application Next.js avec Docker

Ce projet est une application Next.js configurée avec Docker pour le développement et le déploiement. Il utilise Turbopack, Prisma et Storybook.

## Prérequis

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Configuration du projet

Le projet utilise les fichiers de configuration suivants :

- `Dockerfile` - Contient les instructions pour construire l'image Docker
- `docker-compose.yml` - Configure les services Docker
- `.dockerignore` - Liste les fichiers à ignorer lors de la construction de l'image Docker

## Commandes Docker

### Lancer l'application en mode développement

```bash
# Construire et démarrer les conteneurs
docker-compose up

# Lancer en arrière-plan
docker-compose up -d

# Arrêter les conteneurs
docker-compose down
```

### Construire l'application pour la production

```bash
# Construire l'image avec le build Next.js
docker build -t nextjs-app:production --target production .

# Exécuter l'image en production
docker run -p 3000:3000 nextjs-app:production
```

### Accéder à l'application

Une fois démarrée, l'application sera disponible à l'adresse [http://localhost:3000](http://localhost:3000)

## Commandes npm disponibles

Ces commandes sont disponibles à l'intérieur du conteneur Docker ou localement si Node.js est installé :

```bash
# Lancer en mode développement avec Turbopack
npm run dev

# Construire l'application
npm run build

# Démarrer l'application en production
npm run start

# Lancer les tests de linting
npm run lint

# Lancer Storybook (port 6006)
npm run storybook

# Construire Storybook
npm run build-storybook

# Déploiement sur Vercel (génère Prisma, exécute les migrations et construit l'application)
npm run vercel-build
```

## Utiliser Storybook avec Docker

Pour accéder à Storybook, vous pouvez soit :

```bash
# Option 1 : Exécuter Storybook dans le conteneur existant
docker-compose exec nextjs npm run storybook

# Option 2 : Ajouter un service Storybook au docker-compose.yml
# (voir section "Configuration Storybook" ci-dessous)
```

## Prisma avec Docker

Pour utiliser les commandes Prisma à l'intérieur du conteneur :

```bash
# Générer le client Prisma
docker-compose exec nextjs npx prisma generate

# Exécuter les migrations
docker-compose exec nextjs npx prisma migrate dev

# Ouvrir Prisma Studio
docker-compose exec nextjs npx prisma studio
```

## Configuration avancée

### Ajouter des variables d'environnement

Créez un fichier `.env` à la racine du projet et ajoutez-le au docker-compose.yml :

```yaml
# Dans docker-compose.yml
services:
  nextjs:
    env_file:
      - .env
```

### Configuration Storybook

Pour un service Storybook dédié, ajoutez ceci à votre `docker-compose.yml` :

```yaml
storybook:
  build:
    context: .
    dockerfile: Dockerfile
  ports:
    - "6006:6006"
  volumes:
    - ./:/app
    - /app/node_modules
  command: npm run storybook
```

## Notes importantes

- Le mode développement utilise le volume monté pour permettre le hot reloading
- Pour la production, le code est copié dans l'image pour des performances optimales
- Prisma nécessite une connexion à une base de données, assurez-vous que votre base de données est configurée correctement dans le docker-compose.yml

## Dépannage

Si vous rencontrez des problèmes de permissions avec les volumes montés :

```bash
# Résoudre les problèmes de permissions
chmod -R 777 .next
chmod -R 777 node_modules
```

En cas de problème avec Prisma :

```bash
# Reconstruire l'image pour régénérer Prisma
docker-compose down
docker-compose build --no-cache
docker-compose up
```

## Documentation Docusaurus 

bash# Démarrer les deux services
docker-compose up

# Démarrer uniquement Docusaurus (si vous travaillez uniquement sur la documentation)
docker-compose up docusaurus

# Générer un build statique de la documentation
docker-compose exec docusaurus npm run build

# Servir localement la version statique (après build)
docker-compose exec docusaurus npm run serve