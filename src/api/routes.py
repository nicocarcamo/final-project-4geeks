from flask_sqlalchemy import SQLAlchemy
from flask import Flask, request, jsonify, Blueprint
from api.models import app, db, User, CrearEvento
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import check_password_hash, generate_password_hash

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Backend y frontend conectados :)"
    }
    return jsonify(response_body), 200


# Register y login funcionando sin AUTH

# @api.route('/register', methods=['POST'])
# def register():
#     print(request.get_json())
#     username = request.json['username']
#     firstname = request.json['firstname']
#     lastname = request.json['lastname']
#     email = request.json['email']
#     password = request.json['password']
#     is_active = request.json['is_active']
#     user = User(username,firstname,lastname, email, password, is_active)
#     db.session.add(user)
#     db.session.commit()
#     return jsonify({'message': 'User created successfully :)'}), 201

# @api.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     email = data.get('email')
#     password = data.get('password')

#     user = User.query.filter_by(email=email).first()
#     if not user or not check_password_hash(user.password, password):
#         return jsonify({'message': 'Invalid email or password :('}), 401

#     return jsonify({'message': 'Logged in successfully :)'}), 201





# Register y login con AUTH, pero funcionando mal. Se puede hacer register pero al parecer hay un problema
# con el hasheo del pass y no logro hacer la autenticación.

@api.route('/register', methods=['POST'])
def register():
    print(request.get_json())
    username = request.json['username']
    firstname = request.json['firstname']
    lastname = request.json['lastname']
    email = request.json['email']
    password = request.json['password']
    is_active = request.json['is_active']

    if not email: return jsonify({"message": "Email is required"}), 400
    if not password: return jsonify({"message": "Password is required"}), 400

    password = generate_password_hash(request.json['password'])
    user = User(username,firstname,lastname, email, password, is_active)

    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created successfully :)'}), 201



@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid email or password :(('}), 401 

    access_token = create_access_token(identity=user.email)
    return jsonify({'message': 'Logged in successfully', 'access_token': access_token}), 201

# @app.route('/api/login', methods=['POST'])
# def login():
#     email = request.json.get('email')
#     password = request.json.get('password')
    
#     if not email: return jsonify({"message": "Email is required"}), 400
#     if not password: return jsonify({"message": "Password is required"}), 400

#     foundUser = User.query.filter_by(email=email).first()
    
#     if not foundUser: return jsonify({"message": "Email/Password are incorrects"}), 401
#     if not check_password_hash(foundUser.password, password): return jsonify({"message": "Email/Password are incorrects"}), 401


#     expires = datetime.timedelta(days=1)
#     access_token = create_access_token(identity=foundUser.id, expires_delta=expires)

#     data = {
#         "access_token": access_token,
#         "user": foundUser.serialize()
#     }

#     return jsonify(data), 200


@api.route('/crearevento', methods=['POST'])
def crearevento():
    print(request.get_json())
    nombreevento = request.json['nombreevento']
    descripcion = request.json['descripcion']
    integrantes = request.json['integrantes']
    publicooprivado = request.json['publicooprivado']
    valor = request.json['valor']
    ubicacion = request.json['ubicacion']
    is_active = request.json['is_active']
    crearevento = CrearEvento(
        nombreevento, descripcion, publicooprivado, integrantes, valor, ubicacion, is_active)
    db.session.add(crearevento)
    db.session.commit()
    return jsonify({'message': 'Event created successfully'}), 201


@api.route('/perfil', methods=['GET'])
@jwt_required
def get_profile():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    return jsonify({'username':user.username, 'email': user.email}), 200


if __name__ == 'api':
    db.init_app(app)
    db.create_all()
    app.register_blue
