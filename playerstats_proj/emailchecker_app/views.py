from rest_framework.views import APIView
from rest_framework.response import Response
import requests
import requests
from django.conf import settings


class EmailChecker(APIView):
    def get(self, request, email):
        endpoint = f"https://api.usercheck.com/email/{email}"
        headers = {"Authorization": f"Bearer {settings.EMAIL_CHECK_KEY}"}

        response = requests.get(endpoint, headers=headers)
        responseJSON = response.json()
        print(responseJSON)
        return Response(responseJSON)
