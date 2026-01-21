from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    response.data = format_errors(exc.detail)
    return response

# Handle non-field errors
def format_errors(errors):
    formated = []
    for field, error_list in errors.items():
        for error in error_list:
            formated.append({
                'param': field,
                'message': str(error),
                'code': error.code
            })
    return formated
