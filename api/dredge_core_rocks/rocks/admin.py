from django.contrib import admin
from .models import *


class SampleAdmin(admin.ModelAdmin):
    list_display = (
        "sample_number",
        "dredge",
        "primary_lithology",
        "av_grain_size",
    )
    list_filter = ("dredge",)


admin.site.register(Cruise)
admin.site.register(Leg)
admin.site.register(Dredge)
admin.site.register(SamplePhoto)
admin.site.register(Sample, SampleAdmin)
