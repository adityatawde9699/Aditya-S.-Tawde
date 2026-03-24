# Aditya's Portfolio

A **dynamic, production-ready portfolio website** built with Django REST Framework and React. This project demonstrates full-stack development best practices, from containerization to automated testing.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite, Framer Motion |
| **Backend** | Django 5.1, Django REST Framework |
| **Database** | PostgreSQL (or SQLite for development) |
| **Containerization** | Docker, Docker Compose |
| **CI/CD** | GitHub Actions |

## ✨ Features

- **Dynamic Content Management**: Add/edit projects, skills, certifications via Django Admin.
- **Contact Form**: Form submissions saved to DB with email notifications.
- **Project Filtering**: Filter by category and featured status.
- **Responsive Design**: Mobile-first, animated UI with Framer Motion.
- **Lazy Loading**: Code-split routes for optimal performance.

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose (recommended)
- OR: Node.js 20+, Python 3.11+

### Using Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/yourusername/aditya-s.-tawde.git
cd aditya-s.-tawde

# Copy environment variables
cp .env.example .env

# Start all services
docker compose up --build
```

Access:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000/api/
- **Admin Panel**: http://localhost:8000/admin/

Default admin credentials (auto-created when Docker starts):
- **Username**: `adityatawde9699`
- **Password**: `Adityast@9158`

### Manual Setup

#### Backend (Django)
```bash
cd server
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

#### Frontend (React)
```bash
cd client
npm install
npm run dev
```

## 🧪 Testing

```bash
# Backend tests
cd server && pytest

# Frontend tests
cd client && npm run test
```

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── services/      # API client
│   │   └── test/          # Vitest tests
│   └── Dockerfile
├── server/                 # Django backend
│   ├── portfolio/         # Main Django app
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   └── tests/
│   └── Dockerfile
├── docker-compose.yml
└── .github/workflows/ci.yml
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/portfolio/projects/` | List all projects |
| GET | `/api/portfolio/projects/?featured=true` | Featured projects only |
| GET | `/api/portfolio/skills/` | List all skills |
| GET | `/api/portfolio/education/` | List education entries |
| GET | `/api/portfolio/certifications/` | List certifications |
| POST | `/api/contact/` | Submit contact form |

## 🔒 Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Description |
|----------|-------------|
| `SECRET_KEY` | Django secret key |
| `DEBUG` | Set to `False` in production |
| `DATABASE_URL` | PostgreSQL connection string |
| `EMAIL_HOST_USER` | SMTP email user |
| `EMAIL_HOST_PASSWORD` | SMTP email password |

## 📜 License

MIT License - feel free to use this as a template for your own portfolio!
