from django.db import models

from user_app.models import User

from fav_player_app.validators import validate_player

# Create your models here.
class Fantasy_team(models.Model):
    point_guard = models.CharField(null=True, validators=[validate_player])
    shooting_guard = models.CharField(null=True, validators=[validate_player])
    small_forward = models.CharField(null=True, validators=[validate_player])
    power_forward = models.CharField(null=True, validators=[validate_player])
    center = models.CharField(null=True, validators=[validate_player])
    user = models.OneToOneField(User, related_name='fantasy_team', on_delete=models.CASCADE)