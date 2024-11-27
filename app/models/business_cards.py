from .db import db, environment, SCHEMA, add_prefix_for_prod

class BusinessCard(db.Model):
    __tablename__ = 'business_cards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(255))
    company = db.Column(db.String(255))
    email = db.Column(db.String(255))
    phone = db.Column(db.String(20))
    website = db.Column(db.String(255))
    social_links = db.Column(db.Text)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # Relationships
    user = db.relationship('User', back_populates='business_cards')
    notes = db.relationship('Note', back_populates='card', cascade="all, delete-orphan")
    shares = db.relationship('Share', back_populates='card', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "title": self.title,
            "company": self.company,
            "email": self.email,
            "phone": self.phone,
            "website": self.website,
            "social_links": self.social_links,
            "created_at": self.created_at
        }