from rest_framework import serializers
from sorl.thumbnail import get_thumbnail
from ..models import *


class CruiseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cruise
        fields = "__all__"


class SamplePhotoSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = SamplePhoto
        fields = ["file", "thumbnail"]

    def get_thumbnail(self, obj):
        try:
            img = get_thumbnail(obj.file, "100x75", crop="center", quality=99)
            print(img)
            return img.url
        except Exception as e:
            print(e)
            return None


class SampleSerializer(serializers.ModelSerializer):
    ship = serializers.SerializerMethodField()
    cruise = serializers.SerializerMethodField()
    dredge = serializers.SerializerMethodField()
    leg = serializers.SerializerMethodField()

    sample_photo = SamplePhotoSerializer()

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
