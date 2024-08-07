from django.db import models
from user_app.models import User

# Create your models here.
class Fantasy_team(models.Model):
    point_guard = models.CharField()
    shooting_guard = models.CharField()
    small_forward = models.CharField()
    power_forward = models.CharField()
    center = models.CharField()
    user = models.OneToOneField(User, related_name='fantasy_team', on_delete=models.CASCADE)
    # post_id = models.ForeignKey()