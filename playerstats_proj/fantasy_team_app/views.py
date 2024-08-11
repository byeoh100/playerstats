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
            user_fantasy_team = FantasyTeamSerializer(request.user.fantasy_team, partial=True)
            return Response(user_fantasy_team.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        data = request.data.copy()
        user_fantasy_team = Fantasy_team.objects.get(user=request.user)
        user_fantasy_team.point_guard = None
        user_fantasy_team.shooting_guard = None
        user_fantasy_team.small_forward = None
        user_fantasy_team.power_forward = None
        user_fantasy_team.center = None
        user_fantasy_team.save()
        return Response(f'Fantasy team deleted', status=HTTP_204_NO_CONTENT)
    
class My_fantasy_team_position(TokenReq):
    def get(self, request, position):
        try:
            user_fantasy_team = Fantasy_team.objects.get(user=request.user)
            data = {
                position : getattr(user_fantasy_team, position)
            }
            ser_user_fantasy_team = FantasyTeamSerializer(data=data, partial=True)
            if ser_user_fantasy_team.is_valid():
                return Response(data, status=HTTP_200_OK)
            else:
                return Response(ser_user_fantasy_team.errors, status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)

    def put(self, request, position):
        try:
            data = request.data.copy()
            user_fantasy_team = Fantasy_team.objects.get(user=request.user)
            ser_user_fantasy_team = FantasyTeamSerializer(user_fantasy_team, data=data, partial=True)
            if ser_user_fantasy_team.is_valid():
                ser_user_fantasy_team.save()
                return Response(ser_user_fantasy_team.data, status=HTTP_200_OK)
            else:
                return Response(ser_user_fantasy_team.errors, status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)
    
    def delete(self, request, position):
        user_fantasy_team =  Fantasy_team.objects.get(user=request.user)
        setattr(user_fantasy_team, position, None)
        user_fantasy_team.save()
        return Response(f'{position} deleted', status=HTTP_204_NO_CONTENT)