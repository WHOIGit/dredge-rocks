# Generated by Django 4.2.9 on 2024-02-12 14:41

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("rocks", "0011_alter_sample_sample_number"),
    ]

    operations = [
        migrations.AlterField(
            model_name="dredge",
            name="dredge_number",
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name="leg",
            name="leg_number",
            field=models.IntegerField(),
        ),
    ]