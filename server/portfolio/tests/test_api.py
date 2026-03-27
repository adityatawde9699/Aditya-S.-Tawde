from datetime import date
from unittest.mock import patch

import pytest
from django.contrib.auth import get_user_model
from django.core.cache import cache
from rest_framework import status
from rest_framework.test import APIClient, APIRequestFactory

from portfolio.models import (
    Certification,
    ContactSubmission,
    Education,
    Project,
    Skill,
    TechStack,
)

User = get_user_model()


@pytest.fixture
def api_client():
    """Returns a DRF test client."""
    return APIClient()


@pytest.fixture(autouse=True)
def clear_cache():
    cache.clear()
    yield
    cache.clear()


@pytest.fixture
def sample_tech_stack(db):
    """Creates sample tech stack items."""
    return [
        TechStack.objects.create(
            name="Python", icon_class="fab fa-python", is_visible=True
        ),
        TechStack.objects.create(
            name="React", icon_class="fab fa-react", is_visible=True
        ),
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
    project.tech_stack.set(sample_tech_stack[:2])
    return project


@pytest.fixture
def sample_skill(db):
    """Creates a sample skill."""
    return Skill.objects.create(name="Django", category="BACKEND", order=1)


class TestTechStackAPI:
    def test_list_tech_stack_returns_only_visible(self, api_client, sample_tech_stack):
        response = api_client.get('/api/portfolio/tech-stack/')

        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 2
        names = [item['name'] for item in response.data]
        assert 'Python' in names
        assert 'React' in names
        assert 'Hidden Tech' not in names

    def test_empty_tech_stack(self, api_client, db):
        response = api_client.get('/api/portfolio/tech-stack/')

        assert response.status_code == status.HTTP_200_OK
        assert response.data == []


class TestProjectAPI:
    def test_list_projects(self, api_client, sample_project):
        response = api_client.get('/api/portfolio/projects/')

        assert response.status_code == status.HTTP_200_OK
        assert response.data['count'] == 1
        assert len(response.data['results']) == 1
        assert response.data['results'][0]['title'] == 'Test Project'

    def test_filter_by_featured(self, api_client, sample_project):
        response = api_client.get('/api/portfolio/projects/?featured=true')

        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['results']) == 1

    def test_filter_by_category(self, api_client, sample_project):
        response = api_client.get('/api/portfolio/projects/?category=web')

        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['results']) == 1

    def test_filter_by_category_case_insensitive(self, api_client, sample_project):
        response = api_client.get('/api/portfolio/projects/?category=WEB')

        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['results']) == 1

    def test_filter_non_existent_category(self, api_client, sample_project):
        response = api_client.get('/api/portfolio/projects/?category=NONEXISTENT')

        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['results']) == 0

    def test_project_includes_tech_stack(self, api_client, sample_project):
        response = api_client.get('/api/portfolio/projects/')

        assert response.status_code == status.HTTP_200_OK
        tech_stack = response.data['results'][0]['tech_stack']
        assert len(tech_stack) == 2
        names = [t['name'] for t in tech_stack]
        assert 'Python' in names
        assert 'React' in names

    def test_empty_projects(self, api_client, db):
        response = api_client.get('/api/portfolio/projects/')

        assert response.status_code == status.HTTP_200_OK
        assert response.data['count'] == 0
        assert response.data['results'] == []

    def test_project_list_is_paginated(self, api_client, db):
        for index in range(25):
            Project.objects.create(
                title=f'Project {index}',
                description='Paginated project description.',
                category='WEB',
                order=index,
            )

        response = api_client.get('/api/portfolio/projects/')

        assert response.status_code == status.HTTP_200_OK
        assert response.data['count'] == 25
        assert len(response.data['results']) == 20
        assert response.data['next'] is not None


