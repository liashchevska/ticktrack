from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone
from _datetime import timedelta

User = get_user_model()

class Command(BaseCommand):
    help = "Delete demo users"
    
    def add_arguments(self, parser):
        parser.add_argument('--dry-run', action='store_true')

    def handle(self, *args, **options):
        threshold = timezone.now() - timedelta(minutes=30)
        demo_users = User.objects.filter(is_demo=True, last_login__lt=threshold)
 
        if options['dry_run']:
            self.stdout.write(f"{demo_users.count()} demo user(s) will be deleted.")
            return 

        deleted_total, deleted_items = demo_users.delete()
        self.stdout.write(self.style.SUCCESS(f"Deleted {deleted_total} item(s)."))
        for item, count in deleted_items.items():
            self.stdout.write(self.style.SUCCESS(f"    - {item}: {count}"))
