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
        request = self.context.get("request", None)
        try:
            img = get_thumbnail(obj.file, "100x75", crop="center", quality=99)
            return request.build_absolute_uri(img.url)
        except Exception as e:
            print(e)
            return None


class SampleSerializer(serializers.ModelSerializer):
    ship = serializers.SerializerMethodField()
    cruise = serializers.SerializerMethodField()
    cruise_id = serializers.SerializerMethodField()
    dredge = serializers.SerializerMethodField()
    leg = serializers.SerializerMethodField()
    sample_photo = SamplePhotoSerializer()
    sample_photomicrograph = serializers.SerializerMethodField()

    class Meta:
        model = Sample
        fields = [
            "id",
            "ship",
            "cruise",
            "cruise_id",
            "leg",
            "dredge",
            "sample_number",
            "sub_sample",
            "dredge",
            "primary_lithology",
            "av_grain_size",
            "texture",
            "weight",
            "glass",
            "palag",
            "comments",
            "sampled_by",
            "sample_photo",
            "sample_photomicrograph",
        ]

    def get_ship(self, obj):
        return obj.dredge.leg.cruise.ship

    def get_cruise(self, obj):
        return obj.dredge.leg.cruise.cruise_number

    def get_cruise_id(self, obj):
        return obj.dredge.leg.cruise.id

    def get_leg(self, obj):
        return obj.dredge.leg.leg_number

    def get_dredge(self, obj):
        return obj.dredge.dredge_number

    def get_sample_photomicrograph(self, obj):
        request = self.context.get("request", None)
        try:
            thumb = get_thumbnail(obj.sample_photomicrograph.file, "100x75", crop="center", quality=99)
            img_url = request.build_absolute_uri(obj.sample_photomicrograph.url)
            thumb_url = request.build_absolute_uri(thumb.url)
            return {"file": img_url, "thumbnail": thumb_url}
        except Exception as e:
            print(e)
            return None
