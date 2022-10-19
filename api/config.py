from dotenv import load_dotenv, find_dotenv
import os
load_dotenv(find_dotenv())
import redis
class Flask_Config:
    SECRET_KEY = os.environ.get("FLASK_SECRET")

    SQLALCHEMY_TRACK_MODIFICATION = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = f'mysql+pymysql://{os.environ.get("USER_NAME")}:{os.environ.get("USER_PASSWORD")}@localhost/projek_sbd'

    SESSION_TYPE = 'redis'
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url('redis://localhost:6379')
