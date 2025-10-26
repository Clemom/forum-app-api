# 🧠 Forum API — NestJS + Prisma + PostgreSQL

API backend pour une application de forum avec système d’authentification JWT, votes et gestion des posts.  
Développée avec **NestJS**, **Prisma**, et **PostgreSQL**.  

---

## 🚀 Stack technique

| Outil / Librairie | Rôle |
|--------------------|------|
| **NestJS** | Framework backend Node.js modulaire et typé |
| **Prisma ORM** | Gestion des entités et interactions avec PostgreSQL |
| **PostgreSQL** | Base de données relationnelle |
| **JWT + Passport** | Authentification sécurisée par token |
| **bcrypt** | Hash des mots de passe |
| **Swagger** | Documentation automatique de l’API |

---

## 📦 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/Clemom/forum-app-api.git
cd forum-app-api
```

### 2. Installer les dépendances

```bash
npm install
```

---

## ⚙️ Configuration de l’environnement

Crée un fichier `.env` à la racine du projet :

```env
PORT=3000
CORS_ORIGIN=http://localhost:5173
DATABASE_URL="postgresql://<USER>:<PASSWORD>@localhost:5432/forum_db?schema=public"
JWT_SECRET=supersecretkey
```

> ⚠️ Remplace `<USER>` et `<PASSWORD>` par tes identifiants PostgreSQL.

---

## 🗄️ Base de données

### 1. Lancer Prisma et générer le schéma :

```bash
npx prisma migrate dev --name init
```

### 2. (Optionnel) Accéder à Prisma Studio :
```bash
npx prisma studio
```
👉 Interface web pour explorer ta base : [http://localhost:5555](http://localhost:5555)

---

## 🧠 Lancer le serveur

En mode développement :
```bash
npm run start:dev
```

Le serveur démarre sur :
```
http://localhost:3000
```

---

## 🔐 Routes principales

| Méthode | Endpoint | Description |
|----------|-----------|-------------|
| **POST** | `/auth/register` | Crée un nouvel utilisateur |
| **POST** | `/auth/login` | Connecte un utilisateur et renvoie un token JWT |
| **GET** | `/auth/me` | Récupère les infos de l’utilisateur connecté (JWT requis) |
| **GET** | `/posts` | Liste tous les posts |
| **POST** | `/posts` | Crée un post (JWT requis) |
| **POST** | `/posts/:id/vote` | Upvote / Downvote un post |
| **DELETE** | `/posts/:id` | Supprime un post (JWT requis) |

---

## 🧱 Exemple de requêtes

### 🔸 Inscription
```bash
curl -X POST http://localhost:3000/auth/register   -H "Content-Type: application/json"   -d '{"username":"clem","email":"clem@test.com","password":"1234"}'
```

### 🔸 Connexion
```bash
curl -X POST http://localhost:3000/auth/login   -H "Content-Type: application/json"   -d '{"email":"clem@test.com","password":"1234"}'
```

### 🔸 Créer un post
```bash
curl -X POST http://localhost:3000/posts   -H "Content-Type: application/json"   -H "Authorization: Bearer <TOKEN>"   -d '{"title":"Mon premier post","content":"Bonjour tout le monde"}'
```

---

## 📘 Documentation Swagger

Une fois le serveur lancé :
👉 [http://localhost:3000/api](http://localhost:3000/api)

---

## 🧩 Structure du projet

```
src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── dto/
│   └── auth.module.ts
├── posts/
│   ├── posts.controller.ts
│   ├── posts.service.ts
│   └── posts.module.ts
├── prisma/
│   └── schema.prisma
├── jwt.strategy.ts
├── app.module.ts
├── main.ts
└── prisma.service.ts
```

---

## 🧰 Commandes utiles

| Commande | Description |
|-----------|-------------|
| `npm run start` | Lancer l’app |
| `npm run start:dev` | Lancer en mode développement |
| `npx prisma studio` | Interface graphique pour la BDD |
| `npx prisma migrate dev` | Appliquer les migrations |
| `npm run build` | Compiler le projet |

---

## 🤝 Auteurs

Projet développé par **Clément (Clemom)**.  
Frontend disponible ici : [👉 forum-app (React)](https://github.com/Clemom/forum-app)

---

## 🧾 Licence

Ce projet est distribué sous la licence **MIT**.
