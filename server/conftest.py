"""
Root-level conftest.py for the server test suite.

Sets required environment variables BEFORE pytest-django initializes Django.
This keeps the test suite self-contained — no .env file is required to run tests.
"""

import os

# Provide a safe, test-only secret key so Django can start without a .env file.
# This key is not secret — it is only ever used in the test environment.
os.environ.setdefault("SECRET_KEY", "test-only-insecure-key-not-for-production")
# DEBUG=True allows Django to fall back to SQLite for fast, isolated test runs.
# The DATABASE_URL production guard only fires when DEBUG=False.
os.environ.setdefault("DEBUG", "True")

