from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache
from .models import Project, Skill, Education, Certification, TechStack, Experience

@receiver([post_save, post_delete], sender=Project)
@receiver([post_save, post_delete], sender=Skill)
@receiver([post_save, post_delete], sender=Education)
@receiver([post_save, post_delete], sender=Experience)
@receiver([post_save, post_delete], sender=Certification)
@receiver([post_save, post_delete], sender=TechStack)
def invalidate_portfolio_cache(sender, **kwargs):
    cache.clear()
