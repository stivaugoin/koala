// @flow
import React, { Fragment, PureComponent } from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import { X } from "react-feather";

import { getFilenameQuery } from "../../graphql";
import resetFile from "../../utils/resetFile";

type Props = {};

class Header extends PureComponent<Props> {
  handleResetFile = async () => {
    resetFile().catch(error => {
      console.error(error);
    });
  };

  render() {
    return (
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">
          Koala
        </Link>

        <Query query={getFilenameQuery}>
          {({ loading, error, data }) => {
            if (loading) return "loading...";
            if (error) return `Error: ${error.message}`;

            if (data && data.app && data.app.filename) {
              return (
                <Fragment>
                  <span className="navbar-text text-light">
                    {data.app.filename.replace(".ged", "")}
                  </span>

                  <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                      <button
                        className="btn btn-outline-light btn-sm my-2 my-sm-0"
                        onClick={this.handleResetFile}
                        type="button"
                      >
                        <X className="feather inline" />
                        Close
                      </button>
                    </li>
                  </ul>
                </Fragment>
              );
            }

            return "";
          }}
        </Query>
      </nav>
    );
  }
}

export default Header;
