import React, { Component } from "react";
import { Paper, TextField, Button } from "@material-ui/core";
import Shadow from "./Shadow";

export default class AddEventForm extends Component {
  render() {
    return (
      <>
        <Shadow />
        <Paper elevation={3} className="add-form">
          <form>
            <div>
              <TextField
                id="standard-basic"
                label="Nazwa wydarzenia"
                size="big"
              />
            </div>
            <div>
              <TextField id="standard-basic" label="x" />
            </div>
            <div>
              <TextField id="standard-basic" label="y" />
            </div>

            <div>
              <Button variant="contained">Dodaj</Button>
            </div>
          </form>
        </Paper>
      </>
    );
  }
}
