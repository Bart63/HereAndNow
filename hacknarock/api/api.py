from flask import Flask, jsonify, json, request, make_response
from sqlalchemy.orm import load_only
from database import db, Room, User, RoomUser, Message
from flask_cors import CORS
from upload_api import upload_route


app = Flask(__name__)
app.register_blueprint(upload_route)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
CORS(app)
db.init_app(app)


@app.route("/rooms")
def get_rooms():
    return jsonify([*map(Room.serialize, Room.query.all())])


@app.route("/rooms/add", methods=['POST'])
def add_room():
    data = json.loads(request.data)
    room_name = data['name']
    room_position_x = data['position_x']
    room_position_y = data['position_y']
    room_password = data['password']
    #TODO VALIDATE
    new_room = Room(name=room_name, position_x=room_position_x, position_y=room_position_y, password=room_password)
    db.session.add(new_room)
    db.session.commit()
    return make_response("Room Added", 200)


@app.route("/users")
def get_users():
    return jsonify([*map(User.serialize, User.query.all())])


@app.route("/users/<_user_id>")
def get_user_name_by_user_id(_user_id):
    user = User.query.filter_by(id=_user_id).first()
    return jsonify(user.name)


@app.route("/users/add", methods=['POST'])
def add_user():
    data = json.loads(request.data)
    user_name = data['name']
    #TODO VALIDATE
    new_user = User(name=user_name)
    db.session.add(new_user)
    db.session.commit()
    return make_response("User Added", 200, {'Id' : new_user.id})

 
@app.route("/roomusers")
def get_room_users():
    return jsonify([*map(RoomUser.serialize, RoomUser.query.all())])


@app.route("/roomusers/<_room_id>")
def get_room_users_by_room_id(_room_id):
    user_ids = [r.user_id for r in RoomUser.query.options(load_only("user_id")).filter_by(room_id=_room_id)]
    user_names = [u.name for u in User.query.filter(User.id.in_(user_ids))]
    return jsonify(user_names)


@app.route("/messages")
def get_messages():
    return jsonify([*map(Message.serialize, Message.query.all())])


@app.route("/messages/<_room_id>")
def get_messages_by_room_id(_room_id):
    return jsonify([*map(Message.serialize, Message.query.filter_by(room_id=_room_id))])


if __name__ == "__main__":
    app.run()
