import React, { useState, useEffect } from "react";

import Map from "./components/Map";
import Chat from "./components/Chat";
import ButtonsContainer from "./components/ButtonsContainer";
import AddEventForm from "./components/AddEventForm";
import RoomsList from "./components/RoomsList";

function App() {
  const [rooms, setRooms] = useState([]);
  const [chatID, setChatID] = useState(-1);
  const [chatName, setChatName] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomsList, setRoomsList] = useState(true);
  const [addingEvent, setAddingEvent] = useState(0);
  const [addingEventX, setAddingEventX] = useState(0);
  const [addingEventY, setAddingEventY] = useState(0);

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

  const addRoom = async (name) => {
    
    const room = {
      name: name,
      password: '',
      position_x: addingEventX,
      position_y: addingEventY,
    }

    console.log(JSON.stringify(room))

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

  // Chat state
  const showChat = async (id, name) => {
    console.log(id);

    await getMessages(id);
    setChatID(id);
    setChatName(name);
  };

  const hideChat = () => {
    setChatID(-1);
    console.log(-1);
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
        {addingEvent === 2 && <AddEventForm onCancel={cancelAddingEvent} onAdd={addRoom} />}
      </div>
    </div>
  );
}

export default App;
