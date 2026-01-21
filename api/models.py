from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        if email is None:
            raise ValueError(_('Email is required'))
        return self._create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()


class Board(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.deletion.CASCADE, related_name='boards')
    title = models.CharField(max_length=100)
    details = models.TextField()

    def add_new_ticket(self):
        return


class Ticket(models.Model):
    class Status(models.TextChoices):
        NEW = "NEW", _('New')
        IN_PROGRESS = "INPROGRESS", _('In progress')
        DONE = "DONE", _('Done')
    
    board = models.ForeignKey(Board, on_delete=models.deletion.CASCADE, related_name='tickets')
    
    created_at = models.DateTimeField(auto_now_add=True)
    due_at = models.DateTimeField(null=True)
    done_at = models.DateTimeField(null=True)
    status = models.CharField(choices=Status, default=Status.NEW, max_length=10)
    title = models.CharField(max_length=175)
    description = models.TextField()
