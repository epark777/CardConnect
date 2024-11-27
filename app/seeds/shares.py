from app.models import Share, db, environment, SCHEMA


def seed_shares():

    shares = [
        Share(card_id=1, shared_with_email="collaborator@example.com"),
        Share(card_id=2, shared_with_email="partner@example.com"),
    ]

    db.session.bulk_save_objects(shares)
    db.session.commit()


def undo_shares():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.shares RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("TRUNCATE TABLE shares RESTART IDENTITY CASCADE;")
    db.session.commit()