import React from 'react';

import { Button } from '@material-ui/core';
import Map from './components/Map'
import Chat from './components/Chat'

function App() {
  return (
    <div>
      <div className="wrapper">
        <Map />
        <Chat />
      </div>
    </div>
  );
}

export default App;
