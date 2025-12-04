import pytest
from django.urls.base import reverse
from api.serializers import BoardSerializer
from api.models import Board

@pytest.mark.django_db
class TestBoardEndpoints:
    def test_user_gets_only_his_boards(self, client, userA, userB, boardA, boardB):
        url = reverse('board-list')
        client.force_login(userA)
        response = client.get(url)
        
        assert Board.objects.count() == 2
        assert response.data == BoardSerializer([boardA], many=True).data


    def test_user_can_only_access_details_of_his_boards(self, client, userA, userB, boardA, boardB):
        url = reverse("board-detail", kwargs={"pk": boardA.id})
        client.force_login(userA)
        response = client.get(url)
        assert response.status_code == 200
        
        client.force_login(userB)
        response = client.get(url)
        assert response.status_code == 404
        
