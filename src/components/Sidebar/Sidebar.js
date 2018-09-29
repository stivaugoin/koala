// @flow
import React, { Component } from "react";
import { Grid, MapPin, Users } from "react-feather";
import { NavLink } from "react-router-dom";

type Props = {};

class Sidebar extends Component<Props> {
  render() {
    return (
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Main menu</span>
          </h6>
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/overview"
              >
                <Grid className="feather inline" />
                Overview
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/people"
              >
                <Users className="feather inline" />
                People
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/places"
              >
                <MapPin className="feather inline" />
                Places
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Sidebar;
