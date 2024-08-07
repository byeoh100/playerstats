from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['team', 'upvotes', 'downvotes', 'date_created', 'comments']