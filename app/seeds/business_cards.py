from app.models import BusinessCard, db, environment, SCHEMA
from sqlalchemy.sql import text


def seed_business_cards():

    cards = [
        BusinessCard(
            user_id=1,
            name="John Doe",
            title="Software Engineer",
            company="TechCorp",
            email="demo@aa.io",
            phone="+123456789",
            website="https://techcorp.com",
        ),
        BusinessCard(
            user_id=2,
            name="Marnie App",
            title="Product Manager",
            company="Innovate Inc",
            email="marnie@aa.io",
            phone="+987654321",
            website="https://innovate.com",
        ),
    ]

    db.session.bulk_save_objects(cards)
    db.session.commit()


def undo_business_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cards"))
    db.session.commit()
