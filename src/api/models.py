from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/dbname'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    firstname = db.Column(db.String(120), nullable=False)
    lastname = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    user = db.relationship("UnirseEvento", back_populates="user")

    def __init__(self, username, firstname, lastname, email, password, is_active):
        self.username = username
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.password = password
        self.is_active = is_active

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "firstname": self.firstname,
            "lastname": self.lastname
            # do not serialize the password, its a security breach
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()

class CrearEvento(db.Model):
    __tablename__ = 'crearevento'
    id = db.Column(db.Integer, primary_key=True)
    nombreevento = db.Column(db.String(120), unique=True, nullable=False)
    descripcion = db.Column(db.String(120), nullable=False)
    integrantes = db.Column(db.String(120), nullable=False)
    publicooprivado = db.Column(db.String(120), unique=False)
    valor = db.Column(db.String(120), nullable=False)
    ubicacion = db.Column(db.String(120), nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    event = db.relationship("UnirseEvento", back_populates="event")

    def __init__(self, nombreevento, descripcion, integrantes, publicooprivado, valor, ubicacion, is_active):
        self.nombreevento = nombreevento
        self.descripcion = descripcion
        self.integrantes = integrantes
        self.publicooprivado = publicooprivado
        self.valor = valor
        self.ubicacion = ubicacion
        self.is_active = is_active

    def serialize(self):
        return {
            "id": self.id,
            "nombreevento": self.nombreevento,
            "descripcion": self.descripcion,
            "integrantes": self.integrantes,
            "publicooprivado": self.publicooprivado,
            "valor": self.valor,
            "ubicacion": self.ubicacion,
            "is_active": self.is_active
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

class UnirseEvento(db.Model):
    __tablename__ = 'unirseevento'
    event_id = db.Column(db.Integer, db.ForeignKey('crearevento.id'), primary_key=True)    
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    is_active = db.Column(db.Boolean, default=True)
    event = db.relationship("CrearEvento", back_populates="event")
    user = db.relationship("User", back_populates="user")

    def __init__(self,event, user):
        self.event = event
        self.user = user
    
    def save(self):
        db.session.add(self)
        db.session.commit()

