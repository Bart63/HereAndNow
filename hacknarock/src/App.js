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
  const [userid, setID] = useState('');
  const [addingEvent, setAddingEvent] = useState(0);
  const [addingEventX, setAddingEventX] = useState(0);
  const [addingEventY, setAddingEventY] = useState(0);

  const getCurrentDate = (separator='-') => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hours = newDate.getHours() < 10 ? "0" + newDate.getHours() : newDate.getHours();
    let minutes = newDate.getMinutes() < 10 ? "0" + newDate.getMinutes() : newDate.getMinutes();
    let time = hours + ":" + minutes;
  
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`} ${time}`;
  }

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
    .then(response => { console.log(response.json()); })
  }

  // Get rooms from server
  const getRooms = async () => {
    const roomsFromServer = await fetchRooms();
    setRooms(roomsFromServer);
  };

  useEffect(() => {
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

    await getRooms();
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

  const sendMessage = async (userid, roomid, msg) => { 
    const message = {
      author_id: 0,//userid,
      data: 'msg',
      room_id: 1
    }

    const res = await fetch("http://localhost:5000/message/add", {
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
    setAddingEventX(lat);
    setAddingEventY(lng);
    setAddingEvent(2);
  };

  const cancelAddingEvent = () => {
    setAddingEvent(0);
  }

  const addEventClick = () => {
    setAddingEvent(addingEvent === 0 ? 1 : 0);
  };

  const showEventsClick = () => {
    setRoomsList(!roomsList);
  };

  // Components
  return (
    <div>
      <div className="wrapper">
        <Map rooms={rooms} onClick={showChat} addingEvent={addingEvent} onMapClick={addEventDone} />
        {chatID !== -1 && <Chat onHide={hideChat} name={chatName} messages={messages} />}

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
