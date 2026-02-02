from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.throttling import AnonRateThrottle
from django.core.mail import send_mail
from django.conf import settings
import logging

from .models import TechStack, Project, Skill, Education, Certification, ContactSubmission
from .serializers import (
    TechStackSerializer,
    ProjectSerializer, 
    SkillSerializer, 
    EducationSerializer,
    CertificationSerializer, 
    ContactSerializer
)

logger = logging.getLogger(__name__)


class ContactRateThrottle(AnonRateThrottle):
    """Custom throttle for contact form submissions.
    
    Limits anonymous users to 5 contact submissions per hour
    to prevent spam and email bombing attacks.
    """
    scope = 'contact'


class TechStackListView(generics.ListAPIView):
    """
    GET /api/portfolio/tech-stack/
    
    Returns a list of all visible tech stack items.
    Only returns items where is_visible=True.
    """
    serializer_class = TechStackSerializer
    
    def get_queryset(self):
        return TechStack.objects.filter(is_visible=True)


class ProjectListView(generics.ListAPIView):
    """
    GET /api/portfolio/projects/
    
    Returns a list of all portfolio projects.
    Ordered by 'order' field. 
    
    Query parameters:
    - ?featured=true - Filter for featured projects only
    - ?category=WEB - Filter by category (WEB, MOBILE, AI_ML, DATA, DESKTOP, OTHER)
    """
    serializer_class = ProjectSerializer
    
    def get_queryset(self):
        queryset = Project.objects.prefetch_related('tech_stack').all()
        
        # Filter by featured
        featured = self.request.query_params.get('featured', None)
        if featured is not None and featured.lower() == 'true':
            queryset = queryset.filter(is_featured=True)
        
        # Filter by category
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category=category.upper())
        
        return queryset


class SkillListView(generics.ListAPIView):
    """
    GET /api/portfolio/skills/
    
    Returns a list of all skills grouped by category on frontend.
    """
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class EducationListView(generics.ListAPIView):
    """
    GET /api/portfolio/education/
    
    Returns a list of all education entries, ordered by start_date descending.
    """
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


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
            # Save to database
            submission = serializer.save()
            logger.info(f"Contact submission saved: {submission.email}")
            
            # Send email notification
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
                logger.info(f"Email notification sent for contact: {submission.email}")
            except Exception as e:
                # Log error but don't fail the request
                logger.exception(f"Email sending failed for contact {submission.email}: {e}")
            
            return Response(
                {"message": "Message sent successfully!"},
                status=status.HTTP_201_CREATED
            )
        
        logger.warning(f"Invalid contact form submission: {serializer.errors}")
        return Response(
            {"error": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )


class HealthCheckView(APIView):
    """
    GET /api/health/
    
    Health check endpoint for container orchestration and load balancers.
    Returns 200 OK if the service is running properly.
    
    Optionally checks database connectivity when ?db=true is passed.
    """
    
    def get(self, request):
        health_status = {
            "status": "healthy",
            "service": "portfolio-api",
        }
        
        # Optional database check
        check_db = request.query_params.get('db', 'false').lower() == 'true'
        if check_db:
            try:
                from django.db import connection
                with connection.cursor() as cursor:
                    cursor.execute("SELECT 1")
                health_status["database"] = "connected"
            except Exception as e:
                health_status["database"] = "error"
                health_status["database_error"] = str(e)
                return Response(health_status, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        
        return Response(health_status, status=status.HTTP_200_OK)


