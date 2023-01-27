from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func


class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    whos_task = db.Column(db.String(50))
    date = db.Column(db.String(20))
    harry = db.Column(db.String(29))
    task = db.Column(db.String(100000))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Integer)
    notes = db.relationship("Note")
   