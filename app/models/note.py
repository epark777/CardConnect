from .db import db, environment, SCHEMA, add_prefix_for_prod

class Note(db.Model):
    __tablename__ = 'notes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('business_cards.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # Relationships
    user = db.relationship('User', back_populates='notes')
    card = db.relationship('BusinessCard', back_populates='notes')

    def to_dict(self):
        return {
            "id": self.id,
            "card_id": self.card_id,
            "user_id": self.user_id,
            "content": self.content,
            "created_at": self.created_at
        }
