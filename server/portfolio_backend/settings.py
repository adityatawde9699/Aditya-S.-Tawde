"""
Django settings for portfolio_backend project.
"""

import os
from pathlib import Path

import dj_database_url
from django.core.exceptions import ImproperlyConfigured
from django.urls import reverse_lazy
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# In production, SECRET_KEY MUST be set as a real environment variable.
# The insecure fallback is only permitted when DEBUG=True (local dev only).
_secret_key = os.environ.get('SECRET_KEY')
_debug_mode = os.environ.get('DEBUG', 'False') == 'True'

if not _secret_key:
    if not _debug_mode:
        raise ImproperlyConfigured(
            "SECRET_KEY environment variable is not set. "
            "This is required in production. Set SECRET_KEY in your environment."
        )
    # Temporary fallback for development
    _secret_key = 'django-insecure-temporary-fallback-key-for-build-purposes'

SECRET_KEY = _secret_key

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = _debug_mode

if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    # CRITICAL: Required for Django to recognize HTTPS over Render's proxy
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

ALLOWED_HOSTS = os.environ.get(
    'ALLOWED_HOSTS', 'localhost,127.0.0.1,.vercel.app'
).split(',')

# Render dynamic hostname support
RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

CSRF_TRUSTED_ORIGINS = ["https://aditya-s-tawde.vercel.app"]
if RENDER_EXTERNAL_HOSTNAME:
    CSRF_TRUSTED_ORIGINS.append(f'https://{RENDER_EXTERNAL_HOSTNAME}')

if DEBUG:
    CSRF_TRUSTED_ORIGINS += [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]


# Application definition

INSTALLED_APPS = [
    'unfold',  # Modern admin theme - must be before django.contrib.admin
    'unfold.contrib.filters',  # Enhanced filters
    'unfold.contrib.forms',  # Enhanced forms
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Third-party apps
    'rest_framework',
    'corsheaders',
    # Local apps
    'portfolio',
]


MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    "whitenoise.middleware.WhiteNoiseMiddleware",
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'portfolio_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'portfolio_backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': dj_database_url.config(
        default=f'sqlite:///{BASE_DIR / "db.sqlite3"}',
        conn_max_age=600,
        conn_health_checks=True,  # Prevent timeout errors with Neon PostgreSQL
    )
}

# Enforce a real database in production.
# SQLite is only permitted in local development (DEBUG=True).
# In production, DATABASE_URL must be set to a PostgreSQL connection string.
if not _debug_mode and not os.environ.get('DATABASE_URL'):
    raise ImproperlyConfigured(
        "DATABASE_URL environment variable is not set. "
        "SQLite is not permitted in production. "
        "Set DATABASE_URL to a PostgreSQL connection string."
    )

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        'LOCATION': '/tmp/django_cache',
        'TIMEOUT': 3600,
        'OPTIONS': {
            'MAX_ENTRIES': 1000
        }
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': (
            'django.contrib.auth.password_validation'
            '.UserAttributeSimilarityValidator'
        ),
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"


# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'


# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# REST Framework Configuration
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/day',
        'contact': '5/hour',  # Stricter rate for contact form
    },
}


# Unfold Admin Theme Configuration

