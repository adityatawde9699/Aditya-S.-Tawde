from django.contrib import admin
from django.utils.html import format_html
from unfold.admin import ModelAdmin
from .models import TechStack, Project, Skill, Education, Certification, ContactSubmission


@admin.register(TechStack)
class TechStackAdmin(ModelAdmin):
    """Admin interface for TechStack model."""
    list_display = ('name', 'icon_class', 'is_visible')
    list_editable = ('is_visible',)
    list_filter = ('is_visible',)
    search_fields = ('name', 'icon_class')
    ordering = ('name',)


@admin.register(Project)
class ProjectAdmin(ModelAdmin):
    """Admin interface for Project model."""
    list_display = ('title', 'category', 'order', 'is_featured', 'image_preview', 'tech_count', 'created_at')
    list_editable = ('order', 'is_featured', 'category')
    list_filter = ('category', 'is_featured', 'created_at')
    search_fields = ('title', 'description')
    ordering = ('order',)
    filter_horizontal = ('tech_stack',)
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'category')
        }),
        ('Image (choose one option)', {
            'fields': ('image', 'image_url'),
            'description': 'Either upload an image file OR provide an external URL. Uploaded images take priority.'
        }),
        ('Links', {
            'fields': ('github_link', 'live_link')
        }),
        ('Tech Stack', {
            'fields': ('tech_stack',),
            'description': 'Select all technologies used in this project.'
        }),
        ('Display Settings', {
            'fields': ('order', 'is_featured')
        }),
    )
    
    @admin.display(description='Preview')
    def image_preview(self, obj):
        """Display image thumbnail."""
        image_url = obj.image.url if obj.image else obj.image_url
        if image_url:
            return format_html(
                '<img src="{}" style="width: 60px; height: 40px; object-fit: cover; border-radius: 4px;" />',
                image_url
            )
        return "-"
    
    @admin.display(description='Tech')
    def tech_count(self, obj):
        """Display number of tech stack items."""
        count = obj.tech_stack.count()
        return f"{count} tech" if count else "-"


@admin.register(Skill)
class SkillAdmin(ModelAdmin):
    """Admin interface for Skill model."""
    list_display = ('name', 'category', 'order')
    list_filter = ('category',)
    list_editable = ('order', 'category')
    search_fields = ('name',)
    ordering = ('category', 'order', 'name')


@admin.register(Education)
class EducationAdmin(ModelAdmin):
    """Admin interface for Education model."""
    list_display = ('institution', 'degree', 'start_date', 'end_date', 'order')
    list_editable = ('order',)
    list_filter = ('start_date',)
    search_fields = ('institution', 'degree', 'description')
    ordering = ('-start_date',)


@admin.register(Certification)
class CertificationAdmin(ModelAdmin):
    """Admin interface for Certification model."""
    list_display = ('name', 'issuer', 'date_issued', 'image_preview')
    list_filter = ('issuer', 'date_issued')
    search_fields = ('name', 'issuer', 'description')
    ordering = ('-date_issued',)
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'issuer', 'date_issued', 'url')
        }),
        ('Description', {
            'fields': ('description',),
            'description': 'Describe what you learned or achieved with this certification.'
        }),
        ('Image (choose one option)', {
            'fields': ('image', 'image_url'),
            'description': 'Either upload an image file OR provide an external URL. Uploaded images take priority.'
        }),
    )
    
    @admin.display(description='Preview')
    def image_preview(self, obj):
        """Display image thumbnail."""
        image_url = obj.image.url if obj.image else obj.image_url
        if image_url:
            return format_html(
                '<img src="{}" style="width: 60px; height: 40px; object-fit: cover; border-radius: 4px;" />',
                image_url
            )
        return "-"


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(ModelAdmin):
    """Admin interface for ContactSubmission model."""
    list_display = ('name', 'email', 'submitted_at', 'is_read', 'message_preview')
    list_filter = ('is_read', 'submitted_at')
    readonly_fields = ('name', 'email', 'message', 'submitted_at')
    search_fields = ('name', 'email', 'message')
    ordering = ('-submitted_at',)
    list_editable = ('is_read',)
    
    @admin.display(description='Message')
    def message_preview(self, obj):
        """Display truncated message preview."""
        if len(obj.message) > 50:
            return f"{obj.message[:50]}..."
        return obj.message
    
    def has_add_permission(self, request):
        """Disable adding contact submissions from admin."""
        return False

