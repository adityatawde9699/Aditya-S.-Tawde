import logging
import smtplib
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import ContactSerializer

logger = logging.getLogger(__name__)

class ContactView(APIView):
    def post(self, request):
        logger.info("Received contact form submission")
        
        serializer = ContactSerializer(data=request.data)
        if not serializer.is_valid():
            logger.warning(f"Invalid form data: {serializer.errors}")
            return Response(
                {'error': 'Invalid form data', 'details': serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Initialize data as None to ensure the variable always exists.
        data = None
        try:
            # Assign the validated data.
            data = serializer.validated_data
            
            if not all([settings.EMAIL_HOST_USER, settings.RECIPIENT_EMAIL]):
                logger.error("Email settings not properly configured")
                return Response(
                    {'error': 'Server configuration error'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            email_body = f"""
New contact form submission:
---------------------------

Name: {data['name']}
Email: {data['email']}

Message:{data['message']}

---------------------------
Sent from: {request.META.get('HTTP_ORIGIN', 'Unknown origin')}
"""
            
            send_mail(
                subject=f'New Contact Form Submission - {data["name"]}',
                message=email_body.strip(),
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[settings.RECIPIENT_EMAIL],
                fail_silently=False,
            )
            
            logger.info(f"Successfully sent contact form email from {data['email']}")
            return Response(
                {'message': 'Thank you for your message! We will get back to you soon.'}, 
                status=status.HTTP_200_OK
            )
        
        except smtplib.SMTPException as e:
            # Check if data was assigned before trying to use it in the log.
            user_email = data.get('email', 'unknown') if data else 'unknown'
            logger.error(f"SMTP error while sending email from {user_email}: {str(e)}", exc_info=True)
            return Response(
                {'error': 'Failed to send email. Please try again later.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        except Exception as e:
            # Check if data was assigned before trying to use it in the log.
            user_email = data.get('email', 'unknown') if data else 'unknown'
            logger.error(f"Unexpected error in contact form from {user_email}: {str(e)}", exc_info=True)
            return Response(
                {'error': 'An unexpected error occurred. Please try again later.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )