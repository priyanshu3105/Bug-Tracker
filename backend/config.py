import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_secret_key'
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'your_jwt_secret_key'
    MONGO_URI = os.environ.get('MONGO_URI') or 'mongodb://localhost:27017/bug_tracker'
