from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

client = MongoClient("mongodb://localhost:27017/")
db = client['bug_tracker']
users_collection = db['users']

class User:
    @staticmethod
    def create_user(username, email, password):
        hashed_password = generate_password_hash(password)
        user = {
            "username": username,
            "email": email,
            "password": hashed_password,
        }
        users_collection.insert_one(user)
    
    @staticmethod
    def get_user_by_email(email):
        return users_collection.find_one({"email": email})
    
    @staticmethod
    def verify_password(stored_password, provided_password):
        return check_password_hash(stored_password, provided_password)
