# Generated by Django 5.1 on 2025-01-08 17:17

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0003_notification"),
    ]

    operations = [
        migrations.RenameField(
            model_name="notification",
            old_name="notification",
            new_name="notification_type",
        ),
        migrations.AlterField(
            model_name="notification",
            name="comment",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="core.comment",
            ),
        ),
        migrations.AlterField(
            model_name="notification",
            name="post",
            field=models.ForeignKey(
                null=True, on_delete=django.db.models.deletion.SET_NULL, to="core.post"
            ),
        ),
    ]
