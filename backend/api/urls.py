from django.urls.conf import path, include
from api import views
from rest_framework import routers
from api.views import BoardViewSet, TicketViewSet, UserDeleteView

router = routers.SimpleRouter()
router.register(r"boards", BoardViewSet, basename="board")
router.register(r"tickets", TicketViewSet, basename="ticket")

urlpatterns = [
        path('csrf/', views.csrf),
        path('delete-user/', views.UserDeleteView.as_view()),
        path('meta/ticket-status-list/', views.TicketStatusList.as_view())
]
urlpatterns += router.urls
