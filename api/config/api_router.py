from django.conf import settings
from rest_framework.routers import DefaultRouter, SimpleRouter

from dredge_core_rocks.rocks.api.views import CruiseViewSet, SampleViewSet

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register("cruises", CruiseViewSet)
router.register("samples", SampleViewSet)


app_name = "api"
urlpatterns = router.urls
