# 🔥 IMF Gadget API

The **Impossible Missions Force (IMF)** requires a secure and powerful API to manage their top-secret gadgets. This API provides secure CRUD operations for managing spy gadgets with features like random codenames, mission success probability, soft deletes, and a self-destruct sequence.

> 💼 Challenge: [Phoenix: IMF Gadget API Development Challenge](https://upraised.co)

## 🚀 Features

- JWT-based **Authentication** (`/auth/register`, `/auth/login`)
- **Gadget Inventory** management:
  - `GET /gadgets`: List all gadgets with random mission success probability.
  - `POST /gadgets`: Add a new gadget with random codename.
  - `PATCH /gadgets/:id`: Update gadget info.
  - `DELETE /gadgets/:id`: Soft delete (mark as *Decommissioned* with timestamp).
  - `POST /gadgets/:id/self-destruct`: Generate confirmation code and mark as *Destroyed*.
  - `PATCH /gadgets/:id/restore`: Restore gadget if not destroyed.
  - `GET /gadgets?status=Available`: Filter gadgets by status.
- 🎯 Secure routes protected with JWT.
- 🧪 Clean and modular code structure with proper error handling.
- 🌐 Deployed on Railway (or any platform of your choice).
- 💠 Built using **Node.js**, **Express**, **PostgreSQL**, **Sequelize ORM**.

## 🛆 Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Auth**: JWT
- **Deployment**: Railway

## 🔐 Authentication

- `POST /auth/register`: Register a new agent.
- `POST /auth/login`: Login to receive JWT.
- `POST /auth/logout`: (Dummy route for token removal client-side)

Use the token in `Authorization` header:
```
Authorization: Bearer <your_token_here>
```

## 📘 Example Gadget

```json
{
  "id": "uuid",
  "name": "Invisibility Cloak",
  "codename": "The Kraken",
  "status": "Available",
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "missionSuccessProbability": "87%"
}
```

## ▶️ Running Locally

```bash
# Clone the repo
git clone https://github.com/Adimaniac31/imf-gadget-api.git
cd imf-gadget-api

# Install dependencies
npm install

# Create a .env file
cp .env.example .env

# Run migrations
npx sequelize-cli db:migrate

# Start the server
npm run dev
```

## 🔪 API Testing

- Use **Postman** to test routes.
- All protected routes require JWT token.

## 📂 Folder Structure

```
🔼 controllers/
🔼 middleware/
🔼 models/
🔼 routes/
🔼 config/
🔼 .env.example
🔼 server.js
🔼 README.md
```

## 🛄 Deployment

Deployed via [Railway](https://railway.app/) — add your PostgreSQL and JWT secret as environment variables.
Here's the live link : 

> This message will not self-destruct. Good luck, agent! 😎

