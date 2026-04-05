from allauth.headless.account import views
from django.urls.conf import path, include
from allauth.headless.constants import Client
from allauth.headless.account.views import SignupView, SessionView
from allauth.headless.internal.restkit.response import ErrorResponse, APIResponse
from http import HTTPStatus


class CustomSignupView(SignupView):
    def post(self, request, *args, **kwargs):
        if self.input.account_already_exists:
            return APIResponse(
                request,
                status=HTTPStatus.BAD_REQUEST,
                errors=[
                    {
                        "param": "email",
                        "message": "Account with specified email already exists.",
                        "code": "account_already_exists",
                    }
                ],
            )
        return super().post(request, *args, **kwargs)


class CustomSessionView(SessionView):
    def delete(self, request, *args, **kwargs):
        # Delete demo user and demo data on logout (session deletion)
        if request.user.is_demo:
            request.user.delete()

        return super().delete(request, *args, **kwargs)

url_to_view = {
    "login/": views.LoginView,
    "signup/": CustomSignupView,
    "session/": CustomSessionView,
    "email/verify/": views.VerifyEmailView,
    "email/verify/resend/": views.ResendEmailVerificationCodeView,
    "password/request/": views.RequestPasswordResetView,
    "password/reset/": views.ResetPasswordView,
}


def build_urlpatterns_for_client(client):
    urlpatters = []
    for url, view in url_to_view.items():
        urlpatters.append(path(url, view.as_api_view(client=client)))
    return urlpatters


urlpatterns = [
    path("browser/", include(build_urlpatterns_for_client(Client.BROWSER))),
    path("app/", include(build_urlpatterns_for_client(Client.APP))),
]
