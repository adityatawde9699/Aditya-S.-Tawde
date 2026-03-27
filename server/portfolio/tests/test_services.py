"""
Unit tests for portfolio.services

These tests verify the ContactService in complete isolation from the HTTP layer.
No APIClient or request factory is needed — proving the service can be
called from any context (management commands, tasks, etc.).
"""

from unittest.mock import patch

import pytest

from portfolio.models import ContactSubmission
from portfolio.services import ContactService


# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------

@pytest.fixture
def valid_contact_data() -> dict:
    return {
        "name": "Ada Lovelace",
        "email": "ada@example.com",
        "message": "This is a well-formed test message of sufficient length.",
    }


# ---------------------------------------------------------------------------
# ContactService.submit
# ---------------------------------------------------------------------------

class TestContactServiceSubmit:

    def test_persists_submission_to_database(self, db, valid_contact_data):
        """submit() must always create a ContactSubmission record."""
        assert ContactSubmission.objects.count() == 0
        submission = ContactService.submit(valid_contact_data)
        assert ContactSubmission.objects.count() == 1
        assert submission.name == "Ada Lovelace"
        assert submission.email == "ada@example.com"

    @patch("portfolio.services.send_mail")
    def test_sends_email_when_configured(
        self, mock_send_mail, db, valid_contact_data, settings
    ):
        """When email is fully configured, send_mail must be called exactly once."""
        settings.EMAIL_CONFIGURED = True
        settings.EMAIL_HOST_USER = "from@example.com"
        settings.RECIPIENT_EMAIL = "owner@example.com"

        ContactService.submit(valid_contact_data)

        mock_send_mail.assert_called_once()
        call_kwargs = mock_send_mail.call_args[1]
        assert "Ada Lovelace" in call_kwargs["subject"]
        assert call_kwargs["recipient_list"] == ["owner@example.com"]

    @patch("portfolio.services.send_mail")
    def test_does_not_send_email_when_not_configured(
        self, mock_send_mail, db, valid_contact_data, settings
    ):
        """When email is NOT configured, send_mail must NOT be called."""
        settings.EMAIL_CONFIGURED = False

        ContactService.submit(valid_contact_data)

        mock_send_mail.assert_not_called()

    @patch("portfolio.services.send_mail")
    def test_submission_persisted_even_when_email_fails(
        self, mock_send_mail, db, valid_contact_data, settings
    ):
        """A transient email failure must not roll back the persisted submission."""
        settings.EMAIL_CONFIGURED = True
        settings.EMAIL_HOST_USER = "from@example.com"
        settings.RECIPIENT_EMAIL = "owner@example.com"
        mock_send_mail.side_effect = Exception("SMTP connection refused")

        # Must NOT raise
        submission = ContactService.submit(valid_contact_data)

        # The submission must still exist in the DB
        assert ContactSubmission.objects.filter(id=submission.id).exists()

    @patch("portfolio.services.send_mail")
    def test_returns_persisted_submission_instance(
        self, mock_send_mail, db, valid_contact_data, settings
    ):
        """submit() must return the freshly-created ContactSubmission object."""
        settings.EMAIL_CONFIGURED = False

        result = ContactService.submit(valid_contact_data)

        assert isinstance(result, ContactSubmission)
        assert result.pk is not None
