from django.db import models
from sorl.thumbnail import ImageField


class Cruise(models.Model):
    ship = models.CharField(max_length=100)
    cruise_number = models.CharField(max_length=100, null=False, blank=True)

    class Meta:
        ordering = ["cruise_number"]

    def __str__(self):
        return f"{self.ship} - {self.cruise_number}"


class Leg(models.Model):
    leg_number = models.IntegerField()
    cruise = models.ForeignKey(
        Cruise,
        related_name="legs",
        on_delete=models.CASCADE,
    )

    class Meta:
        ordering = ["cruise", "leg_number"]

    def __str__(self):
        return f"{self.cruise.cruise_number} - Leg {self.leg_number}"


class Dredge(models.Model):
    dredge_number = models.IntegerField()
    leg = models.ForeignKey(
        Leg,
        related_name="dredges",
        on_delete=models.CASCADE,
    )
    description_file = models.FileField(upload_to="description_files", blank=True, null=True)

    class Meta:
        ordering = ["leg", "dredge_number"]

    def __str__(self):
        return f"{self.leg.cruise.ship} {self.leg.cruise.cruise_number} - Leg {self.leg.leg_number} - Dredge {self.dredge_number}"


class SamplePhoto(models.Model):
    # multiple samples can point to the same Photo
    dredge = models.ForeignKey(
        Dredge,
        related_name="sample_photos",
        on_delete=models.CASCADE,
    )
    file = ImageField(upload_to="sample_photos")

    def __str__(self):
        return f"Dredge {self.dredge.dredge_number} - Photo {self.file.name}"


class Sample(models.Model):
    sample_number = models.IntegerField()
    sub_sample = models.CharField(max_length=100, blank=True)
    dredge = models.ForeignKey(
        Dredge,
        related_name="samples",
        on_delete=models.CASCADE,
    )
    primary_lithology = models.CharField(max_length=100, blank=True)
    av_grain_size = models.CharField(max_length=100, blank=True)
    texture = models.CharField(max_length=100, blank=True)
    contact = models.CharField(max_length=100, blank=True)
    glass = models.CharField(max_length=100, blank=True)
    palag = models.CharField(max_length=100, blank=True)
    comments = models.CharField(max_length=100, blank=True)
    sampled_by = models.CharField(max_length=100, blank=True)
    sample_photo = models.ForeignKey(
        SamplePhoto, related_name="samples", on_delete=models.CASCADE, null=True, default=None
    )
    # only one micrograph per sample
    sample_photomicrograph = ImageField(upload_to="sample_photomicrographs", null=True)

    class Meta:
        ordering = ["dredge", "sample_number"]

    def __str__(self):
        return f"Dredge {self.dredge.dredge_number} - Sample {self.sample_number}"
