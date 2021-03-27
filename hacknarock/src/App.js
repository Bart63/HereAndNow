import React, { useState } from 'react';

import Map from './components/Map'
import Chat from './components/Chat'

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
      </div>
    </div>
  );
}

export default App;
