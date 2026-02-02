from rest_framework import serializers
import bleach

from .models import TechStack, Project, Skill, Education, Certification, ContactSubmission


class TechStackSerializer(serializers.ModelSerializer):
    """Serializer for TechStack model."""
    
    class Meta:
        model = TechStack
        fields = ['id', 'name', 'icon_class']


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer for Project model with nested tech_stack."""
    tech_stack = TechStackSerializer(many=True, read_only=True)
    image = serializers.SerializerMethodField()
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'category', 'category_display',
            'image', 'github_link', 'live_link', 'tech_stack', 
            'order', 'is_featured'
        ]
    
    def get_image(self, obj):
        """Return either the uploaded image URL or the external image URL."""
        request = self.context.get('request')
        
        # If uploaded image exists, return its absolute URL
        if obj.image:
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        
        # Otherwise return external URL (already absolute)
        return obj.image_url


class SkillSerializer(serializers.ModelSerializer):
    """Serializer for Skill model."""
    
    class Meta:
        model = Skill
        fields = ['id', 'name', 'category']


class EducationSerializer(serializers.ModelSerializer):
    """Serializer for Education model."""
    
    class Meta:
        model = Education
        fields = ['id', 'institution', 'degree', 'start_date', 'end_date', 'description', 'order']


class CertificationSerializer(serializers.ModelSerializer):
    """Serializer for Certification model."""
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Certification
        fields = ['id', 'name', 'issuer', 'date_issued', 'description', 'url', 'image']
    
    def get_image(self, obj):
        """Return either the uploaded image URL or the external image URL."""
        request = self.context.get('request')
        
        # If uploaded image exists, return its absolute URL
        if obj.image:
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        
        # Otherwise return external URL (already absolute)
        return obj.image_url


def sanitize_text(value: str) -> str:
    """Sanitize text by stripping all HTML tags.
    
    Uses bleach to remove potentially dangerous HTML content including:
    - Script tags and event handlers
    - SVG/img with onerror/onload
    - Data URIs and javascript: URLs
    - All other HTML tags
    """
    return bleach.clean(value, tags=[], strip=True).strip()


class ContactSerializer(serializers.ModelSerializer):
    """Serializer for ContactSubmission model with enhanced validation.
    
    Implements comprehensive XSS protection using bleach sanitization.
    All text inputs are stripped of HTML tags before saving.
    """
    name = serializers.CharField(max_length=100, min_length=2)
    email = serializers.EmailField()
    message = serializers.CharField(max_length=5000, min_length=10)
    
    class Meta:
        model = ContactSubmission
        fields = ['name', 'email', 'message']
    
    def validate_name(self, value):
        """Sanitize name and reject if HTML was detected."""
        cleaned = sanitize_text(value)
        # If cleaning changed the content, it contained HTML
        if cleaned != value.strip():
            raise serializers.ValidationError(
                "Name contains invalid characters. HTML is not allowed."
            )
        return cleaned
    
    def validate_message(self, value):
        """Sanitize message and reject if dangerous HTML was detected."""
        cleaned = sanitize_text(value)
        # If cleaning changed the content significantly, it contained HTML
        if cleaned != value.strip():
            raise serializers.ValidationError(
                "Message contains invalid content. HTML is not allowed."
            )
        return cleaned

