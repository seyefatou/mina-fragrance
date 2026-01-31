# Mina Fragrance - E-commerce

Application e-commerce complète pour **Mina Fragrance**, une boutique de produits féminins (parfums, huiles, vêtements).

## Structure du Projet

```
mina-fragrance/
├── mina-fragrance-api/     # Backend NestJS + Prisma
└── mina-fragrance-web/     # Frontend Next.js + TypeScript
```

## Technologies

### Backend
- **NestJS** - Framework backend
- **Prisma** - ORM avec PostgreSQL
- **Swagger** - Documentation API
- **Multer** - Upload d'images
- **JWT** - Authentification
- **bcrypt** - Hashage des mots de passe

### Frontend
- **Next.js 14** - App Router
- **TypeScript** - Typage strict
- **Tailwind CSS** - Styling (thème rose)
- **React Query** - Gestion état serveur
- **Zustand** - State management

## Installation

### Prérequis
- Node.js 18+
- PostgreSQL
- npm ou yarn

### Backend

```bash
cd mina-fragrance-api
npm install

# Configurer la base de données
# Modifier .env avec votre URL PostgreSQL

# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma db push

# Démarrer en développement
npm run start:dev
```

L'API sera disponible sur http://localhost:3001
Documentation Swagger: http://localhost:3001/api/docs

### Frontend

```bash
cd mina-fragrance-web
npm install
npm run dev
```

L'application sera disponible sur http://localhost:3000

## Configuration

### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/mina_fragrance"
JWT_SECRET="votre-secret-jwt"
PORT=3001
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Créer un compte Admin

Utilisez l'API Swagger ou curl:

```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@mina-fragrance.com",
    "password": "admin123",
    "name": "Admin Mina",
    "role": "ADMIN"
  }'
```

## Fonctionnalités

### Boutique Client
- Parcourir les produits par catégorie
- Recherche et filtres
- Voir les détails d'un produit
- Ajouter au panier
- Passer une commande

### Admin Dashboard
- Gestion des produits (CRUD)
- Upload de photos
- Gestion des catégories
- Gestion des commandes
- Statistiques de vente

## API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | /auth/register | Créer un compte |
| POST | /auth/login | Se connecter |
| GET | /auth/profile | Profil utilisateur |
| GET | /products | Liste des produits |
| GET | /products/featured | Produits vedettes |
| GET | /products/:id | Détail d'un produit |
| POST | /products | Créer un produit (Admin) |
| PUT | /products/:id | Modifier un produit (Admin) |
| DELETE | /products/:id | Supprimer un produit (Admin) |
| GET | /categories | Liste des catégories |
| GET | /categories/slug/:slug | Catégorie par slug |
| POST | /categories | Créer une catégorie (Admin) |
| GET | /orders | Liste des commandes |
| POST | /orders | Créer une commande |
| PUT | /orders/:id/status | Modifier le statut (Admin) |
| POST | /upload | Upload d'image (Admin) |

## Thème

Couleurs principales:
- Rose principal: #EC4899
- Rose clair: #FDF2F8
- Rose foncé: #BE185D
- Accent doré: #D4AF37

---

Fait avec ❤️ pour Mina
