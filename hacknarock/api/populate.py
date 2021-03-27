from api import db, app
from database import Room, User, RoomUser, Message
import datetime

if __name__=="__main__":
    with app.app_context():
        db.create_all()

        meta = db.metadata
        for table in reversed(meta.sorted_tables):
            print(f"Clear table {table}")
            db.session.execute(table.delete())
        db.session.commit()
        
        ############## Room ##############
        rooms = []
        rooms.append(Room(name="Spotkanie projektowe", 
                        position_x=10, position_y=32, password="123"))
        rooms.append(Room(name="Hacknarök 5", 
                        position_x=50.049683, position_y=19.944544, password=""))
        rooms.append(Room(name="Daily Scrum", 
                        position_x=-20, position_y=-2, password="scrum"))
        rooms.append(Room(name="Empty?", 
                        position_x=-60, position_y=-40, password=""))
        
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
        creationDate=datetime.datetime(2021, 3, 27, 16, 23, 13, 223)))
        messages.append(Message(author_id=1, room_id=1, data="Noice!", 
        creationDate=datetime.datetime(2021, 3, 27, 16, 23, 14, 123)))

        messages.append(Message(author_id=2, room_id=2, data="I have an error", 
        creationDate=datetime.datetime(2021, 3, 27, 16, 25, 14, 123)))
        messages.append(Message(author_id=4, room_id=2, data="Lol, everything works", 
        creationDate=datetime.datetime(2021, 3, 27, 16, 25, 22, 233)))
        messages.append(Message(author_id=2, room_id=2, data="Not in my code :(", 
        creationDate=datetime.datetime(2021, 3, 27, 16, 25, 32, 143)))

        messages.append(Message(author_id=5, room_id=2, data="Is anybody here?", 
        creationDate=datetime.datetime(2021, 3, 27, 16, 26, 12, 123)))
        messages.append(Message(author_id=5, room_id=2, data="...", 
        creationDate=datetime.datetime(2021, 3, 27, 16, 28, 23, 143)))
        
        for m in messages:
            db.session.add(m)
        db.session.commit()
        print("Database has been populated!")