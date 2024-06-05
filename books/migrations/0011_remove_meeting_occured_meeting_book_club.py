# Generated by Django 4.2.11 on 2024-05-31 08:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("books", "0010_alter_book_options_book_bookclub_book_created_at_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="meeting",
            name="occured",
        ),
        migrations.AddField(
            model_name="meeting",
            name="book_club",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                to="books.bookclub",
            ),
            preserve_default=False,
        ),
    ]