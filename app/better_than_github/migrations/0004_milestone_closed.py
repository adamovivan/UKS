# Generated by Django 3.0.3 on 2020-03-10 13:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('better_than_github', '0003_auto_20200310_1342'),
    ]

    operations = [
        migrations.AddField(
            model_name='milestone',
            name='closed',
            field=models.BooleanField(default=False),
        ),
    ]
