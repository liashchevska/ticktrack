from rest_framework import serializers
from api.models import Board, Ticket


class BoardPrimaryKeyRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get("request")
        return Board.objects.filter(owner=request.user)


class TicketSerializer(serializers.ModelSerializer):
    current_status = serializers.CharField(source="get_status_display", read_only=True)
    board = BoardPrimaryKeyRelatedField()

    class Meta:
        model = Ticket
        fields = ["id", "board", "current_status", "status", "details"]
        extra_kwargs = {"status": {"write_only": True}, "board": {"write_only": True}}


class BoardSerializer(serializers.ModelSerializer):
    tickets = TicketSerializer(many=True)

    class Meta:
        model = Board
        fields = ["id", "name", "tickets"]
