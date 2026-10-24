from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('super_admin', 'Super Admin'),
        ('content_manager', 'Senior Content Manager'),
        ('platform_editor', 'Course & Platform Editor'),
        ('research_editor', 'Research Contributor / Editor'),
    )

    role = models.CharField(max_length=30, choices=ROLE_CHOICES, default='content_manager')
    phone = models.CharField(max_length=20, blank=True, null=True)
    title = models.CharField(max_length=100, blank=True, null=True)

    def is_super_admin(self):
        return self.role == 'super_admin' or self.is_superuser

    def can_manage_users(self):
        return self.is_super_admin()

    def can_edit_cms(self):
        return self.role in ['super_admin', 'content_manager', 'platform_editor', 'research_editor']

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
