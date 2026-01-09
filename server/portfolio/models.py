from django.db import models


class TechStack(models.Model):
    """Tech stack model for skills/technologies used in projects."""
    name = models.CharField(max_length=100)
    icon_class = models.CharField(
        max_length=100, 
        blank=True,
        help_text="FontAwesome or similar icon class, e.g., 'fab fa-react'"
    )
    is_visible = models.BooleanField(default=True)

    class Meta:
        ordering = ['name']
        verbose_name = 'Tech Stack'
        verbose_name_plural = 'Tech Stacks'

    def __str__(self):
        return self.name


class Project(models.Model):
    """Portfolio project model."""
    CATEGORY_CHOICES = [
        ('WEB', 'Web Development'),
        ('MOBILE', 'Mobile App'),
        ('AI_ML', 'AI/ML'),
        ('DATA', 'Data Science'),
        ('DESKTOP', 'Desktop App'),
        ('OTHER', 'Other'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(
        max_length=20, 
        choices=CATEGORY_CHOICES, 
        default='WEB',
        help_text="Category for filtering projects"
    )
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    image_url = models.URLField(
        blank=True, 
        null=True,
        help_text="OR provide an external image URL (use this if not uploading)"
    )
    github_link = models.URLField(blank=True, null=True)
    live_link = models.URLField(blank=True, null=True)
    tech_stack = models.ManyToManyField(
        TechStack, 
        related_name='projects',
        blank=True,
        help_text="Select technologies used in this project"
    )
    order = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title
    
    @property
    def image_source(self):
        """Returns the image URL - prioritizes uploaded image over external URL."""
        if self.image:
            return self.image.url
        return self.image_url


class Education(models.Model):
    """Education model for academic qualifications."""
    institution = models.CharField(max_length=200)
    degree = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['-start_date']
        verbose_name = 'Education'
        verbose_name_plural = 'Education'

    def __str__(self):
        return f"{self.degree} - {self.institution}"


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
    name = models.CharField(max_length=200)
    issuer = models.CharField(max_length=200)
    date_issued = models.DateField()
    description = models.TextField(
        blank=True,
        help_text="Description of what you learned or achieved with this certification"
    )
    url = models.URLField(blank=True, null=True, help_text="Link to verify/view the certificate")
    image = models.ImageField(
        upload_to='certifications/', 
        blank=True, 
        null=True,
        help_text="Upload a certificate image (any format: JPG, PNG, GIF, WebP, SVG, etc.)"
    )
    image_url = models.URLField(
        blank=True, 
        null=True,
        help_text="OR provide an external image URL (use this if not uploading)"
    )

    class Meta:
        ordering = ['-date_issued']

    def __str__(self):
        return f"{self.name} - {self.issuer}"
    
    @property
    def image_source(self):
        """Returns the image URL - prioritizes uploaded image over external URL."""
        if self.image:
            return self.image.url
        return self.image_url


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
