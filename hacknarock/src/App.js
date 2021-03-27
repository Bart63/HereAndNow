import React from "react";

import { Button } from "@material-ui/core";
import Map from "./components/Map";
import Chat from "./components/Chat";
import ButtonsContainer from "./components/ButtonsContainer";

function App() {
  return (
    <div>
      <div className="wrapper">
        <Map />
        <Chat />
        <ButtonsContainer />
      </div>
    </div>
  );
}

export default App;
