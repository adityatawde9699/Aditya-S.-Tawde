from django.urls import path
from .views import (
    TechStackListView,
    ProjectListView, 
    SkillListView, 
    EducationListView,
    CertificationListView, 
    ContactView
)

urlpatterns = [
    path('portfolio/tech-stack/', TechStackListView.as_view(), name='techstack-list'),
    path('portfolio/projects/', ProjectListView.as_view(), name='project-list'),
    path('portfolio/skills/', SkillListView.as_view(), name='skill-list'),
    path('portfolio/education/', EducationListView.as_view(), name='education-list'),
    path('portfolio/certifications/', CertificationListView.as_view(), name='certification-list'),
    path('contact/', ContactView.as_view(), name='contact'),
]
