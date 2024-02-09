from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django_filters import rest_framework as filters
from django.db.models import Count
from ..models import *
from .serializers import CruiseSerializer, SampleSerializer


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 1000
    page_size_query_param = "page_size"
    max_page_size = 10000


class CruiseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Cruise.objects.all()
    serializer_class = CruiseSerializer


class SampleFilter(filters.FilterSet):
    id = filters.AllValuesMultipleFilter(label="id")

    class Meta:
        model = Sample
        fields = ["primary_lithology", "texture", "dredge__leg__cruise"]


class SampleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Sample.objects.all().prefetch_related("dredge", "dredge__leg", "dredge__leg__cruise")
    serializer_class = SampleSerializer
    pagination_class = LargeResultsSetPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = SampleFilter


class LithologyAPIView(APIView):
    def get(self, request):
        samples = Sample.objects.values("primary_lithology").annotate(count=Count("id")).order_by("primary_lithology")
        return Response(samples)


class TextureAPIView(APIView):
    def get(self, request):
        samples = Sample.objects.values("texture").annotate(count=Count("id")).order_by("texture")
        return Response(samples)
