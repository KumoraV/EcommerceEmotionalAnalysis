# Generated by Django 5.0.2 on 2024-04-01 19:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_remove_review_comment'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='comment',
            field=models.CharField(default=1, max_length=1000),
            preserve_default=False,
        ),
    ]
