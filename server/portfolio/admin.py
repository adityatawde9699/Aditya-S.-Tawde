from django.contrib import admin
from .models import Project, Skill, Certification, ContactSubmission


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    """Admin interface for Project model."""
    list_display = ('title', 'order', 'created_at', 'updated_at')
    list_editable = ('order',)
    search_fields = ('title', 'description')
    list_filter = ('created_at',)
    ordering = ('order', '-created_at')


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    """Admin interface for Skill model."""
    list_display = ('name', 'category', 'order')
    list_filter = ('category',)
    list_editable = ('order', 'category')
    search_fields = ('name',)
    ordering = ('category', 'order', 'name')


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    """Admin interface for Certification model."""
    list_display = ('title', 'issuer', 'category', 'level', 'order')
    list_filter = ('category', 'level')
    list_editable = ('order',)
    search_fields = ('title', 'issuer', 'description')
    ordering = ('order', '-created_at')


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    """Admin interface for ContactSubmission model."""
    list_display = ('name', 'email', 'submitted_at', 'is_read')
    list_filter = ('is_read', 'submitted_at')
    readonly_fields = ('name', 'email', 'message', 'submitted_at')
    search_fields = ('name', 'email', 'message')
    ordering = ('-submitted_at',)
    
    def has_add_permission(self, request):
        """Disable adding contact submissions from admin."""
        return False
