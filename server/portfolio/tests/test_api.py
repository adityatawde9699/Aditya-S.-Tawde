import pytest
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch

from portfolio.models import Project, TechStack, Skill, Education, Certification, ContactSubmission


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

    def test_empty_tech_stack(self, api_client, db):
        """Empty tech stack should return empty list, not error."""
        response = api_client.get("/api/portfolio/tech-stack/")
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data == []


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

    def test_filter_by_category_case_insensitive(self, api_client, sample_project):
        """Category filter should be case insensitive."""
        response = api_client.get("/api/portfolio/projects/?category=WEB")
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1

    def test_filter_non_existent_category(self, api_client, sample_project):
        """Non-existent category should return empty list."""
        response = api_client.get("/api/portfolio/projects/?category=NONEXISTENT")
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 0

    def test_project_includes_tech_stack(self, api_client, sample_project):
        """Project response should include tech stack details."""
        response = api_client.get("/api/portfolio/projects/")
        
        assert response.status_code == status.HTTP_200_OK
        tech_stack = response.data[0]["tech_stack"]
        assert len(tech_stack) == 2
        names = [t["name"] for t in tech_stack]
        assert "Python" in names
        assert "React" in names

    def test_empty_projects(self, api_client, db):
        """Empty projects should return empty list, not error."""
        response = api_client.get("/api/portfolio/projects/")
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data == []


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

    def test_xss_script_tag_rejected(self, api_client, db):
        """XSS attempt with script tag should be rejected."""
        data = {
            "name": "<script>alert('xss')</script>",
            "email": "hacker@example.com",
            "message": "This is a test message that is long enough.",
        }
        response = api_client.post("/api/contact/", data, format="json")
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_xss_img_onerror_rejected(self, api_client, db):
        """XSS attempt with img onerror should be rejected."""
        data = {
            "name": '<img src="x" onerror="alert(1)">',
            "email": "hacker@example.com",
            "message": "This is a test message that is long enough.",
        }
        response = api_client.post("/api/contact/", data, format="json")
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_xss_svg_onload_rejected(self, api_client, db):
        """XSS attempt with svg onload should be rejected."""
        data = {
            "name": '<svg onload="alert(1)">',
            "email": "hacker@example.com",
            "message": "This is a test message that is long enough.",
        }
        response = api_client.post("/api/contact/", data, format="json")
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_xss_in_message_rejected(self, api_client, db):
        """XSS attempt in message should also be rejected."""
        data = {
            "name": "Normal Name",
            "email": "user@example.com",
            "message": "<script>document.cookie</script> This is my message.",
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

    def test_short_name_rejected(self, api_client, db):
        """Name that is too short (< 2 chars) should be rejected."""
        data = {
            "name": "J",
            "email": "john@example.com",
            "message": "This is a test message that is long enough.",
        }
        response = api_client.post("/api/contact/", data, format="json")
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_missing_required_fields(self, api_client, db):
        """Missing required fields should be rejected."""
        # Missing email
        response = api_client.post("/api/contact/", {
            "name": "John Doe",
            "message": "This is a test message that is long enough.",
        }, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST

        # Missing name
        response = api_client.post("/api/contact/", {
            "email": "john@example.com",
            "message": "This is a test message that is long enough.",
        }, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST

        # Missing message
        response = api_client.post("/api/contact/", {
            "name": "John Doe",
            "email": "john@example.com",
        }, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_name_whitespace_trimmed(self, api_client, db):
        """Name should be trimmed of whitespace."""
        data = {
            "name": "  John Doe  ",
            "email": "john@example.com",
            "message": "This is a test message that is long enough.",
        }
        response = api_client.post("/api/contact/", data, format="json")
        
        assert response.status_code == status.HTTP_201_CREATED
        submission = ContactSubmission.objects.first()
        assert submission.name == "John Doe"

    @patch('portfolio.views.send_mail')
    def test_email_failure_does_not_fail_request(self, mock_send_mail, api_client, db):
        """Email sending failure should not cause request to fail."""
        mock_send_mail.side_effect = Exception("SMTP error")
        
        data = {
            "name": "John Doe",
            "email": "john@example.com",
            "message": "This is a test message that is long enough.",
        }
        response = api_client.post("/api/contact/", data, format="json")
        
        # Request should still succeed even if email fails
        assert response.status_code == status.HTTP_201_CREATED
        assert ContactSubmission.objects.count() == 1


class TestSkillsAPI:
    """Tests for the Skills API endpoint."""

    def test_list_skills(self, api_client, sample_skill):
        """Skills should be listed successfully."""
        response = api_client.get("/api/portfolio/skills/")
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]["name"] == "Django"
        assert response.data[0]["category"] == "BACKEND"

    def test_empty_skills(self, api_client, db):
        """Empty skills should return empty list."""
        response = api_client.get("/api/portfolio/skills/")
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data == []


class TestEducationAPI:
    """Tests for the Education API endpoint."""

    def test_list_education(self, api_client, db):
        """Education entries should be listed successfully."""
        from datetime import date
        Education.objects.create(
            institution="Test University",
            degree="B.Tech",
            start_date=date(2020, 1, 1),
            end_date=date(2024, 1, 1),
        )
        
        response = api_client.get("/api/portfolio/education/")
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]["institution"] == "Test University"


class TestCertificationAPI:
    """Tests for the Certification API endpoint."""

    def test_list_certifications(self, api_client, db):
        """Certifications should be listed successfully."""
        from datetime import date
        Certification.objects.create(
            name="AWS Certified",
            issuer="Amazon",
            date_issued=date(2024, 1, 1),
        )
        
        response = api_client.get("/api/portfolio/certifications/")
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]["name"] == "AWS Certified"

