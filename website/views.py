from flask import Blueprint, render_template, request, redirect, jsonify
from flask_login import login_required, current_user
from .models import Note, User
from . import db

views = Blueprint("views", __name__)


@views.route('/', methods=["GET", "POST"])
def home():
    # if request.method == "POST":
    #     user = request.json[::-1]
    #     notes = Note.query.filter_by(whos_task=user)
    #     print(1111111111111111111111111, notes)

    return render_template("home.html", user=current_user)


@views.route("/add-task", methods=["GET", "POST"])
def add_task():
    if request.method == "POST":
        data = request.json
        whos_task = data["whos_task"]
        whos_task_id = data["whos_task_id"]
        date = data["date"]
        harry = data["harry"]
        task = data["task"]
        print(data)
        new_note = Note(whos_task=whos_task, date=date,
                        harry=harry, task=task, user_id=whos_task_id)
        db.session.add(new_note)
        db.session.commit()
    return render_template("add_task.html")


@views.route("/tasks", methods=["POST", "GET"])
def tasks():
    if request.method == "POST":
        note_id = request.json["id"]
        note = Note.query.get(note_id)
        if note:
            db.session.delete(note)
            db.session.commit()
            return jsonify({})

    user = request.args.get("user")
    user_id = request.args.get("id")
    data = db.session.query(User).get(user_id).notes
    return render_template("tasks.html", value=[user, data])
