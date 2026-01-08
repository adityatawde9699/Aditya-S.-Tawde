from django.db import models


class Project(models.Model):
    """Portfolio project model."""
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    github_link = models.URLField(blank=True, null=True)
    live_link = models.URLField(blank=True, null=True)
    tech_stack = models.JSONField(default=list)  # Stores array of strings
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title


class Skill(models.Model):
    """Skill model with category classification."""
    CATEGORY_CHOICES = [
        ('FRONTEND', 'Frontend'),
        ('BACKEND', 'Backend'),
        ('AI_ML', 'AI/ML'),
        ('TOOLS', 'Tools'),
        ('OTHER', 'Other'),
    ]
    
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='OTHER')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['category', 'order', 'name']

    def __str__(self):
        return f"{self.name} ({self.category})"


class Certification(models.Model):
    """Certification/credential model."""
    LEVEL_CHOICES = [
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
    ]
    
    title = models.CharField(max_length=200)
    issuer = models.CharField(max_length=200)
    logo = models.URLField(blank=True, null=True)
    alt = models.CharField(max_length=100, blank=True)
    date = models.CharField(max_length=100)  # e.g., "Issued June 2025"
    description = models.TextField()
    tech = models.JSONField(default=list)  # Array of tech tags
    link = models.URLField()
    category = models.CharField(max_length=100)  # e.g., "AI", "Data Science"
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='Intermediate')
    duration = models.CharField(max_length=50, blank=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title


class ContactSubmission(models.Model):
    """Contact form submission model."""
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-submitted_at']

    def __str__(self):
        return f"Message from {self.name} ({self.email})"
