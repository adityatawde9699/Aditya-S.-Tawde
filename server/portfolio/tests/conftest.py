"""
Pytest configuration for portfolio app tests.
"""
import pytest
from django.core.cache import cache
from rest_framework.test import APIClient
from unittest.mock import patch


@pytest.fixture(autouse=True)
def clear_throttle_cache():
    """Clear the cache before each test to reset throttle counters."""
    cache.clear()
    yield
    cache.clear()


@pytest.fixture(autouse=True)
def disable_contact_throttling():
    """Disable throttling on ContactView for all tests by removing throttle_classes."""
    with patch('portfolio.views.ContactView.throttle_classes', []):
        yield
