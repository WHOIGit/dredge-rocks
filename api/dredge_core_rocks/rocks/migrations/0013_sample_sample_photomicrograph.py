# Generated by Django 4.2.9 on 2024-02-13 16:02

from django.db import migrations
import sorl.thumbnail.fields


class Migration(migrations.Migration):
    dependencies = [
        ("rocks", "0012_alter_dredge_dredge_number_alter_leg_leg_number"),
    ]

    operations = [
        migrations.AddField(
            model_name="sample",
            name="sample_photomicrograph",
            field=sorl.thumbnail.fields.ImageField(null=True, upload_to="sample_photomicrographs"),
        ),
    ]