from django.urls import path
from .views import My_fav_player

urlpatterns = [
    path("", My_fav_player.as_view(), name='my_fav_player'),
]