from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
CORS(app)

# Setup MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client['bug_tracker']
bugs_collection = db['bugs']

# Route to get all bugs
@app.route('/api/bugs', methods=['GET'])
def get_bugs():
    bugs = list(bugs_collection.find({}))
    for bug in bugs:
        bug['_id'] = str(bug['_id'])
    return jsonify(bugs)

# Route to add a new bug
@app.route('/api/bugs', methods=['POST'])
def add_bug():
    data = request.get_json()
    bug = {
        "title": data['title'],
        "description": data['description'],
        "date": data['date'],
        "status": data['status'],
        "priority": data['priority']
    }
    result = bugs_collection.insert_one(bug)
    bug['_id'] = str(result.inserted_id)  # Include the inserted ID
    return jsonify(bug), 201  # Return the entire bug object



# Route to edit a bug
@app.route('/api/bugs/<id>', methods=['PUT'])
def edit_bug(id):
    data = request.get_json()
    bugs_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": {
            "title": data['title'],
            "description": data['description'],
            "date": data['date'],
            "status": data['status'],
            "priority": data['priority']
        }}
    )
    return jsonify({"message": "Bug updated successfully"})

# Route to delete a bug
@app.route('/api/bugs/<id>', methods=['DELETE'])
def delete_bug(id):
    bugs_collection.delete_one({"_id": ObjectId(id)})
    return jsonify({"message": "Bug deleted successfully"})

if __name__ == '__main__':
    app.run(debug=True)
