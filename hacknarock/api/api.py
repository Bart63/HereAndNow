import datetime
from flask import Flask, jsonify, json, request, make_response
from sqlalchemy.orm import load_only
from database import db, Room, User, RoomUser, Message
from flask_cors import CORS
from upload_api import upload_route
from censor import censor
from wiki_img import getPhotoURL


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
    main_image = getPhotoURL(room_position_x, room_position_y)
    #TODO VALIDATE
    new_room = Room(name=room_name, position_x=room_position_x, position_y=room_position_y, password=room_password,
     main_image=main_image)
    db.session.add(new_room)
    db.session.commit()
    return make_response({"res" : "Room Added", "img" : main_image}, 200)


@app.route("/rooms/img/<_room_id>")
def get_room_image_url(_room_id):
    print(*map(Room.serialize, Room.query.filter_by(id=_room_id)))
    return jsonify({"url" : [*map(Room.serialize, Room.query.filter_by(id=_room_id))][0]['main_image']})


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
    return make_response({'Response' : 'User Added', 'Id' : new_user.id}, 200)

 
@app.route("/roomusers")
def get_room_users():
    return jsonify([*map(RoomUser.serialize, RoomUser.query.all())])


@app.route("/roomusers/add", methods=['POST'])
def add_user_to_room():
    data = json.loads(request.data)
    room_user_room_id = data['room_id']
    room_user_user_id = data['user_id']
    #TODO VALIDATE
    new_room_user = RoomUser(room_id=room_user_room_id, user_id=room_user_user_id)
    db.session.add(new_room_user)
    db.session.commit()
    return make_response("User added to room", 200)


@app.route("/roomusers/<_room_id>")
def get_room_users_by_room_id(_room_id):
    user_ids = [r.user_id for r in RoomUser.query.options(load_only("user_id")).filter_by(room_id=_room_id)]
    user_names = [{u.id : u.name} for u in User.query.filter(User.id.in_(user_ids))]
    return jsonify(user_names)


@app.route("/messages")
def get_messages():
    return jsonify([*map(Message.serialize, Message.query.all())])


@app.route("/messages/add", methods=['POST'])
def add_message():
    data = json.loads(request.data)
    message_author_id = data['author_id']
    message_room_id = data['room_id']
    message_data = censor(data['data'])
    message_creation_date = datetime.datetime.utcnow()
    #TODO VALIDATE
    new_message = Message(author_id=message_author_id, room_id=message_room_id, data=message_data, creation_date=message_creation_date)
    db.session.add(new_message)
    db.session.commit()
    return make_response(message_data, 200)


@app.route("/messages/<_room_id>")
def get_messages_by_room_id(_room_id):
    return jsonify([*map(Message.serialize, Message.query.filter_by(room_id=_room_id))])


if __name__ == "__main__":
    app.run()
