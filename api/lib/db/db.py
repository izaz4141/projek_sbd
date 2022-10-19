from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from uuid import uuid4
from ..server import app

db = SQLAlchemy(app)

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(345), nullable=False, unique=True)
    password = db.Column(db.Text, nullable=False)
    author_level = db.Column(db.Integer, nullable=False, default=2)
    date_added = db.Column(db.DateTime, default=datetime.utcnow)

def user_json(user):
    return{
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'password': user.password,
        'author_level': user.author_level,
        'date_added': user.date_added
    }

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(100), nullable=False)

    def __str__(self):
        return f'{self.id} {self.content}'

def todo_json(todo):
    return {
        'id' : todo.id,
        'content' : todo.content
    }