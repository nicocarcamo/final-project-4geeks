from flask_sqlalchemy import SQLAlchemy
from flask import Flask, request, jsonify, Blueprint
from api.models import app, db, User, CrearEvento
from werkzeug.security import check_password_hash

api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Backend y frontend conectados :)"
    }
    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    firstname = data.get('firstname')
    lastname = data.get('lastname')
    email = data.get('email')
    password = data.get('password')
    is_active = data.get('is_active')
    user = User(username=username,firstname=firstname,lastname=lastname, email=email, password=password, is_active=is_active)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid email or password'}), 401

    return jsonify({'message': 'Logged in successfully'}), 201

@api.route('/crearevento', methods=['POST'])
def create_event():
    nombreevento = request.json['nombreevento']
    descripcion = request.json['descripcion']
    integrantes = request.json['integrantes']
    publicooprivado = request.json['publicooprivado']
    valor = request.json['valor']
    ubicacion = request.json['ubicacion']
    is_active = request.json['is_active']
    crearevento = CrearEvento(nombreevento,descripcion,publicooprivado, integrantes, valor, ubicacion, is_active)
    db.session.add(crearevento)
    db.session.commit()
    return jsonify({'message': 'Event created successfully'}), 201

@api.route('/crearevento', methods=['GET'])
def get_all_events():
    events = CrearEvento.query.all()
    return jsonify([event.serialize() for event in events]), 200

if __name__ == 'api':
    db.init_app(app)
    db.create_all()
    app.register_blueprint(api)
