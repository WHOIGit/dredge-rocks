# Generated by Django 4.2.9 on 2024-02-12 14:36

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("rocks", "0010_rename_pelag_sample_palag"),
    ]

    operations = [
        migrations.AlterField(
            model_name="sample",
            name="sample_number",
            field=models.IntegerField(),
        ),
    ]