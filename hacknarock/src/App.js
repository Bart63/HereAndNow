import React, { useState } from "react";

import { Button } from "@material-ui/core";
import Map from "./components/Map";
import Chat from "./components/Chat";
import ButtonsContainer from "./components/ButtonsContainer";

function App() {

  const [chatState, setChatState] = useState(1)

  const showChat = (id) => {
    setChatState(id)
    console.log(chatState);
  }

  const hideChat = () => {
    setChatState(-1)
    console.log(chatState);
  }

  return (
    <div>
      <div className="wrapper">
        <Map onClick={showChat} />
        { chatState !== -1 && <Chat onHide={hideChat} /> }
        <ButtonsContainer />
      </div>
    </div>
  );
}

export default App;
