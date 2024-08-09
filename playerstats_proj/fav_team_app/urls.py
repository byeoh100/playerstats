from django.urls import path
from .views import My_fav_team

urlpatterns = [
    path("", My_fav_team.as_view(), name='my_fav_team'),
]