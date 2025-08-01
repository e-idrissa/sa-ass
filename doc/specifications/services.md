# Telemed Services

The application is built on top of microservices architecture. It is divided in two main components : 
- The frontend and API Gateway
- The Telemed services

## 💻 Frontend and API Gateway
The frontend and API Gateway is built using [NextJS](https://nextjs.org/).

- **Port** : `3000`
- **URL** : `http://localhost:3000`

### Role
1. Acts as a single entry point for clients (doctors, patients, admini).
2. Redirects requests to the right services (authentication, consultations, medical records, notifications).
3. Can integrate mechanisms for validation, logging, security (`cookies()`)

## Technologies
- [NextJS](https://nextjs.org/) with Server Actions
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Axios](https://www.axios.io/)
- [React Hook Form](https://react-hook-form.com/)

## 🏗️ Telemed services
The Telemed services are built using [NestJS](https://docs.nestjs.com/).

We chose [NestJS](https://docs.nestjs.com/) for several reasons:
1. It is based on [Express](https://expressjs.com/), which allows us to benefit from Express's advantages.
2. It is designed to be easy to use and maintain.
3. It is designed to be easy to test.
4. It is designed to be easy to deploy.

### 🛡️ Auth Service

- **Port** : `3001`
- **URL** : `http://localhost:3001`

**Role:**
Handles registration, login, password reset, identity verification and provides access JWT tokens.

**Endpoints:** `POST /login` • `POST /logout` • `POST /verify` • `POST /reset-password`

**Technologies:** [NestJS](https://docs.nestjs.com/) • [TypeScript](https://www.typescriptlang.org/) • [JWT](https://jwt.io/)

---

### 🧑🏻‍⚕️ Users Service

- **Port** : `3002`
- **URL** : `http://localhost:3002`

**Role:** Handles user management. Interfaces with users-db, a dedicated MongoDB database.

**Endpoints:** `POST /register` • `PUT /update` • `GET /me` • `GET /patients` • `GET /patients/:id` • `GET /doctors` • `GET /doctors/:id` • `DELETE /users/:id`

**Technologies:** [NestJS](https://docs.nestjs.com/) • [MongoDB](https://www.mongodb.com/) (users-db) • [TypeScript](https://www.typescriptlang.org/)

---

### 🧑‍🤝‍🧑 Appointments Service

- **Port** : `3003`
- **URL** : `http://localhost:3003`

**Role:** Handles appointment management. Interfaces with appointments-db, a dedicated PostgreSQL database.

**Endpoints:** `POST /create` • `PUT /appointments/:id/update` • `GET /appointments` • `GET /appointments/:id` • `GET /appointments/:userId` • `DELETE /appointments/:id`

**Technologies:** [NestJS](https://docs.nestjs.com/) • [PostgreSQL](https://www.postgresql.org/) (appointments-db) • [Prisma](https://www.prisma.io/) • [TypeScript](https://www.typescriptlang.org/)

---

### 💊 Prescriptions Service

- **Port** : `3004`
- **URL** : `http://localhost:3004`

**Role:** Handles prescription management. Interfaces with prescriptions-db, a dedicated PostgreSQL database.

**Endpoints:** `POST /create` • `PUT /prescriptions/:id/update` • `GET /prescriptions` • `GET /prescriptions/:id` • `GET /prescriptions/:userId` • `DELETE /prescriptions/:id`

**Technologies:** [NestJS](https://docs.nestjs.com/) • [PostgreSQL](https://www.postgresql.org/) (prescriptions-db) • [Prisma](https://www.prisma.io/) • [TypeScript](https://www.typescriptlang.org/)

---

### 📁 Records Service

- **Port** : `3005`
- **URL** : `http://localhost:3005`

**Role:** Handles record management. Interfaces with records-db, a dedicated PostgreSQL database.

**Endpoints:** `POST /create` • `PUT /records/:id/update` • `GET /records` • `GET /records/:id` • `GET /records/:userId` • `DELETE /records/:id`

**Technologies:** [NestJS](https://docs.nestjs.com/) • [PostgreSQL](https://www.postgresql.org/) (records-db) • [Prisma](https://www.prisma.io/) • [TypeScript](https://www.typescriptlang.org/)

---

### 🗓️ Notifications Service

- **Port** : `3006`
- **URL** : `http://localhost:3006`

**Role:** Handles email or SMS notifications for appointment reminders, prescriptions, etc.

**Endpoints:** `POST /notify`
- `PUT /records/:id/update`
- `GET /records`
- `GET /records/:id`
- `GET /records/:userId`
- `DELETE /records/:id`

**Technologies:** [NestJS](https://docs.nestjs.com/) • [PostgreSQL](https://www.postgresql.org/) (records-db) • [Prisma](https://www.prisma.io/) • [TypeScript](https://www.typescriptlang.org/)


## 🔗 Service Communication: REST

Services communicate primarily through HTTP REST calls. Each service exposes protected endpoints with middleware (authentication, access control).

Ideal for simplicity and clarity of synchronous interactions.
