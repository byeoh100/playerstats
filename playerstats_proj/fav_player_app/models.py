from django.db import models
from .validators import validate_player

from user_app.models import User

# Create your models here.
class Fav_player(models.Model):
    player = models.CharField(null=True, validators=[validate_player])
    user = models.OneToOneField(User, related_name='fav_player', on_delete=models.CASCADE)