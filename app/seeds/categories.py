from app.models import Category, db


def seed_categories():

    categories = [
        Category(user_id=1, name="Professional"),
        Category(user_id=1, name="Personal"),
        Category(user_id=2, name="VIP"),
    ]

    db.session.bulk_save_objects(categories)
    db.session.commit()


def undo_categories():

    db.session.execute(
        "TRUNCATE TABLE categories RESTART IDENTITY CASCADE;"
    )  # Postgres
    db.session.commit()
