from django.db import transaction
from api.models import CustomUser, Board, Ticket


@transaction.atomic
def create_demo_environment():
    user = CustomUser.objects.create_demo_user()
    bugtrack, features, personal = Board.objects.bulk_create([
        Board(owner=user, title="Bug Tracking"),
        Board(owner=user, title="Features"),
        Board(owner=user, title="Personal Tasks")
    ])
    Ticket.objects.bulk_create([
        # Bug Tracking
        Ticket(board=bugtrack, status=Ticket.Status.NEW, title="Fix crash on login"),
        Ticket(board=bugtrack, status=Ticket.Status.ACTIVE, title="Resolve payment issue"),
        Ticket(board=bugtrack, status=Ticket.Status.ACTIVE, title="Investigate memory leak"),
        # Features
        Ticket(board=features, status=Ticket.Status.ACTIVE, title="Add notifications"),
        Ticket(board=features, status=Ticket.Status.NEW, title="Dark mode"),
        Ticket(board=features, status=Ticket.Status.NEW, title="Implement search functionality"),
        # Personal Tasks
        Ticket(board=personal, status=Ticket.Status.NEW, title="Buy domain"),
        Ticket(board=personal, status=Ticket.Status.DONE, title="Make a vet appointment"),
        Ticket(board=personal, status=Ticket.Status.NEW, title="Book a hotel"),
    ])
    return user