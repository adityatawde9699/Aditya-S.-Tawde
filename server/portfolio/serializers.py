from rest_framework import serializers
from .models import Project, Skill, Certification, ContactSubmission


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer for Project model."""
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'image', 'github_link', 'live_link', 'tech_stack']
    
    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class SkillSerializer(serializers.ModelSerializer):
    """Serializer for Skill model."""
    
    class Meta:
        model = Skill
        fields = ['id', 'name', 'category']


class CertificationSerializer(serializers.ModelSerializer):
    """Serializer for Certification model."""
    
    class Meta:
        model = Certification
        fields = [
            'id', 'logo', 'alt', 'title', 'issuer', 'date', 
            'description', 'tech', 'link', 'category', 'level', 'duration'
        ]


class ContactSerializer(serializers.ModelSerializer):
    """Serializer for ContactSubmission model."""
    
    class Meta:
        model = ContactSubmission
        fields = ['name', 'email', 'message']
