"""
portfolio.services
==================
Application-level business logic for the portfolio app.

This layer is deliberately decoupled from Django's HTTP request/response
cycle. Functions here are pure Python and can be called from views, management
commands, Celery tasks, or tests without any HTTP context.
"""

import logging

from django.conf import settings
from django.core.mail import send_mail

from .models import ContactSubmission

logger = logging.getLogger(__name__)


class ContactService:
    """
    Handles all business logic around a contact form submission.

    Responsibilities:
    - Persist the validated submission to the database.
    - Dispatch an email notification to the site owner.
    - Log outcomes for observability.

    Keeping this logic outside the view makes it:
    - Testable in isolation (no HTTP client needed).
    - Reusable by management commands or background tasks.
    - Replaceable: swapping the email backend won't touch the view.
    """

    @staticmethod
    def submit(validated_data: dict) -> ContactSubmission:
        """
        Persist a contact submission and attempt email notification.

        Args:
            validated_data: Cleaned data dict from ContactSerializer.

        Returns:
            The persisted ContactSubmission instance.

        Raises:
            No exceptions are raised. Email failures are caught and logged so
            that a transient SMTP error never causes the user-visible request
            to fail.
        """
        submission = ContactSubmission.objects.create(**validated_data)
        logger.info("Contact submission persisted | id=%s name='%s'", submission.id, submission.name)

        ContactService._send_notification(submission)

        return submission

    @staticmethod
    def _send_notification(submission: ContactSubmission) -> None:
        """
        Send an email notification to the site owner.

        Email failures are deliberately swallowed: a broken SMTP config must
        never degrade the user's contact experience. The error is logged at
        ERROR level so it can be caught by any monitoring stack.
        """
        if not settings.EMAIL_CONFIGURED:
            logger.warning(
                "Email notification skipped for submission id=%s — email is not configured.",
                submission.id,
            )
            return

        subject = f"New Portfolio Contact: {submission.name}"
        message = (
            f"You have a new message from your portfolio website.\n\n"
            f"Name:    {submission.name}\n"
            f"Email:   {submission.email}\n\n"
            f"Message:\n{submission.message}\n\n"
            f"---\nSent automatically from your portfolio contact form."
        )

        try:
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[settings.RECIPIENT_EMAIL],
                fail_silently=False,
            )
            logger.info("Email notification dispatched | submission_id=%s", submission.id)
        except Exception:
            logger.exception(
                "Failed to dispatch email notification | submission_id=%s", submission.id
            )
