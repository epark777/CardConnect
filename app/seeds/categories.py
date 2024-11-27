from app.models import Category, db, environment, SCHEMA
from sqlalchemy.sql import text


def seed_categories():

    categories = [
        Category(user_id=1, name="Professional"),
        Category(user_id=1, name="Personal"),
        Category(user_id=2, name="VIP"),
    ]

    db.session.bulk_save_objects(categories)
    db.session.commit()


def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))
    db.session.commit()