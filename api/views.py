from rest_framework import viewsets, authentication, permissions
from api.models import Ticket
from api.serializers import BoardSerializer, TicketSerializer, TicketEditSerializer
from allauth.headless.contrib.rest_framework.authentication import XSessionTokenAuthentication
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http.response import JsonResponse

@ensure_csrf_cookie
def csrf(request):
    return JsonResponse({'detail': 'CSRF cookie set'})

class BoardViewSet(viewsets.ModelViewSet):
    serializer_class = BoardSerializer

    authentication_classes = [
        authentication.SessionAuthentication,
        XSessionTokenAuthentication,
    ]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.boards.all()
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TicketViewSet(viewsets.ModelViewSet):
    authentication_classes = [
        authentication.SessionAuthentication,
        XSessionTokenAuthentication,
    ]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        tickets = Ticket.objects.filter(board__owner=self.request.user)
        board = self.request.query_params.get('board_id')
        if board is not None:
            return tickets.filter(board_id=board)
        return tickets

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return TicketEditSerializer
        return TicketSerializer

