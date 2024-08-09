from django.shortcuts import render
from rest_framework.views import APIView
from .models import Fantasy_team
from .serializers import FantasyTeamSerializer

from user_app.views import TokenReq

from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_200_OK

# Create your views here.
class My_fantasy_team(TokenReq):
    def get(self, request):
        try:
            user_fav_team = FantasyTeamSerializer(request.user.fantasy_team, partial=True)
            return Response(user_fav_team.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)
    
    # def put(self, request):
    #     data = request.data.copy()
    #     data['user'] = request.user.id
    #     user_fav_team =  Fantasy_team.objects.get(user=request.user)
    #     new_user_fav_team = FantasyTeamSerializer(user_fav_team, data=data, partial=True)
    #     if new_user_fav_team.is_valid():
    #         new_user_fav_team.save()
    #         return Response(f'Favorite team changed to {data.get("team")}')
    #     else:
    #         return Response(new_user_fav_team.errors, status=HTTP_400_BAD_REQUEST)
    
    # def delete(self, request):
    #     data = request.data.copy()
    #     user_fav_team =  Fantasy_team.objects.get(user=request.user)
    #     user_fav_team.team = None
    #     user_fav_team.save()
    #     return Response(f'Favorite team deleted', status=HTTP_204_NO_CONTENT)