from app.models import Share, db, environment, SCHEMA
from sqlalchemy.sql import text


def seed_shares():
    share1 = Share(
        card_id=1, shared_with_email="collaborator@example.com")
    share2 = Share(
        card_id=2, shared_with_email="partner@example.com")

    db.session.add_all([share1, share2])
    db.session.commit()


def undo_shares():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.shares RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shares"))
    db.session.commit()