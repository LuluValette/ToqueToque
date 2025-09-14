# ToqueToque
## Description
Ce projet scolaire a pour objectif la création d'une application web pour mobile dont l'objectif est de permettre aux utilisateurs :
- de créer / suivre une recette à partir d'un aliment imposé. Chaque plat sera ensuite noté et un classement sera créé à partir de ces notes.
- D'avoir accès à différentes recettes
- Ce projet est fait en html/CSS/JS avec angular, avec une connexion à une base de données MongoDB.

## Fonctionnalités
Le projet n'as pas encore été terminé, il est en cours de développement.
Voici un resumé des fonctionnalités implémentées :
- [x] Création d'un compte utilisateur
- [x] Connexion / Déconnexion
- [x] Création d'une partie de jeu
- [x] Visualisation et recherche d'une recette
- [x] Suppression d'un ami
- [x] Modification de son profil
- [ ] Ajout d'un ami
- [ ] Rejoindre une partie de jeu
- [ ] Noter une recette
- [ ] mettre en place les photos des utilisateurs
- [ ] Création d'une recette
- [ ] Création d'un classement
- [ ] Renseigné ces allergies

Commande pour lancer l'application
```bash
# Lancer l'api
node ./backend/server.js

# Lancer le frontend
cd ./frontend
ng serve

```

## Build des images docker
Pour construire les images docker, il faut se placer à la racine du projet et lancer les commandes suivantes :
```bash

docker build -f docker/api-rest/Dockerfile -t api-rest .

docker build -f docker/mongo-db/Dockerfile -t api-rest .

docker build -f docker/app/Dockerfile -t frontend .
```

dépendance à installer en dev :
```bash
npm install jest
npm install mongodb-memory-server
npm install supertest
```