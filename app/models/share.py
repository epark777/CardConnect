from .db import db, environment, SCHEMA, add_prefix_for_prod

class Share(db.Model):
    __tablename__ = 'shares'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('business_cards.id')), nullable=False)
    shared_with_email = db.Column(db.String(255), nullable=False)
    shared_at = db.Column(db.DateTime, server_default=db.func.now())

    # Relationships
    card = db.relationship('BusinessCard', back_populates='shares')

    def to_dict(self):
        return {
            "id": self.id,
            "card_id": self.card_id,
            "shared_with_email": self.shared_with_email,
            "shared_at": self.shared_at
        }
    