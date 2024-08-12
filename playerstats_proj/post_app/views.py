from django.shortcuts import render
from rest_framework.views import APIView
from .models import Post
from .serializers import PostSerializer, CommentSerializer

from user_app.views import TokenReq

from fantasy_team_app.models import Fantasy_team
from fantasy_team_app.serializers import FantasyTeamSerializer

from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_200_OK

class My_Posts(TokenReq):
    def get(self, request):
        try:
            ser_my_posts = PostSerializer(request.user.posts, many=True, partial=True)
            return Response(ser_my_posts.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)
    
    def post(self, request):
        try:
            my_team = FantasyTeamSerializer(request.user.fantasy_team).data
            data = {
                'user' : request.user.id,
                'team' : my_team
            }
            ser_my_posts = PostSerializer(data=data, partial=True)
            print(ser_my_posts)
            if ser_my_posts.is_valid():
                ser_my_posts.save()
                return Response("Post created", status=HTTP_200_OK)
            else:
                return Response(ser_my_posts.errors, status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=HTTP_400_BAD_REQUEST)
        
class A_Post(TokenReq):
    def get(self, request, post_id):
        post = get_object_or_404(Post, pk=post_id)
        return Response(PostSerializer(post).data, status=HTTP_200_OK)
    
    def delete(self, request, post_id):
        post = get_object_or_404(Post, pk=post_id)
        post.delete()
        return Response("Post deleted", status=HTTP_204_NO_CONTENT)
    
class Comments(TokenReq):
    def post(self, request, post_id):
        try:
            data = request.data.copy()
            data['post'] = post_id
            data['user'] = request.user.id
            ser_comment = CommentSerializer(data=data, partial=True)
            if ser_comment.is_valid():
                ser_comment.save()
                return Response("Comment created", status=HTTP_200_OK)
            else:
                return Response(ser_comment.errors, status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=HTTP_400_BAD_REQUEST)