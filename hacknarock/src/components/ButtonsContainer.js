import React, { Component } from "react";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MenuIcon from "@material-ui/icons/Menu";

export default class ButtonsContainer extends Component {
  render() {
    return (
      <div className="btn-container">
        <Fab
          color="primary"
          aria-label="add"
          className="btn"
          onClick={() => this.props.onAddEventClick()}
        >
          <AddIcon />
        </Fab>

        <Fab
          color="primary"
          aria-label="add"
          className="btn"
          onClick={() => this.props.onShowEventsClick()}
        >
          <MenuIcon />
        </Fab>
      </div>
    );
  }
}
