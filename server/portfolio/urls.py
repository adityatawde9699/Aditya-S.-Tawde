from django.urls import path
from .views import ProjectListView, SkillListView, CertificationListView, ContactView

urlpatterns = [
    path('portfolio/projects/', ProjectListView.as_view(), name='project-list'),
    path('portfolio/skills/', SkillListView.as_view(), name='skill-list'),
    path('portfolio/certifications/', CertificationListView.as_view(), name='certification-list'),
    path('contact/', ContactView.as_view(), name='contact'),
]
