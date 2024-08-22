from django.urls import path
from .views import Balldontlie

urlpatterns = [
    path('', Balldontlie.as_view(), name="balldontlie"),
]