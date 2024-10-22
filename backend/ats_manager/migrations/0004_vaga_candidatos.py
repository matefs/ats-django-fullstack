# Generated by Django 4.2.16 on 2024-10-21 00:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ats_manager', '0003_remove_empresa_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='vaga',
            name='candidatos',
            field=models.ManyToManyField(blank=True, related_name='vagas', to='ats_manager.candidato'),
        ),
    ]
