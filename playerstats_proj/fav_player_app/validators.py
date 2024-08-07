from django.core.exceptions import ValidationError
import re

def validate_player(name):
    error_message = 'Name should be in format "First Last"'
    regex = r'^[A-Z][a-z]+\s[A-Z][a-z]+'
    good_name = re.match(regex, name)
    if good_name:
        return name
    else:
        raise ValidationError(error_message, params={ 'name' : name })