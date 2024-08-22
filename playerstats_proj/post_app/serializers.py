from rest_framework import serializers
from .models import Post, Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['post', 'user', 'content', 'date_created']

class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True)

    class Meta:
        model = Post
        fields = ['id', 'user', 'team', 'upvotes', 'downvotes', 'date_created', 'comments']
    
class CommentSerializerUser(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['post', 'user', 'content', 'date_created']

    def get_user(self, obj):
        return obj.user.display_name

class PostSerializerUser(serializers.ModelSerializer):
    comments = CommentSerializerUser(many=True)
    user = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'user', 'team', 'upvotes', 'downvotes', 'date_created', 'comments']

    def get_user(self, obj):
        return obj.user.display_name