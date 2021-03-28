import React, { useState, useEffect } from "react";

import Map from "./components/Map";
import Chat from "./components/Chat";
import ButtonsContainer from "./components/ButtonsContainer";
import Login from "./components/Login";
import AddEventForm from "./components/AddEventForm";
import RoomsList from "./components/RoomsList";

function App() {
  const [rooms, setRooms] = useState([]);
  const [chatID, setChatID] = useState(-1);
  const [chatName, setChatName] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomsList, setRoomsList] = useState(true);
  const [login, setLogin] = useState('');
  const [userid, setID] = useState(-1);
  const [addingEvent, setAddingEvent] = useState(0);
  const [addingEventX, setAddingEventX] = useState(0);
  const [addingEventY, setAddingEventY] = useState(0);

  // Login
  const setLoginForm = (log) => {
    setLogin(log)
    addLogin(log)
  };

  // Add room
  const addLogin = async (log) => {
    
    const user = {
      name: log,
    }

    const res = await fetch("http://localhost:5000/users/add", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then((response) => response.json()).then(function(data) {
      setID(data.Id)
    })
  }

  // Get rooms from server
  useEffect(() => {
    const getRooms = async () => {
      const roomsFromServer = await fetchRooms();
      setRooms(roomsFromServer);
    };

    getRooms();
  }, []);

  const fetchRooms = async () => {
    const res = await fetch("http://localhost:5000/rooms");
    const data = await res.json();
    return data;
  };

  // Add room
  const addRoom = async (name) => {
    
    const room = {
      name: name,
      password: '',
      position_x: addingEventX,
      position_y: addingEventY,
    }

    const res = await fetch("http://localhost:5000/rooms/add", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(room)
    });

    const getRooms = async () => {
      const roomsFromServer = await fetchRooms();
      setRooms(roomsFromServer);
    };

    await getRooms()
  }

  // Get messages from server
  const getMessages = async (id) => {
    const messagesFromServer = await fetchMessages(id);
    setMessages(messagesFromServer);
  };

  const fetchMessages = async (id) => {
    const res = await fetch("http://localhost:5000/messages/" + id);
    const data = await res.json();
    return data;
  };

  const sendMessage = async (userid, msg, roomid) => { 
    const message = {
      author_id: userid,
      data: msg,
      room_id: roomid
    }

    console.log(message)

    const res = await fetch("http://localhost:5000/messages/add", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(message)
    });

    await getMessages(roomid);
  }

  // Chat state
  const showChat = async (id, name) => {
    await getMessages(id);
    setChatID(id);
    setChatName(name);
  };

  const hideChat = () => {
    setChatID(-1);
  };

  // Adding state
  const addEventDone = (lat, lng) => {
    console.log("EVENT CHOSEN ON MAP - ASK FORM NAME")
    setAddingEventX(lat);
    setAddingEventY(lng);
    if (addingEvent === 1) setAddingEvent(2);
  };

  const cancelAddingEvent = () => {
    console.log("CANCEL EVENT")
    setAddingEvent(0);
  }

  const addEventClick = () => {
    console.log("CHANGE EVENT REDINESS")
    if (addingEvent === 0) setAddingEvent(1);
    if (addingEvent === 1) setAddingEvent(0);
  };

  const showEventsClick = () => {
    setRoomsList(!roomsList);
  };

  // Components
  return (
    <div>
      <div className="wrapper">
        <Map rooms={rooms} onClick={showChat} addingEvent={addingEvent} onMapClick={addEventDone} />
        {chatID !== -1 && <Chat onHide={hideChat} name={chatName} messages={messages} userid={userid} onSend={sendMessage} roomid={chatID} />}

        <ButtonsContainer
          addingEvent={addingEvent}
          onAddEventClick={addEventClick}
          onShowEventsClick={showEventsClick}
        />

        {login === '' && <Login onSet={setLoginForm}/>}

        {addingEvent === 2 && <AddEventForm onCancel={cancelAddingEvent} onAdd={addRoom} />}
      </div>
    </div>
  );
}

export default App;
