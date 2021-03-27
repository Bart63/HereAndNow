from flask import Flask, jsonify, request, make_response
from database import db, Room, User, RoomUser, Message
from flask_cors import CORS


app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
CORS(app)
db.init_app(app)


@app.route("/rooms")
def get_rooms():
    return jsonify([*map(Room.serialize, Room.query.all())])


@app.route("/rooms/add", methods=['POST'])
def add_room():
    room_name = request.values.get('name')
    room_position_x = request.values.get('position_x')
    room_position_y = request.values.get('position_y')
    room_password = request.values.get('password')
    #TODO VALIDATE
    new_room = Room(name=room_name, position_x=room_position_x, position_y=room_position_y, password=room_password)
    db.session.add(new_room)
    db.session.commit()
    return make_response("Room Added", 200)


@app.route("/users")
def get_users():
    return jsonify([*map(User.serialize, User.query.all())])

 
@app.route("/roomusers")
def get_room_users():
    return jsonify([*map(RoomUser.serialize, RoomUser.query.all())])


@app.route("/messages")
def get_messages():
    return jsonify([*map(Message.serialize, Message.query.all())])


@app.route("/messages/<_room_id>")
def get_messages_by_room_id(_room_id):
    return jsonify([*map(Message.serialize, Message.query.filter_by(room_id=_room_id))])


if __name__ == "__main__":
    app.run()
