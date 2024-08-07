from django.db import models
from .validators import validate_team

from user_app.models import User

# Create your models here.
class Fav_team(models.Model):
    team = models.CharField(null=True, validators=[validate_team])
    user = models.OneToOneField(User, related_name='fav_team', on_delete=models.CASCADE)
