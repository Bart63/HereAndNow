from flask import Flask, jsonify
from database import db, Room, User, RoomUser, Message
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
CORS(app)
db.init_app(app)


@app.route("/rooms")
def show_rooms():
    return jsonify([*map(Room.serialize, Room.query.all())])


@app.route("/users")
def show_users():
    return jsonify([*map(User.serialize, User.query.all())])

 
@app.route("/roomusers")
def show_room_users():
    return jsonify([*map(RoomUser.serialize, RoomUser.query.all())])


@app.route("/messages")
def show_messages():
    return jsonify([*map(Message.serialize, Message.query.all())])


@app.route("/messages/<_room_id>")
def show_messages_by_room_id(_room_id):
    return jsonify([*map(Message.serialize, Message.query.filter_by(room_id=_room_id))])


if __name__ == "__main__":
    app.run()
