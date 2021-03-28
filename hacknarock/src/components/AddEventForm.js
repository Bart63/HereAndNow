import React, { useState } from "react";
import { Paper, TextField, Button } from "@material-ui/core";
import Shadow from "./Shadow";

const AddEventForm = ({ onCancel, onAdd }) => {
  const [text, setText] = useState('');
  
  const onSubmit = (e) => {
    e.preventDefault()

    if (!text) {
      alert('Name is required!')
      return
    } else if (text.length < 5) {
      alert('Name must be atleast 5 letters long!')
      return
    }

    onAdd(text)

    setText('')
  }  
  
  return (
      <>
        <Shadow />
        <Paper elevation={3} className="add-form">
          <form onSubmit={onSubmit}>
            <div>
              <TextField
                id="standard-basic"
                label="Room name"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="flex" style={{marginTop: 10}}>
              <Button color="primary" variant="contained" type="submit">Add</Button>
              <Button variant="contained" onClick={onCancel}>Cancel</Button>
            </div>
          </form>
        </Paper>
      </>
    );
  }

  export default AddEventForm;