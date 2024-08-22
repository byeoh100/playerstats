from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    display_name = models.CharField(max_length=36, default='User')
    email = models.EmailField(unique=True)
    profile_picture = models.CharField(blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []