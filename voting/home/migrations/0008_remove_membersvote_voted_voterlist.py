# Generated by Django 5.1.4 on 2024-12-15 08:07

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0007_membersvote_delete_vote'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='membersvote',
            name='voted',
        ),
        migrations.CreateModel(
            name='VoterList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('voted', models.BooleanField(default=False)),
                ('Organization', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='voter_list', to='home.organization')),
            ],
        ),
    ]
