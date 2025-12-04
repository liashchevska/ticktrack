import pytest
from api.models import CustomUser, Board, Ticket
from model_bakery import baker


@pytest.fixture
def userA(db):
    return CustomUser.objects.create_user("user_a@email.com", "password")


@pytest.fixture
def userB(db):
    return CustomUser.objects.create_user("user_b@email.com", "password")


@pytest.fixture
def boardA(userA):
    return baker.make(Board, owner=userA)


@pytest.fixture
def boardB(userB):
    return baker.make(Board, owner=userB)


@pytest.fixture
def ticketsA(boardA):
    return baker.make(Ticket, board=boardA, _quantity=2)


@pytest.fixture
def ticketsB(boardB):
    return baker.make(Ticket, board=boardB, _quantity=2)
