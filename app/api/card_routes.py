from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import BusinessCard, db

card_routes = Blueprint('card', __name__)

# Create new Business Card
@card_routes.route('/', methods=['POST'])
@login_required
def create_card():

    data = request.json

    # Create a new business card associated with the logged-in user
    card = BusinessCard(user_id=current_user.id, **data)
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
    for key, value in data.items():
        setattr(card, key, value)
    
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
