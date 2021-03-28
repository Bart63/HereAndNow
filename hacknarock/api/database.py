from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    position_x = db.Column(db.Float, nullable=False)
    position_y = db.Column(db.Float, nullable=False)
    password = db.Column(db.Text, nullable=False)
    main_image = db.Column(db.Text)

    def __str__(self):
        return f'{self.id} {self.name} {self.position_x} {self.position_y} {self.password} {self.main_image}'

    def serialize(self):
        return {
            'id' : self.id,
            'name' : self.name,
            'position_x' : self.position_x,
            'position_y' : self.position_y,
            'password' : self.password,
            'main_image' : self.main_image
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
    creation_date = db.Column(db.DateTime, nullable=False)

    def __str__(self):
        return f'{self.id} {self.author_id} {self.room_id} {self.data} {self.creation_date}'

    def serialize(self):
        return {
            'id' : self.id,
            'author_id' : self.author_id,
            'room_id' : self.room_id,
            'data' : self.data,
            'creation_date' : self.creation_date
        }
