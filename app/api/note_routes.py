from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Note, BusinessCard, db

note_routes = Blueprint('notes', __name__)

# Add note to business card
@note_routes.route('/<int:card_id>', methods=['POST'])
@login_required
def add_note(card_id):

    card = BusinessCard.query.filter_by(id=card_id, user_id=current_user.id).first()
    if not card:
        return {'error': 'Card not found or unauthorized access'}, 404

    data = request.json
    note = Note(card_id=card_id, user_id=current_user.id, content=data['content'])
    db.session.add(note)
    db.session.commit()
    return jsonify({'message': 'Note added successfully', 'note_id': note.id}), 201


# Get all notes for business card
@note_routes.route('/<int:card_id>', methods=['GET'])
@login_required
def get_notes(card_id):

    card = BusinessCard.query.filter_by(id=card_id, user_id=current_user.id).first()
    if not card:
        return {'error': 'Card not found or unauthorized access'}, 404

    notes = Note.query.filter_by(card_id=card_id).all()
    return jsonify([note.to_dict() for note in notes]), 200

# Update a specific note
@note_routes.route('/<int:note_id>', methods=['PUT'])
@login_required
def update_note(note_id):
    note = Note.query.filter_by(id=note_id, user_id=current_user.id).first()
    if not note:
        return {'error': 'Note not found or unauthorized access'}, 404

    data = request.json
    updated_content = data.get('content')
    if not updated_content:
        return {'error': 'Content is required for updating a note'}, 400

    note.content = updated_content
    db.session.commit()
    return jsonify({'message': 'Note updated successfully', 'note': note.to_dict()}), 200


# Delete a specific note
@note_routes.route('/<int:card_id>/<int:note_id>', methods=['DELETE'])
@login_required
def delete_note(card_id, note_id):
    card = BusinessCard.query.filter_by(id=card_id, user_id=current_user.id).first()
    if not card:
        return {'error': 'Card not found or unauthorized access'}, 404

    note = Note.query.filter_by(id=note_id, card_id=card_id, user_id=current_user.id).first()
    if not note:
        return {'error': 'Note not found or unauthorized access'}, 404

    db.session.delete(note)
    db.session.commit()
    return jsonify({'message': 'Note deleted successfully'}), 200