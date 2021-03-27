import React, { useState, useEffect } from "react";

import { Button } from "@material-ui/core";
import Map from "./components/Map";
import Chat from "./components/Chat";
import ButtonsContainer from "./components/ButtonsContainer";
import AddEventForm from "./components/AddEventForm";
import RoomsList from "./components/RoomsList";

function App() {
  const [rooms, setRooms] = useState([]);
  const [chatID, setChatID] = useState(-1);
  const [chatName, setChatName] = useState("");
  const [roomsList, setRoomsList] = useState(false);
  const [addingEvent, setAddingEvent] = useState(false);

  // Get rooms from server
  useEffect(() => {
    const getTasks = async () => {
      const roomsFromServer = await fetchRooms();
      setRooms(roomsFromServer);
    };

    getTasks();
  }, []);

  const fetchRooms = async () => {
    const res = await fetch("http://localhost:5000/rooms");
    const data = await res.json();
    return data;
  };

  // Chat state
  const showChat = (id, name) => {
    console.log(id);
    setChatID(id);
    setChatName(name);
  };

  const hideChat = () => {
    setChatID(-1);
    console.log(-1);
  };

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
        {chatID !== -1 && <Chat onHide={hideChat} name={chatName} />}
        <ButtonsContainer
          onAddEventClick={addEventClick}
          onShowEventsClick={showEventsClick}
        />
        {addingEvent ? <AddEventForm /> : null}
        {roomsList ? <RoomsList /> : null}
      </div>
    </div>
  );
}

export default App;
