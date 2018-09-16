// @flow
import React, { PureComponent } from "react";
import { Container } from "reactstrap";

import withFileLoaded from "../../utils/hoc/withFileLoaded";

type Props = {};

class Overview extends PureComponent<Props> {
  render() {
    return (
      <Container className="Overview">
        <h1>Overview</h1>
      </Container>
    );
  }
}

export default withFileLoaded(Overview);
