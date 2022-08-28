import React, { Component } from "react";
import "../styles/Title.css";

export class Title extends Component {
  render() {
    return (
      <div className="title">
        <div className="squair">{this.props.title}</div>
        <div className="traiangles">
          <div className="up-traiangle"></div>
          <div className="down-traiangle"></div>
        </div>
      </div>
    );
  }
}

export default Title;
