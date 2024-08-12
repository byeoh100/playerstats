from django.db import models
from user_app.models import User

# Create your models here.
class Post(models.Model):
    team = models.JSONField() # this should be a list of player names, jsonified into a string
    upvotes = models.PositiveIntegerField(default=0)
    downvotes = models.PositiveIntegerField(default=0)
    date_created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, related_name='posts', on_delete=models.CASCADE)

class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE)
    content = models.CharField(max_length=100)
    date_created = models.DateTimeField(auto_now_add=True)