from rest_framework import serializers
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


class ContactSerializer(serializers.ModelSerializer):
    """Serializer for ContactSubmission model with enhanced validation."""
    name = serializers.CharField(max_length=100, min_length=2)
    email = serializers.EmailField()
    message = serializers.CharField(max_length=5000, min_length=10)
    
    class Meta:
        model = ContactSubmission
        fields = ['name', 'email', 'message']
    
    def validate_name(self, value):
        """Validate name doesn't contain suspicious patterns."""
        if '<script' in value.lower() or 'javascript:' in value.lower():
            raise serializers.ValidationError("Invalid characters in name.")
        return value.strip()
    
    def validate_message(self, value):
        """Validate message content."""
        if '<script' in value.lower() or 'javascript:' in value.lower():
            raise serializers.ValidationError("Invalid content in message.")
        return value.strip()

