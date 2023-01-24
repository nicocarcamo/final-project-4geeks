from flask_sqlalchemy import SQLAlchemy
from flask import Flask, request, jsonify, Blueprint
from api.models import app, db, User

api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Backend y frontend conectados :)"
    }
    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def register():
    print(request.get_json())
    username = request.json['username']
    firstname = request.json['firstname']
    lastname = request.json['lastname']
    email = request.json['email']
    password = request.json['password']
    is_active = request.json['is_active']
    user = User(username,firstname,lastname, email, password, is_active)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

if __name__ == 'api':
    db.init_app(app)
    db.create_all()
    app.register_blue

