// @flow
import React, { Fragment, PureComponent } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Query } from "react-apollo";
import { withRouter } from "react-router";

import type { RouterHistory } from "react-router";

import { getFilenameQuery } from "../../graphql";
import resetFile from "../../utils/resetFile";

type Props = {
  history: RouterHistory
};

type State = {
  isOpen: boolean
};

class Header extends PureComponent<Props, State> {
  state = {
    isOpen: false
  };

  handleResetFile = async () => {
    const { history } = this.props;

    resetFile()
      .then(() => {
        history.push("/");
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleToggle = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const { isOpen } = this.state;

    return (
      <header className="Header">
        <Query query={getFilenameQuery}>
          {({ data }) => {
            const { app } = data;
            return (
              <Navbar color="light" light expand="sm">
                <NavbarBrand href="/">Koala</NavbarBrand>
                {app &&
                  app.filename && (
                    <Fragment>
                      <NavbarToggler onClick={this.handleToggle} />
                      <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                          Current file: {app.filename}
                        </Nav>
                        <Nav className="ml-auto" navbar>
                          <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                              Settings
                            </DropdownToggle>
                            <DropdownMenu right>
                              <DropdownItem onClick={this.handleResetFile}>
                                Close
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </Nav>
                      </Collapse>
                    </Fragment>
                  )}
              </Navbar>
            );
          }}
        </Query>
      </header>
    );
  }
}

export default withRouter(Header);
