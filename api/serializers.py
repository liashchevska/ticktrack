from rest_framework import serializers
from api.models import Board, Ticket


class TicketSerializer(serializers.ModelSerializer):
    status = serializers.CharField(source='get_status_display')

    class Meta:
        model = Ticket
        fields = ['id', 'status', 'details']

        

class BoardSerializer(serializers.ModelSerializer):
    tickets = TicketSerializer(many=True, read_only=True)

    class Meta:
        model = Board
        fields = ['id', 'name', 'tickets', ]
