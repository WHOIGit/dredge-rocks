from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count
from ..models import *
from .serializers import CruiseSerializer, SampleSerializer


class CruiseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Cruise.objects.all()
    serializer_class = CruiseSerializer


class SampleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Sample.objects.all().prefetch_related("dredge", "dredge__leg", "dredge__leg__cruise")
    serializer_class = SampleSerializer


class LithologyAPIView(APIView):
    def get(self, request):
        samples = Sample.objects.values("primary_lithology").annotate(count=Count("id")).order_by("primary_lithology")
        return Response(samples)


class TextureAPIView(APIView):
    def get(self, request):
        samples = Sample.objects.values("texture").annotate(count=Count("id")).order_by("texture")
        return Response(samples)
