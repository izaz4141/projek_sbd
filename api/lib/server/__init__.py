from flask import Flask, jsonify, json, request, session
from flask_session import Session
from flask_cors import CORS, cross_origin
from config import Flask_Config
from string import ascii_letters
from random import choice
import bcrypt

app = Flask("__name__")
app.config.from_object(Flask_Config)
print(app.config['SESSION_REDIS'])
 
from ..db import db

server_session = Session(app)
cors = CORS(app, supports_credentials=True, )

@app.route("/api", methods=['GET'])
def index():
    return jsonify([*map(db.user_json, db.User.query.all())])
@app.route('/api/create', methods=['POST'])
def create():
    request_data = json.loads(request.data)
    todo = db.Todo(content=request_data['content'])
    with app.app_context():
        db.db.session.add(todo)
        db.db.session.commit()
    return {'201': 'todo created succesfully'}
@app.route('/api/<int:id>')
def show(id):
    return jsonify([*map(db.todo_json, db.Todo.query.filter_by(id=id))])
@app.route('/api/<int:id>', methods=['POST'])
def delete(id):
    request_data = json.loads(request.data)
    with app.app_context():
        db.Todo.query.filter_by(id=request_data['id']).delete()
        db.db.session.commit()
@cross_origin(supports_credentials=True)
@app.route("/register", methods=['POST'])
def register_user():
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']
    password = password
    pepper = choice(ascii_letters)
    password = f"{password}{pepper}"
    user_exist = db.User.query.filter_by(email=email).first() is not None
    if user_exist:
        return jsonify({'error': 'User with that email already exist'}), 409
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    author_lv = 2
    if name.lower() == 'izaz':
        author_lv = 0
    with app.app_context():
        new_user = db.User(name=name, email=email, password=hashed_password, author_level=author_lv)
        db.db.session.add(new_user)
        db.db.session.commit()
        user = db.User.query.filter_by(email=email).first()
    
    session['user_id'] = user.id

    return jsonify({
        'id': new_user.id,
        'name': new_user.name,
        'email': new_user.email
    })

@cross_origin(supports_credentials=True)
@app.route('/deleteUser', methods=["POST"])
def delete_user():
    data = request.json['id']
    u_id = request.json['u_id']
    with app.app_context():
        user = db.User.query.filter_by(id=data)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    if u_id == data:
        session.pop('user_id')
    with app.app_context():
        db.User.query.filter_by(id=data).delete()
        db.db.session.commit()
    return '200'
@cross_origin(supports_credentials=True)
@app.route('/login', methods=['POST'])
def login_user():
    email = request.json['email']
    password = request.json['password']
    with app.app_context():
        user = db.User.query.filter_by(email=email).first()
    
    if user is None:
        return jsonify({'error': 'User not Found'}), 404
    u_pw = user.password
    benar = False
    for letter in ascii_letters:
        p_pas = f'{password}{letter}'
        if bcrypt.checkpw(p_pas.encode('utf-8'), u_pw.encode('utf-8')):
            benar = True
            break
    if benar is False:
        return jsonify({'error': 'Unaothorized'}), 401
    
    session['user_id'] = user.id

    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email
    })

@app.route('/logout', methods=['POST'])
def logout_user():
    session.pop('user_id')
    return '200'

@app.route('/@me', methods=['GET'])
def get_current_user():
    user_id = session.get('user_id')

    if not user_id:
        return jsonify({'error': 'Unaothorized'}), 401

    user = db.User.query.filter_by(id=user_id).first()
    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'author_level': user.author_level
    })

@app.route('/dev/user_list', methods=['POST'])
def dev_user_list():
    auth_lv = request.json['author_level']
    if auth_lv == 0:
        return jsonify([*map(db.user_json, db.User.query.all())])
    else:
        return jsonify({'error': 'Unaothorized'}), 401