class TestContactAPI:
    def test_valid_contact_submission(self, api_client, db):
        data = {
            'name': 'John Doe',
            'email': 'john@example.com',
            'message': 'This is a test message that is long enough.',
        }
        response = api_client.post('/api/contact/', data, format='json')

        assert response.status_code == status.HTTP_201_CREATED
        assert ContactSubmission.objects.count() == 1

    def test_invalid_email_rejected(self, api_client, db):
        response = api_client.post('/api/contact/', {
            'name': 'John Doe',
            'email': 'not-an-email',
            'message': 'This is a test message that is long enough.',
        }, format='json')

        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_xss_script_tag_rejected(self, api_client, db):
        response = api_client.post('/api/contact/', {
            'name': "<script>alert('xss')</script>",
            'email': 'hacker@example.com',
            'message': 'This is a test message that is long enough.',
        }, format='json')

        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_xss_img_onerror_rejected(self, api_client, db):
        response = api_client.post('/api/contact/', {
            'name': '<img src="x" onerror="alert(1)">',
            'email': 'hacker@example.com',
            'message': 'This is a test message that is long enough.',
        }, format='json')

        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_xss_svg_onload_rejected(self, api_client, db):
        response = api_client.post('/api/contact/', {
            'name': '<svg onload="alert(1)">',
            'email': 'hacker@example.com',
            'message': 'This is a test message that is long enough.',
        }, format='json')

        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_xss_in_message_rejected(self, api_client, db):
        response = api_client.post('/api/contact/', {
            'name': 'Normal Name',
            'email': 'user@example.com',
            'message': '<script>document.cookie</script> This is my message.',
        }, format='json')

        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_short_message_rejected(self, api_client, db):
        response = api_client.post('/api/contact/', {
            'name': 'John Doe',
            'email': 'john@example.com',
            'message': 'Short',
        }, format='json')

        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_short_name_rejected(self, api_client, db):
        response = api_client.post('/api/contact/', {
            'name': 'J',
            'email': 'john@example.com',
            'message': 'This is a test message that is long enough.',
        }, format='json')

        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_missing_required_fields(self, api_client, db):
        response = api_client.post('/api/contact/', {
            'name': 'John Doe',
            'message': 'This is a test message that is long enough.',
        }, format='json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST

        response = api_client.post('/api/contact/', {
            'email': 'john@example.com',
            'message': 'This is a test message that is long enough.',
        }, format='json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST

        response = api_client.post('/api/contact/', {
            'name': 'John Doe',
            'email': 'john@example.com',
        }, format='json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_name_whitespace_trimmed(self, api_client, db):
        response = api_client.post('/api/contact/', {
            'name': '  John Doe  ',
            'email': 'john@example.com',
            'message': 'This is a test message that is long enough.',
        }, format='json')

        assert response.status_code == status.HTTP_201_CREATED
        submission = ContactSubmission.objects.first()
        assert submission.name == 'John Doe'

    @patch('portfolio.services.send_mail')
    def test_email_failure_does_not_fail_request(self, mock_send_mail, api_client, db):
        mock_send_mail.side_effect = Exception('SMTP error')

        response = api_client.post('/api/contact/', {
            'name': 'John Doe',
            'email': 'john@example.com',
            'message': 'This is a test message that is long enough.',
        }, format='json')

        assert response.status_code == status.HTTP_201_CREATED
        assert ContactSubmission.objects.count() == 1

    @pytest.mark.django_db
    def test_contact_rate_limit_returns_429_on_sixth_request(self):
        from django.contrib.auth.models import AnonymousUser
        from portfolio.views import ContactRateThrottle
        from rest_framework.views import APIView

        factory = APIRequestFactory()
        api_view = APIView()
        throttle = ContactRateThrottle()
        payload = {
            'name': 'Rate Limited User',
            'email': 'limit@example.com',
            'message': 'This is a test message that is long enough.',
        }

        for _ in range(5):
            request = api_view.initialize_request(
                factory.post(
                    '/api/contact/', payload,
                    format='json', REMOTE_ADDR='127.0.0.1',
                )
            )
            request.user = AnonymousUser()
            assert throttle.allow_request(request, api_view) is True

        request = api_view.initialize_request(
            factory.post(
                '/api/contact/', payload,
                format='json', REMOTE_ADDR='127.0.0.1',
            )
        )
        request.user = AnonymousUser()
        assert throttle.allow_request(request, api_view) is False
        assert throttle.wait() > 3590


class TestAdminAuthenticationAPI:
    def test_admin_login_logout_and_status(self, api_client, db):
        User.objects.create_user(
            username='admin',
            password='p@ssword123',
            is_staff=True,
            is_active=True,
        )

        login_response = api_client.post('/api/admin/login/', {
            'username': 'admin',
            'password': 'p@ssword123',
        }, format='json')

        assert login_response.status_code == status.HTTP_200_OK
        assert login_response.data['is_staff'] is True

        status_response = api_client.get('/api/admin/status/')
        assert status_response.status_code == status.HTTP_200_OK
        assert status_response.data['username'] == 'admin'

        logout_response = api_client.post('/api/admin/logout/')
        assert logout_response.status_code == status.HTTP_200_OK

        status_after_logout = api_client.get('/api/admin/status/')
        assert status_after_logout.status_code == status.HTTP_403_FORBIDDEN

    def test_admin_login_invalid_credentials(self, api_client, db):
        User.objects.create_user(
            username='admin',
            password='p@ssword123',
            is_staff=True,
            is_active=True,
        )

        invalid_login = api_client.post('/api/admin/login/', {
            'username': 'admin',
            'password': 'wrong-password',
        }, format='json')

        assert invalid_login.status_code == status.HTTP_401_UNAUTHORIZED


class TestSkillsAPI:
    def test_list_skills(self, api_client, sample_skill):
        response = api_client.get('/api/portfolio/skills/')

        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]['name'] == 'Django'
        assert response.data[0]['category'] == 'BACKEND'

    def test_empty_skills(self, api_client, db):
        response = api_client.get('/api/portfolio/skills/')

        assert response.status_code == status.HTTP_200_OK
        assert response.data == []


class TestEducationAPI:
    def test_list_education(self, api_client, db):
        Education.objects.create(
            institution='Test University',
            degree='B.Tech',
            start_date=date(2020, 1, 1),
            end_date=date(2024, 1, 1),
        )

        response = api_client.get('/api/portfolio/education/')

        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]['institution'] == 'Test University'


class TestCertificationAPI:
    def test_list_certifications(self, api_client, db):
        Certification.objects.create(
            name='AWS Certified',
            issuer='Amazon',
            date_issued=date(2024, 1, 1),
        )

        response = api_client.get('/api/portfolio/certifications/')

        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]['name'] == 'AWS Certified'


class TestHealthCheckAPI:
    def test_health_check_includes_database_status_by_default(self, db):
        from portfolio.views import HealthCheckView

        request = APIRequestFactory().get('/api/health/')
        response = HealthCheckView().get(request)

        assert response.status_code == status.HTTP_200_OK
        assert response.data['status'] == 'healthy'
        assert response.data['database'] == 'connected'
