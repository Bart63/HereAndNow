from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)


class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    position_x = db.Column(db.Float, nullable=False)
    position_y = db.Column(db.Float, nullable=False)
    password = db.Column(db.Text, nullable=False)
    def __str__(self):
        return f'{self.id} {self.name} {self.position_x} {self.position_y} {self.password}'


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    def __str__(self):
        return f'{self.id} {self.name}'


class RoomUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    def __str__(self):
        return f'{self.room_id} {self.user_id}'


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'), nullable=False)
    data = db.Column(db.Text, nullable=False)
    creationDate = db.Column(db.DateTime, nullable=False)
    def __str__(self):
        return f'{self.id} {self.author_id} {self.room_id} {self.data} {self.creationDate}'


def room_serializer(room):
    return {
        'id' : room.id,
        'name' : room.name,
        'position_x' : room.position_x,
        'position_y' : room.position_y,
        'password' : room.password
    }


def user_serializer(user):
    return {
        'id' : user.id,
        'name' : user.name
    }


def room_user_serializer(room_user):
    return {
        'id' : room_user.id,
        'room_id' : room_user.room_id,
        'user_id' : room_user.user_id
    }


def message_serializer(message):
    return {
        'id' : message.id,
        'author_id' : message.author_id,
        'room_id' : message.room_id,
        'data' : message.data,
        'creationDate' : message.creationDate
    }


@app.route("/rooms")
def show_rooms():
    return jsonify([*map(room_serializer, Room.query.all())])


@app.route("/users")
def show_users():
    return jsonify([*map(user_serializer, User.query.all())])

    
@app.route("/roomusers")
def show_room_users():
    return jsonify([*map(room_user_serializer, RoomUser.query.all())])


@app.route("/messages")
def show_messages():
    return jsonify([*map(message_serializer, Message.query.all())])


if __name__ == "__main__":
    app.run()