from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('better_than_github', '0009_labelchange'),
    ]

    operations = [
        migrations.AddField(
            model_name='milestonechange',
            name='description',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AddField(
            model_name='milestonechange',
            name='milestone_title',
            field=models.CharField(default='', max_length=50),
        ),
    ]
