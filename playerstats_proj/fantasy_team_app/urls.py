from django.urls import path
from .views import My_fantasy_team

urlpatterns = [
    path("", My_fantasy_team.as_view(), name='my_fantasy_team'),
]