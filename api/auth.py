from allauth.headless.account import views
from django.urls.conf import path, include
from allauth.headless.constants import Client
from allauth.headless.account.views import SignupView

class CustomSignupView(SignupView):
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

url_to_view = {
    'login/': views.LoginView,
    'signup/': views.SignupView,
    'session/': views.SessionView,
    'email/verify/': views.VerifyEmailView,
    'email/verify/resend/': views.ResendEmailVerificationCodeView,
    'password/request/': views.RequestPasswordResetView,
    'password/reset': views.ResetPasswordView
}

def build_urlpatterns_for_client(client):
    urlpatters = []
    for url, view in url_to_view.items():
        urlpatters.append(path(url, view.as_api_view(client=client)))
    return urlpatters

urlpatterns = [
    path('browser/', include(build_urlpatterns_for_client(Client.BROWSER))),
    path('app/', include(build_urlpatterns_for_client(Client.APP))),
]