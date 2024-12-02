from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import BusinessCard, db

card_routes = Blueprint('card', __name__, url_prefix='/api/card')

# Create a new business card
@card_routes.route('/', methods=['POST'])
@login_required
def create_card():
    data = request.json

    name = data.get('name')
    if not name:
        return jsonify({'error': 'Name is required'}), 400


    card = BusinessCard(
        user_id=current_user.id,
        name=name,
        title=data.get('title'),
        company=data.get('company'),
        email=data.get('email'),
        phone=data.get('phone'),
        website=data.get('website'),
        social_links=data.get('social_links')
    )
    db.session.add(card)
    db.session.commit()

    return jsonify({'message': 'Business card created successfully', 'card_id': card.id}), 201


# Get all business cards for logged-in user
@card_routes.route('/', methods=['GET'])
@login_required
def get_cards():

    cards = BusinessCard.query.filter_by(user_id=current_user.id).all()
    return jsonify([card.to_dict() for card in cards]), 200


# Get a specific business card by its ID, only if it belongs to the logged-in user.
@card_routes.route('/<int:card_id>', methods=['GET'])
@login_required
def get_card(card_id):

    card = BusinessCard.query.filter_by(id=card_id, user_id=current_user.id).first()
    if not card:
        return jsonify({'error': 'Card not found or unauthorized access'}), 404

    return jsonify(card.to_dict()), 200

# Update a business card if it belongs to the currently logged-in user.
@card_routes.route('/<int:card_id>', methods=['PUT'])
@login_required
def update_card(card_id):
    card = BusinessCard.query.filter_by(id=card_id, user_id=current_user.id).first()
    if not card:
        return jsonify({'error': 'Card not found or unauthorized access'}), 404

    data = request.json

    allowed_fields = {'name', 'title', 'company', 'email', 'phone', 'website', 'social_links'}
    for key, value in data.items():
        if key in allowed_fields:
            setattr(card, key, value)

    if not card.name:
        return jsonify({'error': 'Name is required'}), 400

    db.session.commit()
    return jsonify({'message': 'Business card updated successfully', 'card_id': card.id}), 200



# Delete a business card if it belongs to the currently logged-in user.
@card_routes.route('/<int:card_id>', methods=['DELETE'])
@login_required
def delete_card(card_id):

    card = BusinessCard.query.filter_by(id=card_id, user_id=current_user.id).first()
    if not card:
        return jsonify({'error': 'Card not found or unauthorized access'}), 404

    db.session.delete(card)
    db.session.commit()
    return jsonify({'message': 'Business card deleted successfully', 'card_id': card_id}), 200
