from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('user_app.urls')),
    path('api/v1/players/', include('fav_player_app.urls')),
    path('api/v1/teams/', include('fav_team_app.urls')),
    path('api/v1/fantasy_team/', include('fantasy_team_app.urls')),
    path('api/v1/posts/', include('post_app.urls')),
    path('api/v1/balldontlie/', include('balldontlie_app.urls')),
    path('api/v1/emailchecker/', include('emailchecker_app.urls')),
]