// @flow
import React, { Fragment, PureComponent } from "react";
import * as Sentry from "@sentry/browser";
import { Link, NavLink } from "react-router-dom";
import { X } from "react-feather";

import type { RouterHistory } from "react-router";

import { getItem, removeItem } from "../../utils/asyncLocalStorage";

type Props = {
  history: RouterHistory
};

type State = {
  filename: string,
  isLoading: boolean
};

class Header extends PureComponent<Props, State> {
  state = {
    filename: "",
    isLoading: true
  };

  static defaultProps = {
    filename: ""
  };

  componentDidMount() {
    this.fetchFilename();
  }

  componentDidUpdate() {
    this.fetchFilename();
  }

  handleResetFile = async () => {
    const { history } = this.props;

    this.setState({ isLoading: true });

    try {
      await Promise.all([
        removeItem("countries"),
        removeItem("filename"),
        removeItem("individuals"),
        removeItem("places")
      ]);

      this.setState({ filename: "" });
      history.push("/");
    } catch (error) {
      Sentry.captureException(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  fetchFilename = async () => {
    try {
      const filename = await getItem("filename");

      if (filename) {
        this.setState({ filename });
      }
    } catch (error) {
      Sentry.captureException(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { filename, isLoading } = this.state;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <Link className="navbar-brand" to="/">
          Koala
        </Link>

        {filename && (
          <Fragment>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse d-flex justify-content-between"
              id="navbarText"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    to="/overview"
                  >
                    Overview
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    to="/people"
                  >
                    People
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    to="/places"
                  >
                    Places
                  </NavLink>
                </li>
              </ul>
              {isLoading ? (
                <span className="navbar-text">Loading...</span>
              ) : (
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <div
                      className="nav-link dropdown-toggle"
                      id="navbarDropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      style={{ cursor: "pointer" }}
                    >
                      {filename}
                    </div>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <button
                        className="dropdown-item"
                        onClick={this.handleResetFile}
                        type="button"
                        style={{ cursor: "pointer" }}
                      >
                        <X className="feather inline" />
                        Close
                      </button>
                    </div>
                  </li>
                </ul>
              )}
            </div>
          </Fragment>
        )}
      </nav>
    );
  }
}

export default Header;
