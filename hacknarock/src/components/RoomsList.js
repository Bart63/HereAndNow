import React, { Component } from "react";
import { Paper, TextField } from "@material-ui/core";
import Room from "./Room";

export default class RoomsList extends Component {
  render() {
    const rooms = this.props.rooms.map((room) => <Room name={room} />);
    console.log(rooms);
    return (
      <Paper elevation={3} className="rooms-list">
        <ul>{rooms}</ul>
      </Paper>
    );
  }
}
