from rest_framework import serializers
from .models import Fav_team

class FavTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fav_team
        fields = ['team']