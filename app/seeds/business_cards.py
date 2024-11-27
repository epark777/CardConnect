from app.models import BusinessCard, db


def seed_business_cards():

    cards = [
        BusinessCard(
            user_id=1,
            name="John Doe",
            title="Software Engineer",
            company="TechCorp",
            email="johndoe@techcorp.com",
            phone="+123456789",
            website="https://techcorp.com",
        ),
        BusinessCard(
            user_id=2,
            name="Jane Doe",
            title="Product Manager",
            company="Innovate Inc",
            email="janedoe@innovate.com",
            phone="+987654321",
            website="https://innovate.com",
        ),
    ]

    db.session.bulk_save_objects(cards)
    db.session.commit()


def undo_business_cards():

    db.session.execute(
        "TRUNCATE TABLE business_cards RESTART IDENTITY CASCADE;"
    )  # Postgres
    db.session.commit()
