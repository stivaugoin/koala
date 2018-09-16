// @flow
import React, { Fragment, PureComponent } from "react";
import { Query } from "react-apollo";
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

import { getFilenameQuery } from "../../graphql";
import closeFile from "../../utils/closeFile";

type Props = {};

type State = {
  isOpen: boolean
};

class Header extends PureComponent<Props, State> {
  state = {
    isOpen: false
  };

  handleResetFile = async () => {
    closeFile()
      .then(() => {
        console.log("Done!");
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
                                Change file
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

export default Header;
