from rest_framework import viewsets
from api.models import Ticket
from api.serializers import BoardSerializer, TicketSerializer
from rest_framework.decorators import action

class BoardViewSet(viewsets.ModelViewSet):
    serializer_class = BoardSerializer
    
    def get_queryset(self):
        return self.request.user.boards.all()
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class TicketViewSet(viewsets.ModelViewSet):
    serializer_class = TicketSerializer

    def get_queryset(self):
        tickets = Ticket.objects.filter(board__owner=self.request.user)
        board = self.request.query_params.get('board')
        if board is not None:
            return tickets.filter(board_id=board)
        return tickets