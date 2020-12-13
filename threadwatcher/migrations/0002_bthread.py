# Generated by Django 3.1.1 on 2020-09-22 07:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('threadwatcher', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='bThread',
            fields=[
                ('id', models.DecimalField(decimal_places=0, max_digits=10, primary_key=True, serialize=False)),
                ('summary', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
