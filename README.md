# Getting Started

Installer les dependences

```bash
npm ci
```

## Configurer la BDD :

remplacer les configs sur .env les identifiants mysql:

```bash
DATABASE_URL="mysql://user:pass@host:3306/db"

DB_HOST=localhost
DB_PORT=3306
DB_USER=
DB_PASSWORD=
DB_NAME=taskflow
```

Se connecter à mysql et créer la base de données taskflow sur mysql :

```bash
CREATE DATABASE taskflow
```

Génerer la config pour prisma :

```bash
npx prisma generate
```

Migrer la bdd :

```bash
npx prisma db push
```

## Démarer le projet :

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)
