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
  const [addingEvent, setAddingEvent] = useState(false);

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
  const addEventClick = () => {
    setAddingEvent(!addingEvent);
  };

  const showEventsClick = () => {
    setRoomsList(!roomsList);
  };

  // Components
  return (
    <div>
      <div className="wrapper">
        <Map rooms={rooms} onClick={showChat} />
        {chatID !== -1 && <Chat onHide={hideChat} name={chatName} messages={messages} />}
        <ButtonsContainer
          onAddEventClick={addEventClick}
          onShowEventsClick={showEventsClick}
        />
        {addingEvent ? <AddEventForm /> : null}
        {roomsList ? <RoomsList rooms={rooms} /> : null}
      </div>
    </div>
  );
}

export default App;
