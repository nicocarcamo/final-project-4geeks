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


@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    user = User.query.filter_by(email=email).first()

    # cambiar mensaje de error por "username/password incorrect" en ambos casos
    if not user: return jsonify({ "status": "fail", "message": "username incorrect" }), 401
    if not check_password_hash(user.password, password): return jsonify({ "status": "fail", "message": "password incorrect" }), 401

    # modificar el expire time del token
    expires = datetime.timedelta(days=2)
    access_token = create_access_token(identity=user.id, expires_delta=expires)

    data = {
        "status": "success",
        "message": "Log In Successful!",
        "access_token": access_token
    }

    return jsonify(data), 200


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

@api.route('/register', methods=['GET'])
def get_all_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200
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


@api.route('/perfil', methods=['GET'])
@jwt_required()
def get_profile():
    id = get_jwt_identity()
    user = User.query.get(id)
    return jsonify(user.serialize()), 200

if __name__ == 'api':
    db.init_app(app)
    db.create_all()
    app.register_blueprint(api)
