from rest_framework import serializers
from .models import Fantasy_team

class FantasyTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fantasy_team
        fields = ['point_guard', 'shooting_guard', 'small_forward', 'power_forward', 'center']