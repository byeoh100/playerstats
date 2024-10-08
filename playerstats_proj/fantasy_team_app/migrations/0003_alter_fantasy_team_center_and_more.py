# Generated by Django 4.2.15 on 2024-08-07 17:05

from django.db import migrations, models
import fav_player_app.validators


class Migration(migrations.Migration):

    dependencies = [
        ('fantasy_team_app', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fantasy_team',
            name='center',
            field=models.CharField(null=True, validators=[fav_player_app.validators.validate_player]),
        ),
        migrations.AlterField(
            model_name='fantasy_team',
            name='point_guard',
            field=models.CharField(null=True, validators=[fav_player_app.validators.validate_player]),
        ),
        migrations.AlterField(
            model_name='fantasy_team',
            name='power_forward',
            field=models.CharField(null=True, validators=[fav_player_app.validators.validate_player]),
        ),
        migrations.AlterField(
            model_name='fantasy_team',
            name='shooting_guard',
            field=models.CharField(null=True, validators=[fav_player_app.validators.validate_player]),
        ),
        migrations.AlterField(
            model_name='fantasy_team',
            name='small_forward',
            field=models.CharField(null=True, validators=[fav_player_app.validators.validate_player]),
        ),
    ]
