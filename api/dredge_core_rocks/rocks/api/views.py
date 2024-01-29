from rest_framework import viewsets, status
from ..models import *
from .serializers import CruiseSerializer, SampleSerializer


class CruiseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Cruise.objects.all()
    serializer_class = CruiseSerializer


class SampleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Sample.objects.all().prefetch_related("dredge", "dredge__leg", "dredge__leg__cruise")
    serializer_class = SampleSerializer
