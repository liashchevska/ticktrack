from rest_framework import serializers
from api.models import Board, Ticket


class BoardPrimaryKeyRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get("request")
        return Board.objects.filter(owner=request.user)


class TicketEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['id', 'status', 'details']

    def to_representation(self, instance):
        return TicketSerializer(instance).data


class TicketSerializer(serializers.ModelSerializer):
    board = BoardPrimaryKeyRelatedField()
    status = serializers.CharField(source="get_status_display", read_only=True)
    class Meta:
        model = Ticket
        fields = ['id', 'board', 'status', 'details']
        


class BoardSerializer(serializers.ModelSerializer):
    tickets = TicketSerializer(many=True)

    class Meta:
        model = Board
        fields = ["id", "name", "tickets"]
