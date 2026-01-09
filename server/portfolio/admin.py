from django.contrib import admin
from .models import TechStack, Project, Skill, Education, Certification, ContactSubmission


@admin.register(TechStack)
class TechStackAdmin(admin.ModelAdmin):
    """Admin interface for TechStack model."""
    list_display = ('name', 'icon_class', 'is_visible')
    list_editable = ('is_visible',)
    list_filter = ('is_visible',)
    search_fields = ('name', 'icon_class')
    ordering = ('name',)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    """Admin interface for Project model."""
    list_display = ('title', 'category', 'order', 'is_featured', 'has_image', 'tech_count', 'created_at')
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
    
    @admin.display(boolean=True, description='Has Image')
    def has_image(self, obj):
        """Display whether project has an image."""
        return bool(obj.image or obj.image_url)
    
    @admin.display(description='Tech')
    def tech_count(self, obj):
        """Display number of tech stack items."""
        count = obj.tech_stack.count()
        return f"{count} tech" if count else "-"


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    """Admin interface for Skill model."""
    list_display = ('name', 'category', 'order')
    list_filter = ('category',)
    list_editable = ('order', 'category')
    search_fields = ('name',)
    ordering = ('category', 'order', 'name')


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    """Admin interface for Education model."""
    list_display = ('institution', 'degree', 'start_date', 'end_date', 'order')
    list_editable = ('order',)
    list_filter = ('start_date',)
    search_fields = ('institution', 'degree', 'description')
    ordering = ('-start_date',)


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    """Admin interface for Certification model."""
    list_display = ('name', 'issuer', 'date_issued', 'has_image')
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
    
    @admin.display(boolean=True, description='Has Image')
    def has_image(self, obj):
        """Display whether certification has an image."""
        return bool(obj.image or obj.image_url)


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
