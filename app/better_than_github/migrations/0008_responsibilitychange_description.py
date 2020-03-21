from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('better_than_github', '0007_commentchange_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='responsibilitychange',
            name='description',
            field=models.CharField(default='', max_length=200),
        ),
    ]
