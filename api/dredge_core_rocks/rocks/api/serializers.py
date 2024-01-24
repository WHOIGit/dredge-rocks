from rest_framework import serializers
from ..models import *


class CruiseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cruise
        fields = "__all__"


class SampleSerializer(serializers.ModelSerializer):
    ship = serializers.SerializerMethodField()
    cruise = serializers.SerializerMethodField()
    dredge = serializers.SerializerMethodField()
    leg = serializers.SerializerMethodField()

    class Meta:
        model = Sample
        fields = [
            "ship",
            "cruise",
            "leg",
            "dredge",
            "sample_number",
            "sub_sample",
            "dredge",
            "primary_lithology",
            "av_grain_size",
            "texture",
            "contact",
            "glass",
            "pelag",
            "comments",
            "sampled_by",
            "sample_photo",
        ]

    def get_ship(self, obj):
        return obj.dredge.leg.cruise.ship

    def get_cruise(self, obj):
        return obj.dredge.leg.cruise.cruise_number

    def get_leg(self, obj):
        return obj.dredge.leg.leg_number

    def get_dredge(self, obj):
        return obj.dredge.dredge_number
