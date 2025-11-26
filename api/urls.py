from django.urls.conf import path, include
from api import views
from rest_framework import routers
from api.views import BoardViewSet

router = routers.SimpleRouter()
router.register(r'boards', BoardViewSet, basename='board')

urlpatterns = [

]
urlpatterns += router.urls