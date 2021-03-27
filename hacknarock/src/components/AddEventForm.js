import React, { Component } from "react";
import { Paper, TextField, Button } from "@material-ui/core";
import Shadow from "./Shadow";

const AddEventForm = ({ onCancel }) => {
    return (
      <>
        <Shadow />
        <Paper elevation={3} className="add-form">
          <form>
            <div>
              <TextField
                id="standard-basic"
                label="Room name"
              />
            </div>

            <div className="flex" style={{marginTop: 10}}>
              <Button color="primary" variant="contained">Add</Button>
              <Button variant="contained" onClick={onCancel}>Cancel</Button>
            </div>
          </form>
        </Paper>
      </>
    );
  }

  export default AddEventForm;