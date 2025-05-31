# Utilise une image officielle Node.js
FROM node:18

# Crée un dossier dans le conteneur
WORKDIR /app

# Copie le projet dans le conteneur
COPY ../../backend .

# Installe les dépendances
RUN npm install

# Expose le port 3000
EXPOSE 3000

# Commande de lancement
CMD ["node", "server.js"]
