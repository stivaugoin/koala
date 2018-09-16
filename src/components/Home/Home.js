// @flow
import React, { PureComponent } from "react";
import { Container, Input, Jumbotron } from "reactstrap";

import importFile from "../../utils/importFile";

import "./styles.css";

type Props = {};

class Home extends PureComponent<Props> {
  handleSelectFile = (event: SyntheticInputEvent<HTMLInputElement>) => {
    importFile(event.target)
      .then(() => {
        console.log("Done!");
      })
      .catch(error => console.error(error));
  };

  render() {
    return (
      <Container className="Home">
        <Jumbotron className="pb-5 pt-5">
          <h1 className="display-6 mb-4">Visualize your genealogy tree</h1>
          <div>
            <Input type="file" accept=".ged" onChange={this.handleSelectFile} />
          </div>
        </Jumbotron>
      </Container>
    );
  }
}

export default Home;
