from models.user_model import User
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash
from datetime import timedelta

def register_user(username, email, password):
    if User.get_user_by_email(email):
        return {"message": "User already exists"}, 400
    
    User.create_user(username, email, password)
    return {"message": "User registered successfully"}, 201

def login_user(email, password):
    user = User.get_user_by_email(email)
    
    if user and User.verify_password(user['password'], password):
        token = create_access_token(identity=str(user["_id"]), expires_delta=timedelta(days=1))
        return {"token": token}, 200
    else:
        return {"message": "Invalid email or password"}, 401
