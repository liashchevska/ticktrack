from rest_framework import serializers
from api.models import Board, Ticket


class BoardPrimaryKeyRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get("request")
        return Board.objects.filter(owner=request.user)


class TicketEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ["id", "status", "title", "description"]

    def to_representation(self, instance):
        return TicketSerializer(instance).data


class TicketSerializer(serializers.ModelSerializer):
    board = BoardPrimaryKeyRelatedField()
    # status = serializers.SerializerMethodField()

    class Meta:
        model = Ticket
        fields = ["id", "board", "status", "title", "description"]

    # def get_status(self, instance):
    #     return {"value": instance.status, "label": instance.get_status_display()}


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ["id", "title"]