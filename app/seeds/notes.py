from app.models import Note, db, environment, SCHEMA
from sqlalchemy.sql import text


def seed_notes():

    notes = [
        Note(
            card_id=1,
            user_id=1,
            content="Met John at the tech conference. Follow up next week.",
        ),
        Note(
            card_id=2,
            user_id=2,
            content="Discussed potential collaboration. Schedule a call.",
        ),
    ]

    db.session.bulk_save_objects(notes)
    db.session.commit()


def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))
    db.session.commit()
