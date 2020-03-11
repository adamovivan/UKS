# Generated by Django 3.0.3 on 2020-03-10 13:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('better_than_github', '0002_milestone_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='milestone',
            name='closed_issues',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='milestone',
            name='open_issues',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
