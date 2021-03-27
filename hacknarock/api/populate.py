from api import db, app
from database import Room, User, RoomUser, Message
import datetime

if __name__=="__main__":
    with app.app_context():
        db.create_all()
        
        ############## Room ##############
        rooms = []
        rooms.append(Room(name="Spotkanie projektowe", 
                        position_x=10, position_y=32, password="123"))
        rooms.append(Room(name="Hacknarök 5", 
                        position_x=50.049683, position_y=19.944544, password=""))
        rooms.append(Room(name="Daily Scrum", 
                        position_x=-20, position_y=-2, password="scrum"))
        
        for room in rooms:
            db.session.add(room)
        

        ############## User ##############
        users = []
        users.append(User(name="Bartosz_D"))
        users.append(User(name="Bartosz_N"))
        users.append(User(name="Emil_B"))
        users.append(User(name="Konrad_Z"))
        users.append(User(name="Jacek Placek"))
        
        for user in users:
            db.session.add(user)


        ############## RoomUser ##############
        room_users = []
        room_users.append(RoomUser(room_id=1, user_id=1))
        room_users.append(RoomUser(room_id=2, user_id=2))
        room_users.append(RoomUser(room_id=1, user_id=3))
        room_users.append(RoomUser(room_id=2, user_id=4))
        room_users.append(RoomUser(room_id=3, user_id=5))
        
        for ru in room_users:
            db.session.add(ru)


        ############## RoomUser ##############
        messages = []
        messages.append(Message(author_id=1, room_id=1, data="Hello world", 
        creationDate=datetime.datetime(2021, 3, 27, 16, 23, 12, 123)))
        messages.append(Message(author_id=3, room_id=1, data="Hello hello", 
        creationDate=datetime.datetime(2021, 3, 27, 16, 23, 12, 123)))
        
        for m in messages:
            db.session.add(m)
        db.session.commit()