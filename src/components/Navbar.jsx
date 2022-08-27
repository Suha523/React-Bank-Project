import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="nav-links">
          <input type="checkbox" id="checkbox_toggle" />
          <label htmlFor="checkbox_toggle" className="hamburger">
            &#9776;
          </label>
          <ul className="links-items">
            <li>
              <Link to="/" style={{ textDecoration: "none" }}>
                <span className="link-item">Home</span>
              </Link>
            </li>
            <li>
              <Link to="/transactions" style={{ textDecoration: "none" }}>
                <span className="link-item">Transactions</span>
              </Link>
            </li>
            <li>
              <Link to="/operations" style={{ textDecoration: "none" }}>
                <span className="link-item">Operations</span>
              </Link>
            </li>
            <li>
              <Link to="/categoreis" style={{ textDecoration: "none" }}>
                <span className="link-item">Categories</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="logo">Bank</div>
      </div>
    );
  }
}

export default Navbar;
