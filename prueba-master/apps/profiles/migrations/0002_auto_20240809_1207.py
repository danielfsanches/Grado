# Generated by Django 2.2.14 on 2024-08-09 17:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='espaciosacademicos',
            name='grade',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
