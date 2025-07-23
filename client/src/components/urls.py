# In your contact/urls.py file

from django.urls import path
from server.contact.views import ContactView

urlpatterns = [
    # This URL matches the one in your React component's fetch request
    path('send/', ContactView.as_view(), name='contact-send'),
]
