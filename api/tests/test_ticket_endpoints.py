import pytest
from django.urls import reverse
# from api.models import CustomUser, Ticket, Board
from model_bakery import baker
from api.serializers import TicketSerializer
from api.models import Ticket


@pytest.mark.django_db
class TestTicketEndpoints:
    def test_user_gets_only_his_tickets(self, client, userA, userB, ticketsA, ticketsB):
        url = reverse("ticket-list")
        client.force_login(userA)
        response = client.get(url)

        assert Ticket.objects.count() == len(ticketsA) + len(ticketsB)
        assert len(response.data) == len(ticketsA)
        assert TicketSerializer(ticketsA, many=True).data == response.data

    def test_user_can_only_access_details_of_his_tickets(self, client, userA, userB, ticketsA, ticketsB):
        url = reverse("ticket-detail", kwargs={"pk": ticketsA[0].id})
        client.force_login(userA)
        response = client.get(url)
        assert response.status_code == 200

        client.force_login(userB)
        response = client.get(url)
        assert response.status_code == 404

    def test_user_cant_change_tickets_board(self, client, userA, ticketsA):
        url = reverse("ticket-detail", kwargs={"pk": ticketsA[0].id})
        client.force_login(userA)
        response = client.patch(url, kwargs={"board": 2})
        assert response.data["board"] == ticketsA[0].id

    def test_user_can_only_create_ticket_in_his_board(self, client, userA, boardB):
        ticket = baker.prepare("Ticket", board=boardB)
        ticket_data = TicketSerializer(ticket).data
        ticket_data.pop("id")
        url = reverse("ticket-list")
        client.force_login(userA)
        response = client.post(url, ticket_data)
        assert response.status_code == 400
