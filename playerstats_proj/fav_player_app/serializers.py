from rest_framework import serializers
from .models import Fav_player

class FavPlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fav_player
        fields = ['player']