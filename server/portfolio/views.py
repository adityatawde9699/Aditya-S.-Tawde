import logging

from django.conf import settings
from django.core.mail import send_mail
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import generics, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView

from .models import Certification, Education, Project, Skill, TechStack
from .serializers import (
    CertificationSerializer,
    ContactSerializer,
    EducationSerializer,
    ProjectSerializer,
    SkillSerializer,
    TechStackSerializer,
)

logger = logging.getLogger(__name__)
CACHE_TTL_SECONDS = 60 * 60


class StandardResultsSetPagination(PageNumberPagination):
    """Pagination for portfolio list endpoints."""

    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class ContactRateThrottle(AnonRateThrottle):
    """Custom throttle for contact form submissions.

    Limits anonymous users to 5 contact submissions per hour
    to prevent spam and email bombing attacks.
    """

    scope = 'contact'


@method_decorator(cache_page(CACHE_TTL_SECONDS), name='dispatch')
class TechStackListView(generics.ListAPIView):
    """
    GET /api/portfolio/tech-stack/

    Returns a list of all visible tech stack items.
    Only returns items where is_visible=True.
    """

    serializer_class = TechStackSerializer

    def get_queryset(self):
        return TechStack.objects.filter(is_visible=True)


@method_decorator(cache_page(CACHE_TTL_SECONDS), name='dispatch')
class ProjectListView(generics.ListAPIView):
    """
    GET /api/portfolio/projects/

    Returns a paginated list of portfolio projects.
    Ordered by 'order' field.

    Query parameters:
    - ?featured=true - Filter for featured projects only
    - ?category=WEB - Filter by category (WEB, MOBILE, AI_ML, DATA, DESKTOP, OTHER)
    """

    serializer_class = ProjectSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        queryset = Project.objects.prefetch_related('tech_stack').all()

        featured = self.request.query_params.get('featured', None)
        if featured is not None and featured.lower() == 'true':
            queryset = queryset.filter(is_featured=True)

        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category=category.upper())

        return queryset


@method_decorator(cache_page(CACHE_TTL_SECONDS), name='dispatch')
class SkillListView(generics.ListAPIView):
    """
    GET /api/portfolio/skills/

    Returns a list of all skills grouped by category on frontend.
    """

    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


@method_decorator(cache_page(CACHE_TTL_SECONDS), name='dispatch')
class EducationListView(generics.ListAPIView):
    """
    GET /api/portfolio/education/

    Returns a list of all education entries, ordered by start_date descending.
    """

    queryset = Education.objects.all()
    serializer_class = EducationSerializer


@method_decorator(cache_page(CACHE_TTL_SECONDS), name='dispatch')
class CertificationListView(generics.ListAPIView):
    """
    GET /api/portfolio/certifications/

    Returns a list of all certifications, ordered by date_issued descending.
    """

    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer


class ContactView(APIView):
    """
    POST /api/contact/

    Accepts contact form submissions, saves to database,
    and sends email notification.

    Rate limited to 5 requests per hour per IP address.
    """

    throttle_classes = [ContactRateThrottle]

    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            submission = serializer.save()
            logger.info('Contact submission saved: %s', submission.id)

            try:
                subject = f"New Contact from Portfolio: {submission.name}"
                message = f"""
You have received a new message from your portfolio website:

Name: {submission.name}
Email: {submission.email}

Message:
{submission.message}

---
This email was sent automatically from your portfolio contact form.
                """
                send_mail(
                    subject=subject,
                    message=message,
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[settings.RECIPIENT_EMAIL],
                    fail_silently=False,
                )
                logger.info('Email notification sent for contact submission: %s', submission.id)
            except Exception:
                logger.exception('Email sending failed for contact submission: %s', submission.id)

            return Response(
                {'message': 'Message sent successfully!'},
                status=status.HTTP_201_CREATED,
            )

        logger.warning('Invalid contact form submission: %s', serializer.errors)
        return Response(
            {'error': serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )


class HealthCheckView(APIView):
    """
    GET /api/health/

    Health check endpoint for container orchestration and load balancers.
    Returns 200 OK if the service is running properly and the database is reachable.
    """

    def get(self, request):
        health_status = {
            'status': 'healthy',
            'service': 'portfolio-api',
        }

        try:
            from django.db import connection

            connection.ensure_connection()
            health_status['database'] = 'connected'
        except Exception as exc:
            health_status['database'] = 'error'
            health_status['database_error'] = str(exc)
            return Response(health_status, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        return Response(health_status, status=status.HTTP_200_OK)
