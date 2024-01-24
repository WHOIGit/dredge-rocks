from django.contrib import admin
from .models import *
from sorl.thumbnail.admin import AdminImageMixin


class SampleAdmin(admin.ModelAdmin):
    list_display = (
        "sample_number",
        "dredge",
        "primary_lithology",
        "av_grain_size",
    )
    list_filter = ("dredge",)


class SamplePhotoAdmin(AdminImageMixin, admin.ModelAdmin):
    pass


admin.site.register(Cruise)
admin.site.register(Leg)
admin.site.register(Dredge)
admin.site.register(SamplePhoto, SamplePhotoAdmin)
admin.site.register(Sample, SampleAdmin)
