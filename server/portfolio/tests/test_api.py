import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

from portfolio.models import Project, TechStack, Skill, ContactSubmission


@pytest.fixture
def api_client():
    """Returns a DRF test client."""
    return APIClient()


@pytest.fixture
def sample_tech_stack(db):
    """Creates sample tech stack items."""
    return [
        TechStack.objects.create(name="Python", icon_class="fab fa-python", is_visible=True),
        TechStack.objects.create(name="React", icon_class="fab fa-react", is_visible=True),
        TechStack.objects.create(name="Hidden Tech", icon_class="", is_visible=False),
    ]


@pytest.fixture
def sample_project(db, sample_tech_stack):
    """Creates a sample project."""
    project = Project.objects.create(
        title="Test Project",
        description="A test project description.",
        category="WEB",
        github_link="https://github.com/test/project",
        live_link="https://testproject.com",
        is_featured=True,
        order=1,
    )
    project.tech_stack.set(sample_tech_stack[:2])  # Only visible ones
    return project


@pytest.fixture
def sample_skill(db):
    """Creates a sample skill."""
    return Skill.objects.create(name="Django", category="BACKEND", order=1)


class TestTechStackAPI:
    """Tests for the Tech Stack API endpoint."""

    def test_list_tech_stack_returns_only_visible(self, api_client, sample_tech_stack):
        """Only visible tech stack items should be returned."""
        response = api_client.get("/api/portfolio/tech-stack/")
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 2  # 2 visible, 1 hidden
        names = [item["name"] for item in response.data]
        assert "Python" in names
        assert "React" in names
        assert "Hidden Tech" not in names


class TestProjectAPI:
    """Tests for the Project API endpoint."""

    def test_list_projects(self, api_client, sample_project):
        """Projects should be listed successfully."""
        response = api_client.get("/api/portfolio/projects/")
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]["title"] == "Test Project"

    def test_filter_by_featured(self, api_client, sample_project):
        """Filtering by featured should work."""
        response = api_client.get("/api/portfolio/projects/?featured=true")
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1

    def test_filter_by_category(self, api_client, sample_project):
        """Filtering by category should work."""
        response = api_client.get("/api/portfolio/projects/?category=web")
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1


class TestContactAPI:
    """Tests for the Contact form API endpoint."""

    def test_valid_contact_submission(self, api_client, db):
        """Valid contact form should be accepted."""
        data = {
            "name": "John Doe",
            "email": "john@example.com",
            "message": "This is a test message that is long enough.",
        }
        response = api_client.post("/api/contact/", data, format="json")
        
        assert response.status_code == status.HTTP_201_CREATED
        assert ContactSubmission.objects.count() == 1

    def test_invalid_email_rejected(self, api_client, db):
        """Invalid email should be rejected."""
        data = {
            "name": "John Doe",
            "email": "not-an-email",
            "message": "This is a test message that is long enough.",
        }
        response = api_client.post("/api/contact/", data, format="json")
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_xss_in_name_rejected(self, api_client, db):
        """XSS attempt in name should be rejected."""
        data = {
            "name": "<script>alert('xss')</script>",
            "email": "hacker@example.com",
            "message": "This is a test message that is long enough.",
        }
        response = api_client.post("/api/contact/", data, format="json")
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_short_message_rejected(self, api_client, db):
        """Message that is too short should be rejected."""
        data = {
            "name": "John Doe",
            "email": "john@example.com",
            "message": "Short",
        }
        response = api_client.post("/api/contact/", data, format="json")
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST
