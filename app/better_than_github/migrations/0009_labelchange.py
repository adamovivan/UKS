
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('better_than_github', '0008_responsibilitychange_description'),
    ]

    operations = [
        migrations.CreateModel(
            name='LabelChange',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('issue', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='better_than_github.Issue')),
                ('label', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='label', to='better_than_github.Label')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='better_than_github.User')),
                ('description', models.CharField(default='', max_length=50),),
                ('label_name', models.CharField(default='', max_length=50),),
            ],
            options={
                'abstract': False,
            },
        ),
    ]

