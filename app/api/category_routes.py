from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Category, db

category_routes = Blueprint('categories', __name__)

# Create a new category for the logged-in user.
@category_routes.route('/', methods=['POST'])
@login_required
def create_category():

    data = request.json
    category = Category(user_id=current_user.id, name=data['name'])
    db.session.add(category)
    db.session.commit()
    return jsonify({'message': 'Category created successfully', 'category_id': category.id}), 201


# Get all categories for the logged-in user.
@category_routes.route('/', methods=['GET'])
@login_required
def get_categories():

    categories = Category.query.filter_by(user_id=current_user.id).all()
    return jsonify([category.to_dict() for category in categories]), 200
