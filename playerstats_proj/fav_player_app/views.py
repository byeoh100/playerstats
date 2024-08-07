from django.shortcuts import render
from rest_framework.views import APIView
from .models import Fav_player
from .serializers import FavPlayerSerializer

from user_app.views import TokenReq

from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_200_OK


# Create your views here.
class My_fav_player(TokenReq):
    def get(self, request):
        try:
            user_fav_player = FavPlayerSerializer(request.user.fav_player, partial=True)
            return Response(user_fav_player.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)
    
    def put(self, request):
        data = request.data.copy()
        data['user'] = request.user.id
        user_fav_player =  Fav_player.objects.get(user=request.user)
        new_user_fav_player = FavPlayerSerializer(user_fav_player, data=data, partial=True)
        if new_user_fav_player.is_valid():
            new_user_fav_player.save()
            return Response(f'Favorite player changed to {data.get("player")}')
        else:
            return Response(new_user_fav_player.errors, status=HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        data = request.data.copy()
        user_fav_player =  Fav_player.objects.get(user=request.user)
        user_fav_player.player = None
        user_fav_player.save()
        return Response(f'Favorite player deleted', status=HTTP_204_NO_CONTENT)