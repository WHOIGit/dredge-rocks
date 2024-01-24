# Generated by Django 4.2.9 on 2024-01-16 17:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Cruise",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("ship", models.CharField(max_length=100)),
                ("cruise_number", models.CharField(blank=True, max_length=100)),
            ],
            options={
                "ordering": ["cruise_number"],
            },
        ),
        migrations.CreateModel(
            name="Leg",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("leg", models.CharField(max_length=100)),
                (
                    "cruise",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="legs", to="rocks.cruise"
                    ),
                ),
            ],
            options={
                "ordering": ["cruise", "leg"],
            },
        ),
    ]