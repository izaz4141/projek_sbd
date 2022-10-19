from . import db

with db.app.app_context():
    db.db.create_all()