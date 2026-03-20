from rest_framework.views import exception_handler
from rest_framework.exceptions import ValidationError, ErrorDetail


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if (
        isinstance(exc, ValidationError)
        and response is not None
        and isinstance(response.data, dict)
    ):
        response.data = {"errors": format_errors(response.data)}
    return response


def format_errors(errors):
    formated = []
    for field, error_list in errors.items():
        for error in error_list:
            current = {"param": field , "message": str(error)}
            # Add code if not non-field error
            if isinstance(error, ErrorDetail):
                current["code"] = error.code
            formated.append(current) 
    return formated