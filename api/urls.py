from django.urls.conf import path, include
from api import views
from rest_framework import routers
from api.views import BoardViewSet, TicketViewSet

router = routers.SimpleRouter()
router.register(r"boards", BoardViewSet, basename="board")
router.register(r"tickets", TicketViewSet, basename="ticket")

urlpatterns = []
urlpatterns += router.urls
