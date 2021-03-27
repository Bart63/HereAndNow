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

    def serialize(self):
        return {
            'id' : self.id,
            'name' : self.name,
            'position_x' : self.position_x,
            'position_y' : self.position_y,
            'password' : self.password
        }


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    def __str__(self):
        return f'{self.id} {self.name}'

    def serialize(self):
        return {
            'id' : self.id,
            'name' : self.name
        }


class RoomUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __str__(self):
        return f'{self.room_id} {self.user_id}'

    def serialize(self):
        return {
            'id' : self.id,
            'room_id' : self.room_id,
            'user_id' : self.user_id
        }


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'), nullable=False)
    data = db.Column(db.Text, nullable=False)
    creationDate = db.Column(db.DateTime, nullable=False)

    def __str__(self):
        return f'{self.id} {self.author_id} {self.room_id} {self.data} {self.creationDate}'

    def serialize(self):
        return {
            'id' : self.id,
            'author_id' : self.author_id,
            'room_id' : self.room_id,
            'data' : self.data,
            'creationDate' : self.creationDate
        }


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


if __name__ == "__main__":
    app.run()