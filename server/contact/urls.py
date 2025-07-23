
from django.urls import path
from .views import ContactView

urlpatterns = [
    path('send/', ContactView.as_view(), name='contact-send'),
]
