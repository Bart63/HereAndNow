import React, { Component } from "react";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MenuIcon from "@material-ui/icons/Menu";

export default class ButtonsContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="btn-container">
        <Fab
          color={this.props.addingEvent ? "primary" : "secondary"}
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
