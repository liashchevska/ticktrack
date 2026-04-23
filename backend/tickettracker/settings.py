from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

def get_list(env_var, default=None):
    value = os.getenv(env_var)
    if not value:
        return default or []
    return [v.strip() for v in value.split(",") if v.strip()]

SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")
if not SECRET_KEY:
    raise ValueError("DJANGO_SECRET_KEY must be set")

DEBUG = os.getenv("DJANGO_DEBUG", "False").lower() == "true"
ALLOWED_HOSTS = get_list("DJANGO_ALLOWED_HOSTS", ["127.0.0.1", "localhost"])

# Application definition
INSTALLED_APPS = [
    "api.apps.ApiConfig",
    "rest_framework",
    "corsheaders",
    "allauth",
    "allauth.account",
    "allauth.headless",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]


MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "allauth.account.middleware.AccountMiddleware",
]


ROOT_URLCONF = "tickettracker.urls"


TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = 'tickettracker.wsgi.application'


# Database
if not os.getenv("POSTGRES_DB"):
    raise ValueError("POSTGRES_DB must be set")

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("POSTGRES_DB"),
        "USER": os.getenv("POSTGRES_USER"),
        "PASSWORD": os.getenv("POSTGRES_PASSWORD"),
        "HOST": os.getenv("DATABASE_HOST", "db"),
        "PORT": os.getenv("DATABASE_PORT", "5432"),
    }
}


# Password validation
AUTH_PASSWORD_VALIDATORS = [
    { "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator", },
    { "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator", },
    { "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator", },
    { "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator", },
]


# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"


# Default primary key field type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# User model
AUTH_USER_MODEL = "api.CustomUser"


# Django Rest Framework
REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": [
        "api.renderers.ApiRenderer",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "TEST_REQUEST_DEFAULT_FORMAT": "json",
    "EXCEPTION_HANDLER": "api.exception.custom_exception_handler",
}


AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
]



SECURE_SSL_REDIRECT = not DEBUG
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

# Cross Site Request Forgery Protection
CSRF_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_SAMESITE = "Lax"
CSRF_TRUSTED_ORIGINS = get_list("DJANGO_CSRF_TRUSTED_ORIGINS")

SESSION_COOKIE_SECURE = not DEBUG
SESSION_COOKIE_SAMESITE = "Lax"
SESSION_COOKIE_HTTPONLY = True

# Cross-Origin Resource Sharing
from corsheaders.defaults import default_headers
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = get_list("CORS_ALLOWED_ORIGINS")
CORS_ALLOW_HEADERS = (
    *default_headers,
    "x-session-token",
    "x-email-verification-key",
    "x-password-reset-key",
)


# Allauth
HEADLESS_ONLY = True
HEADLESS_FRONTEND_URLS = {
    "account_confirm_email": "/account/verify-email/{key}",
    "account_reset_password": "/account/password/reset",
    "account_reset_password_from_key": "/account/password/reset/key/{key}",
    "account_signup": "/account/signup",
    "socialaccount_login_error": "/account/provider/callback",
}
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_SIGNUP_FIELDS = ["email*", "password1*", "password2*"]
ACCOUNT_LOGIN_METHODS = {"email"}
ACCOUNT_EMAIL_VERIFICATION = "mandatory"
ACCOUNT_EMAIL_VERIFICATION_BY_CODE_ENABLED = True
ACCOUNT_EMAIL_VERIFICATION_SUPPORTS_RESEND = True
ACCOUNT_PASSWORD_RESET_BY_CODE_ENABLED = True


# Email
if DEBUG and os.getenv("USE_CONSOLE_EMAIL_BACKEND"):
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
else:
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
    EMAIL_HOST = 'smtp.gmail.com'
    EMAIL_PORT = 587
    EMAIL_USE_TLS = True
    EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER") 
    EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
    DEFAULT_FROM_EMAIL = EMAIL_HOST_USER


# Logging
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "WARNING",
    },
}