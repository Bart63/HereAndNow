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
                        position_x=10, position_y=32, password="123",
                        main_image="https://lh3.googleusercontent.com/X_zIVLHvNgEiQMaCY8BdMgl-MSpNCtI-QDNFt5VIBY9tz2a4MV9s8jN_QXwi7pKxm5H9jUQ3XiqBV8hOIv2VYQrB=w808-h768"))
        rooms.append(Room(name="Hacknarök 5", 
                        position_x=50.049683, position_y=19.944544, password="",
                        main_image="https://cdn.bulldogjob.com/system/readables/covers/000/002/726/thumb/Hacknar%C3%B6k__czyli_pi%C4%85ta_ods%C5%82ona_boskiej_batalii_o_wieczn%C4%85_chwa%C5%82%C4%99!.png"))
        rooms.append(Room(name="Daily Scrum", 
                        position_x=-20, position_y=-2, password="scrum",
                        main_image="https://www.corazlepszafirma.pl/img/Co_to_jest_projekt.jpg"))
        rooms.append(Room(name="Empty?", 
                        position_x=-60, position_y=-40, password="",
                        main_image="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Caixatecido.jpg/1280px-Caixatecido.jpg"))
        
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


        ############## Message ##############
        messages = []
        messages.append(Message(author_id=1, room_id=1, data="Hello world", 
        creation_date=datetime.datetime(2021, 3, 27, 16, 23, 12, 123)))
        messages.append(Message(author_id=3, room_id=1, data="Hello hello", 
        creation_date=datetime.datetime(2021, 3, 27, 16, 23, 13, 223)))
        messages.append(Message(author_id=1, room_id=1, data="Noice!", 
        creation_date=datetime.datetime(2021, 3, 27, 16, 23, 14, 123)))

        messages.append(Message(author_id=2, room_id=2, data="I have an error", 
        creation_date=datetime.datetime(2021, 3, 27, 16, 25, 14, 123)))
        messages.append(Message(author_id=4, room_id=2, data="Lol, everything works", 
        creation_date=datetime.datetime(2021, 3, 27, 16, 25, 22, 233)))
        messages.append(Message(author_id=2, room_id=2, data="Not in my code :(", 
        creation_date=datetime.datetime(2021, 3, 27, 16, 25, 32, 143)))

        messages.append(Message(author_id=5, room_id=3, data="Is anybody here?", 
        creation_date=datetime.datetime(2021, 3, 27, 16, 26, 12, 123)))
        messages.append(Message(author_id=5, room_id=3, data="...", 
        creation_date=datetime.datetime(2021, 3, 27, 16, 28, 23, 143)))
        
        for m in messages:
            db.session.add(m)
        db.session.commit()
        print("Database has been populated!")