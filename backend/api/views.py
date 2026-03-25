from rest_framework import viewsets, authentication, permissions
from api.models import Ticket, CustomUser
from api.serializers import BoardSerializer, TicketSerializer, TicketEditSerializer, UserSerializer
from allauth.headless.contrib.rest_framework.authentication import XSessionTokenAuthentication
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.views import APIView
from django.http.response import JsonResponse
from allauth.account.internal.flows.logout import logout
from rest_framework.generics import DestroyAPIView


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


class TicketStatusList(APIView):
    def get(self, request):
        return Response([{'status': status, 'label': label} for status, label in Ticket.Status.choices])


class UserDeleteView(DestroyAPIView):
    serializer_class = UserSerializer
        
    authentication_classes = [
        authentication.SessionAuthentication,
        XSessionTokenAuthentication,
    ]
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user
    
    def perform_destroy(self, instance):
        instance.delete()
        logout(self.request)

