from django.urls import path
from .views import EmailChecker

urlpatterns = [
    path('<str:email>/', EmailChecker.as_view(), name="emailchecker"),
]