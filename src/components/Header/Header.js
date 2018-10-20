// @flow
import React, { Fragment, PureComponent } from "react";
import * as Sentry from "@sentry/browser";
import { Link } from "react-router-dom";
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
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">
          Koala
        </Link>

        {filename && (
          <Fragment>
            <span className="navbar-text text-light">{filename}</span>

            <ul className="navbar-nav px-3">
              <li className="nav-item text-nowrap">
                <button
                  className="btn btn-outline-light btn-sm my-2 my-sm-0"
                  disabled={isLoading}
                  onClick={this.handleResetFile}
                  type="button"
                >
                  {isLoading ? (
                    "Loading..."
                  ) : (
                    <Fragment>
                      <X className="feather inline" />
                      Close
                    </Fragment>
                  )}
                </button>
              </li>
            </ul>
          </Fragment>
        )}
      </nav>
    );
  }
}

export default Header;
