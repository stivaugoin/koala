// @flow
import React, { PureComponent } from "react";

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

type Props = {};

type State = {
  isOpen: boolean
};

class Header extends PureComponent<Props, State> {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const { isOpen } = this.state;

    return (
      <header className="Header">
        <Navbar color="light" light expand="sm">
          <NavbarBrand href="/">Koala</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Famille Bourgoin - Aubé.ged
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Choose another file...</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Close this file</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;
