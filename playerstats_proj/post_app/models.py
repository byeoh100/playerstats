from django.db import models
from user_app.models import User

# Create your models here.
class Post(models.Model):
    team = models.CharField() # this should be a list of player names, jsonified into a string
    upvotes = models.PositiveIntegerField(default=0)
    downvotes = models.PositiveIntegerField(default=0)
    date_created = models.DateTimeField()
    comments = models.CharField() # same as team field
    user = models.ForeignKey(User, related_name='posts', on_delete=models.CASCADE)