from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Share, BusinessCard, db

share_routes = Blueprint('shares', __name__)

# Share business card by email
@share_routes.route('/<int:card_id>', methods=['POST'])
@login_required
def share_card(card_id):

    card = BusinessCard.query.filter_by(id=card_id, user_id=current_user.id).first()
    if not card:
        return {'error': 'Card not found or unauthorized access'}, 404

    data = request.json
    shared_with_email = data.get('email')

    if not shared_with_email:
        return {'error': 'Email is required to share a card'}, 400

    # Check if the card is already shared with the same email
    existing_share = Share.query.filter_by(card_id=card_id, shared_with_email=shared_with_email).first()
    if existing_share:
        return {'error': f'Card is already shared with {shared_with_email}'}, 400

    # Create a new share record
    share = Share(card_id=card_id, shared_with_email=shared_with_email)
    db.session.add(share)
    db.session.commit()

    return jsonify({'message': f'Card shared successfully with {shared_with_email}', 'share_id': share.id}), 201


# Get details of business card that was shared with logged-in user
@share_routes.route('/<int:card_id>', methods=['GET'])
@login_required
def get_shared_card(card_id):

    share = Share.query.filter_by(card_id=card_id, shared_with_email=current_user.email).first()
    if not share:
        return {'error': 'Shared card not found or unauthorized access'}, 404

    card = BusinessCard.query.get(card_id)
    if not card:
        return {'error': 'Card not found'}, 404

    return jsonify(card.to_dict()), 200


# Get list of all business cards shared with logged-in user
@share_routes.route('/', methods=['GET'])
@login_required
def get_shared_cards():

    shares = Share.query.filter_by(shared_with_email=current_user.email).all()
    shared_cards = [BusinessCard.query.get(share.card_id).to_dict() for share in shares]

    return jsonify(shared_cards), 200
