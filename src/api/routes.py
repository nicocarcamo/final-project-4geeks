from flask_sqlalchemy import SQLAlchemy
from flask import Flask, request, jsonify, Blueprint
from api.models import app, db, User, CrearEvento
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename
import datetime
import os

api = Blueprint('api', __name__)


# cloudinary.config(
#   cloud_name = "ddx94eu6o",
#   api_key = "725671973735529",
#   api_secret = "jP8Dgx_uyjwc-G1Mv1ogHT6l_-o"
# )



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
    if not user:
        return jsonify({"status": "fail", "message": "username incorrect"}), 401
    if not check_password_hash(user.password, password):
        return jsonify({"status": "fail", "message": "password incorrect"}), 401

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
    print(request.get_json())
    username = request.json.get('username')
    firstname = request.json.get('firstname')
    lastname = request.json.get('lastname')
    email = request.json.get('email')
    password = generate_password_hash(request.json.get('password'))
    is_active = request.json.get('is_active')

    user = User(username, firstname, lastname, email, password, is_active)

    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created successfully :)'}), 201


@api.route('/register', methods=['GET'])
def get_all_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200


@api.route('/crearevento', methods=['POST'])
def create_event():
    nombreevento = request.json['nombreevento']
    descripcion = request.json['descripcion']
    integrantes = request.json['integrantes']
    publicooprivado = request.json['publicooprivado']
    valor = request.json['valor']
    fechaEvento = request.json['fechaEvento']
    image_url = request.json['image_url']
    ubicacion = request.json['ubicacion']
    fechaCreacion = request.json['fechaCreacion']
    is_active = request.json['is_active']

# el evento debe registrar latitud y longitud en la api para marcar el punto en el mapa
# lat = request.json['lat']
# lng= request.json['lng']

# pasar lat y lng como parámetro
    crearevento = CrearEvento(
        nombreevento, descripcion, integrantes, publicooprivado, fechaEvento, valor, image_url, fechaCreacion, ubicacion, is_active)
    db.session.add(crearevento)
    db.session.commit()
    return jsonify({'message': 'Event created successfully'}), 201


# @app.route("/crearevento/<event_id>/imagen")
# def get_event_image(event_id):
#     return send_file(image_path, mimetype="image/jpeg")


@api.route('/crearevento', methods=['GET'])
def get_all_events():
    events = CrearEvento.query.all()
    return jsonify([event.serialize() for event in events]), 200


@api.route('/crearevento/<int:event_id>/', methods=['GET'])
def get_event_by_id(event_id):
    event = CrearEvento.query.get(event_id)
    if event:
        return jsonify(event.serialize())
        return jsonify({'error': 'EVENTO ENCONTRADO'}), 200
    else:
        return jsonify({'error': 'Event not found'}), 404


# @app.route('/api/eventos/<int:event_id>', methods=['DELETE'])
# def delete_event(event_id):
#     event = Event.query.get(event_id)
#     if not event:
#         return jsonify({'message': 'Event not found'}), 404

#     db.session.delete(event)
#     db.session.commit()
#     return jsonify({'message': 'Event deleted'})


@api.route('/perfil', methods=['GET'])
@jwt_required()
def get_profile():
    id = get_jwt_identity()
    user = User.query.get(id)
    return jsonify(user.serialize()), 200


@api.route('/perfil/all', methods=['GET'])
def get_all_profiles():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200


@api.route('/perfil/<int:perfil_id>/', methods=['GET'])
def get_profile_by_id(perfil_id):
    perfil = User.query.get(perfil_id)
    if perfil:
        return jsonify(perfil.serialize())
        return jsonify({'success': 'PERFIL ENCONTRADO'}), 200
    else:
        return jsonify({'error': 'Perfil not found'}), 404

# corregir


@api.route('/currentuser', methods=['GET'])
@jwt_required()
def current_user():
    current_user_email = get_jwt_identity()
    user = User.query.get(1)
    if user:
        return jsonify({'email': user.email, 'name': user.name})
    return jsonify({'error': 'User not found'}), 404


if __name__ == 'api':
    db.init_app(app)
    db.create_all()
    app.register_blueprint(api)


@app.route('/api/events/<int:event_id>/join', methods=['POST'])
def join_event(event_id):
    event = Event.query.get(event_id)
    user = User.query.get(1)  
    event.attendees.append(user)
    db.session.commit()
    return jsonify({'success': True})


@app.route('/register', methods=['POST'])
def register_for_event():
    event_id = request.json['event_id']
    participant_name = request.json['participant_name']
    participant_email = request.json['participant_email']

    # Verificar si el participante ya está registrado en el evento
    if Participant.query.filter_by(email=participant_email, event_id=event_id).first():
        return jsonify({'message': 'El participante ya está registrado en este evento.'})

    # Crear un nuevo participante y guardarlo en la base de datos
    new_participant = Participant(name=participant_name, email=participant_email, event_id=event_id)
    db.session.add(new_participant)
    db.session.commit()

    return jsonify({'message': 'Registro exitoso.'})