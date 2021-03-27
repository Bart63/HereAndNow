import React, { Component } from "react";

export default class Room extends Component {
  // props.name
  render() {
    return <li>{this.props.name}</li>;
  }
}
