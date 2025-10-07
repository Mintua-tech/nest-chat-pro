# Real-time Chat App

A full-stack real-time chat application built with:

- **Backend:** NestJS, Socket.IO (with Redis adapter), Prisma ORM (PostgreSQL)
- **Frontend:** React + Vite
- **Real-time scaling:** PM2 in cluster mode, Redis for cross-instance message propagation
- **Dockerized:** Docker Compose for full environment (Postgres, Redis, Backend, Frontend, Nginx)
- **Reverse proxy:** Nginx for serving frontend and proxying Socket.IO & API requests

---

## Features

- Real-time messaging with Socket.IO
- Multiple chat rooms
- Persisted messages and users in PostgreSQL
- Scalable backend with PM2 cluster mode
- Multi-instance synchronization with Redis
- Dockerized environment for development and production

---

## Prerequisites

- Docker & Docker Compose
- Node.js & npm (optional if running without Docker)

---

## Screenshot

![Chat App Screenshot](assets/screenshot (107).png)
![Chat App Screenshot](assets/screenshot (107).png)

## Repository Structure

# Real-time Chat App

A full-stack real-time chat application built with:

* **Backend:** NestJS, Socket.IO (with Redis adapter), Prisma ORM (PostgreSQL)
* **Frontend:** React + Vite
* **Real-time scaling:** PM2 in cluster mode, Redis for cross-instance message propagation
* **Dockerized:** Docker Compose for full environment (Postgres, Redis, Backend, Frontend, Nginx)
* **Reverse proxy:** Nginx for serving frontend and proxying Socket.IO & API requests

---

## Features

* Real-time messaging with Socket.IO
* Multiple chat rooms
* Persisted messages and users in PostgreSQL
* Scalable backend with PM2 cluster mode
* Multi-instance synchronization with Redis
* Dockerized environment for development and production

---

## Prerequisites

* Docker & Docker Compose
* Node.js & npm (optional if running without Docker)

---

## Repository Structure

```
chat-app/
├─ backend/       # NestJS backend
├─ frontend/      # React frontend
├─ nginx/         # Nginx reverse proxy config
├─ docker-compose.yml
└─ README.md
```

---

## Getting Started (Docker Compose)

1. Build and start all services:

```bash
docker compose up --build
```

2. Run Prisma migrations (after Postgres is ready):

```bash
docker compose exec api npx prisma migrate deploy
```

3. Open your browser:

```
http://localhost
```

* Join a room from multiple tabs to test real-time messaging.
* Backend runs in PM2 cluster mode; Redis ensures messages are broadcast across all instances.

---

## Scaling Backend Instances

To test cross-instance real-time messaging:

```bash
docker compose up --build --scale api=3
```

Nginx will load balance HTTP requests to all backend instances, and Redis will synchronize messages across clusters.

---

## Development

* Backend:

```bash
cd backend
npm install
npm run start:dev
```

* Frontend:

```bash
cd frontend
npm install
npm run dev
```

* Access frontend at `http://localhost:5173` in development mode.

---

## Environment Variables

* `DATABASE_URL` – PostgreSQL connection string (used by Prisma)
* `REDIS_HOST` – Redis host (default: `redis`)
* `REDIS_PORT` – Redis port (default: `6379`)
* `PORT` – Backend port (default: `3000`)

---

## Quick Start (One-line)

```bash
docker compose up --build && docker compose exec api npx prisma migrate deploy
```

Then open `http://localhost` to start chatting.

---

## Notes

* Prisma client is generated at build time (`npx prisma generate`).
* PM2 cluster mode uses all CPU cores in the container.
* For production, secure Nginx with TLS/SSL and change default passwords.
* You can extend with JWT authentication for users and rooms.

---


