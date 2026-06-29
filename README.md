# Aditya's Portfolio

A **dynamic, production-ready portfolio website** with a React frontend and a
lightweight **Hono (Node.js)** API. The backend is tuned to run comfortably on
**Render's free tier** — fast cold starts, aggressive caching, and a single
aggregated load-time request.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite, Framer Motion |
| **Backend** | Hono (Node.js 20, TypeScript) |
| **ORM** | Drizzle ORM |
| **Database** | Neon PostgreSQL (serverless HTTP driver) |
| **Auth/CMS** | JWT cookie + server-rendered admin (hono/jsx) |
| **Email** | Nodemailer (Gmail SMTP) |
| **Containerization** | Docker, Docker Compose |
| **CI/CD** | GitHub Actions |

## ✨ Features

- **Content Management**: Edit projects, skills, certifications, experience, and
  education from a built-in CMS at `/admin`.
- **Contact Form**: Submissions saved to the DB with email notification + rate limiting.
- **Efficient loads**: One aggregated `/api/portfolio/all/` request, response
  caching, ETag/304, and gzip/br compression.
- **Project Filtering**: Filter by category and featured status.
- **Responsive Design**: Mobile-first, animated UI with Framer Motion.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- A Neon Postgres database (free tier) — or any Postgres reachable via the Neon driver
- OR: Docker & Docker Compose

### Using Docker

```bash
git clone https://github.com/yourusername/aditya-s.-tawde.git
cd aditya-s.-tawde

cp server/.env.example server/.env   # fill in DATABASE_URL, JWT_SECRET, ADMIN_*, email
docker compose up --build
```

Access:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000/api/
- **Admin / CMS**: http://localhost:8000/admin/

### Manual Setup

#### Backend (Hono)
```bash
cd server
cp .env.example .env          # configure DATABASE_URL, JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD
npm install
npm run db:migrate            # create tables
npm run db:seed               # seed portfolio content + admin user
npm run dev                   # http://localhost:8000
```

#### Frontend (React)
```bash
cd client
npm install
npm run dev
```

## 🧪 Testing

```bash
# Frontend tests
cd client && npm run test
```

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── services/        # API client (aggregated loader)
│   │   └── test/            # Vitest tests
│   └── Dockerfile
├── server/                 # Hono backend
│   ├── src/
│   │   ├── index.ts         # app bootstrap (cors, compress, routes)
│   │   ├── config.ts        # env config
│   │   ├── db/              # schema, client, migrate, seed
│   │   ├── lib/             # cache, auth, mailer, sanitize, queries, serialize
│   │   ├── routes/          # portfolio, contact, admin (auth)
│   │   └── admin/           # server-rendered CMS (hono/jsx)
│   ├── drizzle/             # generated SQL migrations
│   └── Dockerfile
├── docker-compose.yml
├── render.yaml
└── .github/workflows/ci.yml
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health/` | Health check / keep-warm |
| GET | `/api/portfolio/all/` | Aggregated payload (all sections in one call) |
| GET | `/api/portfolio/projects/` | List projects (`?featured=true`, `?category=WEB`) |
| GET | `/api/portfolio/skills/` | List skills |
| GET | `/api/portfolio/tech-stack/` | List tech stack |
| GET | `/api/portfolio/education/` | List education entries |
| GET | `/api/portfolio/certifications/` | List certifications |
| GET | `/api/portfolio/experience/` | List experience entries |
| POST | `/api/contact/` | Submit contact form (5/hr/IP) |
| POST | `/api/admin/login/` | Admin login (JWT cookie) |
| GET | `/api/admin/status/` | Admin session status |

## 🔒 Environment Variables (`server/.env`)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon Postgres connection string |
| `JWT_SECRET` | Secret for signing admin JWTs |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | CMS login credentials |
| `EMAIL_HOST_USER` / `EMAIL_HOST_PASSWORD` / `RECIPIENT_EMAIL` | Gmail SMTP contact emails |
| `PROD_CLIENT_URL` | Allowed CORS origin (frontend URL) |
| `CACHE_TTL_SECONDS` | Read-endpoint cache TTL (default 3600) |

The client uses `VITE_API_URL` (e.g. `http://localhost:8000/api`) to reach the backend.

## 📜 License

MIT License - feel free to use this as a template for your own portfolio!
