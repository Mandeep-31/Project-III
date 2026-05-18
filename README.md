# FocusPact

FocusPact is a collaborative productivity and accountability platform designed to help students stay focused during study sessions through realtime monitoring, distraction prevention, and peer accountability.

---

# Features

## Authentication
- User registration
- JWT authentication
- Password hashing
- OTP email verification
- Protected routes

## Dashboard
- Focus statistics
- Study session interface
- Productivity overview

## Planned Features
- Friend system
- Realtime accountability
- Electron desktop monitoring
- Browser extension
- Session reports
- Gamification system

---

# Tech Stack

## Frontend
- React
- TypeScript
- TailwindCSS
- React Router
- Axios

## Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt

---

# Project Structure

```bash
FocusPact/
│
├── client/
├── server/
├── extension/
├── docs/
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend Setup

```bash
cd server
npm install
npm run dev
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

# Environment Variables

Create `.env` inside `server/`

```env
DATABASE_URL=
EMAIL_USER=
EMAIL_PASS=
JWT_SECRET=
```

---

# Current Progress

✅ Authentication System  
✅ OTP Verification  
✅ JWT Authorization  
✅ Frontend Authentication Flow  
✅ Protected Routes  
✅ Dashboard UI  

---

# Authors

- Member 1 — Backend & Authentication
- Member 2 — Frontend & UI
- Member 3 — Electron & Monitoring