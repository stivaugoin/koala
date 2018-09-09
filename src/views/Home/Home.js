// @flow
import React, { PureComponent } from "react";

import { Button, Container, Jumbotron } from "reactstrap";

import "./styles.css";

type Props = {};

class Home extends PureComponent<Props> {
  render() {
    return (
      <Container className="Home">
        <Jumbotron className="pb-5 pt-5">
          <h1 className="display-6 mb-4">Visualize your genealogy tree</h1>
          <p className="lead">
            <Button color="primary">Choose a file...</Button>
          </p>
        </Jumbotron>
      </Container>
    );
  }
}

export default Home;