UNFOLD = {
    "SITE_TITLE": "Aditya's Portfolio",
    "SITE_HEADER": "System Architecture",
    "SITE_SUBHEADER": "Premium CMS Dashboard",
    "SITE_ICON": {
        "light": lambda request: STATIC_URL + "img/logo-light.svg",
        "dark": lambda request: STATIC_URL + "img/logo-dark.svg",
    },
    "SITE_SYMBOL": "speed",  # Google Material Symbol
    "SHOW_HISTORY": True,
    "SHOW_VIEW_ON_SITE": True,
    "ENVIRONMENT": "development" if DEBUG else "production",
    "COLORS": {
        "primary": {
            "50": "238 242 255",
            "100": "224 231 255",
            "200": "199 210 254",
            "300": "165 180 252",
            "400": "129 140 248",
            "500": "99 102 241",  # Indigo 500
            "600": "79 70 229",
            "700": "67 56 202",
            "800": "55 48 163",
            "900": "49 46 129",
            "950": "30 27 75",
        },
    },
    "EXTENSIONS": {
        "modeltranslation": {
            "flags": {
                "en": "GB",
                "es": "ES",
            }
        },
    },
    "SIDEBAR": {
        "show_search": True,
        "show_all_applications": False,
        "navigation": [
            {
                "title": "Platform Dashboard",
                "separator": True,
                "items": [
                    {
                        "title": "Control Center",
                        "icon": "dashboard",
                        "link": reverse_lazy("admin:index"),
                    },
                ],
            },
            {
                "title": "Content Management",
                "separator": True,
                "items": [
                    {
                        "title": "Projects Catalog",
                        "icon": "work",
                        "link": reverse_lazy("admin:portfolio_project_changelist"),
                    },
                    {
                        "title": "Skill Matrix",
                        "icon": "military_tech",
                        "link": reverse_lazy("admin:portfolio_skill_changelist"),
                    },
                    {
                        "title": "Tech Stack",
                        "icon": "memory",
                        "link": reverse_lazy("admin:portfolio_techstack_changelist"),
                    },
                ],
            },
            {
                "title": "Records & Credentials",
                "separator": True,
                "items": [
                    {
                        "title": "Educational History",
                        "icon": "school",
                        "link": reverse_lazy("admin:portfolio_education_changelist"),
                    },
                    {
                        "title": "Certifications Tracker",
                        "icon": "workspace_premium",
                        "link": reverse_lazy("admin:portfolio_certification_changelist"),
                    },
                ],
            },
            {
                "title": "Inbox & CRM",
                "separator": True,
                "items": [
                    {
                        "title": "Client Messages",
                        "icon": "mark_email_unread",
                        "link": reverse_lazy("admin:portfolio_contactsubmission_changelist"),
                    },
                ],
            },
            {
                "title": "System Access",
                "separator": True,
                "items": [
                    {
                        "title": "Administrators",
                        "icon": "admin_panel_settings",
                        "link": reverse_lazy("admin:auth_user_changelist"),
                    },
                    {
                        "title": "Roles & Groups",
                        "icon": "groups",
                        "link": reverse_lazy("admin:auth_group_changelist"),
                    },
                ],
            },
        ],
    },
}



# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    "https://aditya-s-tawde.vercel.app",
]

if DEBUG:
    CORS_ALLOWED_ORIGINS += [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

# Add production frontend URL via environment variable
PROD_CLIENT_URL = os.getenv('PROD_CLIENT_URL')
if PROD_CLIENT_URL:
    CORS_ALLOWED_ORIGINS.append(PROD_CLIENT_URL.rstrip('/'))

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]


# Email Configuration
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER', '')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD', '')
RECIPIENT_EMAIL = os.getenv('RECIPIENT_EMAIL', '')

# Validate email configuration in production
EMAIL_CONFIGURED = all([EMAIL_HOST_USER, EMAIL_HOST_PASSWORD, RECIPIENT_EMAIL])

if not DEBUG and not EMAIL_CONFIGURED:
    import warnings
    warnings.warn(
        "Email settings (EMAIL_HOST_USER, EMAIL_HOST_PASSWORD, RECIPIENT_EMAIL) "
        "are not fully configured. Contact form emails will not be sent. "
        "Set these environment variables for production.",
        RuntimeWarning
    )


# Logging Configuration
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'standard': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'standard',
        },
    },
    'root': {'handlers': ['console'], 'level': 'INFO'},
    'loggers': {
        'django': {'handlers': ['console'], 'level': 'WARNING', 'propagate': False},
        'portfolio': {
            'handlers': ['console'],
            'level': 'DEBUG' if DEBUG else 'INFO',
            'propagate': False,
        },
    },
}

