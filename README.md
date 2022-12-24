# Prisma Seeding Many-to-Many

This example show a way to efficiently seed large amounts of data with an explicit many-to-many relation in Prisma.

## How to use

### Prerequisites

- Install [Node.js](https://nodejs.org/en/download/)
- Install [Docker](https://docs.docker.com/get-docker/)

### 1. Download example & install dependencies

Clone this repository:

```sh
git clone git@github.com:sbking/prisma-seed-many-to-many.git
```

Create a `.env` file and install dependencies:

```sh
cp .env.example .env
npm install
```

### 2. Start the database

Run the following command to start a new Postgres database in a Docker container:

```sh
docker compose up -d
```

### 3. Create and run migrations

Run this command to apply migrations to the database:

```sh
npx prisma migrate dev --name init
```

### 4. Seed the database

Run the following command to add seed data to the database:

```sh
npx prisma db seed
```

### 5. Run the `dev` script

To run the `script.ts` file, run the following command:

```sh
npm run dev
```
