from django.urls import path

from .views import (
    AdminLoginView,
    AdminLogoutView,
    AdminStatusView,
    CertificationListView,
    ContactView,
    DetailedHealthView,
    EducationListView,
    ExperienceListView,
    HealthCheckView,
    ProjectListView,
    SkillListView,
    TechStackListView,
)

urlpatterns = [
    path('health/', HealthCheckView.as_view(), name='health-check'),
    path('health/detailed/', DetailedHealthView.as_view(), name='detailed-health'),

    # Admin authentication endpoints
    path('admin/login/', AdminLoginView.as_view(), name='admin-login'),
    path('admin/logout/', AdminLogoutView.as_view(), name='admin-logout'),
    path('admin/status/', AdminStatusView.as_view(), name='admin-status'),

    path('portfolio/tech-stack/', TechStackListView.as_view(), name='techstack-list'),
    path('portfolio/projects/', ProjectListView.as_view(), name='project-list'),
    path('portfolio/skills/', SkillListView.as_view(), name='skill-list'),
    path('portfolio/education/', EducationListView.as_view(), name='education-list'),
    path('portfolio/experience/', ExperienceListView.as_view(), name='experience-list'),
    path(
        'portfolio/certifications/',
        CertificationListView.as_view(),
        name='certification-list',
    ),
    path('contact/', ContactView.as_view(), name='contact'),
]

