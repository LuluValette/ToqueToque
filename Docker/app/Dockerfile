# Étape 1 : Build Angular
FROM node:18 as build

# Dossier de travail
WORKDIR /app

# Copie du package.json et installation des dépendances
COPY ../../front .
RUN npm install

# Build
RUN npm run build --prod

# Étape 2 : Serveur NGINX pour servir les fichiers statiques
FROM nginx:alpine

# Copie du build Angular dans NGINX
COPY --from=build /app/dist/ /usr/share/nginx/html

# Copie d'un fichier de conf custom (optionnel)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose le port utilisé par NGINX
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
