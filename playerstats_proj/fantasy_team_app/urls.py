from django.urls import path
from .views import My_fantasy_team, My_fantasy_team_position

urlpatterns = [
    path("", My_fantasy_team.as_view(), name='my_fantasy_team'),
    path("<str:position>/", My_fantasy_team_position.as_view(), name='my_fantasy_team_position')
]