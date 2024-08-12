from rest_framework import serializers
from .models import User

from fav_player_app.serializers import FavPlayerSerializer
from fav_team_app.serializers import FavTeamSerializer
from fantasy_team_app.serializers import FantasyTeamSerializer
from post_app.serializers import PostSerializer

class UserInfoSerializer(serializers.ModelSerializer):
    fav_player = FavPlayerSerializer()
    fav_team = FavTeamSerializer()
    fantasy_team = FantasyTeamSerializer()

    class Meta:
        model = User
        fields = ['display_name', 'email', 'fav_player', 'fav_team', 'fantasy_team', 'posts']