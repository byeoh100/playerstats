from rest_framework.views import APIView
from rest_framework.response import Response
import requests
import requests
from django.conf import settings


class Balldontlie(APIView):
    def get(self, request):
        endpoint = "https://api.balldontlie.io/v1/teams"
        headers = {"Authorization": f"{settings.BALLDONTLIE_KEY}"}

        response = requests.get(endpoint, headers=headers)
        responseJSON = response.json()
        return Response(responseJSON)
