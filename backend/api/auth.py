from allauth.headless.account import views
from django.urls.conf import path, include
from allauth.headless.constants import Client
from allauth.headless.account.views import SignupView, SessionView,\
    VerifyEmailView, ResetPasswordView, RequestPasswordResetView
from allauth.headless.internal.restkit.response import ErrorResponse, APIResponse
from http import HTTPStatus
from api.models import Board, Ticket, CustomUser
from django.db import transaction


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


class CustomVerifyEmailView(VerifyEmailView):
    def post(self, request, *args, **kwargs):
        _temp = super().post(request, *args, **kwargs)
        # if user verified email successfully create welcome board and ticket
        if _temp.status_code == 200:
            user = request.user
            with transaction.atomic():
                if not Board.objects.filter(owner=user, title="Getting started").exists():
                    board = Board.objects.create(owner=user, title="Getting started")
                    Ticket.objects.create(board=board,
                                                title="Welcome!",
                                                description="Just a placeholder for your future task.")
        
        return _temp


class CustomSessionView(SessionView):
    def delete(self, request, *args, **kwargs):
        # Delete demo user and demo data on logout (session deletion)
        if request.user.is_demo:
            request.user.delete()

        return super().delete(request, *args, **kwargs)


class CustomRequestPasswordResetView(RequestPasswordResetView):
    def post(self, request, *args, **kwargs):
        email = self.input.cleaned_data.get("email", False)

        # If the email exists, proceed to the default allauth behavior
        if CustomUser.objects.filter(email=email).exists():
            return super().post(request, *args, **kwargs)

        # If the email does not exist, do not send an email to specified email (as allauth does by default)
        # Return the same response as allauth in such use-cases to avoid user enumeration risk
        return APIResponse(
            request,
            status=HTTPStatus.UNAUTHORIZED,
            data={"flows": [{"id": "password_reset_by_code", "is_pending": True}]},
        )


url_to_view = {
    "login/": views.LoginView,
    "signup/": CustomSignupView,
    "session/": CustomSessionView,
    "email/verify/": CustomVerifyEmailView,
    "email/verify/resend/": views.ResendEmailVerificationCodeView,
    "password/request/": CustomRequestPasswordResetView,
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
