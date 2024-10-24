from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from pymongo import MongoClient

auth_bp = Blueprint('auth', __name__)

# Setup MongoDB connection (reuse if already connected elsewhere)
client = MongoClient('mongodb://localhost:27017/')
db = client['bug_tracker']
users_collection = db['users']

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data['email']
    username = data['username']
    password = generate_password_hash(data['password'])

    # Check if user already exists
    if users_collection.find_one({'email': email}):
        return jsonify({'message': 'User already exists'}), 400

    users_collection.insert_one({
        'email': email,
        'username': username,
        'password': password
    })
    return jsonify({'message': 'User registered successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = users_collection.find_one({'email': email})

    if not user or not check_password_hash(user['password'], password):
        return jsonify({'message': 'Invalid credentials'}), 401

    # Generate access token
    token = create_access_token(identity={'email': user['email'], 'username': user['username']})
    return jsonify({'token': token}), 200
