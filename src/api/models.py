from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    firstname = db.Column(db.String(120), nullable=False)
    lastname = db.Column(db.String(120))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
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


class Event(db.Model):
    __tablename__ = "events"
    id = db.Column(db.Integer, primary_key=True)
    nombre_evento = db.Column(db.String(300), unique=True, nullable=False)
    lugar = db.Column(db.String(120), nullable=False)
    fecha = db.Column(db.String(120), nullable=False)
    hora = db.Column(db.String(120), nullable=False)
    asistentes = db.Column(db.String)
    creador_evento = db.Column(db.String(120), db.ForeignKey("users.username"), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "nombre_evento": self.nombre_evento,
            "lugar": self.lugar,
            "fecha": self.fecha,
            "hora": self.hora,
            "creador_evento": self.creador_evento
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()

class Message(db.Model):
    __tablename__ = "messages"
    id = db.Column(db.Integer, primary_key=True)
    message_text = db.Column(db.String(500), nullable=False)
    message_creator = db.Column(db.String(120), db.ForeignKey("users.username"), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "message_creator": self.message_creator
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()

