from django.core.management.base import BaseCommand
from portfolio.models import Project, TechStack

class Command(BaseCommand):
    help = 'Seeds the database with initial portfolio data. Run once.'

    def add_arguments(self, parser):
        parser.add_argument('--force', action='store_true',
                           help='Run even if data already exists')

    def handle(self, *args, **options):
        if Project.objects.exists() and not options['force']:
            self.stdout.write('Data exists. Use --force to reseed.')
            return

        self.stdout.write("Setting up tech stacks...")
        techs = [
            "Python", "FastAPI", "SQLAlchemy", "Docker", "Gemini API", 
            "HTML/CSS/JS", "Whisper AI", "TypeScript", "Tauri 2.0", "SQLite", 
            "React", "PostgreSQL", "Node.js", "Django", "Vite", 
            "Selenium", "Pandas", "Matplotlib", "Seaborn", 
            "Streamlit", "Scikit-learn", "JavaScript", "HTML/CSS", "REST APIs"
        ]
        
        tech_objects = {}
        for tech in techs:
            t, created = TechStack.objects.get_or_create(name=tech)
            tech_objects[tech] = t

        self.stdout.write("Setting up projects...")
        projects_data = [
            {
                "title": "Amadeus-AI: Hybrid AI Assistant",
                "description": "A modular, voice-enabled AI assistant utilizing a hybrid architecture. Combines local ML classifiers for rapid intent routing with Google Gemini for complex reasoning and context management. Built with a scalable Python backend.",
                "category": "AI_ML",
                "github_link": "https://github.com/adityatawde9699/Amadeus-AI",
                "techs": ["Python", "FastAPI", "SQLAlchemy", "Docker", "Gemini API"],
                "order": 1,
                "is_featured": True
            },
            {
                "title": "System-32 AI Interview Coach",
                "description": "Real-time AI interview coach featuring context-aware question generation. Implements local speech transcription via Whisper and utilizes Gemini 2.0 for zero-latency coaching feedback on speaking delivery.",
                "category": "AI_ML",
                "github_link": "https://github.com/adityatawde9699/System-32-Inter-View-AI",
                "techs": ["Python", "FastAPI", "HTML/CSS/JS", "Whisper AI", "Gemini API"],
                "order": 2,
                "is_featured": True
            },
            {
                "title": "Cognate Smart Task Manager",
                "description": "Native, offline-capable smart task manager designed for cross-platform desktop use. Features a glassmorphism UI and a robust fallback storage mechanism bridging SQLite and localStorage.",
                "category": "DESKTOP",
                "github_link": "https://github.com/adityatawde9699/Cognate",
                "techs": ["TypeScript", "Tauri 2.0", "SQLite", "React"],
                "order": 3,
                "is_featured": True
            },
            {
                "title": "CrystalReadymades E-Commerce Platform",
                "description": "Full-stack e-commerce platform built for high-performance transaction processing. Features a robust relational database schema and a decoupled frontend-backend architecture.",
                "category": "WEB",
                "github_link": "https://github.com/adityatawde9699/crystalreadymades.com",
                "techs": ["FastAPI", "PostgreSQL", "React", "TypeScript"],
                "order": 4,
                "is_featured": True
            },
            {
                "title": "Arth-Neeti Financial Simulation Game",
                "description": "A simulation cards-based quizzer game designed to test and improve financial literacy. Built with a decoupled architecture utilizing a React frontend and Django REST backend.",
                "category": "WEB",
                "github_link": "https://github.com/adityatawde9699/arth-neeti-game",
                "techs": ["React", "Node.js", "Python", "Django", "Vite"],
                "order": 5,
                "is_featured": True
            },
            {
                "title": "Market & Job Data Scraper",
                "description": "A Python-based automation toolkit that scrapes real-time stock market data via Alpha Vantage and extracts job listings using Selenium. Generates programmatic visualizations.",
                "category": "DATA",
                "github_link": "https://github.com/adityatawde9699/DataScraperViz",
                "techs": ["Python", "Selenium", "Pandas", "Matplotlib", "Seaborn"],
                "order": 6,
                "is_featured": True
            },
            {
                "title": "NLP Fake Review Detector",
                "description": "NLP-powered Streamlit application for instant sentiment analysis. Predicts positive, neutral, or negative classifications from raw text inputs.",
                "category": "AI_ML",
                "techs": ["Python", "Streamlit", "Scikit-learn"],
                "order": 7,
                "is_featured": False
            },
            {
                "title": "QueueBite Canteen System",
                "description": "Smart queue management system featuring live order tracking, digital token generation, and real-time state synchronization between customers and staff.",
                "category": "WEB",
                "techs": ["JavaScript", "HTML/CSS", "Node.js"],
                "order": 8,
                "is_featured": False
            },
            {
                "title": "WeatherForesite Dashboard",
                "description": "Real-time global weather forecasting application integrating third-party REST APIs to handle dynamic location data and alerts.",
                "category": "WEB",
                "techs": ["JavaScript", "HTML/CSS", "REST APIs"],
                "order": 9,
                "is_featured": False
            }
        ]

        for p_data in projects_data:
            # Check if project already exists
            p, created = Project.objects.update_or_create(
                title=p_data['title'],
                defaults={
                    'description': p_data['description'],
                    'category': p_data['category'],
                    'github_link': p_data.get('github_link', ''),
                    'live_link': p_data.get('live_link', ''),
                    'order': p_data['order'],
                    'is_featured': p_data['is_featured']
                }
            )
            
            # Add tech stack
            for tech in p_data['techs']:
                p.tech_stack.add(tech_objects[tech])
            
            self.stdout.write(f"{'Created' if created else 'Updated'} project: {p.title}")
        
        self.stdout.write(self.style.SUCCESS("Database seeding completed."))
