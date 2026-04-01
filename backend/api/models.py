from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
import uuid
from allauth.account.models import EmailAddress

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

    def create_demo_user(self): 
        userid = uuid.uuid4()    
        user = self.create_user(f"{userid}@demo.com", is_demo=True)
        EmailAddress.objects.create(user=user, email=user.email, verified=True, primary=True)
        return user


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    is_demo = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()


class Board(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.deletion.CASCADE, related_name='boards')
    title = models.CharField(max_length=100)


class Ticket(models.Model):
    class Status(models.TextChoices):
        NEW = "NEW", _('New')
        ACTIVE = "ACTIVE", _('Active')
        DONE = "DONE", _('Done')
    
    board = models.ForeignKey(Board, on_delete=models.deletion.CASCADE, related_name='tickets')
    
    created_at = models.DateTimeField(auto_now_add=True)
    due_at = models.DateTimeField(null=True)
    done_at = models.DateTimeField(null=True)
    
    status = models.CharField(choices=Status, default=Status.NEW, max_length=10)
    statusChangedAt = models.DateTimeField(auto_now_add=True)
    
    title = models.CharField(max_length=175)
    description = models.TextField(null=True, blank=True)

    class Meta:
        ordering = ['statusChangedAt']

    @classmethod
    def from_db(cls, db, field_names, values):
        instance = super().from_db(db, field_names, values)
        _loaded_values = dict(zip(field_names, values))
        instance._loaded_status = _loaded_values.get('status')
        return instance

    def save(self, **kwargs):
        if not self.pk: 
            super().save(**kwargs)
            return

        if self.status != self._loaded_status:
            self.statusChangedAt = timezone.now()
        super().save(**kwargs)
